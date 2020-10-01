var common = require(process.cwd() + '/screens/commons.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var routeScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";


describe('Manual Allocation E2E flow ', function() {

    /*
     In this spec we are going to perform following steps
      1.create order and manually allocate it to a site.
      2.verify that order was released sucessfully and sku is allocated to selected site.
      3.complete fulfillment and create invoice.
     */


    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();
    var route = new routeScreen();

    it('Manually allocate sku to desired pool and complete shipment - TC001', function () {

        //create sales order
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.sku1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        callCenter.clickSearch();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        // save the sales Order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //manually allocate salesorder to desired inventory pool
        callCenter.clickOnManualAllocationButton();
        browser.sleep(5000);
        callCenter.chooseSite(browser.params.siteName);
        browser.sleep(2000);
        callCenter.clickOnSaveAndReleaseButton();
        browser.sleep(3000);

        //verify that order status is updated as released

        callCenter.getorderStatusText().then(function(Status){
            var Orderstatus = Status;
            console.log("Order status is"+Orderstatus);
            expect(Orderstatus).toEqual("RELEASED");
        })

        //verify that salesorder is allocated to selected site
        salesOrderSummary.clickOnshippingRequestTab();
        browser.sleep(2000);
        salesOrderSummary.viewShippingRequest();
        browser.sleep(2000);
        callCenter.getAllocatedSiteName().then(function (site) {
             var siteName = site;
             console.log("sku is allocated to site"+siteName);
             expect(siteName).toEqual("Site: joliet-dc");
        });

        //compelete fulfillment

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            //shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            //browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep(3000);
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("1");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);

            //mark shipment as shipped

            browser.get(shipmentsUrl);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSearch("Order Number", SONumber);
            browser.sleep(2000);
            callCenter.clickMarkAsShippedButton();
            browser.sleep(3000);


            //verify the sales order status after shipment

            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Order #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
        });

        //create invoice of order
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","NewInvoiceShipment");
        browser.sleep(2000);
        route.routeSelectButton("Start");
        browser.sleep(5000);
        route.routeSelectButton("Stop");
        browser.sleep(2000);

    });

})

var common = require(process.cwd() + '/screens/commons.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');

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
      1.create order with 2 lines and manually allocate it to a site.
      2.verify that order was released sucessfully and sku is allocated to selected site.
      3.complete fulfillment for 1 line
      4. Re-release line2 through manual allocation.
     */


    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it('Manually allocate sku to desired pool and complete shipment - TC002', function () {

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

        //add line2
        commons.searchWithCriteria('SKU', 'contains', browser.params.sku1);
        browser.sleep(2000);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        callCenter.searchForSelectedSku();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(2000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);

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
            expect(siteName).toEqual('Site: joliet-dc');
        });

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
            browser.sleep(3000);
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

            //navigate to salesorder screen and re-release the order
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(3000);

            callCenter.clickOnManualAllocationButton();
            browser.sleep(5000);
            callCenter.chooseSite(browser.params.siteName);
            browser.sleep(2000);
            callCenter.clickOnSaveAndReleaseButton();
            browser.sleep(3000);

            //verify that line2 is released by checking line2 status
            salesOrderCreate.getSecondLineStatus().then(function (lineStatus) {
                var LineStatus = lineStatus;
                console.log("Second line status is" +lineStatus );
                if(( linestatus = 'RELEASED') || (linestatus = 'ALLOCATED'))
                    var result = true;
                else
                    var result = false;
                expect(result).toEqual(true);


            })
        });


    });

})

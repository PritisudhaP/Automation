var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";
global.reshipSONumber = "";



describe("Applying Appeasment flow ", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("verify that appeasment amount applied at order level on original order should not effect reship order  -TC013", function () {
        /* 1.create a sales order via call center with single line qty=2 and has some price
           2.complete shipment
           3.Add appeasement at order level
           4.create reship order and verify that appeasement amount is shown as 0.

           */

        //skuWithPriceS
        //create a sales order
        // with line qty =2.

        browser.get(callCenterInventoryUrl);

        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWithPrice);
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
        //update the line quantity as 2
        callCenter.increaseLineQty("1","2");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //release the order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            //complete fulfilment
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", ReshipOrderNumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("2");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);
        });

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //adding appeasement at order level
        callCenter.orderLevelAppeasement();
        browser.sleep(1000);
        callCenter.applyAppeasement("Amount", "6","EmployeeAppeasement","desc1","notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(2000);

        //create reship order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        browser.sleep(2000);
        salesOrderCreate.enterReshipComments("test");
        browser.sleep(1000);
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);

        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber = value;
            console.log(reshipSONumber);
        });
        browser.sleep(2000);

        //verify appeasment amount of reship order open status

        callCenter.getAppeasementAmount().then(function(value)
        {
            var appeasementamount = value;
            expect(amount).toBe("($0.00)");
        })
    })
    it("verify that appeasment amount applied at line level on original order should not effect reship order  -TC014", function () {
        /* 1.create a sales order via call center with single line qty=2 and has some price
           2.complete shipment
           3.Add appeasement at order level
           4.create reship order and verify that appeasement amount is shown as 0.

           */

        //skuWithPriceS
        //create a sales order
        // with line qty =2.

        browser.get(callCenterInventoryUrl);

        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWithPrice);
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
        //update the line quantity as 2
        callCenter.increaseLineQty("1","2");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //release the order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            //complete fulfilment
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", ReshipOrderNumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("2");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);
        });

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //adding appeasement at line level
        callCenter.editLineGear("1");
        browser.sleep(1000);
        callCenter.lineLevelAppeasement();
        browser.sleep(2000);
        callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1","notes1");
        browser.sleep(1000);
        callCenter.applyButton();

        //create reship order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        browser.sleep(2000);
        salesOrderCreate.enterReshipComments("test");
        browser.sleep(1000);
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);

        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber = value;
            console.log(reshipSONumber);
        });
        browser.sleep(2000);

        //verify appeasment amount of reship order open status

        callCenter.getAppeasementAmount().then(function(value)
        {
            var appeasementamount = value;
            expect(amount).toBe("($0.00)");
        })
    })

})

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
global.reshipOrderNumber = "";

describe("reship of an original order that has multiple lines flow", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("Create a sales order with multiple lines line1 qty=2,line2 qty =1, create reship order,complete fulfilment -TC003", function () {
        /* Create sales order from callcenter with multiple line line1 qty=2, line2 qty =1
           click on reship button,provide reason code and comments
           save the reship order
           release it successfully and complete fulfilment
           Complete the fulfilment of original order as well
         */

        //verify the sku has avialable ats value before order creation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.reshipSku);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = parseInt(atsValue);
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "" || atsValueOfSku <= 3)) {
                var newskuvalue = atsValueOfSku + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("QA");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(newskuvalue);
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //verify the ats value of sku2
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.reshipSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = parseInt(atsValue);
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "" || atsValueOfSku <= 3)) {
                var newskuvalue = atsValueOfSku + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("Qa");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(newskuvalue);
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //create sales order
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.reshipSku1);
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
        callCenter.increaseLineQty("1", "2");

        //add line2
        commons.searchWithCriteria('SKU', 'contains', browser.params.reshipSku);
        browser.sleep(3000);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        callCenter.searchForSelectedSku();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(2000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');


        })

        //complete shipment of original order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order1 #", SONumber);
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
            callCenter.enterItemQty2("1");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);
        })


        //verify the sales order status after shipment
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order number 1 #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(2000);
        })


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

        // verify the reship order status
        salesOrderCreate.getOrderStatusValue().then(function (status) {
            var reshipStatus = status;
            expect(reshipStatus).toEqual("RESHIP DRAFT");
            console.log("The reship order status before saving" + reshipStatus);
        });
        browser.sleep(1000);

        //verify the reason code and  reship comments.
        salesOrderCreate.getReshipReason().then(function (reason) {
            var reshipReason = reason;
            expect(reshipReason).toEqual("delayed");
            console.log("The reship reason is " + reshipReason);
        });

        salesOrderCreate.getReshipCommentsOnOrder().then(function (comments) {
            var reshipComments = comments;
            expect(reshipComments).toEqual("test");
            console.log("The reship comments are " + reshipComments);
        });

        //verify the price on line1
        salesOrderCreate.getLinePriceAmount(1).then(function (price) {
            var linePrice = price;
            expect(linePrice).toEqual("$0.00");
            console.log("The reship order price is " + linePrice);
        });

        //verify the balance due amount of reship order
        salesOrderCreate.getBalanceDueAmount().then(function (price) {
            var balanceAmount = price;
            expect(balanceAmount).toEqual("$0.00");
            console.log("The reship due amount is " + balanceAmount);
        });

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipOrderNumber = value;
            console.log(reshipOrderNumber);
        });
        browser.sleep(2000);

        //verify that reship order status is updated to "open" from "reship draft" status.
        salesOrderCreate.getOrderStatusValue().then(function (status) {
            var reshipStatus = status;
            expect(reshipStatus).toEqual("OPEN");
            console.log("The reship order status after saving" + reshipStatus);
        });
        browser.sleep(1000);

        //release the reship order
        browser.wait(function () {
            return reshipOrderNumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Reship Order Number #", reshipOrderNumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
        })

        //complete shipment
        browser.wait(function () {
            return reshipOrderNumber != '';
        }).then(function () {
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", reshipOrderNumber);
            browser.sleep(3000);
        })
        callCenter.fulfillmentOrderSelectGear("Create Shipment");
        browser.sleep(3000);
        shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
        browser.sleep(3000);
        callCenter.packageSelection(browser.params.shipmentPackageSelection);
        browser.sleep("500");
        callCenter.setItemTrackingNumber("1");
        browser.sleep(1000);
        callCenter.enterItemQty("2");
        callCenter.enterItemQty2("1");

        browser.sleep(1000);
        callCenter.addPackageToShipment();
        browser.sleep(2000);
        callCenter.finalizeShipment();
        browser.sleep(3000);

        //verify the sales order status after shipment
        browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", reshipOrderNumber);
        browser.sleep(1000);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');



    })
})

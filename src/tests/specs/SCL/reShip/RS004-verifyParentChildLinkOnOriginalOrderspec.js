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
global.reshipSONumber1 = "";
global.reshipSONumber2 = "";


describe("verify original order to reship order Link", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("verify that the original order has a link to navigate to all reship orders -TC004", function () {
        /* 1.create a sales order via call center with single line qty=3 and release it.
           2.create reship order Re1
           3.Complete shipment of original order
           4.create reship order Re2
           5.navigate to original order and verify that it holds a link,
          6. which onclick will navigate to Reship order Re1 and Reship order Re2
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
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
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

        //create a sales order with line qty =3.
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.reshipSku);
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
        //update the line quantity as 3
        callCenter.increaseLineQty("1","3");
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
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
        });
        //complete fulfilment for original order
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
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("3");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);

            //verify the original order status after shipment
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(3000);
        });

        browser.sleep(3000);

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

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber1 = value;
            console.log(reshipSONumber1);
        });
        browser.sleep(2000);

        //verify that reship order status is updated to "open" from "reship draft" status.
        salesOrderCreate.getOrderStatusValue().then(function (status) {
            var reshipStatus = status;
            expect(reshipStatus).toEqual("OPEN");
            console.log("The reship order status after saving" + reshipStatus);
        });
        browser.sleep(1000);

        //navigate to original order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(3000);
        })

        //verify that original order has link to reship order1

        salesOrderCreate.getReshipOrderNumber(1).then(function (orderNumber){
            var reshipOrderNumber1 = orderNumber;
            expect(reshipOrderNumber1).toEqual(reshipSONumber1);
            console.log("The first reship order Number is " +reshipOrderNumber1);
            //click on reship link

            salesOrderCreate.clickOnReshipOrderLink(1);
            browser.sleep(5000);

            //verify that order number on link match with the SO that is opened on clicking
            salesOrderCreate.salesOrderNumber().then(function (value) {
                reshipOrderNumber = value;
                console.log("After navigating the reship order number is " +reshipOrderNumber);
                expect(reshipOrderNumber).toEqual(reshipSONumber1);
            });
        });




        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(2000);
        })
        //create second reship order when orginl order status= shipped
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        browser.sleep(2000);
        salesOrderCreate.enterReshipComments("test1");
        browser.sleep(1000);
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber2 = value;
            console.log("second reship order Number" +reshipSONumber2);
        });
        browser.sleep(2000);

        //navigate to original order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(3000);
        });

        //verify that original order has link to reship order2
        salesOrderCreate.getReshipOrderNumber(2).then(function(orderNumber){
            var reshipOrderNumber2 = orderNumber;
            expect(reshipOrderNumber2).toEqual(reshipSONumber2);
            console.log("The second reship order Number is " +reshipOrderNumber2);
            salesOrderCreate.clickOnReshipOrderLink(2);
            browser.sleep(5000);

            //verify that order number on link match with the SO that is opened on clicking
            salesOrderCreate.salesOrderNumber().then(function (value) {
                reshipOrderNumber = value;
                console.log("After navigating the reship order number2 is " +reshipOrderNumber);
                expect(reshipOrderNumber).toEqual(reshipSONumber2);
            });
        })

    })
})

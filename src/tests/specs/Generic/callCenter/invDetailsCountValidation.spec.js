var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";
global.totalAvailableQTYCount = "";
global.lineStatusesText = "";
global.reasonTextVal = "";
global.amountTextVal = "";
global.descTextVal = "";
global.errorMessage = "";
global.discountAmountAtLineItem1 = "";
global.discountAmountAtLineItem2 = "";
global.discountDetailsAmtLine1 = "";
global.discountDetailsAmtLine2 = "";
global.discountAmtBillDetails = "";
global.appeasementDetailsAmt = "";
global.appeasementAmtBillDetails = "";
global.orderlvlAppeasementval = "";
global.totalAvailableQty = "";
global.reservedInventoryQty = "";
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //Add SKU to the sales order from call center inventory lookup then save and release the order
    //Inventory details count validation for before and after release the order


    it('Call center Flow TC0008', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(1000);
        callCenter.inventoryDetailsPopUp();
        browser.sleep(2000);
        //>>>>>>>>>>>Before release Inventory levels>>>>>>>>>>
        callCenter.inventoryDetailsCount("9").then(function (totalAvailableValue) {
            totalAvailableQty = totalAvailableValue;
            postInventoryCount = totalAvailableQty - 1;

            browser.sleep(3000);
            console.log("pre-release available count"+totalAvailableQty);
            browser.sleep(1000);

        });
        browser.sleep(1000);
        callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
            reservedInventoryQty = reservedValue;
            postResCount = reservedInventoryQty + 1;

            browser.sleep(3000);
            console.log("pre-release reserved count"+reservedInventoryQty);
            
            browser.sleep(1000);

        });
        browser.sleep(1000);
        callCenter.searchWithCriteria('Site # ', 'is', browser.params.siteNumber);
        browser.sleep(5000);
        callCenter.inventoryDetailsCount("9").then(function (totalAvailableValue) {
            totalAvailableQty = totalAvailableValue;
            console.log("available QTY for Site with number "+browser.params.siteNumber +" :" +totalAvailableQty);
        });
        callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
            reservedInventoryQty = reservedValue;
            console.log("Reserved QTY for Site with number "+browser.params.siteNumber +" :" +reservedInventoryQty);
        });
        callCenter.cancelFilter();
        browser.sleep(1000);
        callCenter.cancelInvDetailsPopUp();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        callCenter.editLineGear("3");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("25.99");
        browser.sleep(3000);
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});		
		browser.sleep(2000);

        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
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

            //!*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);

            });
            browser.sleep(3000);
            browser.get(callCenterInventoryUrl);
            browser.driver.manage().window().maximize();
            browser.sleep(2000);
            commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
            callCenter.selectSKUFromSearch();
            browser.sleep(2000);
            commons.search();
            browser.sleep(2000);
            callCenter.selectSKUFromResults();
            browser.sleep(1000);
            callCenter.inventoryDetailsPopUp();
            browser.sleep(4000);

            //>>>>>>>>After release Inventory levels>>>>>>>>>>>>>
            callCenter.inventoryDetailsCount("9").then(function (totalAvailableQty) {
                console.log(totalAvailableQty);
                expect(totalAvailableQty).toEqual(postInventoryCount);
                browser.sleep(2000);
                console.log("*********** Final: Available Inventory Level   >>>>>>>>>>>> " + postInventoryCount);
            });
            browser.sleep(1000);
            callCenter.inventoryDetailsCount("10").then(function (reservedInventoryQty) {
                console.log(reservedInventoryQty);
                expect(reservedInventoryQty).toEqual(postResCount);
                browser.sleep(2000);
                console.log("*********** Final: Reserved Inv Level   >>>>>>>>>>>> " + postResCount);
            });
            browser.sleep(1000);
            callCenter.cancelInvDetailsPopUp();
            browser.sleep(1000);
            callCenter.clearSearch();

        })
    })
})






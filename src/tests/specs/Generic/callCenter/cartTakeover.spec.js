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
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //Add SKU to the order from Call center inventory lookup then save and release the order
    //Search sales order from normal orders and add references to the order
    //Search order from the carttakeover lookup

    it('Call center Flow TC00011', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
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

        })
          browser.wait(function () {
            return SONumber != '';
        }).then(function () {
        browser.get(callCenterSalesOrdersListUrl);        
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        browser.sleep(3000);
        salesOrderSummary.salesOrderSelectGear("View");
        browser.sleep(4000);
        callCenter.addReferences(browser.params.type,browser.params.refNameCartId,browser.params.cartIdValue);
        browser.sleep(2000);
        browser.get(callCenterCartTakeoverUrl);
        browser.sleep(2000);
        callCenter.cartTakeOverErrorMsg(browser.params.incorrectCartId).then(function(cartidErrMsg){
            errorMessage = cartidErrMsg;
            console.log(errorMessage);
            expect(errorMessage).toBe("Cart ID can not include any special character.");
        });
        browser.sleep(4000);
        callCenter.cartTakeOver(browser.params.cartIdValue);

        });

    })
})





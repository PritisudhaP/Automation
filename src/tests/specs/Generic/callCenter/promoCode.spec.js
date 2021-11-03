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
global.promoTextValue = "";
global.reasonTextVal = "";
global.amountTextVal = "";
global.descTextVal = "";
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //*******Applying promo code script**********//
    //Search and Add SKU to the sales order and save the order
    //Apply promo code to the order and getting promo code values

    it('Call center Flow TC0003', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.promosku);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        callCenter.editLineGear("3");      
       callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("25");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(2000);
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        		
		browser.sleep(2000);
        //Apply promo code
        callCenter.promoCode(browser.params.promoCodeValue);
        browser.sleep(3000);
        callCenter.viewPlusIcon("Discounts");
        browser.sleep(2000);
   
        callCenter.checkPromoCode().then(function (promoText) {
            promoTextValue = promoText;
            console.log(promoTextValue);

        });
        callCenter.discountViewNotes();
        callCenter.viewNotesDetails("Reason:").then(function(reasonText){
            reasonTextVal = reasonText;
            console.log(reasonTextVal);
        });
        callCenter.viewNotesDetails("Amount:").then(function(amountText){
            amountTextVal = amountText;
            console.log(amountTextVal);
        });
        callCenter.viewNotesDetails("Description:").then(function(descriptionText){
            descTextVal = descriptionText;
            console.log(descTextVal);
        });
        callCenter.ViewNotesClose();
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);

        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            //!*******!!@@@@@@@@@@@@@@

        });

    });

});





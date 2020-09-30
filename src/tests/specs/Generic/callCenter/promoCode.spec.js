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
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(3000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        callCenter.editLineGear("1");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("25");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });


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

        })

    })





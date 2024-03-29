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


        //Add SKU's to the order from call center inventory lookup screen and add price to the line item
        //Apply discounts to the order and view the discount details
        //Apply appeasements to the order

        it('Call center Flow TC0004', function () {

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
            /*callCenter.salesChannel("1");
            callCenter.promisedDate(browser.params.promisedDate);*/
            callCenter.attachCustomer();
            callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();
            callCenter.editLineGear("3"); //updated by vishak
            callCenter.lineItemselectOptions("Change Price");
            callCenter.changingUnitPrice("25.99");
            callCenter.editLineGear("3");
            callCenter.lineItemselectOptions("Edit Line");
            callCenter.discountButtonEditLine();
            callCenter.applyDiscount("Percentage", "25", "EmployeeDiscount", "desc1", "notes1");
            callCenter.applyButton();
            callCenter.editLinePopUpSaveBtn(); 
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
            
            /*callCenter.ViewNotesButton();
            browser.sleep(2000);
            callCenter.discountAmountValue().then(function(amtValue){
                discountAmtValue =amtValue;
                console.log(discountAmtValue);

            });*/
            //!**********editing disocunt*********
            callCenter.viewPlusIcon("Discounts");
            browser.sleep(2000);
            callCenter.discountViewNotes();
            callCenter.viewNotesDetails("Reason:").then(function (reasonText) {
                reasonTextVal = reasonText;
                console.log(reasonTextVal);
            });
            callCenter.viewNotesDetails("Amount:").then(function (amountText) {
                amountTextVal = amountText;
                console.log(amountTextVal);
            });
            callCenter.viewNotesDetails("Description:").then(function (descriptionText) {
                descTextVal = descriptionText;
                console.log(descTextVal);
            });
            callCenter.ViewNotesClose();
            browser.sleep(2000);
            callCenter.discountOptions("Edit");
            browser.sleep(2000);
            callCenter.applyDiscount("Amount", "5", "EmployeeDiscount", "desc1", "notes1");
            browser.sleep(1000);
            callCenter.applyButton();
            browser.sleep(2000);
            callCenter.viewPlusIcon("Discounts");
            browser.sleep(3000);
            callCenter.discountOptions("Delete");
            browser.sleep(2000);
            callCenter.delete();
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

        })
})




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
global.discountDetailsAmtLine1 = "";
global.discountAmtBillDetails = "";
global.appeasementDetailsAmtLine1 = "";
global.appeasementAmtBillDetails = "";
global.orderlvlAppeasementval = "";
global.appeasement = "";
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //Add SKU to the sales order from call center inventory lookup then save and release the order
    //Applying discounts and appeasements to the order and creating shipment for the order
    //Discounts and appeasement validations like negative and positive.

    it('Call center Flow TC0007', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
     //updated by vishak 
       	browser.sleep(1000);
        callCenter.editLineGear("3");       
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
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "101", "EmployeeDiscount", "desc1", "notes1");
        callCenter.errorMessages("discountError").then(function (errorTextMsg) {
            errorMessage = errorTextMsg;
            console.log(errorMessage);
            expect(errorTextMsg).toBe("Total discount cannot exceed total line price.");
        });
        browser.sleep(1000);
        callCenter.applyDiscount("Percentage", "-10", "EmployeeDiscount", "desc1", "notes1");
        callCenter.errorMessages("discountError").then(function (errorTextMsg) {
            errorMessage = errorTextMsg;
            console.log(errorMessage);
            expect(errorTextMsg).toBe("Discount cannot be negative.");
        });
        callCenter.applyDiscount("Percentage", "6", "EmployeeDiscount", "desc1", "notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn();
        
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

            //!*********fulfillment request**********!//
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            callCenter.shipAccountselect(browser.params.shipaccount);
            callCenter.packageSelection(browser.params.packageValue);
            callCenter.packageTrackingNumber(1236547890);
            callCenter.enterItemQty("1");
            //callCenter.unselectPkg();
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            callCenter.finalizeShipment();
            browser.sleep(3000);
            //callCenter.ViewNotesClose();
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);
            callCenter.callCenterSalesOrderSelectGear("View");
            browser.sleep(5000);
           /* callCenter.editLineGear("1");
            browser.sleep(3000);*/
            callCenter.lineLevelAppeasement();
            browser.sleep(2000);
            callCenter.applyAppeasement("Percentage", "101", "EmployeeAppeasement", "desc1", "notes1");
            callCenter.errorMessages("appeasementError").then(function (errorTextMsg) {
                errorMessage = errorTextMsg;
                console.log(errorMessage);
                expect(errorTextMsg).toBe("Total appeasement cannot exceed line total.");
            });
            browser.sleep(2000);
            callCenter.applyAppeasement("Percentage", "-5", "EmployeeAppeasement", "desc1", "notes1");
            callCenter.errorMessages("appeasementError").then(function (errorTextMsg) {
                errorMessage = errorTextMsg;
                console.log(errorMessage);
                expect(errorTextMsg).toBe("Appeasement cannot be negative.");
            });
            browser.sleep(2000);
            callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1", "notes1");
            browser.sleep(1000);
            callCenter.applyButton();
            browser.sleep(3000);
            callCenter.viewPlusIcon("Appeasements");
            browser.sleep(4000);
            callCenter.appeasementViewNotes();
            browser.sleep(1000);
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
            browser.sleep(10000);
            callCenter.orderLevelAppeasement();
            browser.sleep(2000);
            callCenter.applyAppeasement("Amount", "27", "EmployeeAppeasement", "desc1", "notes1");
            callCenter.applyButton();
            /*callCenter.errorMessages("appeasementError").then(function (errorTextMsg) {
                errorMessage = errorTextMsg;
                console.log(errorMessage);
                expect(errorTextMsg).toBe("Total appeasement cannot exceed total of fulfilled line items.");
            });*/
            browser.sleep(10000);
            callCenter.orderLevelAppeasement();
            browser.sleep(2000);
            callCenter.applyAppeasement("Amount", "-5", "EmployeeAppeasement", "desc1", "notes1");
            callCenter.errorMessages("appeasementError").then(function (errorTextMsg) {
                errorMessage = errorTextMsg;
                console.log(errorMessage);
                expect(errorTextMsg).toBe("Appeasement cannot be negative.");
            });
            browser.sleep(2000);
            callCenter.applyAppeasement("Amount", "6", "EmployeeAppeasement", "desc1", "notes1");
            browser.sleep(1000);
            callCenter.applyButton();

                    browser.sleep(2000);
                    callCenter.appeasementsHeader();
                    browser.sleep(2000);

        })


    })
})





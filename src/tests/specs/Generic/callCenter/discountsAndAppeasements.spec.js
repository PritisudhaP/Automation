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
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //Add SKU to the sales order from call center inventory lookup then save and release the order
    //Applying discounts and appeasements to the order and creating shipment for the order

    it('Call center Flow TC0005', function () {

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
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("25.99");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "7", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn(); 
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(300);
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
        browser.sleep(5000);
        callCenter.viewPlusIcon("Discounts");
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
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            //!*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
            });
        });
            //!*********fulfillment request**********!//
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
	            browser.get(fulfillmentRequestsUrl);
	            callCenter.OrderNumberSearch("Original Order #", SONumber);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(1000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            callCenter.packageSelection(browser.params.packageValue);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("1");
	            callCenter.unselectPkg();
	            callCenter.addPackageToShipment();
	            callCenter.finalizeShipment();
	            browser.sleep(4000);
	            expect(callCenter.shipmentStatusLabelPending()).toEqual(browser.params.shipmentstatus);
	            
		    });
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            callCenter.callCenterSalesOrderSelectGear("View");
          /*  callCenter.editLineGear("3");
            browser.sleep(1000);*/
            callCenter.lineLevelAppeasement();
            callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1","notes1");
            callCenter.applyButton();
            callCenter.viewPlusIcon("Appeasements");
            callCenter.appeasementViewNotes();
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
            callCenter.orderLevelAppeasement();
            callCenter.applyAppeasement("Amount", "6","EmployeeAppeasement","desc1","notes1");
            callCenter.applyButton();
            callCenter.appeasementsHeader();
        });

    });
});





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


    //Add SKU from SKU link to the sales order from call center inventory lookup then save and release the order
    //Decrement SKU quantity and getting shipped and allocated count in the order
    //Applying discounts and appeasements to the order and creating shipment for the order
    //Deleting appeasements from the appeasement header


    it('Call center Flow TC0006', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.skuLinkAtInventory();
        callCenter.addToOrder();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("2");
        callCenter.editLinePopUpSaveBtn();
        browser.sleep(2000);
        callCenter.decrementQty();
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("25.99");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "7", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn();
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
            //!*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
            });            
            callCenter.callCenterSalesOrderSelectGear("View");
            callCenter.allocatedLineCount().then(function(allocatedCount){
                allocatedLineCount = allocatedCount;
                console.log(allocatedLineCount);
                expect(allocatedLineCount).toBe("Allocated:1");
            });
            //!*********fulfillment request**********!//
            browser.get(fulfillmentRequestsUrl);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            callCenter.shipAccountselect(browser.params.shipaccount);
            callCenter.packageSelection(browser.params.packageValue);
            callCenter.enterItemQty("1");
            callCenter.unselectPkg();//updated by vishak
            callCenter.packageTrackingNumber("1236547890")
            callCenter.addPackageToShipment();
            callCenter.finalizeShipment();
            browser.sleep(3000);
            //callCenter.ViewNotesClose();//updated by vishak, not printing the shipping labels. 
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            callCenter.callCenterSalesOrderSelectGear("View");
            callCenter.shippedLineCount().then(function(shippedCount){
                shippedLineCount = shippedCount;
                console.log(shippedLineCount);
                expect(shippedLineCount).toBe("Shipped:1");
            });
           // browser.sleep(5000);
           // callCenter.editLineGear("1");
            callCenter.lineLevelAppeasement();
            callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1","notes1");
            callCenter.applyButton();
            callCenter.orderLevelAppeasement();
            callCenter.applyAppeasement("Amount", "6","EmployeeAppeasement","desc1","notes1");
            callCenter.applyButton();
            callCenter.appeasementsHeader();
            callCenter.appeasementOptions("Delete");
            callCenter.delete();
            callCenter.appeasementOptions("Delete");
            callCenter.delete();
        })

    })
})





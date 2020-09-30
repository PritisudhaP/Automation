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
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(1000);
        callCenter.skuLinkAtInventory();
        browser.sleep(2000);
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
        callCenter.lineItemselectOptions("Edit Line");
        browser.sleep(1000);
        callCenter.editSKUQuantity("2");
        browser.sleep(2000);
        callCenter.editLinePopUpSaveBtn();
        browser.sleep(2000);
        callCenter.editLineGear("1");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("25.99");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        callCenter.decrementQty();
        browser.sleep(500);
        callCenter.editLine();
        browser.sleep(2000);
        callCenter.applyDiscount("Percentage", "7", "EmployeeDiscount", "desc1","notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(2000);
        callCenter.editLinePopUpSaveBtn();
        browser.sleep(7000);

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
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);
            callCenter.callCenterSalesOrderSelectGear("View");
            browser.sleep(2000);
            callCenter.allocatedLineCount().then(function(allocatedCount){
                allocatedLineCount = allocatedCount;
                console.log(allocatedLineCount);
                expect(allocatedLineCount).toBe("Allocated:1");
            });


            //!*********fulfillment request**********!//
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.packageValue);
            browser.sleep("500");
            callCenter.enterItemQty("1");
            callCenter.unselectPkg();
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);
            callCenter.ViewNotesClose();
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);
            callCenter.callCenterSalesOrderSelectGear("View");
            callCenter.shippedLineCount().then(function(shippedCount){
                shippedLineCount = shippedCount;
                console.log(shippedLineCount);
                expect(shippedLineCount).toBe("Shipped:1");
            });
            browser.sleep(5000);
            callCenter.editLineGear("1");
            browser.sleep(1000);
            callCenter.lineLevelAppeasement();
            browser.sleep(2000);
            callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1","notes1");
            browser.sleep(1000);
            callCenter.applyButton();
            browser.sleep(2000);
            callCenter.orderLevelAppeasement();
            browser.sleep(1000);
            callCenter.applyAppeasement("Amount", "6","EmployeeAppeasement","desc1","notes1");
            browser.sleep(1000);
            callCenter.applyButton();
            browser.sleep(2000);
            callCenter.appeasementsHeader();
            browser.sleep(2000);
            callCenter.appeasementOptions("Delete");
            browser.sleep(2000);
            callCenter.delete();
            browser.sleep(5000);
            callCenter.appeasementOptions("Delete");
            browser.sleep(2000);
            callCenter.delete();
        })

    })
})





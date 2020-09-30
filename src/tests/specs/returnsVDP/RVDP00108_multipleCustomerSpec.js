var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsVDPScreen = require(process.cwd() + '/src/tests/screens/ReturnVDP/returnsVDPScreen.js');

global.orderStatus = "";
global.shipmentId = "";
global.SONumber = "";
global.SONumber2 = "";
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
describe('RMA creation selecting FRs related to 2 different customers.: Return-Vendor portal-00108', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var returnsvdp = new returnsVDPScreen();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    /* ************************************************************
        **Create 2 sales orders and release the orders.
        * Create Shipment for both the orders
        **Navigate to Fulfillment> Returns
        **Select the above created orders
        **Click 'Inspect Return'
        **Create RMA
        **Verification: No error should get displayed and 2 RMA' should created: 1 for each customer
        * Validate both RMA's
        ************************************************************ */

    it('multiple customer', function () {

        browser.get(salesOrderUrl);
        browser.driver.sleep(2000);
        browser.waitForAngular();
//Create sales order with customer 1:
        commons.new();
        //salesOrderCreate.setSalesChannel("FULFILLMENT");
        storePortals.salesChannel("1");
        salesOrderCreate.attachCustomer();
        browser.sleep(2000);
        salesOrderCreate.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
        salesOrderCreate.searchInPopup();
        browser.sleep(3000);
        salesOrderCreate.selectSKU();
        //storePortals.qtyUpdate(2);
        browser.sleep(3000);
        salesOrderCreate.addProduct();

        //***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log("SONumber>>>>", +SONumber);

            //***************<<<< Below lines : to RELEASE the sales order >>>>>>********************

            browser.wait(function () {
                return SONumber != '';
            }).then(function () {
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                //////////////!***************<<<< Below lines : Create Shipment >>>>>>********************
                browser.get(fulfillmentRequestsUrl);
                browser.sleep(2000);
                callCenter.OrderNumberSearch("Original Order #", SONumber);
                browser.sleep(3000);
                callCenter.fulfillmentOrderSelectGear("Create Shipment");
                browser.sleep(3000);
                callCenter.packageSelection("Box");
                browser.sleep("500");
                callCenter.enterItemQty("1");
                browser.sleep(1000);
                callCenter.addPackageToShipment();
                browser.sleep(2000);
                callCenter.finalizeShipment();
                browser.sleep(3000);
                callCenter.ViewNotesClose();
            })
// Create second sales order with different customer-2
            browser.get(salesOrderUrl);
            browser.driver.sleep(2000);
            browser.waitForAngular();

            commons.new();
            //salesOrderCreate.setSalesChannel("FULFILLMENT");
            storePortals.salesChannel("1");
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            salesOrderCreate.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue2);
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct(browser.params.searchValueSKU3);
            salesOrderCreate.searchInPopup();
            browser.sleep(3000);
            salesOrderCreate.selectSKU();
            browser.sleep(3000);
            salesOrderCreate.addProduct();

            //***************<<<< Below line is to SAVE the sales order >>>>>>********************

            salesOrderCreate.saveOption("Save");

            salesOrderCreate.salesOrderNumber().then(function (value) {
                SONumber2 = value;
                console.log("SONumber2>>>>", +SONumber2);
                console.log("second customer");
                //***************<<<< Below lines : to RELEASE the sales order >>>>>>********************

                browser.wait(function () {
                    return SONumber2 != '';
                }).then(function () {
                    browser.get(salesOrderUrl);
                    salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
                    commons.multiselect();
                    browser.sleep(3000);

                    salesOrderSummary.salesOrderSelectGear("Release");
                    browser.sleep(2000);
                    expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                    //////////////!***************<<<< Below lines : Create Shipment >>>>>>********************
                    browser.get(fulfillmentRequestsUrl);
                    browser.sleep(2000);
                    callCenter.OrderNumberSearch("Original Order #", SONumber2);
                    browser.sleep(3000);
                    callCenter.fulfillmentOrderSelectGear("Create Shipment");
                    browser.sleep(3000);
                    callCenter.packageSelection("Box");
                    browser.sleep("500");
                    callCenter.enterItemQty("1");
                    browser.sleep(1000);
                    callCenter.addPackageToShipment();
                    browser.sleep(2000);
                    callCenter.finalizeShipment();
                    browser.sleep(3000);
                    callCenter.ViewNotesClose();
                })
                // Navigate to Returns
                browser.get(vendorPortalReturnsUrl);
                browser.driver.sleep(2000);
                storePortals.searchShipment("Order #", '', SONumber2);
                browser.sleep(1000);
                returnsvdp.clickMatchCriteria();
                storePortals.selectMatchingCriertia('Matching Any');
                storePortals.searchShipment("Order #", '', SONumber);
                storePortals.multipleOrderSelect();
                returnsvdp.clickSearch();
                browser.driver.sleep(1000);
                returnsvdp.multiSelect();
                browser.driver.sleep(1000);
                returnsvdp.inspectReturn();
                browser.driver.sleep(1000);
                returnsvdp.enterDisposition(1);
                returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
                returnsvdp.clickSave();

                // Now enter disposition for 2nd order
                browser.sleep(2000);
                returnsvdp.enterDisposition(2);
                returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
                returnsvdp.clickSave();
                browser.sleep(1000);
                returnsvdp.clickView(2);
                browser.sleep(1000);
                //returnsvdp.submitReturns();
                try {
                    returnsvdp.submitReturns().then(function () {
                        browser.sleep(1000);
                        console.log('Submitted successfully');
                    }, function (err) {
                        console.error('error sending submit ' + err);
                        throw err;
                    });
                } catch (err) {
                    console.log('error occured');
                }
                //***<<<< Navigate to Return-Payment Disposition and verify RMA creation >>>>******
                browser.get(paymentDispositionUrl);
                storePortals.searchShipment("Order #", '', SONumber);
                browser.sleep(1000);
                browser.sleep(1000);
                returnsvdp.clickMatchCriteria();
                storePortals.selectMatchingCriertia('Matching Any');
                storePortals.searchShipment("Order #", '', SONumber2);
                returnsvdp.getMultipleRMAId().then(function (rmaID) {
                    console.log(rmaID.length);
                    //alert(typeof rmaID);
                    console.log(rmaID);
                    var rmaIds = rmaID.toString().split(",");
                    var rma1 = rmaIds[0];
                    var rma2 = rmaIds[1];
                    console.log(rma1);
                    console.log(rma2);

                    returnsvdp.clickMultipleRMA(1);
                    browser.sleep(2000);
                    //
                    returnsvdp.getScreenId().then(function (value) {
                        rmaid = value;
                        console.log(rmaid);
                        rma = rmaid.substring(34);
                        console.log(rma1);
                        expect(rma).toBe(rma1);
                    })
                    browser.sleep(2000);
                    element(by.xpath("//span[text()='Back']")).click();
                    returnsvdp.clickMultipleRMA(2);
                    browser.sleep(2000);
                    returnsvdp.getScreenId().then(function (value) {
                        rmaid = value;
                        console.log(rmaid);
                        rma = rmaid.substring(34);
                        console.log(rma1);
                        expect(rma).toBe(rma2);
                    })
                })
            })
        })
    });
    //almost done
})


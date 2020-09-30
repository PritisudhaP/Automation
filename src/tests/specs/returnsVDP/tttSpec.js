var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsVDPScreen = require(process.cwd() + '/src/tests/screens/ReturnVDP/returnsVDPScreen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');

global.orderStatus = "";
global.shipmentId = "";
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
describe('Sales Order creation Via call center and RMA creation: Multi line order : Return-Vendor portal-00104', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var returnsvdp = new returnsVDPScreen();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();

    /* ************************************************************
        **Create sales order with 2 lines : 1 qty each and release the order.
        **Apply discounts
        **Create Shipment
        **Create Disposition for 2 lines
        ** Verify if single RMA has been created successfully.
        ** Validate RMA status, RMA id, Shipment Id,Return Qty,
        ************************************************************ */

    it('RMA Creation-Multi line', function () {
        console.log("RMA ML");

        //!***************<<<< Below lines : Create Shipment >>>>>>********************
        browser.get(fulfillmentRequestsUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
              //for 2nd FR>>>>>>>>>>>>
        shipmentRequestsSummary.shipmentRequestSearch("Original Order #", "000000008158");
        browser.sleep(2000);
        returnsvdp.resCount().then(function (count) {
            console.log(count);
            returnQTy = parseInt(count);
            console.log("returnQTy>>>>",+ returnQTy);
            for(i=1; i<returnQTy; i++) {
                returnsvdp.clickGearLoop(i);
                storePortals.FRSelectGear("Edit");
                browser.sleep(3000);
                storePortals.navigateToShipmentsPane();
                shipmentRequestsCreate.createShipment();
                browser.sleep(2000);
                // shipmentRequestsCreate.selectShippingAccount("test");
                browser.sleep(2000);
                returnsvdp.enterTracking("1122");
                shipmentRequestsCreate.packageSelection("tst");
                storePortals.enterItemQty(1, 1);
                shipmentRequestsCreate.addPackageToShipment();
                returnsvdp.checkSKipLabel();
                shipmentRequestsCreate.finalizeShipment();
                browser.sleep(2000);
                browser.get(shipmentRequestsUrl);
                commons.refresh();
                browser.sleep(3000);
                storePortals.clickGear();
                storePortals.FRSelectGear("Edit");
                storePortals.navigateToShipmentsPane();

                storePortals.getShipment().then(function (shipmentId) {
                    value = shipmentId;
                    res = value.substring(12);
                    shipmentId = res;
                    console.log("shipmentId>>>>" + shipmentId);
                });

            }
        })


//<<<<<<****
        browser.get(vendorPortalReturnsUrl);
        browser.driver.sleep(2000);
        storePortals.searchShipment("Order #", '', SONumber);
        browser.sleep(1000);
        returnsvdp.selectOrderFromSearch();
        browser.sleep(1000);
        commons.search();
        // element(by.xpath('//button/en-icon[@icon="search"]/parent::button')).click();
        browser.sleep(1000);
        returnsvdp.selectOrderFromResults();
        returnsvdp.inspectReturn();
        // Below method to check if submit button is disbaled when disposition details are blank
        returnsvdp.submitDispositionStatus().then(function (status) {
            console.log(status);
            browser.sleep(1000);
            expect(status).toBe(null);
        });
        returnsvdp.getReturnQty().then(function (qty) {
            returnQTy = parseInt(qty);
            console.log("returnQTy>>>>", +returnQTy);
        })
        returnsvdp.enterDisposition(1);
        returnsvdp.validateMissingReason(1).then(function (errorMsg) {
            expect(errorMsg).toEqual("Reason cannot be Blank");
        });
        returnsvdp.deleteRow();
        returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
        //Saves the return disposition
        returnsvdp.clickSave();
        //View the disposition
        //returnsvdp.clickView(1);
        // now enter disposition for 2nd order
        browser.sleep(2000);
        returnsvdp.enterDisposition(2);
        returnsvdp.validateMissingReason(1).then(function (errorMsg) {
            expect(errorMsg).toEqual("Reason cannot be Blank");
        });
        returnsvdp.deleteRow();
        returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
        //Saves the return disposition
        returnsvdp.clickSave();
        browser.sleep(1000);
        //View the disposition
        returnsvdp.clickView(2);
        browser.sleep(1000);
        returnsvdp.submitReturns();

        //Navigate to Return-Payment Disposition and verify RMA creation
        browser.get(paymentDispositionUrl);
        storePortals.searchShipment("Order #", '', SONumber);
        browser.sleep(2000);
        //***<<<< Validation to confirm RMA status :to be 'Inspected' >>>>>>>****
        returnsvdp.getRMAStatus().then(function (status) {
            expect(status).toBe('INSPECTED');
        })
        returnsvdp.clickRMA();
        browser.sleep(3000);

        /*** returnsvdp.confirmShipmentID().then(function (shipId) {
                expect(shipId).toBe('shipmentId');
            })*/
        //*****<<<<< Validation to confirm Return Qty  >>>>******
        returnsvdp.confirmAttribute(4).then(function (returQty) {
            expect(returQty).toBe('1');
        })
        //*****<<<<< Validation to confirm shipment id >>>>******
        /*returnsvdp.confirmAttribute(2).then(function (shipId) {
            expect(shipId).toBe('shipmentId');
        })*/
        returnsvdp.enterCreditAmount(1, 25);
        returnsvdp.enterCreditAmount(2, 25);

        //*****<<<<<select credit type  >>>>******
        returnsvdp.selectCreditType("REFUND");
        //*****<<<<< Click Submit  >>>>******
        returnsvdp.clickSubmit();
        browser.sleep(3000);
        //*****<<<<< VERIFY RMA status after submit  >>>>******

        storePortals.searchShipment("Order #", '', SONumber);
        browser.sleep(1000);
        returnsvdp.getRMAStatus().then(function (status) {
            expect(status).toBe('PENDING PAYMENT');
        })
    })
})



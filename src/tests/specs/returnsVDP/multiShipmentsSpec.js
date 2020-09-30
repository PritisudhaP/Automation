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
global.i = "";
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
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        element(by.xpath("//div/button[text()='Search']")).click();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        //callCenter.editLineGear(1);
        //callCenter.lineItemselectOptions("Change Price");
        //browser.sleep(2000);
        //callCenter.changingUnitPrice("25.99");
        browser.sleep(3000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        element(by.xpath("//div/button[text()='Search']")).click();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(2000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log("Initial fetched salesorder number", +SONumber);
        });
        browser.sleep(2000);

        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            //!***************<<<< Below lines : Create Shipment >>>>>>********************
            browser.wait(function () {
                return SONumber != '';
            }).then(function () {
                browser.get(shipmentRequestsUrl);
                // console.log(SONumber);
                browser.sleep(2000);
                shipmentRequestsSummary.shipmentRequestSearch("Original Order #", SONumber);
                browser.sleep(2000);
                returnsvdp.resCount().then(function (count) {
                    console.log("count>>>>", +count);
                    returnQTy = parseInt(count);
                    console.log("returnQTy>>>>", +returnQTy);
                    for (i = 1; i <= returnQTy; i++) {
                        browser.get(shipmentRequestsUrl);
                        shipmentRequestsSummary.shipmentRequestSearch("Original Order #", SONumber);
                        returnsvdp.clickGearLoop(i);
                        console.log("i>>>>", +i);
                        storePortals.FRSelectGear("Edit");
                        browser.sleep(3000);
                        storePortals.navigateToShipmentsPane();
                        shipmentRequestsCreate.createShipment();
                        browser.sleep(2000);
                        shipmentRequestsCreate.packageSelection("tst");
                        browser.sleep(2000);
                        returnsvdp.enterTracking("1122");
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
                            shipment1 = shipmentId;
                        })
                        browser.sleep(3000);
                    }
                });
                //<<<<<<*******************************************************
                browser.get(vendorPortalReturnsUrl);
                browser.driver.sleep(2000);
                storePortals.searchShipment("Order #", '', SONumber);

                console.log("salesorder>>>>>", +SONumber);
                browser.sleep(1000);
                returnsvdp.selectOrderFromSearch();
                browser.sleep(1000);
                commons.search();
                // element(by.xpath('//button/en-icon[@icon="search"]/parent::button')).click();
                browser.sleep(1000);
                returnsvdp.selectAllResults();
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
                returnsvdp.addDisposition(1, "DAMAGED", "this is testing");
                //Saves the return disposition
                returnsvdp.clickSave();
                //View the disposition
                //returnsvdp.clickView(1);
                // now enter disposition for 2nd order
                browser.sleep(2000);
                returnsvdp.enterDisposition(2);
                returnsvdp.addDisposition(1, "DOES NOT FIT", "this is QA");
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
    })
//done
})


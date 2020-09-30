//********************************************************* Valid test case ****************************************************
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";

describe('Verify  if user can  accept the orders (Accept Full-Pick Partial)-multiple lines :TC0006 ', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();

    var storePortals = new storePortal();
    var loginScreen = new loginPage();


    it('Sales Order that  order that release,accept,reject, pick,finalize shipment successfully - TC0006', function () {

        /* ************************************************************
           Creates a sales order with a multiple lines say 2 lines and releases it.
           Accept the Fulfillment request. In pack & ship screen, reject 1 line and accept 1 line , finalize the shipment.
           Checks Inventory levels before and after shipment. Verifies order/line item status.
          ************************************************************ */

        browser.get(salesOrderUrl);
        browser.driver.sleep(5000);
        console.log("Navigating to sales order list screen");

//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();


        storePortals.salesChannel("Fulfillment");
        salesOrderCreate.attachCustomer();
        browser.sleep(2000);
        salesOrderCreate.searchCustomer("Name", "MUSICA");
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("7-0-8");
        salesOrderCreate.searchInPopup();
        browser.sleep(3000);
        salesOrderCreate.selectSKU();
        browser.sleep(3000);
        salesOrderCreate.addProduct();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("7-0-8");
        salesOrderCreate.searchInPopup();
        browser.sleep(3000);
        salesOrderCreate.selectSKU();
        browser.sleep(3000);
        salesOrderCreate.addProduct();

//***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);

//***************<<<< Below lines are for Inventory Check: Before Release >>>>>>********************

        browser.get(inventorySearchUrl);

        inventorySearch.enterSite("Fitchburg-DC");
        inventorySearch.addSKU();
        commons.searchWithCriteria("Name", "contains", "KALINNIKOVI/COMP SACRED CHORAL");
        browser.sleep(2000);
        inventorySearch.selectSKU();
        inventorySearch.addProduct();
        browser.sleep(2000);
        inventorySearch.searchInventory();
        browser.sleep(2000);

        storePortals.getAvailableQty().then(function (availableQty) {
            currentInventoryCount = availableQty;
            postInventoryCount = parseInt(currentInventoryCount) - 1;
            updatedInventoryCount = parseInt(currentInventoryCount) - 2;

            browser.sleep(2000);
        });

        storePortals.getReservedQty().then(function (resQty) {
            resInventoryCount = resQty;
            postResCount = parseInt(resInventoryCount);
            updatedResCount = parseInt(resInventoryCount) + 2;

            browser.sleep(2000);
        });


        browser.sleep(2000);

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

            //*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
            });

//**********<<< Navigate To StorePortal >>>  *******************************
            storePortals.navigateToStorePortal();

            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);

            storePortals.clickGear();
            browser.sleep(1000);
            storePortals.FRSelectGear("Accept Partial");
            browser.sleep(2000);

//***************<<<< Below lines : to ACCEPT>> PICK >> CREATE PACKAGE>> FINALIZE FULFILLMENT >>>the FULFILLMENT REQ >>>>>>********************
            storePortals.acceptOrder();
            browser.sleep(2000);
            storePortals.getStatus().then(function (status) {
                expect(status).toBe('ACCEPTED');
                console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                browser.sleep(2000);
                storePortals.packAndShipOrder();

                storePortals.getStatusPS().then(function (status) {
                    expect(status).toBe('PICKED');
                    console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);

                    browser.sleep(2000);
                    storePortals.rejectRemainingItems();

                    storePortals.getStatusPS().then(function (status) {
                        //expect(status).toBe('PARTIALLY ACCEPTED');
                        expect(status).toBe('PICKED');
                        console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);

                        storePortals.qtyPick();
                        browser.sleep(2000);
                        storePortals.boxPkg('Box');
                        browser.sleep(2000);
                        storePortals.addpkg();

                        browser.sleep(2000);
                        storePortals.completeFulfill();

                        storePortals.getStatusPS().then(function (status) {
                            expect(status).toBe('SHIPMENT CREATED');
                            console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                            storePortals.printAllDocuments();
                            browser.sleep(1000);
                            element(by.xpath("//span[text()='Close']")).click();
                            browser.sleep(1000);

                        });

                    });
                });

            });
////***************<<<< Below lines are for Inventory Check: After shipment >>>>>>********************
            browser.sleep(5000);
            browser.get(inventorySearchUrl);
            inventorySearch.enterSite("Fitchburg-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("Name", "contains", "KALINNIKOVI/COMP SACRED CHORAL");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);

            storePortals.getAvailableQty().then(function (availableQty) {
                expect(availableQty).toEqual(postInventoryCount);
                browser.sleep(2000);
                console.log("*********** Final: Available Inventory Level   >>>>>>>>>>>> " + postInventoryCount);

            });
            storePortals.getReservedQty().then(function (resQty) {
                expect(resQty).toEqual(postResCount);
                browser.sleep(2000);
                console.log("*********** Final: Reserved Inv Level   >>>>>>>>>>>> " + postResCount);
            });


//fetch salesorder URL:
            browser.get(salesOrderUrl);

            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            commons.multiselect();
            browser.sleep(1000);
            //
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
                expect(orderStatus).toEqual('PARTIALLY SHIPPED');
            });

// ********** Check Line status*********

            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
            storePortals.soLineStatus(1).then(function (status) {
                lineStatus1 = status;
                console.log(lineStatus1);
                expect(lineStatus1).toEqual('OPEN');
            });
            storePortals.soLineStatus(2).then(function (status) {
                lineStatus2 = status;
                console.log(lineStatus2);
                expect(lineStatus2).toEqual('CLOSED');
            });
        })


    })

})



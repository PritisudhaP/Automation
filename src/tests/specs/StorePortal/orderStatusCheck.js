//********************************************************* Valid test case ****************************************************
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');

global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";


describe('Verify order status after accepting FR in Store Portal', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();

    var storePortals = new storePortal();
    var loginScreen = new loginPage();


    it('Verify order status after accepting FR in Store Portal ', function () {
        /* ************************************************************
                           Creates a sales order with a single lines znd qty = 3 ; and releases it.
                           Accept the Fulfillment request partially(reject 1 unit). In pack & ship screen, reject 1 unit and accept 1 unit , finalize the shipment.
                           Checks Inventory levels before and after shipment. Verifies order/line item status.
                          ************************************************************ */

        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

        /*loginScreen.setUsername(browser.params.login.loginUser);
         loginScreen.setPassword(browser.params.login.password);
     loginScreen.login();
         browser.sleep(3000);*/
        browser.driver.sleep(3000);
        //console.log("Executing Accept Partial pick partial Single line spec");

//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        storePortals.salesChannel("1");
        browser.sleep(2000);
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
        storePortals.qtyUpdate(3);
        browser.sleep(3000);
        salesOrderCreate.addProduct();


//***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log("*********** ORDER# >>>>>>>>>>>> " + SONumber);
        });

        browser.sleep(2000);

//***************<<<< Below lines are for Inventory Check: Before Release >>>>>>********************

        browser.get(inventorySearchUrl);

        inventorySearch.enterSite(browser.params.siteName);
        inventorySearch.addSKU();
        commons.searchWithCriteria("SKU", "is", browser.params.searchValueSKU1);
        browser.sleep(2000);
        inventorySearch.selectSKU();
        inventorySearch.addProduct();
        browser.sleep(2000);
        inventorySearch.searchInventory();
        browser.sleep(2000);

        storePortals.getAvailableQty().then(function (availableQty) {
            currentInventoryCount = availableQty;
            postInventoryCount = parseInt(currentInventoryCount) - 1;
            updatedInventoryCount = parseInt(currentInventoryCount) - 3;

            browser.sleep(2000);
        });

        storePortals.getReservedQty().then(function (resQty) {
            resInventoryCount = resQty;
            postResCount = parseInt(resInventoryCount);
            updatedResCount = parseInt(resInventoryCount) + 3;

            browser.sleep(2000);
        });

//***************<<<< Below lines : to RELEASE the sales order >>>>>>********************

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

//***************<<<< Below lines are for Inventory Check: AFTER Release >>>>>>********************
            /*
                        browser.get(inventorySearchUrl);
                        inventorySearch.enterSite(browser.params.siteName);
                        inventorySearch.addSKU();
                        commons.searchWithCriteria("SKU", "is", browser.params.searchValueSKU1);
                        browser.sleep(2000);
                        inventorySearch.selectSKU();
                        inventorySearch.addProduct();
                        browser.sleep(2000);
                        inventorySearch.searchInventory();
                        browser.sleep(2000);
                        storePortals.getAvailableQty().then(function (availableQty) {
                            expect(availableQty).toEqual(updatedInventoryCount);
                            console.log("*********** Available: After Release  >>>>>>>>>>>> " + updatedInventoryCount);

                        });

                        storePortals.getReservedQty().then(function (resQty) {
                            expect(resQty).toEqual(updatedResCount);
                            console.log("*********** Reserved: After Release  >>>>>>>>>>>> " + updatedResCount);

                        });

                        browser.sleep(1000);
                    });
            */

            //**********<<< Navigate To StorePortal >>>  *******************************

            storePortals.navigateToStorePortal();

            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);

            //storePortals.clickGear();
            browser.sleep(1000);

            //***************<<<< Below lines : to ACCEPT the sales order from 2nd screen >>>>>>********************


            storePortals.acceptOrder();
            browser.sleep(1000);
            expect(storePortals.getStatus()).toEqual("ACCEPTED");

            browser.sleep(5000);
            browser.get(inventorySearchUrl);
            inventorySearch.enterSite(browser.params.siteName);
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU", "is", browser.params.searchValueSKU1);
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

            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
                expect(orderStatus).toEqual('PARTIALLY SHIPPED');
            });

            browser.sleep(1000);
// ********** Check Line status*********

            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
            storePortals.soLineStatus(1).then(function (status) {
                lineStatus1 = status;
                console.log(lineStatus1);
                expect(lineStatus1).toEqual('PARTIALLY SHIPPED');
                browser.sleep(1000);
            });
        });
    })

})

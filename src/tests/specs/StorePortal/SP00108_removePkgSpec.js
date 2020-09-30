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


describe('Verify  if user can Partially  accept the orders (Accept Partial-Pick Partial)-MULTIPLE LINES: TC00019', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();

    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear().toString();


    it('Remove pkg and finalize shipment successfully - - TC00019', function () {


        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

       loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
       // browser.sleep(3000);
        browser.driver.sleep(3000);
        console.log("Remove pkg spec");


//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();


        //salesOrderCreate.setSalesChannel("FULFILLMENT");
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
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
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

        inventorySearch.enterSite(browser.params.siteName);
        inventorySearch.addSKU();
        commons.searchWithCriteria("SKU", "is",browser.params.searchValueSKU1);
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

            browser.get(inventorySearchUrl);
            inventorySearch.enterSite(browser.params.siteName);
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU", "is",browser.params.searchValueSKU1);
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
        });
        browser.sleep(1000);

//***************<<<< Below lines : to LOGOUT as admin user >>>>>>********************

        loginScreen.logout();
        expect(true).toBe(true);
        browser.sleep(1000);


//***************<<<< Below lines : to LOGIN as Store Portal user >>>>>>********************

        browser.get(browser.baseUrl);

        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.storePortalUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);

        storePortals.clickFulfillmentHeader();

        storePortals.isFulfillmentManagementHederDisplayed().then(function (isHomePageAVailable) {

            expect(isHomePageAVailable).toBe(true);

            console.log("Navigating to Store Portal Home Page screen");

            browser.sleep(1000);

            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            //storePortals.multiSelect();

            /*//multi Select is used to select the checkbox at line level
                           storePortals.multiSelect();
            */
            storePortals.clickGear();
            browser.sleep(1000);
            storePortals.FRSelectGear("Accept Partial");
            browser.sleep(1000);

//***************<<<< Below lines : to ACCEPT the sales order from 2nd screen >>>>>>********************

            storePortals.decrementLine();
            browser.sleep(1000);
            storePortals.acceptOrder();
            browser.sleep(1000);
            expect(storePortals.getStatus()).toEqual("PARTIALLY_ACCEPTED");
            browser.sleep(1000);
            storePortals.packAndShipOrder();

            storePortals.getStatusPS().then(function (status) {
                expect(status).toBe('PICKED');
                console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                storePortals.rejectRemainingItems();
                browser.sleep(1000);
                storePortals.qtyPick();
                browser.sleep(1000);
                storePortals.boxPkg('tst');
                browser.sleep(1000);
                storePortals.addpkg();
                browser.sleep(1000);
                storePortals.removePackage();
                browser.sleep(1000);
                storePortals.qtyPick();
                browser.sleep(1000);
                storePortals.boxPkg('tst');
                browser.sleep(1000);
                storePortals.addpkg();

                storePortals.completeFulfill();
                browser.sleep(100);
                storePortals.getStatusPS().then(function (status) {
                    expect(status).toBe('SHIPMENT CREATED');
                    console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                });
                //storePortals.printAllDocuments();
                browser.sleep(4000);
               //element(by.xpath("//span[text()='Close']")).click();
                browser.sleep(1000);
            })

//***************<<<< Below lines : to LOGOUT as admin user >>>>>>********************

            loginScreen.logout();
            expect(true).toBe(true);
            browser.sleep(1000);

            browser.get(salesOrderUrl);

            browser.driver.manage().window().maximize();

            loginScreen.setUsername(browser.params.login.loginUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(3000);


            browser.sleep(5000);
            browser.get(inventorySearchUrl);
            inventorySearch.enterSite(browser.params.siteName);
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU", "is",browser.params.searchValueSKU1);
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
        });

    });

})


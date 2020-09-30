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


describe('Accept Partial   : ', function () {

    var commons = new common();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventorySearch = new inventorySearchScreen();

    it('Verify Accept Partial button availaibility- TC00', function () {

        /* ************************************************************
            Verifies that when a user with 'Accept Partial' forbidden permissions logs into store portal,then
            that user will be able to complete the store portal workflow without any errors and he is NOT able to:
             Accept Partial, Reject Partial & Ship partial.
           ************************************************************ */
        /* Creates a sales order with a Multiple  lines  and releases it.
                          ************************************************************ */
        browser.sleep(2000);
        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        //browser.sleep(3000);
        browser.driver.sleep(3000);
        console.log("Executing pending order status check spec");

        //***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(2000);
        browser.waitForAngular();


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
        browser.sleep(3000);
        salesOrderCreate.addProduct();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
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

            //***************<<<< Below lines : to LOGOUT as admin user >>>>>>********************
            browser.sleep(2000);
            loginScreen.logout();
            expect(true).toBe(true);

            // *****


            browser.get(browser.baseUrl);

            browser.driver.manage().window().maximize();

            loginScreen.setUsername(browser.params.login.storePortalSpecificUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(3000);
            storePortals.clickFulfillmentHeader();
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
            storePortals.clickOrder(SONumber);
            browser.sleep(2000);
            //******<<< Below lines checks that Qty increment/decrement operator is disabled: Qty picker is freezed. >>****
            storePortals.itemPickerButtonStatus().then(function (value) {
                console.log(value);
                expect(value).toBe('true');
            });

            //*****<<< Accept the order >>****

            storePortals.acceptOrder();
            browser.sleep(2000);
            storePortals.getStatus().then(function (status) {
                expect(status).toBe('ACCEPTED');
                console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                browser.sleep(2000);
                //element(by.xpath("//en-header/input[@type='checkbox']")).click();
                storePortals.packAndShipOrder();

                storePortals.getStatusPS().then(function (status) {
                    expect(status).toBe('PICKED');
                    console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);

                    browser.sleep(2000);

                })
                //******<<< Below lines checks that qty picker is disabled in the pack & ship if >>****
                storePortals.qtyPickedStatus().then(function (value) {
                    console.log(value);
                    expect(value).toBe('true');
                });
                storePortals.rejectRemainingDisabled().then(function (value) {
                    console.log(value);
                    expect(value).toBe('true');
                });
                element(by.model("checked")).click();
                storePortals.qtyPick();
                browser.sleep(2000);
                storePortals.boxPkg('Box');
                browser.sleep(2000);
                storePortals.addpkg();
                element(by.model("checked")).click();
                element(by.model("checked")).click();
                browser.sleep(2000);
                storePortals.rejectRemainingDisabled().then(function (value) {
                    console.log("button is disabled>>>" + value);
                    expect(value).toBe('true');
                });
                storePortals.completeFulfillDisabled().then(function (value) {
                    console.log("completefulfill is disabled>>>" + value);
                    expect(value).toBe('true');
                });
                element(by.model("checked")).click();
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

                })

            })

        })

    })

})


//********************************************************* Valid test case ****************************************************
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/screens/login/login.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');


global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";


describe('Verify the status of the fulfillment request in Storeportal after order creation in OMS:TC0002 : ', function () {

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

    var orderNumber = '';


    it('Fulfillment request in Storeportal = Pending - TC0002', function () {
        /* ************************************************************
                           Creates a sales order with a single lines znd qty = 2 ; and releases it.
                           Verify the status of the Fulfillment req. in storeportal.
                           Expected status = "Pending"
                          ************************************************************ */
        browser.sleep(2000);
        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

        //loginScreen.setUsername(browser.params.login.loginUser);
        //loginScreen.setPassword(browser.params.login.password);
        //loginScreen.login();
        //browser.sleep(3000);
        browser.driver.sleep(3000);
        console.log("Executing pending order status check spec");

//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(2000);
        browser.waitForAngular();


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
        storePortals.qtyUpdate(2);
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

            loginScreen.setUsername(browser.params.login.storePortalUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(3000);
            storePortals.clickFulfillmentHeader();
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);

            /*storePortals.salesOrderStatus().then(function (status) {
                expect(status).toBe('PENDING');
                console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                browser.sleep(2000);

            })*/

            storePortals.getStatusHomePage().then(function (status) {
                expect(status).toBe('PENDING');
                console.log("*********** OrderStatus   >>>>>>>>>>>> " + status);
                browser.sleep(2000);
            })

        })
        loginScreen.logout();
        expect(true).toBe(true);


    })

})






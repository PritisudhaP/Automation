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


describe('Sales Order Flow  : ', function () {

    var commons = new common();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    it(' pick list', function () {
        browser.get(browser.baseUrl);

        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.storePortalUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);

        storePortals.clickFulfillmentHeader();
//*************<<<<<<< To check for status = SHIPMENT CREATED >>>>>>>>>>>>**************************
        browser.get("https://pssc165-qa.enspirecommerce.com/oms/dist/#/fulfillment/store-portal/");
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("10");
        browser.sleep(1000);

        storePortals.clickGear();
        browser.sleep(1000);
        storePortals.FRSelectGear("Print All Documents");

        browser.sleep(1000);
        element(by.xpath("//span[text()='Close']")).click();

    });
})

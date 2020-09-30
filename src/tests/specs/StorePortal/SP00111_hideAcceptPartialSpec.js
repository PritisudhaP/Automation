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

    it('Verify Accept Partial button availaibility- TC00', function () {
        /* ************************************************************
            Verifies that when a user with 'Accept Partial' forbidden permissions logs into store portal,then
            the "Accept Partial button" & "Accept Partial Option" are hidden for that user.
           ************************************************************ */
        browser.get(browser.baseUrl);

        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.storePortalSpecificUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);
        console.log("Executing Accept /reject enabled buttons spec");

        storePortals.clickFulfillmentHeader();

        storePortals.isFulfillmentManagementHederDisplayed().then(function (isHomePageAVailable) {

            expect(isHomePageAVailable).toBe(true);

            console.log("Navigating to Store Portal Home Page screen");
            browser.sleep(2000);
            storePortals.isAcceptPartialPresent().then(function (isAccepPartialAVailable) {
                expect(isAccepPartialAVailable).toBe(false);
                console.log(" AcceptPartial button is not Present");

            });
            storePortals.clickGear();
            storePortals.acceptPartialOption().then(function (isAccepPartialAVailable) {
               expect(isAccepPartialAVailable).toBe(false);
                console.log(" AcceptPartial Option is not Present");

            })
        })
    })
});

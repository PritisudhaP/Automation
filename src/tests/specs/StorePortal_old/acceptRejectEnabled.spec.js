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


describe('Accept and Reject Order enabled/disbaled   : ', function () {

    var commons = new common();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    it('Verify Accept and Reject Order button status- TC0015', function () {
        /* ************************************************************
            Verifies if 'Accept Order and Reject Order' buttons are enabled only for the FR with status = Pending and
            returns 'null',for rest all statuses these buttons should be disabled and should return 'true'
           ************************************************************ */
        browser.get(browser.baseUrl);

        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.storePortalUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);

        storePortals.clickFulfillmentHeader();
//*************<<<<<<< To check for status = PENDING >>>>>>>>>>>>**************************
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("2");
        storePortals.multiSelect();
        browser.sleep(1000);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe(null);
        });
//*************<<<<<<< To check for status = PICKED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        storePortals.index("19");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
//*************<<<<<<< To check for status = PARTIALLY ACCEPTED >>>>>>>>>>>>**************************
        // browser.get("https://pssc165-qa.enspirecommerce.com/oms/dist/#/fulfillment/store-portal/");
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        storePortals.index("20");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
//*************<<<<<<< To check for status = ACCEPTED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        storePortals.index("4");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
//*************<<<<<<< To check for status = REJECTED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        storePortals.index("6");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
//*************<<<<<<< To check for status = SHIPMENT CREATED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        storePortals.index("10");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });

    })

})



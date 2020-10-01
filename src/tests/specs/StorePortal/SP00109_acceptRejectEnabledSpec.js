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
        console.log("Executing Accept /reject enabled buttons spec");

        storePortals.clickFulfillmentHeader();
//*************<<<<<<< To check for status = PENDING >>>>>>>>>>>>**************************
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("10");
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
        storePortals.index("23");
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
        storePortals.index("24");
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
        storePortals.index("22");
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
        storePortals.index("12");
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
        storePortals.index("13");
        storePortals.multiSelect();
        browser.sleep(500);

        storePortals.accStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
        //***************<<<< Below lines : to LOGOUT as admin user >>>>>>********************

       // loginScreen.logout();
        //xpect(true).toBe(true);


    })

})



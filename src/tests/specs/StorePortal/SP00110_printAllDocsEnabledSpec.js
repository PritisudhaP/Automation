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


describe('Print All Documents : ', function () {

    var commons = new common();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    it('Verify  for Print All documents- TC0015', function () {
        /* ************************************************************
            Verifies if 'Print All Documents' option is enabled only for the FR with status = Shipment Created and
            returns 'null',for rest all statuses this button should be disbaled and should return 'true'
           ************************************************************ */
        browser.get(browser.baseUrl);

        browser.driver.manage().window().maximize();

         loginScreen.setUsername(browser.params.login.storePortalUser);
         loginScreen.setPassword(browser.params.login.password);
         loginScreen.login();
         browser.sleep(3000);
        console.log("Executing Print all docs enabled button spec");

        storePortals.clickFulfillmentHeader();
//*************<<<<<<< To check for status = PENDING >>>>>>>>>>>>**************************
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("10");
        browser.sleep(1000);

        storePortals.clickGear();
        browser.sleep(500);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });

//*************<<<<<<< To check for status = SHIPMENT CREATED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("13");
        browser.sleep(500);

        storePortals.clickGear();
        browser.sleep(500);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe(null);
        });
//*************<<<<<<< To check for status = PICKED >>>>>>>>>>>>**************************
        //browser.get("https://pssc165-qa.enspirecommerce.com/oms/dist/#/fulfillment/store-portal/");
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("23");
        browser.sleep(1000);

        storePortals.clickGear();
        browser.sleep(500);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });

//*************<<<<<<< To check for status = REJECTED>>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("12");
        browser.sleep(500);

        storePortals.clickGear();
        browser.sleep(500);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
//*************<<<<<<< To check for status =  ACCEPTED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("22");
        browser.sleep(500);

        storePortals.clickGear();
        browser.sleep(500);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
        //*************<<<<<<< To check for status = PARTIALLY ACCEPTED >>>>>>>>>>>>**************************
        browser.get(storeportalFulfilUrl);
        browser.sleep(1000);
        storePortals.searchIndexCriteria("Status");
        expect(true).toBe(true);
        //******* <<<<< INDEX :: defines STATUS in the status drop down >>>>>************
        storePortals.index("24");
        browser.sleep(500);

        storePortals.clickGear();
        browser.sleep(1000);
        storePortals.padButtonStatus().then(function (value) {
            console.log(value);
            expect(value).toBe('true');
        });
        loginScreen.logout();
        expect(true).toBe(true);

    });

})

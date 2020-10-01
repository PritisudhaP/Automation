var common = require(process.cwd() + '/screens/commons.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";


describe('Verify cancel button functionality of manual allocation window', function() {

    /*
     In this spec we are going to perform following steps
      1.create salesorder and save it
      2.try to manually allocate it by choosing site
      3.click on cancel button instead of save button
      4.verify that allocation of sku not happened and order remains in opens status.
     */


    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it('Try to cancel manual alloaction - TC004', function () {

        //create sales order
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.KitComponentsInDifferentDc);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        callCenter.clickSearch();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(2000);



        // save the sales Order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //manually allocate salesorder to desired inventory pool
        callCenter.clickOnManualAllocationButton();
        browser.sleep(5000);
        callCenter.chooseSite(browser.params.siteName);
        browser.sleep(2000);
        callCenter.clickOnSaveAndReleaseButton();
        browser.sleep(3000);

        //verify salesorder status
        callCenter.getorderStatusText().then(function(Status){
            var Orderstatus = Status;
            console.log("Order status is"+Orderstatus);
            expect(Orderstatus).toEqual("FAILED TO ALLOCATE");
        })

    });
})

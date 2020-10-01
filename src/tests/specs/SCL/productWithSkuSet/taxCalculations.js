var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "TestOMS2020TC001";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";

describe('Open callcenter salesorder and verify sales tax, s&h, line price,line totals ', function() {

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();

    /* To verify this spec we need to create a salesorder through API and provide the sales order number in line 35.

     */

    it('Open sales order created from API, verify prices and taxes - TC001', function () {

        /* create sales order with single line single qty and verify line price, tax,s&h
         */
        browser.get(callCenterSalesOrdersListUrl);
        console.log("navigating to call center sales order list screen");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);

        //verify line price




    })
})

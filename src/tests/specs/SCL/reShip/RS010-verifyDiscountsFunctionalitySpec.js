var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";
global.reshipSONumber = "";



describe("Applying discounts flow ", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("verify that discount amount applied on original order should not effect reship order  -TC012", function () {
        /* 1.create a sales order via call center with single line qty=2 and has some price
           2.apply discount to the orginal order
           3.create reship order and verify that discount amount is shown as 0.

           */

        //skuWithPriceS
        //create a sales order
        // with line qty =2.

        browser.get(callCenterInventoryUrl);

        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWithPrice);
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
        //update the line quantity as 2
        callCenter.increaseLineQty("1","2");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //add discount to the line
        callCenter.clickOnDiscountButton();
        callCenter.applyDiscount("Amount",2,"test","discount validation","test001");
        browser.sleep(3000);
        callCenter.applyButton();
        browser.sleep(2000);

        //create reship order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        browser.sleep(2000);
        salesOrderCreate.enterReshipComments("test");
        browser.sleep(1000);
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);



        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);

        //verify discount amount in open status
         callCenter.getDiscountAmount().then(function(value)
         {
             var amount = value;
             expect(amount).toBe(0);
         })

        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber = value;
            console.log(reshipSONumber);
        });
        browser.sleep(2000);



    })
})

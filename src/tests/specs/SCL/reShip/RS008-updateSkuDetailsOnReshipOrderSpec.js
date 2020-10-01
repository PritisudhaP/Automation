var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";
global.reshipSONumber1 = "";
global.reshipSONumber2 = "";


describe("updating Sku details  of reship order flow ", function () {
    var commons = new common();

    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("On Reship order, verify that Sku details can be updated or not -TC009", function () {
        /* 1.create a sales order via call center with single line qty=2.
           2.create reship order and save it.
           3.In open status,try to update the Sku details and verify that changes can't be done.
        */

        //verify the sku has avialable ats value before order creation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.reshipSku);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = parseInt(atsValue);
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "" || atsValueOfSku <= 3)) {
                var newskuvalue = atsValueOfSku + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("Test");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(newskuvalue);
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //create a sales order with line qty =2.
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.reshipSku);
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
        callCenter.increaseLineQty("1", "2");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");
        })
        //create a reship order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        salesOrderCreate.enterReshipComments("test");
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);

        //click on edit line button and try to edit sku name by clicking on pencil icon
          salesOrderCreate.clickOnEditLineButton();
          browser.sleep(1000);
          salesOrderCreate.verifySubsistueSkuNameEnablement().then(function (value) {
              var isEnabled = value;
              expect(isEnabled).toBeFalsy();
          })

    });


})

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
global.reshipSONumber1 = "";
global.reshipSONumber2 = "";


describe("verify Line Qty updation of Reship Order", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it("Create SO with lineqty =3, create reship order,decrease the lineQty =1 and save it -TC005", function () {
        /* 1.create a sales order via call center with single line qty=3
           2.create reship order
           3.decrease the line qty to 1, and save it.
           4.In open status,Increase the line qty to 2 and save it
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
                inventoryLookup.enterAdjustmentReason("QA");
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

        //create a sales order with line qty =3.
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
        //update the line quantity as 3
        callCenter.increaseLineQty("1","3");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

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
        salesOrderCreate.clickOnLineQty();
        browser.sleep(3000);

        //update the line qty by decreasing the value to 1.
        salesOrderCreate.modifyQtyValue(1);
        salesOrderCreate.applyChanges();
        browser.sleep(3000);


        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber1 = value;
            console.log(reshipSONumber1);
        });
        browser.sleep(2000);

        salesOrderCreate.clickOnLineQty();
        browser.sleep(3000);
        //update the line qty by increasing it value as 2 and save the reship order.
        salesOrderCreate.modifyQtyValue(3);
        browser.sleep(2000);
        salesOrderCreate.applyChanges();
        browser.sleep(3000);
        salesOrderCreate.clickOnSaveOrderButton();
        browser.sleep(3000);

    })

    it("verify whether reship order allows a line with 0 qty -TC006", function () {
        /* 1.create a sales order via call center with single line qty=3
           2.create reship order
           3.decrease the line qty to 0
           4.save the order and try to decrease the qty as 0.
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
                inventoryLookup.enterAdjustmentReason("QA");
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

        //create a sales order with line qty =3.
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
        //update the line quantity as 3
        callCenter.increaseLineQty("1","3");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

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
        salesOrderCreate.clickOnLineQty();
        browser.sleep(2000);


        //update the line qty by decreasing the value to 0.
        salesOrderCreate.modifyQtyValue(0);
        browser.sleep(3000);
        //verify that apply button on sku edit window is disabled.
        salesOrderCreate.ValidateApplyButtonEnablement().then(function (result) {
            expect(result).toBe(false);
            console.log("The Apply button is disabled.");
        });
        salesOrderCreate.clickOnCancelSkuUpdates();
        browser.sleep(3000);

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);

        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber1 = value;
            console.log(reshipSONumber1);
        });
        browser.sleep(2000);
        salesOrderCreate.clickOnLineQty();
        browser.sleep(3000);

        // update the line qty by increasing it value as 2 and save the reship order.

        salesOrderCreate.modifyQtyValue(2);
        browser.sleep(2000);
        salesOrderCreate.applyChanges();
        browser.sleep(3000);
        salesOrderCreate.clickOnSaveOrderButton();
        browser.sleep(3000);

        //try to reduce the quantity as 0 after saving the order.
        salesOrderCreate.clickOnLineQty();
        browser.sleep(2000);
        salesOrderCreate.modifyQtyValue(0);
        browser.sleep(3000);
        //verify that apply button on sku edit window is disabled.
        salesOrderCreate.ValidateApplyButtonEnablement().then(function (result) {
            expect(result).toBe(false);
            console.log("The Apply button is disabled.")
        });
        salesOrderCreate.clickOnCancelSkuUpdates();
        browser.sleep(3000);


    })

    it("On Reship order increase the line qty with value >= original order line qty, TC-007", function () {
        /* create original order with quantity =2
           create a reship order, and verify that on edit sku window, increase line item count "+" icon is disabled
           as we are trying to  pass/increase a value >= original order line qty.
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
                inventoryLookup.enterAdjustmentReason("QA");
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

        //create a sales order with line qty =3.
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
        //update the line quantity as 3
        callCenter.increaseLineQty(1,2);
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

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
        salesOrderCreate.clickOnLineQty();
        browser.sleep(3000);

        //verify that on edit sku window, increase line item count "+" icon is disabled.
        salesOrderCreate.isItemQtyUpdateIconEnabled().then(function (result) {
            expect(result).toBe(false);
            console.log("The Apply button is disabled.")
        });
        salesOrderCreate.clickOnCancelSkuUpdates();

        browser.sleep(3000);

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(3000);

        salesOrderCreate.salesOrderNumber().then(function (value) {
            reshipSONumber1 = value;
            console.log(reshipSONumber1);
        });
        browser.sleep(2000);

    })
})

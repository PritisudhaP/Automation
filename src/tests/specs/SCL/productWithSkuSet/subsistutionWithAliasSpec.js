var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.skuTitle = "";

describe('Order creation Flow with a sku having Alias as reference type',function () {
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();

    it('Create Order with a SKU having alias as reference type,and verify the allocated sku name TC001', function () {
        /* 1.setup a sku "crossRefAliasOriginalSKU01" with cross reference as - "alias" and add sku "replacementalias01"
           2.create a sales order by choosing crossRefAliasOriginalSKU01 sku from sku aliases tab under select sku screen.
           3.release the SO and verify that shipment is created for "replacementalias01" instead of crossRefAliasOriginalSKU01.

            */

        //verify the inventory count of replacement sku before creating the order

        /*browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.aliasReplacementSku1);
        //update ATS of Replacement to 5, if Ats =0
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 0)) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js reference sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("5");
                })
            } else {
                console.log("Refrence Sku ATS value is already greater than 0 no need to update it");
            }
        });

         */

        //create sales order with original sku
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);
        salesOrderCreate.addItem();
        browser.sleep(1000);

        //adding original sku with aliases
        salesOrderCreate.clickOnSkuWithAliasTab();
        salesOrderCreate.searchProduct(browser.params.aliasOrginalSKu1);
        salesOrderCreate.searchInPopup();
        browser.sleep(2000);
        salesOrderCreate.clickOnSkuTab();
        browser.sleep(1000);
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save the order
        salesOrderCreate.saveOption("Save");
        //order number
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });


        //verify that replacement sku name "REPLACEMENTALIAS01" is displayed under item title instead of original sku
        salesOrderCreate.getSkuName().then(function (sku) {
            skuTitle = sku;
            expect(skuTitle).toEqual(browser.params.aliasReplacementSku1);
            console.log("the dispalyed sku name is" +skuTitle);
        });
        //verify the sku replacement history
        salesOrderCreate.clickOnEditLineIcon(1);
        browser.sleep(1000);
        salesOrderCreate.lineItemselectOptions("SKU Replacement History");
        browser.sleep(3000);
        salesOrderCreate.getReplacementSkuNameFromHistory().then(function (replacementSku) {
            var replacementSkuName = replacementSku;
            expect(replacementSkuName).toContain(browser.params.aliasReplacementSku1);
            console.log("sku dispalyed under replacement sku history is" +replacementSkuName );

        })

        salesOrderCreate.getOrginalSkuNameFromHistory().then(function (originalSku) {
            var originalSkuName = originalSku;
            expect(originalSkuName).toContain(browser.params.aliasOrginalSKu1);
            console.log("sku dispalyed under replacement sku history is" +originalSkuName );
        })




        //release the sales order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
        })
        salesOrderSummary.salesOrderSelectGear("View");

        //verify that shipment request is created for alias sku instead of original sku
        salesOrderSummary.clickOnshippingRequestTab();
        salesOrderSummary.viewShippingRequest();
        salesOrderSummary.getSkuNameOnShipmentRequest().then(function (skuTitle) {
            var nameOfSKu = skuTitle;
            expect(nameOfSKu).toContain(browser.params.aliasReplacementSku1);
            console.log("sku title under shipment tab is" +nameOfSKu);
        })

    })



    it("Create Order with a SKU referring to linked aliases -TC002",function () {
        /*setup a sku multicrossRefAliasSKU01 reffering to REPLACEMENTALIAS02 as alias and
         REPLACEMENTALIAS02 reffering to REPLACEMENTALIAS03 as alias sku
         create a sales order with multicrossRefAliasSKU01 and verify that REPLACEMENTALIAS03 is allocated instead of
         REPLACEMENTALIAS02 or multicrossRefAliasSKU01.
         */
        //verify the inventory count of replacement sku before creating the order


        browser.get(inventoryLookUpUrl);

        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.aliasReplacementSku2);
        //update ATS of Replacement to 5, if Ats =0
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 0)) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js reference sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("5");
                })
            } else {
                console.log("Refrence Sku ATS value is already greater than 0 no need to update it");
            }
        });



        //create sales order with original sku
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);
        salesOrderCreate.addItem();
        browser.sleep(1000);

        //adding original sku with aliases

        salesOrderCreate.searchProduct(browser.params.aliasOriginalSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save the order
        salesOrderCreate.saveOption("Save");
        //order number
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });


        //verify that replacement sku name "REPLACEMENTALIAS03" is displayed under item title instead of original sku or "REPLACEMENTALIAS02"
        salesOrderCreate.getSkuName().then(function (sku) {
            skuTitle = sku;
            expect(skuTitle).toEqual(browser.params.aliasReplacementSku2);
            console.log("the dispalyed sku name is" +skuTitle);
        });
        //verify the sku replacement history
        salesOrderCreate.clickOnEditLineIcon(1);
        browser.sleep(1000);
        salesOrderCreate.lineItemselectOptions("SKU Replacement History");
        browser.sleep(3000);
        salesOrderCreate.getReplacementSkuNameFromHistory().then(function (replacementSku) {
            var replacementSkuName = replacementSku;
            expect(replacementSkuName).toContain(browser.params.aliasReplacementSku2);
            console.log("sku dispalyed under replacement sku history is" +replacementSkuName );

        })

        salesOrderCreate.getOrginalSkuNameFromHistory().then(function (originalSku) {
            var originalSkuName = originalSku;
            expect(originalSkuName).toContain(browser.params.aliasOriginalSku2);
            console.log("sku dispalyed under replacement sku history is" +originalSkuName );
        })




        //release the sales order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
        })
        salesOrderSummary.salesOrderSelectGear("View");

        //verify that shipment request is created for alias sku instead of original sku
        salesOrderSummary.clickOnshippingRequestTab();
        salesOrderSummary.viewShippingRequest();
        salesOrderSummary.getSkuNameOnShipmentRequest().then(function (skuTitle) {
            var nameOfSKu = skuTitle;
            expect(nameOfSKu).toContain(browser.params.aliasReplacementSku2);
            console.log("sku title under shipment tab is" +nameOfSKu);
        })
    })

    it("Create Order with a SKU referring to circular aliases -TC003",function () {
        /*setup a sku crossRefOriginalTc003 reffering to crossrefaliastc001 as alias and
         crossrefaliastc001 ->crossrefaliastc002 -> crossrefaliastc003 ->crossrefaliastc001
         create a sales order with crossRefOriginalTc003 and verify that CROSSREFALIASTC003 is allocated instead of
         crossrefaliastc001 or crossrefaliastc002.
         */

        //verify the inventory count of replacement sku before creating the order

        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.aliasReplacementSku3);
        //update ATS of Replacement to 5, if Ats =0
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 0)) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js reference sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("5");
                })
            } else {
                console.log("Refrence Sku ATS value is already greater than 0 no need to update it");
            }
        });



        //create sales order with original sku
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);
        salesOrderCreate.addItem();
        browser.sleep(1000);

        //adding original sku with aliases

        salesOrderCreate.searchProduct(browser.params.aliasOriginalSku3);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save the order
        salesOrderCreate.saveOption("Save");
        //order number
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });


        //verify that replacement sku name "crossrefaliastc003" is displayed under item title instead of original sku or "REPLACEMENTALIAS02"
        salesOrderCreate.getSkuName().then(function (sku) {
            skuTitle = sku;
            expect(skuTitle).toEqual(browser.params.aliasReplacementSku3);
            console.log("the dispalyed sku name is" +skuTitle);
        });
        //verify the sku replacement history
        salesOrderCreate.clickOnEditLineIcon(1);
        browser.sleep(1000);
        salesOrderCreate.lineItemselectOptions("SKU Replacement History");
        browser.sleep(3000);
        salesOrderCreate.getReplacementSkuNameFromHistory().then(function (replacementSku) {
            var replacementSkuName = replacementSku;
            expect(replacementSkuName).toContain(browser.params.aliasReplacementSku3);
            console.log("sku dispalyed under replacement sku history is" +replacementSkuName );

        })

        salesOrderCreate.getOrginalSkuNameFromHistory().then(function (originalSku) {
            var originalSkuName = originalSku;
            expect(originalSkuName).toContain(browser.params.aliasOriginalSku3);
            console.log("sku dispalyed under replacement sku history is" +originalSkuName );
        })




        //release the sales order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
        })
        salesOrderSummary.salesOrderSelectGear("View");

        //verify that shipment request is created for alias sku instead of original sku
        salesOrderSummary.clickOnshippingRequestTab();
        salesOrderSummary.viewShippingRequest();
        salesOrderSummary.getSkuNameOnShipmentRequest().then(function (skuTitle) {
            var nameOfSKu = skuTitle;
            expect(nameOfSKu).toContain(browser.params.aliasReplacementSku3);
            console.log("sku title under shipment tab is" +nameOfSKu);
        })
    })


})

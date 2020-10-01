
var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";

describe('Order creation Flow with a sku having cross reference',function () {
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();

    it('Create Order with a SKU having cross reference sku,and verify the allocated sku name', function () {
        /* ************ Before executing this script setup a SKU with cross reference from original sku
               to replacement sku with type as substitution and then RS004-verifyParentChildLinkOnOriginalOrderspec.js it ***************** */

        //verifying the Original sku doesn't have available inventory count

      /*
      browser.get(inventoryLookUpUrl);

        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.orginalSku);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            if (atsValueOfSku != "") {
                newAtsValue = "-" + atsValueOfSku;
                console.log("new ATS value is" + newAtsValue);
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(newAtsValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js reference sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of original sku is updated to 0
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("0");
                })
            } else {
                console.log("ATS value is already 0 no need to update it");
            }
        });
        //verifying the replacement SKu have  some available inventory count,so that it can replace Original Sku in
        //order flow

        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.replacementSku);

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


        //navigate to sales order screen to create an order with orginal sku

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
        salesOrderCreate.searchProduct(browser.params.orginalSku);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();
        //save the order
        salesOrderCreate.saveOption("Save");
        //release the order
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
        });
        //open the sales order and verify that order status should be updated as "ON Hold"
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(3000);
        });

        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("ON HOLD");
            console.log("*******Line Status is ***********" + lineStatus);

        });
        //click on subsistutionIcon on line item to subsistue the orginal sku with replacement sku
        salesOrderCreate.clickOnSubsistutionIcon();
        salesOrderCreate.selectSubstitutionItem();
        salesOrderCreate.clickOnApplySubstitutionButton();
        browser.sleep(2000);
        salesOrderCreate.clickOnOrderSelectGearIcon();
        salesOrderCreate.releaseOrder();

        //verify orderline status after performing subsistution and releasing the order.

        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("RELEASED");
            console.log("*******Line Status is ***********" + lineStatus);
        });
        //verify Order status

        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("RELEASED");
            console.log("*******Order Status is ***********" + OrderStatus);
        });


    })
})









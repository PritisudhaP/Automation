const { browser } = require("protractor");

var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Validate Delivered option on Update list', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrdersummaryscreen();
    var commons = new common();
    it("update order Status to Delivered", function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("WENDY")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("BC_TEST");
        salesOrderCreate.selectSKU();
        browser.driver.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.updateStatus();
        salesOrderSummary.delivered.click();
        salesOrderSummary.updateComments();
        salesOrderSummary.updateStatus();
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("DELIVERED");
    });
})
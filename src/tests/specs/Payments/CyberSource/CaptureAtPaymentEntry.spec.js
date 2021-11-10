const { browser } = require("protractor");

var salesOrderEditScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var paymentProcessingRulesScreen = require(process.cwd() + '/screens/systemSettings/paymentProcessingRules.js');

var salesOrderCreate = new salesOrderCreateScreen();
var salesOrderSummary = new salesOrdersummaryscreen();
var commons = new common();
var salesOrderEdit = new salesOrderEditScreen();
var pprScreen = new paymentProcessingRulesScreen();

var pd = require('../../../autoFiles/cyberSourceCardDetails.json');
var data = require('../../../autoFiles/cyberSourceData.json')

describe("Capture at Payment Entry Scenarios", function(){

    // set sales channel for cybersource
    it("Set Sales channel",function(){
        browser.get(paymentProcessingRulesURL);
        pprScreen.searchRule("cyberSourcePayment");
        pprScreen.captureFundsAt("PAYMENT_ENTRY");
        pprScreen.paymentGatewayCredential("retail-cybersource-test");
        browser.get(PPRSalesChannelURL);
        pprScreen.addSalesChannel(data.TD.SalesChannel,data.TD.tie,data.TD.Rule);
        browser.get(paymentProcessingRulesURL); 
    })

    it("SC 01:Master Card - Single Line", function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.setSalesChannel(data.TD.SalesChannel);
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer(data.TD.Customer);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU1)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderEdit.makePayment("Credit Card", pd.GP.card, pd.GP.CVV, pd.GP.name, pd.GP.Month, pd.GP.Year);
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.validatePaymentEntry(data.PaymentEntry.CaptureSKU1);
    })

    it("SC 02:JCB Card - Multi Lines",function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.setSalesChannel(data.TD.SalesChannel);
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer(data.TD.Customer);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU1)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU2)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderEdit.makePayment("Credit Card", pd.JCB.card, pd.JCB.CVV, pd.JCB.name, pd.JCB.Month, pd.JCB.Year);
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.validatePaymentEntry(data.PaymentEntry.Capture);
    })

    it("SC 03:Amex Card - Single line - Multiple Qty(s)", function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.setSalesChannel(data.TD.SalesChannel);
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer(data.TD.Customer);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU1)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.qtyIncrease(1,2)
        salesOrderCreate.saveOption("Save");
        salesOrderEdit.makePayment("Credit Card", pd.Amex.card, pd.Amex.CVV, pd.Amex.name, pd.Amex.Month, pd.Amex.Year);
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.validatePaymentEntry(data.PaymentEntry.CaptureMultiQtySKU1);
    })

    it("SC 04:VISA Card - Multi lines - Multiple Qty(s)", function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.setSalesChannel(data.TD.SalesChannel);
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer(data.TD.Customer);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU1)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.qtyIncrease(1,2)
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU2)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.qtyIncrease(2,2)
        salesOrderCreate.saveOption("Save");
        salesOrderEdit.makePayment("Credit Card", pd.VISA.card, pd.VISA.CVV, pd.VISA.name, pd.VISA.Month, pd.VISA.Year);
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.validatePaymentEntry(data.PaymentEntry.CaptureMultiQty);
    })

    it("SC 05:Multi Payment cards (Discover & master)", function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.setSalesChannel(data.TD.SalesChannel);
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer(data.TD.Customer);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU2)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderEdit.makePayment("Credit Card", pd.Discover.card, pd.Discover.CVV, pd.Discover.name, pd.Discover.Month, pd.Discover.Year);
        browser.sleep(2000);
        salesOrderCreate.findProductFilter("Name","contains",data.PaymentEntry.SKU1)
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderEdit.makePayment("Credit Card", pd.Master.card, pd.Master.CVV, pd.Master.name, pd.Master.Month, pd.Master.Year);
        browser.sleep(2000);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.validateMultiPaymentEntry(data.PaymentEntry.CaptureSKU2,1);
        salesOrderSummary.validateMultiPaymentEntry(data.PaymentEntry.CaptureSKU1,2);
    })
})
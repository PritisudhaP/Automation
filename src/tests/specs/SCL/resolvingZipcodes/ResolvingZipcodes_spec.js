const { browser } = require("protractor");

var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var scriptSummaryScreen = require(process.cwd() + '/screens/scripts/script.summary.screen.js');
var tradingCustomerScreen = require(process.cwd() + '/screens/tradingPartners/tradingCustomerScreen.js');
var common = require(process.cwd() + '/screens/commons.js');
var loginPage = require(process.cwd() + '/screens/login/login.screen.js');


describe('Resolving Zipcodes',function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var commons = new common();
    var salesOrderSummary = new salesOrdersummaryscreen();
    var scriptSummary = new scriptSummaryScreen();
    var tradingCustomer = new tradingCustomerScreen();
    var loginScreen = new loginPage();
    var ScriptUrl = scriptUrl.replace("project0","project4");
    var CallcentersalesorderUrl = callcentersalesorderUrl.replace("project0","project4");
    var CustomersUrl = customersUrl.replace("project0","project4");
    
    
    it('SC 1:Enable/Disable, FindMissingScript',function(){
        browser.get(ScriptUrl);
        loginScreen.setUsername(browser.params.login.user);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        scriptSummary.searchScript("findMissingZip");
        scriptSummary.zipLabel();
        scriptSummary.scriptactiveBtn();
        commons.save();
        commons.back();
        scriptSummary.zipscriptStatus();   
    })

    it('SC 2:Resolving Zipcode based on Country:US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_01")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryzip();
    })

    it('SC 3:Resolving Zipcode based on Country:CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_02")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryCAzip();
    })

    it('SC 4:Resolving Zipcode based on City :US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_03")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCityzip();
    })

    it('SC 5:Resolving Zipcode based on City :CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_04")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCityCAzip();
    })
    it('SC 6:Resolving Zipcode based on State :US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_05")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkStatezip();
    })

    it('SC 7:Resolving Zipcode based on State :CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_06")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkStateCAzip();
    })

    it('SC 8:Pass valid Zipcode and it should be available in system',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkResolveLabel();
    })

    it('SC 9:Provide valid city name with spaces',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_07")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkcitywithspaces();
    })

    it('SC 10:Provide invalid city name with spaces',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_08")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryzip();
    })

    it('SC 11:valid zipcode but doesnot present in system',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("CITY WITHSPACES")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkvalidZipcode();
    })

    it('SC 12:Enable/Disable, FindMissingScript',function(){
        browser.get(ScriptUrl);
        scriptSummary.searchScript("findMissingZip");
        scriptSummary.zipLabel();
        scriptSummary.scriptactiveBtn();
        commons.save();
        commons.back();
        scriptSummary.zipscriptStatus();   
    })

    it('SC 13:Resolving Zipcode based on Country:US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_01")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryzip();
    })

    it('SC 14:Resolving Zipcode based on Country:CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_02")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryCAzip();
    })

    it('SC 15:Resolving Zipcode based on City :US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_03")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCityzip();
    })

    it('SC 16:Resolving Zipcode based on City :CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_04")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCityCAzip();
    })
    it('SC 17:Resolving Zipcode based on State :US',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_05")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkStatezip();
    })

    it('SC 18:Resolving Zipcode based on State :CA',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_06")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("CA_TEST");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkStateCAzip();
    })

    it('SC 19:Pass valid Zipcode and it should be available in system',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkResolveLabel();
    })

    it('SC 20:Provide valid city name with spaces',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_07")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkcitywithspaces();
    })

    it('SC 21:Provide invalid city name with spaces',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_08")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkCountryzip();
    })

    it('SC 22:valid zipcode but doesnot present in system',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("CITY WITHSPACES")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("Test2608");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.Logs();
        salesOrderSummary.clickonLogs();
        salesOrderSummary.checkvalidZipcode();
    })
    
    it('SC 23:Trading partners: postal codes empty for CA',function(){
        browser.get(CustomersUrl);
        browser.sleep(2000);
        tradingCustomer.searchCustomer("2412_09");
        browser.sleep(2000);
        tradingCustomer.clickonCustomer();
        tradingCustomer.customerEdit();
        tradingCustomer.gearforEdit();
        tradingCustomer.editCustomerAddress();
        tradingCustomer.clearPostalCodes();
        tradingCustomer.clickSaveOnPopup();
        tradingCustomer.clickonSave();
        tradingCustomer.verifyPostalcodeEmptyerror();
    })

    it('SC 24:Trading partners: Invalid postal codes for CA',function(){
        browser.get(CustomersUrl);
        browser.sleep(2000);
        tradingCustomer.searchCustomer("2412_09");
        browser.sleep(2000);
        tradingCustomer.clickonCustomer();
        tradingCustomer.customerEdit();
        tradingCustomer.gearforEdit();
        tradingCustomer.editCustomerAddress();
        tradingCustomer.clearPostalCodes();
        tradingCustomer.enterInvalidpostalcode("99995")
        tradingCustomer.clickSaveOnPopup();
        tradingCustomer.clickonSave();
        tradingCustomer.verifyInvalidPostalcodeerror();
    })

    it('SC 25:Sales order:Empty postal address',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_09")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderSummary.customerEdit();
        salesOrderSummary.soGeardots();
        tradingCustomer.editCustomerAddress();
        tradingCustomer.clearPostalCodes();
        tradingCustomer.clickonSave();
        tradingCustomer.finalSave();
        salesOrderSummary.verifypopupError()
        browser.sleep(2000);
        
    })

    it('SC 26:Sales order:Invalid postal address',function(){
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("2412_09")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderSummary.customerEdit();
        salesOrderSummary.soGeardots();
        tradingCustomer.editCustomerAddress();
        tradingCustomer.clearPostalCodes();
        tradingCustomer.enterInvalidpostalcode("99995")
        tradingCustomer.clickonSave();
        tradingCustomer.finalSave();
        salesOrderSummary.verifypopupError()
        browser.sleep(2000);
    })
})
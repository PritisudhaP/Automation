const { element, browser } = require("protractor")

module.exports = function() {

    var searchTextbox = element(by.model('apiSearchText.value'));
    var paymentGatewayCredential = element(by.model('paymentProcessingRule.data.paymentGatewayCredential'));
    var saveBtn = element(by.xpath('//button[@type="submit"]'));
    var filterbtn = element(by.xpath('//span[text()="Filters"]'));
    var criteria = element(by.model('apiSearchFilter.filter'));
    var content = element(by.model('apiSearchFilter.arg'));
    var value = element(by.model('apiSearchFilter.value'));
    
    var gearDots = element(by.xpath('(//en-icon[@icon="more-vertical"])[1]'));
    var editBtn = element(by.xpath('//span[text()="Edit"]'));
    var capturePoint = element(by.model('method.capturePoint'));
    var doneBtn = element(by.xpath('//span[text()="Done"]'));

    // Apply to Sales Order //

    var addButton = element(by.xpath('//span[text()="Add"]'));
    var salesChannel = element(by.model('assignment.salesChannel'));
    var precendence = element(by.model('assignment.precedenceWhenTied'));
    var rule = element(by.model('assignment.paymentProcessingRule'));
    var addBtnOnPopup = element(by.xpath('//en-icon[@icon="check-circle"]'));
    var CancelBtnOnPopup = element(by.xpath('(//span[text()="Cancel"])[2]'));

    var temp = "";

    this.searchRule = function(rule){
    searchTextbox.sendKeys(rule);
    browser.sleep(200);  
      temp = "//span[text()='" +rule+ "']";
      element(by.xpath(temp)).click();
    }

    this.paymentGatewayCredential = function(Credentials){
        paymentGatewayCredential.sendKeys(Credentials);
        saveBtn.click();
    }

    this.filterCriteriaDropdown = function(searchCriteria,searchContent,searchValue){
        filterbtn.click();
        criteria.sendKeys(searchCriteria);
        content.sendKeys(searchContent);
        value.sendKeys(searchValue).sendKeys(protractor.Key.ENTER);;
    }

    this.captureFundsAt = function (value){
        gearDots.click();
        editBtn.click();
        capturePoint.sendKeys(value);
        //doneBtn.click();
        CancelBtnOnPopup.click();
        //saveBtn.click();
    }
    
    // Below method is to add sales channel for PPR //

    this.addSalesChannel = function(channel,tie,PPRule){
        browser.sleep(1000);
        addButton.click();
        salesChannel.sendKeys(channel);
        precendence.sendKeys(tie);
        rule.sendKeys(PPRule);
        addBtnOnPopup.click();
       
    }

}
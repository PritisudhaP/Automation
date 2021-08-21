module.exports =function(){

    this.newwebserviceServerButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.configNameTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.fromEmailTextBox= element(by.xpath('//input[@name="fromAddress"]'));
    this.toEmailTextBox= element(by.xpath('//input[@name="toAddress"]'));
    this.mailboxDropdown = element(by.xpath('//select[@name="mailbox"]'));
    this.securityTypeDropdown = element(by.xpath('//select[@name="securityType"]'));
    this.userDropdown = element(by.xpath('//select[@name="userName"]'));
    this.successresponseTextArea = element(by.xpath('(//pre/textarea[contains(@class,"ace_text-input")])[1]'));
    this.failureresponseTextArea = element(by.xpath('(//pre/textarea[contains(@class,"ace_text-input")])[2]'));
    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[1]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.newwebserviceServer = function() {
        return this.newwebserviceServerButton.click();
    }

    this.enterConfigName = function(configName) {
        return this.configNameTextBox.sendKeys(configName);
    }

    this.enterFromEmail = function(fromEmail) {
        return this.fromEmailTextBox.sendKeys(fromEmail);
    }

    this.enterToEmail = function(toEmail) {
        return this.toEmailTextBox.sendKeys(toEmail);
    }

    this.selectMailbox = function(mailbox) {
        commons.selectOption(this.mailboxDropdown,mailbox);
    }

    this.selectSecurityType = function(securityType) {
        commons.selectOption(this.securityTypeDropdown,securityType);
    }

    this.selectUser = function(user) {
        commons.selectOption(this.userDropdown,user);
    }

    this.enterSuccessResponse = function(successResponse) {
        element(by.xpath('(//pre/textarea[contains(@class,"ace_text-input")])[1]/parent::pre')).click();
        this.successresponseTextArea.sendKeys(successResponse);
    }

    this.enterFailureResponse = function(failureResponse) {
        element(by.xpath('(//pre/textarea[contains(@class,"ace_text-input")])[2]/parent::pre')).click();
        this.failureresponseTextArea.sendKeys(failureResponse);
    }


    this.savewebserviceServer = function() {
        return this.saveButton.click();
    }
    
}


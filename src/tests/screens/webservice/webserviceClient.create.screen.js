module.exports =function(){

    this.newwebserviceClientButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.configNameTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.urlTextBox= element(by.xpath('//input[@name="url"]'));
    this.typeDropdown = element(by.xpath('//select[@ng-model="webServiceClient.data.type"]'));
    this.methodDropdown = element(by.xpath('//select[@ng-model="webServiceClient.data.httpMethod"]'));
    
    this.responseHandlingDropdown = element(by.xpath('//select[@ng-model="webServiceClient.data.responseDestination"]'));
    this.mailboxDropdown = element(by.xpath('//select[@ng-model="webServiceClient.data.mailbox"]'));

    this.fromEmailTextBox= element(by.xpath('//input[@name="fromAddress"]'));
    this.toEmailTextBox= element(by.xpath('//input[@name="toAddress"]'));


    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[1]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newwebserviceClient = function() {
        return this.newwebserviceClientButton.click();
    }

    this.enterConfigName = function(configName) {
        return this.configNameTextBox.sendKeys(configName);
    }

    this.enterUrl = function(url) {
        return this.urlTextBox.sendKeys(url);
    }

    this.selectType = function(type) {
        commons.selectOption(this.typeDropdown,type);
    }

    this.selectMethod = function(method) {
        commons.selectOption(this.methodDropdown,method);
    }

    this.selectResponseHandling = function(responseHandling) {
        commons.selectOption(this.responseHandlingDropdown,responseHandling);
    }

    this.selectMailbox = function(mailbox) {
        commons.selectOption(this.mailboxDropdown,mailbox);
    }
    
    this.enterToEmail = function(toEmail) {
        return this.toEmailTextBox.sendKeys(toEmail);
    }

    this.enterFromEmail = function(fromEmail) {
        return this.fromEmailTextBox.sendKeys(fromEmail);
    }


    this.savewebserviceClient = function() {
        return this.saveButton.click();
    }
    
}


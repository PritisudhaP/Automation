module.exports =function(){

    this.newCommunicationsButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.nameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.descEntryTextBox= element(by.xpath('//input[@name="description"]'));

    this.protocolDropDown= element(by.xpath('//select[@name="communicationProtocol"]'));
    this.userNameEntryTextBox= element(by.xpath('//input[@name="userName"]'));    
    this.passwordEntryTextBox= element(by.xpath('//input[@name="password"]'));
    
    this.connectionActiveCheckBox = element(by.xpath('//label/input[@ng-model="communicationConfiguration.data.active"]'));
    
    this.hostEntryTextBox= element(by.xpath('//input[@name="host"]'));
    this.portEntryTextBox= element(by.xpath('//input[@name="port"]'));
    this.inDirectoryEntryTextBox= element(by.xpath('//input[@name="inDirectoryName"]'));
    this.outDirectoryEntryTextBox= element(by.xpath('//input[@name="outDirectoryName"]'));
    this.localInDirectoryEntryTextBox= element(by.xpath('//input[@name="localInDirectoryName"]'));
    this.localOutDirectoryEntryTextBox= element(by.xpath('//input[@name="localOutDirectoryName"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newCommunications = function() {
        return this.newCommunicationsButton.click();
    }

    this.enterName = function(name) {
        return this.nameEntryTextBox.sendKeys(name);
    }

    this.enterDesc = function(desc) {
        return this.descEntryTextBox.sendKeys(desc);
    }    
    
    this.enterProtocol = function(protocol) {
        commons.selectOption(this.protocolDropDown,protocol);
    }

    this.enterUserName = function(userName) {
        return this.userNameEntryTextBox.sendKeys(userName);
    }    

    this.enterPassword = function(password) {
        return this.passwordEntryTextBox.sendKeys(password);
    }    

    this.connectionActive = function(flag) {
    	if (flag == 'Y') {
       		return this.connectionActiveCheckBox.click();
       	}
    }    

    this.enterHost = function(host) {
        return this.hostEntryTextBox.sendKeys(host);
    }    

    this.enterPort = function(port) {
        return this.portEntryTextBox.sendKeys(port);
    } 

    this.enterInDir = function(inDir) {
        return this.inDirectoryEntryTextBox.sendKeys(inDir);
    }    

    this.enterOutDir = function(outDir) {
        return this.outDirectoryEntryTextBox.sendKeys(outDir);
    } 

    this.enterLocalInDir = function(localInDir) {
        return this.localInDirectoryEntryTextBox.sendKeys(localInDir);
    }    

    this.enterLocalOutDir = function(localOutDir) {
        return this.localOutDirectoryEntryTextBox.sendKeys(localOutDir);
    } 

    this.saveCommunications = function() {
        return this.saveButton.click();
    }
 
}


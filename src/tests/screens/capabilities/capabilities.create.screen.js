module.exports =function(){

    this.newCapabilitiesButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.capabilitiesNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.addFunctionalDomainButton= element(by.xpath('//button/span[contains(text(),"Add")]/parent::button'));

    this.selectFunctionalDomainDropDown = element(by.xpath('//select[@name="functionalDomain"]'));
    this.selectAvailableOption = element(by.xpath('(//select[@name="actions"])[1]/option[contains(text(), "Create")]'));

    this.moveToChosenButton = element(by.xpath('(//button/en-icon[@icon="chevron-right-double"])[1]'));
    this.saveButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));

    this.createCapabilityButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newCapability = function() {
        return this.newCapabilitiesButton.click();
    }

    this.enterCapabilityName = function(capabilityName) {
        return this.capabilitiesNameEntryTextBox.sendKeys(capabilityName);
    }

    this.addFunctionalDomain = function() {
        return this.addFunctionalDomainButton.click();
    }
 
    this.selectFunctionalDomain = function(functionalDomain) {
        commons.selectOption(this.selectFunctionalDomainDropDown,functionalDomain);
    }
 
    this.selectAction = function(action) {
        temp = "(//select[@name='actions'])[1]/option[contains(text(), '" + action + "')]";
		return element(by.xpath(temp)).click();
    }
 
     this.moveSelectedActions = function() {
        return this.moveToChosenButton.click();
    }
 
    this.saveAction = function() {
        return this.saveButton.click();
    }

    this.createCapability = function() {
        return this.createCapabilityButton.click();
    }


}


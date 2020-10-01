module.exports =function(){

    this.newChannelButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.displayNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.orgDropDown =  element(by.xpath('//select[@name="organization"]'));    
    this.maxSplitEntryTextBox= element(by.xpath('//input[@name="maxSplit"]'));
    this.catalogDropDown =  element(by.xpath('//select[@name="catalog"]'));        
    this.allowPartialReleaseCheckBox= element(by.xpath('//input[@name="partialReleaseAllowed"]'));

    this.carrierDropDown =  element(by.xpath('//select[@name="carrier"]'));
    this.serviceTypeDropDown =  element(by.xpath('//select[@name="service"]'));
    
    this.saveButton = element(by.xpath('//button[contains(text(),"Create Channel")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newChannel = function() {
        return this.newChannelButton.click();
    }

    this.enterDisplayName = function(displayNameValue) {
        return this.displayNameEntryTextBox.sendKeys(displayNameValue);
    }

    this.enterOrg = function(orgValue) {
        commons.selectOption(this.orgDropDown,orgValue);
    }
   
    this.enterMaxSplit = function(maxSplitValue) {
        this.maxSplitEntryTextBox.clear();
        return this.maxSplitEntryTextBox.sendKeys(maxSplitValue);
    }

    this.enterCatalog = function(catalog) {
        commons.selectOption(this.catalogDropDown,catalog);
    } 


    this.enterCarrier = function(value) {
        commons.selectOption(this.carrierDropDown,value);
    }


    this.enterServiceType = function(value) {
        commons.selectOption(this.serviceTypeDropDown,value);
    }

    
    this.setPartialRelease = function(partialReleaseFlag) {
        if (partialReleaseFlag == 'Y') {
        	return this.allowPartialReleaseCheckBox.click();
        } else {
            return this.allowPartialReleaseCheckBox.clear();
        }
    }

    this.saveChannel = function() {
        return this.saveButton.click();
    }
}


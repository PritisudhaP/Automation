module.exports =function(){

    this.newuserroleButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.userroleNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.userroleDataDomainEntryTextBox= element(by.xpath('//input[@name="dataDomains"]'));
    
    this.addCapabilityButton= element(by.xpath('//button/span[contains(text(),"Attach")]/parent::button'));
    // this.selectCapabilityDropDown= element(by.xpath('//select[contains(@name, "capabilityRefName")]'));
    this.permittedDomainEntryTextBox= element(by.xpath('//input[@name="permittedDataDomain"]'));

    this.createUserRoleButton = element(by.xpath('(//button[contains(text(),"Save")])[1]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newUserRole = function() {
        return this.newuserroleButton.click();
    }

    this.enterRoleName = function(roleName) {
        return this.userroleNameEntryTextBox.sendKeys(roleName);
    }

    this.enterDataDomain = function(dataDomain) {
        return this.userroleDataDomainEntryTextBox.sendKeys(dataDomain);
    }

    this.addCapability = function() {
        return this.addCapabilityButton.click();
    }
 
    this.enterCapability = function(capabilityName) {
        element(by.xpath('//input[@placeholder="Search Capabilities"]')).clear();
        element(by.xpath('//input[@placeholder="Search Capabilities"]')).sendKeys(capabilityName);
        browser.sleep(1000);
        element(by.xpath('//input[@placeholder="Search Capabilities"]')).sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);
        element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input')).click();
        return element(by.xpath('//button/span[contains(text(),"Use Selected Capability")]/parent::button')).click();
    }

    this.enterPermittedDomain = function(permittedDomain) {
        return this.permittedDomainEntryTextBox.sendKeys(permittedDomain);
    } 

    this.createUserRole = function() {
        return this.createUserRoleButton.click();
    }


}


module.exports =function(){

    this.newSiteButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.displayNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.address1EntryTextBox= element(by.xpath('//input[@name="street1"]'));
    this.cityEntryTextBox= element(by.xpath('//input[@name="city"]'));
    this.stateEntryTextBox= element(by.xpath('//select[@name="state"]'));
    this.zipcodeEntryTextBox= element(by.xpath('//input[@name="zipcode"]'));
    this.phoneEntryTextBox= element(by.xpath('//input[@name="tel"]'));
    this.mailboxDropDown = element(by.xpath('//select[@name="mailbox"]'));
    this.siteTypeDropDown =  element(by.xpath('//select[@name="siteType"]'));
    this.catalogDropDown =  element(by.xpath('//select[@name="catalog"]'));
    this.organizationDropDown =  element(by.xpath('//select[@name="organization"]'));
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));
    this.editOption = element(by.xpath("(//en-icon[@icon='edit'])[1]"));
    this.activeCheckBox = element(by.xpath("(//input[@type='checkbox'])[1]"));
    this.saveButtonofpopup= element(by.xpath("(//button[@type='submit'])[3]"));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.newSite = function() {
        return this.newSiteButton.click();
    }

    this.enterDisplayName = function(displayName) {
        return this.displayNameEntryTextBox.sendKeys(displayName);
    }

    this.enterAddress1 = function(address1) {
        return this.address1EntryTextBox.sendKeys(address1);
    }

    this.enterCity = function(city) {
        return this.cityEntryTextBox.sendKeys(city);
    }

    this.enterState = function(state) {
        return this.stateEntryTextBox.sendKeys(state);
    }

    this.enterZipcode = function(zipcode) {
        return this.zipcodeEntryTextBox.sendKeys(zipcode);
    }

    this.enterPhone = function(phone) {
        return this.phoneEntryTextBox.sendKeys(phone);
    }


    this.enterMailboxName = function(mailboxName) {
        commons.selectOption(this.mailboxDropDown,mailboxName);
    }

    this.enterSiteType = function(siteType) {
        commons.selectOption(this.siteTypeDropDown,siteType);
    }

    this.enterCatalog = function(catalog) {
        commons.selectOption(this.catalogDropDown,catalog);
    }

    this.enterOrganization = function(organization) {
        commons.selectOption(this.organizationDropDown,organization);
    }


    this.saveSite = function() {
        return this.saveButton.click();
    }
    this.clickOnEdit = function()
    {
     return this.editOption.click();
    }
    this.clickOnActiveCheckBox = function()
    {
      return this.activeCheckBox.click();
    }
    this.clickOnSave= function()
    {
     return this.saveButtonofpopup.click();
    }
}


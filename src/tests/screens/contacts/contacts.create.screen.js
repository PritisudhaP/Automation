module.exports =function(){

    this.newContactButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.firstNameEntryTextBox= element(by.xpath('//input[@name="firstName"]'));
    this.lastNameEntryTextBox= element(by.xpath('//input[@name="lastName"]'));
    this.displayNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));

    this.roleDropDown =  element(by.xpath('//select[@name="role"]'));
    this.primaryEmailEntryTextBox= element(by.xpath('//input[@name="primaryEmail"]'));
    this.primaryPhoneEntryTextBox= element(by.xpath('//input[@name="primaryPhone"]'));
    this.altPhoneEntryTextBox= element(by.xpath('//input[@name="altPhone"]'));


    this.countryDropdown = element(by.xpath('//select[@name="country"]'));

    this.address1EntryTextBox = element(by.xpath('//input[@name="address1"]'));
    this.cityEntryTextBox = element(by.xpath('//input[@name="city"]'));
    this.stateDropdown = element(by.xpath('//select[@name="state"]'));

    this.zipCodeEntryTextBox = element(by.xpath('//input[@name="zip5"]'));



    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.newContact = function() {
        return this.newContactButton.click();
    }

    this.enterFirstName = function(firstNameValue) {
        return this.firstNameEntryTextBox.sendKeys(firstNameValue);
    }

    this.enterLastName = function(lastName) {
        return this.lastNameEntryTextBox.sendKeys(lastName);
    }
   
    this.enterDisplayName = function(displayName) {
        return this.displayNameEntryTextBox.sendKeys(displayName);
    }

    this.enterRole = function(role) {
        commons.selectOption(this.roleDropDown,role);
    } 
    
    this.enterPrimaryEmail = function(primaryEmail) {
        return this.primaryEmailEntryTextBox.sendKeys(primaryEmail);
    }

    this.enterPrimaryPhone = function(primaryPhone) {
        return this.primaryPhoneEntryTextBox.sendKeys(primaryPhone);
    }    

    this.enterAltPhone = function(altPhone) {
        return this.altPhoneEntryTextBox.sendKeys(altPhone);
    }

    this.enterCountry  =  function(country) {
        commons.selectOption(this.countryDropdown,country);
    }

    this.enterAddress1 = function(address1) {
        return this.address1EntryTextBox.sendKeys(address1);
    }

    this.enterCity = function(city) {
        return this.cityEntryTextBox.sendKeys(city);
    }

    this.enterState = function(state) {
        commons.selectOption(this.stateDropdown,state);
    }

    this.enterZip5 = function(zip5) {
        return this.zipCodeEntryTextBox.sendKeys(zip5);
    }



    this.saveContact = function() {
        return this.saveButton.click();
    }
}


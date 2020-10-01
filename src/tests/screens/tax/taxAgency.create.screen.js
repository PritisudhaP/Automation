module.exports =function(){

    this.newAgencyButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.nameEntryTextBox= element(by.xpath('//input[@name="agencyname"]'));
    this.phoneEntryTextBox= element(by.xpath('//input[@name="agencyPhone"]'));
    this.emailEntryTextBox= element(by.xpath('//input[@name="supportEmail"]'));
    this.countryEntryDropdown= element(by.xpath('//select[@name="country"]'));

    this.address1EntryTextBox= element(by.xpath('//input[@name="address1"]'));
    this.address2EntryTextBox= element(by.xpath('//input[@name="address2"]'));
    this.cityEntryTextBox= element(by.xpath('//input[@name="city"]'));
    this.stateEntryDropdown= element(by.xpath('//select[@name="state"]'));
    this.zip5EntryTextBox= element(by.xpath('//input[@name="zip5"]'));
    this.zip4EntryTextBox= element(by.xpath('//input[@name="zip4"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.newAgency = function() {
        return this.newAgencyButton.click();
    }

    this.enterName = function(name) {
        return this.nameEntryTextBox.sendKeys(name);
    }

    this.enterPhone = function(phone) {
        return this.phoneEntryTextBox.sendKeys(phone);
    }    
    
    this.enterEmail = function(email) {
        return this.emailEntryTextBox.sendKeys(email);
    }

    this.enterCountry = function(country) {
        commons.selectOption(this.countryEntryDropdown,country);
    }    

    this.enterAddress1 = function(address1) {
        return this.address1EntryTextBox.sendKeys(address1);
    }    

    this.enterAddress2 = function(address2) {
        return this.address2EntryTextBox.sendKeys(address2);
    }   

    this.enterCity = function(city) {
        return this.cityEntryTextBox.sendKeys(city);
    }
    
    this.enterState = function(state) {
        commons.selectOption(this.stateEntryDropdown,state);
    } 
  
    this.enterZip5 = function(zip5) {
        return this.zip5EntryTextBox.sendKeys(zip5);
    } 
    
    this.enterZip4 = function(zip4) {
        return this.zip4EntryTextBox.sendKeys(zip4);
    } 
    
    this.saveAgency = function() {
        return this.saveButton.click();
    }
 
}


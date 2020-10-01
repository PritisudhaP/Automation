module.exports =function(){

    this.newRateButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.nameEntryTextBox= element(by.xpath('//input[@name="name"]'));
    this.rateEntryTextBox= element(by.xpath('//input[@name="rate"]'));

    this.areaEntryDropdown= element(by.xpath('//select[@name="taxArea"]'));    
    this.agencyEntryDropdown= element(by.xpath('//select[@name="taxAgencyRefKey"]'));
    this.codeEntryDropdown= element(by.xpath('//select[@name="taxCode"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newRate = function() {
        return this.newRateButton.click();
    }

    this.enterName = function(name) {
        return this.nameEntryTextBox.sendKeys(name);
    }

    this.enterRate = function(rate) {
        return this.rateEntryTextBox.sendKeys(rate);
    }    
    
    this.enterArea = function(area) {
        commons.selectOption(this.areaEntryDropdown,area);
    }

    this.enterAgency = function(agency) {
        commons.selectOption(this.agencyEntryDropdown,agency);
    }    

    this.enterCode = function(code) {
        commons.selectOption(this.codeEntryDropdown,code);
    }    
    
    this.saveRate = function() {
        return this.saveButton.click();
    }
 
}


module.exports =function(){

    this.newLocationButton= element(by.xpath('//button/span[contains(text(),"Add Tax Location")]/parent::button'));
    this.nameEntryTextBox= element(by.xpath('//input[@name="name"]'));
    this.descEntryTextBox= element(by.xpath('//textarea[@name="description"]'));
    this.areaTypeDowndown = element(by.xpath('//select[@name="areaType"]'));

    this.enterStateDropdown = element(by.xpath('//select[@name="state"]'));
 
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newLocation = function() {
        return this.newLocationButton.click();
    }

    this.enterName = function(name) {
        return this.nameEntryTextBox.sendKeys(name);
    }

    this.enterDesc = function(desc) {
        return this.descEntryTextBox.sendKeys(desc);
    }    
    
    this.enterAreaType = function(areaType) {
        return this.areaTypeDowndown.sendKeys(areaType);
    }

    this.enterState = function(state) {
        commons.selectOption(this.enterStateDropdown,state);
    }

    
    this.selectTaxCode = function(taxCode) {
        temp = "//select/option[contains(text(),'" + taxCode + "')]";
        return element(by.xpath(temp)).click();
    }
        
    this.saveLocation = function() {
        return this.saveButton.click();
    }
 
}


module.exports =function(){

    this.transferInventoryTypeButton  = element(by.xpath('//div[@class="card-split-body"]/p/strong[contains(text(), "one site to another")]'));

    this.fromSiteLookupButton = element(by.xpath('(//button/span[contains(text(),"Site Lookup")]/parent::button)[1]'));
    this.siteNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search"]'));
    this.searchButton = element(by.xpath('(//button/en-icon[@icon="search"])[1]'));
    this.selectSiteCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.useSelectedSiteButton = element(by.xpath('//button/span[contains(text(), "Save")]/parent::button'));

    this.fromPoolSelectionDropDown = element(by.xpath('//select[@ng-model="selectedTransferFromInventoryPool"]'));

    this.toSiteLookupButton = element(by.xpath('(//button/span[contains(text(),"Site Lookup")]/parent::button)[1]'));
    this.toPoolSelectionDropDown = element(by.xpath('//select[@ng-model="selectedTransferToInventoryPool"]')); 
    this.saveButton = element(by.xpath('//button[contains(text(),"Save & Continue")]'));

    this.carrierSelectionDropDown = element(by.xpath('//select[@name="carrier"]'));
    this.servicetypeSelectionDropDown = element(by.xpath('//select/option[contains(text(),"Select Service Type")]/parent::select'));

    this.productLookupButton = element(by.xpath('//button/span[contains(text(),"Product Lookup")]/parent::button'));
    this.productNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Products"]'));
    this.searchButtonModalWindow = element(by.xpath('(//button/en-icon[@icon="search"])[2]'));
    this.selectProductCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.useSelectedProductButton = element(by.xpath('//button/span[contains(text(), "Add Products")]/parent::button'));
    this.saveTOButton = element(by.xpath('(//button[contains(text(), "Save")])[1]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.typeSelection = function() {
        return this.transferInventoryTypeButton.click();
    }

    this.fromSiteLookup = function() {
        return this.fromSiteLookupButton.click();
    }

    this.enterSiteName = function(siteNameValue){
        return this.siteNameEntryTextBox.sendKeys(siteNameValue);
    }

    this.search = function() {
        // return this.searchButton.click();
	$('body').sendKeys(protractor.Key.ENTER);
    }

    this.selectSite = function() {
        return this.selectSiteCheckbox.click();
    }

    this.useSelectedSite = function() {
         return this.useSelectedSiteButton.click();
    }

    this.fromPoolSelection = function(poolValue) {
        commons.selectOption(this.fromPoolSelectionDropDown,poolValue);  
    }

    this.toPoolSelection = function(poolValue) {
        commons.selectOption(this.toPoolSelectionDropDown,poolValue);
    }


    this.toSiteLookup = function() {
        return this.toSiteLookupButton.click();
    }

    this.saveDraftTO = function(){
        return this.saveButton.click();
    } 
    
    this.carrierSelection = function(carrierValue) {
        commons.selectOption(this.carrierSelectionDropDown,carrierValue);
    }
    
    this.servicetypeSelection = function(serviceTypeValue) {
        commons.selectOption(this.servicetypeSelectionDropDown,serviceTypeValue);
    }
    
    this.productLookup = function() {
        return this.productLookupButton.click();
    }
    
    this.enterProductName = function(productNameValue) {
        this.productNameEntryTextBox.clear();
        return this.productNameEntryTextBox.sendKeys(productNameValue);
    }


    this.searchModalWindow = function() {
        // return this.searchButtonModalWindow.click();
	$('body').sendKeys(protractor.Key.ENTER);
    }

    this.selectProduct = function() {
        return this.selectProductCheckbox.click();
    }

    this.addProduct = function() {
        return this.useSelectedProductButton.click();
    }
    
    this.saveTO = function() {
        return this.saveTOButton.click();
    }
    
}


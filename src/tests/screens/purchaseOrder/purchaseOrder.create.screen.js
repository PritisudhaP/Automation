module.exports =function(){

    this.vendorSelectionButton  = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Send Purchase Order")]'));
    this.vendorLookupButton = element(by.xpath('//button/span[contains(text(),"Vendor Lookup")]/parent::button'));

    this.vendorNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Organizations"]'));

    this.searchButton = element(by.xpath('(//button/en-icon[@icon="search"])[2]'));

    this.selectVendorCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.useSelectedVendorButton = element(by.xpath('//button/span[contains(text(), "Use Selected Organization")]/parent::button'));

    this.siteLookupButton = element(by.xpath('//button/span[contains(text(),"Site Lookup")]/parent::button')); 
    this.siteNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Sites"]'));
    
    this.selectSiteCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));
    this.useSelectedSiteButton = element(by.xpath('//button/span[contains(text(), "Use Selected Site")]/parent::button'));

    this.poolSelectionDropDown = element(by.xpath('//select[@ng-model="selectedPool"]'));
    
    this.addItemButton = element(by.xpath('//button/span[contains(text(),"Add Item")]/parent::button')); 
    this.productNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Products"]'));

    this.selectProductCheckbox = element(by.xpath('(//input[@type="checkbox"])[2]'));
    this.qtyEntryTextBox = element(by.xpath('//input[(@ng-model="item.orderQty")]'));
    this.useSelectedProductButton = element(by.xpath('//button/span[contains(text(), "Add Products")]/parent::button'));

    this.qtyUpdateTextBox = element(by.xpath('(//input[(@ng-model="item.itemQty")])[1]'));
    this.discountUpdateTextBox = element(by.xpath('(//input[(@ng-model="item.itemUnitDiscount")])[1]'));
    this.savePOButton = element(by.xpath('(//button[contains(text(), "Save")])[2]'));

    this.buyerOrgDropdown = element(by.xpath('//select[@ng-options="item as item.displayName for item in buyerOrgs.data"]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.vendorSelection = function() {
        return this.vendorSelectionButton.click();
    }

    this.vendorLookup = function() {
        return this.vendorLookupButton.click();
    }

    this.enterVendorName = function(vendorNameValue){
        return this.vendorNameEntryTextBox.sendKeys(vendorNameValue);
    }

    this.search = function() {
        //return this.searchButton.click();
	$('body').sendKeys(protractor.Key.ENTER);
    }

    this.selectVendor = function() {
        return this.selectVendorCheckbox.click();
    }

    this.useSelectedVendor = function() {
        return this.useSelectedVendorButton.click();
    }


    this.siteLookup = function() {
        return this.siteLookupButton.click();
    }

    this.enterSiteName = function(siteNameValue){
        return this.siteNameEntryTextBox.sendKeys(siteNameValue);
    }
    
    this.selectSite = function() {
        return this.selectSiteCheckbox.click();
    }

    this.useSelectedSite = function() {
        return this.useSelectedSiteButton.click();
    }


    this.poolSelection = function(poolValue) {
        commons.selectOption(this.poolSelectionDropDown,poolValue);
    }

    this.addItem = function(){
        return this.addItemButton.click();
    }

    this.enterProductName = function(productNameValue) {
        return this.productNameEntryTextBox.sendKeys(productNameValue);
    }

    this.selectProduct = function() {
        return this.selectProductCheckbox.click();
    }

    this.qty = function(qtyValue) {
        this.qtyEntryTextBox.clear();
        return this.qtyEntryTextBox.sendKeys(qtyValue);
    }


    this.addProduct = function() {
        return this.useSelectedProductButton.click();
    }

    this.updateQty = function(qty, lineCount) {
        temp = "(//input[(@ng-model='item.itemQty')])[" + lineCount + "]";
        element(by.xpath(temp)).clear();
        return element(by.xpath(temp)).sendKeys(qty);        
    }

   this.updateDiscount = function(discount, lineCount) {
        temp = "(//input[(@ng-model='item.itemUnitDiscount')])[" + lineCount + "]";
        element(by.xpath(temp)).clear();
        return element(by.xpath(temp)).sendKeys(discount);
    }



    this.savePO = function() {
        return this.savePOButton.click();
    }


    this.enterBuyerOrg = function(value) {
        commons.selectOption(this.buyerOrgDropdown,value);
    }

 
}


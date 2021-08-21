module.exports =function(){

    this.editButton= element(by.xpath('(//button/span[contains(text(),"Edit")]/parent::button)[2]'));
    this.saveButton= element(by.xpath('(//button[contains(text(),"Save")])[2]'));

    this.skuDisplayNameEntryTextBox= element(by.xpath('//input[@ng-model="sku.data.displayName"]'));
    this.skuTitleTextBox= element(by.xpath('//input[@ng-model="sku.data.title"]'));

    this.productSearchButton = element(by.xpath('//button/en-icon[@icon="search"]/parent::button'));
    this.productTextBox = element(by.xpath('//input[@ng-model="productDisplayName"]'));
    this.selectSKUCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input'));    
    this.addProductButton = element(by.xpath('//button/span[contains(text(),"Add Product")]/parent::button'));
    
    this.skuIdTextBox = element(by.xpath('//input[@ng-model="sku.data.skuId"]'));

    this.skuDimensionUOMDropDown = element(by.xpath('//select[@name="dimensionUOM"]'));
    this.skuHeightEntryTextBox= element(by.xpath('//input[@name="height"]'));
    this.skuLengthEntryTextBox= element(by.xpath('//input[@name="length"]'));
    this.skuWidthEntryTextBox= element(by.xpath('//input[@name="width"]'));

    this.skuCatalogLink = element(by.xpath('//en-tab[contains(text(),"Catalogs")]'));
    this.skuAttachCatalogButton = element(by.xpath('//button/span[contains(text(),"Attach to Catalog")]/parent::button'));

    this.skuCatalogIdDropDown = element(by.xpath('//select[@name="catalogId"]'));
    this.skuCategoryNameDropDown = element(by.xpath('//select[@name="catalogName"]'));
    this.skuBasePriceEntryTextBox= element(by.xpath('//input[@name="price"]'));
    this.skuMSRPEntryTextBox= element(by.xpath('//input[@name="comparePrice"]'));

    this.skuEditCatalogButton = element(by.xpath('//button/en-icon[@icon="more-vertical"]/parent::button'));
    this.skuEditRemoveCatalogButton = element(by.xpath('//button/span[text()="Remove"]/parent::button'));


    this.savePopupButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[2]'));



//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.editSku = function() {
        return this.editButton.click();
    }



    this.enterDisplayName = function(displayName) {
        return this.skuDisplayNameEntryTextBox.sendKeys(displayName);
    }

 
    this.enterTitle = function(title) {
        return this.skuTitleTextBox.sendKeys(title);
    }

    this.enterProduct = function(product) {
        this.productSearchButton.click();

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = product.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(product[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
        
        this.selectSKUCheckbox.click();
        return this.addProductButton.click();
    }

    this.enterId = function(id) {
        return this.skuIdTextBox.sendKeys(id);
    }

    this.enterUOM = function(uom) {
        commons.selectOption(this.skuDimensionUOMDropDown,uom);
    }
    
    this.enterHeight = function(height) {
        return this.skuHeightEntryTextBox.sendKeys(height);
    }
    
    this.enterLength = function(length) {
        return this.skuLengthEntryTextBox.sendKeys(length);
    }

    this.enterWidth = function(width) {
        return this.skuWidthEntryTextBox.sendKeys(width);
    }

    this.selectCatalog = function() {
        return this.skuCatalogLink.click();
    }

    this.attachCatalog = function() {
        return this.skuAttachCatalogButton.click();
    }

    
    this.enterCatalogId = function(catalogId) {
        commons.selectOption(this.skuCatalogIdDropDown,catalogId); 
    }
   
    this.enterCategoryName= function(categoryName) {
        commons.selectOption(this.skuCategoryNameDropDown,categoryName);
    }

    this.enterBasePrice = function(basePrice) {
        return this.skuBasePriceEntryTextBox.sendKeys(basePrice);
    }
   
    this.enterMSRP = function(msrp) {
        return this.skuMSRPEntryTextBox.sendKeys(msrp);
    }

    this.deattachCatalog = function() {
        this.skuEditCatalogButton.click();
        this.skuEditRemoveCatalogButton.click();
    }

    this.savePopup = function() {
        return this.savePopupButton.click();
    }

    this.saveSku = function() {
        return this.saveButton.click();
    }
}


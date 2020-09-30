module.exports =function(){

    this.newProductButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.productRefNameEntryTextBox= element(by.xpath('//input[@ng-model="product.data.refName"]'));
    this.productDisplayNameEntryTextBox= element(by.xpath('//input[@ng-model="product.data.displayName"]'));
    this.productTitleTextBox= element(by.xpath('//input[@ng-model="product.data.title"]'));
    this.productIdTypeDropdown= element(by.xpath('//select[@name="productidtype"]'));
    this.productIdEntryTextBox= element(by.xpath('//input[@name="productId"]'));

    this.productOrgDropdown = element(by.xpath('//select[@ng-model="selectedOrg"]'));

    this.productDimensionUOMDropDown = element(by.xpath('//select[@name="dimensionUOM"]'));
    this.productHeightEntryTextBox= element(by.xpath('//input[@name="height"]'));
    this.productLengthEntryTextBox= element(by.xpath('//input[@name="length"]'));
    this.productWidthEntryTextBox= element(by.xpath('//input[@name="width"]'));

    this.productCatalogLink = element(by.xpath('//en-tab[contains(text(),"Catalogs")]'));
    this.productAttachCatalogButton = element(by.xpath('//button/span[contains(text(),"Attach to Catalog")]/parent::button'));

    this.productCatalogIdDropDown = element(by.xpath('//select[@name="catalogId"]'));
    this.productCategoryNameDropDown = element(by.xpath('//select[@name="catalogName"]'));
    this.productBasePriceEntryTextBox= element(by.xpath('//input[@name="price"]'));
    this.productMSRPEntryTextBox= element(by.xpath('//input[@name="comparePrice"]'));

    this.savePopupButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.autoCreateSkuCheckbox = element(by.xpath('//input[@name="createSKUFromProduct"]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.newProduct = function() {
        return this.newProductButton.click();
    }

    this.enterRefName = function(refName) {
        return this.productRefNameEntryTextBox.sendKeys(refName);
    }

    this.enterDisplayName = function(displayName) {
        return this.productDisplayNameEntryTextBox.sendKeys(displayName);
    }
 
    this.enterTitle = function(title) {
        return this.productTitleTextBox.sendKeys(title);
    }

    this.enterIdType = function(idType) {
        commons.selectOption(this.productIdTypeDropdown,idType);
    }

    this.enterId = function(id) {
        return this.productIdEntryTextBox.sendKeys(id);
    }

    this.selectOrg = function(org) {
        commons.selectOption(this.productOrgDropdown,org);
    }

    this.enterUOM = function(uom) {
        commons.selectOption(this.productDimensionUOMDropDown,uom);
    }
    
    this.enterHeight = function(height) {
        return this.productHeightEntryTextBox.sendKeys(height);
    }
    
    this.enterLength = function(length) {
        return this.productLengthEntryTextBox.sendKeys(length);
    }

    this.enterWidth = function(width) {
        return this.productWidthEntryTextBox.sendKeys(width);
    }

    this.selectCatalog = function() {
        return this.productCatalogLink.click();
    }

    this.attachCatalog = function() {
        return this.productAttachCatalogButton.click();
    }

    
    this.enterCatalogId = function(catalogId) {
        commons.selectOption(this.productCatalogIdDropDown,catalogId); 
    }
   
    this.enterCategoryName= function(categoryName) {
        commons.selectOption(this.productCategoryNameDropDown,categoryName);
    }

    this.enterBasePrice = function(basePrice) {
        return this.productBasePriceEntryTextBox.sendKeys(basePrice);
    }
   
    this.enterMSRP = function(msrp) {
        return this.productMSRPEntryTextBox.sendKeys(msrp);
    }

    this.savePopup = function() {
        return this.savePopupButton.click();
    }

    this.saveProduct = function() {
        return this.saveButton.click();
    }

    this.uncheckAutocreateSku = function() {
        return this.autoCreateSkuCheckbox.click();
    }


}


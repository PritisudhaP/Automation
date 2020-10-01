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
    this.editProductButton = element(by.xpath("//button/span[text() = 'Edit']/parent::button"));
    this.productCategoryNameDropDown = element(by.xpath('//select[@name="catalogName"]'));
    this.productBasePriceEntryTextBox= element(by.xpath('//input[@name="price"]'));
    this.productMSRPEntryTextBox= element(by.xpath('//input[@name="comparePrice"]'));

    this.savePopupButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.autoCreateSkuCheckbox = element(by.xpath('//input[@name="createSKUFromProduct"]'));
    this.activeProductCheckBox = element(by.xpath("//input[@name = 'active']"));
    this.isPurchaseItemCheckBox = element(by.xpath("(//en-control/label/input[@name = 'noninventory'])[2]"));
    this.isSellableItemCheckBox = element(by.xpath("(//en-control/label/input[@name = 'noninventory'])[3]"));
    this.editScreenSaveButton = element(by.xpath("//button[@type = 'submit']"));

    this.productSelectGearIcon = element(by.xpath("//en-actions/button/en-icon"));
    this.editOption = element(by.xpath("//span[contains(text(),'Edit')]/parent::button"));
    this.addVariantButton = element(by.xpath("//button/span[text() = 'Add Variant Attribute']/parent::button"));
    this.variantName = element(by.xpath("//div/en-section/en-header/span/input[@ng-model = 'variantAttribute.variantName']"));
    this.addVariantValueButton = element(by.xpath("(//div/button/span[text() = 'Add Value'])[1]//parent::Button"));
    this.variantDisplayName = element(by.xpath("//en-modal-body/en-content/en-control/input[@name='displayName']"));
    this.variantAbbrevation = element(by.xpath("//en-modal-body/en-content/en-control/input[@name='abbreviation']"));
    this.defaultValueCheckBox = element(by.xpath("//en-modal-body/en-content/en-control/label[text()=' Default Value?']/input"));
    this.variantSaveButton = element(by.xpath("//en-modal-footer/button[@type ='submit']"));


    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.newProduct = function() {
        return this.newProductButton.click();
    }

    this.enterRefName = function(refName) {
        return this.productRefNameEntryTextBox.sendKeys(refName);
    }
    this.chooseProductSelectGear = function(){
        this.productSelectGearIcon.click();
        browser.sleep(1000);
        return this.editOption.click();
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

    this.checkActiveProductCheckBox = function () {
        return this.activeProductCheckBox.click();
        browser.sleep(2000);
    }
    this.checkIsPurchaseItemCheckBox = function(){
        return this.isPurchaseItemCheckBox.click();
    }
    this.checkIsSellableItemCheckBox = function () {
        return this.isSellableItemCheckBox.click();
    }
    this.clickOnAddVariantButton = function () {
        return this.addVariantButton.click();
    }
    this.enterVariantName = function (variantName) {
        //this.variantName.click();
        return this.variantName.sendKeys(variantName);
    }
    this.clickOnVariant = function(variantName){
        this.variantName.click();
    }
    this.clickaddValueToVariantButton = function () {
        return this.addVariantValueButton.click();
    }
    this.EnterVariantValue = function (displayname , abbrevation) {
        this.variantDisplayName.sendKeys(displayname);
        return this.variantAbbrevation.sendKeys(abbrevation);
    }
    this.markAsDefaultValue = function () {
        return this.defaultValueCheckBox.click();
    }
    this.saveVariantValue = function () {
        return this.variantSaveButton .click();
    }
    this.clickOnSaveButton = function() {
        return this.editScreenSaveButton.click();

    }

    this.clickOnEditProduct = function() {
        return this.editProductButton.click();
    }


}


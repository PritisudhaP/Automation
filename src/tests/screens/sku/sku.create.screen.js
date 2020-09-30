module.exports =function(){

    this.newSkuButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.skuDisplayNameEntryTextBox= element(by.xpath('//input[@ng-model="sku.data.displayName"]'));
    this.skuTitleTextBox= element(by.xpath('//input[@ng-model="sku.data.title"]'));

   // this.productSearchButton = element(by.xpath('//button/en-icon[@icon="search"]/parent::button'));
   //modified by Priti
   this.productSearchButton = element(by.xpath("//button[@type='button']/en-icon[@icon='search']"));
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

    this.savePopupButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[2]'));

    //modified by Priti for Presale
    this.skuPresaleLink = element(by.xpath("//en-tab[contains(text(),'Pre Sales')]"));
    this.addButton = element(by.xpath("(//button/span[contains(text(),'Add')])[4]"));
    this.presaleQuantityEntryTextBox= element(by.xpath("//input[@name='presaleQty']"));
    this.presaleStartDateEntryTextBox = element(by.xpath("//input[@name='startDate']"));
    this.presaleEndDateEntryTextBox = element(by.xpath("//input[@name='endDate']"));
    this.presaleExpectedShipDateEntryTextBox =element(by.xpath("//input[@name='expectedShipDate']"));
    this.createpresaleButton = element(by.xpath("//button[@class='button-primary en-button button-primary ng-binding']"));
    this.getPresaleLabel = element(by.xpath("//en-label[@ng-if='sku.data.presale']"))
    this.removePresaleoption = element(by.xpath("//span[contains(text(),'Remove')]"));
    this.DeleteButton = element(by.xpath("//span[contains(text(),'Delete')]"));


    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newSku = function() {
        return this.newSkuButton.click();
    }

    this.enterDisplayName = function(displayName) {
        return this.skuDisplayNameEntryTextBox.sendKeys(displayName);
    }


    this.enterTitle = function(title) {
        return this.skuTitleTextBox.sendKeys(title);
    }

    this.enterProduct = function(product) {
        this.productSearchButton.click();
        browser.sleep(2000);

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = product.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(product[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);
        this.selectSKUCheckbox.click();
        browser.sleep(1000);
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

    this.savePopup = function() {
        return this.savePopupButton.click();
    }

    this.saveSku = function() {
        return this.saveButton.click();
    }

    //modified by Priti for Presale

    this.selectPresale = function()
    {
      return this.skuPresaleLink.click();
    }
    this.clickOnAdd = function()
    {
     return this.addButton.click();
    }
    this.enterPresaleQuantity =function(quantity)
    {
       return this.presaleQuantityEntryTextBox.sendKeys(quantity);
    }
    this.enterPresaleStartDate =function(startdate)
    {
      return this.presaleStartDateEntryTextBox.sendKeys(startdate);
    }
    this.enterPresaleEndDate = function(enddate)
    {
      return this.presaleEndDateEntryTextBox.sendKeys(enddate);
    }
    this.enterPresaleshippedDate = function(shippedDate)
    {
      return this.presaleExpectedShipDateEntryTextBox.sendKeys(shippedDate);
    }
    this.clickOnCretePresale = function()
    {
     return this.createpresaleButton.click();
    }
    this.getLabelOfPresale = function()
    {
      return this.getPresaleLabel.getText();
    }
    this.removePresale = function()
    {
     element(by.xpath("(//en-actions/button)[2]")).click();
      return this.removePresaleoption.click();
    }
    this.clickOnDelete = function()
    {
     return this.DeleteButton.click();
    }

}


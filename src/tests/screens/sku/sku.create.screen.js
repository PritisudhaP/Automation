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
    this.skuCrossReferences = element(by.xpath("//en-tab[text() = 'Cross References']"));
    this.skuAttachCatalogButton = element(by.xpath('//button/span[contains(text(),"Attach to Catalog")]/parent::button'));

    this.skuCatalogIdDropDown = element(by.xpath('//select[@name="catalogId"]'));
    this.skuCategoryNameDropDown = element(by.xpath('//select[@name="catalogName"]'));
    this.skuBasePriceEntryTextBox= element(by.xpath('//input[@name="price"]'));
    this.skuMSRPEntryTextBox= element(by.xpath('//input[@name="comparePrice"]'));

    this.savePopupButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[2]'));
	  this.activeProductCheckBox = element(by.xpath("//input[@name = \"active\"]"));
    this.addButton = element(by.xpath("(//button/span[text() = 'Add']/parent::button)[2]"));
    this.searchReplacementSkuIcon = element(by.xpath("(//en-field/button/en-icon[@icon = 'search']/parent::button)[2]"));
    this.skuSearchOption = element(by.xpath("(//button/div/span[contains(text(),'Filters')]/parent::div/parent::button)[2]"));
    this.searchReplacementSkuTextBox = element(by.xpath("(//en-input/input)[4]/parent::en-input"));
    this.selectSkuValue = element(by.xpath("//div/div[@class = 'en-collection-row']/div/input"));
    this.addSkuButton = element(by.xpath("//button/span[text() = 'Add Sku']/parent::button"));
    this.createSkuCrossReferenceButton = element(by.xpath("//button[@object = 'skuCrossReference']"));
    this.skuCatalogGearIcon = element(by.xpath("//en-actions/button/en-icon"));
    this.removeCatalogButton = element(by.xpath("//span/li/button/span[text() = 'Remove']/parent::button"));

    this.errorMsgForSkuWithSameVariants =  element(by.xpath("(//en-content/en-alert[@class = 'alert-error']/span)[1]"));

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


//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.searchWithCriteria = function(criteria,content, searchValue){

        this.skuSearchOption.click();
        browser.sleep(100);
        this.filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        this.filterContentDropdown.sendKeys(content);
        browser.sleep(100);
        this.searchValueTextbox.sendKeys(searchValue);
        element(by.xpath('//input[contains(@class, "adv-search-input") and @name="filter-value"]')).sendKeys(protractor.Key.ENTER);


    }
    this.clickOnAddSkuButton = function () {
        return this.addSkuButton.click();

    }
    this.clickOnCreateSkuCrossReferenceButton  = function () {
        return this.createSkuCrossReferenceButton.click();
    }

    this.clickOnResultSku = function () {
        return this.selectSkuValue.click();

    }

    this.enterReplacementSkuName = function (skuName) {
        browser.sleep(2000);

        element(by.xpath('(//input[contains(@class, "adv-search-input")])[2]')).clear();
        for (var i = 0, len = skuName.length; i < len; i++) {
            element(by.xpath('(//input[contains(@class, "adv-search-input")])[2]')).sendKeys(skuName[i]);
            browser.sleep(100);
        }
        element(by.xpath('(//input[contains(@class, "adv-search-input")])[2]')).sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);

        //this.searchReplacementSkuTextBox.sendKeys(browser.params.referenceSku1);
        //browser.sleep(1000);
        //this.searchReplacementSkuTextBox.sendKeys(protractor.Key.ENTER);

    }

    this.clickOnAddButton = function()
    {
        return this.addButton.click();
    }

    this.clickOnsearchReplacementSkuIcon = function() {
        return this.searchReplacementSkuIcon.click();
    }
    this.selectCrossRefreneceType = function (referenceType) {
        temp = "//select/option[@value ='" + referenceType + "']";
        element(by.xpath(temp)).click();
        browser.sleep(2000);
    }

    this.newSku = function() {
        return this.newSkuButton.click();
    }
    this.clickOnSkuCrossReferenceTab = function()
    {
        return this.skuCrossReferences.click();
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

    this.clickOnDeleteCatalogButton = function () {

        this.skuCatalogGearIcon.click();
        browser.sleep(1000);
        return this.removeCatalogButton.click();
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
	this.checkActiveProductCheckBox = function () {
        return this.activeProductCheckBox.click();
    }
    this.errorMsgForSkuWithSameVariant = function () {
        return this.errorMsgForSkuWithSameVariants.getText();
								   
    }
    this.editVariant = function(){
      //temp = "//div/en-section/en-header/en-title[text() = "+variantName+"]/parent::en-header";
        temp = "(//div/en-section/en-header/en-title/parent::en-header)[1]"
      return element(by.xpath(temp)).click();

    }
    this.chooseAnotherVariantValue = function(VariantValue)
    {
       //temp = "//div/en-control-group/en-control/label[contains(text() , "+VariantValue+")]/input[@type = 'radio']";
       temp = "(//div/en-control-group/en-control/label/input[@type = 'radio'])[2]";
        return element(by.xpath(temp)).click();
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


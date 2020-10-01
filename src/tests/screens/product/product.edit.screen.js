module.exports =function() {

    this.attachSkuToKitButton = element(by.xpath("//button/span[text() = 'Attach Skus to Kit']/parent::button"));
    this.selectSkuFromResult = element(by.xpath("(//div/div[@class = 'en-collection-row']/div/input)[1]"));
    this.useSelectedSkuButton = element(by.xpath("//button/span[text() = 'Use Selected Skus']/parent::button"));
    this.editScreenSaveButton = element(by.xpath("//button[@type = 'submit']"));
    this.searchOption = element(by.xpath('//button/div/span[contains(text(),"Filters")]/parent::div/parent::button'));
    this.filterCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.filterContentDropdown = element(by.xpath('//select[@name="filter-content"]'));
    this.searchValueTextbox = element(by.xpath('//input[@name="filter-value"]'));
    //this.clearSearchOption = element(by.xpath("//button/span[text() = 'NivedithaSKUTC001']/parent::button"));
    this.doneEditingButton  = element(by.xpath("//button/span[text() = 'Done Editing']/parent::button"));
    this.editButton = element(by.xpath("//button/span[text() = 'Edit']/parent::button"));
    this.deleteButton = element(by.xpath("//button/span[text() = 'Delete']/parent::button"));
    this.skuSelectGearIcon = element(by.xpath("(//en-actions/button/en-icon)[2]"));



    this.clickOnEditButton = function()
    {
        return this.editButton.click();
    }

    this.clickOnDeleteButton = function(){
        return this.deleteButton.click();
    }

    this.clickOnSelectGear = function()
    {
        return this.skuSelectGearIcon.click();
    }

    this.clickOnDeleteCatalogButton = function () {

        this.skuCatalogGearIcon.click();
        browser.sleep(1000);
        return this.removeCatalogButton.click();
    }

    this.clickOnAttachSkuToKitButton = function () {
        return this.attachSkuToKitButton.click();
    }

    this.chooseSkuFromResult = function() {
        return this.selectSkuFromResult.click();
    }

    this.clickOnUseSelectedSkuButton = function() {
        return this.useSelectedSkuButton.click();
    }

    this.clickOnSaveButton = function() {
        return this.editScreenSaveButton.click();

    }

    this.searchWithCriteria = function(criteria,content, searchValue){

        this.searchOption.click();
        browser.sleep(100);
        this.filterCriteriaDropdown.sendKeys(criteria);
        browser.sleep(100);
        this.filterContentDropdown.sendKeys(content);
        browser.sleep(100);
        this.searchValueTextbox.sendKeys(searchValue);
         element(by.xpath('//input[contains(@class, "adv-search-input") and @name="filter-value"]')).sendKeys(protractor.Key.ENTER);


    }

    this.clickOnClearSearch = function (sku1value) {
        temp = "//button/span[text() = '"+ sku1value +"']/parent::button";
        return element(by.xpath(temp)).click();
        // return this.clearSearchOption.click();
    }

    this.clickOnDoneEditingButton = function()
    {
        return this.doneEditingButton.click();
    }



}

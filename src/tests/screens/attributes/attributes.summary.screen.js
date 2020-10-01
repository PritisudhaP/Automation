module.exports =function(){

    var attributesDefaultGearIconOption = "Edit";
    var temp = "";

/*
    this.attributesSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.attributesSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.attributesSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
*/
    
    this.attributesSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.attributesDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    this.attributeSelectRow = element(by.xpath('//div[@class="en-collection-row"]/div[2]'));

    this.attributesSearchTextbox = element(by.xpath('//input[@placeholder="Search attributes"]'));
    this.attributesSearchButton = element(by.xpath('//button/en-icon[@icon="search"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

/*
    this.attributesSearch = function(criteria, attributesSearchValue){
        commons.selectOption(this.attributesSearchCriteriaDropdown,criteria);
        this.attributesSearchTextbox.clear();
        this.attributesSearchTextbox.sendKeys(attributesSearchValue);

        for (var i = 0, len = attributesSearchValue.length; i < len; i++) {
            this.attributesSearchTextbox.sendKeys(attributesSearchValue[i]);
            browser.sleep(100);
        }



        return this.attributesSearchButton.click();


        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = attributesSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(attributesSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }
*/


    this.attributesSearch = function(attributesSearchValue){
        this.attributesSearchTextbox.clear();
        this.attributesSearchTextbox.sendKeys(attributesSearchValue);
        this.attributesSearchButton.click();
        

    }

    this.attributesSelectGear = function(selectOption){
        this.attributesSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.attributeSelect = function(){
        return this.attributeSelectRow.click();
    }



}


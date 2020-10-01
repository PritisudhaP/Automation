module.exports =function(){

    var skuDefaultGearIconOption = "Edit";
    var temp = "";


    this.skuSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.skuSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.skuSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.skuSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.skuDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.skuSearch = function(criteria, skuSearchValue){
/*        commons.selectOption(this.skuSearchCriteriaDropdown,criteria);
        commons.refresh();
        this.skuSearchTextbox.clear();
//        this.skuSearchTextbox.sendKeys(skuSearchValue);

        for (var i = 0, len = skuSearchValue.length; i < len; i++) {
            this.skuSearchTextbox.sendKeys(skuSearchValue[i]);
            browser.sleep(100);
        }


        return this.skuSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = skuSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(skuSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.skuSelectGear = function(selectOption){
        this.skuSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";

        element(by.xpath(temp)).click();
        if (selectOption == "Delete") {
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }

    }

}


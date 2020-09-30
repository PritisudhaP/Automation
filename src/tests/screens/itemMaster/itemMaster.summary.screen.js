module.exports =function(){

    var itemMasterDefaultGearIconOption = "Edit";
    var temp = "";


    this.itemMasterSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.itemMasterSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.itemMasterSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.itemMasterSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.itemMasterDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.itemMasterSearch = function(criteria, itemMasterSearchValue){
/*        commons.selectOption(this.itemMasterSearchCriteriaDropdown,criteria);
        this.itemMasterSearchTextbox.clear();
//        this.itemMasterSearchTextbox.sendKeys(itemMasterSearchValue);

        for (var i = 0, len = itemMasterSearchValue.length; i < len; i++) {
            this.itemMasterSearchTextbox.sendKeys(itemMasterSearchValue[i]);
            browser.sleep(100);
        }

        return this.itemMasterSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = itemMasterSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(itemMasterSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.itemMasterSelectGear = function(selectOption){
        this.itemMasterSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


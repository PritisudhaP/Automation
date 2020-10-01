module.exports =function(){

    var triggerDefaultGearIconOption = "Edit";
    var temp = "";


    this.triggerSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.triggerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.triggerSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.triggerSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.triggerDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.triggerSearch = function(criteria, triggerSearchValue){
/*        commons.selectOption(this.triggerSearchCriteriaDropdown,criteria);
        this.triggerSearchTextbox.clear();
//        this.triggerSearchTextbox.sendKeys(triggerSearchValue);

        for (var i = 0, len = triggerSearchValue.length; i < len; i++) {
            this.triggerSearchTextbox.sendKeys(triggerSearchValue[i]);
            browser.sleep(100);
        }

        return this.triggerSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = triggerSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(triggerSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.triggerSelectGear = function(selectOption){
        this.triggerSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


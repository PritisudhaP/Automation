module.exports =function(){

    var purgeDefaultGearIconOption = "Edit";
    var temp = "";


    this.purgeSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.purgeSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.purgeSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.purgeSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.purgeDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.purgeSearch = function(criteria, purgeSearchValue){
/*        commons.selectOption(this.purgeSearchCriteriaDropdown,criteria);
        this.purgeSearchTextbox.clear();
//        this.purgeSearchTextbox.sendKeys(purgeSearchValue);

        for (var i = 0, len = purgeSearchValue.length; i < len; i++) {
            this.purgeSearchTextbox.sendKeys(purgeSearchValue[i]);
            browser.sleep(100);
        }



        return this.purgeSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = purgeSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(purgeSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.purgeSelectGear = function(selectOption){
        this.purgeSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        browser.sleep(1000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


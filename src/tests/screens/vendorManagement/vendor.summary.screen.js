module.exports =function(){

    var vendorDefaultGearIconOption = "Edit";
    var temp = "";


    this.vendorSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.vendorSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.vendorSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.vendorSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.vendorDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.vendorSearch = function(criteria, vendorSearchValue){
/*       commons.selectOption(this.vendorSearchCriteriaDropdown,criteria);
        this.vendorSearchTextbox.clear();
//        this.vendorSearchTextbox.sendKeys(vendorSearchValue);

        for (var i = 0, len = vendorSearchValue.length; i < len; i++) {
            this.vendorSearchTextbox.sendKeys(vendorSearchValue[i]);
            browser.sleep(100);
        }

        return this.vendorSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = vendorSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(vendorSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.vendorSelectGear = function(selectOption){
        this.vendorSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


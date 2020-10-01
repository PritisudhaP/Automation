module.exports =function(){

    var priceBookDefaultGearIconOption = "Edit";
    var temp = "";


    this.priceBookSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.priceBookSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.priceBookSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.priceBookSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.priceBookDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.priceBookSearch = function(criteria, priceBookSearchValue){
/*        commons.selectOption(this.priceBookSearchCriteriaDropdown,criteria);
        this.priceBookSearchTextbox.clear();
//        this.priceBookSearchTextbox.sendKeys(priceBookSearchValue);

        for (var i = 0, len = priceBookSearchValue.length; i < len; i++) {
            this.priceBookSearchTextbox.sendKeys(priceBookSearchValue[i]);
            browser.sleep(100);
        }

        return this.priceBookSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = priceBookSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(priceBookSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.priceBookSelectGear = function(selectOption){
        this.priceBookSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


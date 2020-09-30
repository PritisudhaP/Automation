module.exports =function(){

    var siteDefaultGearIconOption = "Edit";
    var temp = "";

    this.siteSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.siteSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.siteSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    this.siteSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.siteDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.siteSearch = function(criteria, siteSearchValue){
/*        commons.selectOption(this.siteSearchCriteriaDropdown,criteria);
        this.siteSearchTextbox.clear();
//        this.siteSearchTextbox.sendKeys(siteSearchValue);

        for (var i = 0, len = siteSearchValue.length; i < len; i++) {
            this.siteSearchTextbox.sendKeys(siteSearchValue[i]);
            browser.sleep(100);
        }

        return this.siteSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = siteSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(siteSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);


    }

    this.siteSelectGear = function(selectOption){
        this.siteSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
       return element(by.xpath(temp)).click();
       // temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
       // return element.all(by.xpath(temp)).get(1).click();
    }

}


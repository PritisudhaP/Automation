module.exports =function(){

    var catalogDefaultGearIconOption = "Edit";
    var temp = "";


    this.catalogSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.catalogSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.catalogSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    
    this.catalogSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.catalogDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.catalogSearch = function(criteria, catalogSearchValue){
/*        commons.selectOption(this.catalogSearchCriteriaDropdown,criteria);
        this.catalogSearchTextbox.clear();
        for (var i = 0, len = catalogSearchValue.length; i < len; i++) {
            this.catalogSearchTextbox.sendKeys(catalogSearchValue[i]);
            browser.sleep(100);
        }
        this.catalogSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = catalogSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(catalogSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.catalogSelectGear = function(selectOption){
        this.catalogSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


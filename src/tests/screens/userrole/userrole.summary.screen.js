module.exports =function(){

    var userroleDefaultGearIconOption = "Edit";
    var temp = "";

    this.userroleSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.userroleSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.userroleSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    
    this.userroleSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.userroleDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.userroleSearch = function(criteria, userroleSearchValue){
/*        commons.selectOption(this.userroleSearchCriteriaDropdown,criteria);
        this.userroleSearchTextbox.clear();
//        this.userroleSearchTextbox.sendKeys(userroleSearchValue);

        for (var i = 0, len = userroleSearchValue.length; i < len; i++) {
            this.userroleSearchTextbox.sendKeys(userroleSearchValue[i]);
            browser.sleep(100);
        }


        return this.userroleSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = userroleSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(userroleSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.userroleSelectGear = function(selectOption){
        this.userroleSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


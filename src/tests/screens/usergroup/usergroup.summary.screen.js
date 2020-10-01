module.exports =function(){

    var usergroupDefaultGearIconOption = "Edit";
    var temp = "";

    this.usergroupSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.usergroupSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.usergroupSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.usergroupSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.usergroupDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.usergroupSearch = function(criteria, usergroupSearchValue){
/*        commons.selectOption(this.usergroupSearchCriteriaDropdown,criteria);
        this.usergroupSearchTextbox.clear();
//        this.usergroupSearchTextbox.sendKeys(usergroupSearchValue);

        for (var i = 0, len = usergroupSearchValue.length; i < len; i++) {
            this.usergroupSearchTextbox.sendKeys(usergroupSearchValue[i]);
            browser.sleep(100);
        }

        return this.usergroupSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = usergroupSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(usergroupSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.usergroupSelectGear = function(selectOption){
        this.usergroupSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


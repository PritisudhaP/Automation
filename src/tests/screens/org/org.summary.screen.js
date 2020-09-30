module.exports =function(){

    var orgDefaultGearIconOption = "Edit";
    var temp = "";

    this.orgSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.orgSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.orgSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.orgSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.orgDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.orgSearch = function(criteria, orgSearchValue){
/*        commons.selectOption(this.orgSearchCriteriaDropdown,criteria);
        this.orgSearchTextbox.clear();
//        this.orgSearchTextbox.sendKeys(orgSearchValue);

        for (var i = 0, len = orgSearchValue.length; i < len; i++) {
            this.orgSearchTextbox.sendKeys(orgSearchValue[i]);
            browser.sleep(100);
        }



        return this.orgSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = orgSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(orgSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.orgSelectGear = function(selectOption){
        this.orgSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


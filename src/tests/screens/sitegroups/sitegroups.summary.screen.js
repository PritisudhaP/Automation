module.exports =function(){

    var sitegroupDefaultGearIconOption = "Edit";
    var temp = "";

    this.sitegroupSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.sitegroupSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.sitegroupSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.sitegroupSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.sitegroupDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.sitegroupSearch = function(criteria, sitegroupSearchValue){
/*        commons.selectOption(this.sitegroupSearchCriteriaDropdown,criteria);
        this.sitegroupSearchTextbox.clear();
//        this.sitegroupSearchTextbox.sendKeys(sitegroupSearchValue);


        for (var i = 0, len = sitegroupSearchValue.length; i < len; i++) {
            this.sitegroupSearchTextbox.sendKeys(sitegroupSearchValue[i]);
            browser.sleep(100);
        }

        return this.sitegroupSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = sitegroupSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(sitegroupSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);


    }

    this.sitegroupSelectGear = function(selectOption){
        this.sitegroupSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }

}


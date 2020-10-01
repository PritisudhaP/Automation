module.exports =function(){

    var capabilitiesDefaultGearIconOption = "View";
    var temp = "";

    this.capabilitiesSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.capabilitiesSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.capabilitiesSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.capabilitiesSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.capabilitiesDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.capabilitiesSearch = function(criteria, capabilitiesSearchValue){
/*        commons.selectOption(this.capabilitiesSearchCriteriaDropdown,criteria);
        this.capabilitiesSearchTextbox.clear();
//        this.capabilitiesSearchTextbox.sendKeys(capabilitiesSearchValue);


        for (var i = 0, len = capabilitiesSearchValue.length; i < len; i++) {
            this.capabilitiesSearchTextbox.sendKeys(capabilitiesSearchValue[i]);
            browser.sleep(100);
        }


        return this.capabilitiesSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = capabilitiesSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(capabilitiesSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
   }

    this.capabilitiesSelectGear = function(selectOption){
        this.capabilitiesSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


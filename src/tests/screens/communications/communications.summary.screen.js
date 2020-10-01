module.exports =function(){

    var communicationsDefaultGearIconOption = "Edit";
    var temp = "";

    this.communicationsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.communicationsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.communicationsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

 //   this.communicationsSearchTextbox = element(by.xpath('//input[@placeholder="Search communicationConfigurations"]'));
 //   this.communicationsSearchButton = element(by.xpath('//button/en-icon[@icon="search"]/parent::button'));
    
    this.communicationsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.communicationsDeleteFromGearIcon = element(by.xpath('//button/span[contains(text(),"Delete")]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.communicationsSearch = function(criteria, communicationsSearchValue){
/*        commons.selectOption(this.communicationsSearchCriteriaDropdown,criteria);
        this.communicationsSearchTextbox.clear();

        for (var i = 0, len = communicationsSearchValue.length; i < len; i++) {
            this.communicationsSearchTextbox.sendKeys(communicationsSearchValue[i]);
            browser.sleep(100);
        }

        return this.communicationsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = communicationsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(communicationsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.communicationsSelectGear = function(selectOption){
        this.communicationsSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


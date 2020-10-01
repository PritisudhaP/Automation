module.exports =function(){

    var customersDefaultGearIconOption = "Edit";
    var temp = "";

    this.customersSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.customersSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.customersSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.customersSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.customersDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));
    this.resetPasswordText = element(by.xpath('//en-content/h2[@class="ng-binding"]'));

  //var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.customersSearch = function(criteria, customersSearchValue){
/*        commons.selectOption(this.customersSearchCriteriaDropdown,criteria);
        this.customersSearchTextbox.clear();
//        this.customersSearchTextbox.sendKeys(customersSearchValue);

        for (var i = 0, len = customersSearchValue.length; i < len; i++) {
            this.customersSearchTextbox.sendKeys(customersSearchValue[i]);
            browser.sleep(100);
        }

        return this.customersSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = customersSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(customersSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.customersSelectGear = function(selectOption){
        this.customersSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        if (selectOption == "Delete") {
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }
    this.messageResetPassword = function()
    {
      return this.resetPasswordText.getText();
    }

}


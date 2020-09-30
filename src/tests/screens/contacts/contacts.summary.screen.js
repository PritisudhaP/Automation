module.exports =function(){

    var contactsDefaultGearIconOption = "Edit";
    var temp = "";

    this.contactsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.contactsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.contactsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.contactsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.contactsDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.contactsSearch = function(criteria, contactsSearchValue){
/*        commons.selectOption(this.contactsSearchCriteriaDropdown,criteria);
        this.contactsSearchTextbox.clear();
//        this.contactsSearchTextbox.sendKeys(contactsSearchValue);

        for (var i = 0, len = contactsSearchValue.length; i < len; i++) {
            this.contactsSearchTextbox.sendKeys(contactsSearchValue[i]);
            browser.sleep(100);
        }



        return this.contactsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = contactsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(contactsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.contactsSelectGear = function(selectOption){
        this.contactsSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


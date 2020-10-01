module.exports =function(){

    var usersDefaultGearIconOption = "Edit";
    var temp = "";

    this.usersSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.usersSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.usersSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.usersSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.usersDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.usersSearch = function(criteria, usersSearchValue){
/*        commons.selectOption(this.usersSearchCriteriaDropdown,criteria);
        this.usersSearchTextbox.clear();
//        this.usersSearchTextbox.sendKeys(usersSearchValue);


        for (var i = 0, len = usersSearchValue.length; i < len; i++) {
            this.usersSearchTextbox.sendKeys(usersSearchValue[i]);
            browser.sleep(100);
        }


        return this.usersSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = usersSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(usersSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

   }

    this.usersSelectGear = function(selectOption){
        this.usersSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


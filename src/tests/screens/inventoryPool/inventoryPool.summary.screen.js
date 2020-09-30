module.exports =function(){

    var inventoryPoolDefaultGearIconOption = "Edit";
    var temp = "";


    this.inventoryPoolSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.inventoryPoolSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.inventoryPoolSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.inventoryPoolSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.inventoryPoolEditFromGearIcon = element(by.xpath('//span[contains(text(),"Edit")]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.inventoryPoolSearch = function(criteria, inventoryPoolSearchValue){
/*        commons.selectOption(this.inventoryPoolSearchCriteriaDropdown,criteria);
        this.inventoryPoolSearchTextbox.clear();
//        this.inventoryPoolSearchTextbox.sendKeys(inventoryPoolSearchValue);

        for (var i = 0, len = inventoryPoolSearchValue.length; i < len; i++) {
            this.inventoryPoolSearchTextbox.sendKeys(inventoryPoolSearchValue[i]);
            browser.sleep(100);
        }



        return this.inventoryPoolSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = inventoryPoolSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(inventoryPoolSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }


    this.inventoryPoolSelectGear = function(selectOption){
        this.inventoryPoolSelectGearIcon.click();
        temp = "//span[contains(text(),'" + selectOption + "')]/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }
}


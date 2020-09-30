module.exports =function(){

    var webhooksDefaultGearIconOption = "View";
    var temp = "";


    this.webhooksSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.webhooksSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.webhooksSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.webhooksSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.webhooksDeleteFromGearIcon = element(by.xpath('//button/span[contains(text(),"Delete")]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.webhooksSearch = function(criteria, webhooksSearchValue){
/*        commons.selectOption(this.webhooksSearchCriteriaDropdown,criteria);
        this.webhooksSearchTextbox.clear();
//        this.webhooksSearchTextbox.sendKeys(webhooksSearchValue);

        for (var i = 0, len = webhooksSearchValue.length; i < len; i++) {
            this.webhooksSearchTextbox.sendKeys(webhooksSearchValue[i]);
            browser.sleep(100);
        }

        return this.webhooksSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = webhooksSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(webhooksSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.webhooksSelectGear = function(selectOption){
        this.webhooksSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
        
    }

}


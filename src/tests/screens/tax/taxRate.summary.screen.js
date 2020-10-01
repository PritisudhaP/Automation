module.exports =function(){

    var rateDefaultGearIconOption = "Edit Rate";
    var temp = "";

    this.rateSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.rateSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.rateSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.rateSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.rateDeleteFromGearIcon = element(by.xpath('//button/span[text()="Remove Tax Rate"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.rateSearch = function(criteria, rateSearchValue){
/*        commons.selectOption(this.rateSearchCriteriaDropdown,criteria);
        this.rateSearchTextbox.clear();
//        this.rateSearchTextbox.sendKeys(rateSearchValue);

        for (var i = 0, len = rateSearchValue.length; i < len; i++) {
            this.rateSearchTextbox.sendKeys(rateSearchValue[i]);
            browser.sleep(100);
        }


        return this.rateSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = rateSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(rateSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);



    }

    this.rateSelectGear = function(selectOption){
        this.rateSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        
        if (selectOption == 'Remove Tax Rate') {
            temp = '//button[contains(text(),"Delete")]';
            return element.all(by.xpath(temp)).get(0).click();
        }    
    }

}


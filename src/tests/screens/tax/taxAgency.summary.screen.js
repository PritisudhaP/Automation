module.exports =function(){

    var agencyDefaultGearIconOption = "Edit Agency";
    var temp = "";

    this.agencySearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.agencySearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.agencySearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.agencySelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.agencyDeleteFromGearIcon = element(by.xpath('//button/span[text()="Remove Agency"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.agencySearch = function(criteria, agencySearchValue){
/*        commons.selectOption(this.agencySearchCriteriaDropdown,criteria);
        this.agencySearchTextbox.clear();
//        this.agencySearchTextbox.sendKeys(agencySearchValue);


        for (var i = 0, len = agencySearchValue.length; i < len; i++) {
            this.agencySearchTextbox.sendKeys(agencySearchValue[i]);
            browser.sleep(100);
        }



        return this.agencySearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = agencySearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(agencySearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.agencySelectGear = function(selectOption){
        this.agencySelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        
        if (selectOption == 'Remove Agency') {
            temp = '//button[contains(text(),"Delete")]';
            return element.all(by.xpath(temp)).get(0).click();
        }    
    }

}


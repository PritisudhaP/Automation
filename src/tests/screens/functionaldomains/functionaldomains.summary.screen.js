module.exports =function(){

    var functionaldomainsDefaultGearIconOption = "View";
    var temp = "";
    
    this.functionaldomainsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.functionaldomainsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.functionaldomainsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.functionaldomainsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.functionaldomainsDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.functionaldomainsSearch = function(criteria,functionaldomainsSearchValue){
/*        commons.selectOption(this.functionaldomainsSearchCriteriaDropdown,criteria);
        this.functionaldomainsSearchTextbox.clear();
//        this.functionaldomainsSearchTextbox.sendKeys(functionaldomainsSearchValue);


        for (var i = 0, len = functionaldomainsSearchValue.length; i < len; i++) {
            this.functionaldomainsSearchTextbox.sendKeys(functionaldomainsSearchValue[i]);
            browser.sleep(100);
        }



        return this.functionaldomainsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = functionaldomainsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(functionaldomainsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.functionaldomainsSelectGear = function(selectOption){
        this.functionaldomainsSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


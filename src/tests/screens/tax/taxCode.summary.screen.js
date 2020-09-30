module.exports =function(){

    var codeDefaultGearIconOption = "Edit Tax Code";
    var temp = "";

    this.codeSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.codeSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.codeSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.codeSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.codeDeleteFromGearIcon = element(by.xpath('//button/span[text()="Remove Tax Code"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.codeSearch = function(criteria, codeSearchValue){
/*        commons.selectOption(this.codeSearchCriteriaDropdown,criteria);
        this.codeSearchTextbox.clear();
//        this.codeSearchTextbox.sendKeys(codeSearchValue);

        for (var i = 0, len = codeSearchValue.length; i < len; i++) {
            this.codeSearchTextbox.sendKeys(codeSearchValue[i]);
            browser.sleep(100);
        }



        return this.codeSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = codeSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(codeSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.codeSelectGear = function(selectOption){
        this.codeSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        
        if (selectOption == 'Remove Tax Code') {
            temp = '//button[contains(text(),"Delete")]';
            return element.all(by.xpath(temp)).get(0).click();
        }    
    }

}


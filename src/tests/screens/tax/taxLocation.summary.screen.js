module.exports =function(){

    var locationDefaultGearIconOption = "Edit Tax Location";
    var temp = "";

    this.locationSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.locationSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.locationSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.locationSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.locationDeleteFromGearIcon = element(by.xpath('//button/span[text()="Remove Tax location"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.locationSearch = function(criteria, locationSearchValue){ 
/*       	commons.selectOption(this.locationSearchCriteriaDropdown,criteria);
        this.locationSearchTextbox.clear();
//        this.locationSearchTextbox.sendKeys(locationSearchValue);

        for (var i = 0, len = locationSearchValue.length; i < len; i++) {
            this.locationSearchTextbox.sendKeys(locationSearchValue[i]);
            browser.sleep(100);
        }




        return this.locationSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = locationSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(locationSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.locationSelectGear = function(selectOption){
        this.locationSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        
        if (selectOption == 'Remove Tax Location') {
            temp = '//button[contains(text(),"Delete")]';
            return element.all(by.xpath(temp)).get(0).click();
        }    
    }

}


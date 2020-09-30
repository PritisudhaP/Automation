module.exports =function(){

    var blobstoreDefaultGearIconOption = "Edit";
    var temp = "";

    this.blobstoreSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.blobstoreSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.blobstoreSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.blobstoreSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.blobstoreDeleteFromGearIcon = element(by.xpath('//button/span[contains(text(),"Delete")]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.blobstoreSearch = function(criteria, blobstoreSearchValue){
/*        commons.selectOption(this.blobstoreSearchCriteriaDropdown,criteria);
        this.blobstoreSearchTextbox.clear();
//        this.blobstoreSearchTextbox.sendKeys(blobstoreSearchValue);

        for (var i = 0, len = blobstoreSearchValue.length; i < len; i++) {
            this.blobstoreSearchTextbox.sendKeys(blobstoreSearchValue[i]);
            browser.sleep(100);
        }


        return this.blobstoreSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = blobstoreSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(blobstoreSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.blobstoreSelectGear = function(selectOption){
        this.blobstoreSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


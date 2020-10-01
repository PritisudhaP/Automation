module.exports =function(){

    var expectedReceiptsDefaultGearIconOption = "View";
    var temp = "";

    this.expectedReceiptsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.expectedReceiptsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.expectedReceiptsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.expectedReceiptsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.expectedReceiptsDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    this.expectedReceiptsStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));


    this.expectedReceiptsMatchFilterSelect = element(by.xpath('//select[@name="filter"]'));

    this.expectedReceiptsSelectAllCheckbox = element(by.xpath('//input[@ng-model="expectedReceiptsCollection.checkAllModel"]'));
    this.expectedReceiptsActionAllButton = element(by.xpath('//div[@class="en-collection-title"]/en-actions/button'));

    this.expectedReceiptsReceivePoolSelect = element(by.xpath('//select[@name="pool"]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.expectedReceiptsSearch = function(criteria, expectedReceiptsSearchValue){
/*        commons.selectOption(this.expectedReceiptsSearchCriteriaDropdown,criteria);
        this.expectedReceiptsSearchTextbox.clear();
//        this.expectedReceiptsSearchTextbox.sendKeys(expectedReceiptsSearchValue);

        for (var i = 0, len = expectedReceiptsSearchValue.length; i < len; i++) {
            this.expectedReceiptsSearchTextbox.sendKeys(expectedReceiptsSearchValue[i]);
            browser.sleep(100);
        }

        return this.expectedReceiptsSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = expectedReceiptsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(expectedReceiptsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.expectedReceiptsSelectGear = function(selectOption){
        this.expectedReceiptsSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        if (selectOption == "Delete") {
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }

    this.expectedReceiptsStatus = function() {
        return this.expectedReceiptsStatusText.getText();
    }


   this.expectedReceiptsMatchFilter = function(value) {
       return this.expectedReceiptsMatchFilterSelect.sendKeys(value);
   }

    this.multiExpectedReceiptsAction = function(action,value1) {
       this.expectedReceiptsSelectAllCheckbox.click();
       this.expectedReceiptsActionAllButton.click();
       temp = "//button/span[contains(text(),'" + action + "')]/parent::button";
       element.all(by.xpath(temp)).get(0).click();
       if (action == 'Receive') {
           this.expectedReceiptsReceivePoolSelect.sendKeys(value1);
           element(by.xpath('//button[contains(text(),"Receive")]')).click();
       }

    }

}


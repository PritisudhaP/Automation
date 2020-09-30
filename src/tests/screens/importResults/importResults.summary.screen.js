module.exports =function(){

    var importResultsDefaultGearIconOption = "Edit";
    var temp = "";

    this.importResultsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.importResultsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.importResultsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.importResultsSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));
    
    this.importResultsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[1]/en-actions/button'));
    this.importResultsReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

    this.importResultsStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[8])[1]'));
    this.importResultsNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[6])[1]/div/small/strong'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.importResultsSearch = function(criteria, importResultsSearchValue){
/*        commons.selectOption(this.importResultsSearchCriteriaDropdown,criteria);
        this.importResultsSearchTextbox.clear();
//        this.importResultsSearchTextbox.sendKeys(importResultsSearchValue);

        for (var i = 0, len = importResultsSearchValue.length; i < len; i++) {
            this.importResultsSearchTextbox.sendKeys(importResultsSearchValue[i]);
            browser.sleep(100);
        }

        return this.importResultsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = importResultsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(importResultsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.importResultsSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }


    this.importResultsSelectGear = function(selectOption){
        this.importResultsSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Edit")
            return element(by.xpath(temp)).click();
        else {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        }
    }

   this.importResultsStatus = function() {
        return this.importResultsStatusText.getText();
   }

   this.importResultsNumber = function() {
       return this.importResultsNumberText.getText();
  }


}


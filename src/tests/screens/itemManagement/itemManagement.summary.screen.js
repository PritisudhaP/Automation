module.exports =function(){

    var itemManagementDefaultGearIconOption = "Edit";
    var temp = "";


    this.itemManagementSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.itemManagementSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.itemManagementSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.itemManagementSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.itemManagementDeleteFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    this.itemLeadTimeText = element(by.xpath('(//div[@class="en-collection-row"]/div[11])[1]'));


    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.itemManagementSearch = function(criteria, itemManagementSearchValue){
/*        commons.selectOption(this.itemManagementSearchCriteriaDropdown,criteria);
        this.itemManagementSearchTextbox.clear();
//        this.itemManagementSearchTextbox.sendKeys(itemManagementSearchValue);

        for (var i = 0, len = itemManagementSearchValue.length; i < len; i++) {
            this.itemManagementSearchTextbox.sendKeys(itemManagementSearchValue[i]);
            browser.sleep(100);
        }

        return this.itemManagementSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = itemManagementSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(itemManagementSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.itemManagementSelectGear = function(selectOption){
        this.itemManagementSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        browser.sleep(2000);
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.itemLeadTime = function() {
        return this.itemLeadTimeText.getText();
   }


}


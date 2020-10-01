module.exports =function(){

    var workOrdersDefaultGearIconOption = "View";
    var temp = "";

    this.workOrdersSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.workOrdersSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.workOrdersSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.workOrdersSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.workOrdersDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    this.workOrderSelectRow = element(by.xpath('//div[@class="en-collection-row"]/div[2]'));

    this.workOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.workOrdersSearch = function(criteria, workOrdersSearchValue){
/*        commons.selectOption(this.workOrdersSearchCriteriaDropdown,criteria);
        this.workOrdersSearchTextbox.clear();
//        this.workOrdersSearchTextbox.sendKeys(workOrdersSearchValue);

        for (var i = 0, len = workOrdersSearchValue.length; i < len; i++) {
            this.workOrdersSearchTextbox.sendKeys(workOrdersSearchValue[i]);
            browser.sleep(100);
        }



        return this.workOrdersSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = workOrdersSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(workOrdersSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.workOrdersSelectGear = function(selectOption){
        this.workOrdersSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.workOrderSelect = function(){
        return this.workOrderSelectRow.click();
    }

    this.workOrderStatus = function(){
        return this.workOrderStatusText.getText();
    }

}


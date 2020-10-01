module.exports =function(){

    var transferOrderDefaultGearIconOption = "Release";
    var temp = "";


    this.transferOrderSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.transferOrderSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.transferOrderSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.transferOrderSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.transferOrderReleaseOrderFromGearIcon = element(by.xpath('//span/li/button/span[text()="Release"]/parent::button'));

    this.transferOrderStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));

    this.refreshButton = element(by.xpath('//button/en-icon[@icon="refresh"]/parent::button'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.transferOrderSearch = function(criteria, transferOrderSearchValue){
/*        commons.selectOption(this.transferOrderSearchCriteriaDropdown,criteria);
        this.transferOrderSearchTextbox.clear();
//        this.transferOrderSearchTextbox.sendKeys(transferOrderSearchValue);

        for (var i = 0, len = transferOrderSearchValue.length; i < len; i++) {
            this.transferOrderSearchTextbox.sendKeys(transferOrderSearchValue[i]);
            browser.sleep(100);
        }


        return this.transferOrderSearchButton.click();
*/
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = transferOrderSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(transferOrderSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
   }


    this.transferOrderSelectGear = function(selectOption){
        this.transferOrderSelectGearIcon.click();
        temp = "//span/li/button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

   this.transferOrderStatus = function() {
        return this.transferOrderStatusText.getText();
   }

   this.refreshScreen = function() {
        return this.refreshButton.click();
   }

}


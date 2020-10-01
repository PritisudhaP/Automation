module.exports =function(){

    var shipmentsDefaultGearIconOption = "Edit";
    var temp = "";

    this.shipmentsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.shipmentsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.shipmentsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    
    this.shipmentsSelectGearIcon = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]/en-actions/button'));
    this.shipmentsEditFromGearIcon = element(by.xpath('//span/li/button/span[text()="Edit"]/parent::button'));

    this.shipmentsStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();

    this.shipmentsSearch = function(criteria, shipmentsSearchValue){
/*        commons.selectOption(this.shipmentsSearchCriteriaDropdown,criteria);
       this.shipmentsSearchTextbox.clear();
//        this.shipmentsSearchTextbox.sendKeys(shipmentsSearchValue);


        for (var i = 0, len = shipmentsSearchValue.length; i < len; i++) {
            this.shipmentsSearchTextbox.sendKeys(shipmentsSearchValue[i]);
            browser.sleep(100);
        }


        return this.shipmentsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = shipmentsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(shipmentsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }


    this.shipmentsSelectGear = function(selectOption){
        this.shipmentsSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        if (selectOption == "Delete") {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        } else if (selectOption == "Mark As Shipped") {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'Yes')]/parent::button";
                return element(by.xpath(temp)).click();
        } else {
            return element(by.xpath(temp)).click();
        }
    }

   this.shipmentsStatus = function() {
        return this.shipmentsStatusText.getText();
   }

}


module.exports =function(){

    var productDefaultGearIconOption = "Edit";
    var temp = "";


    this.productSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.productSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.productSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    this.editOption = element(by.xpath("//span[contains(text(),'Edit')]/parent::button"));

    
    //this.productSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.productSelectGearIcon = element(by.xpath("//en-actions/button/en-icon"));
    this.productDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.productSearch = function(criteria, productSearchValue){
/*        commons.selectOption(this.productSearchCriteriaDropdown,criteria);
        commons.refresh();
        this.productSearchTextbox.clear();
//        this.productSearchTextbox.sendKeys(productSearchValue);

        for (var i = 0, len = productSearchValue.length; i < len; i++) {
            this.productSearchTextbox.sendKeys(productSearchValue[i]);
            browser.sleep(100);
        }


        return this.productSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = productSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(productSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.productSelectGear = function(selectOption){
        this.productSelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        if (selectOption == "Delete") {
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
            return element.all(by.xpath(temp)).get(1).click();
        }
    }
    
    this.chooseProductSelectGear = function(){
        this.productSelectGearIcon.click();
        browser.sleep(1000);
        return this.editOption.click();
    }

}


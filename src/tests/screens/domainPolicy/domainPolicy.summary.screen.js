module.exports =function(){

    var domainPolicyDefaultGearIconOption = "View";
    var temp = "";
    
    this.domainPolicySearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.domainPolicySearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.domainPolicySearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.domainPolicySelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.domainPolicyDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.domainPolicySearch = function(criteria,domainPolicySearchValue){
/*        commons.selectOption(this.domainPolicySearchCriteriaDropdown,criteria);
        this.domainPolicySearchTextbox.clear();
//        this.domainPolicySearchTextbox.sendKeys(domainPolicySearchValue);


        for (var i = 0, len = domainPolicySearchValue.length; i < len; i++) {
            this.domainPolicySearchTextbox.sendKeys(domainPolicySearchValue[i]);
            browser.sleep(100);
        }



        return this.domainPolicySearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = domainPolicySearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(domainPolicySearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.domainPolicySelectGear = function(selectOption){
        this.domainPolicySelectGearIcon.click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


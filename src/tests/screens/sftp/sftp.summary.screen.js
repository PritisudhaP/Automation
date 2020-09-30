module.exports =function(){

    var sftpDefaultGearIconOption = "View";
    var temp = "";

    this.sftpSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.sftpSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.sftpSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    
    this.sftpSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.sftpDeleteUserFromGearIcon = element(by.xpath('//button/span[text()="Delete"]/parent::button'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.sftpSearch = function(criteria, sftpSearchValue){
/*        commons.selectOption(this.sftpSearchCriteriaDropdown,criteria);
        this.sftpSearchTextbox.clear();
//        this.sftpSearchTextbox.sendKeys(sftpSearchValue);

        for (var i = 0, len = sftpSearchValue.length; i < len; i++) {
            this.sftpSearchTextbox.sendKeys(sftpSearchValue[i]);
            browser.sleep(100);
        }


        return this.sftpSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = sftpSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(sftpSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);



    }

    this.sftpSelectGear = function(selectOption){
        this.sftpSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

}


module.exports =function(){

    var webserviceClientsDefaultGearIconOption = "View";
    var temp = "";

    this.webserviceClientsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.webserviceClientsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.webserviceClientsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.webserviceClientsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.webserviceClientsDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    this.webserviceClientSelectRow = element(by.xpath('//div[@class="en-collection-row"]/div[2]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.webserviceClientsSearch = function(criteria, webserviceClientsSearchValue){
/*        commons.selectOption(this.webserviceClientsSearchCriteriaDropdown,criteria);
        this.webserviceClientsSearchTextbox.clear();
//        this.webserviceClientsSearchTextbox.sendKeys(webserviceClientsSearchValue);

        for (var i = 0, len = webserviceClientsSearchValue.length; i < len; i++) {
            this.webserviceClientsSearchTextbox.sendKeys(webserviceClientsSearchValue[i]);
            browser.sleep(100);
        }



        return this.webserviceClientsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = webserviceClientsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(webserviceClientsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.webserviceClientsSelectGear = function(selectOption){
        this.webserviceClientsSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.webserviceClientSelect = function(){
        return this.webserviceClientSelectRow.click();
    }



}


module.exports =function(){

    var webserviceServersDefaultGearIconOption = "View";
    var temp = "";

    this.webserviceServersSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.webserviceServersSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.webserviceServersSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));
    
    this.webserviceServersSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.webserviceServersDeleteFromGearIcon = element(by.xpath('//span/li/button/span[text()="Delete"]/parent::button'));

    this.webserviceServerSelectRow = element(by.xpath('//div[@class="en-collection-row"]/div[2]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.webserviceServersSearch = function(criteria, webserviceServersSearchValue){
/*        commons.selectOption(this.webserviceServersSearchCriteriaDropdown,criteria);
        this.webserviceServersSearchTextbox.clear();
//        this.webserviceServersSearchTextbox.sendKeys(webserviceServersSearchValue);

        for (var i = 0, len = webserviceServersSearchValue.length; i < len; i++) {
            this.webserviceServersSearchTextbox.sendKeys(webserviceServersSearchValue[i]);
            browser.sleep(100);
        }



        return this.webserviceServersSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = webserviceServersSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(webserviceServersSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }

    this.webserviceServersSelectGear = function(selectOption){
        this.webserviceServersSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        element(by.xpath(temp)).click();
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        return element.all(by.xpath(temp)).get(1).click();
    }

    this.webserviceServerSelect = function(){
        return this.webserviceServerSelectRow.click();
    }



}


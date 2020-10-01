module.exports =function(){

    var shipmentRequestDefaultGearIconOption = "Edit";
    var temp = "";

    this.shipmentRequestSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.shipmentRequestSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.shipmentRequestSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));



   // this.shipmentRequestSelectGearIcon = element(by.xpath('(//div[@class="en-collection-row"]/div[2])[1]/en-actions/button'));
   //modified by Priti
   this.shipmentRequestSelectGearIcon = element(by.xpath("(//en-actions/button/en-icon)[3]"));
    this.shipmentRequestEditFromGearIcon = element(by.xpath('//button/span[contains(text(),"Edit")]/parent::button'));

    this.shipmentRequestStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));
    this.shipmentRequestNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[8])[1]'));

//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.shipmentRequestSearch = function(criteria, shipmentRequestSearchValue){
/*        commons.selectOption(this.shipmentRequestSearchCriteriaDropdown,criteria);
        this.shipmentRequestSearchTextbox.clear();
//        this.shipmentRequestSearchTextbox.sendKeys(shipmentRequestSearchValue);


        for (var i = 0, len = shipmentRequestSearchValue.length; i < len; i++) {
            this.shipmentRequestSearchTextbox.sendKeys(shipmentRequestSearchValue[i]);
            browser.sleep(100);
        }


        return this.shipmentRequestSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();
        for (var i = 0, len = shipmentRequestSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(shipmentRequestSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);
    }


    this.shipmentRequestSelectGear = function(selectOption){
        this.shipmentRequestSelectGearIcon.click();
        browser.sleep(3000);
        temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
        if (selectOption == "Delete") {
                element(by.xpath(temp)).click();
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        } else {
            return element(by.xpath(temp)).click();
        }
    }

   this.shipmentRequestStatus = function() {
        return this.shipmentRequestStatusText.getText();
   }

   this.shipmentRequestNumber = function() {
        return this.shipmentRequestNumberText.getText();
   }



}


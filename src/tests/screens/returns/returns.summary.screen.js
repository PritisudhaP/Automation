module.exports =function(){

    var returnsDefaultGearIconOption = "View";
    var temp = "";

    this.returnsSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.returnsSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.returnsSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.returnsSearchCriteriaRemove = element(by.xpath('//button/en-icon[@icon="x-circle"]/parent::button'));
    
    this.returnsSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.returnsReleaseFromGearIcon = element(by.xpath('//button/span[text()="Release"]/parent::button'));

    this.returnsStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));
    this.returnsNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[4])[1]'));


    this.generateRMALabelCheckbox = element(by.xpath('//input[@name="generateLabel"]'));
    this.generateShippingLabelCheckbox = element(by.xpath('//input[@name="generateShippingLabel"]'));


    //var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.returnsSearch = function(criteria, returnsSearchValue){
/*        commons.selectOption(this.returnsSearchCriteriaDropdown,criteria);
        this.returnsSearchTextbox.clear();
//        this.returnsSearchTextbox.sendKeys(returnsSearchValue);

        for (var i = 0, len = returnsSearchValue.length; i < len; i++) {
            this.returnsSearchTextbox.sendKeys(returnsSearchValue[i]);
            browser.sleep(100);
        }

        return this.returnsSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = returnsSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(returnsSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }

    this.returnsSearchRemove = function(count) {
       temp = "(//button/en-icon[@icon='x-circle']/parent::button)[" + count +  "]";
       return element(by.xpath(temp)).click();
    }



    this.returnsSelectGear = function(selectOption){
        var defer = protractor.promise.defer();
        this.returnsSelectGearIcon.click();
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
       
        if (selectOption == "Release") {
            element(by.xpath(temp)).click();
            temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";

            if (this.generateRMALabelCheckbox.isSelected())
            {
                 this.generateRMALabelCheckbox.click();
            }
/*
            if (this.generateShippingLabelCheckbox.isSelected())
            {
                this.generateShippingLabelCheckbox.click();
            }
*/
            element.all(by.xpath(temp)).get(0).click();
            defer.fulfill();
        } else {
            element(by.xpath(temp)).click();
            defer.fulfill();
        }
	return defer.promise;
    }

    this.returnsStatus = function() {
        return this.returnsStatusText.getText();
    }

    this.returnsNumber = function() {
	return this.returnsNumberText.getText();
    }
   

}


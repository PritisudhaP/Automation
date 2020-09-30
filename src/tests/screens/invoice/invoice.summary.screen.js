module.exports =function(){

    var invoiceDefaultGearIconOption = "";
    var temp = "";

    this.invoiceSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));

    this.invoiceSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.invoiceSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));


    
    this.invoiceSelectGearIcon = element(by.xpath('//div[@class="en-collection-row"]/div[2]/en-actions/button'));
    this.invoiceEditFromGearIcon = element(by.xpath('//span/li/button/span[text()="Edit"]/parent::button'));

    this.invoiceStatusText = element(by.xpath('(//div[@class="en-collection-row"]/div[3])[1]'));

    this.invoiceNumberText = element(by.xpath('(//div[@class="en-collection-row"]/div[5])[1]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.invoiceSearch = function(criteria, invoiceSearchValue){
/*        commons.selectOption(this.invoiceSearchCriteriaDropdown,criteria);
        this.invoiceSearchTextbox.clear();
//        this.invoiceSearchTextbox.sendKeys(invoiceSearchValue);


        for (var i = 0, len = invoiceSearchValue.length; i < len; i++) {
            this.invoiceSearchTextbox.sendKeys(invoiceSearchValue[i]);
            browser.sleep(100);
        }


        return this.invoiceSearchButton.click();
*/

        element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = invoiceSearchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(invoiceSearchValue[i]);
            browser.sleep(100);
        }
        element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(protractor.Key.ENTER);

    }


    this.invoiceSelectGear = function(selectOption){
        this.invoiceSelectGearIcon.click();
        browser.sleep(2000);
        temp = "//button/span[text()='" + selectOption + "']/parent::button";
        if (selectOption == "Delete" || selectOption == "Release") {
                element(by.xpath(temp)).click();
                browser.sleep(2000);
                temp = "//button/span[contains(text(),'" + selectOption + "')]/parent::button";
                return element.all(by.xpath(temp)).get(1).click();
        } else {
            return element(by.xpath(temp)).click();
        }
    }

   this.invoiceStatus = function() {
        return this.invoiceStatusText.getText();
   }

   this.getInvoiceNumber = function() {
        return this.invoiceNumberText.getText();
   }

}


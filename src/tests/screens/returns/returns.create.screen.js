module.exports =function(){

    this.blindReturnButton  = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Blind Return")]'));
    this.orderReturnButton  = element(by.xpath('//div[@class="card-split-title"]/h2[contains(text(), "Return from Order")]'));
    
    this.channelDropdown = element(by.xpath('(//select[@name="channel"])[1]'));

    this.customerSearchCriteriaDropdown = element(by.xpath('//select[@name="filter-criteria"]'));
    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchFilter.value"]'));
    this.customerSearchButton = element(by.xpath('//button/en-icon[@icon="search-plus"]'));

    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));

    this.selectFirstSOLink = element(by.xpath('(//div[contains(@ng-repeat,"item in customerSalesCollection.data")])[1]'));
    this.selectFirstItemCheckbox = element(by.xpath('(//div[contains(@en-tap,"saleOrderLineItems")])[1]'));
    this.useSelectedItemButton = element(by.xpath('//button/span[contains(text(), "Use Selected")]/parent::button'));

    this.returnLocationDropdown = element(by.xpath('//select[@name="location"]'));

    this.saveReturnsButton = element(by.xpath('//button/span[contains(text(), "Save")]/parent::button'));

    this.productLookupButton = element(by.xpath('//button/span[contains(text(),"Product Lookup")]/parent::button'));
    this.productNameEntryTextBox = element(by.xpath('//input[@placeholder = "Search Products"]'));
    this.searchButtonModalWindow = element(by.xpath('(//button/en-icon[@icon="search"])[2]'));
    this.selectProductCheckbox = element(by.xpath('//div[@class="en-collection-row"]/div[1]/input[@type="checkbox"]'));
    this.useSelectedProductButton = element(by.xpath('//button/span[contains(text(), "Add Products")]/parent::button'));

    this.creditTypeDropdown = element(by.xpath('//select[@name="creditType"]'));

    this.rmaNumberText = element(by.xpath('//en-title[contains(text(), "Return Merchandise Authorization: ")]'));

//    var common = require(process.cwd() + '/screens/commons.js');
    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.blindReturn = function() {
        return this.blindReturnButton.click();
    }

    this.orderReturn = function() {
        return this.orderReturnButton.click();
    }

    this.channelSelect = function(channel) {
        commons.selectOption(this.channelDropdown,channel);
    }

    this.searchCustomer = function(criteria, searchValue) {
/*        commons.selectOption(this.customerSearchCriteriaDropdown,criteria);
        this.customerSearchTextbox.clear();
//        this.customerSearchTextbox.sendKeys(searchValue);

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }



        return this.customerSearchButton.click();
*/
       element(by.xpath('//input[contains(@class, "adv-search-input")]')).clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            element(by.xpath('//input[contains(@class, "adv-search-input")]')).sendKeys(searchValue[i]);
            browser.sleep(100);
        }

      
   }
   
    this.selectOrder = function() {
        return this.selectFirstSOLink.click();
    }

    this.selectFirstLineItem = function() {
        this.selectFirstItemCheckbox.click();
        return this.useSelectedItemButton.click();
        
    }
 
    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        return this.useSelectedCustomerButton.click();
    }

    this.returnLocationSelect = function(returnLocation) {
        commons.selectOption(this.returnLocationDropdown,returnLocation); 
    }

    this.saveReturns = function() {
        return this.saveReturnsButton.click();
    }
    
    this.productLookup = function() {
        return this.productLookupButton.click();
    }

    this.enterProductName = function(productNameValue) {
        this.productNameEntryTextBox.clear();
        return this.productNameEntryTextBox.sendKeys(productNameValue);
    }


    this.searchModalWindow = function() {
        // return this.searchButtonModalWindow.click();
        $('body').sendKeys(protractor.Key.ENTER);
    }

    this.selectProduct = function() {
        return this.selectProductCheckbox.click();
    }

    this.addProduct = function() {
        return this.useSelectedProductButton.click();
    }

    this.returnReason = function(lineCount, returnReason) {
        temp = "(//select[@name='returnReason'])[" + lineCount + "]";
    //    element(by.xpath(temp)).clear();
        return element(by.xpath(temp)).sendKeys(returnReason);
    }

    this.creditType = function(creditType) {
        commons.selectOption(this.creditTypeDropdown,creditType); 
    }

    this.getRMANumber = function() {
        return this.rmaNumberText.getText();
    }

}


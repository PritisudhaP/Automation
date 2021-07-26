const { element, browser } = require("protractor")


module.exports = function () {

    var searchTextBox = element(by.xpath("//input[@name='simplified-text-value']"));
    var advanceCriteriaPlusIcon = element(by.xpath("//en-icon[@icon='plus']"));
    var b2bCustomerDropdown = element(by.xpath("//span[@class='dropdown-btn']"));
    var searchCustomerTextbox = element(by.model('filter.text'));
    var showDtlbyChannelLabel = element(by.xpath("//span[text()='Show Details By Channel']"));
    var showDtlbyCustomerLabel = element(by.xpath("//span[text()='Show Details By Customer']"));
    var showByChannelRadialBtn = element(by.xpath("//input[@value='byChannel']"));
    var showByCustomerRadialBtn = element(by.xpath("//input[@value='byCustomer']"));
    var selectCheckBox = element(by.xpath("(//input[@type='checkbox'])[2]"));
    var headerPricingvalue = element(by.xpath("//span[contains(text(),'$')]"));
    var detailPricingvalue = element(by.xpath("//div[contains(text(),'$')]"));
    var customerlevelplusIcon = element(by.xpath("//en-icon[@icon='plus-block']"));
    var customerlevelminusIcon = element(by.xpath("//en-icon[@icon='minus-block']"));
    var select1Customer = element(by.xpath("//li//div[@class='ng-binding']"));
    var B2BCustomerSelectbtn = element(by.xpath("//span[text()='Select']"));
    
    

    /**to validate elements on Landing page */
    this.validateLandingpage = function () {
        advanceCriteriaPlusIcon.click();
        expect(b2bCustomerDropdown.isPresent()).toBe(true);
        b2bCustomerDropdown.click();
        expect(searchCustomerTextbox.isPresent()).toBe(true);
        expect(showByChannelRadialBtn.isPresent()).toBe(true);
        expect(showDtlbyChannelLabel.isPresent()).toBe(true);
        expect(showByCustomerRadialBtn.isPresent()).toBe(true);
        expect(showDtlbyCustomerLabel.isPresent()).toBe(true);
    }

    /**method to use search/clear search */
    this.clickonButton = function (button) {
        element(by.xpath("//button[text()='" + button + "']")).click();
    }

    /**Method used for searching Sku */
    this.searchSku = function (sku) {
        searchTextBox.sendKeys(sku);
        searchTextBox.sendKeys(protractor.Key.ENTER);
        browser.sleep(200);
        selectCheckBox.click();
    }

    /**Method used for selecing radial button */
    this.clickonRadialButton = function (btn) {
        if (btn == "byChannel") {
            showDtlbyChannelLabel.click();
        } else if (btn == "byCustomer") {
            showByCustomerRadialBtn.click();
        }
    }

    /**Method used to validate confirm popup message */
    this.validateAlertMessage = function (expectedMsg) {
        element(by.xpath("//en-modal//en-content//div")).getText().then(actualMsg => {
            expect(actualMsg).toEqual(expectedMsg);
        })
    }

    /**Method used to validate header level pricing(Retail price) of sku by channel & by customer*/
    /**Re-used this method for SC 04*/
    this.validateHeaderPricing = function (price,customer) {
        //advanceCriteriaPlusIcon.click();
        //b2bCustomerDropdown.click();
        //element(by.xpath("//li//div[@class='ng-binding']")).click();
        //select1Customer.click();
        this.selectB2BCustomer(customer)
        this.clickonButton("Search");
        headerPricingvalue.getText().then(channelPrice => {
            console.info("Channel Price", channelPrice);
            expect(channelPrice).toEqual(price)
        })
        showByCustomerRadialBtn.click();
        headerPricingvalue.getText().then(customerPrice => {
            console.info("Customer Price", customerPrice);
            expect(customerPrice).toEqual(price)
        })
    }

    /**Method used to validate customer level breakup pricing(catalog price/retail price) of sku */
    /**Re-used this method for SC 04 */
    this.customerLevelPricing = function (catalogPrice,customer) {
        //advanceCriteriaPlusIcon.click();
        //b2bCustomerDropdown.click();
        //element(by.xpath("//li//div[@class='ng-binding']")).click();
        //select1Customer.click();
        this.selectB2BCustomer(customer)
        this.clickonButton("Search");
        showByCustomerRadialBtn.click();
        customerlevelplusIcon.click();
        detailPricingvalue.getText().then(actualPrice => {
            console.info("Actual pricing at customer level:", actualPrice);
            expect(actualPrice).toEqual(catalogPrice);
        })
        customerlevelminusIcon.click();
    }

    /**Apply B2B Customer Filter & Clear search*/
    this.applyFilters = function (button, button2,customer) {
        //advanceCriteriaPlusIcon.click();
        //b2bCustomerDropdown.click();
       // element(by.xpath("//li//div[@class='ng-binding']")).click();
       //select1Customer.click();
       this.selectB2BCustomer(customer)
        this.clickonButton(button);
        showByCustomerRadialBtn.click();
        this.clickonButton(button2);
        expect(B2BCustomerSelectbtn.isDisplayed()).toBe(true);
    }
    /* Apply filter on showByCustomerRadialBtn without SKU Selection OMS-4437 fix */
    this.validateNoAlertMessage = function (customer) {
        //advanceCriteriaPlusIcon.click();
        //b2bCustomerDropdown.click();
        // element(by.xpath("//li//div[@class='ng-binding']")).click();
        //select1Customer.click();
        this.selectB2BCustomer(customer)
        showByCustomerRadialBtn.click();
        expect(element(by.xpath("//en-modal//en-content//div")).isPresent()).toBe(false);
    }

    /*  Method to validate Clear Search work for B2B Customer without SKU selection (OMS-4545) fix */
    this.validateClearFilter = function (button2,customer) {
        //advanceCriteriaPlusIcon.click();
        //b2bCustomerDropdown.click();
        //element(by.xpath("//li//div[@class='ng-binding']")).click();
        //select1Customer.click();
        this.selectB2BCustomer(customer)
        showByCustomerRadialBtn.click();
        this.clickonButton(button2);
        expect(B2BCustomerSelectbtn.isDisplayed()).toBe(true);
    }

    /* Search customer */
    this.selectB2BCustomer = function(customer){
        advanceCriteriaPlusIcon.click();
        b2bCustomerDropdown.click();
        searchCustomerTextbox.sendKeys(customer)
        temp = element(by.xpath("//div[contains(text(),'"+customer+"')]"))
        temp.click();
        searchCustomerTextbox.clear();
    }
}
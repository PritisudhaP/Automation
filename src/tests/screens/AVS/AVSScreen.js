module.exports = function() {

    this.errorMessage = element(by.xpath("//div[@ng-class='alertClasses(message)']//div/span"));
    this.urlErrorMsg = element(by.xpath("//div[@ng-class='wrapperClasses()']//div//span"));
   // this.errorMessage = element(by.xpath("//div[contains(@ng-class,'alertClasses')]//div/span"));
    this.enableAddressVerification = element(by.xpath("//input[@name='verificationEnabled']"));
    this.channelEditIcon = element(by.xpath("(//div[contains(@ng-repeat, 'item in channelCollection.data')]//en-actions/button)[2]"));
    this.channelEditBtn = element(by.xpath("//button//span[contains(text(),'Edit')]"));
    this.selectVerificationProvider = element(by.xpath("//select[@name='addressVerificationProvider']"));
    this.selectCountry = element(by.xpath("//select[@name='countriesToVerify']"));
    this.address2CheckBox = element(by.xpath("//input[@name='excludeAddress2']"));
    this.saveBtn = element(by.xpath("//button[@type='submit']"));
    this.urlTxtBox = element(by.model("shippingProfile.data.experianAccountInfo.urlString"));

    //this.attachCustomerButton = element(by.xpath('//div/en-icon[@icon="customer"]'));
    this.attachCustomerButton = element(by.xpath("//button[@class='button-text en-button']//en-icon"));
    this.customerSearchTextbox = element(by.xpath('//input[@ng-model="apiSearchText.value"]'));

    this.selectCustomerCheckbox = element(by.xpath('(//div[@class="en-collection-row"]/div[1])[1]/input'));
    this.useSelectedCustomerButton = element(by.xpath('//button/span[contains(text(), "Use Selected Customer")]/parent::button'));

    this.createCustomerBtn = element(by.xpath("//button/span[contains(text(),'Create Customer')]"));
    this.customerDisplayName = element(by.model("customer.data.displayName"));
    this.customerNumberBtn = element(by.xpath("//button/en-icon[@icon='key']"));
    this.customerFirstName = element(by.model("customer.data.name.firstName"));
    this.customerLastName = element(by.model("customer.data.name.lastName"));
    this.addAddressIcon = element(by.xpath("(//button[@class='button-primary trim en-button']/en-icon[@icon='plus-circle'])[1]"));
    //this.addressCheckBox = element(by.model("roles[role.value]"));
    this.address1TextBox = element(by.model("address.address1"));
    this.address2TextBox = element(by.model("address.address2"));
    this.addressCityTextBox = element(by.model("address.city"));
    this.stateDropDown = element(by.model("address.state"));
    this.addressZipCode5 = element(by.model("address.zip5"));
    this.addressSaveBtn = element(by.xpath("//button[@type='submit']/span[contains(text(),'Save')]"));
    this.advancedSettingsBtn = element(by.xpath("//en-tab[@pane='alt-info']"));
    this.selectCustomerState = element(by.model("customer.data.state"));
    this.selectCustomerPriority = element(by.model("customer.data.priority"));
    this.submitBtn = element(by.xpath("//button[@type='submit']"));
    this.okBtn = element(by.xpath("//button[@type='submit']//span"));
    this.editShipToAddressIcon = element(by.xpath("//a[contains(@ng-if,'!salesOrder.data.client')]/en-icon"));
    this.shipToAddress1TxtBox = element(by.model("data.contact.address.address1"));
    this.shipToAddress2TxtBox = element(by.model("data.contact.address.address2"));
    this.errorCloseBtn = element(by.xpath("//button[@class='close']"));


    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.addressErrorMessages = function(){
        return this.errorMessage.getText();
    }
   /* this.urlErrorMessage = function(){
        return this.urlErrorMsg.getText();
    }*/
    this.enableChannel = function(){
        this.enableAddressVerification.click();
    }
    this.editChannel = function(){
        this.channelEditIcon.click();
        browser.sleep(3000);
        this.channelEditBtn.click();
    }
    this.verificationProvider = function(providerValue){
        this.selectVerificationProvider.sendKeys(providerValue);
    }
    this.countrySelection = function(countryValue){
        this.selectCountry.sendKeys(countryValue);
    }
    this.excludeAddress2Checkbox = function(){
        this.address2CheckBox.click();
    }
    this.saveButton = function(){
        this.saveBtn.click();
    }
    this.changingURL = function(addressURL){
        this.urlTxtBox.clear();
        browser.sleep(2000);
        this.urlTxtBox.sendKeys(addressURL);
    }
    this.attachCustomer = function() {
        this.attachCustomerButton.click();
    }


    this.searchCustomer = function(criteria, searchValue) {
        this.customerSearchTextbox.clear();

        for (var i = 0, len = searchValue.length; i < len; i++) {
            this.customerSearchTextbox.sendKeys(searchValue[i]);
            browser.sleep(100);
        }

        this.customerSearchTextbox.sendKeys(protractor.Key.ENTER);
    }

    this.selectCustomer = function() {
        return this.selectCustomerCheckbox.click();
    }

    this.useSelectedCustomer = function() {
        return this.useSelectedCustomerButton.click();
    }
    this.createAVSCustomer = function (displayName, firstName, lastName,customerState, customerPriority) {
        this.createCustomerBtn.click();
        browser.sleep(1000);
        this.customerDisplayName.sendKeys(displayName);
        this.customerNumberBtn.click();
        browser.sleep(1000);
        this.customerFirstName.sendKeys(firstName);
        this.customerLastName.sendKeys(lastName);
        browser.sleep(1000);
        this.selectCustomerState.sendKeys(customerState);
        this.selectCustomerPriority.sendKeys(customerPriority);

    }
    this.customerAVSAdvancedSettings = function (address1, city, state, zipcode5) {
        browser.sleep(1000);
        this.advancedSettingsBtn.click();
        browser.sleep(1000);
        this.addAddressIcon.click();
        browser.sleep(1000);
        // this.addressCheckBox.click();
        this.test();
        this.address1TextBox.sendKeys(address1);
        this.addressCityTextBox.sendKeys(city);
        this.stateDropDown.sendKeys(state);
        this.addressZipCode5.sendKeys(zipcode5);

    }
    this.saveAndSubmit = function(){
        this.addressSaveBtn.click();
        browser.sleep(1000);
        this.submitBtn.click();
    }
    this.test = function () {
        var chk = element.all(by.model("roles[role.value]"));
        chk.each(function (elem) {
            elem.click();

            browser.sleep(500);

        });
    }
    this.address2TxtBox = function(address2){
        this.address2TextBox.sendKeys(address2);
    }
    this.okButton = function(){
        this.okBtn.click();
    }
    this.shipToAddressIcon = function(){
        this.editShipToAddressIcon.click();
    }
    this.shipToAdr1TextBox = function(shipToAddress1){
        this.shipToAddress1TxtBox.clear();
        this.shipToAddress1TxtBox.sendKeys(shipToAddress1);
    }
    this.shipToAdr2TextBox = function(shipToAddress2){
        this.shipToAddress2TxtBox.clear();
        this.shipToAddress2TxtBox.sendKeys(shipToAddress2);
    }
    this.errorClose = function(){
        this.errorCloseBtn.click();
    }




}

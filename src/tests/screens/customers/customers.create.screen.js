module.exports =function(){

    this.newCustomerButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.customerDisplayNameEntryTextBox = element(by.xpath('//input[@name="displayName"]'));
    this.customerCompanyNameEntryTextBox = element(by.xpath('//input[@name="companyName"]'));
    this.customerNumberGeneratorButton = element(by.xpath('//button/en-icon[@icon="key"]/parent::button'));
    this.customerNumberTextBox = element(by.xpath('//input[@name="customerId"]'));
    this.customerFirstNameEntryTextBox = element(by.xpath('//input[@name="fname"]'));
    this.customerLastNameEntryTextBox = element(by.xpath('//input[@name="lname"]'));
    this.customerEmailEntryTextBox = element(by.xpath('(//input[@name="email"])[1]'));
    this.phoneEntryTextBox = element(by.xpath('//input[@name="phone"]'));
    this.customerTagsEntryTextBox = element(by.xpath('//div[@class="tags"]/input'));
    this.customerTypeDropdown = element(by.xpath('//select[@name="customerType"]'));
    this.customerStateDropdown = element(by.xpath('//select[@ng-model="customer.data.state"]'));
    this.customerPriorityDropdown = element(by.xpath('//select[@ng-model="customer.data.priority"]'));

    this.trackActivitiesCheckbox = element(by.xpath('//span[contains(text(),"Track activities")]/input'));
    this.trackDepositsCheckbox = element(by.xpath('//span[contains(text(),"Track deposits")]/input'));

    
    this.customerAddressAddButton = element(by.xpath('(//en-header/en-title[text()="0 Addresses"]/parent::en-header/button)[1]'));
    
    this.shippingRoleCheckbox = element(by.xpath('//span[contains(text(),"Shipping")]/input'));
    this.billingRoleCheckbox = element(by.xpath('//span[contains(text(),"Billing")]/input'));
    this.contactCheckbox = element(by.xpath('//span[contains(text(),"Contact")]/input'));
    
    this.countryDropdown = element(by.xpath('//select[@name="country"]'));
    
    this.address1EntryTextBox = element(by.xpath('//input[@name="address1"]'));
    this.cityEntryTextBox = element(by.xpath('//input[@name="city"]'));
    this.stateDropdown = element(by.xpath('//select[@name="state"]'));
    
    this.zipCodeEntryTextBox = element(by.xpath('//input[@name="zip5"]'));
    
    this.saveAddressButton= element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));
    
    this.createcustomerButton = element(by.xpath('(//button/span[contains(text(),"Create Customer")]/parent::button)[2]'));
    var common = require(process.cwd() + '/screens/commons.js');
   // var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newcustomer = function() {
        return this.newCustomerButton.click();
    }

    this.enterCompanyName = function(companyName) {
        return this.customerCompanyNameEntryTextBox.sendKeys(companyName);
    }

    this.enterDisplayName = function(displayName) {
        return this.customerDisplayNameEntryTextBox.sendKeys(displayName);
    }

    this.generateCustomerNumber = function() {
        return this.customerNumberGeneratorButton.click();
    }

    this.enterCustomerNumber = function(number) {
        return this.customerNumberTextBox.sendKeys(number);
    }

    this.enterFirstName = function(firstName) {
        return this.customerFirstNameEntryTextBox.sendKeys(firstName);
    }

    this.enterLastName = function(lastName) {
        return this.customerLastNameEntryTextBox.sendKeys(lastName);
    }
    
    this.enterEmail = function(email) {
        return this.customerEmailEntryTextBox.sendKeys(email);
    }   

    this.enterPhone = function(phone) {
        return this.phoneEntryTextBox.sendKeys(phone);
    }

     this.enterTag = function(tag) {
        return this.customerTagsEntryTextBox.sendKeys(tag);
    }      
    
    this.enterType = function(type) {
        commons.selectOption(this.customerTypeDropdown,type);

    }      

    this.enterCustomerStatus = function(state) {
        commons.selectOption(this.customerStateDropdown,state);
    }   


    this.selectTrackActivities = function() {
        this.trackActivitiesCheckbox.click();
    }

    this.selectTractDeposits = function() {
        this.trackDepositsCheckbox.click();
    }

 
    this.addAddress = function() {
        return this.customerAddressAddButton.click();
    }  
 
    this.selectShippingAddress =  function() {
        return this.shippingRoleCheckbox.click();
    }

    this.selectBillingAddress =  function() {
        return this.billingRoleCheckbox.click();
    }

    this.selectContactAddress =  function() {
        return this.contactCheckbox.click();
    }
 
    this.enterCountry  =  function(country) {
        commons.selectOption(this.countryDropdown,country);
    }

    this.enterAddress1 = function(address1) {
        return this.address1EntryTextBox.sendKeys(address1);
    }      

    this.enterCity = function(city) {
        return this.cityEntryTextBox.sendKeys(city);
    }    
    
    this.enterState = function(state) {
        commons.selectOption(this.stateDropdown,state);
    } 


    this.enterPriority = function(priority) {
        commons.selectOption(this.customerPriorityDropdown,priority);
    }
    
    this.enterZip5 = function(zip5) {
        return this.zipCodeEntryTextBox.sendKeys(zip5);
    }         
    
    this.saveAddress = function() {
        return this.saveAddressButton.click();
    }  
 
    this.createcustomer = function() {
        return this.createcustomerButton.click();
    }

}


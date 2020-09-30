module.exports =function(){

    this.newSFTPUserButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.firstNameEntryTextBox= element(by.xpath('//input[@name="firstName"]'));
    this.lastNameEntryTextBox= element(by.xpath('//input[@name="lastName"]'));

    this.primaryEmailEntryTextBox= element(by.xpath('//input[@name="primaryEmail"]'));
    this.primaryPhoneEntryTextBox= element(by.xpath('//input[@name="primaryPhone"]'));

    this.userIdEntryTextBox= element(by.xpath('//input[@name="userId"]'));
    this.realmEntryTextBox= element(by.xpath('//input[@name="realm"]'));
    this.userProfileRefNameEntryTextBox= element(by.xpath('//input[@name="userProfileRefName"]'));
    this.authenticationTypeDropDown= element(by.xpath('//select[@name="authenticationType"]'));
    this.passwordPhraseEntryTextBox= element(by.xpath('//input[@name="passwordPhrase"]'));
    this.passwordEntryTextBox= element(by.xpath('//input[@name="password"]'));
    this.domainDropDown= element(by.xpath('//select[@name="dataDomainToUserForNewFiles"]'));
    this.rootDirectoryEntryTextBox= element(by.xpath('//input[@name="rootDirectory"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();


    this.newSFTPUser = function() {
        return this.newSFTPUserButton.click();
    }

    this.enterFirstName = function(firstNameValue) {
        return this.firstNameEntryTextBox.sendKeys(firstNameValue);
    }

    this.enterLastName = function(lastName) {
        return this.lastNameEntryTextBox.sendKeys(lastName);
    }
    
    this.enterPrimaryEmail = function(primaryEmail) {
        return this.primaryEmailEntryTextBox.sendKeys(primaryEmail);
    }

    this.enterPrimaryPhone = function(primaryPhone) {
        return this.primaryPhoneEntryTextBox.sendKeys(primaryPhone);
    }    

    this.enterUserId = function(userId) {
        return this.userIdEntryTextBox.sendKeys(userId);
    }    

    this.enterRealm = function(realm) {
        return this.realmEntryTextBox.sendKeys(realm);
    }    

    this.enterUserProfileRefName = function(userProfileRefName) {
        return this.userProfileRefNameEntryTextBox.sendKeys(userProfileRefName);
    }    

    this.enterAuthenticationType = function(authenticationType) {
        commons.selectOption(this.authenticationTypeDropDown,authenticationType);
    } 

    this.enterPasswordPhrase = function(passwordPhrase) {
        return this.passwordPhraseEntryTextBox.sendKeys(passwordPhrase);
    }    

    this.enterPassword = function(password) {
        return this.passwordEntryTextBox.sendKeys(password);
    } 

    this.enterDomain = function(domain) {
        commons.selectOption(this.domainDropDown,domain);
    }    

    this.enterRootDirectory = function(rootDirectory) {
        return this.rootDirectoryEntryTextBox.sendKeys(rootDirectory);
    } 


    this.saveSFTPUser = function() {
        return this.saveButton.click();
    }
 
}


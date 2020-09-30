module.exports =function(){

    this.newusersButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.firstNameEntryTextBox= element(by.xpath('//input[@name="firstName"]'));
    this.lastNameEntryTextBox= element(by.xpath('//input[@name="lastName"]'));
    this.emailEntryTextBox= element(by.xpath('//input[@name="email"]'));
    this.phoneEntryTextBox= element(by.xpath('//input[@name="tel"]'));
    this.selectAdminAvailableGroupOption = element(by.xpath('//select[@name="userGroups"]/option[contains(text(), "Admins")]'));
	this.moveToChosenButton = element(by.xpath('(//button/en-icon[@icon="chevron-right-double"])[1]'));

    this.userIdEntryTextBox= element(by.xpath('//input[@name="userId"]'));
    this.passwordEntryTextBox= element(by.xpath('//input[@name="password"]'));
    this.confirmPasswordEntryTextBox= element(by.xpath('//input[@name="confirmPassword"]'));

    this.createUserButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.newuser = function() {
        return this.newusersButton.click();
    }

    this.enterFirstName = function(firstName) {
        return this.firstNameEntryTextBox.sendKeys(firstName);
    }

    this.enterLastName = function(lastName) {
        return this.lastNameEntryTextBox.sendKeys(lastName);
    }

    this.enterEmail = function(email) {
        return this.emailEntryTextBox.sendKeys(email);
    }


    this.enterPhone = function(phone) {
        return this.phoneEntryTextBox.sendKeys(phone);
    }


    this.selectGroup = function(group) {
        element(by.xpath('//button/span[contains(text(),"Attach")]/parent::button')).click();
        element(by.xpath('//input[@ng-model="search"]')).clear();
        element(by.xpath('//input[@ng-model="search"]')).sendKeys(group);
        element(by.xpath('//input[@ng-model="search"]')).sendKeys(protractor.Key.ENTER);
        element(by.xpath('//div[@class="en-collection-row"]/div/input')).click();
        return element(by.xpath('(//button/span[contains(text(),"Attach")]/parent::button)[2]')).click();
    }

     this.moveSelectedGroups = function() {
        return this.moveToChosenButton.click();
    }

    this.enterUserId = function(userid) {
        return this.userIdEntryTextBox.sendKeys(userid);
    }

    this.enterPassword = function(password) {
        return this.passwordEntryTextBox.sendKeys(password);
    }

    this.enterConfirmPassword = function(confirmPassword) {
        return this.confirmPasswordEntryTextBox.sendKeys(confirmPassword);
    }


    this.createUser = function() {
        return this.createUserButton.click();
    }

}


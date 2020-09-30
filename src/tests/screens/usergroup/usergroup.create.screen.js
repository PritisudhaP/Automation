module.exports =function(){

    this.newusergroupButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.usergroupNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));

    this.selectAdminAvailableRoleOption = element(by.xpath('//select[@name="roles"]/option[contains(text(), "admin:")]'));

    this.moveToChosenButton = element(by.xpath('(//button/en-icon[@icon="chevron-right-double"])[1]'));
    this.createusergroupButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.newusergroup = function() {
        return this.newusergroupButton.click();
    }

    this.enterGroupName = function(groupName) {
        return this.usergroupNameEntryTextBox.sendKeys(groupName);
    }

    this.selectRole = function(role) {

        element(by.xpath('//button/span[contains(text(),"Attach")]/parent::button')).click();
        element(by.xpath('//input[@ng-model="search"]')).clear();
        element(by.xpath('//input[@ng-model="search"]')).sendKeys(role);
        element(by.xpath('//input[@ng-model="search"]')).sendKeys(protractor.Key.ENTER);
        element(by.xpath('//div[@class="en-collection-row"]/div/input')).click();
        return element(by.xpath('(//button/span[contains(text(),"Attach")]/parent::button)[2]')).click();
    }

     this.moveSelectedActions = function() {
        return this.moveToChosenButton.click();
    }

    this.createUserGroup = function() {
        return this.createusergroupButton.click();
    }

}


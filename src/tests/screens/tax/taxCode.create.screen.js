module.exports =function(){

    this.newCodeButton= element(by.xpath('//button/span[contains(text(),"Add Tax Code")]/parent::button'));
    this.nameEntryTextBox= element(by.xpath('//input[@name="name"]'));
    this.descEntryTextBox= element(by.xpath('//textarea[@name="description"]'));
    this.codeEntryTextBox= element(by.xpath('//input[@name="code"]'));

    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.newCode = function() {
        return this.newCodeButton.click();
    }

    this.enterName = function(name) {
        return this.nameEntryTextBox.sendKeys(name);
    }

    this.enterDesc = function(desc) {
        return this.descEntryTextBox.sendKeys(desc);
    }    
    
    this.enterCode = function(code) {
        return this.codeEntryTextBox.sendKeys(code);
    }
    
    this.saveCode = function() {
        return this.saveButton.click();
    }
 
}


module.exports =function(){

    this.newattributeButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.labelTextBox= element(by.xpath('//input[@name="label"]'));
    this.typeDropdown = element(by.xpath('//select[@ng-model="attributeDefinition.data.type"]'));
    this.descTextArea = element(by.xpath('//textarea[@name="description"]'));

    this.saveButton = element(by.xpath('(//button[contains(text(),"Save")])[1]'));

    var common = require(process.cwd() + '/src/tests/screens/commons.js');
    var commons = new common();

    this.newattribute = function() {
        return this.newattributeButton.click();
    }

    this.enterLabel = function(label) {
        return this.labelTextBox.sendKeys(label);
    }

    this.enterType = function(type) {
        return this.typeDropdown.sendKeys(type);
    }

    this.enterDesc = function(desc) {
        return this.descTextArea.sendKeys(desc);
    }

    this.saveattribute = function() {
        return this.saveButton.click();
    }
    
}


module.exports =function(){

    this.newfunctionaldomainsButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.functionaldomainsRefNameEntryTextBox= element(by.xpath('//input[@name="refName"]'));
    this.functionaldomainsDisplayNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.functionaldomainsDataDomainEntryTextBox= element(by.xpath('//input[@name="dataDomain"]'));
    
    this.addFunctionalDomainButton= element(by.xpath('//button/span[contains(text(),"Add")]/parent::button'));

    this.functionaldomainsActionNameEntryTextBox= element(by.xpath('//label[contains(text(), "Action Name")]/../input'));
    this.functionaldomainsWeightEntryTextBox= element(by.xpath('//label[contains(text(), "Display Weight")]/../input'));
    this.saveButton = element(by.xpath('//button/span[contains(text(),"Save")]/parent::button'));

    this.createFunctionalDomainButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.newFunctionalDomain = function() {
        return this.newfunctionaldomainsButton.click();
    }

    this.enterFDRefName = function(value) {
        return this.functionaldomainsRefNameEntryTextBox.sendKeys(value);
    }

    this.enterFDDisplayName = function(value) {
        return this.functionaldomainsDisplayNameEntryTextBox.sendKeys(value);
    }

    this.enterDataDomain = function(dataDomain) {
        return this.functionaldomainsDataDomainEntryTextBox.sendKeys(dataDomain);
    }

    this.addFunctionalDomain = function() {
        return this.addFunctionalDomainButton.click();
    }
 
    this.enterActionName = function(actionName) {
        return this.functionaldomainsActionNameEntryTextBox.sendKeys(actionName);
    }

    this.enterWeight = function(weight) {
        return this.functionaldomainsWeightEntryTextBox.sendKeys(weight);
    } 

    this.saveAction = function() {
        return this.saveButton.click();
    }

    this.createFunctionalDomain = function() {
        return this.createFunctionalDomainButton.click();
    }


}


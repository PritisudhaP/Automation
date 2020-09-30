module.exports =function(){

    this.newCatalogButton= element(by.xpath('//button/span[contains(text(),"New")]/parent::button'));
    this.catalogNameEntryTextBox= element(by.xpath('//input[@name="displayName"]'));
    this.categoryEntryTextBox= element(by.xpath('//input[@name="categoryRefName"]'));
    this.categoryAddButton= element(by.xpath('//button/en-icon[@icon="check-circle"]/parent::button'));


    this.saveButton = element(by.xpath('//button[contains(text(),"Save")]'));

    this.newCatalog = function() {
        return this.newCatalogButton.click();
    }

    this.enterCatalogName = function(catalogName) {
        return this.catalogNameEntryTextBox.sendKeys(catalogName);
    }

    this.enterCategoryName = function(categoryName) {
        return this.categoryEntryTextBox.sendKeys(categoryName);
    }
   
    this.addCategory = function() {
        return this.categoryAddButton.click();
    }

    this.saveCatalog = function() {
        return this.saveButton.click();
    }
}


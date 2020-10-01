module.exports =function(){

    this.productImportConfirmButton = element(by.xpath('//button/span[text()="Import Products"]/parent::button'));
    this.productImportCreateSKUCheckbox = element(by.xpath('//input[@name="createSkuForProduct"]'));
    this.productImportSelectCatalogDropdown = element(by.xpath('//select[@name="catalogName"]'));
    this.productImportEnterCategoryTextbox = element(by.xpath('//input[@name="categoryAttributeName"]'));
    this.productImportSelctFitchburgDC = element(by.xpath('//input[@name="inventoryPoolIds"]/parent::label[contains(text(),"fitchburg-dc")]/input'));
    this.productImportEnterATSTextbox = element(by.xpath('//input[@name="availableQty"]'));
    this.productImportConfirmDialogButton = element(by.xpath('(//button/span[text()="Import Products"]/parent::button)[2]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.productImportConfirm = function() {
        return this.productImportConfirmButton.click();
    }

    this.productImportCreateSKU = function() {
        return this.productImportCreateSKUCheckbox.click();
    }

    this.productImportSelectCatalog = function(catalog) {
        return this.productImportSelectCatalogDropdown.sendKeys(catalog);
    }

    this.productImportEnterCategory = function(category) {
        return this.productImportEnterCategoryTextbox.sendKeys(category);
    }

    this.productImportSelectInventoryPool = function() {
        return this.productImportSelctFitchburgDC.click();
    }

    this.productImportEnterATS = function(ats) {
        return this.productImportEnterATSTextbox.sendKeys(ats);
    }

    this.productImportConfirmDialog = function() {
        return this.productImportConfirmDialogButton.click();
    }

}


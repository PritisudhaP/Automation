module.exports =function(){

    this.customersImportConfirmButton = element(by.xpath('//button/span[text()="Import Customers"]/parent::button'));
    this.customersImportConfirmDialogButton = element(by.xpath('(//button/span[text()="Import Customers"]/parent::button)[2]'));

    var common = require(process.cwd() + '/screens/commons.js');
    var commons = new common();


    this.customersImportConfirm = function() {
        return this.customersImportConfirmButton.click();
    }

    this.customersImportConfirmDialog = function() {
        return this.customersImportConfirmDialogButton.click();
    }

}


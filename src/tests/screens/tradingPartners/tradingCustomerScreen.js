const { element } = require("protractor")

module.exports = function () {

    // Added by shyam for resolving zipcodes story

    this.customerFilter = element(by.model('apiSearchText.value'));
    this.customeredit = element(by.xpath('(//en-icon[@icon="edit"])[1]'));
    this.gear = element(by.xpath('(//en-icon[@icon="more-vertical"])[8]'));
    this.editAddr = element(by.xpath('//span[contains(text(),"Edit Address")]'));
    this.postalCode = element(by.model('address.postalCode'));
    this.save1 = element(by.xpath('//en-icon[@icon="check-circle"]'));
    this.save2 = element(by.xpath('//span[text()="Save"]'));
    this.postalCodeEmpty = element(by.xpath('//span/p[text()="contacts[0].address.postalCode Country is CA, hence postalCode needs to be provided"]'));
    this.postalCodeInvalid = element(by.xpath('//span/p[text()="addresses[0].postalCode Country is CA, however postalCode does not comply with the pattern for CA99995"]'));
    this.salesOrderNew = 'https://project4-qa.enspirecommerce.com/dist/#/call-center/sales/new-1';
    this.customerEdit = element(by.xpath('(//en-icon[@class="xs"])[2]'));
    this.geardots = element(by.xpath('(//en-icon[@icon="more-vertical"])[3]'));
    this.submit = element(by.xpath('//button[@type="submit"]'));
    this.error = element(by.xpath('(//div[@ng-class="alertClasses(message)"])[1]'));
    this.customerName = element(by.xpath('(//span[@class="product-title ng-binding"])[1]'));
    this.save = element(by.xpath('//span[text()="Save"]'));

    this.searchCustomer = function (value) {
        return this.customerFilter.sendKeys(value);
    }

    this.clickonCustomer = function () {
        return this.customerName.click();
    }

    this.customerEdit = function () {
        return this.customeredit.click();
    }

    this.gearforEdit = function () {
        return this.gear.click();
    }

    this.editCustomerAddress = function () {
        return this.editAddr.click();
    }

    this.clearPostalCodes = function () {
        return this.postalCode.clear();
    }

    this.clickSaveOnPopup = function () {
        return this.save1.click();
    }

    this.clickonSave = function () {
        return this.save2.click();
    }

    this.verifyPostalcodeEmptyerror = function () {
        expect(this.postalCodeEmpty.isPresent()).toBe(true);
        this.postalCodeEmpty.getText().then(function (error) {
            console.log("", error);
        })
    }

    this.enterInvalidpostalcode = function (value) {
        this.postalCode.sendKeys(value);
    }

    this.verifyInvalidPostalcodeerror = function () {
        expect(this.postalCodeInvalid.isPresent()).toBe(true);
        this.postalCodeInvalid.getText().then(function (error) {
            console.log("", error);
        })

    }

    this.finalSave = function () {
        return this.submit.click();
    }
}
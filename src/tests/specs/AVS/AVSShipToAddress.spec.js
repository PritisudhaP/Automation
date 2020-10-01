var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var AVSScreen = require(process.cwd() + '/screens/AVS/AVSScreen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('AVS Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var addressVerification = new AVSScreen();

    it('AVS flow TC001', function () {

        //>>>>>>>>Address verification changing with 'EXPERIAN' in settings >>>>>>>>
        browser.get(addressVerificationUrl);
        browser.sleep(2000);
        addressVerification.editChannel();
        browser.sleep(2000);
        addressVerification.enableChannel();
        browser.sleep(1000);
        addressVerification.verificationProvider(browser.params.addressVerificationProvider);
        addressVerification.countrySelection(browser.params.Country);
        browser.sleep(500);
        addressVerification.excludeAddress2Checkbox();
        browser.sleep(1000);
        addressVerification.changingURL(browser.params.incorrectAddressURL);
        browser.sleep(1000);
        addressVerification.saveButton();

        //>>>>>>AVS customer with wrong city information>>>>>>>>>
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName7, browser.params.custFirstName, browser.params.custLastName7, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress4, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName7);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The URL address is not proper");
        });

        browser.get(customersUrl);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName7);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

        //>>>>>>Revert address verification changes in settings tab >>>>>>>>
        browser.sleep(3000);
        browser.get(addressVerificationUrl);
        browser.sleep(2000);
        addressVerification.editChannel();
        browser.sleep(2000);
        addressVerification.changingURL(browser.params.correctAddressURL);
        browser.sleep(1000);
        addressVerification.saveButton();
        browser.sleep(2000);
        addressVerification.editChannel();
        browser.sleep(2000);
        addressVerification.enableChannel();
        browser.sleep(3000);
        addressVerification.saveButton();

    })
})

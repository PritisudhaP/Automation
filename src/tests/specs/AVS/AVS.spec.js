var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var AVSScreen = require(process.cwd() + '/src/tests/screens/AVS/AVSScreen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');


global.errorMsg = "";

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
        addressVerification.saveButton();
    })

    it('AVS flow TC002', function () {

        //>>>>>>AVS customer without building number>>>>>>>>>
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName1, browser.params.custFirstName, browser.params.custLastName1, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress1, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName1);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your building number");
        });
        addressVerification.errorClose();
        browser.sleep(500);
        addressVerification.errorClose();
        browser.sleep(2000);
        addressVerification.shipToAddressIcon();
        browser.sleep(2000);
        addressVerification.shipToAdr1TextBox(browser.params.custAddress1);
        browser.sleep(500);
        addressVerification.okButton();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your building number");
        });
        browser.sleep(3000);
        browser.get(customersUrl);
        browser.sleep(2000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName1);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

        //>>>>>>>>>AVS customer  without APT/site  number>>>>>>>>>>
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName2, browser.params.custFirstName, browser.params.custLastName2, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress2, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName2);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your Apt/Ste/Unit Number");
        });
        addressVerification.errorClose();
        browser.sleep(500);
        addressVerification.errorClose();
        browser.sleep(2000);
        addressVerification.shipToAddressIcon();
        browser.sleep(2000);
        addressVerification.shipToAdr1TextBox(browser.params.custAddress2);
        browser.sleep(500);
        addressVerification.okButton();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your Apt/Ste/Unit Number");
        });
        browser.sleep(3000);
        browser.get(customersUrl);
        browser.sleep(2000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName2);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

        //>>>>>>>>>AVS customer without city >>>>>>>>>>>>>>>
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName3, browser.params.custFirstName, browser.params.custLastName3, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress3, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName3);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("No Matches,Please Provide the Proper Details");
        });
        addressVerification.errorClose();
        browser.sleep(500);
        addressVerification.errorClose();
        browser.sleep(2000);
        addressVerification.shipToAddressIcon();
        browser.sleep(2000);
        addressVerification.shipToAdr1TextBox(browser.params.custAddress3);
        browser.sleep(500);
        addressVerification.okButton();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("No Matches,Please Provide the Proper Details");
        });
        browser.sleep(3000);
        browser.get(customersUrl);
        browser.sleep(2000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName3);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

        //>>>>>>>>>AVS customer with all valid details
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName4, browser.params.custFirstName, browser.params.custLastName4, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress4, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName4);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.okButton();
        browser.sleep(3000);
        browser.get(customersUrl);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName4);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

        //>>>>>>AVS customer with wrong city information>>>>>>>>>
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName5, browser.params.custFirstName, browser.params.custLastName5, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress5, browser.params.custCity1, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName5);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("Please verify City information");
        });
        addressVerification.errorClose();
        browser.sleep(500);
        addressVerification.errorClose();
        browser.sleep(2000);
        addressVerification.shipToAddressIcon();
        browser.sleep(2000);
        addressVerification.shipToAdr1TextBox(browser.params.custAddress5);
        browser.sleep(500);
        addressVerification.okButton();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("Please verify City information");
        });
        browser.sleep(3000);
        browser.get(customersUrl);
        browser.sleep(2000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName5);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

    })
    //>>>>>>>>>>>>Address verificatoin by unchecking "Exclude Address line2 checkbox"

    it('AVS flow TC003', function () {

        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.createAVSCustomer(browser.params.custAVSDisplayName6, browser.params.custFirstName, browser.params.custLastName6, "ACTIVE", "2");
        browser.sleep(1000);
        addressVerification.customerAVSAdvancedSettings(browser.params.custAddress2, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5);
        browser.sleep(1000);
        addressVerification.address2TxtBox(browser.params.custAddress6);
        browser.sleep(1000);
        addressVerification.saveAndSubmit();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName6);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your Apt/Ste/Unit Number");
        });
        addressVerification.errorClose();
        browser.sleep(500);
        addressVerification.errorClose();
        browser.sleep(2000);
        addressVerification.shipToAddressIcon();
        browser.sleep(2000);
        addressVerification.shipToAdr2TextBox(browser.params.custAddress6);
        browser.sleep(500);
        addressVerification.okButton();
        browser.sleep(3000);
        addressVerification.addressErrorMessages().then(function (value) {
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The Verification Fails Please confirm your Apt/Ste/Unit Number");
        });
        browser.get(addressVerificationUrl);
        browser.sleep(2000);
        addressVerification.editChannel();
        browser.sleep(2000);
        addressVerification.excludeAddress2Checkbox();
        browser.sleep(1000);
        addressVerification.saveButton();
        browser.sleep(5000);
        browser.get(salesOrderNewUrl);
        browser.sleep(3000);
        addressVerification.attachCustomer();
        browser.sleep(2000);
        addressVerification.searchCustomer(browser.params.customerCriteria, browser.params.custAVSDisplayName6);
        browser.sleep(3000);
        addressVerification.selectCustomer();
        browser.sleep(2000);
        addressVerification.useSelectedCustomer();
        browser.sleep(2000);
        addressVerification.okButton();
        browser.get(customersUrl);
        browser.sleep(2000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custAVSDisplayName6);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");

    })

    //>>>>>>>>>>>>>Address verification with incorrect Address URl >>>>>>>>>>
    it('AVS flow TC004', function () {


        browser.get(addressVerificationUrl);
        browser.sleep(2000);
        addressVerification.editChannel();
       /* browser.sleep(2000);
        addressVerification.enableChannel();*/
        browser.sleep(3000);
        /*addressVerification.verificationProvider(browser.params.addressVerificationProvider);
        addressVerification.countrySelection(browser.params.Country);
        browser.sleep(500);
        addressVerification.excludeAddress2Checkbox();
        browser.sleep(1000);*/
        addressVerification.changingURL(browser.params.incorrectAddressURL);
        browser.sleep(1000);
        addressVerification.saveButton();
        //>>>>>>AVS customer with wrong URL information>>>>>>>>>
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
            browser.sleep(2000);
            errorMsg = value;
            console.log(errorMsg);
            expect(errorMsg).toContain("The URL address is not proper");
        });

        browser.get(customersUrl);
        browser.sleep(2000);
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

    })
    it('AVS flow TC005', function () {

        //>>>>>>Revert address verification changes in settings tab >>>>>>>>
        browser.sleep(3000);
        browser.get(addressVerificationUrl);
        browser.sleep(2000);
        addressVerification.editChannel();
        browser.sleep(2000);
        addressVerification.enableChannel();
        browser.sleep(3000);
        addressVerification.saveButton();

    })
})

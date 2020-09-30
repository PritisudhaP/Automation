
var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var customersImportScreen = require(process.cwd() + '/src/tests/screens/customers/customers.import.screen.js');
var importResultsSummaryScreen = require(process.cwd() + '/src/tests/screens/importResults/importResults.summary.screen.js');

var orgSummaryScreen = require(process.cwd() + '/src/tests/screens/org/org.summary.screen.js');
var contactsSummaryScreen = require(process.cwd() + '/src/tests/screens/contacts/contacts.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Import Customer: ', function(){
    var commons = new common();
    var customersSummary = new customersSummaryScreen();
    var customersImport = new customersImportScreen();
    var importResultsSummary = new importResultsSummaryScreen();
    var orgSummary = new orgSummaryScreen();
    var contactsSummary = new contactsSummaryScreen();

    it('Import Customer - TC0001', function(){

        browser.get(customersUrl);

        console.log("navigating to customers screen");
        commons.importUpload();
        commons.selecteFileForImport();

        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/PSSC_CustomerImport.csv";
        commons.clickSelectFile(fullPath);
  
        commons.uploadSelectedFile();

        browser.driver.sleep(5000);
        browser.get(importResultsUrl);

        browser.driver.sleep(5000);

        importResultsSummary.importResultsSearch("Name","Customer Import");
        browser.driver.sleep(5000);
        importResultsSummary.importResultsSelectGear("Edit");

        browser.driver.sleep(5000);

        expect(commons.importResultsGetSuccessCount()).toEqual('1');
 
        customersImport.customersImportConfirm();
        customersImport.customersImportConfirmDialog();
        browser.driver.sleep(5000);
        browser.refresh();
        expect(commons.importResultsGetSuccessCount()).toEqual('1');
        expect(commons.importResultsGetErrorCount()).toEqual('0');
/*
        browser.get(customersUrl);
        browser.sleep(2000);
        commons.multiselect();
        browser.sleep(2000);
        customersSummary.customersSearch("First Name","1313131313");
        browser.sleep(5000);
        customersSummary.customersSelectGear("Delete");

        browser.get(orgUrl);
        orgSummary.orgSearch("Name","Sarath13Company");
        browser.sleep(2000);
        orgSummary.orgSelectGear("Delete");

        browser.get(contactsUrl);
        contactsSummary.contactsSearch("First Name","Sarath13");
        browser.sleep(2000);
        contactsSummary.contactsSelectGear("Delete");
*/

    });


})

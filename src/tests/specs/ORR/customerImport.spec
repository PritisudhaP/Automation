var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Customer Import  : ', function(){
    var files = new filesScreen();
    var route = new routeScreen();
    var commons = new common();
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();

        it('Create customer through import  - TC0001', function(){

            browser.get(filesUrl);
            browser.sleep(5000);
            
            files.select("inbound");
            files.select("canonical");
            files.select("customer");
            
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/ORR_CustomerImport.xml";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();
            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(5000);
            commons.searchWithCriteria("Name","contains","Customer-syncCustomers");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop"); 
            browser.sleep(5000);
            
            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            commons.searchWithCriteria("Customer #","is","1-Sarath-TC0001");
            browser.sleep(2000);
  
            customersSummary.customersSelectGear("Edit");
            browser.sleep(2000);
            customerEdit.editCustomerRecord();
            expect(customerEdit.shipOrderLineCompleteFlag()).toEqual('flagSelected');
            expect(customerEdit.shipOrderCompleteFlag()).toEqual('flagSelected');
            expect(customerEdit.willCallPickFlag()).toEqual('flagSelected');
            expect(customerEdit.localDeliveryFlag()).toEqual('flagSelected');
           
        });

        it('Delete imported customer - TC0002', function(){

            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer #","is","1-Sarath-TC0001")
            browser.sleep(5000);
            customersSummary.customersSelectGear("Delete");

        });


})

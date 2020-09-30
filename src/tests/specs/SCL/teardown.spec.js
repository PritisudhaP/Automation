var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Tear Down : ', function(){
    var loginScreen = new loginPage();
    var commons = new common();
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();


        it('Delete customer - TC0001', function(){

            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
//           commons.searchWithCriteria("Customer Contact First Name","contains","TC0001")
            browser.sleep(3000);
  //          customersSummary.customersSelectGear("Delete");
              browser.sleep(3000);

            browser.get(customersUrl);
            commons.multiselect();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Contact First Name","contains","TC0001")
                          browser.sleep(3000);

            expect(commons.noResult()).toMatch('No results found.');


            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Contact First Name","contains","FNAME01")
            browser.sleep(5000);
            customersSummary.customersSelectGear("Delete");
                          browser.sleep(3000);

             browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Contact First Name","contains","FNAME01")
            browser.sleep(5000);
            expect(commons.noResult()).toMatch('No results found.');
                          browser.sleep(3000);


            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Contact First Name","contains","DFNAME01")
            browser.sleep(5000);
            customersSummary.customersSelectGear("Delete");
                          browser.sleep(3000);

            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();
            browser.sleep(2000);
           commons.searchWithCriteria("Customer Contact First Name","contains","DFNAME01")
           browser.sleep(5000);
           expect(commons.noResult()).toMatch('No results found.');
                         browser.sleep(3000);



        });

        it('Logout - TC0001', function(){
            loginScreen.logout();
        });


})

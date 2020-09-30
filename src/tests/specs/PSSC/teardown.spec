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
            customersSummary.customersSearch("First Name","TC0001");
            browser.sleep(5000);
            customersSummary.customersSelectGear("Delete");
            expect(true).toBe(true);

        });

        it('Logout - TC0001', function(){
            loginScreen.logout();
            expect(true).toBe(true);
        });


})

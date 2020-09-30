var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Setup  : ', function(){
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var loginScreen = new loginPage();
    var commons = new common();
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();


        it('Login - TC0000', function() {

            browser.get(browser.baseUrl);
            browser.driver.manage().window().maximize();


            loginScreen.setUsername(browser.params.login.loginUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);
            expect(true).toBe(true);
            
        });        



})

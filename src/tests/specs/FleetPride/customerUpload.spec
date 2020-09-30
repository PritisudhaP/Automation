var fileScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Customer upload Flow  : ', function(){
    var files = new fileScreen();
     var loginScreen = new loginPage();
         var route = new routeScreen();
         var customersSummary = new customersSummaryScreen();

    var commons = new common();

      it('Customer upload to FP - TC0001', function(){

       browser.get(browser.baseUrl);
         loginScreen.setUsername(browser.params.login.userPDC);
         loginScreen.setPassword(browser.params.login.passwordPDC);
         loginScreen.login();
         browser.sleep(5000);
        browser.get(customerfileuploadurl);
         files.addFile();
         browser.sleep(4000);
         var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/FP_SingleCustomer.json";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();
        browser.sleep(2000);
        loginScreen.logout();
        browser.get(browser.baseUrl);
        loginScreen.setUsername(browser.params.login.userFPP);
        loginScreen.setPassword(browser.params.login.passwordFPP);
        loginScreen.login();
         browser.sleep(5000);
        browser.get(routeUrl);
        browser.sleep(2000);

         commons.searchWithCriteria("Name","contains","Customer-syncCustomersFP");
         browser.sleep(2000);
         route.routeSelectButton("Start");
         browser.sleep(5000);
         route.routeSelectButton("Stop");
         browser.sleep(2000);






        //login script delete after done----

     /*   browser.get(browser.baseUrl);
                loginScreen.setUsername(browser.params.login.userFPP);
                loginScreen.setPassword(browser.params.login.passwordFPP);
                loginScreen.login();
                 browser.sleep(5000);
*/

         // end of login

        browser.get(customerUrl);
        browser.sleep(2000);
        customersSummary.customersSearch("Name","PritiAutomation1");
        browser.sleep(2000);
        customersSummary.customersSelectGear("Edit");
        browser.sleep(5000);
        commons.expandIntegrationInfo();
       expect(commons.getTextOfDomain('com.fp')).toEqual('com.fp');
       expect(commons.getTextOfDomain('com.fleetpride')).toEqual('com.fleetpride');
                        browser.sleep(2000);

       browser.get(customerUrl);
               browser.sleep(2000);
               customersSummary.customersSearch("Name","PritiAutomation1");
               browser.sleep(2000);
               customersSummary.customersSelectGear("Delete");
               browser.sleep(3000);



      });



})


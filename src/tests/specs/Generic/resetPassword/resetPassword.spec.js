var customersSummaryScreen = require(process.cwd() + '/screens/customers/customers.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');




describe('Reset Password Flow  : ', function(){
           var customersSummary = new customersSummaryScreen();
           var commons = new common();

it('Reset Password -TC0001', function(){

       browser.get(customersUrl);
       console.log("navigating to customers screen");
       commons.multiselect();
       browser.sleep(2000);
       commons.searchWithCriteria("Customer Number","is",browser.params.customerNumber);
       browser.sleep(3000);
       customersSummary.customersSelectGear("Reset Password");
        browser.sleep(1000);
      //  console.log("message is "+customersSummary.messageResetPassword());
      expect(customersSummary.messageResetPassword()).toMatch('password reset sucessfully');
});



})


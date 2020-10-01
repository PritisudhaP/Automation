var customersCreateScreen = require(process.cwd() + '/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/screens/customers/customers.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Customers creation Flow  : ', function(){
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();
    var commons = new common();

        it('Create a customer successfully - TC0001', function(){

            browser.get(customersUrl);

            console.log("navigating to customers screen");
            commons.new();
            browser.driver.sleep(5000);
            customersCreate.enterCompanyName("SarathCN_TC0001");
            customersCreate.enterDisplayName("TC0001 Sarath");
            customersCreate.generateCustomerNumber();
            customersCreate.enterFirstName("TC0001");
            customersCreate.enterLastName("Sarath");
            customersCreate.enterEmail("sarathtc0001@test.com");
            customersCreate.enterPhone("12345678900");
            customersCreate.enterTag("B2C");
            customersCreate.enterType("Individual");
            customersCreate.enterCustomerStatus("ACTIVE");
            customersCreate.addAddress();
            customersCreate.selectShippingAddress();
            customersCreate.selectBillingAddress();
            customersCreate.selectContactAddress();
            customersCreate.enterCountry("United States");
            customersCreate.enterAddress1("1st Street");
            customersCreate.enterCity("San Diego");
            customersCreate.enterState("CA");
            customersCreate.enterZip5("92010");
            customersCreate.saveAddress();
            browser.sleep(2000);
            customersCreate.createcustomer();
            browser.sleep(2000);
            browser.get(customersUrl);
            customersSummary.customersSearch("First Name","SarathTC0001");
            browser.sleep(2000);
            customersSummary.customersSelectGear("Delete");

        });
/*
      it('Search and Delete Customers successfully - TC0002', function(){
            browser.get(customersUrl);
            customersSummary.customersSearch("First Name","SarathTC0001");
            browser.sleep(2000);
            customersSummary.customersSelectGear("Delete");
        });
*/
})

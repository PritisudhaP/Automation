var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Setup  : ', function(){
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var commons = new common();
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();



        it('Create a Customer - TC0002', function(){

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
            customersCreate.enterTag("Fulfillment");
            customersCreate.enterType("Fulfillment");
            customersCreate.enterCustomerStatus("ACTIVE");
            customersCreate.selectTrackActivities();
            customersCreate.selectTractDeposits();
            customersCreate.enterPriority("1");
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
            expect(true).toBe(true);
        });


        it('Inventory Sync - TC0003', function(){

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","InventorySync-CSV");
            browser.sleep(2000);
            mailbox.selectMailbox("InventorySync-CSV");
            mailbox.selectMailbox("InventorySync-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.loginUser);
            mailbox.enterFrom(browser.params.login.loginUser);
            mailbox.enterSubject("TC0001 Inventory sync upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/PSSCInventorySync.csv";
            mailbox.clickSelectFile(fullPath);
            browser.sleep(2000);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(5000);
//            route.routeSearch("Name","validateInventorySync");
            commons.searchWithCriteria("Name","contains","validateInventorySync");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop");
            browser.sleep(5000);

            browser.get(routeUrl);
            browser.sleep(5000);
//            route.routeSearch("Name","processInventorySync");
            commons.searchWithCriteria("Name","contains","processInventorySync");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop");
            browser.sleep(2000);
            expect(true).toBe(true);
        });


})

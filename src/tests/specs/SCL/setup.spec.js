var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Setup  : ', function(){
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuSummary = new skuSummaryScreen();
    var commons = new common();
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();

        it('Create 1 product with multiple SKUs - TC0000', function(){
            browser.get(productUrl);
            browser.sleep(5000);
            productCreate.newProduct();
            productCreate.enterDisplayName("sarathP1");
            productCreate.enterTitle("sarathP1");
            productCreate.enterIdType("SKU");
            productCreate.enterId("sarathP1");
            productCreate.selectOrg(browser.params.orgName);
            productCreate.enterUOM("inches");
            productCreate.enterHeight("1.5");
            productCreate.enterLength("2.5");
            productCreate.enterWidth("3");
            productCreate.uncheckAutocreateSku();
            productCreate.saveProduct();



            browser.sleep(2000);

            console.log("navigating to sku screen");
            browser.get(skuUrl);
            browser.sleep(5000);
            skuCreate.newSku();
            skuCreate.enterDisplayName("sarathP1");
            skuCreate.enterTitle("sarathP1");
            skuCreate.enterProduct("sarathP1");
            skuCreate.enterId("sarathP1");
            skuCreate.enterUOM("inches");
            skuCreate.enterHeight("1.5");
            skuCreate.enterLength("2.5");
            skuCreate.enterWidth("3");
            skuCreate.saveSku();
            browser.sleep(2000);
            skuCreate.selectCatalog();
            skuCreate.attachCatalog();
            skuCreate.enterCatalogId(browser.params.catalog);
            skuCreate.enterCategoryName(browser.params.catalogCategoryName);
            skuCreate.enterBasePrice("39.99");
            skuCreate.enterMSRP("40.99");
            skuCreate.savePopup();
            skuCreate.saveSku();
            browser.sleep(2000);

            console.log("navigating to sku screen");
            browser.get(skuUrl);
            browser.sleep(5000);
            skuCreate.newSku();
            skuCreate.enterDisplayName("sarathP2");
            skuCreate.enterTitle("sarathP2");
            skuCreate.enterProduct("sarathP1");
            skuCreate.enterId("sarathP2");
            skuCreate.enterUOM("inches");
            skuCreate.enterHeight("1.5");
            skuCreate.enterLength("2.5");
            skuCreate.enterWidth("3");
            skuCreate.saveSku();
            browser.sleep(2000);
            skuCreate.selectCatalog();
            skuCreate.attachCatalog();
            skuCreate.enterCatalogId(browser.params.catalog);
            skuCreate.enterCategoryName(browser.params.catalogCategoryName);
            skuCreate.enterBasePrice("39.99");
            skuCreate.enterMSRP("40.99");
            skuCreate.savePopup();
            skuCreate.saveSku();
            browser.sleep(2000);


        });


       it('Inventory Sync - TC0001', function(){

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

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 Inventory sync upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/src/tests/autoFiles/SCLInventorySync.csv";
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
//            route.routeSearch("Name","processInventorySync");
            browser.get(routeUrl);
            browser.sleep(5000);
            commons.searchWithCriteria("Name","contains","processInventorySync");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop");
            browser.sleep(2000);

        });

        it('Create a Customer - TC0002', function(){

            browser.get(customersUrl);

            console.log("navigating to customers screen");
            commons.new();
            browser.driver.sleep(5000);
            customersCreate.enterCompanyName("SarathCN_TC0001");
            customersCreate.enterDisplayName("TC0001 Sarath");
            customersCreate.enterCustomerNumber("SarathCN_TC0001");
            customersCreate.enterFirstName("TC0001");
            customersCreate.enterLastName("Sarath");
            customersCreate.enterEmail("sarathtc0001@test.com");
           // customersCreate.enterPhone("12345678900");
           customersCreate.enterPhone("978-555-1212");
            customersCreate.enterTag("B2C");
            customersCreate.enterType("Individual");
            customersCreate.enterTag("B2B");
            customersCreate.enterCustomerStatus("ACTIVE");
            customersCreate.enterPriority("1");
            customersCreate.addAddress();
            customersCreate.selectShippingAddress();
            customersCreate.selectBillingAddress();
            customersCreate.selectContactAddress();
            customersCreate.enterCountry("United States");
            customersCreate.enterAddress1("1st street");
            customersCreate.enterCity("San Diego");
            customersCreate.enterState("CA");
            customersCreate.enterZip5("92130");
            customersCreate.saveAddress();
            browser.sleep(2000);
            customersCreate.createcustomer();
            browser.sleep(5000);

        });

        it('Create a Customer - TC0002b', function(){

            browser.get(customersUrl);

            console.log("navigating to customers screen");
            commons.new();
            browser.driver.sleep(5000);
            customersCreate.enterCompanyName("FName01 LName01");
            customersCreate.enterDisplayName("FName01 LName01");
            customersCreate.enterCustomerNumber("FName01LName01");
            customersCreate.enterFirstName("FName01");
            customersCreate.enterLastName("LName01");
            customersCreate.enterEmail("fname01@lname01.com");
           // customersCreate.enterPhone("12345678990");
           customersCreate.enterPhone("978-555-1213")

            customersCreate.enterTag("B2C");
            customersCreate.enterType("Individual");
            customersCreate.enterTag("B2B");
            customersCreate.enterCustomerStatus("ACTIVE");
            customersCreate.enterPriority("1");
            customersCreate.addAddress();
            customersCreate.selectShippingAddress();
            customersCreate.selectBillingAddress();
            customersCreate.selectContactAddress();
            customersCreate.enterCountry("United States");
            customersCreate.enterAddress1("1st street");
            customersCreate.enterCity("San Diego");
            customersCreate.enterState("CA");
            customersCreate.enterZip5("92130");
            customersCreate.saveAddress();
            browser.sleep(2000);
            customersCreate.createcustomer();
            browser.sleep(5000);

        });


        it('Create a Customer - TC0002c', function(){

            browser.get(customersUrl);

            console.log("navigating to customers screen");
            commons.new();
            browser.driver.sleep(5000);
            customersCreate.enterCompanyName("DFName01 LName01");
            customersCreate.enterDisplayName("DFName01 LName01");
            customersCreate.enterCustomerNumber("DFName01LName01");
            customersCreate.enterFirstName("DFName01");
            customersCreate.enterLastName("LName01");
            customersCreate.enterEmail("fname01@lname01.com");
           // customersCreate.enterPhone("12345678990");
           customersCreate.enterPhone("978-555-1214")
            customersCreate.enterTag("B2C");
            customersCreate.enterType("Individual");
            customersCreate.enterTag("B2B");
            customersCreate.enterCustomerStatus("ACTIVE");
            customersCreate.enterPriority("1");
            customersCreate.addAddress();
            customersCreate.selectShippingAddress();
            customersCreate.selectBillingAddress();
            customersCreate.selectContactAddress();
            customersCreate.enterCountry("United States");
            customersCreate.enterAddress1("1st street");
            customersCreate.enterCity("San Diego");
            customersCreate.enterState("CA");
            customersCreate.enterZip5("92130");
            customersCreate.saveAddress();
            browser.sleep(2000);
            customersCreate.createcustomer();
            browser.sleep(5000);

        });


})

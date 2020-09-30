var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');


describe('Setup  : ', function(){
    var loginScreen = new loginPage();
    var commons = new common();
    var files = new filesScreen();
    var mailbox = new mailboxScreen();


    it('Login - Setup0001', function() {

        browser.get(browser.baseUrl);
        browser.driver.manage().window().maximize();


        loginScreen.setUsername(browser.params.login.user);
        loginScreen.setPassword(browser.params.login.password);
//        loginScreen.setPassword("Enspire2017!");
        loginScreen.login();
        browser.sleep(5000);

            
    });        


    it('Setup Vendor, Product, Product Cost - Setup0002', function() {

            browser.get(filesUrl);
            browser.sleep(2000);
            
            files.select("integration");
            files.select("vendorSetup");
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/vendorSetup1.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();

            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","MasterVendor-CSV");
            mailbox.selectMailbox("MasterVendor-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Vendor upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/vendorSetup2.txt";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();

            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","MasterProduct-CSV");
            mailbox.selectMailbox("MasterProduct-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Product upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/productMaster.csv";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();


            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ProductCost-CSV");
            mailbox.selectMailbox("ProductCost-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Product Cost upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/productCost.txt";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(180000);
    }); 

})

const { browser } = require("protractor");


var loginPage = require(process.cwd() + '/screens/login/login.screen.js');
var exchangeDocumentScreen = require(process.cwd() + '/screens/dataManagement/exchangeDocuments.screen.js');
var traceScreen = require(process.cwd() + '/screens/dataManagement/trace.screen.js');
var filesScreen = require(process.cwd() + '/screens/dataManagement/files.screen.js');
var routeSummaryScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var mailboxesScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');

var FilesUrl = filesUrl.replace("project0", "project4");
var RouteUrl = routeUrl.replace("project0", "project4");
var MailboxUrl = mailboxUrl.replace("project0", "project4");
 


describe("Transmission Trace", function () {

    var exchangeDocument = new exchangeDocumentScreen();
    var loginScreen = new loginPage();
    var ExchangeDocumentURL = exchangeDocumentURL.replace("project0", "project4");
    var trace = new traceScreen();
    var files = new filesScreen();
    var loginScreen = new loginPage();
    var routeSummary = new routeSummaryScreen();
    var mailboxes = new mailboxesScreen()

    it('Upload 850 & 997 document', function () {
        browser.get(FilesUrl);
        loginScreen.setUsername(browser.params.login.user);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        files.dataSetup();
        files.filterText("manual-routing-edi-in");
        browser.sleep(2000);
        files.clickOnfile();
        files.uploadFile("850");
        browser.get(RouteUrl);
        routeSummary.filter("ManualUpload-EDI-Routing");
        browser.sleep(4000);
        routeSummary.routeSelectButton("Start");
        browser.get(FilesUrl);
        files.filterText("manual-routing-edi-in");
        browser.sleep(2000);
        files.clickOnfile();
        files.uploadFile("997");
        browser.get(RouteUrl);
        routeSummary.filter("ManualUpload-EDI-Routing");
        browser.sleep(4000);
        routeSummary.routeSelectButton("Start");
    })

    it('upload 810 document', function () {
        browser.get(MailboxUrl);
        mailboxes.selectMailboxType("intermediateboxes");
        browser.sleep(2000);
        mailboxes.searchMailbox("EDI-out");
        browser.sleep(2000);
        mailboxes.ClickOn("New Message");
        mailboxes.enterFrom("admin@thk.com");
        mailboxes.enterTo("admin@thk.com");
        mailboxes.enterSubject("810 Document");
        files.uploadFile("810");
        browser.get(RouteUrl);
        routeSummary.filter("EDI-Out");
        browser.sleep(2000);
        routeSummary.routeSelectButton("Start");
    })

    it('SC 1:Validate Functional Acknowledgement field: Yes', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.validateAckStatus("Yes");
    })
    it('SC 2:Validate Functional Acknowledgement field: No', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("997");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("997");
        exchangeDocument.clickOnTrace();
        trace.validateAckStatus("No");
    })

    it('SC 3:Validate 997 hyperlink in 850 document', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.clickOnExpandAll();
        trace.validate997link();
    })

    it('SC 4:Provide a linkage between transmission trace and transmission activity', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.clickOnExpandAll();
        trace.validateTransmissionIdLink();
    })

    it('SC 5:Provide a linkage between transmission trace and mailbox', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("810");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("810");
        exchangeDocument.clickOnTrace();
        trace.clickOnExpandAll();
        trace.validateMailentryLink();
    })

    it('SC 6:By default, all the section will show collapsed on the page', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.validateCollapse();
        browser.sleep(5000);
    })

    it('SC 7:Validate EXPAND ALL', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.clickOnExpandAll();
        trace.validateExpandAll();
    })

    it('SC 8:validate COLLAPSE ALL', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.validateCollapseALL();
    })

    it('SC 9:Validate SHOW ALERTS:OFF button', function () {
        browser.get(ExchangeDocumentURL);
        browser.sleep(2000);
        exchangeDocument.selectDocType("850");
        exchangeDocument.acknowledgementStatus("Accepted");
        exchangeDocument.search();
        exchangeDocument.clickOnDocument("850");
        exchangeDocument.clickOnTrace();
        trace.validateAlertOff();
    })
})
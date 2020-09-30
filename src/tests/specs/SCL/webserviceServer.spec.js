var webserviceServerCreateScreen = require(process.cwd() + '/src/tests/screens/webservice/webserviceServer.create.screen.js');
var webserviceServerSummaryScreen = require(process.cwd() + '/src/tests/screens/webservice/webserviceServer.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Webservice Server CRUD   : ', function(){
    var webserviceServerCreate = new webserviceServerCreateScreen();
    var webserviceServerSummary = new webserviceServerSummaryScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

        it('Webservice Server CRUD - TC0001', function(){

            browser.get(mailboxUrl);

            console.log("navigating to mailbox screen");

            browser.sleep(2000);
            mailbox.newmailbox();
            browser.sleep(2000);
            mailbox.enterMailboxName("wstc0001");
            mailbox.enterMailboxRefName("wstc0001");
            mailbox.enterMailboxType("INTERMEDIATE");
            mailbox.pinMailbox();
            mailbox.createMailbox();
            browser.sleep(2000);
            
            browser.get(webserviceServerUrl);
            console.log("navigating to WebserviceServer  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            webserviceServerCreate.enterConfigName("TC0001");
            webserviceServerCreate.enterFromEmail(browser.params.login.user);
            webserviceServerCreate.enterToEmail(browser.params.login.user);
            webserviceServerCreate.selectMailbox("wstc0001");
            webserviceServerCreate.selectSecurityType("OAuth2");
            webserviceServerCreate.selectUser(browser.params.login.user);
            webserviceServerCreate.enterSuccessResponse("Success");
            webserviceServerCreate.enterFailureResponse("Failure");
            webserviceServerCreate.savewebserviceServer();
            browser.sleep(2000);

            browser.get(webserviceServerUrl); 
            commons.searchWithCriteria("Name","contains","TC0001");           
            commons.multiselect();
            webserviceServerSummary.webserviceServersSelectGear("Delete");

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","wstc0001");
            browser.sleep(2000);
            mailbox.mailboxEdit();
            browser.sleep(2000);
            mailbox.mailboxDelete("wstc0001");
            browser.sleep(2000);
            
             
        });
        
})


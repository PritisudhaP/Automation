var webserviceClientCreateScreen = require(process.cwd() + '/src/tests/screens/webservice/webserviceClient.create.screen.js');
var webserviceClientSummaryScreen = require(process.cwd() + '/src/tests/screens/webservice/webserviceClient.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Webservice Client CRUD   : ', function(){
    var webserviceClientCreate = new webserviceClientCreateScreen();
    var webserviceClientSummary = new webserviceClientSummaryScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

        it('Webservice Client CRUD - TC0001', function(){

            browser.get(mailboxUrl);

            console.log("navigating to mailbox screen");

            browser.sleep(2000);
            mailbox.newmailbox();
            browser.sleep(2000);
            mailbox.enterMailboxName("wsclienttc0001");
            mailbox.enterMailboxRefName("wsclienttc0001");
            mailbox.enterMailboxType("INTERMEDIATE");
            mailbox.pinMailbox();
            mailbox.createMailbox();
            browser.sleep(2000);
            
            browser.get(webserviceClientUrl);
            console.log("navigating to WebserviceClient  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            webserviceClientCreate.enterConfigName("TC0001");
            webserviceClientCreate.enterUrl("http://www.test.com");
            webserviceClientCreate.selectType("REST with JSON body");
            webserviceClientCreate.selectMethod("POST");
            webserviceClientCreate.selectResponseHandling("Send to Mailbox");
            webserviceClientCreate.selectMailbox("wsclienttc0001");
            webserviceClientCreate.enterToEmail(browser.params.login.user);
            webserviceClientCreate.enterFromEmail(browser.params.login.user);
            webserviceClientCreate.savewebserviceClient();
            browser.sleep(2000);

            browser.get(webserviceClientUrl); 
            commons.searchWithCriteria("Name","contains","TC0001");           
            commons.multiselect();
            webserviceClientSummary.webserviceClientsSelectGear("Delete");

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","wsclienttc0001");
            browser.sleep(2000);
            mailbox.mailboxEdit();
            browser.sleep(2000);
            mailbox.mailboxDelete("wsclienttc0001");
            browser.sleep(2000);
            
             
        });
        
})


var webhooksCreateScreen = require(process.cwd() + '/src/tests/screens/webhooks/webhooks.create.screen.js');
var webhooksSummaryScreen = require(process.cwd() + '/src/tests/screens/webhooks/webhooks.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Webhooks functional Flow  : ', function(){
    var webhooksCreate = new webhooksCreateScreen();
    var webhooksSummary = new webhooksSummaryScreen();
    var commons = new common();

    it('CRUD for Webhooks  - TC0001', function(){
             
        browser.get(webhooksUrl);

        console.log("navigating to webhooks screen"); 
        browser.sleep(2000);           
        webhooksCreate.newWebhooks();
        webhooksCreate.selectEvent("Task:Delete");
        webhooksCreate.selectDatadomain(browser.params.dataDomain);
        webhooksCreate.selectFormat("JSON");
        webhooksCreate.enterUrl("http://www.test.com");
        webhooksCreate.selectMethod("POST");
        webhooksCreate.enterRetryCount("2"); 
        webhooksCreate.enterRetryTime("100000");
        webhooksCreate.enableFailover();
        webhooksCreate.enableWebhook();
        webhooksCreate.enterFailoverUrl("http://www.test.com");
        webhooksCreate.selectFailoverMethod("POST");
        //new mandatory fileds - FAILURE MAILBOX NAME, MESSAGE SUBJECT, Message contents
        //Author- Pritisudha 03/09/2018

      
        
        webhooksCreate.enterFailureMailBoxName("testing");
        webhooksCreate.enterMessageSubject("Regarding task delete");
        webhooksCreate.enterMessageContent("testing task delete");
     
        webhooksCreate.saveWebhooks();
     
        
        browser.get(webhooksUrl);
        browser.sleep(2000);
        commons.multiselect();
        webhooksSummary.webhooksSearch("Display Name","Task");
        webhooksSummary.webhooksSearch("Display Name","JSON");
        browser.sleep(2000);
        webhooksSummary.webhooksSelectGear("Delete");
        
    });
      
     
})

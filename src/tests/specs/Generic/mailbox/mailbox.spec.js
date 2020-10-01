var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Mailbox Bulk move of entries  : ', function(){
    var mailbox = new mailboxScreen();
    var commons = new common();

    it('Mailbox bulk move of entries - TC0001', function(){
             
        browser.get(mailboxUrl);

        console.log("navigating to mailbox screen"); 
         
        browser.sleep(2000); 
        mailbox.newmailbox();
        browser.sleep(2000);
        mailbox.enterMailboxName("mailboxsourcetc0001");
        mailbox.enterMailboxRefName("mailboxsourcetc0001");
        mailbox.enterMailboxType("INTERMEDIATE");
        mailbox.pinMailbox();
        mailbox.createMailbox();
        
        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");

        mailbox.refresh();

        browser.getCurrentUrl().then(function (url) {
            var currentUrl = url;
            var newMsgUrl = url + "new-message";
            browser.get(newMsgUrl);

        });

        mailbox.enterTo(browser.params.login.user);
        mailbox.enterFrom(browser.params.login.user);
        mailbox.enterSubject("Test0001");
        mailbox.addAttachment();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        mailbox.clickSelectFile(fullPath);
        mailbox.uploadFile();
        mailbox.close();
        
 
        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");

        mailbox.refresh();

        browser.getCurrentUrl().then(function (url) {
            var currentUrl = url;
            var newMsgUrl = url + "new-message";
            browser.get(newMsgUrl);

        });

        mailbox.enterTo(browser.params.login.user);
        mailbox.enterFrom(browser.params.login.user);
        mailbox.enterSubject("Test0002");
        mailbox.addAttachment();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP2.csv";
        mailbox.clickSelectFile(fullPath);
        mailbox.uploadFile();
        mailbox.close();       

        browser.sleep(2000); 
        browser.get(mailboxUrl);
        mailbox.newmailbox();
        mailbox.enterMailboxName("mailboxdesttc0001");
        mailbox.enterMailboxRefName("mailboxdesttc0001");
        mailbox.enterMailboxType("INTERMEDIATE");
        mailbox.pinMailbox();
        mailbox.createMailbox(); 
        browser.sleep(2000); 

        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");
        mailbox.selectMailbox("mailboxsourcetc0001");

        mailbox.multiselectMsgs();
        mailbox.multiSelectGear("Move Selected","mailboxdesttc0001");
        
        browser.sleep(10000); 

        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxdesttc0001");
        mailbox.selectMailbox("mailboxdesttc0001");
        mailbox.selectMailbox("mailboxdesttc0001");
       

        mailbox.msgSelectGear("Edit");
        mailbox.fileView();
        expect(mailbox.fileContentOnScreen()).toMatch('refName,realmRefName,userId,password,passwordPhrase');
        mailbox.back();
        mailbox.msgSelectGear("Delete");
        
        mailbox.refresh();
        mailbox.msgSelectGear("Edit");
        mailbox.fileView();
        expect(mailbox.fileContentOnScreen()).toMatch('refName,realmRefName,userId,password,passwordPhrase');
        mailbox.back();
        mailbox.msgSelectGear("Delete");
        
        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxsourcetc0001");
        browser.sleep(2000);
        mailbox.mailboxEdit();
        browser.sleep(2000);
        mailbox.mailboxDelete("mailboxsourcetc0001");

        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","mailboxdesttc0001");
        browser.sleep(2000);
        mailbox.mailboxEdit();
        browser.sleep(2000);
        mailbox.mailboxDelete("mailboxdesttc0001");
                
        
    });


})

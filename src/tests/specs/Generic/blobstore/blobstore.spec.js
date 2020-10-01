var blobstoreCreateScreen = require(process.cwd() + '/screens/blobstore/blobstore.create.screen.js');
var blobstoreSummaryScreen = require(process.cwd() + '/screens/blobstore/blobstore.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Blobstore functional Flow  : ', function(){
    var blobstoreCreate = new blobstoreCreateScreen();
    var blobstoreSummary = new blobstoreSummaryScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

    it('CRUD for AWS Blobstore  - TC0001', function(){
        browser.get(blobstoreUrl);

        console.log("navigating to blobstore screen"); 
           
        blobstoreCreate.newBlobstore();
        blobstoreCreate.enterBlobstoreName("SarathAWSBlobstoreTC0001");
        blobstoreCreate.enterBlobstoreProvider("AWS_S3");
        blobstoreCreate.enterBlobstoreContainerName("SarathContainerNameTC0001");
        blobstoreCreate.enterBlobstoreAccessKey("AKIAJ5DBHH6ZLN6L6MWA");
        blobstoreCreate.enterBlobstoreSecretAccessKey("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");                        
        blobstoreCreate.saveBlobstore();
        browser.get(blobstoreUrl);
        commons.multiselect();
        blobstoreSummary.blobstoreSearch("Container Name","SarathContainerNameTC0001");
        browser.sleep(2000);
        blobstoreSummary.blobstoreSelectGear("Delete");
        
    });

    it('CRUD for Filesystem Blobstore  - TC0002', function(){
             
        browser.get(blobstoreUrl);

        console.log("navigating to blobstore screen"); 
           
        blobstoreCreate.newBlobstore();
        blobstoreCreate.enterBlobstoreName("SarathFSBlobstoreTC0002");
        blobstoreCreate.enterBlobstoreProvider("JCLOUDS_FS");
        blobstoreCreate.enterBlobstoreContainerName("SarathContainerNameTC0002");
        blobstoreCreate.saveBlobstore();
        browser.sleep(2000);        
        browser.get(blobstoreUrl);
        commons.multiselect();
        blobstoreSummary.blobstoreSearch("Data store provider","JCLOUDS_FS");
        browser.sleep(2000);
        blobstoreSummary.blobstoreSelectGear("Delete");
        
    }); 
      
    it('Functional flow - Upload/Download msg to Filesystem blobstore - TC0003', function(){
        browser.get(blobstoreUrl);
        
        blobstoreCreate.newBlobstore();
        blobstoreCreate.enterBlobstoreName("SarathFSBlobstoreTC0003");
        blobstoreCreate.enterBlobstoreProvider("JCLOUDS_FS");
        blobstoreCreate.enterBlobstoreContainerName("SarathContainerNameTC0003");
        blobstoreCreate.saveBlobstore();

        browser.get(mailboxUrl);
        mailbox.newmailbox();
            mailbox.enterMailboxName("SarathMailboxTC0003");
        mailbox.enterMailboxRefName("sarathmailboxtc0003");
        mailbox.enterMailboxType("INTERMEDIATE");
        mailbox.pinMailbox();
        mailbox.enterMailboxBlobStoreAccessor("sarathfsblobstoretc0003");
        mailbox.createMailbox();
        
        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","SarathMailboxTC0003");       
        mailbox.selectMailbox("sarathmailboxtc0003");
        mailbox.selectMailbox("sarathmailboxtc0003");

        mailbox.refresh();
  
        browser.getCurrentUrl().then(function (url) {
            var currentUrl = url;
            var newMsgUrl = url + "new-message";
            browser.get(newMsgUrl);

    	});           
        
        mailbox.enterTo(browser.params.login.user);
        mailbox.enterFrom(browser.params.login.user);
        mailbox.enterSubject("Test0003");
        mailbox.addAttachment();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        mailbox.clickSelectFile(fullPath);
        mailbox.uploadFile();
        mailbox.close();
 
        browser.get(mailboxUrl);
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","sarathmailboxtc0003");
        mailbox.selectMailbox("sarathmailboxtc0003"); 
        mailbox.selectMailbox("sarathmailboxtc0003");
        mailbox.refresh()          
        
        mailbox.msgSelectGear("Edit");
        mailbox.fileView();
        browser.sleep(2000);
        expect(mailbox.fileContentOnScreen()).toMatch('refName,realmRefName,userId,password,passwordPhrase');

        var fsdownloadedFile = require('fs');
        var downloadedFile = "./tempFiles/GhurkaSampleSFTP.csv";

        if (fsdownloadedFile.existsSync(downloadedFile)) {
                // Make sure the browser doesn't have to rename the download
               fsdownloadedFile.unlinkSync(downloadedFile);
        }


/*        
        mailbox.fileDownload();

        browser.driver.wait(function() {
            return fsdownloadedFile.existsSync(downloadedFile);
        }, 30000).then(function() {
                        expect(fsdownloadedFile.readFileSync(downloadedFile, { encoding: 'utf8' })).toMatch('refName,realmRefName,userId,password,passwordPhrase');
        });

*/
       
        browser.get(blobstoreUrl);
        browser.get(mailboxUrl);       
        mailbox.selectMailboxType("intermediateboxes");
        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","sarathmailboxtc0003");
        browser.sleep(2000);
        mailbox.mailboxEdit();
        browser.sleep(2000);
        mailbox.mailboxDelete("sarathmailboxtc0003");

        browser.get(blobstoreUrl);
        commons.multiselect();
        blobstoreSummary.blobstoreSearch("Container Name","SarathContainerNameTC0003");
        browser.sleep(2000);
        blobstoreSummary.blobstoreSelectGear("Delete");
    });      
})

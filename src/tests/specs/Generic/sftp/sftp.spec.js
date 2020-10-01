var sftpUserCreateScreen = require(process.cwd() + '/screens/sftp/sftp.create.screen.js');
var sftpUserSummaryScreen = require(process.cwd() + '/screens/sftp/sftp.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('SFTP User creation Flow  : ', function(){
    var sftpUserCreate = new sftpUserCreateScreen();
    var sftpUserSummary = new sftpUserSummaryScreen();
    var commons = new common();
   
    it('Create SFTP user successfully - TC0001', function(){
             
        browser.get(sftpUrl);

        console.log("navigating to sftp screen"); 
        browser.sleep(2000);
        commons.refresh();
        sftpUserCreate.newSFTPUser();
        sftpUserCreate.enterFirstName("Sarath");
        sftpUserCreate.enterLastName("Babu");
        sftpUserCreate.enterPrimaryEmail("sbabu@test.com");
        sftpUserCreate.enterPrimaryPhone("111-111-1111");
        sftpUserCreate.enterUserId("sarathtc0001");
        sftpUserCreate.enterRealm(browser.params.dataDomain);
        sftpUserCreate.enterUserProfileRefName(browser.params.login.user);
        sftpUserCreate.enterAuthenticationType("Password");
//        sftpUserCreate.enterPasswordPhrase("enspire");
        sftpUserCreate.enterPassword("password123");
        sftpUserCreate.enterDomain(browser.params.dataDomain);
        sftpUserCreate.enterRootDirectory("/sftp/sarath2");
        sftpUserCreate.saveSFTPUser();
    });

      
    it('Search and Delete SFTP user successfully - TC0002', function(){
        browser.get(sftpUrl);
        browser.sleep(2000);
        commons.multiselect();
        sftpUserSummary.sftpSearch("Name","sarathtc0001");
        browser.sleep(2000);
        sftpUserSummary.sftpSelectGear("Delete");
    });      

})

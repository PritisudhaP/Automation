var communicationsCreateScreen = require(process.cwd() + '/screens/communications/communications.create.screen.js');
var communicationsSummaryScreen = require(process.cwd() + '/screens/communications/communications.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Communications Config CRUD operations  : ', function(){
    var communicationsCreate = new communicationsCreateScreen();
    var communicationsSummary = new communicationsSummaryScreen();
    var commons = new common();
   
    it('Create communications config successfully - TC0001', function(){
             
        browser.get(communicationsUrl);

        console.log("navigating to communications screen"); 
        browser.sleep(2000);   
        communicationsCreate.newCommunications();
        communicationsCreate.enterName("communications_TC0001");
        communicationsCreate.enterDesc("Test communications config");
        communicationsCreate.enterProtocol("SFTP");
        communicationsCreate.enterUserName("testing");
        communicationsCreate.enterPassword("testing123");
        communicationsCreate.connectionActive("Y");
        communicationsCreate.enterHost("localhost");
        communicationsCreate.enterPort("2299");
        communicationsCreate.enterInDir("in");
        communicationsCreate.enterOutDir("out");
        communicationsCreate.enterLocalInDir("/localIn");
        communicationsCreate.enterLocalOutDir("/localOut");
        communicationsCreate.saveCommunications();
    });

      
    it('Search and Delete communications config successfully - TC0002', function(){
        browser.get(communicationsUrl);
        browser.sleep(2000);
        commons.multiselect();
        communicationsSummary.communicationsSearch("Out Directory","out");
        browser.sleep(2000);
        communicationsSummary.communicationsSelectGear("Delete");
    });      

})

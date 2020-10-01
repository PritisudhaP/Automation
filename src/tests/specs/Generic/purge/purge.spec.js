var triggerCreateScreen = require(process.cwd() + '/screens/trigger/trigger.create.screen.js');
var triggerSummaryScreen = require(process.cwd() + '/screens/trigger/trigger.summary.screen.js');
var purgeCreateScreen = require(process.cwd() + '/screens/purge/purge.create.screen.js');
var purgeSummaryScreen = require(process.cwd() + '/screens/purge/purge.summary.screen.js');
var filesScreen = require(process.cwd() + '/screens/files/files.screen.js');

var common = require(process.cwd() + '/screens/commons.js');

describe('Purge functional flow : ', function(){
    var files = new filesScreen();
    var triggerCreate = new triggerCreateScreen();
    var purgeCreate = new purgeCreateScreen();
    var triggerSummary = new triggerSummaryScreen();
    var purgeSummary = new purgeSummaryScreen();
    var commons = new common();

    it('Create Trigger, Purge policies and check for Filesystem MOVE operation - TC0001', function(){

        browser.get(filesUrl);
        browser.sleep(5000);
        files.addDirectory();
        files.enterDirectoryName("SarathPurgeSource");
        files.createDirectory();
        browser.sleep(2000);
        //files.refreshScreen();
        browser.sleep(5000);
        files.addDirectory();
        files.enterDirectoryName("SarathPurgeDest");
        files.createDirectory();
        browser.sleep(2000);
        //files.refreshScreen();
        browser.sleep(5000);
        files.select("SarathPurgeSource");
        files.addFile();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();


        browser.get(triggerUrl);

 	commons.new();
 	triggerCreate.setDisplayName("Sarath_TC0001_RunEvery21Sec");
 	triggerCreate.step1Nxt();
 	triggerCreate.setNotBeforeTime('0000a');
 	triggerCreate.setSimpleTrigger();
 	triggerCreate.step2Nxt();
	triggerCreate.setTriggerIntervalValue("21");
	triggerCreate.setTriggerIntervalUnit("SECONDS");
        browser.sleep(2000);
	triggerCreate.step3Nxt();
        browser.sleep(2000);
        triggerCreate.step4Nxt();
        browser.sleep(2000);
	triggerCreate.step5Save();
 	browser.sleep(3000);
 	browser.get(purgeUrl);
 	browser.sleep(2000);
 	commons.new();
	purgeCreate.setDisplayName("Sarath_TC0001_MainPolicy");
	purgeCreate.setRetentionTimePeriod(1);
	purgeCreate.setRetentionTimePeriodScale("MINUTES");
	purgeCreate.setTrigger("Sarath_TC0001_RunEvery15Sec");
        purgeCreate.setRunAsUser(browser.params.login.user);
	purgeCreate.addAssociation();
        browser.sleep(2000);
	purgeCreate.setDataSourceType("FILESYSTEM");
        browser.sleep(2000);
	purgeCreate.selectSourceFileLocation("SarathPurgeSource");
	purgeCreate.selectDestFileLocation("SarathPurgeDest");
        browser.sleep(2000);
        purgeCreate.saveAssociation();
        purgeCreate.create();

	browser.sleep(60000);
        browser.get(filesUrl);
        browser.sleep(60000);
        files.select("SarathPurgeDest");
        files.select("GhurkaSampleSFTP.csv");

        browser.sleep(5000);
   	browser.get(purgeUrl);
        commons.multiselect();
        purgeSummary.purgeSearch("Name","Sarath_TC0001_MainPolicy");
        browser.sleep(2000);
        purgeSummary.purgeSelectGear("Delete");

        browser.get(triggerUrl);
        commons.multiselect();
        triggerSummary.triggerSearch("Name","Sarath_TC0001_RunEvery21Sec");
        browser.sleep(2000);
        triggerSummary.triggerSelectGear("Delete");

        browser.get(filesUrl);
        files.filesSelect("SarathPurgeSource");
        files.filesSelect("SarathPurgeDest");
        files.mainGearSelect("Delete","");

        browser.sleep(10000);
        expect(files.alertValue()).toEqual('The file(s) have been successfully deleted!');
        browser.ignoreSynchronization = false;
        browser.get(filesUrl);

    });

});

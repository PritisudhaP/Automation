var jobsCreateScreen = require(process.cwd() + '/screens/jobs/jobs.create.screen.js');
var jobsSummaryScreen = require(process.cwd() + '/screens/jobs/jobs.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Jobs functional Flow  : ', function(){
    var jobsCreate = new jobsCreateScreen();
    var jobsSummary = new jobsSummaryScreen();
    var commons = new common();

    it('CRUD for Jobs  - TC0001', function(){
             
        browser.get(jobsDefinitionUrl);

        console.log("navigating to jobs screen"); 
        browser.sleep(2000);           
        jobsCreate.newJobs();
        jobsCreate.enterJobName("TC0001");
        jobsCreate.enterJobDesc("Test job");
        jobsCreate.nextScreen("1");
        jobsCreate.selectType("Advanced");
        jobsCreate.enterJobDef("<xml>test");
        jobsCreate.nextScreen("2");
        jobsCreate.nextScreen("4");
        jobsCreate.saveJobs();
       
        
        browser.get(jobsDefinitionUrl);
        browser.sleep(2000);
        commons.multiselect();
        jobsSummary.jobsSearch("Name","TC0001");
        browser.sleep(2000);
        jobsSummary.jobsSelectGear("Delete");
        
    });
      
     
})

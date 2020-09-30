var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var itemManagementSummaryScreen = require(process.cwd() + '/src/tests/screens/itemManagement/itemManagement.summary.screen.js'); 

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Lead time update flow : ', function(){
    var loginScreen = new loginPage();
    var files = new filesScreen();
    var itemManagementSummary = new itemManagementSummaryScreen();
    var commons = new common();

       it(' Lead time update  for a Vendor - E2E0004', function(){


            browser.get(filesUrl);
            browser.sleep(2000);

            files.select("petsmart");
            files.select("item-leadtime-updates");
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/leadTimeUpdate.txt";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();

            browser.sleep(120000);

            browser.get(itemManagementUrl);
            commons.multiselect();
            
            itemManagementSummary.itemManagementSearch("SKU","SarathTC0001_SarathTC0001");
            browser.sleep(2000);
            itemManagementSummary.itemLeadTime().then(function(value) {
                expect(value.trim()).toMatch('305 HOURS');
            });
            
            itemManagementSummary.itemManagementSearch("SKU","SarathTC0002_SarathTC0001");
            browser.sleep(2000);
            itemManagementSummary.itemLeadTime().then(function(value) {
                expect(value.trim()).toMatch('305 DAYS');
            });
  
        }); 
})

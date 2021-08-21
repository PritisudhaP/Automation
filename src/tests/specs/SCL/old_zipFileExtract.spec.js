var filesScreen = require(process.cwd() + '/screens/files/files.screen.js');
var routeScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.count="";


describe('Zipfile Extraction flow  : ', function(){
    var files = new filesScreen();
    var commons = new common();
    var route = new routeScreen();

    it('zip file extraction and deletion  - TC0001', function(){

       browser.get(filesUrl);
       console.log("navigating to files screen");
       browser.sleep(2000);
       files.select("zipfiles");
       files.addFile();
       browser.sleep(4000);
       var cwd = process.cwd();
       var fullPath = cwd + "/autoFiles/test.zip";
       files.clickSelectFile(fullPath);
       files.uploadFile();
       files.close();
       files.addFile();
         browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","testSUP227");
        browser.sleep(2000);
        route.routeSelectButton("Start");
        browser.sleep(5000);
        route.routeSelectButton("Stop");
        browser.sleep(2000);
        browser.get(filesUrl);
        console.log("navigating to files screen");
        browser.sleep(2000);
        files.select("unZipFile");
         browser.sleep(2000);
         expect(files.getName('sarath/priti.py')).toMatch('sarath/priti.py');
         expect(files.getName('sarath/zipInfoInsert.js')).toMatch('sarath/zipInfoInsert.js');

         expect(files.countFromFolder()).toEqual('2 results');
         files.clickCheckBox();
         files.mainGearSelect("Delete","");
          browser.sleep(2000);



     /*  files.countFromFolder().then(function(value){
        count = value;
         });

        browser.wait(function() {
              return count != '';
              }).then(function() {
              console.log("count is "+count);
              count = count.replace(/#/g,"results"," ");
              console.log("value after replace "+count);
              count= count.trim();
              console.log("value after trim "+count);
              expect(count).toEqual('2');
              }); */

    });





    })

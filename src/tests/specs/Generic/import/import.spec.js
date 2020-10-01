var importUploadScreen = require(process.cwd() + '/screens/import/import.upload.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Import Flow  : ', function(){
    var importUpload = new importUploadScreen();
    var commons = new common();

        it('Import a dummy file successfully - TC0001', function(){
             
            browser.get(importUrl);

            console.log("navigating to import screen"); 
            browser.sleep(4000);           
            importUpload.enterDomain(browser.params.dataDomain);
            importUpload.enterServiceName("sFTPServerUserService");
            importUpload.enterClassName("com.eis.b2bmb.api.v1.model.SFTPServerUser");
            importUpload.updateObjects("Y");
	    var cwd = process.cwd();
	    var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
            importUpload.clickSelectFile(fullPath);
            importUpload.uploadFile();
            browser.sleep(10000);
        });

})

var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Create directory, Upload file, Copy, Move, rename - Flows  : ', function(){
    var files = new filesScreen();
    var commons = new common();

    it('Create a directory, upload few files and delete directory successfully - TC0001', function(){

        browser.get(filesUrl);

        console.log("navigating to files screen");

        browser.sleep(2000);
        files.addDirectory();
        files.enterDirectoryName("SarathTC0001");
        files.createDirectory();
        browser.sleep(4000);
        files.refreshScreen();
        files.select("SarathTC0001");
        files.addFile();
        browser.sleep(4000);
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();
        files.addFile();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP2.csv";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();
        browser.get(filesUrl);
        browser.sleep(4000);
        files.refreshScreen();
        browser.sleep(4000);
        files.filesGearSelect("SarathTC0001","Delete");
        browser.sleep(4000);
    });


    it('Rename a directory, upload few files and delete directory successfully - TC0002', function(){

        browser.get(filesUrl);

        console.log("navigating to files screen");

        files.addDirectory();
        files.enterDirectoryName("SarathTC0002");
        files.createDirectory();
        browser.sleep(4000);
        files.select("SarathTC0002");
        files.addFile();
        browser.sleep(4000);
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();

        browser.get(filesUrl);
        browser.sleep(4000);
        files.filesGearSelect("SarathTC0002","Rename","SarathTC0002_new");
        browser.sleep(4000);
        files.select("SarathTC0002_new");
        files.addFile();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP2.csv";
        browser.sleep(4000);
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();
        browser.sleep(4000);
        browser.get(filesUrl);
        files.filesGearSelect("SarathTC0002_new","Delete");
        browser.sleep(4000);
    });


    it('Move a directory successfully - TC0003', function(){

        browser.get(filesUrl);

        console.log("navigating to files screen");

        files.addDirectory();
        files.enterDirectoryName("SarathTC0003_Source");
        files.createDirectory();
        browser.sleep(4000);
        files.refreshScreen();
        files.select("SarathTC0003_Source");
        files.addFile();
        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
        files.clickSelectFile(fullPath);
        files.uploadFile();
        files.close();

        browser.get(filesUrl);

        files.addDirectory();
        files.enterDirectoryName("SarathTC0003_Dest");
        files.createDirectory();
        browser.sleep(5000);
        files.filesGearSelect("SarathTC0003_Source","Move","SarathTC0003_Dest");
        browser.sleep(5000);

        files.select("SarathTC0003_Dest");
        files.select("SarathTC0003_Source");
        files.select("GhurkaSampleSFTP.csv");

        browser.get(filesUrl);
        files.refreshScreen();
        browser.sleep(4000);
        files.filesGearSelect("SarathTC0003_Dest","Delete");
        browser.sleep(5000);
        expect(files.alertValue()).toEqual('The file(s) have been successfully deleted!');
        browser.ignoreSynchronization = false;
        browser.get(filesUrl);

    });


    it('Copy a directory successfully - TC0004', function(){

            browser.get(filesUrl);

            console.log("navigating to files screen");

            files.addDirectory();
            files.enterDirectoryName("SarathTC0004_Source");
            files.createDirectory();
	    browser.sleep(2000);
            files.refreshScreen();
            files.select("SarathTC0004_Source");
	    files.addFile();
	    var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            files.close();

	    browser.get(filesUrl);

	    files.addDirectory();
            files.enterDirectoryName("SarathTC0004_Dest");
            files.createDirectory();
            browser.sleep(5000);
            files.refreshScreen();
            files.filesGearSelect("SarathTC0004_Source","Copy","SarathTC0004_Dest");
	    browser.sleep(5000);
            browser.get(filesUrl);
            files.select("SarathTC0004_Dest");
	    files.select("SarathTC0004_Source");
	    files.select("GhurkaSampleSFTP.csv");

            browser.get(filesUrl);
            files.select("SarathTC0004_Source");
            files.select("GhurkaSampleSFTP.csv");

            browser.get(filesUrl);
            files.filesSelect("SarathTC0004_Source");
            files.filesSelect("SarathTC0004_Dest");
            browser.sleep(2000);
	    files.mainGearSelect("Delete","");

	    browser.sleep(5000);
	    expect(files.alertValue()).toEqual('The file(s) have been successfully deleted!');
	    browser.ignoreSynchronization = false;
	    browser.get(filesUrl);

        });


        it('Bulk Copy/Move directories successfully - TC0005', function(){

            browser.get(filesUrl);

            console.log("navigating to files screen");

            files.addDirectory();
            files.enterDirectoryName("SarathTC0005_Source1");
            files.createDirectory();
	    browser.sleep(2000);
            files.refreshScreen();
            files.select("SarathTC0005_Source1");
            files.addFile();
	    var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            files.close();

            browser.get(filesUrl);
            files.addDirectory();
            files.enterDirectoryName("SarathTC0005_Source2");
            files.createDirectory();
            browser.sleep(2000);
            files.select("SarathTC0005_Source2");
	    files.addFile();
	    var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP2.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            files.close();

            browser.get(filesUrl);
            files.addDirectory();
            files.enterDirectoryName("SarathTC0005_Dest");
            files.createDirectory();
	    browser.sleep(5000);
            files.refreshScreen();
	    files.filesSelect("SarathTC0005_Source1");
            files.filesSelect("SarathTC0005_Source2");
	    files.mainGearSelect("Copy", "SarathTC0005_Dest");
	    browser.sleep(10000);
            expect(files.alertValue()).toEqual('The file(s) have been successfully copied!');
            browser.ignoreSynchronization = false;

	    browser.get(filesUrl);
            files.refreshScreen();
	    files.filesGearSelect("SarathTC0005_Source1","Rename","NewSarathTC0005_Source1");
            files.refreshScreen();
            browser.sleep(5000);
	    files.filesGearSelect("SarathTC0005_Source2","Rename","NewSarathTC0005_Source2");
            files.refreshScreen();

	    files.filesSelect("NewSarathTC0005_Source1");
	    files.filesSelect("NewSarathTC0005_Source2");
	    files.mainGearSelect("Move", "SarathTC0005_Dest");
	    browser.sleep(10000);
            expect(files.alertValue()).toEqual('The file(s) have been successfully moved!');
	    browser.ignoreSynchronization = false;

            browser.get(filesUrl);
            files.refreshScreen();
            files.select("SarathTC0005_Dest");
            files.select("NewSarathTC0005_Source2");

            browser.get(filesUrl);
            files.filesGearSelect("SarathTC0005_Dest","Delete");
            browser.sleep(10000);
            expect(files.alertValue()).toEqual('The file(s) have been successfully deleted!');
            browser.ignoreSynchronization = false;
            browser.get(filesUrl);
    });



        it('File specific operations - View, download, File share  - TC0006', function(){

            browser.get(filesUrl);

            console.log("navigating to files screen");

            files.addFile();
	    var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/GhurkaSampleSFTP.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();

            files.select("GhurkaSampleSFTP.csv");
            files.fileView();
            files.save();
            browser.sleep(2000);
            expect(files.alertValue()).toEqual('File has been saved!');
            browser.ignoreSynchronization = false;

            var fileDownloaded1 = "./tempFiles/GhurkaSampleSFTP.csv";
            var fileDownloaded2 = "./tempFiles/GhurkaSampleSFTP (1).csv";

            var file1 = require('fs');
            var file2 = require('fs');

            if (file1.existsSync(fileDownloaded1)) {
                // Make sure the browser doesn't have to rename the download
               file1.unlinkSync(fileDownloaded1);
            }

            if (file2.existsSync(fileDownloaded2)) {
                // Make sure the browser doesn't have to rename the download
               file2.unlinkSync(fileDownloaded2);
            }


            files.fileDownload();

            browser.driver.wait(function() {
                return file1.existsSync(fileDownloaded1);
            }, 30000).then(function() {

                var subStringToCheck = "refName,realmRefName,userId,password,passwordPhrase";
                expect(file1.readFileSync(fileDownloaded1, { encoding: 'utf8' })).toMatch(subStringToCheck);

            });

            files.editContentType();
            files.setContentType("text/plain");
            files.saveContentType();
            browser.sleep(3500);

     	    browser.ignoreSynchronization = true;
            files.fileViewOnScreen();
            browser.getAllWindowHandles().then(function (handles) {
            	console.log(handles.length);
            	browser.driver.switchTo().window(handles[1]).then(function () {
            	    browser.sleep(3000);
   	         		browser.ignoreSynchronization = true;
            	    expect(element(by.xpath('//body')).getText()).toMatch('refName,realmRefName,userId,password,passwordPhrase');
            	    browser.driver.close();
            	    browser.driver.switchTo().window(handles[0]);
            	 });
            });


           browser.ignoreSynchronization = false;
           browser.get(filesUrl);
           files.select("GhurkaSampleSFTP.csv");

            files.fileShare();
            files.limitDownload();
            //  files.remainingDownloads("1");
            browser.sleep(2000);
            files.createSharedLink();
            browser.sleep(2000);
            files.clickLinkId();
	    browser.sleep(2000);
            files.getLinkId().then(function(value) {
            link = value;
            console.log(link);
            browser.ignoreSynchronization = true;
            browser.sleep(2000);
            browser.get(link);
            browser.sleep(2000);
       	    browser.get(link);
            expect(element(by.xpath('//body')).getText()).toMatch('This link may have been valid sometime ago');
            browser.ignoreSynchronization = false;

	});

	browser.sleep(2000);
	browser.get(filesUrl);
	browser.sleep(4000);
	files.filesGearSelect("GhurkaSampleSFTP.csv","Delete");
        browser.sleep(4000);

    });
})

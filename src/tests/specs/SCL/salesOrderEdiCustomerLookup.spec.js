var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.currentSONumber="";
global.newSONumber="";


describe('Sales Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var route = new routeScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

    it('Customer lookup based on contactReferenceId in xml - TC0001', function(){
             
            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = '/src/tests/autoFiles/SCL_SOWithCustomerId.xml';

            var content1="";

            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content1 = data;
            });


            browser.wait(function() {
                return content1 != '';
            }).then(function() {
                stringSearcher1.find(content1,"Aarath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                    var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                    newSONumber = "Aarath_" + tempIncr;

						
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_SOWithCustomerId.xml'],
                        recursive: true,
                        silent: true,
          
                    });
                });
            });

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Orders-Valid");
            browser.sleep(2000);
            mailbox.selectMailbox("Orders-Valid");
            mailbox.selectMailbox("Orders-Valid");
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 EDI order upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/SCL_SOWithCustomerId.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(2000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(2000);
//            route.routeSearch("Name","Orders_Process_3");
            commons.searchWithCriteria("Name","contains","Orders_Process_3");
            browser.sleep(2000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            route.routeSelectButton("Stop");
            browser.sleep(2000);


            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderEdit.salesOrderGetCustomerNumber()).toEqual('SarathCN_TC0001');

            });
    });
    

    it('Customer lookup based on Email id, Phone, FName/LName in xml - TC0002', function(){
             
            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/SCL_SOFNameLName.xml';

            var content1="";

            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content1 = data;
            });


            browser.wait(function() {
                return content1 != '';
            }).then(function() {
                stringSearcher1.find(content1,"Barath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                    var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                    newSONumber = "Barath_" + tempIncr;

						
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_SOFNameLName.xml'],
                        recursive: true,
                        silent: true,
          
                    });
                });
            });

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Orders-Valid");
            browser.sleep(2000);
            mailbox.selectMailbox("Orders-Valid");
            mailbox.selectMailbox("Orders-Valid");
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 EDI order upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/SCL_SOFNameLName.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(2000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(2000);
//            route.routeSearch("Name","Orders_Process_3");
            commons.searchWithCriteria("Name","contains","Orders_Process_3");
            browser.sleep(2000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            route.routeSelectButton("Stop");
            browser.sleep(2000);


            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderEdit.salesOrderGetCustomerNumber()).toEqual('FName01LName01');

            });
     });
 
     it('Customer lookup - Different FName Same LName (Husband/Wife treated as diff customers) TC0003', function(){
             
            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/SCL_SODFNameLName.xml';

            var content1="";

            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content1 = data;
            });


            browser.wait(function() {
                return content1 != '';
            }).then(function() {
                stringSearcher1.find(content1,"Carath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                    var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                    newSONumber = "Carath_" + tempIncr;

						
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_SODFNameLName.xml'],
                        recursive: true,
                        silent: true,
          
                    });
                });
            });

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Orders-Valid");
            browser.sleep(2000);
            mailbox.selectMailbox("Orders-Valid");
            mailbox.selectMailbox("Orders-Valid");
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 EDI order upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/SCL_SODFNameLName.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(2000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(2000);
//            route.routeSearch("Name","Orders_Process_3");
            commons.searchWithCriteria("Name","contains","Orders_Process_3");
            browser.sleep(2000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            route.routeSelectButton("Stop");
            browser.sleep(2000);


            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderEdit.salesOrderGetCustomerNumber()).toEqual('DFName01LName01');

            });
     });


     it('Customer lookup - Different LName (Wife changing her last name - treated as same customer) TC0004', function(){
             
            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/SCL_SODFNameDLName.xml';

            var content1="";

            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content1 = data;
            });


            browser.wait(function() {
                return content1 != '';
            }).then(function() {
                stringSearcher1.find(content1,"Darath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                    var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                    newSONumber = "Darath_" + tempIncr;

						
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_SODFNameDLName.xml'],
                        recursive: true,
                        silent: true,
          
                    });
                });
            });

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Orders-Valid");
            browser.sleep(2000);
            mailbox.selectMailbox("Orders-Valid");
            mailbox.selectMailbox("Orders-Valid");
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 EDI order upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/SCL_SODFNameDLName.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(2000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(2000);
//            route.routeSearch("Name","Orders_Process_3");
            commons.searchWithCriteria("Name","contains","Orders_Process_3");
            browser.sleep(2000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            route.routeSelectButton("Stop");
            browser.sleep(2000);


            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderEdit.salesOrderGetCustomerNumber()).toEqual('DFName01LName01');

            });
    });

     it('Customer lookup - match by last option - street address/zip code TC0005', function(){
             
            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/SCL_SOEmptyEmailPhone.xml';

            var content1="";

            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content1 = data;
            });


            browser.wait(function() {
                return content1 != '';
            }).then(function() {
                stringSearcher1.find(content1,"Earath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                    var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                    newSONumber = "Earath_" + tempIncr;

						
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_SOEmptyEmailPhone.xml'],
                        recursive: true,
                        silent: true,
          
                    });
                });
            });

            browser.get(mailboxUrl);
            browser.sleep(5000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(2000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Orders-Valid");
            browser.sleep(2000);
            mailbox.selectMailbox("Orders-Valid");
            mailbox.selectMailbox("Orders-Valid");
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.user);
            mailbox.enterFrom(browser.params.login.user);
            mailbox.enterSubject("TC0001 EDI order upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/SCL_SOEmptyEmailPhone.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(2000);
            mailbox.close();

            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(2000);
//            route.routeSearch("Name","Orders_Process_3");
            commons.searchWithCriteria("Name","contains","Orders_Process_3");
            browser.sleep(2000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            route.routeSelectButton("Stop");
            browser.sleep(2000);


            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderEdit.salesOrderGetCustomerNumber()).toEqual('DFName01LName01');

            });
    });
    
    
})

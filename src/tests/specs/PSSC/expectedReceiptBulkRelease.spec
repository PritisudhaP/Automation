var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var expectedReceiptEditScreen = require(process.cwd() + '/src/tests/screens/expectedReceipts/expectedReceipts.edit.screen.js');
var expectedReceiptSummaryScreen = require(process.cwd() + '/src/tests/screens/expectedReceipts/expectedReceipts.summary.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.currentInventoryCount="";
global.updatedInventoryCount="";

global.newReceiptNumber1="";
global.newReceiptNumber2="";

describe('Expected Receipt Bulk receive flow  : ', function(){
    var mailbox = new mailboxScreen();
    var expectedReceiptEdit = new expectedReceiptEditScreen();
    var expectedReceiptSummary = new expectedReceiptSummaryScreen();
    var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();

    var commons = new common();

    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString();



    it('Expected Receipts bulk receive  - TC0001', function(){

        var stringSearcher1 = require('string-search');
        var fs1 = require('fs');
        var filename1 = './autoFiles/PSSC_ExpectedReceipt.xml';

        var content1="";
        var content2="";
        
        fs1.readFile(filename1,"utf8", function read(err, data){
            if (err) {
                throw err;
             }
             content1 = data;
        }); 


        browser.wait(function() {
            return content1 != '';
        }).then(function() {
            stringSearcher1.find(content1,"SarathTC.*").then(function(resultArr) {
                var searchedLine = resultArr[0].text;
                currentReceiptNumber = searchedLine.trim().substring(23,37);
                var tempIncr = parseInt(currentReceiptNumber.substring(8,14)) + 1;
                newReceiptNumber1 = "SarathTC" + tempIncr;

                var replace1 = require("replace");
                var replaceString1 = newReceiptNumber1;
                replace1({
                    regex: currentReceiptNumber,
                    replacement: replaceString1,
                    paths: ['./autoFiles/PSSC_ExpectedReceipt.xml'],
                    recursive: true,
                    silent: true,
                });
            });
        }); 
        

		browser.get(mailboxUrl);
		browser.sleep(5000);
		mailbox.selectMailboxType("intermediateboxes");
		browser.sleep(2000);
		mailbox.searchMailboxWithinType("pinnedIntermediateboxes","receipt-mailbox-In");
		browser.sleep(2000);
		mailbox.selectMailbox("receipt-mailbox-In");
		mailbox.selectMailbox("receipt-mailbox-In");

		mailbox.refresh();

		browser.getCurrentUrl().then(function (url) {
			var currentUrl = url;
			var newMsgUrl = url + "new-message";
			browser.get(newMsgUrl);
		});

		mailbox.enterTo(browser.params.login.loginUser);
		mailbox.enterFrom(browser.params.login.loginUser);
		mailbox.enterSubject("TC0001 Receipt upload");
		mailbox.addAttachment();
		var cwd = process.cwd();
		var fullPath = cwd + "/autoFiles/PSSC_ExpectedReceipt.xml";
		mailbox.clickSelectFile(fullPath);
		mailbox.uploadFile();
		browser.sleep(2000);
		mailbox.close();

		browser.sleep(2000);


        browser.wait(function() {
            return newReceiptNumber1 != '';
        }).then(function() {

			var stringSearcher2 = require('string-search');
			var fs2 = require('fs');
			var filename2 = './autoFiles/PSSC_ExpectedReceipt.xml';

			var content2="";
		
			fs2.readFile(filename2,"utf8", function read(err, data){
				if (err) {
					throw err;
				 }
				 content2 = data;
			}); 


			browser.wait(function() {
				return content2 != '';
			}).then(function() {
				stringSearcher2.find(content2,"SarathTC.*").then(function(resultArr) {
					var searchedLine2 = resultArr[0].text;
					currentReceiptNumber2 = searchedLine2.trim().substring(23,37);
					var tempIncr2 = parseInt(currentReceiptNumber2.substring(8,14)) + 1;
					newReceiptNumber2 = "SarathTC" + tempIncr2;

					var replace2 = require("replace");
					var replaceString2 = newReceiptNumber2;
					replace2({
						regex: currentReceiptNumber2,
						replacement: replaceString2,
						paths: ['./autoFiles/PSSC_ExpectedReceipt.xml'],
						recursive: true,
						silent: true,
					});
				});
			}); 
        }); 
        
        console.log(newReceiptNumber1);
        console.log(newReceiptNumber2);

		browser.get(mailboxUrl);
		browser.sleep(5000);
		mailbox.selectMailboxType("intermediateboxes");
		browser.sleep(2000);
		mailbox.searchMailboxWithinType("pinnedIntermediateboxes","receipt-mailbox-In");
		browser.sleep(2000);
		mailbox.selectMailbox("receipt-mailbox-In");
		mailbox.selectMailbox("receipt-mailbox-In");

		mailbox.refresh();

		browser.getCurrentUrl().then(function (url) {
			var currentUrl = url;
			var newMsgUrl = url + "new-message";
			browser.get(newMsgUrl);
		});

		mailbox.enterTo(browser.params.login.loginUser);
		mailbox.enterFrom(browser.params.login.loginUser);
		mailbox.enterSubject("TC0001 Receipt upload");
		mailbox.addAttachment();
		var cwd = process.cwd();
		var fullPath = cwd + "/autoFiles/PSSC_ExpectedReceipt.xml";
		mailbox.clickSelectFile(fullPath);
		mailbox.uploadFile();
		browser.sleep(2000);
		mailbox.close();

		browser.sleep(2000);


		browser.get(routeUrl);
		browser.sleep(2000);
//		route.routeSearch("Name","ProcessReceiptRoute");
        commons.searchWithCriteria("Name","contains","ProcessReceiptRoute");
		browser.sleep(2000);
		route.routeSelectButton("Start");
		browser.sleep(5000);
		route.routeSelectButton("Stop");
		browser.sleep(2000);

		browser.get(inventorySearchUrl);

                inventorySearch.enterSite("Fitchburg-DC");
		inventorySearch.addSKU();
                commons.searchWithCriteria("Name","contains","ONE THOUSAND YEARS OF RUSSIAN CHURCH MUSIC");
		browser.sleep(2000);
		inventorySearch.selectSKU();
		inventorySearch.addProduct();
		browser.sleep(2000);
		inventorySearch.searchInventory();
		browser.sleep(2000);
		
		inventorySearch.getAvailableQty().then(function(value) {
		    currentInventoryCount = value;
		    updatedInventoryCount = parseInt(currentInventoryCount) + 280;
		});

        browser.wait(function() {
            return newReceiptNumber2 != '';
        }).then(function() {
            browser.get(expectedReceiptsUrl);
            browser.sleep(3000);
            commons.multiselect();
            commons.searchWithCriteria("Receipt Number","contains",newReceiptNumber1);
            commons.searchWithCriteria("Receipt Number","contains",newReceiptNumber2);

            expectedReceiptSummary.expectedReceiptsMatchFilter("Matching Any");
            expectedReceiptSummary.multiExpectedReceiptsAction("Receive","Fitchburg-DC");

            expect(expectedReceiptSummary.expectedReceiptsStatus()).toEqual("RECEIVED");

            browser.get(inventorySearchUrl);
            inventorySearch.enterSite("Fitchburg-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("Name","contains","ONE THOUSAND YEARS OF RUSSIAN CHURCH MUSIC");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual(updatedInventoryCount.toString());



            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();

            customersSummary.customersSearch("First Name","MUSICA");
            browser.sleep(3000);

            customersSummary.customersSelectGear("Edit");

            customerEdit.selectActivityLedgerTab();
            var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
            browser.actions().mouseMove(elem).perform();

            browser.sleep(2000);
            customerEdit.selectActivityLedgerAdjustmentsTab();
            browser.sleep(2000);

            customerEdit.activityLedgerGetCharges("1").then(function(text) {
                expect(text.trim()).toEqual('$21.50');
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(dd);
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(yyyy);
            });

             
            
        });    

        
    });


})

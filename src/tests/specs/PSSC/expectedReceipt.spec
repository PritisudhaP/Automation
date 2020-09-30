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


describe('Expected Receipt Flow  : ', function(){
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



    it('Expected Receipts flow  - TC0001', function(){

        var stringSearcher1 = require('string-search');
        var fs1 = require('fs');
        var filename1 = './autoFiles/PSSC_ExpectedReceipt.xml';

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
            stringSearcher1.find(content1,"SarathTC.*").then(function(resultArr) {
                var searchedLine = resultArr[0].text;
                console.log("changing receipt number with dateformat");
               currentReceiptNumber = searchedLine.trim().substring(23,41);
                console.log("currentReceiptNumber is "+currentReceiptNumber);

            var tempIncr=Math.floor(Date.now() / 1000);
                newReceiptNumber = "SarathTC" + tempIncr;
                console.log("newReceipt number is "+newReceiptNumber);

               var replace1 = require("replace");
                var replaceString1 = newReceiptNumber;
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
		    updatedInventoryCount = parseInt(currentInventoryCount) + 140;
		});

        browser.wait(function() {
            return newReceiptNumber != '';
        }).then(function() {

            console.log(newReceiptNumber);
            browser.get(expectedReceiptsUrl);
            browser.sleep(3000);
            commons.multiselect();

            expectedReceiptSummary.expectedReceiptsSearch("Receipt Number",newReceiptNumber);
            browser.sleep(3000);
            expectedReceiptSummary.expectedReceiptsSelectGear("View");

            expectedReceiptEdit.expectedReceiptSelectOption("Receive Inventory","Fitchburg-DC");

            browser.get(expectedReceiptsUrl);
            browser.sleep(3000);
            commons.multiselect();
            expectedReceiptSummary.expectedReceiptsSearch("Receipt Number",newReceiptNumber);
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

var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.currentSONumber="";
global.newSONumber="";


describe('Sales Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

    it('EDI Sales order that release successfully to a forced location - TC0001', function(){

            var stringSearcher1 = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/SCL_ForcedAllocation.xml';

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
                stringSearcher1.find(content1,"Sarath_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(16,31);
                  //  var tempIncr = parseInt(currentSONumber.substring(7,15)) + 1;
                  var tempIncr=Math.floor(Date.now() / 1000);
                    newSONumber = "Sarath_" + tempIncr;


                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/SCL_ForcedAllocation.xml'],
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
            var fullPath = cwd + "/autoFiles/SCL_ForcedAllocation.xml";
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
//                salesOrderSummary.salesOrderSearch("Original Order #", newSONumber);
                commons.searchWithCriteria("Order #","contains",newSONumber);
                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("San Diego - DC");
            inventorySearch.addSKU();
//            inventorySearch.searchSKU("Name","DAMAGED-ER");
            commons.searchWithCriteria("SKU","contains","DAMAGED-ER");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('9');
            browser.sleep(2000);

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("San Diego - DC");
            inventorySearch.addSKU();
//            inventorySearch.searchSKU("Name","sarathSCLProduct0002");
            commons.searchWithCriteria("SKU","contains","sarathSCLProduct0002");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('9');
            browser.sleep(2000);


    });
})

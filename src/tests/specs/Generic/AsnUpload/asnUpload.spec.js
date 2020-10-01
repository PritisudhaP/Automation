var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var jobsSummaryScreen = require(process.cwd()+'/screens/jobs/jobs.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
const papa = require('papaparse');
	const fs = require('fs');
global.count="";
global.sku="";

describe('ASN Upload  Flow  : ', function(){


    var mailbox = new mailboxScreen();
    var inventorySearch = new inventorySearchScreen();
    var jobsSummary = new jobsSummaryScreen();
    var commons = new common();

it('ASN upload -TC0001', function(){






                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","babuASN");
                browser.sleep(2000);
                mailbox.selectMailbox("babuASN");
                mailbox.selectMailbox("babuASN");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0001 ASN upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd +"/autoFiles/"+browser.params.client+"ASNUpload.csv";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(jobsDefinitionUrl);
                browser.sleep(5000);
                commons.multiselect();
                 jobsSummary.jobsSearch("Name","advanced-inboundshipmentjob");
                   browser.sleep(2000);
                 jobsSummary.jobsStart();
                 browser.sleep(4000);

               // csv file read

               const file = fs.readFileSync(fullPath, 'utf8');

               	papa.parse(file, {
               		complete: (result) =>{
               		    sku = result.data[1][1];
               			console.log("****** value of sku is "+sku)
               		}
               	});

// end csv read

                browser.get(inventorySearchUrl);
                 browser.sleep(2000);
                  inventorySearch.addSKU();
                  commons.searchWithCriteria("SKU","is",sku);
                   browser.sleep(2000);
                  inventorySearch.selectSKU();
                  inventorySearch.addProduct();
                 browser.sleep(2000);
                 inventorySearch.searchInventory();
                 browser.sleep(2000);


     inventorySearch.countInbound().then(function(value){
             count = value;

            });


                browser.wait(function() {
                             return count != '';
                         }).then(function() {

                              count = count.replace("(view)","");
                              console.log("value after replace "+count);
                              count= count.trim();
                              console.log("value after trim "+count);
                              expect(count).toEqual('87');
                         });







});



})

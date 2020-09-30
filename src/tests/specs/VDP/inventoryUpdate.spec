var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var reportsSummaryScreen = require(process.cwd() + '/src/tests/screens/reports/reports.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Inventory update flow : ', function(){
    var mailbox = new mailboxScreen();
    var reportsSummary = new reportsSummaryScreen();
    var commons = new common();





       it(' Test inventory update for a Vendor - E2E0003', function(){


            browser.get(mailboxUrl);
            browser.sleep(2000);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","InventoryUpdate-CSV");
            mailbox.selectMailbox("InventoryUpdate-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Inventory upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/inventoryUpdate.csv";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(120000);   
                     
            browser.get(reportsUrl);
            browser.sleep(6000);

            var filename2 = './tempFiles/VendorInventoryReportCSV.csv';
            var fs2 = require('fs');

            if (fs2.existsSync(filename2)) {
                // Make sure the browser doesn't have to rename the download.
                fs2.unlinkSync(filename2);
            }

            reportsSummary.vendorInventoryReportCSVDownload();

            browser.driver.wait(function() {
                return fs2.existsSync(filename2);
            }, 30000).then(function() {

                var checkLine1 = "Sarath TC0001 CATS LLC";
                var checkLine2 = "SarathTC0001_SarathTC0001";
                var checkLine3 = "65";
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine1);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine2);
                expect(fs2.readFileSync(filename2, { encoding: 'utf8' })).toMatch(checkLine3);

            });


        }); 
 


})

var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var shipmentsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipments/shipments.summary.screen.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');

var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');

var reportsSummaryScreen = require(process.cwd() + '/src/tests/screens/reports/reports.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.currentEDISONumber="";
global.newEDISONumber="";
global.shipmentRequestNumberEDI="";
global.invoiceNumberEDI="";



describe('EDI Vendor Sales order flow and taking it to invoice : ', function(){
    var loginScreen = new loginPage();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var shipmentsSummary = new shipmentsSummaryScreen();
    var invoiceSummary = new invoiceSummaryScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();


    it('EDI Vendor Sales order flow and taking it to invoice Released - E2E0002', function(){


            var stringSearcher2 = require('string-search');
            var fs2 = require('fs');
            var filename2 = './autoFiles/salesOrderEDI.xml';
               
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
                stringSearcher2.find(content2,"SarathNewEDIOrder.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentEDISONumber = searchedLine.trim().substring(13,34);
                    var tempIncr = parseInt(currentEDISONumber.substring(17,21)) + 1;
                    newEDISONumber = "SarathNewEDIOrder" + tempIncr;
 
                    var replace1 = require("replace");
                    var replaceString1 = newEDISONumber;
                    replace1({
                        regex: currentEDISONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/salesOrderEDI.xml'],
                        recursive: true,
                        silent: true,
                    });
                });                  
            });    
           

            browser.get(mailboxUrl);
            browser.sleep(2000);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","PurchaseOrder-Valid");
            mailbox.selectMailbox("PurchaseOrder-Valid");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0003 PO upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/salesOrderEDI.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(5000);

            browser.wait(function() { 
                return newEDISONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);    
                browser.sleep(60000);        
                salesOrderSummary.salesOrderSearch("Original Order #", newEDISONumber);
                browser.sleep(3000); 
                commons.refresh();
                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
              //  salesOrderSummary.salesOrderSearchRemove("1");
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
                browser.sleep(10000);
            
            });
            
            var stringSearcher3 = require('string-search');
            var fs3 = require('fs');
            var filename3 = './autoFiles/OrderStatusReportEDI.xml';
               
            var content3="";
            fs3.readFile(filename3,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content3 = data;
            });     

            browser.wait(function() { 
                return content3 != '';
            }).then(function() {
                stringSearcher3.find(content3,"SarathNewEDIOrder.*").then(function(resultArr) {
                    var replace1 = require("replace");
                    var replaceString1 = newEDISONumber;
                    replace1({
                        regex: currentEDISONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/OrderStatusReportEDI.xml'],
                        recursive: true,
                        silent: true,
                    });
                });                  
            });    
          
            console.log(currentEDISONumber);
            console.log(newEDISONumber);
            browser.get(mailboxUrl);
            browser.sleep(2000);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","OrderUpdate-toLoad");
            mailbox.selectMailbox("OrderUpdate-toLoad");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0003 Order update");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/OrderStatusReportEDI.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(60000);

            var stringSearcher4 = require('string-search');
            var fs4 = require('fs');
            var filename4 = './autoFiles/ShipmentEDI.xml';
               
            var content4="";
            fs4.readFile(filename4,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content4 = data;
            });     

            browser.wait(function() { 
                return content4 != '';
            }).then(function() {
                stringSearcher4.find(content4,"SarathNewEDIOrder.*").then(function(resultArr) { 
                    var replace1 = require("replace");
                    var replaceString1 = newEDISONumber;
                    replace1({
                        regex: currentEDISONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/ShipmentEDI.xml'],
                        recursive: true,
                        silent: true,
                    });
                });                  
            });    
          

            browser.get(mailboxUrl);
            browser.sleep(2000);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ASN-Valid");
            mailbox.selectMailbox("ASN-Valid");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0003 ASN update");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/ShipmentEDI.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(60000);
            
            
            browser.get(shipmentRequestsUrl);
            browser.sleep(2000);
            shipmentRequestsSummary.shipmentRequestSearch("Order #", newEDISONumber);
            commons.refresh();
            expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');


            var stringSearcher4 = require('string-search');
            var fs4 = require('fs');
            var filename4 = './autoFiles/InvoiceEDI.xml';
               
            var content4="";
            fs4.readFile(filename4,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content4 = data;
            });     

            browser.wait(function() { 
                return content4 != '';
            }).then(function() {
                stringSearcher4.find(content4,"SarathNewEDIOrder.*").then(function(resultArr) {
 
                    var replace1 = require("replace");
                    var replaceString1 = newEDISONumber;
                    replace1({
                        regex: currentEDISONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/InvoiceEDI.xml'],
                        recursive: true,
                        silent: true,
                    });
                });                  
            });    
           

            browser.get(mailboxUrl);
            browser.sleep(2000);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Invoice-Valid");
            mailbox.selectMailbox("Invoice-Valid");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0003 Invoice update");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/InvoiceEDI.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(60000);

            browser.wait(function() { 
                return newEDISONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                browser.sleep(2000);
                salesOrderSummary.salesOrderSearch("Original Order #", newEDISONumber);
                commons.refresh();
                commons.multiselect();
                expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');

                browser.get(salesOrderUrl);
                browser.sleep(2000);
                salesOrderSummary.salesOrderSearch("Original Order #", newEDISONumber);
                commons.multiselect();
                commons.refresh();
                expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');

                browser.get(invoiceUrl);
                browser.sleep(30000);
                invoiceSummary.invoiceSearch("Order Number", newEDISONumber);
                commons.refresh();
                expect(invoiceSummary.invoiceStatus()).toEqual('RELEASED');

            });
     
        }); 

})

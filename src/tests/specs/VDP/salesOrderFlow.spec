var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');


var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var shipmentsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipments/shipments.summary.screen.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');

var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.currentSONumber="";
global.newSONumber="";
global.shipmentRequestNumber="";
global.invoiceNumber="";

describe('Sales order flow and taking it to invoice Paid : ', function(){
    var loginScreen = new loginPage();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var shipmentsSummary = new shipmentsSummaryScreen();
    var invoiceSummary = new invoiceSummaryScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();



    it('Sales order flow and taking it to invoice Paid - E2E0001', function(){
                        
            var stringSearcher = require('string-search');
            var fs1 = require('fs');
            var filename1 = './autoFiles/salesOrder.xml';
               
            var content="";
            fs1.readFile(filename1,"utf8", function read(err, data){
                if (err) {
                    throw err;
                 }
                 content = data;
            });     

            browser.wait(function() { 
                return content != '';
            }).then(function() {
                stringSearcher.find(content,"VDP_E2E_.*").then(function(resultArr) {
                    var searchedLine = resultArr[0].text;
                    currentSONumber = searchedLine.trim().substring(13,26);
                    var tempIncr = parseInt(currentSONumber.substring(8,13)) + 1;
                    newSONumber = "VDP_E2E_" + tempIncr;
 
                    var replace1 = require("replace");
                    var replaceString1 = newSONumber;
                    replace1({
                        regex: currentSONumber,
                        replacement: replaceString1,
                        paths: ['./autoFiles/salesOrder.xml'],
                        recursive: true,
                        silent: true,
                    });
                });                  
            });    
           

            browser.get(mailboxUrl);
            browser.sleep(3000);
            mailbox.selectMailboxType("intermediateboxes");
            browser.sleep(1000);
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","PurchaseOrder-Valid");
            browser.sleep(1000);
            mailbox.selectMailbox("PurchaseOrder-Valid");
            browser.sleep(1000);
            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 PO upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/salesOrder.xml";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();
            browser.sleep(5000);

            browser.wait(function() { 
                return newSONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);    
                browser.sleep(240000);        
                salesOrderSummary.salesOrderSearch("Original Order #", newSONumber);
              //  salesOrderSummary.salesOrderSearch("Status", "OPEN");
                 browser.sleep(3000); 
                commons.refresh();
                browser.sleep(3000);
                commons.multiselect();
                 browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("Release");
             //   salesOrderSummary.salesOrderSearchRemove("1");
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                browser.sleep(10000);
            
            });
            
            loginScreen.logout();
            browser.sleep(5000);
            
            browser.get(browser.baseUrl);
            browser.sleep(5000);
            loginScreen.setUsername('vendor-sarathtc0001catsllc@petsmart.com');
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);            
            
            browser.wait(function() {
                return newSONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                console.log(newSONumber);
                browser.sleep(2000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", newSONumber);
              //  shipmentRequestsSummary.shipmentRequestSearch("Status", "PENDING");
                browser.sleep(2000);
                commons.refresh();
                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                browser.sleep(2000);
                shipmentRequestsCreate.acknowledgeLineItem("1");
                shipmentRequestsCreate.confirmAcknowledgement();
                browser.sleep(5000);
                shipmentRequestsCreate.createShipment();
                browser.sleep(2000);
                shipmentRequestsCreate.packageSelection("SmallExpressBox");
                shipmentRequestsCreate.enterItemQty("10");
                shipmentRequestsCreate.addPackageToShipment();
                shipmentRequestsCreate.finalizeShipment();
                browser.sleep(5000);
                browser.get(shipmentRequestsUrl);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", newSONumber);
                commons.refresh();
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.sleep(5000);
 
                loginScreen.logout();
                browser.sleep(5000);
            
                browser.get(browser.baseUrl);
                browser.sleep(5000);
                loginScreen.setUsername(browser.params.login.vdpUser);
                loginScreen.setPassword(browser.params.login.password);
 //               loginScreen.setPassword("Enspire2017!");
                loginScreen.login();
                browser.sleep(5000);            

                
                browser.get(shipmentsUrl);
                shipmentsSummary.shipmentsSearch("Order Number", newSONumber);
                browser.sleep(5000);
                commons.refresh();
                commons.multiselect();
                shipmentsSummary.shipmentsSelectGear("Mark As Shipped");
                
                browser.sleep(120000);
  
                
                browser.get(shipmentRequestsUrl);
                browser.sleep(2000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", newSONumber);
                commons.refresh();
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('INVOICED');
                
                browser.get(shipmentsUrl);
                browser.sleep(2000);
                shipmentsSummary.shipmentsSearch("Order Number", newSONumber);
                commons.refresh();
                commons.multiselect();
                expect(shipmentsSummary.shipmentsStatus()).toEqual('INVOICED');
                
                browser.get(invoiceUrl);
                browser.sleep(2000);
                invoiceSummary.invoiceSearch("Order Number", newSONumber);
                browser.sleep(2000);
                commons.refresh();
                browser.sleep(2000);
                invoiceSummary.getInvoiceNumber().then(function(value) {
                    invoiceNumber = value;
                    console.log(invoiceNumber);
                });                

                browser.wait(function() { 
                    return invoiceNumber != '';
                }).then(function() {       
                    invoiceSummary.invoiceSelectGear("Release");
                    expect(invoiceSummary.invoiceStatus()).toEqual('RELEASED');
                    var replace2 = require("replace");
                    var replaceString2 = "<value>" + invoiceNumber+ "</value>";
                    replace2({
                        regex: "<value>.*</value>",
                        replacement: replaceString2,
                        paths: ['./autoFiles/remitAdvice.xml'],
                        recursive: true,
                        silent: true,
                    });
 
 
            
                    browser.get(mailboxUrl);
                    mailbox.selectMailboxType("intermediateboxes");
                    mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Remit-Valid");
                    mailbox.selectMailbox("Remit-Valid");

                    mailbox.refresh();
   
                    browser.getCurrentUrl().then(function (url) {
                        var currentUrl = url;
                        var newMsgUrl = url + "new-message";
                        browser.get(newMsgUrl);
                    });

                    mailbox.enterTo(browser.params.login.vdpUser);
                    mailbox.enterFrom(browser.params.login.vdpUser);
                    mailbox.enterSubject("TC0001 Remit upload");
                    mailbox.addAttachment();
                    var cwd = process.cwd();
                    var fullPath = cwd + "/autoFiles/remitAdvice.xml";
                    mailbox.clickSelectFile(fullPath);
                    mailbox.uploadFile();
                    browser.sleep(5000);
                    mailbox.close();
                    browser.sleep(120000);
                    
                    browser.get(invoiceUrl);
                     browser.sleep(30000);
                    invoiceSummary.invoiceSearch("Invoice Number", invoiceNumber);
                    commons.refresh();
                    expect(invoiceSummary.invoiceStatus()).toEqual('PAID');
                });                
             });
             
        });

})

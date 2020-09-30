var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var vendorManagementSummaryScreen = require(process.cwd() + '/src/tests/screens/vendorManagement/vendor.summary.screen.js');
var usersSummaryScreen = require(process.cwd() + '/src/tests/screens/users/users.summary.screen.js');
var usergroupSummaryScreen = require(process.cwd() + '/src/tests/screens/usergroup/usergroup.summary.screen.js');
var userroleSummaryScreen = require(process.cwd() + '/src/tests/screens/userrole/userrole.summary.screen.js');
var domainPolicySummaryScreen = require(process.cwd() + '/src/tests/screens/domainPolicy/domainPolicy.summary.screen.js');

var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var itemMasterSummaryScreen = require(process.cwd() + '/src/tests/screens/itemMaster/itemMaster.summary.screen.js');

var priceBookSummaryScreen = require(process.cwd() + '/src/tests/screens/pricebookManagement/pricebook.summary.screen.js');

var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var shipmentsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipments/shipments.summary.screen.js');

var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');

var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');

var reportsSummaryScreen = require(process.cwd() + '/src/tests/screens/reports/reports.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.currentSONumber="";
global.newSONumber="";
global.shipmentRequestNumber="";
global.invoiceNumber="";

global.currentEDISONumber="";
global.newEDISONumber="";
global.shipmentRequestNumberEDI="";
global.invoiceNumberEDI="";



describe('E2E Flow of loading vendors, products, product cost, sales order and taking it to invoice : ', function(){
    var loginScreen = new loginPage();
    var vendorSummary = new vendorManagementSummaryScreen();
    var usersSummary = new usersSummaryScreen();
    var usergroupSummary = new usergroupSummaryScreen();
    var userroleSummary = new userroleSummaryScreen();
    var domainPolicySummary = new domainPolicySummaryScreen();
    var productSummary = new productSummaryScreen();
    var itemMasterSummary = new itemMasterSummaryScreen();
    var priceBookSummary = new priceBookSummaryScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var shipmentsSummary = new shipmentsSummaryScreen();
    var invoiceSummary = new invoiceSummaryScreen();
    var files = new filesScreen();
    var mailbox = new mailboxScreen();
    var reportsSummary = new reportsSummaryScreen();
    var commons = new common();



    it('Load vendors, Product, Cost, Sales order - E2E0001', function(){
            
            browser.get(browser.baseUrl);
            browser.driver.manage().window().maximize();


            loginScreen.setUsername(browser.params.login.vdpUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);
            
            browser.get(filesUrl);
            browser.sleep(2000);
            
            files.select("integration");
            files.select("vendorSetup");
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/vendorSetup1.csv";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();

            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","MasterVendor-CSV");
            mailbox.selectMailbox("MasterVendor-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Vendor upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/vendorSetup2.txt";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();

            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","MasterProduct-CSV");
            mailbox.selectMailbox("MasterProduct-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Product upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/productMaster.csv";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();


            browser.sleep(120000);

            browser.get(mailboxUrl);
            mailbox.selectMailboxType("intermediateboxes");
            mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ProductCost-CSV");
            mailbox.selectMailbox("ProductCost-CSV");

            mailbox.refresh();

            browser.getCurrentUrl().then(function (url) {
                var currentUrl = url;
                var newMsgUrl = url + "new-message";
                browser.get(newMsgUrl);
            });

            mailbox.enterTo(browser.params.login.vdpUser);
            mailbox.enterFrom(browser.params.login.vdpUser);
            mailbox.enterSubject("TC0001 Product Cost upload");
            mailbox.addAttachment();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/productCost.txt";
            mailbox.clickSelectFile(fullPath);
            mailbox.uploadFile();
            browser.sleep(5000);
            mailbox.close();


            browser.sleep(120000);


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
 
 
                    loginScreen.logout();
                    browser.sleep(3000);
                    
                    browser.get(browser.baseUrl);
                    browser.sleep(3000);
                    loginScreen.setUsername(browser.params.login.vdpUser);
                    loginScreen.setPassword(browser.params.login.password);
                    loginScreen.login();
                    browser.sleep(5000);
            
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
             loginScreen.logout();
             browser.sleep(3000);
             
        });



        it(' E2E flow for EDI vendor - E2E0002', function(){

            browser.get(browser.baseUrl);
            browser.sleep(3000);
            loginScreen.setUsername(browser.params.login.vdpUser);
            loginScreen.setPassword(browser.params.login.password);

            loginScreen.login();
            browser.sleep(5000);

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

                 loginScreen.logout();
                 browser.sleep(3000);
            });
     
        }); 


       it(' Test inventory update for a Vendor - E2E0003', function(){

            browser.get(browser.baseUrl);
            browser.sleep(3000);
            loginScreen.setUsername(browser.params.login.vdpUser);
            loginScreen.setPassword(browser.params.login.password);

            loginScreen.login();
            browser.sleep(5000);

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


             loginScreen.logout();
             browser.sleep(3000);

        }); 
 




        it(' Cleanup - E2E0004', function(){

            browser.get(browser.baseUrl);
            browser.sleep(3000);
            loginScreen.setUsername(browser.params.login.vdpUser);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);

            browser.get(priceBookUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            priceBookSummary.priceBookSearch("Name","tc0001");
            browser.sleep(1000);
            priceBookSummary.priceBookSelectGear("Delete");

            browser.get(itemMasterUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            itemMasterSummary.itemMasterSearch("Name","tc0001");
            browser.sleep(1000);
            itemMasterSummary.itemMasterSelectGear("Delete");

            browser.get(vendorManagementUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            vendorSummary.vendorSearch("Name","tc0001");
            browser.sleep(1000);
            vendorSummary.vendorSelectGear("Delete");
          
            browser.get(filesUrl);
            browser.sleep(3000);
            files.select("vendors");
            browser.sleep(1000);
            files.filesSearch("Name","sarathtc0001catsllc-home");
            browser.sleep(1000);
            files.filesGearSelect("sarathtc0001catsllc-home","Delete");       
            browser.sleep(4000);
    
            browser.get(productUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            productSummary.productSearch("SKU","tc0001");
            browser.sleep(1000);
            productSummary.productSelectGear("Delete");
 
            browser.get(domainPolicyUrl);
            browser.sleep(3000);
            domainPolicySummary.domainPolicySearch("Name","tc0001");
            browser.sleep(1000);
            domainPolicySummary.domainPolicySelectGear("Delete");
                        
            browser.get(userroleUrl);
            browser.sleep(3000);
            userroleSummary.userroleSearch("Name","tc0001");
            browser.sleep(1000);
            userroleSummary.userroleSelectGear("Delete");
            
            browser.get(usergroupUrl);
            browser.sleep(3000);
            usergroupSummary.usergroupSearch("Name","tc0001");
            browser.sleep(1000);
            usergroupSummary.usergroupSelectGear("Delete");
            
            browser.get(usersUrl);
            browser.sleep(3000);
            usersSummary.usersSearch("Email","tc0001");
            browser.sleep(1000);
            usersSummary.usersSelectGear("Delete");          


            browser.get(priceBookUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            priceBookSummary.priceBookSearch("Name","tc0002");
            browser.sleep(1000);
            priceBookSummary.priceBookSelectGear("Delete");

            browser.get(itemMasterUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            itemMasterSummary.itemMasterSearch("Name","tc0002");
            browser.sleep(1000);
            itemMasterSummary.itemMasterSelectGear("Delete");

            browser.get(vendorManagementUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            vendorSummary.vendorSearch("Name","tc0002");
            browser.sleep(1000);
            vendorSummary.vendorSelectGear("Delete");


            browser.get(filesUrl);
            browser.sleep(3000);
            files.select("vendors");
            files.filesSearch("Name","sarathtc0002catsllc-home");
            browser.sleep(1000);
            files.filesGearSelect("sarathtc0002catsllc-home","Delete");
            browser.sleep(4000);

            browser.get(domainPolicyUrl);
            browser.sleep(3000);
            domainPolicySummary.domainPolicySearch("Name","tc0002");
            browser.sleep(1000);
            domainPolicySummary.domainPolicySelectGear("Delete");

            browser.get(userroleUrl);
            browser.sleep(3000);
            userroleSummary.userroleSearch("Name","tc0002");
            browser.sleep(1000);
            userroleSummary.userroleSelectGear("Delete");

            browser.get(usergroupUrl);
            browser.sleep(3000);
            usergroupSummary.usergroupSearch("Name","tc0002");
            browser.sleep(1000);
            usergroupSummary.usergroupSelectGear("Delete");

            browser.get(usersUrl);
            browser.sleep(3000);
            usersSummary.usersSearch("Email","tc0002");
            browser.sleep(1000);
            usersSummary.usersSelectGear("Delete");

        });

})

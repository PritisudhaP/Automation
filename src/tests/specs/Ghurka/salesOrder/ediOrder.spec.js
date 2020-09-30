var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.SONumber='';

describe('Sales Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var files = new filesScreen();
    
    var commons = new common();

        it('EDI Whole Sale order that releases successfully - TC0001', function(){
             
            browser.get(filesUrl);
            browser.sleep(2000);

            files.select("edi-in");
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/WholesaleSampleEDI.edi";
            browser.sleep(4000);
            files.clickSelectFile(fullPath);
            files.uploadFile();
            files.close();

            browser.sleep(60000);
        
            browser.get(salesOrderUrl);
            browser.sleep(60000);
            salesOrderSummary.salesOrderSearch("Original Order #", "48903285");
            browser.sleep(2000);

            commons.multiselect();
            browser.sleep(2000); 
            salesOrderSummary.salesOrderNumber().then(function(value) {
                 SONumber = value;
            });            
            
            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                browser.sleep(2000); 
                commons.multiselect();
                browser.sleep(2000);

                salesOrderSummary.salesOrderSelectGear("Release"); 
                browser.sleep(40000);
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                browser.sleep(2000); 

                commons.multiselect();
                browser.sleep(2000);

                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                browser.sleep(60000);
                browser.get(salesOrderUrl);
                browser.sleep(60000);
                commons.multiselect();
                browser.sleep(2000);
 

                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            });
            
        });


})

var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";
global.ShipmentRequestNumber="";

describe('Shipment confirmation  Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();


    var commons = new common();

        it('Shipment confirmation - positive flow - TC0001', function(){
             
            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen"); 
            browser.driver.sleep(5000);
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("FULFILLMENT"); 
            browser.sleep(2000);
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            salesOrderCreate.searchCustomer("Name", "MUSICA");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("0-0-1");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();   
            salesOrderCreate.enterQty("4");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save");
            
            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            browser.sleep(3000);

//            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                //salesOrderSummary.salesOrderSearch("Status","OPEN");

                commons.multiselect();
                browser.sleep(3000); 
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(1000); 
                salesOrderEdit.salesOrderEditReferences();
                salesOrderEdit.salesOrderEnterShippingServiceCode("SHDOME");
                salesOrderEdit.salesOrderSelectExportPacking();
                salesOrderEdit.salesOrderSelectMustShip();
                salesOrderEdit.salesOrderSelectSameDay();
                salesOrderEdit.salesOrderSaveReferences();
                browser.sleep(3000);
           
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                //salesOrderSummary.salesOrderSearch("Status","OPEN");

                commons.multiselect();
                browser.sleep(3000);

 
                salesOrderSummary.salesOrderSelectGear("Release");           
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');           
            });

            browser.get(shipmentRequestsUrl);

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);            
 
                shipmentRequestsSummary.shipmentRequestNumber().then(function(value) {
                    ShipmentRequestNumber = value;
                    console.log(ShipmentRequestNumber);
                });

            });            




            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {

                var stringSearcher = require('string-search');
                var fs1 = require('fs');
                var filename1 = './autoFiles/PSSC_IRMS_ShipConfirmTracking_Internal.xml';
  
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
                    stringSearcher.find(content,"<shipmentRequestNumber>.*</shipmentRequestNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSRNumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<shipmentRequestNumber>"+ShipmentRequestNumber+"</shipmentRequestNumber>";
                        replace1({
                            regex: currentSRNumber,
                            replacement: replaceString1,
                            paths: ['./autoFiles/PSSC_IRMS_ShipConfirmTracking_Internal.xml'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });          
                
                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipConfirmTracking-Valid");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipConfirmTracking-Valid");
                mailbox.selectMailbox("ShipConfirmTracking-Valid");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.loginUser);
                mailbox.enterFrom(browser.params.login.loginUser);
                mailbox.enterSubject("TC0001 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/PSSC_IRMS_ShipConfirmTracking_Internal.xml";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","ShipConfirm-ProcessShipConfirmTracking");
                commons.searchWithCriteria("Name","contains","ShipConfirm-ProcessShipConfirmTracking");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

            });     
            
            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {

                var stringSearcher = require('string-search');
                var fs1 = require('fs');
                var filename1 = './autoFiles/PSSC_IRMS_ShipConfirm_Internal.xml';
  
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
                    stringSearcher.find(content,"<shipmentNumber>.*</shipmentNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSRNumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<shipmentNumber>"+ShipmentRequestNumber+"</shipmentNumber>";
                        replace1({
                            regex: currentSRNumber,
                            replacement: replaceString1,
                            paths: ['./autoFiles/PSSC_IRMS_ShipConfirm_Internal.xml'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });          
 
                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<shipmentRequestNumber>.*</shipmentRequestNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSRNumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<shipmentRequestNumber>"+ShipmentRequestNumber+"</shipmentRequestNumber>";
                        replace1({
                            regex: currentSRNumber,
                            replacement: replaceString1,
                            paths: ['./autoFiles/PSSC_IRMS_ShipConfirm_Internal.xml'],
                            recursive: true,
                            silent: true,
                        });
                    });
                }); 
                               
                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipConfirm-Valid");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipConfirm-Valid");
                mailbox.selectMailbox("ShipConfirm-Valid");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.loginUser);
                mailbox.enterFrom(browser.params.login.loginUser);
                mailbox.enterSubject("TC0001 Shipment confirmation upload step 2");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/PSSC_IRMS_ShipConfirm_Internal.xml";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","ShipConfirm-ProcessShipConfirm");
                commons.searchWithCriteria("Name","contains","ShipConfirm-ProcessShipConfirm");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);
            });                   

            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
                browser.sleep(2000);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
                
            }); 


        var today = new Date();
        var dd = today.getDate().toString();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear().toString();

        browser.get(customersUrl);
        browser.sleep(2000);
        commons.multiselect();

        customersSummary.customersSearch("First Name","MUSICA");
        browser.sleep(3000);

        customersSummary.customersSelectGear("Edit");

        customerEdit.selectDepositLedgerTab();
        var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
        browser.actions().mouseMove(elem).perform();

        browser.sleep(2000);
        customerEdit.selectDepositLedgerAdjustmentsTab();
        browser.sleep(2000);

        customerEdit.depositLedgerGetCharges().then(function(text) {
            expect(text.trim()).toEqual('$11.76');
        });

        expect(customerEdit.depositLedgerDate()).toMatch('Apr 12, 2017');


        customerEdit.selectActivityLedgerTab();
        var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
        browser.actions().mouseMove(elem).perform();

        browser.sleep(2000);
        customerEdit.selectActivityLedgerAdjustmentsTab();
        browser.sleep(2000);

        customerEdit.activityLedgerGetCharges("5").then(function(text) {
            expect(text.trim()).toEqual('$0.98');
        });

        customerEdit.activityLedgerGetCharges("4").then(function(text) {
            expect(text.trim()).toEqual('$1.48');
        });

        customerEdit.activityLedgerGetCharges("3").then(function(text) {
            expect(text.trim()).toEqual('$1.48');
        });

        customerEdit.activityLedgerGetCharges("2").then(function(text) {
            expect(text.trim()).toEqual('$3.50');
        });

        customerEdit.activityLedgerGetCharges("1").then(function(text) {
            expect(text.trim()).toEqual('$1.44');
        });


        customerEdit.activityLedgerDate().then(function(value) {
           expect(value.trim()).toMatch(dd);
        });

        customerEdit.activityLedgerDate().then(function(value) {
           expect(value.trim()).toMatch(yyyy);
        });

    });


})

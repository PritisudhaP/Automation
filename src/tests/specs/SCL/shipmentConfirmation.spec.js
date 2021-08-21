var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.SONumber="";
global.ShipmentRequestNumber="";

describe('Shipment confirmation  Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();

    var commons = new common();

        it('Shipment confirmation - positive flow - TC0001', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("4");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);

                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });


            browser.wait(function() {
                return SONumber != '';
            }).then(function() {

                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains",SONumber);

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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0001 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_SingleLine.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');

            });

            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipment>');
                mailbox.back();
                browser.sleep(2000);
            });
        });



        it('Shipment confirmation - short ship flow - TC0002', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            browser.driver.sleep(5000);
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.driver.sleep(5000);
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("14");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains",SONumber);
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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLine.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0002 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_SingleLine.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');

            });


            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipment>');
                mailbox.back();
                browser.sleep(2000);
            });



        });


        it('Shipment confirmation - Reject for reallocation to a diff DC - TC0003', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            browser.driver.sleep(5000);
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.driver.sleep(5000);
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("4");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
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

                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains",SONumber);
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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0003 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_SingleLineZeroQty.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('REJECTED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO ALLOCATE');
                browser.sleep(4000);
                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');


            });


            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber);
                browser.sleep(2000);
                expect(element(by.xpath('//div[contains(text(),"No messages found")]')).isPresent()).toEqual(true);
                browser.sleep(2000);
            });

        });


        it('Shipment confirmation - SKUs with and without shelf life - TC0004', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("1");
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathSCLProduct0001");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("1");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains", SONumber);

                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains", SONumber);

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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_TwoLines.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0001 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_TwoLines.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');

            });

            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipment>');
                mailbox.back();
                browser.sleep(2000);
            });
        });

        it('Check Available Qty after shipment confirmations - TC0005', function(){

                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("San Diego - DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","B4");
                commons.searchWithCriteria("SKU","contains","B4");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('290');
                expect(inventorySearch.getReservedQty()).toMatch("5");
                browser.sleep(2000);

                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("San Diego - DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","sarathSCLProduct0001");
                commons.searchWithCriteria("SKU","contains","sarathSCLProduct0001");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('98');
                expect(inventorySearch.getReservedQty()).toMatch("1");
                browser.sleep(2000);


        });


      it('Shipment confirmation - with confirmation coming back with diff lot numbers - TC0006', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            browser.driver.sleep(5000);
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.driver.sleep(5000);
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("DAMAGED-FM");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("20");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                browser.sleep(3000);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);

                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);

                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains",SONumber);

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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_DiffLots.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_DiffLots.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_DiffLots.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_DiffLots.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0005 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_DiffLots.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');

            });


            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipment>');
                mailbox.back();
                browser.sleep(2000);
            });

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("Joliet-DC");
            inventorySearch.addSKU();
//            inventorySearch.searchSKU("Name","DAMAGED-FM");
             commons.searchWithCriteria("SKU","contains","DAMAGED-FM");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('70');
            browser.sleep(2000);


        });


        it('Shipment confirmation - multiple SKUs attached to single product - TC0007', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathP1");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("1");
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathP2");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.enterQty("1");
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
//                commons.searchWithCriteria("Order #","contains",SONumber);
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
                var filename1 = process.cwd()+'/autoFiles/ShipConfirm_TwoLines_MultiSKU.XML';

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
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines_MultiSKU.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines_MultiSKU.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
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
                            paths: [process.cwd()+'/autoFiles/ShipConfirm_TwoLines_MultiSKU.XML'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });

                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                browser.sleep(2000);
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0007 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/ShipConfirm_TwoLines_MultiSKU.XML";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
//                commons.searchWithCriteria("Order #","contains",SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.get(salesOrderUrl);
                commons.multiselect();
//                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(2000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');

            });

            browser.wait(function() {
                return ShipmentRequestNumber != '';
            }).then(function() {
                browser.get(mailboxUrl);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
                mailbox.selectMailbox("ShipmentConfirmation-toTHK");
//                mailbox.mailboxSearch("ShipmentNumber",ShipmentRequestNumber);
                commons.searchWithCriteria("Subject","contains",ShipmentRequestNumber)
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipment>');
                mailbox.back();
                browser.sleep(2000);
            });

           });


        it('Cancel FTA order - TC0008', function(){

                   browser.get(salesOrderUrl);

                    console.log("navigating to sales order list screen");
                    commons.new();
                    browser.driver.sleep(5000);
                    browser.waitForAngular();

                    salesOrderCreate.setSalesChannel("B2C");
                    browser.driver.sleep(5000);
                    salesOrderCreate.attachCustomer();

                    salesOrderCreate.searchCustomer("Name", "TC0001");
                    browser.sleep(2000);
                    salesOrderCreate.selectCustomer();
                    browser.sleep(2000);
                    salesOrderCreate.useSelectedCustomer();
                    browser.driver.sleep(5000);
                    salesOrderCreate.confirmCustomerAddress();
                    browser.sleep(3000);
                    salesOrderCreate.addItem();
                    salesOrderCreate.searchProduct("B4");
                    salesOrderCreate.searchInPopup();
                    salesOrderCreate.selectSKU();
                    salesOrderCreate.enterQty("4");
                    salesOrderCreate.addProduct();

                    salesOrderCreate.saveOption("Save as Draft");

                    salesOrderCreate.salesOrderNumber().then(function(value) {
                        SONumber = value;
                        console.log(SONumber);
                    });

                    salesOrderCreate.saveOption("Save");

                    browser.wait(function() {
                        return SONumber != '';
                    }).then(function() {
                        browser.get(salesOrderUrl);
        //                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                        commons.searchWithCriteria("Order #","contains",SONumber);
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

                        browser.get(shipmentRequestsUrl);
                        browser.sleep(3000);
                        shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
        //                commons.searchWithCriteria("Order #","contains",SONumber);
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
                        var filename1 = process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML';

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
                            stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                                var searchedLine = resultArr[0].text;
                                currentSONumber = searchedLine.trim();
                                var replace1 = require("replace");
                                var replaceString1 = "<orderNumber>"+SONumber+"</orderNumber>";
                                replace1({
                                    regex: currentSONumber,
                                    replacement: replaceString1,
                                    paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                                    recursive: true,
                                    silent: true,
                                });
                            });
                        });

                        browser.wait(function() {
                            return content != '';
                        }).then(function() {
                            stringSearcher.find(content,"<originalOrderNumber>.*</originalOrderNumber>").then(function(resultArr) {
                                var searchedLine = resultArr[0].text;
                                currentSONumber = searchedLine.trim();
                                var replace1 = require("replace");
                                var replaceString1 = "<originalOrderNumber>"+SONumber+"</originalOrderNumber>";
                                replace1({
                                    regex: currentSONumber,
                                    replacement: replaceString1,
                                    paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                                    recursive: true,
                                    silent: true,
                                });
                            });
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
                                    paths: [process.cwd()+'/autoFiles/ShipConfirm_SingleLineZeroQty.XML'],
                                    recursive: true,
                                    silent: true,
                                });
                            });
                        });

                        browser.get(mailboxUrl);
                        browser.sleep(5000);
                        mailbox.selectMailboxType("intermediateboxes");
                        browser.sleep(2000);
                        mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
                        browser.sleep(2000);
                        mailbox.selectMailbox("ShipmentConfirmation-Canonical");
                        mailbox.selectMailbox("ShipmentConfirmation-Canonical");

                        mailbox.refresh();

                        browser.getCurrentUrl().then(function (url) {
                            var currentUrl = url;
                            var newMsgUrl = url + "new-message";
                            browser.get(newMsgUrl);
                        });

                        mailbox.enterTo(browser.params.login.user);
                        mailbox.enterFrom(browser.params.login.user);
                        mailbox.enterSubject("TC0003 Shipment confirmation upload");
                        mailbox.addAttachment();
                        var cwd = process.cwd();
                        var fullPath = cwd + "/autoFiles/ShipConfirm_SingleLineZeroQty.XML";
                        mailbox.clickSelectFile(fullPath);
                        mailbox.uploadFile();
                        mailbox.close();

                        browser.sleep(2000);

                        browser.get(routeUrl);
                        browser.sleep(2000);
        //                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                        commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                        browser.sleep(2000);
                        route.routeSelectButton("Start");
                        browser.sleep(5000);
                        route.routeSelectButton("Stop");
                        browser.sleep(2000);

                        browser.get(routeUrl);
                        browser.sleep(2000);
        //                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                        commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
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
        //                commons.searchWithCriteria("Order #","contains",SONumber);
                        expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('REJECTED');
                        browser.get(salesOrderUrl);
                        commons.multiselect();
        //                salesOrderSummary.salesOrderSearch("Order #", SONumber);
                        commons.searchWithCriteria("Order #","contains",SONumber);
                        browser.sleep(2000);
                        expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO ALLOCATE');
                        browser.sleep(4000);
                        salesOrderSummary.salesOrderSelectGear("Cancel");
                        browser.sleep(3000);
                        expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELLED');


            });
   });



})

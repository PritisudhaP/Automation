var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";


describe('Sales Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var commons = new common();

        it('Sales order that release successfully - TC0001', function(){
             
            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen"); 
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2C");           
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Email", "Sarath Newyork");
	 //   commons.search();
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();
            
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();   
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
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                //salesOrderSummary.salesOrderSearch("Status","OPEN");


                commons.multiselect();
                browser.sleep(2000); 
            
                salesOrderSummary.salesOrderSelectGear("Release");           
                browser.sleep(30000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
           
            });
 
            browser.get(shipmentRequestsUrl);

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                console.log(SONumber);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
                browser.sleep(3000);
                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                browser.sleep(8000);
                shipmentRequestsCreate.acknowledgeLineItem("1");
                shipmentRequestsCreate.confirmAcknowledgement();
                shipmentRequestsCreate.createShipment();
                shipmentRequestsCreate.packageSelection("S2");
                shipmentRequestsCreate.enterItemQty("1");
                shipmentRequestsCreate.addPackageToShipment();
                shipmentRequestsCreate.finalizeShipment();
                browser.sleep(5000);
                browser.get(shipmentRequestsUrl);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
                browser.sleep(2000);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
            });
        });


/*
        it('Sales order that results in FTA - TC0002', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.sleep(5000);
            salesOrderCreate.setSalesChannel("Retail_Ecommerce");

            commons.customerLookup();

            salesOrderCreate.searchCustomer("Email", "sbabu@3test.com");
            //commons.search();
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.setRefNumber("TC0002");
            salesOrderCreate.setBillingCode("BC0002");

            salesOrderCreate.selectShipIt();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("GBRASSMLBZ");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.setItemQty(100);
            salesOrderCreate.addProduct();

            salesOrderCreate.setCarrier("FEDEX");
            salesOrderCreate.setService("FedExStandardOvernight");

            commons.save();

            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0002");
            salesOrderSummary.salesOrderSearch("Status", "OPEN");
            commons.multiselect();
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(30000);
            salesOrderSummary.salesOrderSearchRemove("1");
            salesOrderSummary.salesOrderSearchRemove("1");
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0002");
            expect(salesOrderSummary.salesOrderStatus()).toEqual('FTA');

        });


        it('Whole sale order that release successfully - TC0003', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();

            salesOrderCreate.setSalesChannel("Wholesale");

            commons.customerLookup();

            salesOrderCreate.searchCustomer("Email","sbabu@3test.com");
            //commons.search();
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.setRefNumber("TC0003");
            salesOrderCreate.setBillingCode("BC0003");

            salesOrderCreate.selectShipIt();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("GBRASSMLBZ");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.setCarrier("FEDEX");
            salesOrderCreate.setService("FedExGround");

            commons.save();

            browser.sleep(2000);
            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0003");
            salesOrderSummary.salesOrderSearch("Status", "OPEN"); 
            commons.multiselect();           
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(30000);
            salesOrderSummary.salesOrderSearchRemove("1");
            salesOrderSummary.salesOrderSearchRemove("1");
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            browser.sleep(60000);
            browser.get(salesOrderUrl);
            browser.sleep(60000);
 
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0003");            
            browser.sleep(2000);
            commons.multiselect();
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');

        });

        it('Sales order with future release date - TC0004', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            browser.sleep(5000);
            commons.new();
            salesOrderCreate.setSalesChannel("Retail_Ecommerce");

            commons.customerLookup();

            salesOrderCreate.searchCustomer("Email","sbabu@3test.com");
            //commons.search();
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.setRefNumber("TC0004");
            salesOrderCreate.setBillingCode("BC0004");

            salesOrderCreate.selectShipIt();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("GBRASSMLBZ");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.setItemQty(1);
            salesOrderCreate.addProduct();

            salesOrderCreate.setCarrier("FEDEX");
            salesOrderCreate.setService("FedExInternationalEconomy");

            commons.save();

            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0004");
            salesOrderSummary.salesOrderSearch("Status", "OPEN");
            commons.multiselect();
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("View");
            
            salesOrderCreate.editDelayedRelease();
            
            salesOrderCreate.enterDelayedReleaseDate("01/01/2050");
            salesOrderCreate.editPromiseDate();
            browser.sleep(4000);
            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", "TC0004");
            salesOrderSummary.salesOrderSearch("Status", "OPEN");
            commons.multiselect();
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("Release");
            var temp = "cannot be released as it has a delayed release date with a future date";
            expect(salesOrderCreate.popupAlertText()).toMatch(temp);

        });
*/

})

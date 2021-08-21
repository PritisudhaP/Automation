var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
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

            salesOrderCreate.searchCustomer("Name", "TC0001");
	 //   commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("B4");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathSCLProduct0001");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();



            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            browser.sleep(2000)

            salesOrderCreate.saveOption("Save");
            browser.sleep(2000)
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

        });

        it('Sales order with Ship Alones False - SCL THK now has ship alone true for all - earlier FTA, now release with 2 shipment requests - TC0002', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
	 //   commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.sleep(2000);

            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("TUERMERIC 5");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();
            browser.sleep(2000);

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("BJER3");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();
            browser.sleep(2000);

            salesOrderCreate.saveOption("Save as Draft");
            browser.sleep(2000)
            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            salesOrderCreate.saveOption("Save");
            browser.sleep(2000);

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
              //  commons.cancel();
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });

        });


        it('Sales order with Ship Alones True - Partially Released - TC0003', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2B");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
	 //   commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();

            browser.sleep(2000);
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("FOOD 10");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("DAMAGED-BR");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });
            browser.sleep(2000);
            salesOrderCreate.saveOption("Save");
            browser.sleep(2000);
            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                commons.searchWithCriteria("Order #","contains",SONumber);

                commons.multiselect();
                browser.sleep(2000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');

            });

        });


        it('Sales order with Ship Alones True - Ship Complete - FTA - TC0004', function(){

            browser.get(salesOrderUrl);

            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2B");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
	 //   commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            browser.sleep(3000);

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("FOOD 10");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("DAMAGED-BR");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.setShipComplete();
            browser.sleep(2000);

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
                browser.sleep(2000);

                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                commons.cancel();
                expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO ALLOCATE');

            });

        });



})

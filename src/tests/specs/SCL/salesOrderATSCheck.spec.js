var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');

var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";


describe('Sales Order Flow with ATS check : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var commons = new common();

    it('Sales order ATS check at sku level - TC0001', function(){
             
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
            salesOrderCreate.searchProduct("DAMAGED-FM");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();   
            expect(salesOrderCreate.getSKUATSValue()).toMatch('50');
            salesOrderCreate.addProduct();


            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathSCLProduct0001");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            expect(salesOrderCreate.getSKUATSValue()).toMatch('176');
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
                commons.searchWithCriteria("Order #","contains",SONumber);

                commons.multiselect();
                browser.sleep(3000);

                salesOrderSummary.salesOrderSelectGear("View");
                salesOrderEdit.editLine("Edit Line","view","dummy");
                expect(salesOrderEdit.salesOrderLineEditGetATS()).toMatch('50');
            });

        });

})

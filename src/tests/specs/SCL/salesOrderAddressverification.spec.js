var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');

var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.SONumber="";


describe('Sales Order Flow with address verification : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var commons = new common();

        it('Sales order check address verification - TC0001', function(){
             
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
            expect(salesOrderCreate.getSuggestedAddressText()).toMatch('QUALITY SCORE: 0');
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000); 
            
            salesOrderEdit.salesOrderEditShipToAddress();
            salesOrderEdit.salesOrderEditShipToAddressConfirm();
            expect(salesOrderCreate.getSuggestedAddressText()).toMatch('QUALITY SCORE: 0');
            salesOrderCreate.confirmCustomerAddress();            
            browser.sleep(3000); 
            
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

            browser.sleep(2000);

            salesOrderCreate.saveOption("Save");
            browser.sleep(2000);

            salesOrderEdit.salesOrderEditShipToAddress();
            salesOrderEdit.salesOrderEditShipToAddressConfirm();
            expect(salesOrderCreate.getSuggestedAddressText()).toMatch('QUALITY SCORE: 0');
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(2000);
        });

})

var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";


describe('Sales Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();

    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString();


    it('Sales order that release successfully - TC0001', function(){
             
            browser.get(salesOrderUrl);
            browser.driver.sleep(5000);
            console.log("navigating to sales order list screen"); 
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("FULFILLMENT");           
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            salesOrderCreate.searchCustomer("Name", "MUSICA");
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            
            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("0-0-1");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();   
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("0-0-1");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();



            salesOrderCreate.saveOption("Save");
            
            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            browser.sleep(2000)

//            salesOrderCreate.saveOption("Save");
            browser.sleep(2000)
            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                //salesOrderSummary.salesOrderSearch("Status","OPEN");


                commons.multiselect();
                browser.sleep(3000); 
            
                salesOrderSummary.salesOrderSelectGear("Release");           
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });
 
    });


})

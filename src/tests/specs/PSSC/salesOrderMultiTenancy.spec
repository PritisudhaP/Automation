var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";


describe('Sales Order Flow  with multitenancy: ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();

    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString();


    it('Sales order created for SPECIALTY PRESS customer but picks products from SPECIALTY PRESS, SUNRISE RIVER, CARTECH - TC0001', function(){
             
            browser.get(salesOrderUrl);
            browser.driver.sleep(5000);
            console.log("navigating to sales order list screen"); 
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("FULFILLMENT");           
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            salesOrderCreate.searchCustomer("Name", "SPECIALTY");
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.sleep(2000);
            salesOrderCreate.addItem();
            commons.searchWithCriteria("SKU","is","DVD635");
            salesOrderCreate.selectSKU();   
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            commons.removeSearchFilter();
            browser.sleep(1000);
            commons.searchWithCriteria("SKU","is","SA388");
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.addItem();
            commons.removeSearchFilter();
            browser.sleep(1000);
            commons.searchWithCriteria("SKU","is","AD560");
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

    it('Sales order created for BOSTON SYMPHONY ORCHESTRA but picks shared SKU MANOS from BOSTON SYMPHONY ORCHESTRA, BOYDELL & BREWER - TC0002', function(){
             
            browser.get(salesOrderUrl);
            browser.driver.sleep(5000);
            console.log("navigating to sales order list screen"); 
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("FULFILLMENT");           
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Number","contains","BSOR");
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
             browser.sleep(2000);
            salesOrderCreate.addItem();
            commons.searchWithCriteria("SKU","is","MANOS");
            browser.sleep(1000);
            salesOrderCreate.selectAllSKU();   
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


    it('Sales order created for BOSTON SYMPHONY ORCHESTRA but picks shared SKU BGBSarathShared01 from BOSTON SYMPHONY ORCHESTRA, BOYDELL & BREWER - TC0003', function(){
             
            browser.get(salesOrderUrl);
            browser.driver.sleep(5000);
            console.log("navigating to sales order list screen"); 
            commons.new(); 
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("FULFILLMENT");           
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            commons.searchWithCriteria("Customer Number","contains","BSOR");
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();
            browser.sleep(2000);
            salesOrderCreate.addItem();
            commons.searchWithCriteria("SKU","is","BGBSarathShared01");
            browser.sleep(1000);
            salesOrderCreate.selectAllSKU();   
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

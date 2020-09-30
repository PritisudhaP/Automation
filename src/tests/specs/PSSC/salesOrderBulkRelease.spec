var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber1="";
global.SONumber2="";

global.currentInventoryCount="";
global.updatedInventoryCount="";


describe('Sales Order Bulk Release Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var inventorySearch = new inventorySearchScreen();
    var mailbox = new mailboxScreen();
    var commons = new common();

    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString();


    it('Sales order bulk release - TC0001', function(){
             
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

            salesOrderCreate.saveOption("Save");
            
            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber1 = value;
                console.log(SONumber1);
            });

            browser.sleep(2000)


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
            browser.sleep(2000); 
            salesOrderCreate.addItem();
            browser.sleep(2000);
            salesOrderCreate.searchProduct("0-0-1");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();   
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save");
            
            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber2 = value;
                console.log(SONumber2);
            });

            browser.sleep(2000)

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("Fitchburg-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("Name","contains","ONE THOUSAND YEARS OF RUSSIAN CHURCH MUSIC");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);

            inventorySearch.getAvailableQty().then(function(value) {
                currentInventoryCount = value;
                updatedInventoryCount = parseInt(currentInventoryCount) - 2;
             });



            browser.wait(function() {
                return SONumber2 != '';
            }).then(function() {
                browser.get(salesOrderUrl);
               
                commons.searchWithCriteria("Order #","contains",SONumber1);
                commons.searchWithCriteria("Order #","contains",SONumber2); 
                salesOrderSummary.salesOrderMatchFilter("Matching Any");
                
                commons.multiselect();
                browser.sleep(3000); 
            
                salesOrderSummary.multiSalesorderAction("Release");           
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

                browser.get(inventorySearchUrl);
                inventorySearch.enterSite("Fitchburg-DC");
                inventorySearch.addSKU();
                commons.searchWithCriteria("Name","contains","ONE THOUSAND YEARS OF RUSSIAN CHURCH MUSIC");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual(updatedInventoryCount.toString());


                browser.get(mailboxUrl);
                browser.sleep(2000);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentRequests-Fitchburg");
                mailbox.selectMailbox("ShipmentRequests-Fitchburg");
                mailbox.selectMailbox("ShipmentRequests-Fitchburg");
                temp1 = "Order-" + SONumber1;
                commons.searchWithCriteria("Subject","contains",temp1);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipmentRequest>');
                mailbox.back();
                browser.sleep(2000);
                
                browser.get(mailboxUrl);
                browser.sleep(2000);
                mailbox.selectMailboxType("intermediateboxes");
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentRequests-Fitchburg");
                mailbox.selectMailbox("ShipmentRequests-Fitchburg");
                mailbox.selectMailbox("ShipmentRequests-Fitchburg");
                temp1 = "Order-" + SONumber2;
                commons.searchWithCriteria("Subject","contains",temp1);
                browser.sleep(2000);
                mailbox.msgSelectGear("Edit");
                mailbox.fileView();
                expect(mailbox.fileContentOnScreen()).toMatch('<shipmentRequest>');
                mailbox.back();
                browser.sleep(2000);





            });
 
    });


})

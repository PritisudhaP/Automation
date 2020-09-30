var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuEditScreen = require(process.cwd() + '/src/tests/screens/sku/sku.edit.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var inventoryPoolSummaryScreen = require(process.cwd() + '/src/tests/screens/inventoryPool/inventoryPool.summary.screen.js');
var inventoryPoolEditScreen =require(process.cwd() + '/src/tests/screens/inventoryPool/inventoryPool.edit.screen.js');
var scriptSummaryScreen =require(process.cwd() + '/src/tests/screens/scripts/script.summary.screen.js');
var scriptEditScreen = require(process.cwd() + '/src/tests/screens/scripts/script.edit.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var jobsSummaryScreen = require(process.cwd() + '/src/tests/screens/jobs/jobs.summary.screen.js');


global.SONumber="";
global.count="";
global.reservedCount="";



  describe('Presale E2EFlow: ', function(){

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var skuCreate = new skuCreateScreen();
   var skuEdit = new skuEditScreen();
   var skuSummary = new skuSummaryScreen();
        var salesOrderSummary = new salesOrderSummaryScreen();
        var mailbox = new mailboxScreen();
        var inventoryPoolSummary = new inventoryPoolSummaryScreen();
        var inventoryPoolEdit = new inventoryPoolEditScreen();
        var scriptrSummary = new scriptSummaryScreen();
        var scriptEdit = new scriptEditScreen();
      var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();
      var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
        var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();



   it('Presale E2E  - TC0001', function(){
// Enter presale for a sku

           browser.get(callcenterskuUrl);
                browser.sleep(5000);
                commons.searchWithCriteria("SKU","contains","Presalesku");
                commons.multiselect();
                skuSummary.skuSelectGear("Edit");
                skuCreate.selectPresale();
                browser.sleep(5000);
                skuCreate.clickOnAdd();
var date = new Date();
date.setDate(date.getDate()-2);
var startdate=(date.getMonth() + 1)+'/'+(date.getDate())+'/'+(date.getFullYear());
var endDate = new Date();
endDate.setDate(date.getDate()+3);
endDate = (endDate.getMonth() + 1)+'/'+(endDate.getDate())+'/'+(endDate.getFullYear());
var shippingDate = new Date();
shippingDate.setDate(shippingDate.getDate());
shippingDate = (shippingDate.getMonth() + 1)+'/'+(shippingDate.getDate())+'/'+(shippingDate.getFullYear());
console.log("startDate is " +startdate);
console.log("endDate is "+endDate);
console.log("shippingDate is "+shippingDate);


   skuCreate.enterPresaleQuantity(5);
   skuCreate.enterPresaleStartDate(startdate);
   skuCreate.enterPresaleEndDate(endDate);
   skuCreate.enterPresaleshippedDate(shippingDate);
   skuCreate.clickOnCretePresale();
   browser.sleep(3000);
   skuCreate.saveSku();



// Verify Presale label in the sku deatils

 browser.get(callcenterskuUrl);
    browser.sleep(5000);
    commons.searchWithCriteria("SKU","contains","Presalesku");
    commons.multiselect();
    skuSummary.skuSelectGear("Edit");
    browser.sleep(3000);
expect(skuCreate.getLabelOfPresale()).toEqual('ON-PRESALE');



// Navigate to inventory lookup screen and verify quantity with default site

                browser.get(inventorySearchUrl);
                inventorySearch.enterSite("DEFAULT_PRESALE_SITE");
                inventorySearch.addSKU();
                commons.searchWithCriteria("SKU","contains","Presalesku");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("0");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                inventorySearch.countInbound().then(function(value){
                count = value;
                });
                browser.wait(function() {
                 return count != '';
                  }).then(function() {
                   count = count.replace("(view)","");
                   console.log("value after replace "+count);
                   count= count.trim();
                    console.log("value after trim "+count);
                    expect(count).toEqual('5');
                    });


//Navigate to callcenter salesorder screen and create a sales order with sku Presalesku

           browser.get(callcentersalesorderUrl);
            browser.sleep(2000);
             commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();
            salesOrderCreate.callcenterAttachCustomer();
            browser.driver.sleep(6000);
            browser.waitForAngular();
          salesOrderCreate.callcenterSearchCustomer("wendy");
            browser.driver.sleep(3000);

           salesOrderCreate.selectCustomer();
             salesOrderCreate.useSelectedCustomer();
             browser.sleep(3000);
            salesOrderCreate.searchProductofcallcenter('Presalesku');
            browser.sleep(5000);
            expect(salesOrderCreate.verifypresaletextonSearch()).toEqual('ON-PRESALE');
            salesOrderCreate.selectProductofcallcenter();
            salesOrderCreate.search();
           browser.sleep(5000);
           expect(salesOrderCreate.verifypresalelabelAtskulevel()).toEqual('ON PRESALE');
           expect(salesOrderCreate.verifyfuturequantity()).toEqual('5');
           expect(salesOrderCreate.verifyinboundQuantity()).toEqual('5');
           salesOrderCreate.selecttheProduct();
           salesOrderCreate.addTOorder();
           browser.sleep(5000);
           salesOrderCreate.saveOption("Save as Draft");
           salesOrderCreate.salesOrderNumber().then(function(value) {
                           SONumber = value;
                           console.log(SONumber);
                       });

              salesOrderCreate.saveOption("Save");

              browser.wait(function() {
                              return SONumber != '';
                          }).then(function() {
                              browser.get(callcentersalesorderUrl);
                             commons.searchWithCriteria("Order #","contains",SONumber);



                           //   commons.multiselect();
                              browser.sleep(2000);

                              salesOrderSummary.salesOrderSelectGear("Release");
                              browser.sleep(3000);
                              expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED');

                          });


               browser.get(callcentersalesorderUrl);
//change here while running full
              //  commons.searchWithCriteria("Order #","contains",SONumber);
              commons.searchWithCriteria("Order #","contains",SONumber);

                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
                expect(salesOrderSummary.verifySkuStatus()).toEqual('ALLOCATED');
                salesOrderSummary.clickOnReservationsTab();
                browser.sleep(3000);
                expect(salesOrderSummary.verifyReservationText()).toEqual('PRESALESKU PRESALESKU 1 UNCONSUMED DEFAULT_PRESALE_SITE DISTRIBUTIONCENTER');








//Navigate to inventory pool screen and attach sku

       browser.get(inventoryPoolUrl);
       inventoryPoolSummary.inventoryPoolSearch("Name","Joliet-dc");
       commons.multiselect();
       inventoryPoolSummary.inventoryPoolSelectGear('Edit');
       browser.sleep(3000);
       inventoryPoolEdit.clickOnAttachsku();
       inventoryPoolEdit.searchProduct('Presalesku');
       browser.sleep(5000);
       inventoryPoolEdit.selectProduct();
       inventoryPoolEdit.clickOnAddsku();
       browser.sleep(3000);


//Navigate to script screen to execute the script

     browser.get(scriptUrl);
     scriptrSummary.searchScript('Generate event for inbound shipment reconcilen');
     browser.sleep(2000);
       commons.multiselect();
       scriptrSummary.scriptSelectGear('Edit');
       browser.sleep(2000);
       scriptEdit.clickOnExecute();
       browser.sleep(3000);
       scriptEdit.enterRefName('joliet-dc');
       scriptEdit.enterSku('Presalesku');
       scriptEdit.enterQuantity(5);
       scriptEdit.clickOnExecuteOfscript();
       browser.sleep(5000);

//Navigate to route
                 browser.get(routeUrl);
                browser.sleep(2000);
                commons.searchWithCriteria("Name","contains","InventorySync-processPresaleEvent");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);


//Navigate to inventory Lookup Screen
browser.get(inventorySearchUrl);
                inventorySearch.enterSite("Joliet-Dc");
                inventorySearch.addSKU();
                commons.searchWithCriteria("SKU","contains","Presalesku");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("1");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('4');
                inventorySearch.getReservedQty().then(function(value){
                reservedCount = value;
                });
                browser.wait(function() {
                 return reservedCount != '';
                  }).then(function() {
                   reservedCount = reservedCount.replace("(view)","");
                   console.log("value after replace "+count);
                   reservedCount= reservedCount.trim();
                    console.log("value after trim "+reservedCount);
                    expect(reservedCount).toEqual('1');
                    });

//Navigate to sales order screen
browser.get(callcentersalesorderUrl);
//change here while running full
              //  commons.searchWithCriteria("Order #","contains",SONumber);
              commons.searchWithCriteria("Order #","contains",SONumber);

                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(3000);
               // expect(salesOrderSummary.verifySkuStatus()).toEqual('ALLOCATED');
                salesOrderSummary.clickOnReservationsTab();
                browser.sleep(3000);
                expect(salesOrderSummary.verifyReservationText()).toEqual('PRESALESKU PRESALESKU 1 UNCONSUMED JOLIET-DC DISTRIBUTIONCENTER');
  browser.get(callcentersalesorderUrl);
            //    commons.searchWithCriteria("Order #","contains",SONumber);
            //change here while running full

          commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(3000);
                salesOrderSummary.salesOrderSelectGear("Release");
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');


// Do the shipments and verify shipment status and order status
            browser.get(shipmentRequestsUrl);
                            //change here while running full

                  commons.searchWithCriteria("Order #","contains",SONumber);

                                browser.sleep(3000);
                                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                                browser.sleep(3000);
                                shipmentRequestsCreate.createShipment();
                                shipmentRequestsCreate.doNotGenerateLabel('Uncheck');
                                shipmentRequestsCreate.packageSelection("TestBox1");
                                shipmentRequestsCreate.enterItemQty("1");
                                shipmentRequestsCreate.addPackageToShipment();
                                shipmentRequestsCreate.finalizeShipment();
                                browser.sleep(4000);

                                browser.get(shipmentRequestsUrl);
                                //change here while running full
                  commons.searchWithCriteria("Order #","contains",SONumber);
                                browser.sleep(2000);
                                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');


browser.get(callcentersalesorderUrl);
            //    commons.searchWithCriteria("Order #","contains",SONumber);
            //change here while running full

          commons.searchWithCriteria("Order #","contains",SONumber);
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');


//Navigate to inventory lookup and check ATS and reserved qty
browser.get(inventorySearchUrl);
                inventorySearch.enterSite("Joliet-Dc");
                inventorySearch.addSKU();
                commons.searchWithCriteria("SKU","contains","Presalesku");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("1");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('4');
                expect(inventorySearch.getReservedQty()).toEqual('0');

// Navigate to sku screen and remove presell data
 browser.get(callcenterskuUrl);
                browser.sleep(5000);
                commons.searchWithCriteria("SKU","contains","Presalesku");
                commons.multiselect();
                skuSummary.skuSelectGear("Edit");
                skuCreate.selectPresale();
                browser.sleep(5000);

                skuCreate.removePresale();
                browser.sleep(2000);
                skuCreate.clickOnDelete();
                browser.sleep(3000);
                skuCreate.saveSku();

//Navigate to inventory pool to delete inventory
       browser.get(inventoryPoolUrl);
       inventoryPoolSummary.inventoryPoolSearch("Name","Joliet-dc");
       commons.multiselect();
       inventoryPoolSummary.inventoryPoolSelectGear('Edit');
       browser.sleep(3000);
    inventoryPoolEdit.searchsku('Presalesku');
    browser.sleep(4000);
    commons.multiselect();
     inventoryPoolEdit.clickOnSku();
    browser.sleep(4000);
    inventoryPoolEdit.clickOnDeleteSku();
    browser.sleep(2000);
       browser.get(inventoryPoolUrl);
       inventoryPoolSummary.inventoryPoolSearch("Name","DEFAULT_PRESALE_INVENTORY_POOL");
       commons.multiselect();
       inventoryPoolSummary.inventoryPoolSelectGear('Edit');
       browser.sleep(3000);
    inventoryPoolEdit.searchsku('Presalesku');
    browser.sleep(4000);
    commons.multiselect();
     inventoryPoolEdit.clickOnSku();
    browser.sleep(4000);
    inventoryPoolEdit.clickOnDeleteSku();
    browser.sleep(2000);




















          });

})

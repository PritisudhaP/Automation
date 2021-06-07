var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.orderStatus = "";
global.SONumber = "";
global.ATS1 = "";
global.Res1 = "";
global.ATS2 = "";
global.Res2 = "";
global.ATSafterCancel1 = "";
global.ResafterCancel1 = "";
global.ATSafterCancel2 = "";
global.ResafterCancel2 = "";
global.incQtySave = "";
global.incQtySave = "";
global.availabletoCancel = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();

    
    //Verify ATS and reserved qty while cancelling whole line.
    //Verify ATS and reserved qty while cancelling partial line.
  it('Verifying ATS and reserved qty while cancelling an order at Line Level ', function () {

	  browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      browser.sleep(1000);
      commons.search();
      browser.sleep(1000);
      callCenter.invSelection(1);
      browser.sleep(1000);
      //>>>>>>>>>>>Before release Inventory levels>>>>>>>>>>
      callCenter.inventoryDetailsCount("9").then(function (totalAvailableValue) {
    	  ATS1 = totalAvailableValue;
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);
          browser.sleep(1000);
      });
      browser.sleep(1000);
      callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
    	  Res1 = reservedValue;
          browser.sleep(1000);
          console.log("pre-release reserved count"+Res1);        
          browser.sleep(1000);
      });
  
      commons.cancel();
      browser.sleep(1000);     
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      browser.sleep(2000);
      callCenter.attachCustomer();
      browser.sleep(2000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custDisplayName);
      browser.sleep(3000);
      salesOrderCreate.selectCustomer();
      browser.sleep(2000);
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(1000);
      callCenter.editLineGear("3");
      callCenter.lineItemselectOptions("Edit Line");
      browser.sleep(1000);
      callCenter.editSKUQuantity(browser.params.Incqty);
      browser.sleep(1000);
      callCenter.editLinePopUpSaveBtn(); 
      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
      browser.sleep(300);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		
		browser.wait(function () {
            return SONumber != '';
        }).then(function () {
           browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          });	 
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	       browser.sleep(2000);
//Verify ATS and reserved qty while cancelling partial line
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	        browser.sleep(1000);
	        salesOrderSummary.CanclQTY(1)
	        salesOrderSummary.CanclReason("NotNeeded");
	        browser.sleep(1000);
	        salesOrderSummary.CNFButton();
	        browser.sleep(3000);
	        salesOrderSummary.lineDetails(1);
	        browser.sleep(500);
	        salesOrderSummary.inventoryOptionPane();
	        browser.sleep(1000);
	        //>>>>>>>>>>>After partial line cancel Inventory levels>>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSafterCancel1 = totalAvailableValue;
	           // postInventoryCount = totalAvailableQty - 1;
	            browser.sleep(1000);
	            console.log("available count after partially cancellig the line"+ATSafterCancel1);
	            browser.sleep(1000);
	            diff1=ATS1-ATSafterCancel1;
	            expect(diff1).toEqual((browser.params.Incqty)-1)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	      	  ResafterCancel1 = reservedValue;
	            //postResCount = reservedInventoryQty + 1;
	            browser.sleep(1000);
	            console.log("available reserved count after partially cancellig the line"+ResafterCancel1);        
	            browser.sleep(1000);
	            diff2=ResafterCancel1-Res1;
	            expect(diff1).toEqual((browser.params.Incqty)-1)
	        });  
	        salesOrderSummary.Done();
//Verify ATS and reserved qty while canceling the line completely	        
	        browser.sleep(1000);
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	        browser.sleep(1000);
	        salesOrderSummary.avaialbleTocancelQTY(5).then(function (value) {    
	        	Cancel = value;
	        	availabletoCancel = parseInt(Cancel);
			    console.log("Remaining qty to cancel "+availabletoCancel);	       
		        salesOrderSummary.CanclQTY(availabletoCancel)
		        salesOrderSummary.CanclReason("NotNeeded");
		        browser.sleep(1000);
		        salesOrderSummary.CancelNotes("This is a Test Cancellation");
		        browser.sleep(1000);
		        salesOrderSummary.CNFButton();
	        });
	        browser.sleep(1000);
	        salesOrderSummary.lineDetails(1);
	        browser.sleep(500);
	        salesOrderSummary.inventoryOptionPane();
	        browser.sleep(1000);
	        //>>>>>>>>>>>The Inventory levels after complete line cancel >>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSafterCancel2 = totalAvailableValue;
	           // postInventoryCount = totalAvailableQty - 1;
	            browser.sleep(1000);
	            console.log("available count after fully cancellig the line"+ATSafterCancel2);
	            browser.sleep(1000);
	            //diff1=ATS1-ATSafterCancel1;
	            expect(ATS1).toEqual(ATSafterCancel2)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	      	  ResafterCancel2 = reservedValue;
	            //postResCount = reservedInventoryQty + 1;
	            browser.sleep(1000);
	            console.log(" available reserved count after fully cancellig the line"+ResafterCancel2);        
	            browser.sleep(1000);
	            expect(Res1).toEqual(ResafterCancel2);
	        });  
	        salesOrderSummary.Done();
	        
        });
		
   });
});
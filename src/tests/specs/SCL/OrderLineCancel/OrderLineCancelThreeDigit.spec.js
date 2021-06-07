var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');


global.orderStatus = "";
global.SONumber = "";
global.ATS1 = "";
global.Res1 = "";
global.LineATS1 = "";
global.LineRes1 = "";
global.ATSAfterHeaderCancel1="";
global.ResAfterHeaderCancel1="";
global.ATSafterCancel1 = "";
global.ResafterCancel1 = "";
global.incQtySave = "";
global.incQtySave = "";
global.availabletoCancel = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	
  //Cancel qty with 2 digit at order level.
  it('canceling 3 digit QTY at Header Level ', function () {
	  
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
         // postInventoryCount = totalAvailableQty - 1;
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);
         // browser.sleep(1000);
      });
      browser.sleep(1000);
      callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
    	  Res1 = reservedValue;
          //postResCount = reservedInventoryQty + 1;
          browser.sleep(1000);
          console.log("pre-release reserved count"+Res1);        
          //browser.sleep(1000);
      });
      commons.cancel();
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
      callCenter.editSKUQuantity(150);//3 digit SKU
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
	       browser.sleep(1000);	       
	       callCenter.editLineGear(1);
	       callCenter.lineItemselectOptions("Cancel");
	       browser.sleep(1000);
	       salesOrderSummary.avaialbleTocancelQTY(5).then(function (value) {    
        	Cancel = value;
        	availabletoCancel = parseInt(Cancel);
		    console.log("Remaining qty to cancel "+availabletoCancel);	       
		    salesOrderSummary.CanclQTYHeaderLevel(1,availabletoCancel);
		    browser.sleep(1000);		       
		    salesOrderSummary.CanclReasonHeaderLevel(1, "NotNeeded");
		    browser.sleep(1000);
	        //salesOrderSummary.CancelNotes("This is a Test Cancellation");
	        //browser.sleep(1000);
	        salesOrderSummary.CNFButton();
	        });
	        browser.sleep(1000);
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELED");//after completely canceling the line item
	        salesOrderSummary.lineDetails(1);
		       browser.sleep(500);
		       salesOrderSummary.inventoryOptionPane();
		       browser.sleep(1000);
		     //>>>>>>>>>>>After complete header cancel Inventory levels>>>>>>>>>>
		        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
		        	ATSAfterHeaderCancel1 = totalAvailableValue;
		            browser.sleep(1000);
		            console.log("available count after complete  cancellation of line1: "+ATSAfterHeaderCancel1);
		            browser.sleep(1000);
		            expect(ATS1).toEqual(ATSAfterHeaderCancel1)
		        });
		        browser.sleep(1000);
		        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
		        	ResAfterHeaderCancel1 = reservedValue;
		            browser.sleep(1000);
		            console.log("available reserved count after complete  cancellation of line1: "+ResAfterHeaderCancel1);        
		            browser.sleep(1000);
		            expect(Res1).toEqual(ResAfterHeaderCancel1)
		       });  
		       salesOrderSummary.Done();
		       browser.sleep(500);
        });
	   
  	});
  
	 it('canceling 3 digit QTY at Line Level ', function () {
		  
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
	    	  LineATS1 = totalAvailableValue;
	          browser.sleep(1000);
	          console.log("pre-release available count"+LineATS1);
	          browser.sleep(1000);
	      });
	      browser.sleep(1000);
	      callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
	    	  LineRes1 = reservedValue;
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+LineRes1);        
	          browser.sleep(1000);
	      });
	  
	      commons.cancel();
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
	      callCenter.editSKUQuantity(150);//3digit sku
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
		        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELED");//after completely canceling the line item
		        salesOrderSummary.lineDetails(1);
			       browser.sleep(500);
			       salesOrderSummary.inventoryOptionPane();
			       browser.sleep(1000);
			     //>>>>>>>>>>>After complete header cancel Inventory levels>>>>>>>>>>
			        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
			        	ATSafterCancel1 = totalAvailableValue;
			            browser.sleep(1000);
			            console.log("available count after complete  cancellation of line1: "+ATSafterCancel1);
			            browser.sleep(1000);
			            expect(LineATS1).toEqual(ATSafterCancel1)
			        });
			        browser.sleep(1000);
			        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
			        	ResafterCancel1 = reservedValue;
			            browser.sleep(1000);
			            console.log("available reserved count after complete  cancellation of line1: "+ResafterCancel1);        
			            browser.sleep(1000);
			            expect(LineRes1).toEqual(ResafterCancel1)
			       });  
			       salesOrderSummary.Done();
		            browser.sleep(2000);
	
	        });
		   
  	});
  
});
	  
	  
	  
	  
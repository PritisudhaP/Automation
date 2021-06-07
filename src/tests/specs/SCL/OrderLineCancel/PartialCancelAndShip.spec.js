var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');


global.orderStatus = "";
global.SONumber = "";
global.ATS1 = "";
global.allocated = "";
global.backOrdered = "";
global.shipped = "";
global.cancelled = "";
global.released = "";
global.ATSafterCancel2 = "";
global.ResafterCancel2 = "";
global.availabletoCancel = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	
  //partialy released status cancel line item.
  it('Partial Cancel and Ship', function () {
	  
	  browser.get(InventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      salesOrderCreate.AddSkuOption();
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU4);
      salesOrderCreate.SelectFirstSKU(1)
      browser.sleep(1000);
      salesOrderCreate.useSelectedSkuOption();
      salesOrderCreate.minimumSkuQTYUpdate();
      salesOrderCreate.skuSearch();
      browser.sleep(500);
      callCenter.editLineGear("1"); 
      callCenter.lineItemselectOptions("Details");
      salesOrderCreate.invCountcheck().then(function (totalAvailableValue) {
    	  ATS1 = parseInt(totalAvailableValue);
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);  
          salesOrderCreate.entryAdjustment(ATS1,7,"Test Adjustment");//(available,entry need to get Adjusted,Reason)
          browser.sleep(5000);
      });      
      
      browser.get(callCenterInventoryUrl);
      browser.sleep(2000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU4);
      callCenter.selectSKUFromSearch();
      browser.sleep(500);
      commons.search();
      browser.sleep(500);
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      browser.sleep(1000);
      callCenter.attachCustomer();
      browser.sleep(1000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custDisplayName);
      browser.sleep(1000);
      salesOrderCreate.selectCustomer();
      browser.sleep(1000);
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(1000); 
      salesOrderCreate.incrementQty(9);
      browser.sleep(1000);
    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
      browser.sleep(2000);
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            });
            
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
 	       browser.sleep(2000);	 
 	       
 	      salesOrderEdit.orderQtyCheck(1).then(function (value) {    
 	            alted = value;
 	            allocated = alted.substring(10)
 	            console.log("Total allocated QTY "+allocated);
 	            expect(allocated).toEqual('7');
 	        });
 	      
 	     salesOrderEdit.orderQtyCheck(2).then(function (value) {    
	            boq = value;
	            backOrdered = boq.substring(12)
	            console.log("Total backordered QTY "+backOrdered);
 	            expect(backOrdered).toEqual("3");

	        });
 	     
 	    salesOrderEdit.orderQtyCheck(3).then(function (value) {    
	            ship = value;
	            shipped = ship.substring(8)
	            console.log("Total shipped QTY "+shipped);
	        });
 	    
 	   salesOrderEdit.orderQtyCheck(4).then(function (value) {    
            cncl = value;
            cancelled = cncl.substring(10)
            console.log("Total Cancelled QTY "+cancelled);
        });
 	  salesOrderEdit.orderQtyCheck(5).then(function (value) {    
          rlsd = value;
          released = rlsd.substring(9)
          console.log("Total released QTY "+released);
           expect(released).toEqual("7");

	     });	   	    
	 	 callCenter.editLineGear("3");
	     callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	     browser.sleep(1000);
	     salesOrderSummary.CanclQTY(5)
	     salesOrderSummary.CanclReason("NotNeeded");
	     browser.sleep(1000);
	     salesOrderSummary.CNFButton();
	     browser.sleep(3000);	 	  
        });
		
		browser.wait(function () {
            return SONumber != '';
        }).then(function () {
           browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });
            
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
 	        browser.sleep(2000);	 
 	       
 	      salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
 	            alted = value;
 	            allocated = alted.substring(10)
 	            console.log("Total allocated QTY "+allocated);
 	            expect(allocated).toEqual("5");
 	        });
 	      
 	     salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	            boq = value;
	            backOrdered = boq.substring(12)
	            console.log("Total backordered QTY "+backOrdered);
 	            expect(backOrdered).toEqual("0");

	        });
 	     
 	    salesOrderEdit.orderQtyCheckAfterRelease(3).then(function (value) {    
	            ship = value;
	            shipped = ship.substring(8)
	            console.log("Total shipped QTY "+shipped);
	        });
 	    
 	   salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
            cncl = value;
            cancelled = cncl.substring(10)
            console.log("Total Cancelled QTY "+cancelled);
            expect(cancelled).toEqual("5");

        });
 	  salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
          rlsd = value;
          released = rlsd.substring(9)
          console.log("Total released QTY "+released);
           expect(released).toEqual("5");

	     });	
 	  
 	//!*********fulfillment request**********!//	         
	      browser.get(fulfillmentRequestsUrl);
	      console.log("the sale sorder is "+SONumber)
	      browser.sleep(2000);
	      salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	      browser.sleep(1000); 
	      callCenter.fulfillmentOrderSelectGear("Create Shipment");
	      browser.sleep(1000);
	      callCenter.shipAccountselect(browser.params.shipaccount);
	      browser.sleep(1000);
	      callCenter.packageSelection(browser.params.packageValue);
	      browser.sleep(1000);
	      callCenter.packageTrackingNumber(1236547890);
	      callCenter.enterItemQty("1");
	      callCenter.unselectPkg();
	      callCenter.addPackageToShipment();
	      browser.sleep(1000);
	      callCenter.finalizeShipment();
	      browser.sleep(2000);
	      salesOrderSummary.shipmentRejectPopup("Product Damaged", "this is a Test")
	      salesOrderSummary.CNFButton();
	      browser.sleep(3000);

        });
		browser.wait(function () {
            return SONumber != '';
        }).then(function () {
           browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);          
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            });
            
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
 	       browser.sleep(2000);	 
 	       
 	      salesOrderEdit.orderQtyCheck(1).then(function (value) {    
 	            alted = value;
 	            allocated = alted.substring(10)
 	            console.log("Total allocated QTY "+allocated);
 	            expect(allocated).toEqual("1");
 	        });
 	      
 	     salesOrderEdit.orderQtyCheck(2).then(function (value) {    
	            boq = value;
	            backOrdered = boq.substring(12)
	            console.log("Total backordered QTY "+backOrdered);
 	            expect(backOrdered).toEqual('4');

	        });
 	     
 	    salesOrderEdit.orderQtyCheck(3).then(function (value) {    
	            ship = value;
	            shipped = ship.substring(8)
	            console.log("Total shipped QTY "+shipped);
 	            expect(shipped).toEqual('1');

	        });
 	   salesOrderEdit.orderQtyCheck(4).then(function (value) {    
           rej = value;
           Rejected = rej.substring(9)
           console.log("Total Rejected QTY "+Rejected);
            expect(shipped).toEqual("1");

       });
 	    
 	   salesOrderEdit.orderQtyCheck(5).then(function (value) {    
            cncl = value;
            cancelled = cncl.substring(10)
            console.log("Total Cancelled QTY "+cancelled);
            expect(cancelled).toEqual("5");

        });
 	  salesOrderEdit.orderQtyCheck(6).then(function (value) {    
          rlsd = value;
          released = rlsd.substring(9)
          console.log("Total released QTY "+released);
           expect(released).toEqual("1");

	     });	   	    	 
	     browser.sleep(3000);	 	  
        });
    });
  
});
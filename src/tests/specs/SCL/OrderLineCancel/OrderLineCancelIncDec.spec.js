var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');


global.orderStatus = "";
global.SONumber = "";
global.incQtyDraft = "";
global.decQtyDraft = "";
global.incQtySave = "";
global.availabletoCancel = "";
global.released = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var salesOrderEdit = new salesOrderEditScreen();

    //incrementing or decrementing the QTY if the order is in Draft status. 
    //Also, doing the same process if it is Open status.
  it('Increment or decrement QTY after Draft, Save & Release the order', function () {
	  	
	  browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(2000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      browser.sleep(2000);
      commons.search();
      browser.sleep(2000);
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      browser.sleep(3000);
      callCenter.attachCustomer();
      browser.sleep(2000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custDisplayName);
      browser.sleep(3000);
      salesOrderCreate.selectCustomer();
      browser.sleep(2000);
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(2000);	      
      salesOrderCreate.SaveAsDraft();
      browser.sleep(2000);
    //checking the Inc QTY in Draft      	
      salesOrderCreate.incrementQty(5);
	  browser.sleep(2000);
  	  salesOrderCreate.OrderItemCount().then(function (value) {    
		  qty = value;
          res = qty.substring(0, 2);
          incQtyDraft = parseInt(res);
          console.log("Icremented Quantity in draft "+incQtyDraft);
          expect(incQtyDraft).toEqual((browser.params.Incqty)+1);
	  });
	  
//checking the Dec QTY in Draft

	  browser.sleep(1000);
	  salesOrderCreate.decrementQTy(3);
      browser.sleep(3000);
	  salesOrderCreate.OrderItemCount().then(function (value) {    
		  qty = value;
          res = qty.substring(0, 2);
          decQtyDraft = parseInt(res);
          console.log("Decremented Quantity in draft "+decQtyDraft);
    	  expect(decQtyDraft).toEqual(browser.params.Decqty); //checking the inc QTY in Draft
 
	  });	  
	  
//!***************<<<< Below line is to SAVE the sales order >>>>>>********************!//
    browser.sleep(300);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		browser.sleep(2000);
		//checking the Inc QTY after  Save     
		salesOrderCreate.incrementQty(2);
		browser.sleep(2000);
		salesOrderCreate.OrderItemCount().then(function (value) {    
			qty = value;
		    res = qty.substring(0, 2);
		    incQtyDraft = parseInt(res);
		    console.log("Icremented Quantity in draft "+incQtyDraft);
		    expect(incQtyDraft).toEqual((browser.params.Incqty));
		});
		//checking the Dec QTY after Save is 
		browser.sleep(1000);
		expect(salesOrderCreate.decrementQTYDisabled()).toBe(true); //checking the DEC QTY in disabled
		browser.sleep(2000);		
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
//checking the Inc QTY after Release     
			salesOrderCreate.incrementQty(2);
			browser.sleep(2000);
			salesOrderCreate.OrderItemCount().then(function (value) {    
				qty = value;
			    res = qty.substring(0, 2);
			    incQtyDraft = parseInt(res);
			    console.log("Icremented Quantity in draft "+incQtyDraft);
			    expect(incQtyDraft).toEqual((browser.params.Incqty)+2);
			});
			
//checking the Released QTY after Increment  	
			salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
		          rlsd = value;
		          releas = rlsd.substring(9)
		          released=parseInt(releas);
		          console.log("Total released QTY "+released);
		           expect(released).toEqual(browser.params.Incqty);

			     });	
			
//checking the Dec QTY after Release is 
			browser.sleep(1000);
			expect(salesOrderCreate.decrementQTYDisabled()).toBe(true); //checking the DEC QTY in disabled
			browser.sleep(2000);

	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	        browser.sleep(1000);
//confirm button disabled checking no reason &QTY	        
	        expect(salesOrderSummary.cancelLineConfirmDisabled(8)).toBe(true);
//confirm button disabled checking without QTY	        
	        salesOrderSummary.QTYClear();
	        browser.sleep(1000);
	        salesOrderSummary.CancelNotes("This is a Test Cancellation");
	        browser.sleep(1000);
	        salesOrderSummary.CanclReason("NotNeeded");
	        browser.sleep(1000);
	        expect(salesOrderSummary.cancelLineConfirmDisabled(8)).toBe(true);
	        browser.sleep(1000);
//confirm button disabled checking without reason	        
	        salesOrderSummary.CanclQTY(2)
	        browser.sleep(1000);
	        salesOrderSummary.CanclReason("Select");
	        browser.sleep(500);
	        expect(salesOrderSummary.cancelLineConfirmDisabled(8)).toBe(true);
	        browser.sleep(1000);
//canceling the line Partially	        
	        salesOrderSummary.CanclQTY(2)
	        salesOrderSummary.CanclReason("NotNeeded");
	        browser.sleep(1000);
	        salesOrderSummary.CNFButton();
	        browser.sleep(3000);
	       // expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY RELEASED");//after partially canceling the line item
	        //browser.sleep(1000);
//canceling the line Completely
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
	        browser.sleep(2000);
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELED");//after completely canceling the line item
	        browser.sleep(1000);
        });

    });
});
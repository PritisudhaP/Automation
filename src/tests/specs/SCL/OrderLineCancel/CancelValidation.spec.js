var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');


global.orderStatus = "";
global.SONumber = "";
global.ATS1 = "";
global.cancelled = "";
global.ordered = "";
global.availabletoCancel = "";
global.savedStatus = "";
global.authorizedAmount="";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	
  //Sales order list page try to cancel the order and verify same popup.
  //In cancellation popup verify Refund to Tender amount and cancelled amount
  it('popup and other validations', function () {
	  
      browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(2000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
      callCenter.editLineGear("3"); 
      callCenter.lineItemselectOptions("Change Price");
      browser.sleep(500);
      callCenter.changingUnitPrice("25");
      salesOrderCreate.incrementQty(9);
      browser.sleep(1000);

    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
      browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);		    
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});		
		browser.sleep(12000);
		callCenter.totalPaymentAmount(2).then(function(value){			
			auth=value;
			authorizedAmount = auth.substring(1);
		    console.log("Total authorized  amount is "+authorizedAmount);	
			browser.sleep(3000);
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
 	       callCenter.editLineGear("3");
 	       callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
 	       browser.sleep(1000);
 	       salesOrderSummary.CanclQTY(5)
 	       salesOrderSummary.CanclReason("NotNeeded");
 	       browser.sleep(1000);
 	       salesOrderSummary.CNFButton();
 	       browser.sleep(3000);	       
 	       salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
            cncl = value;
            cancelled = cncl.substring(10)
            console.log("Total Cancelled QTY "+cancelled);
 	       }); 	
 	       
 	       browser.sleep(500);	 
	       callCenter.editLineGear("3");
	       callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	       browser.sleep(500);	       
	       salesOrderSummary.avaialbleTocancelQTY(5).then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
	        	Cancel = value;
	        	availabletoCancel = parseInt(Cancel);
			    console.log("Remaining qty to cancel "+availabletoCancel);	
	       });
	       
	   /*    salesOrderSummary.avaialbleTocancelQTY().then(function (value) {    
	        	order = value;
	        	ordered = parseInt(order);
	        	console.log("Total Ordered QTY "+ordered);	
	        	diff=ordered-cancelled;
	        	console.log(" the difference in QTY "+diff);	
		        expect(availabletoCancel).toEqual(diff);//checking the pop up for correct value

	       });*/
//checking the total units to cancel	       
	       salesOrderSummary.CanclQTY(2)
 	       salesOrderSummary.CanclReason("NotNeeded");
 	       browser.sleep(1000);
 	       salesOrderSummary.avaialbleTocancelQTY(1).then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
	        	Cancel = value;
	        	totalcancelled = Cancel.substring(0,1)
			    console.log("Total canceled QTY "+totalcancelled);	
			    expect(totalcancelled).toEqual("2")
	       });
 //checking the cancelled amount
 	       
 	      salesOrderSummary.avaialbleTocancelQTY(2).then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
	        	Canceledamount = value;
	        	amount = Canceledamount.substring(1,6)
			    console.log("Total canceled amount "+amount);	
			    expect(amount).toEqual("50.00");
	       });	      
//checking the payment method 	      
 	     salesOrderSummary.avaialbleTocancelQTY(3).then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
	        	payementmethod = value;
			    console.log("payment method "+payementmethod);	
			    expect(payementmethod).toEqual("CREDIT_CARD");
	       });	      
//checking the payment method 	      
 	     salesOrderSummary.avaialbleTocancelQTY(4).then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
	        	cardnumber = value;
			    console.log("card number ending with "+cardnumber);	
			    expect(cardnumber).toContain('4415');
	       });
 
//checking the total authorized amount
 	    salesOrderSummary.totalRfundtoTenderAmount().then(function (value) {   //if the order has payment then  avaialbleTocancelQTY should be 7
        	refund = value;
        	refundamount = refund.substring(1,7)
		    console.log("The total refund amount is "+refundamount);	
		   // expect(refundamount).toContain(authorizedAmount);
       });
 	     
 	     
 	       salesOrderSummary.CNFButton();
 	       browser.sleep(3000);	       
	       
 	       
	    });	   	    
    });	
}); 	  
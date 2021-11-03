var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var batchPickCreate = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.create.screen.js');
var util = require(process.cwd() + '/src/tests/screens/Utilities/util.js');
var FRCreateScreen = require(process.cwd() + '/src/tests/screens/FRScreen/FRScreen.Create.Screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');
var FRSummaryScreen = require(process.cwd() + '/src/tests/screens/FRScreen/FRScreen.Summary.Screen.js');

global.orderStatus = "";
global.SONumber = "";
global.FRNumber = "";
global.backOrdered="";
global.rejectedQty = "";
global.allocatedQty="";
global.backOrdered="";
global.rejectedQty="";
global.ReleasedQty="";
global.backOrdered2="";
global.rejectedQty2 = "";
global.allocatedQty2="";
global.backOrdered2="";
global.rejectedQty2="";
global.ReleasedQty2="";

describe("FR Screen Medium Level Test Cases: ", function() {
	var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();
	var returnsCreate = new returnsCreateScreen();
	var invoiceSummary=new invoiceSummaryScreen();
	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
  	var batchCreate = new batchPickCreate();
  	var FRCreate= new FRCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var FRSummary = new FRSummaryScreen();
	utils.Login(browser.params.login.user,browser.params.login.password);
//FR_047: Create a Shipment and Finalize Shipment by accepting/rejecting from FR Screen
	 it("Create and Finalize Shipment by accepting/rejecting from FR Screen_FR_001", function() {
		 	browser.get(scriptUrl);
	        commons.searchWithCriteria('Name', 'starts with', browser.params.frScreenScript1);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptCancelButton(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Name', 'starts with', browser.params.frScreenScript2);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptCancelButton(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Name', 'starts with', browser.params.frScreenScript3);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptCancelButton(savedStatus);
			});	
	      /*  browser.refresh();
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript4);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdate(savedStatus);
			});
	        */
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			callCenter.attachCustomer();
			callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			salesOrderCreate.selectCustomer();
			salesOrderCreate.useSelectedCustomer();		
			callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("4");
	        callCenter.editLinePopUpSaveBtn();
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
			browser.sleep(3000);
			//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.frRequestLink(1);
	        FRCreate.frStatus("Reject",2);
	        expect(FRCreate.rejectConfirmLineLevel()).toBe(true);
	        FRCreate.lineLevelReject(2,browser.params.rejectReason,browser.params.rejectComments);
	        FRCreate.frStatus("Reject",3);
	        expect(FRCreate.frHeaderStatus()).toEqual("PARTIALLY ACCEPTED");
	        expect(FRCreate.frLineStatus(1)).toEqual("PARTIALLY ACCEPTED");
	        expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_008
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
	            salesOrderSummary.salesOrderSelectGear("View");
	            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY RELEASED"); //HEADER LEVEL; CHECKING
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY RELEASED");//lINE LEVEL CHECKING 
	            salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	   	            boq = value;
	   	            backOrdered = parseInt(boq.substring(12));
	   	            console.log("Total backordered QTY "+backOrdered);
	    	            expect(backOrdered).toEqual(2);

	   	        });	    	     
	    	    salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
	   	            reject = value;
	   	            rejectedQty = parseInt(reject.substring(9));
	   	            console.log("Total Rejecetd  QTY "+rejectedQty);
    	            expect(rejectedQty).toEqual(2);
	   	        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	   	            allocated = value;
	   	            allocatedQty = parseInt(allocated.substring(10));
	   	            console.log("Total allocated  QTY "+allocatedQty);
    	            expect(allocatedQty).toEqual(2);
	   	        });
	    	    
	    	    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	   	           	Released = value;
	   	           	ReleasedQty = parseInt(Released.substring(9));
	   	            console.log("Total Released  QTY "+ReleasedQty);
    	            expect(ReleasedQty).toEqual(2);
	   	        });
	    	    
		        salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane line item
	            salesOrderSummary.frRequestLink(1);
				browser.sleep(1000);
				callCenter.editLineGear("1");
				FRCreate.shipmentCreate();
	         	callCenter.shipAccountselect(browser.params.shipaccount);
	         	callCenter.packageSelection(browser.params.packageValue);
	         	callCenter.packageTrackingNumber(1236547890);
	         	returnsCreate.multiplePackages("1","2");
	         	callCenter.addPackageToShipment();
			 	util.scrollDownByPixel();
	         	callCenter.unselectPkg();
	         	browser.sleep(1000);
	         	callCenter.finalizeShipment();
	         	browser.sleep(4000);
	           FRSummary.returnToFRscreen();
	           browser.sleep(5000);
	           expect(FRCreate.frHeaderStatus()).toEqual("CREATED");
	           expect(FRCreate.frLineStatus(1)).toEqual("CLOSED");
	           browser.sleep(3000);
		    });
		       browser.wait(function () {
			        return SONumber != '';
			    }).then(function () {
			    	callCenter.CallCenterPage();
			    	callCenter.page("Sales Orders");
			    	salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
			    	expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
			    	browser.sleep(3000);
			    	salesOrderSummary.salesOrderSelectGear("View");
			    	browser.sleep(3000);
			    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
			    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
			    	salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
			    		boq = value;
			    		backOrderedAS = parseInt(boq.substring(12));
			    		console.log("Total backordered QTY after ship at line 1"+backOrderedAS);
			    		expect(backOrderedAS).toEqual(2);
		
			     });	    	     
			    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQtyAS = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
		            expect(allocatedQtyAS).toEqual(2);
		        });
			    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
		           	Released = value;
		           	ReleasedQtyAS = parseInt(Released.substring(9));
		            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
		            expect(ReleasedQtyAS).toEqual(2);
		        });
			    salesOrderSummary.salesOrderPane("Shipping Requests");
		         expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
		         salesOrderSummary.collapseIcon(1);
		         expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item
			  });
	            
	  }); 




});
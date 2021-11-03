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

describe("FR Screen Low Level Test Cases: ", function() {
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
	//FR_001:When clicking on Accept at header level
	//FR_002: Create Shipment and Finalize Shipment after accepting the single line FR from the header level – (FR header level should have status as ACKNOWLEDGED and line level status as ACCEPTED after accepting the FR from header level)
	it("Accept at header level and Finalize shipment_FR_001", function() {
			
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
	        FRCreate.frStatus("Accept",1);
	        FRCreate.yesButton();
	        expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	        expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	        expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	            salesOrderSummary.salesOrderSelectGear("View");
	            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	            salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	   	            boq = value;
	   	            backOrdered = parseInt(boq.substring(12));
	   	            console.log("Total backordered QTY "+backOrdered);
	    	            expect(backOrdered).toEqual(0);
	   	        });	   
	            salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	   	            allocated = value;
	   	            allocatedQty = parseInt(allocated.substring(10));
	   	            console.log("Total allocated  QTY "+allocatedQty);
    	            expect(allocatedQty).toEqual(1);
	   	        });
		        salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line item
	            salesOrderSummary.frRequestLink(1);
	            callCenter.editLineGear("1");
				FRCreate.shipmentCreate();
	         	callCenter.shipAccountselect(browser.params.shipaccount);
	         	callCenter.packageSelection(browser.params.packageValue);
	         	callCenter.packageTrackingNumber(1236547890);
	         	returnsCreate.multiplePackages("1","1");
	         	callCenter.addPackageToShipment();
			 	util.scrollDownByPixel();
	         	callCenter.unselectPkg();
	         	browser.sleep(1000);
	         	callCenter.finalizeShipment();
	         	browser.sleep(4000);
		    });	    
	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	            salesOrderSummary.salesOrderSelectGear("View");
	            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("SHIPPED"); //HEADER LEVEL; CHECKING
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");//lINE LEVEL CHECKING 
	            salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	   	            boq = value;
	   	            backOrdered = parseInt(boq.substring(12));
	   	            console.log("Total backordered QTY "+backOrdered);
	    	            expect(backOrdered).toEqual(0);
	   	        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQtyAS = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
		            expect(allocatedQtyAS).toEqual(1);
		        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
		           	Released = value;
		           	ReleasedQtyAS = parseInt(Released.substring(9));
		            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
		            expect(ReleasedQtyAS).toEqual(1);
		        });
	    	    salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item

		    });
	  });	  

	 //FR_005: When clicking on Accept at line level
	//FR_006: Create Shipment and Finalize Shipment after accepting the single line FR from the line level – (FR header level should have status as ACKNOWLEDGED and line level status as RELEASED after accepting the FR from header level)
	
	it("Accept at Line level and Finalize shipment_FR_002", function() {
		
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
	    FRCreate.frStatus("Accept",2);
	   // expect(FRCreate.rejectConfirm()).toBe(true);
	    //FRCreate.shipmentRejectPopup(browser.params.rejectReason,browser.params.rejectComments);
	   // FRCreate.frStatus("Reject",3);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line item
	        salesOrderSummary.frRequestLink(1);
	        callCenter.editLineGear("1");
			FRCreate.shipmentCreate();
	     	callCenter.shipAccountselect(browser.params.shipaccount);
	     	callCenter.packageSelection(browser.params.packageValue);
	     	callCenter.packageTrackingNumber(1236547890);
	     	returnsCreate.multiplePackages("1","1");
	     	callCenter.addPackageToShipment();
		 	util.scrollDownByPixel();
	     	callCenter.unselectPkg();
	     	browser.sleep(1000);
	     	callCenter.finalizeShipment();
	     	browser.sleep(4000);
	    });	    
	    
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("SHIPPED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });
		    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(1);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(1);
	        });
		    salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item
	
	    });
	});	  

	//FR_013: When clicking on Accept at any one-line level
	//FR_014: When clicking on Accept at every line level 
	it("Accept at one-line level and Accept at every line level_FR_003", function() {
		
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
       
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();			
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
	    FRCreate.frStatus("Accept",2);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("PARTIALLY ACCEPTED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.frLineStatus(2)).toEqual("OPEN");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	            boq = value;
	            backOrdered = parseInt(boq.substring(12));
	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	            expect(backOrdered).toEqual(0);
	        });	   
        salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQty = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
            expect(allocatedQty).toEqual(1);
	        });
        
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("OPEN");//Shipment request pane line2 item
	        salesOrderSummary.frRequestLink(1);
	        FRCreate.frStatus("Accept",2);//accepting the second line
	 	    FRCreate.yesButton();
	 	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	 	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	 	    expect(FRCreate.frLineStatus(2)).toEqual("ACCEPTED");
	 	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	
	    });
	 	    browser.wait(function () {
	 	        return SONumber != '';
	 	    }).then(function () {
	 	    	callCenter.CallCenterPage();
	 	    	callCenter.page("Sales Orders");
	 	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	 	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	 	        salesOrderSummary.salesOrderSelectGear("View");
	 	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	 	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	 	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	 	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	 		            boq = value;
	 		            backOrdered = parseInt(boq.substring(12));
	 		            console.log("Total backordered QTY "+backOrdered);
	 		            expect(backOrdered).toEqual(0);
	 		        });	   
	 	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	 		            allocated = value;
	 		            allocatedQty = parseInt(allocated.substring(10));
	 		            console.log("Total allocated  QTY "+allocatedQty);
	 	            expect(allocatedQty).toEqual(1);
	 		        });
	 	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	 	            boq = value;
	 	            backOrdered = parseInt(boq.substring(12));
	 	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	 	            expect(backOrdered).toEqual(0);
	 	        });	   
	         salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	 	            allocated = value;
	 	            allocatedQty = parseInt(allocated.substring(10));
	 	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
	             expect(allocatedQty).toEqual(1);
	 	        });
	         
	 	        salesOrderSummary.salesOrderPane("Shipping Requests");
	 	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	 	        salesOrderSummary.collapseIcon(1);
	 	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	 	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("ACCEPTED");//Shipment request pane line2 item
	 	    });
	 	        
	 	        
	});	  
	//FR_024:When clicking on Accept at header level& rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	//FR_025:Create Shipment and Finalize Shipment after accepting the single line FR from the header level – (FR header level should have status as ACKNOWLEDGED and line level status as ACCEPTED after accepting the FR from header level)
	 it("Accept at header level and Finalize shipment_Scripts Enabled_FR_004", function() {
			
		 	browser.get(scriptUrl);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript3 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
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
	        FRCreate.frStatus("Accept",1);
	        FRCreate.yesButton();
	        expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	        expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	        expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	            salesOrderSummary.salesOrderSelectGear("View");
	            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	            salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	   	            boq = value;
	   	            backOrdered = parseInt(boq.substring(12));
	   	            console.log("Total backordered QTY "+backOrdered);
	    	            expect(backOrdered).toEqual(0);
	   	        });	   
	            salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	   	            allocated = value;
	   	            allocatedQty = parseInt(allocated.substring(10));
	   	            console.log("Total allocated  QTY "+allocatedQty);
    	            expect(allocatedQty).toEqual(1);
	   	        });
		        salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line item
	            salesOrderSummary.frRequestLink(1);
	            callCenter.editLineGear("1");
				FRCreate.shipmentCreate();
	         	callCenter.shipAccountselect(browser.params.shipaccount);
	         	callCenter.packageSelection(browser.params.packageValue);
	         	callCenter.packageTrackingNumber(1236547890);
	         	returnsCreate.multiplePackages("1","1");
	         	callCenter.addPackageToShipment();
			 	util.scrollDownByPixel();
	         	callCenter.unselectPkg();
	         	browser.sleep(1000);
	         	callCenter.finalizeShipment();
	         	browser.sleep(4000);
		    });	    
	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	            salesOrderSummary.salesOrderSelectGear("View");
	            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("SHIPPED"); //HEADER LEVEL; CHECKING
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");//lINE LEVEL CHECKING 
	            salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	   	            boq = value;
	   	            backOrdered = parseInt(boq.substring(12));
	   	            console.log("Total backordered QTY "+backOrdered);
	    	            expect(backOrdered).toEqual(0);
	   	        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQtyAS = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
		            expect(allocatedQtyAS).toEqual(1);
		        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
		           	Released = value;
		           	ReleasedQtyAS = parseInt(Released.substring(9));
		            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
		            expect(ReleasedQtyAS).toEqual(1);
		        });
	    	    salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item

		    });
	  });	  

	 //FR_028: When clicking on Accept at line level - & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	//FR_029: Create Shipment and Finalize Shipment after accepting the single line FR from the line level – (FR header level should have status as ACKNOWLEDGED and line level status as RELEASED after accepting the FR from header level)
	
	it("Accept at Line level and Finalize shipment_Scripts Enabled_FR_005", function() {
		
		browser.get(scriptUrl);
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript3 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});
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
	    FRCreate.frStatus("Accept",2);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line item
	        salesOrderSummary.frRequestLink(1);
	        callCenter.editLineGear("1");
			FRCreate.shipmentCreate();
	     	callCenter.shipAccountselect(browser.params.shipaccount);
	     	callCenter.packageSelection(browser.params.packageValue);
	     	callCenter.packageTrackingNumber(1236547890);
	     	returnsCreate.multiplePackages("1","1");
	     	callCenter.addPackageToShipment();
		 	util.scrollDownByPixel();
	     	callCenter.unselectPkg();
	     	browser.sleep(1000);
	     	callCenter.finalizeShipment();
	     	browser.sleep(4000);
	    });	    
	    
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("SHIPPED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });
		    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(1);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(1);
	        });
		    salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item
	
	    });
	});	  

	//FR_036: When clicking on Accept at any one-line level & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	//FR_037: When clicking on Accept at every line level 
	it("Accept at one-line level and Accept at every line level_Scripts enabled_FR_006", function() {
		
		browser.get(scriptUrl);
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript3 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();			
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
	    FRCreate.frStatus("Accept",2);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("PARTIALLY ACCEPTED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.frLineStatus(2)).toEqual("OPEN");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	            boq = value;
	            backOrdered = parseInt(boq.substring(12));
	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	            expect(backOrdered).toEqual(0);
	        });	   
        salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQty = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
            expect(allocatedQty).toEqual(1);
	        });
        
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("OPEN");//Shipment request pane line2 item
	        salesOrderSummary.frRequestLink(1);
	        FRCreate.frStatus("Accept",2);//accepting the second line
	 	    FRCreate.yesButton();
	 	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	 	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	 	    expect(FRCreate.frLineStatus(2)).toEqual("ACCEPTED");
	 	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	
	    });
	 	    browser.wait(function () {
	 	        return SONumber != '';
	 	    }).then(function () {
	 	    	callCenter.CallCenterPage();
	 	    	callCenter.page("Sales Orders");
	 	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	 	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	 	        salesOrderSummary.salesOrderSelectGear("View");
	 	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	 	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	 	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("RELEASED");//lINE LEVEL CHECKING 
	 	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	 		            boq = value;
	 		            backOrdered = parseInt(boq.substring(12));
	 		            console.log("Total backordered QTY "+backOrdered);
	 		            expect(backOrdered).toEqual(0);
	 		        });	   
	 	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	 		            allocated = value;
	 		            allocatedQty = parseInt(allocated.substring(10));
	 		            console.log("Total allocated  QTY "+allocatedQty);
	 	            expect(allocatedQty).toEqual(1);
	 		        });
	 	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	 	            boq = value;
	 	            backOrdered = parseInt(boq.substring(12));
	 	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	 	            expect(backOrdered).toEqual(0);
	 	        });	   
	         salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	 	            allocated = value;
	 	            allocatedQty = parseInt(allocated.substring(10));
	 	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
	             expect(allocatedQty).toEqual(1);
	 	        });
	         
	 	        salesOrderSummary.salesOrderPane("Shipping Requests");
	 	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	 	        salesOrderSummary.collapseIcon(1);
	 	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	 	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("ACCEPTED");//Shipment request pane line2 item
	 	    });
	 	        
	 	        
	});
	
	
	//FR_011: When clicking on Accept at header level
	it("Accept Multiple lines at header level_FR_007", function() {
		
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
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();			
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
	    FRCreate.frStatus("Accept",1);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.frLineStatus(2)).toEqual("ACCEPTED");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	            boq = value;
	            backOrdered = parseInt(boq.substring(12));
	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	            expect(backOrdered).toEqual(0);
	        });	   
        salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQty = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
            expect(allocatedQty).toEqual(1);
	        });
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("ACCEPTED");//Shipment request pane line2 item
	 	 });
	});
	
	
	//FR_034: When clicking on Accept at header level & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	it("Accept Multiple lines at header level_Scripts enabled_FR_008", function() {
		
		browser.get(scriptUrl);
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});	
        browser.refresh();
        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript3 );
        utils.status(3,1).then(function (value) {
			savedStatus = value;
		    console.log("the status is "+savedStatus);	
		    util.ScriptUpdateWithVersion(savedStatus);
		});		  
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();			
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
	    FRCreate.frStatus("Accept",1);
	    FRCreate.yesButton();
	    expect(FRCreate.frHeaderStatus()).toEqual("ACKNOWLEDGED");
	    expect(FRCreate.frLineStatus(1)).toEqual("ACCEPTED");
	    expect(FRCreate.frLineStatus(2)).toEqual("ACCEPTED");
	    expect(FRCreate.hamburgerPresence()).toEqual(true);//checking the FR_004	        
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        salesOrderSummary.salesOrderSelectGear("View");
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); //HEADER LEVEL; CHECKING
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("ACCEPTED");//lINE LEVEL CHECKING 
	        salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		            boq = value;
		            backOrdered = parseInt(boq.substring(12));
		            console.log("Total backordered QTY "+backOrdered);
		            expect(backOrdered).toEqual(0);
		        });	   
	        salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
		            allocated = value;
		            allocatedQty = parseInt(allocated.substring(10));
		            console.log("Total allocated  QTY "+allocatedQty);
	            expect(allocatedQty).toEqual(1);
		        });
	        salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	            boq = value;
	            backOrdered = parseInt(boq.substring(12));
	            console.log("Total backordered QTY at Line 2 "+backOrdered);
	            expect(backOrdered).toEqual(0);
	        });	   
        salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQty = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY at Line 2 "+allocatedQty);
            expect(allocatedQty).toEqual(1);
	        });
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("ACKNOWLEDGED");//Shipment request pane
	        salesOrderSummary.collapseIcon(1);
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("ACCEPTED");//Shipment request pane line1 item
	        expect(FRCreate.shipmentPaneStatus(3)).toEqual("ACCEPTED");//Shipment request pane line2 item
	 	 });
	});
	
});
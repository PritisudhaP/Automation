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

describe("FR Screen High Level Test Cases: ", function() {
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
	//FR_043: Create a Shipment and Finalize Shipment by selecting Partial Qty of each line & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	 it("Finalize Shipment by selecting Partial Qty of each line_FR_018", function() {
		 	browser.get(scriptUrl);
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
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
			callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("4");
	        callCenter.editLinePopUpSaveBtn();
	    	callCenter.editLineGear("4");
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
			util.scrollDownByPixel();
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);   
	        salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQty = parseInt(Released.substring(9));
	            console.log("Total Released  QTY at line 1"+ReleasedQty);
	        });	  
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.frRequestLink(1);
			browser.sleep(5000);
			callCenter.editLineGear("1");
			FRCreate.shipmentCreate();
           callCenter.shipAccountselect(browser.params.shipaccount);
           callCenter.packageSelection(browser.params.packageValue);
           callCenter.packageTrackingNumber(1236547890);
		    callCenter.enterItemQty("2");
			callCenter.rejectLines(1,"Product Damaged");
			callCenter.enterItemQty2("2");
			callCenter.rejectLines(2,"Product Damaged");
           callCenter.addPackageToShipment();
			util.scrollDownByPixel();
           callCenter.unselectPkg();
           callCenter.finalizeShipment();
           browser.sleep(18000);
           FRSummary.returnToFRscreen();
           browser.sleep(7000);
          // expect(FRCreate.frHeaderStatus()).toEqual("SHIPMENT IN PROGRESS");
	        expect(FRCreate.frLineStatus(1)).toEqual("OPEN");
	        expect(FRCreate.frLineStatus(2)).toEqual("OPEN");
           browser.sleep(3000);
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		    	browser.sleep(2000);
		    	salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		    	// commons.searchWithCriteria("Original Order #","ends with",SONumber)
		    	browser.sleep(5000);
		    	expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
		    	browser.sleep(2000);
		    	salesOrderSummary.salesOrderSelectGear("View");
		    	browser.sleep(3000);
		    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
		    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
		    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("PARTIALLY SHIPPED");
		    	salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		    		boq = value;
		    		backOrderedAS = parseInt(boq.substring(12));
		    		console.log("Total backordered QTY after ship at line 1 "+backOrderedAS);
		    		expect(backOrderedAS).toEqual(2);
	
		     });	    	     
		     salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
	            reject = value;
	            rejectedQtyAS = parseInt(reject.substring(9));
	            console.log("Total Rejecetd  QTY after ship at line 1 "+rejectedQtyAS);
	            expect(rejectedQtyAS).toEqual(2);
		    });
		    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(2);
	        });
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 2 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(2);
	        });
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(12).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 2 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(2);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(9).then(function (value) {    
	           	shipped = value;
	           	ShippedQtyAS = parseInt(shipped.substring(8));
	            console.log("Total Shipped  QTY after ship at line 2: "+ShippedQtyAS);
	            expect(ShippedQtyAS).toEqual(2);
	        });
		    salesOrderSummary.salesOrderPane("Shipping Requests");
        //   expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT IN PROGRESS");//Shipment request pane
          browser.sleep(3000);
           salesOrderSummary.collapseIcon(1);
           expect(FRCreate.shipmentPaneStatus(2)).toEqual("OPEN");//Shipment request pane line item
           expect(FRCreate.shipmentPaneStatus(3)).toEqual("OPEN");//Shipment request pane line item
		  });
	 });

//FR_044:Create a Shipment and Finalize Shipment by selecting any one line with full Qty and other line(s) rejecting Full Qty & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2
	 it("Finalize Shipment by selecting any one line with full Qty and other line(s) rejecting Full Qty_Scripts Enabled_FR_019", function() {
			browser.get(scriptUrl);
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );	        
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
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
			callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("4");
	        callCenter.editLinePopUpSaveBtn();
	    	callCenter.editLineGear("4");
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
			util.scrollDownByPixel();
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);   
	        salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQty = parseInt(Released.substring(9));
	            console.log("Total Released  QTY at line 1"+ReleasedQty);
	        });	  
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.frRequestLink(1);
			browser.sleep(5000);
			callCenter.editLineGear("1");
			FRCreate.shipmentCreate();
        	callCenter.shipAccountselect(browser.params.shipaccount);
        	callCenter.packageSelection(browser.params.packageValue);
        	callCenter.packageTrackingNumber(1236547890);
		    callCenter.enterItemQty("4");
			callCenter.enterItemQty2("0");
			callCenter.rejectLines(2,"Product Damaged");
        	callCenter.addPackageToShipment();
		 	util.scrollDownByPixel();
        	callCenter.unselectPkg();
        	browser.sleep(1000);
        	callCenter.finalizeShipment();
        	browser.sleep(4000);
          FRSummary.returnToFRscreen();
          browser.sleep(5000);
          //expect(FRCreate.frHeaderStatus()).toEqual("CREATED");
          expect(FRCreate.frLineStatus(1)).toEqual("CLOSED");
          expect(FRCreate.frLineStatus(2)).toEqual("REJECTED");
          browser.sleep(3000);
	       browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		    	salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		    	browser.sleep(5000);
		    	expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
		    	salesOrderSummary.salesOrderSelectGear("View");
		    	browser.sleep(3000);
		    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
		    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("FAILED TO ALLOCATE");
		    	salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		    		boq = value;
		    		backOrderedAS = parseInt(boq.substring(12));
		    		console.log("Total backordered QTY after ship at line 1"+backOrderedAS);
		    		expect(backOrderedAS).toEqual(0);
	
		     });	    	     
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(4);
	        });
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 2 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(0);
	        });
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(4);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(8).then(function (value) {    
	           	shipped = value;
	           	ShippedQtyAS = parseInt(shipped.substring(8));
	            console.log("Total Shipped  QTY after ship at line 2: "+ShippedQtyAS);
	            expect(ShippedQtyAS).toEqual(0);
	        });
		    salesOrderSummary.salesOrderPane("Shipping Requests");
      //  expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT CREATED");//Shipment request pane
        salesOrderSummary.collapseIcon(1);
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item
        expect(FRCreate.shipmentPaneStatus(3)).toEqual("REJECTED");//Shipment request pane line item
		  });
	 });
	
	 //FR_045:Create a Shipment and Finalize Shipment by selecting any one line with full Qty and other line(s) with Partial Qty & rejectShipmentRequestCompleteLine,rejectShipmentRequestHeader,rejectShipmentRequestLine,All 3 scripts enabled with Script Function version value >= 2

	 it("Finalize Shipment by selecting any one line with full Qty and other line(s) rejecting Partial Qty_Scripts Enabled_FR_020", function() {
			browser.get(scriptUrl);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
	        browser.sleep(1500);
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
	        browser.sleep(1500);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript3 );
	        browser.sleep(1500);
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
			callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("4");
	        callCenter.editLinePopUpSaveBtn();
	    	callCenter.editLineGear("4");
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
			util.scrollDownByPixel();
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);   
	        salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQty = parseInt(Released.substring(9));
	            console.log("Total Released  QTY at line 1"+ReleasedQty);
	        });	  
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.frRequestLink(1);
			browser.sleep(5000);
			callCenter.editLineGear("1");
			FRCreate.shipmentCreate();
			callCenter.shipAccountselect(browser.params.shipaccount);
			callCenter.packageSelection(browser.params.packageValue);
			callCenter.packageTrackingNumber(1236547890);
		   	callCenter.enterItemQty("4");
			callCenter.enterItemQty2("2");
			callCenter.rejectLines(2,"Product Damaged");
			callCenter.addPackageToShipment();
			util.scrollDownByPixel();
			callCenter.unselectPkg();
			browser.sleep(1000);
			callCenter.finalizeShipment();
			browser.sleep(7000);
	       FRSummary.returnToFRscreen();
	       browser.sleep(5000);
	      //expect(FRCreate.frHeaderStatus()).toEqual("SHIPMENT IN PROGRESS");
	        expect(FRCreate.frLineStatus(1)).toEqual("CLOSED");
	        expect(FRCreate.frLineStatus(2)).toEqual("OPEN");
	        browser.sleep(3000);
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.CallCenterPage();
		    	callCenter.page("Sales Orders");
		    	salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		    	browser.sleep(4500);
		    	expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
		    	salesOrderSummary.salesOrderSelectGear("View");
		    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
		    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("PARTIALLY SHIPPED");
		    	salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
		    		boq = value;
		    		backOrderedAS = parseInt(boq.substring(12));
		    		console.log("Total backordered QTY after ship at line 1"+backOrderedAS);
		    		expect(backOrderedAS).toEqual(0);
	
		     });	    	     
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 1 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(4);
	        });
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship at line 2 "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(2);
	        });
		    
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(7).then(function (value) {    
	    		boq = value;
	    		backOrderedAS = parseInt(boq.substring(12));
	    		console.log("Total backordered QTY after ship at line 2"+backOrderedAS);
	    		expect(backOrderedAS).toEqual(2);

	     });	    	     
	    
		    
		    salesOrderEdit.orderQtyCheckAfterRelease(5).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 1 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(4);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(11).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship at line 2 "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(2);
	        });
		    salesOrderEdit.orderQtyCheckAfterRelease(8).then(function (value) {    
	           	shipped = value;
	           	ShippedQtyAS = parseInt(shipped.substring(8));
	            console.log("Total Shipped  QTY after ship at line 2: "+ShippedQtyAS);
	            expect(ShippedQtyAS).toEqual(2);
	        });
		    salesOrderSummary.salesOrderPane("Shipping Requests");
    // expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("SHIPMENT IN PROGRESS");//Shipment request pane
     salesOrderSummary.collapseIcon(1);
     expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");//Shipment request pane line item
     expect(FRCreate.shipmentPaneStatus(3)).toEqual("OPEN");//Shipment request pane line item
		  });
	 });

//FR_023:Create a Shipment and Finalize Shipment by accepting any Partially Qty and again Short ship during shipment creation - (FR header level should have status as PARTIALLY ACCEPTED and line level status as PARTIALLY ACCEPTED after rejecting the FR from header level)
	  it("Partial Rejection and fullfillment by Short ship _FR_021", function() {
		  browser.get(scriptUrl);
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with', browser.params.frScreenScript1);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptCancelButton(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
	        commons.searchWithCriteria('Name', 'starts with', browser.params.frScreenScript2);
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptCancelButton(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        browser.sleep(1500);
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
	        FRCreate.lineLevelReject(1,browser.params.rejectReason,browser.params.rejectComments);
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
	    	            expect(backOrdered).toEqual(1);

	   	        });	    	     
	    	    salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
	   	            reject = value;
	   	            rejectedQty = parseInt(reject.substring(9));
	   	            console.log("Total Rejecetd  QTY "+rejectedQty);
   	            expect(rejectedQty).toEqual(1);
	   	        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	   	            allocated = value;
	   	            allocatedQty = parseInt(allocated.substring(10));
	   	            console.log("Total allocated  QTY "+allocatedQty);
   	            expect(allocatedQty).toEqual(3);
	   	        });
	    	    
	    	    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	   	           	Released = value;
	   	           	ReleasedQty = parseInt(Released.substring(9));
	   	            console.log("Total Released  QTY "+ReleasedQty);
   	            expect(ReleasedQty).toEqual(3);
	   	        });
	    	    
		        salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane line item
	            
		    });	   
//shipment completion for partially Rejected SO.		        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	
		    	 callCenter.fullFillmentPage();
		         callCenter.page("Fulfillment Requests");
		         console.log("the sale sorder is "+SONumber);
				 commons.searchWithCriteria("Original Order #","ends with",SONumber);
		         callCenter.fulfillmentOrderSelectGear("Create Shipment");
		         browser.sleep(1000);
		         callCenter.shipAccountselect(browser.params.shipaccount);
		         callCenter.packageSelection(browser.params.packageValue);
		         callCenter.packageTrackingNumber(1236547890);
			      callCenter.enterItemQty("1");
		         callCenter.unselectPkg();
		         callCenter.addPackageToShipment();
		         callCenter.finalizeShipment();
		         browser.sleep(2000);
			     //salesOrderSummary.shipmentRejectPopup("Product Damaged", "this is a Test")
			     salesOrderSummary.CNFButton();
			     browser.sleep(3000);
			     FRSummary.returnToFRscreen();
			     browser.sleep(5000);
			    // expect(FRCreate.frHeaderStatus()).toEqual("SHIPMENT IN PROGRESS");
			     expect(FRCreate.frLineStatus(1)).toEqual("OPEN");
			     browser.sleep(3000);
		    });
	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
           expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
           salesOrderSummary.salesOrderSelectGear("View");
           expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
           expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
           
           salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
  	            boq = value;
  	            backOrderedAS = parseInt(boq.substring(12));
  	            
  	            console.log("Total backordered QTY after ship "+backOrderedAS);
   	        expect(backOrderedAS).toEqual(3);

  	        });	    	     
   	    salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
  	            reject = value;
  	            rejectedQtyAS = parseInt(reject.substring(9));
  	            console.log("Total Rejecetd  QTY after ship"+rejectedQtyAS);
	            expect(rejectedQtyAS).toEqual(3);
  	        });
   	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
  	            allocated = value;
  	            allocatedQtyAS = parseInt(allocated.substring(10));
  	            console.log("Total allocated  QTY after ship "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(1);
  	        });
   	    
   	    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
  	           	Released = value;
  	           	ReleasedQtyAS = parseInt(Released.substring(9));
  	            console.log("Total Released  QTY after ship "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(1);
  	        });
   	    salesOrderEdit.orderQtyCheckAfterRelease(3).then(function (value) {    
  	           	shipped = value;
  	           	ShippedQtyAS = parseInt(shipped.substring(8));
  	            console.log("Total Shipped  QTY after ship "+ShippedQtyAS);
	            expect(ShippedQtyAS).toEqual(1);
  	        });
           
 		});
 }); 		  
	
	//FR_046:Create a Shipment and Finalize Shipment by accepting any Partially Qty and again Short ship during shipment creation - (FR header level should have status as PARTIALLY ACCEPTED and line level status as PARTIALLY ACCEPTED after rejecting the FR from header level)
	  it("Partial Rejection and fullfillment by  Short ship Script enabled _FR_022", function() {
		  
		  	browser.get(scriptUrl);
		  	commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript1 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
	        commons.searchWithCriteria('Name', 'starts with',browser.params.frScreenScript2 );
	        utils.status(3,1).then(function (value) {
				savedStatus = value;
			    console.log("the status is "+savedStatus);	
			    util.ScriptUpdateWithVersion(savedStatus);
			});	
	        browser.refresh();
	        commons.searchWithCriteria('Data Domain', 'starts with',browser.params.dataDomain);
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
	        FRCreate.lineLevelReject(1,browser.params.rejectReason,browser.params.rejectComments);
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
	    	            expect(backOrdered).toEqual(1);

	   	        });	    	     
	    	    salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
	   	            reject = value;
	   	            rejectedQty = parseInt(reject.substring(9));
	   	            console.log("Total Rejecetd  QTY "+rejectedQty);
 	            expect(rejectedQty).toEqual(1);
	   	        });
	    	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	   	            allocated = value;
	   	            allocatedQty = parseInt(allocated.substring(10));
	   	            console.log("Total allocated  QTY "+allocatedQty);
 	            expect(allocatedQty).toEqual(3);
	   	        });
	    	    
	    	    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	   	           	Released = value;
	   	           	ReleasedQty = parseInt(Released.substring(9));
	   	            console.log("Total Released  QTY "+ReleasedQty);
 	            expect(ReleasedQty).toEqual(3);
	   	        });
	    	    
		        salesOrderSummary.salesOrderPane("Shipping Requests");
	            expect(FRCreate.SOScreenShipmentStatusHeader(1)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane
	            salesOrderSummary.collapseIcon(1);
	            expect(FRCreate.shipmentPaneStatus(2)).toEqual("PARTIALLY ACCEPTED");//Shipment request pane line item
	            
		    });	   
//shipment completion for partially Rejected SO.		        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	
		    	 callCenter.fullFillmentPage();
		         callCenter.page("Fulfillment Requests");
		         console.log("the sale sorder is "+SONumber);
				 commons.searchWithCriteria("Original Order #","ends with",SONumber);
		         callCenter.fulfillmentOrderSelectGear("Create Shipment");
		         browser.sleep(1000);
		         callCenter.shipAccountselect(browser.params.shipaccount);
		         callCenter.packageSelection(browser.params.packageValue);
		         callCenter.packageTrackingNumber(1236547890);
			     callCenter.enterItemQty("1");
		         callCenter.unselectPkg();
		         callCenter.addPackageToShipment();
		         callCenter.finalizeShipment();
		         browser.sleep(2000);
			     //salesOrderSummary.shipmentRejectPopup("Product Damaged", "this is a Test")
			     salesOrderSummary.CNFButton();
			     browser.sleep(3000);
			     FRSummary.returnToFRscreen();
			     browser.sleep(5000);
			    // expect(FRCreate.frHeaderStatus()).toEqual("SHIPMENT IN PROGRESS");
			     expect(FRCreate.frLineStatus(1)).toEqual("OPEN");
			     browser.sleep(3000);
		    });
	        
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
         expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
         salesOrderSummary.salesOrderSelectGear("View");
         expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY SHIPPED"); //HEADER LEVEL; CHECKING
         expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
         
         salesOrderEdit.orderQtyCheckAfterRelease(2).then(function (value) {    
	            boq = value;
	            backOrderedAS = parseInt(boq.substring(12));
	            
	            console.log("Total backordered QTY after ship "+backOrderedAS);
 	        expect(backOrderedAS).toEqual(3);

	        });	    	     
 	    salesOrderEdit.orderQtyCheckAfterRelease(4).then(function (value) {    
	            reject = value;
	            rejectedQtyAS = parseInt(reject.substring(9));
	            console.log("Total Rejecetd  QTY after ship"+rejectedQtyAS);
	            expect(rejectedQtyAS).toEqual(3);
	        });
 	    salesOrderEdit.orderQtyCheckAfterRelease(1).then(function (value) {    
	            allocated = value;
	            allocatedQtyAS = parseInt(allocated.substring(10));
	            console.log("Total allocated  QTY after ship "+allocatedQtyAS);
	            expect(allocatedQtyAS).toEqual(1);
	        });
 	    
 	    salesOrderEdit.orderQtyCheckAfterRelease(6).then(function (value) {    
	           	Released = value;
	           	ReleasedQtyAS = parseInt(Released.substring(9));
	            console.log("Total Released  QTY after ship "+ReleasedQtyAS);
	            expect(ReleasedQtyAS).toEqual(3);
	        });
 	    salesOrderEdit.orderQtyCheckAfterRelease(3).then(function (value) {    
	           	shipped = value;
	           	ShippedQtyAS = parseInt(shipped.substring(8));
	            console.log("Total Shipped  QTY after ship "+ShippedQtyAS);
	            expect(ShippedQtyAS).toEqual(1);
	        });
         
		});
	  }); 		  

	
	
	
});

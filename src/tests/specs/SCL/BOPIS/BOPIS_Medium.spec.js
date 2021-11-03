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
var BOPISCreateScreen =  require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Create.Screen.js');
var BOPISEditScreen = require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Edit.screen.js');
var BOPISSummaryScreen = require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Summary.Screen.js');
global.orderStatus = "";
global.SONumber = "";
global.FRNumber = "";
global.pickupStartDate = "";
global.pickupEndDate = "";
global.pickupStartTime = "";
global.pickupEndTime = "";
global.fulfillmentType = "";
var dateUpdated = "";
global.awaitingCP = "";
global.pendingFulfillment = ""
global.awaitingCP1 = "";
global.pendingFulfillment1 = ""
global.awaitingCP2 = "";
global.pendingFulfillment2 = ""
global.ATSCountBefore = "";
global.reservedCountBefore="";
global.ATSCountafter = "";
global.reservedCountafter="";
global.ATSUpdated  = "";
global.token="";
global.FRNumber1 = "";
global.FRNumber2 = "";
global.FRNumber3 = "";


describe("BOPIS Medium Level Test Cases: ", function() {
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
    var BOPISCreate = new BOPISCreateScreen();
    var BOPISEdit = new BOPISEditScreen();
    var BOPISSummary = new BOPISSummaryScreen();
	utils.Login(browser.params.login.user,browser.params.login.password);
//BOPIS_38 : Verify if user able to complete fulfillment through Truck(Pick & pack) icon in BOPIS store portal screen
//BOPIS_39: Verify if Accept partial button/option is enabled for pending orders in BOPIS store portal screen 	
	it(" fulfillment through Truck(Pick & pack) icon in BOPIS__001", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
			callCenter.editLineGear("2");
			browser.sleep(5000);
			expect(BOPISCreate.partialAcceptLine()).toBe(true); // checking the partial accept button is enabled or not
	    	BOPISCreate.pickAndPackatLine();
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
	     BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
		 BOPISCreate.printButtonClick();
		 BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
    	 salesOrderCreate.TruckIconHeaderClick();
  	     browser.sleep(500);
  	     salesOrderCreate.pickupDetails(browser.params.custDisplayName,"Driving License","1236541","test");
  	     browser.sleep(500);
  	     salesOrderSummary.CNFButton();
  	     browser.sleep(5000);
  	     BOPISCreate.storePortalItemLine(5,1).then(function (status) {
 			orderStatus = status;
			console.log("the pickup window status after pick up is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order After pick up 
		    });
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
  	   BOPISCreate.printButtonClick();
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
	 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PICKEDUP BY CUSTOMER"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED"); //Line LEVEL; CHECKING
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");

	    });
	 });

//	BOPIS_41: Verify if user able to perform partial Accept & pick partial and complete fulfillment the order, Bopis correlation should be set to FALSE
	
	it("Verify partial Accept and complete fullfillment for SINGLE LINE _BOPIS__002", function() {
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
	    callCenter.editSKUQuantity(2);
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		    salesOrderSummary.shipmentRejectPopup(browser.params.rejectReason, browser.params.rejectComments)
		    salesOrderSummary.CNFButton();
		    browser.sleep(3000);
		    
		 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
    	 salesOrderCreate.TruckIconHeaderClick();
  	     browser.sleep(500);
  	     salesOrderCreate.pickupDetails(browser.params.custDisplayName,"Driving License","1236541","test");
  	     browser.sleep(500);
  	     salesOrderSummary.CNFButton();
  	     browser.sleep(5000);
  	     BOPISCreate.storePortalItemLine(5,1).then(function (status) {
 			orderStatus = status;
			console.log("the pickup window status after pick up is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order After pick up 
		    });
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
  	   BOPISCreate.printButtonClick();
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
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
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED"); //Line LEVEL; CHECKING
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");

	    });
	 });


//BOPIS_042: Verify if user able to accept and pick partial with multiple SKU's and complete fulfillment the order,Bopis correlation should be set to FALSE	
	
	it("Verify partial Accept and complete fullfillment for Multiuple LINE _BOPIS__003", function() {
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	    
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("4");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore1);
		browser.sleep(500);
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
	        	FRNumber1=value;
	        	console.log("the  FR Number is  "+FRNumber1);
	        	
	        });	        
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        });	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.rejectTrash();
	    	BOPISCreate.rejectOrder(1);//Reject Order
	    	BOPISCreate.BOPISReject(browser.params.rejectReason,browser.params.rejectComments);
	    	BOPISCreate.rejectConfirm();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED");
    		});
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber2);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		    
		 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //Line LEVEL 1; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("FAILED TO ALLOCATE"); //HEADER LEVEL; CHECKING
       // salesOrderSummary.salesOrderPane("Shipping Requests");
       // salesOrderSummary.collapseIcon(1);          
        //expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
	    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED"); //checking the status of the order before accepting 
	    	});
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber2);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP"); //checking the status of the order before accepting 
	    	});
	    });
	 });
	
	
//BOPIS_043:Verify if user able to perform Accept partial from the options for multiple FR's - 3Lines
	
	it("Verify partial Accept and complete fullfillment for Three LINEs _BOPIS__004", function() {
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	    
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("4");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore1);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	    
		salesOrderSummary.salesOrderSearch('SKU', browser.params.BOPISSku1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("5");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.BOPISSIteName);
		browser.sleep(500);
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
	        	FRNumber1=value;
	        	console.log("the  FR Number is  "+FRNumber1);
	        	
	        });	        
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        });	
        
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(3).then(function(value){
        	FRNumber3=value;
        	console.log("the the Third FR Number is  "+FRNumber3);
        });	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.rejectTrash();
	    	BOPISCreate.rejectOrder(1);//Reject Order
	    	BOPISCreate.BOPISReject(browser.params.rejectReason,browser.params.rejectComments);
	    	BOPISCreate.rejectConfirm();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED");
    		});
	    	
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber2);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		    callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber3);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		    
		 });
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //Line LEVEL 1; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("AWAITING CUSTOMER PICKUP"); //Line LEVEL 1; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(4)).toEqual("FAILED TO ALLOCATE"); //HEADER LEVEL; CHECKING
       
	    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED"); //checking the status of the order before accepting 
	    	});
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber2);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP"); //checking the status of the order before accepting 
	    	});
	    	
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber3);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP"); //checking the status of the order before accepting 
	    	});
	    });
	 });
	
	
	//BOPIS_44: Verify if user able to cancel partial  FR's from the cancel order screen	
	
	it("Verify if the user able to cancel the partial FR's from  cancel order screen_BOPIS__005", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
	    callCenter.editSKUQuantity(2);
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	          console.log("pre-release available count"+ATSCountBefore);
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountBefore = parseInt(qty);
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+reservedCountBefore);        
	      });
	      salesOrderSummary.Done();
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
 			orderStatus = status;
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,2);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		 });
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
	     BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
		 BOPISCreate.printButtonClick();
		 BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
		 BOPISCreate.rejectTrash();
   	  	 BOPISCreate.rejectOrder(2);//Cancel Order
   	  	 BOPISCreate.lineLevelCancel();
   	  	 BOPISCreate.lineLevelReject(1,browser.params.rejectReason1,browser.params.rejectComments);
   	  	 BOPISCreate.confirmButton();
   	  	 callCenter.fullFillmentPage();
   	  	 callCenter.page("Store Portal - V2");
   	  	 BOPISCreate.storePortalItemLine(5,1).then(function (status) {
			orderStatus = status;
			console.log("the pickup window status is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP");
			});
	 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //Line LEVEL; CHECKING
		    salesOrderSummary.lineDetails(1);
		    browser.sleep(500);
		    salesOrderSummary.inventoryOptionPane();
		    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
		    	ATSCountafter =parseInt(qty);
		          console.log("available ATS count  after cancel "+ATSCountafter);
		          expect(ATSCountafter).toEqual((ATSCountBefore-1));
		      });
		      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountafter = parseInt(qty);
		          browser.sleep(1000);
		          console.log(" available reserved count after cancel "+reservedCountafter); 
		          expect(reservedCountafter).toEqual((reservedCountBefore+1));

		      });
		      salesOrderSummary.Done();
		    salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP");
	    });

	 });

//BOPIS_045:Verify if after closing 1 line item in an order and the order status is updated as PPBC  
	
	it("Verify if after closing 1 line item in an order and status is updated as PPBC_BOPIS__006", function() {
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	    
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.editLineGear("4");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore1);
		browser.sleep(500);
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
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
	        	FRNumber1=value;
	        	console.log("the  FR Number is  "+FRNumber1);
	        	
	        });	        
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        });	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		    callCenter.fullFillmentPage();
    	 	callCenter.page("Store Portal - V2");
		    browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	     	BOPISCreate.lineSelect(1);
    	 	salesOrderCreate.TruckIconHeaderClick();
  	     	browser.sleep(500);
  	     	salesOrderCreate.pickupDetails(browser.params.custDisplayName,"Driving License","1236541","test");
  	     	browser.sleep(500);
  	     	salesOrderSummary.CNFButton();
  	     	browser.sleep(5000);
  	     	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
 				orderStatus = status;
				console.log("the pickup window status after pick up is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order After pick up 
		    });
		    
		 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY PICKEDUP BY CUSTOMER');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PARTIALLY PICKEDUP BY CUSTOMER"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("RELEASED"); //Line LEVEL 1; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("CLOSED"); //HEADER LEVEL; CHECKING
       // salesOrderSummary.salesOrderPane("Shipping Requests");
       // salesOrderSummary.collapseIcon(1);          
        //expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
	    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber1);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order before accepting 
	    	});
	    	browser.refresh();
	    	commons.searchWithCriteria("Shipment Request #","ends with",FRNumber2);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
	    	});
	    });
	 });
	
	
	
});

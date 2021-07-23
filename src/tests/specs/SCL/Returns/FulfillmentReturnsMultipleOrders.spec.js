var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.firstOrderRMANumber = "";
global.secondOrderRMANumber = "";
global.orderStatus = "";
global.SONumber1 = "";
global.SONumber2 = "";
var salesorders = [];
var salesorders1 = [];
var customers = [browser.params.custDisplayName,browser.params.customerName2];



describe("Call_center_return", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	    
	it("Multiple_Quantity_Same_Customer TC0012", function() {
	
        browser.wait(function () {
            return browser.params.orders != '';
        }).then(function () {
        	
	    	for(i=0;i<browser.params.orders;i++)
	    	{
				browser.get(callCenterInventoryUrl);
		        browser.driver.manage().window().maximize();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
		        callCenter.selectSKUFromSearch();
		        commons.search();
		        returnsCreate.clearSearch();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
		        callCenter.selectSKUFromSearch();
		        commons.search();
		        callCenter.selectSKUFromResults();
		        callCenter.addToOrder();
		        browser.sleep(1000);
		        callCenter.attachCustomer();
		        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		        salesOrderCreate.selectCustomer();
		        salesOrderCreate.useSelectedCustomer();
		        browser.sleep(500);
		      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		        salesOrderCreate.saveOption("Save");
		        salesOrderCreate.salesOrderNumber().then(function (value) {		          
		            console.log("sales order number at the "+i+" position is" +salesorders.push(value));
		            console.log("array length" +salesorders.length);
		        });
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});		
		        callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");
	    	}//for loop
	     })//first function block
        browser.wait(function () {
            return salesorders!= '';
        }).then(function () {
        	for(i=0;i<salesorders.length;i++){	            
            //!*********fulfillment request**********!//
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder in FR is "+salesorders[i])
	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(1000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            callCenter.packageSelection(browser.params.packageValue);
	            callCenter.packageTrackingNumber(1236547890);
	            browser.sleep(1000);
	            returnsCreate.multiplePackages("1","1");
	            browser.sleep(1500);
	            returnsCreate.multiplePackages("3","2");
	            callCenter.unselectPkg();
	            callCenter.addPackageToShipment();
	            browser.sleep(1000);
	            callCenter.finalizeShipment();
	            browser.sleep(7000);          
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	           // expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        	}  //for loop
        });
      
        //!***Fulfillment returns****!//
        browser.wait(function () {
            return salesorders != '';
        }).then( function () {
        	
        browser.get(FRReturnsUrl);
        commons.searchWithCriteria('Customer ID', 'starts with', browser.params.customerId);
        //commons.searchWithCriteria('Customer ID', 'starts with', "0000000580");
        returnsCreate.orderSelectForReturnClick();
        commons.search();
        returnsCreate.FRReturnsMultipleOrderSelection();
        returnsCreate.FRInspectReturnButtonClick();
        returnsCreate.FRReturnsMultipleOrdrs("Disposition",1,"DAMAGED","this is a Test");
        returnsCreate.RMASubmit();
        browser.sleep(2000);  
        browser.get(callCenterReturnsUrl);
        browser.sleep(2000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders[0].toString());
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	firstOrderRMANumber = value;
            console.log("the first order's RMA number is "+firstOrderRMANumber)
        });
        browser.sleep(3000);
        browser.refresh()
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders[1].toString());
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	secondOrderRMANumber = value;
            console.log("the the second order's RMA number is "+firstOrderRMANumber)
        }); 
        
        browser.sleep(1000);
        
        expect(firstOrderRMANumber).toEqual(secondOrderRMANumber); //Matching the RMA against both the orders
        
        });
	})
	
	
	it("Multiple_Quantity_Different_Customer TC0013", function() {
		
		browser.wait(function () {
            return browser.params.orders != '';
        }).then(function () {
        	
	    	for(i=0;i<browser.params.orders;i++)
	    	{
				browser.get(callCenterInventoryUrl);
		        browser.driver.manage().window().maximize();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
		        callCenter.selectSKUFromSearch();
		        commons.search();
		        returnsCreate.clearSearch();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
		        callCenter.selectSKUFromSearch();
		        commons.search();
		        callCenter.selectSKUFromResults();
		        callCenter.addToOrder();
		        browser.sleep(1000);
		        callCenter.attachCustomer();
		        callCenter.searchCustomer(browser.params.customerCriteria,customers[i]);
		        salesOrderCreate.selectCustomer();
		        salesOrderCreate.useSelectedCustomer();
		        browser.sleep(1000);	
		       
		        
		      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		        salesOrderCreate.saveOption("Save");
		        salesOrderCreate.salesOrderNumber().then(function (value) {		          
		            console.log("sales order number at the "+i+" position is" +salesorders1.push(value));
		            console.log("array length" +salesorders1.length);
		        });
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});		
				browser.sleep(2000);
	    	}//for loop
	    	
	     })//first function block
	     browser.wait(function () {
	            return salesorders1!= '';
	        }).then(function () {
	        	for(i=0;i<salesorders.length;i++){
		            browser.get(callCenterSalesOrdersListUrl);	            
		        	console.log("sales order number of "+i+"  is" +salesorders1[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
		            salesOrderSummary.salesOrderSelectGear("Release");
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
		            
	            //!*********fulfillment request**********!//
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder in FR is "+salesorders1[i])
	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(1000);
	            callCenter.shipAccountselect(browser.params.shipaccount);	            
	            callCenter.packageSelection(browser.params.packageValue);
	            callCenter.packageTrackingNumber(1236547890);
	            returnsCreate.multiplePackages("1","1");
	            returnsCreate.multiplePackages("3","1");	           
	            //callCenter.unselectPkg();
	            callCenter.addPackageToShipment();
	            callCenter.finalizeShipment();
	            browser.sleep(3000);	           
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(7000);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(3000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        	
	            }  //for loop
	        });
		
		 //!***Fulfillment returns****!//
        browser.wait(function () {
            return salesorders1 != '';
        }).then( function () {
        	
        browser.get(FRReturnsUrl);
        commons.searchWithCriteria('Original Order #', 'ends with', salesorders1[0].toString());
        returnsCreate.orderSelectForReturnClick();
        commons.search();
        returnsCreate.clearSearch();
        commons.searchWithCriteria('Original Order #', 'ends with', salesorders1[1].toString());
        returnsCreate.orderSelectForReturnClick();
        commons.search();
        returnsCreate.FRReturnsMultipleOrderSelection();
        browser.sleep(2000);
        returnsCreate.FRInspectReturnButtonClick();
        returnsCreate.FRReturnsMultipleOrdrs("Disposition",1,"DAMAGED","this is a Test");
        returnsCreate.RMASubmit();
        browser.sleep(2000);  
        browser.get(callCenterReturnsUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[0].toString());
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	firstOrderRMANumber = value;
            console.log("the first order's RMA number is "+firstOrderRMANumber)
        });
        browser.refresh()
        browser.sleep(2000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[1].toString());
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	secondOrderRMANumber = value;
            console.log("the the second order's RMA number is "+secondOrderRMANumber)
            browser.sleep(1000);        
            expect(firstOrderRMANumber).not.toEqual(secondOrderRMANumber); //Matching the RMA against both the orders
            
        });        
       
        });
		
	})
})

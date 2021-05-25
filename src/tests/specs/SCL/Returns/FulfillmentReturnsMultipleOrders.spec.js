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
var customers = [browser.params.customerId,browser.params.customerId2];


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
		        browser.sleep(2000);
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
		        callCenter.selectSKUFromSearch();
		        browser.sleep(2000);
		        commons.search();
		        browser.sleep(2000);
		        returnsCreate.clearSearch();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
		        browser.sleep(3000);
		        callCenter.selectSKUFromSearch();
		        browser.sleep(2000);
		        commons.search();
		        browser.sleep(2000);
		        callCenter.selectSKUFromResults();
		        callCenter.addToOrder();
		        browser.sleep(3000);
		        callCenter.attachCustomer();
		        browser.sleep(2000);
		        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		        browser.sleep(4000);
		        salesOrderCreate.selectCustomer();
		        browser.sleep(2000);
		        salesOrderCreate.useSelectedCustomer();
		        browser.sleep(3000);	 
		        callCenter.editLineGear("3");
		        browser.sleep(1000);
		        callCenter.lineItemselectOptions("Change Price");
		        browser.sleep(2000);
		        callCenter.changingUnitPrice("0");
		        callCenter.editLineGear("4");
		        callCenter.lineItemselectOptions("Change Price");
		        browser.sleep(2000);
		        callCenter.changingUnitPrice("0");
		        browser.sleep(1000);
		        callCenter.editLineGear("4");
		        callCenter.lineItemselectOptions("Edit Line");
		        browser.sleep(1000);
		        callCenter.editSKUQuantity("2");
		        browser.sleep(2000);
		        callCenter.editLinePopUpSaveBtn();
		        browser.sleep(2000); 
		        
		      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		        salesOrderCreate.saveOption("Save");
		
		        salesOrderCreate.salesOrderNumber().then(function (value) {		          
		            console.log("sales order number at the "+i+" position is" +salesorders.push(value));
		            console.log("array length" +salesorders.length);

		        });
	    	}//for loop
	    	
	     })//first function block
        
        browser.wait(function () {
            return salesorders!= '';
        }).then(function () {
        	for(i=0;i<salesorders.length;i++){
	            browser.get(callCenterSalesOrdersListUrl);	            
	        	console.log("sales order number of "+i+"  is" +salesorders[i]);
	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(3000);	           
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	            
            //!*********fulfillment request**********!//
            browser.get(fulfillmentRequestsUrl);
            console.log("the sale sorder in FR is "+salesorders[i])
            browser.sleep(2000);
            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            callCenter.shipAccountselect(browser.params.shipaccount);
            browser.sleep(2000);
            callCenter.packageSelection(browser.params.packageValue);
            browser.sleep(3000);
            callCenter.packageTrackingNumber(1236547890);
            returnsCreate.multiplePackages("1","1");
            browser.sleep(3000);
            returnsCreate.multiplePackages("3","2");
            browser.sleep(3000);
            callCenter.unselectPkg();
            browser.sleep(3000);
            callCenter.addPackageToShipment();
            browser.sleep(3000);
            callCenter.finalizeShipment();
            browser.sleep(5000);
        /*    
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(5000);
            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);*/
        	}  //for loop
        });
      
        /***Fulfillment returns****/
        browser.wait(function () {
            return salesorders != '';
        }).then( function () {
        	
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Customer ID', 'starts with', browser.params.customerId);
        //commons.searchWithCriteria('Customer ID', 'starts with', "0000000580");
        browser.sleep(5000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(4000);
        commons.search();
        browser.sleep(3000);
        returnsCreate.FRReturnsMultipleOrderSelection();
        browser.sleep(2000);
        returnsCreate.FRInspectReturnButtonClick();
        returnsCreate.FRReturnsMultipleOrdrs("Disposition",1,"DAMAGED","this is a Test");
        browser.sleep(3000);
        returnsCreate.RMASubmit();
        browser.sleep(2000);  
        browser.get(callCenterReturnsUrl);
        browser.sleep(2000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders[0].toString());
        browser.sleep(2000);
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	firstOrderRMANumber = value;
            console.log("the first order's RMA number is "+firstOrderRMANumber)
        });
        browser.sleep(3000);
        browser.refresh()
        browser.sleep(5000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders[1].toString());
        browser.sleep(2000);
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	secondOrderRMANumber = value;
            console.log("the the second order's RMA number is "+firstOrderRMANumber)
        }); 
        
        browser.sleep(3000);
        
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
		        browser.sleep(2000);
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
		        callCenter.selectSKUFromSearch();
		        browser.sleep(2000);
		        commons.search();
		        browser.sleep(2000);
		        returnsCreate.clearSearch();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
		        browser.sleep(3000);
		        callCenter.selectSKUFromSearch();
		        browser.sleep(2000);
		        commons.search();
		        browser.sleep(2000);
		        callCenter.selectSKUFromResults();
		        callCenter.addToOrder();
		        browser.sleep(3000);
		        callCenter.attachCustomer();
		        browser.sleep(2000);
		        callCenter.searchCustomer(browser.params.customerCriteria,customers[i]);
		        browser.sleep(4000);
		        salesOrderCreate.selectCustomer();
		        browser.sleep(2000);
		        salesOrderCreate.useSelectedCustomer();
		        browser.sleep(3000);	
		       /* callCenter.editLineGear("3");
		        browser.sleep(1000);
		        callCenter.lineItemselectOptions("Change Price");
		        browser.sleep(2000);
		        callCenter.changingUnitPrice("0");
		        callCenter.editLineGear("4");
		        callCenter.lineItemselectOptions("Change Price");
		        browser.sleep(2000);
		        callCenter.changingUnitPrice("0");
		        browser.sleep(1000);
		        callCenter.editLineGear("4");
		        callCenter.lineItemselectOptions("Edit Line");
		        browser.sleep(1000);
		        callCenter.editSKUQuantity("2");
		        browser.sleep(2000);
		        callCenter.editLinePopUpSaveBtn();
		        browser.sleep(2000);
		        */
		        
		      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		        salesOrderCreate.saveOption("Save");
		
		        salesOrderCreate.salesOrderNumber().then(function (value) {		          
		            console.log("sales order number at the "+i+" position is" +salesorders1.push(value));
		            console.log("array length" +salesorders1.length);

		        });
	    	}//for loop
	    	
	     })//first function block
	     browser.wait(function () {
	            return salesorders1!= '';
	        }).then(function () {
	        	for(i=0;i<salesorders.length;i++){
		            browser.get(callCenterSalesOrdersListUrl);	            
		        	console.log("sales order number of "+i+"  is" +salesorders1[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
		            browser.sleep(3000);
		            salesOrderSummary.salesOrderSelectGear("Release");
		            browser.sleep(3000);	           
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
		            
	            //!*********fulfillment request**********!//
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder in FR is "+salesorders1[i])
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
	            browser.sleep(3000);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(3000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            browser.sleep(2000);
	            callCenter.packageSelection(browser.params.packageValue);
	            browser.sleep(3000);
	            callCenter.packageTrackingNumber(1236547890);
	            returnsCreate.multiplePackages("1","1");
	            browser.sleep(3000);
	            returnsCreate.multiplePackages("3","1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	          /* 
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        	*/
	            }  //for loop
	        });
		
		 /***Fulfillment returns****/
        browser.wait(function () {
            return salesorders1 != '';
        }).then( function () {
        	
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Original Order #', 'ends with', salesorders1[0].toString());
        browser.sleep(3000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(3000);
        commons.search();
        browser.sleep(3000);
        returnsCreate.clearSearch();
        browser.sleep(3000);
        commons.searchWithCriteria('Original Order #', 'ends with', salesorders1[1].toString());
        browser.sleep(3000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(3000);
        commons.search();
        browser.sleep(3000);
        returnsCreate.FRReturnsMultipleOrderSelection();
        browser.sleep(2000);
        returnsCreate.FRInspectReturnButtonClick();
        returnsCreate.FRReturnsMultipleOrdrs("Disposition",1,"DAMAGED","this is a Test");
        browser.sleep(3000);
        returnsCreate.RMASubmit();
        browser.sleep(2000);  
        browser.get(callCenterReturnsUrl);
        browser.sleep(2000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[0].toString());
        browser.sleep(2000);
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	firstOrderRMANumber = value;
            console.log("the first order's RMA number is "+firstOrderRMANumber)
        });
        browser.sleep(3000);
        browser.refresh()
        browser.sleep(5000);
        salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[1].toString());
        browser.sleep(2000);
        returnsCreate.getRMANumberCallcenter().then(function(value) {
        	secondOrderRMANumber = value;
            console.log("the the second order's RMA number is "+secondOrderRMANumber)
            browser.sleep(1000);        
            expect(firstOrderRMANumber).not.toEqual(secondOrderRMANumber); //Matching the RMA against both the orders
            
        });        
       
        });
		
	})
})

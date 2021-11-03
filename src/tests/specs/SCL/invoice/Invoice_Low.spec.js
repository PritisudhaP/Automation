const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');

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

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');
global.bodytext = "";
global.SONumber="";
global.INVNumber= "";
global.INVNumber2="";
global.FRNumber1= "";
global.FRNumber2="";
var FRNumbers=[];
global.invoiceId="";
global.invoiceBody="";
let jsondata="";

describe( "Invoice_Low_Priority", function () {
	
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
  	utils.Login(browser.params.login.user,browser.params.login.password);

//Verify if the gear icon is appearing for invoice in "FAILED TO VALIDATE" status with Accept the order	
	it("FAILED TO VALIDATE status with Accept the order	", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
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
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(3);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        browser.sleep(1000);       
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
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        callCenter.fullFillmentPage();
        callCenter.page("Fulfillment Requests");
        console.log("the sale sorder is "+SONumber);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        callCenter.fulfillmentOrderSelectGear("Create Shipment");
        browser.sleep(1000);
        callCenter.shipAccountselect(browser.params.shipaccount);
        callCenter.packageSelection(browser.params.packageValue);
        callCenter.packageTrackingNumber(1236547890);
        returnsCreate.multiplePackages("1","3");
        returnsCreate.multiplePackages("3","2");
        callCenter.unselectPkg();
        callCenter.addPackageToShipment();
        callCenter.finalizeShipment();
        browser.sleep(5000);
        salesOrderSummary.viewShipmentVisibility();
        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
        browser.sleep(1500);
        callCenter.shipmentChangeStatusConfimation();
        browser.sleep(1000);
        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            	
            });  
      });
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.invoiceSelect();
        util.currentURL().then(function(value){
        	url=value;
	        console.log("the current url is "+url);
	        invoiceId=url.substring(67,103);
	        console.log("the Invoice id is "+invoiceId);
	     });
    	});
	});
//Get request for getting the invoice	 
        it("FAILED TO VALIDATE status with Accept the order-Getting the Invoice response", done =>{
	        var options = {
                    method: 'GET',
                    url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
            	};
            options.json = true;
            console.log("token from token generation is "+options.headers.Authorization);
            request(options, function (error, response, body) {
        		var errors = error;
        		console.log('error:', + error);
        		console.log('statusCode:', response && response.statusCode);
        		//console.log('body:', body);
        		response1 = JSON.stringify(body);
        		response2= response1.split(",")
        		console.log("the length of body array is : ", response2.length);
        		for(i=0;i<response2.length;i++){         			
        			if(response2[i]=='"header":{"status":"OPEN"'){
        				console.log("the value before updting array is "+response2[i])
        				response2[i]='"header":{"status":"FAILED_TO_VALIDATE"';
        				console.log("the value updted is "+response2[i]);
        			}                		
        		}
        		jsondata=JSON.parse(response2)
        		expect(response.statusCode).toBe(200);
        		done();
                });
        });
//PUT request for updating the invoice to FTV	        
        it("FAILED TO VALIDATE status with Accept the order-updating the the Invoice to FTV", done =>{      
	        var options = {
	                    method: 'PUT',
	                    url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
	                    headers: {
	                        'Content-Type': 'application/json',
	                        'Authorization': 'Bearer '+token
	                    },	                        
	                  body: jsondata,
	             }	  		 
		  		 options.json = true;
	            console.log("token from token generation is "+options.headers.Authorization);
	            request(options, function (error, response, body) {
	        		var errors = error;
	        		console.log('error:', + error);
	        		console.log('statusCode:', response && response.statusCode);
	        	//	console.log('body:', body);
	        		expect(response.statusCode).toBe(200);
	        		done();
	                });  
	        	}); 
    it("FAILED TO VALIDATE status with Accept the order-Final step	", function() {
	    browser.wait(function () {
	        return INVNumber != '';
	    }).then(function () {
	    	
	    	callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('FTV');
	        salesOrderSummary.salesOrderSelectGear("Accept");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
	        //expect(salesOrderSummary.salesOrderStatus()).toEqual('REJECTED');

    
      	});
    
	});

//Verify if the gear icon is appearing for invoice in "FAILED TO VALIDATE" status with Reject
	it("FAILED TO VALIDATE status with Reject invoice", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
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
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(3);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        browser.sleep(1000);       
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
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        callCenter.fullFillmentPage();
        callCenter.page("Fulfillment Requests");
        console.log("the sale sorder is "+SONumber);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        callCenter.fulfillmentOrderSelectGear("Create Shipment");
        browser.sleep(1000);
        callCenter.shipAccountselect(browser.params.shipaccount);
        callCenter.packageSelection(browser.params.packageValue);
        callCenter.packageTrackingNumber(1236547890);
        returnsCreate.multiplePackages("1","3");
        returnsCreate.multiplePackages("3","2");
        callCenter.unselectPkg();
        callCenter.addPackageToShipment();
        callCenter.finalizeShipment();
        browser.sleep(5000);
        salesOrderSummary.viewShipmentVisibility();
        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
        browser.sleep(1500);
        callCenter.shipmentChangeStatusConfimation();
        browser.sleep(1000);
        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            	
            	});  
        	});
    	});
	
		callCenter.OrdersPage();
	    callCenter.page("Invoices");
	    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	    salesOrderSummary.invoiceSelect();
	    util.currentURL().then(function(value){
	    	url=value;
	        console.log("the current url is "+url);
	        invoiceId=url.substring(67,103);
	        console.log("the Invoice id is "+invoiceId);
		});
	});
//Get request for getting the invoice	 
    it("FAILED TO VALIDATE status with Reject the order-Getting the Invoice response", done =>{
        var options = {
                method: 'GET',
                url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
        	};
        options.json = true;
        console.log("token from token generation is "+options.headers.Authorization);
        request(options, function (error, response, body) {
    		var errors = error;
    		console.log('error:', + error);
    		console.log('statusCode:', response && response.statusCode);
    		//console.log('body:', body);
    		response1 = JSON.stringify(body);
    		response2= response1.split(",")
    		console.log("the length of body array is : ", response2.length);
    		for(i=0;i<response2.length;i++){         			
    			if(response2[i]=='"header":{"status":"OPEN"'){
    				console.log("the value before updting array is "+response2[i])
    				response2[i]='"header":{"status":"FAILED_TO_VALIDATE"';
    				console.log("the value updted is "+response2[i]);
    			}                		
    		}
    		jsondata=JSON.parse(response2)
    		expect(response.statusCode).toBe(200);
    		done();
            });
    });
//PUT request for updating the invoice to FTV	        
    it("FAILED TO VALIDATE status with Reject the order-updating the the Invoice to FTV", done =>{      
        var options = {
                    method: 'PUT',
                    url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },	                        
                  body: jsondata,
             }	  		 
	  		 options.json = true;
            console.log("token from token generation is "+options.headers.Authorization);
            request(options, function (error, response, body) {
        		var errors = error;
        		console.log('error:', + error);
        		console.log('statusCode:', response && response.statusCode);
        		//console.log('body:', body);
        		expect(response.statusCode).toBe(200);
        		done();
                });  
        	}); 
    it("FAILED TO VALIDATE status with Reject the order-Final step	", function() {
	    browser.wait(function () {
	        return INVNumber != '';
	    }).then(function () {
	    	callCenter.OrdersPage();
		    callCenter.page("Invoices");
		    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		    expect(salesOrderSummary.salesOrderStatus()).toEqual('FTV');
		    salesOrderSummary.salesOrderSelectGear("Reject");
		    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		    expect(salesOrderSummary.salesOrderStatus()).toEqual('REJECTED');
		    //expect(util.searchResult().count()).toEqual(2);
		   // expect(invoiceSummary.shipmentstatus(7,1)).toEqual(SONumber);
	  	});
	});
    
  	//Verify if the gear icon is appearing for invoice in "DRAFT" status
  	it("invoice in DRAFT status", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
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
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(3);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        browser.sleep(1000);       
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
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        callCenter.fullFillmentPage();
        callCenter.page("Fulfillment Requests");
        console.log("the sale sorder is "+SONumber);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        callCenter.fulfillmentOrderSelectGear("Create Shipment");
        browser.sleep(1000);
        callCenter.shipAccountselect(browser.params.shipaccount);
        callCenter.packageSelection(browser.params.packageValue);
        callCenter.packageTrackingNumber(1236547890);
        returnsCreate.multiplePackages("1","3");
        returnsCreate.multiplePackages("3","2");
        callCenter.unselectPkg();
        callCenter.addPackageToShipment();
        callCenter.finalizeShipment();
        browser.sleep(5000);
        salesOrderSummary.viewShipmentVisibility();
        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
        browser.sleep(1500);
        callCenter.shipmentChangeStatusConfimation();
        browser.sleep(1000);
        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            	
            });  
      });
        callCenter.OrdersPage();
	    callCenter.page("Invoices");
	    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	    salesOrderSummary.invoiceSelect();
	    util.currentURL().then(function(value){
	    	url=value;
	        console.log("the current url is "+url);
	        invoiceId=url.substring(67,103);
	        console.log("the Invoice id is "+invoiceId);
			});
		});
  	});
//Get request for getting the invoice	 
    it("FAILED TO VALIDATE status with Reject the order-Getting the Invoice response", done =>{
        var options = {
                method: 'GET',
                url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
        	};
        options.json = true;
        console.log("token from token generation is "+options.headers.Authorization);
        request(options, function (error, response, body) {
    		var errors = error;
    		console.log('error:', + error);
    		console.log('statusCode:', response && response.statusCode);
    		//console.log('body:', body);
    		response1 = JSON.stringify(body);
    		response2= response1.split(",")
    		console.log("the length of body array is : ", response2.length);
    		for(i=0;i<response2.length;i++){         			
    			if(response2[i]=='"header":{"status":"OPEN"'){
    				console.log("the value before updting array is "+response2[i])
    				response2[i]='"header":{"status":"DRAFT"';
    				console.log("the value updted is "+response2[i]);
    			}                		
    		}
    		jsondata=JSON.parse(response2)
    		expect(response.statusCode).toBe(200);
    		done();
            });
    });
//PUT request for updating the invoice to FTV	        
    it("FAILED TO VALIDATE status with Reject the order-updating the the Invoice to FTV", done =>{      
        var options = {
                    method: 'PUT',
                    url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },	                        
                  body: jsondata,
             }	  		 
	  		 options.json = true;
            console.log("token from token generation is "+options.headers.Authorization);
            request(options, function (error, response, body) {
        		var errors = error;
        		console.log('error:', + error);
        		console.log('statusCode:', response && response.statusCode);
        		//console.log('body:', body);
        		expect(response.statusCode).toBe(200);
        		done();
                });  
        	}); 
    it("FAILED TO VALIDATE status with Reject the order-Final step	", function() {
	    browser.wait(function () {
	        return INVNumber != '';
	    }).then(function () {
	    	callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('DRAFT');
	        salesOrderSummary.salesOrderSelectGear("Release");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	  	});
	});

});
	
	
	

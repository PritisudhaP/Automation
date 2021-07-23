var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');

global.RMANumber = "";
global.orderStatus = "";
global.SONumber1 = "";
global.SONumber2 = "";
global.RMAStatus = "";
global.RMAInspectedStatus = "";
global.RMAchangededStatus = "";
global.Shipmentstatus = "";
global.InspectedQTY="";
global.paymentDispositionStatus = "";
global.retunInvoiceStatus = "";
global.totalShQTY = "";
global.totalRMQTy = "";
global.totalRecQty = "";
global.InspectedQTY = "";
var salesorders=[];
var orderscreated = [];


describe("Call_center_return", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	    
	it("Multiline_Multiple_Quantity_TC0003", function() {
	
        browser.wait(function () {
            return browser.params.orders != '';
        }).then(function () {
        	
	    	for(i=0;i<browser.params.orders;i++)
	    	{
				browser.get(callCenterInventoryUrl);
		        browser.driver.manage().window().maximize();
		        browser.sleep(500);
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
            //!*********fulfillment request**********!//	            
            browser.wait(function () {
                return salesorders!= '';
            }).then(function () {
            	for(i=0;i<salesorders.length;i++){
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder in FR is "+salesorders[i])
		            browser.sleep(2000);
		            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
		            browser.sleep(3000);
		            callCenter.fulfillmentOrderSelectGear("Create Shipment");
		           // browser.sleep(3000);
		            callCenter.shipAccountselect(browser.params.shipaccount);
		            browser.sleep(2000);
		            callCenter.packageSelection(browser.params.packageValue);
		            callCenter.packageTrackingNumber(1236547890);
		            returnsCreate.multiplePackages("1","1");
		            returnsCreate.multiplePackages("3","2");
		            callCenter.unselectPkg();
		            callCenter.addPackageToShipment();
		            callCenter.finalizeShipment();
		            browser.sleep(5000);
		            salesOrderSummary.viewShipmentVisibility();
		            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
		            callCenter.shipmentChangeStatusConfimation();
		            browser.sleep(3000);
		            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        	}  //for loop
        	
        	///******CREATING THE INVOICE for shipments*********////
            
            browser.get(routeUrl);
            commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');
            utils.status(5,1).then(function (value) {
				savedStatus = value;
			    console.log("the route status is "+savedStatus);	
			    returnsCreate.startingReturnInvoiceRoute(savedStatus,2);
			});	
            browser.sleep(2000);
			expect(utils.status(5,1)).toEqual("STARTED");
            browser.get(routeUrl);
            commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');
            utils.status(5,1).then(function (value) {
				savedStatus = value;
			    console.log("the route status is "+savedStatus);	
			    returnsCreate.StopRoute(savedStatus,2);
			});	
            expect(utils.status(5,1)).toEqual("STOPPED");
            browser.sleep(3000);
            
        })//second function block
		
        ///***call center returns****////
	        browser.wait(function () {
	            return salesorders != '';
	        }).then( function () {
	       	
            browser.get(callCenterReturnsUrl);
	        returnsCreate.createNewRMA();
	        for(i=0;i<salesorders.length;i++)
	        { 
	            console.log("the sale sorder # in returns screen "+salesorders[i]);
		        commons.searchWithCriteria('Order #', 'contains', salesorders[i]);
		        returnsCreate.orderSelectForReturnClick();
		        commons.search();
		        returnsCreate.clearSearch();
	        }    
		        returnsCreate.RMASelectAll();
		        browser.sleep(1000);
		        returnsCreate.createNewRma();
		        browser.sleep(1000);
		        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
		        browser.sleep(1000);
		        returnsCreate.multipleRMACreation("Create","DMAGED","This is a Test");
		        browser.sleep(1000);
		        commons.save(); //saving the RMA
		        returnsCreate.getRMANumber().then(function(value) {
	                RMAdata = value.substring(14, 24);
	                RMANumber = RMAdata;
	                console.log("the RMA Number is: "+RMANumber);
	                })
	            returnsCreate.RMASubmit();
	            browser.sleep(2000);
	           /* //expect(browser.params.RMAExpected).toEqual(RMANumber);
	            browser.sleep(3000);
	            browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            returnsCreate.RMAStatus().then(function (status) {
	                RMAStatus = status;
	                console.log("the status of the RMA  #"+RMANumber+" is: "+RMAStatus);
	                expect(RMAStatus).toEqual("OPEN");
	
	            	})
	       */
	      })
	      
	     //**********RMA Returns*********//

	         browser.wait(function () {
	            return RMANumber != '';
	        }).then( function () {
	        	     
	        	browser.get(RMAReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMASelect();
		        returnsCreate.multipleRMACreation("Inspect","DMAGED","This is a Test");
		      //checking the order number
		        returnsCreate.firstOrderCheck().then(function (order) {
		        	firstOrder = order;
		        	console.log("first order number "+firstOrder)
	                expect(salesorders).toContain(firstOrder);
		        });		        
		        returnsCreate.secondOrderCheck().then(function (order) {
		        	secondOrder = order;
		        	console.log("second order number "+secondOrder)
	                expect(salesorders).toContain(secondOrder);
		        });		        
		        returnsCreate.inspectSubmit();
		        browser.sleep(3000);		        
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAInspectedStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	                expect(RMAInspectedStatus).toEqual("INSPECTED");
	            });
	      
	      })
	})
})

var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.RMANumber = "";
global.orderStatus = "";
global.SONumber = "";
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

describe("Call center return : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	    
	it("Call center Return Flow - Partial Quantity TC0002", function() {
		
			browser.get(callcenterorder);
			browser.driver.manage().window().maximize();
	        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
	        browser.sleep(300);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });
	        browser.sleep(2000);
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
	            console.log("the sale sorder is "+SONumber)
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(2000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            callCenter.packageSelection(browser.params.packageValue);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("4");
	            callCenter.unselectPkg();
	            callCenter.addPackageToShipment();
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(3000);
	        })
	        
	      ///***call center returns****////
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
            browser.get(callCenterReturnsUrl);
            console.log("the sale sorder # in returns screen "+SONumber)
	        returnsCreate.createNewRMA();
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
	        returnsCreate.orderSelectForReturnCheckBox();
	        returnsCreate.OrderSelectionButtonCartIcon();
	        browser.sleep(1000);
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(500);
	        returnsCreate.EditLine();
	        returnsCreate.addNewLine();
	        returnsCreate.linedispositionDetails(2, "DAMAGED", "this is a test");
	        browser.sleep(3000);
	        commons.save(); //saving the returning line
	        browser.sleep(1000);
	        commons.save(); //saving the RMA
	        returnsCreate.getRMANumber().then(function(value) {
                RMAdata = value.substring(14, 24);
                RMANumber = RMAdata;
                console.log("the RMA Number is: "+RMANumber);
                })
            returnsCreate.RMASubmit();
            browser.sleep(2000);
            //expect(browser.params.RMAExpected).toEqual(RMANumber);
            browser.sleep(3000);
            browser.get(callCenterReturnsUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            returnsCreate.RMAStatus().then(function (status) {
                RMAStatus = status;
                console.log("the status of the RMA for the order #"+SONumber+" is: "+RMAStatus);
                expect(RMAStatus).toEqual("OPEN");

            	})
	      })
	      
	        //**********RMA Returns*********//
	        
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	     
	        	browser.get(RMAReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMASelect();
	            returnsCreate.inspectclick();	            
	            returnsCreate.getRMAQuantity().then(function(value) {
	                InspectedQTY = value;
	                expect(InspectedQTY).toEqual('2');

	            })
	            returnsCreate.inspectDetails("DAMAGED","This is a Test");  	
		        browser.sleep(1000);
	            commons.save(); //saving disposition
		        browser.sleep(3000);
		        returnsCreate.inspectSubmit();
		        browser.sleep(3000);
		        
	            browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAInspectedStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	                expect(RMAInspectedStatus).toEqual("INSPECTED");

	            })
	            
	            ///*****Adding payment disposition**********////
	        	browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(1500);
	            callCenter.editLineGear("1");
	            returnsCreate.paymentDispositionClik();
	            //returnsCreate.addPaymentDispositionNotes(browser.params.DispositionNote);
	          //  browser.sleep(3000);
	           // commons.save();
	            returnsCreate.refundtype(browser.params.refundMethod);
	            commons.save();
	            returnsCreate.paymentDispositionSubmit();
	            browser.sleep(3000);    
	        	browser.get(paymentDispositionUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	paymentDispositionStatus = status;
		                console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
		                expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");

		            })

	            ///******Changing the inspected status*********////      
	            
	            browser.get(returnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.inspectedRMASelect();
	            callCenter.editLineGear("2");
	            returnsCreate.changeStatusclick();
	            returnsCreate.newstatusupdate("RECEIVED");
	            browser.sleep(1000);
	            returnsCreate.receivedDate();
	            browser.sleep(1000);
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAchangededStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after changing the status is : "+RMAchangededStatus);
	                expect(RMAchangededStatus).toEqual("RECEIVED");

	            })
	            
	             ///******CREATING THE RETURN INVOICE*********////
	            
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.startingReturnInvoiceRoute(savedStatus,2);
				});	
	            browser.sleep(2000);
				expect(utils.status(5,1)).toEqual("STARTED");	          
				browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	retunInvoiceStatus = status;
	                console.log("the status of the RMA# "+SONumber+" after running the route is: "+retunInvoiceStatus);
	                expect(retunInvoiceStatus).toEqual("INVOICED");

	            	})
	            	
	           //******Partial Quantity verification***********///

	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            callCenter.editLineGear("1");
	            callCenter.lineItemselectOptions("VIEW");
	            browser.sleep(2000);
	      //checking total QTY Shipped
	            returnsCreate.totalShippedQTY().then(function (shippedqty) {
	            	totalShQTY = shippedqty;
	                console.log("Total QTY Shipped: "+totalShQTY);
	                expect(totalShQTY).toEqual("2");

	            	})
	            	
	   //checking total RMA QTY       	
	            
	            	returnsCreate.totalRmaQty().then(function (rmaqty) {
	            	totalRMQTy = rmaqty;
	                console.log("Total RMA QTY : "+totalRMQTy);
	                expect(totalRMQTy).toEqual("2");

	            	})
	            	
	  //checking total received QTY       	
	            
	            	returnsCreate.totalReceivedQty().then(function (received) {
	            	totalRecQty = received;
	                console.log("Total Received QTY : "+totalRecQty);
	                expect(totalRecQty).toEqual("2");

	            	})
	            	
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.StopRoute(savedStatus,2);
				});	
	            expect(utils.status(5,1)).toEqual("STOPPED");
	            browser.sleep(3000);
	            	
	        })	        
		 
	})

})
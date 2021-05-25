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
		
			browser.get(callCenterInventoryUrl);
	        browser.driver.manage().window().maximize();
	        browser.sleep(2000);
	        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
	        browser.sleep(3000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(2000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(3000);	 
	        callCenter.editLineGear("3");
	        browser.sleep(1000);
	        callCenter.lineItemselectOptions("Edit Line");
	        browser.sleep(1000);
	        callCenter.editSKUQuantity("4");
	        browser.sleep(2000);
	        callCenter.editLinePopUpSaveBtn();
	        browser.sleep(2000);
	       	        
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
	        salesOrderCreate.saveOption("Save");

	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });

	        browser.sleep(2000);
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
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
		            expect(orderStatus).toEqual('RELEASED');
	            });

	            //!*********fulfillment request**********!//
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber)
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(3000);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(3000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            browser.sleep(2000);
	            callCenter.packageSelection(browser.params.packageValue);
	            browser.sleep(5000);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("4");
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
	            
	        })
	        
	      ///***call center returns****////
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
            browser.get(callCenterReturnsUrl);
	        browser.sleep(3000);
            console.log("the sale sorder # in returns screen "+SONumber)
	        returnsCreate.createNewRMA();
	        browser.sleep(2000);
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        browser.sleep(3000);
	        returnsCreate.orderSelectForReturnClick();
	        browser.sleep(4000);
	        commons.search();
	        browser.sleep(3000);
	        returnsCreate.orderSelectForReturnCheckBox();
	        browser.sleep(3000);
	        returnsCreate.OrderSelectionButtonCartIcon();
	        browser.sleep(4000);
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(2000);
	        returnsCreate.EditLine();
	        browser.sleep(4000);
	        returnsCreate.addNewLine();
	        browser.sleep(2000);
	        returnsCreate.linedispositionDetails(2, "DAMAGED", "this is a test");
	        browser.sleep(3000);
	        commons.save(); //saving the returning line
	        browser.sleep(4000);
	        commons.save(); //saving the RMA
	        returnsCreate.getRMANumber().then(function(value) {
                RMAdata = value.substring(14, 24);
                RMANumber = RMAdata;
                console.log("the RMA Number is: "+RMANumber);
                })
            browser.sleep(2000);
            returnsCreate.RMASubmit();
            browser.sleep(2000);
            //expect(browser.params.RMAExpected).toEqual(RMANumber);
            browser.sleep(3000);
            browser.get(callCenterReturnsUrl);
            browser.sleep(5000);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
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
	            browser.sleep(3000);
	            returnsCreate.RMASelect();
	            browser.sleep(3000);
	            returnsCreate.inspectclick();	            
	            browser.sleep(2000);
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
	            browser.sleep(3000);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAInspectedStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	                expect(RMAInspectedStatus).toEqual("INSPECTED");

	            })
	            
	            ///*****Adding payment disposition**********////
	        	browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(5000);       
	            callCenter.editLineGear("1");
	            browser.sleep(2000);	
	            returnsCreate.paymentDispositionClik();
	            browser.sleep(3000);
	            //returnsCreate.addPaymentDispositionNotes(browser.params.DispositionNote);
	          //  browser.sleep(3000);
	           // commons.save();
	            returnsCreate.refundtype(browser.params.refundMethod);
	            browser.sleep(3000)
	            commons.save();
	            browser.sleep(3000);
	            returnsCreate.paymentDispositionSubmit();
	            browser.sleep(3000);    
	        	browser.get(paymentDispositionUrl);
	        	browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            returnsCreate.RMAStatus().then(function (status) {
	            	paymentDispositionStatus = status;
		                console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
		                expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");

		            })

	            ///******Changing the inspected status*********////      
	            
	            browser.get(returnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            returnsCreate.inspectedRMASelect();
	            browser.sleep(1000);
	            callCenter.editLineGear("2");
	            browser.sleep(1000);
	            returnsCreate.changeStatusclick();
	            browser.sleep(2000);
	            returnsCreate.newstatusupdate("RECEIVED");
	            browser.sleep(1000);
	            returnsCreate.receivedDate();
	            browser.sleep(1000);
	            browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAchangededStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after changing the status is : "+RMAchangededStatus);
	                expect(RMAchangededStatus).toEqual("RECEIVED");

	            })
	            
	             ///******CREATING THE RETURN INVOICE*********////
	            
	            browser.get(routeUrl);
	            browser.sleep(3000);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
		        browser.sleep(3000);
		        returnsCreate.startingReturnInvoiceRoute();
	            browser.sleep(4000);
	            browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            returnsCreate.RMAStatus().then(function (status) {
	            	retunInvoiceStatus = status;
	                console.log("the status of the RMA# "+SONumber+" after running the route is: "+retunInvoiceStatus);
	                expect(retunInvoiceStatus).toEqual("INVOICED");

	            	})
	            	
	           //******Partial Quantity verification***********///

	            browser.get(callCenterReturnsUrl);
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            browser.sleep(3000);
	            callCenter.editLineGear("1");
	            browser.sleep(1000);
	            callCenter.lineItemselectOptions("VIEW");
	            browser.sleep(3000);
	      //checking total QTY Shipped
	            returnsCreate.totalShippedQTY().then(function (shippedqty) {
	            	totalShQTY = shippedqty;
	                console.log("Total QTY Shipped: "+totalShQTY);
	                expect(totalShQTY).toEqual("4");

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
	            browser.sleep(3000);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
		        browser.sleep(3000);
		        returnsCreate.stoppingRoute(2);
	            browser.sleep(3000);
	            	
	        })	        
		 
	})

})
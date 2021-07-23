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
global.SONumber = "";
global.RMAStatus = "";
global.RMAInspectedStatus = "";
global.RMAchangededStatus = "";
global.Shipmentstatus = "";
global.InspectedQTY="";
global.paymentDispositionStatus = "";
global.retunInvoiceStatus = "";

describe("Call center return : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	    
	it("Call center Return Flow TC0001", function() {
		
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
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
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
	            callCenter.enterItemQty("1");
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
	                  	
		});
	        
	     //!***call center returns****!//
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
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(1000);
	        returnsCreate.EditLine();
	        browser.sleep(1000);
	        returnsCreate.addNewLine();
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        browser.sleep(1000);
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
            //browser.sleep(3000);
            browser.get(callCenterReturnsUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            returnsCreate.RMAStatus().then(function (status) {
                RMAStatus = status;
                console.log("the status of the RMA for the order #"+SONumber+" is: "+RMAStatus);
                expect(RMAStatus).toEqual("OPEN");

            	})	       
	        })
	            browser.sleep(2000);	        	        
	        //!**********RMA Returns*********!//
	        
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
	        	browser.get(RMAReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMASelect();
	            browser.sleep(1000);
	            returnsCreate.inspectclick();
	            returnsCreate.getRMAQuantity().then(function(value) {
	                InspectedQTY = value;
	                expect(InspectedQTY).toEqual('1');

	            })
	            returnsCreate.inspectDetails("DAMAGED","This is a Test");  	
	            commons.save(); //saving disposition
		        browser.sleep(1000);
		        returnsCreate.inspectSubmit();
		        browser.sleep(3000);
		        
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAInspectedStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	                expect(RMAInspectedStatus).toEqual("INSPECTED");

	            })
	            browser.sleep(2000);	            
	            ///*****Adding payment disposition**********////
	        	browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
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
	        	browser.sleep(3000);
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
	            returnsCreate.receivedDate();
	            browser.sleep(2000);
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAchangededStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after changing the status is : "+RMAchangededStatus);
	                expect(RMAchangededStatus).toEqual("RECEIVED");

	            })
	            browser.sleep(2000);

	             ///******CREATING THE RETURN INVOICE*********////
	            
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.StopRoute(savedStatus,3);
				});	
	            expect(utils.status(5,2)).toEqual("STARTED");
	            browser.sleep(4000);    
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	retunInvoiceStatus = status;
	                console.log("the status of the RMA# "+SONumber+" ater running the route is: "+retunInvoiceStatus);
	                expect(retunInvoiceStatus).toEqual("INVOICED");
	                browser.get(routeUrl);
		            browser.sleep(3000);
		            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
		            utils.status(5,2).then(function (value) {
						savedStatus = value;
					    console.log("the route status is "+savedStatus);	
					    returnsCreate.StopRoute(savedStatus,3);
					});	
		            expect(utils.status(5,2)).toEqual("STOPPED");
	            	});
	        });
	  })
})
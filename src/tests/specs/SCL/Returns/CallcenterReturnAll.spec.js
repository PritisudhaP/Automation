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
global.SONumber1 = "";
global.SONumber2 = "";
global.totalShQTY = "";
global.totalRMQTy = "";
global.totalRecQty = "";
global.InspectedQTY = "";
var salesorders=[];
var orderscreated = [];

describe("Call center return : ", function() {
  	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();
	utils.Login(browser.params.login.user,browser.params.login.password);
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
	            /!*****Adding payment disposition**********!/
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

	            //!******Changing the inspected status*********!/ /     
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

	             //!******CREATING THE RETURN INVOICE*********!//
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');		        
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.startingReturnInvoiceRoute(savedStatus,2);
				});	
	            expect(utils.status(5,1)).toEqual("STARTED");
	            browser.sleep(4000);    
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	retunInvoiceStatus = status;
	                console.log("the status of the RMA# "+SONumber+" ater running the route is: "+retunInvoiceStatus);
	                expect(retunInvoiceStatus).toEqual("INVOICED");
	            });
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');		        
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.StopRoute(savedStatus,2);
				});	
	            expect(utils.status(5,1)).toEqual("STOPPED");
	        });
	  })
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
	      
	        //!**********RMA Returns*********!//
	        
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
	            
	           / /!*****Adding payment disposition**********!//
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

	            //!******Changing the inspected status*********!/ /     
	            
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
	            
	            //!******CREATING THE RETURN INVOICE*********!//
	            	            
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
	            	
	           //!******Partial Quantity verification***********!//

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
        	
        	//!******CREATING THE INVOICE for shipments*********!//
            
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
            
        });//second function block
		
       //!***call center returns****!//
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
	            //expect(browser.params.RMAExpected).toEqual(RMANumber);
	           // browser.sleep(3000);
	           // browser.get(callCenterReturnsUrl);
	            //browser.sleep(3000);
	          //  salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	        //    browser.sleep(3000);
	      //      returnsCreate.RMAStatus().then(function (status) {
	    //            RMAStatus = status;
	                console.log("the status of the RMA  #"+RMANumber+" is: "+RMAStatus);
	  //              expect(RMAStatus).toEqual("OPEN");
	//
	       //     	})
	       
	      })
	      
	   //!**********RMA Returns*********!//

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
	
	it("Call center Returns Validation TC0023", function() {
		
		browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
		browser.sleep(2000);
        
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            salesOrderSummary.salesOrderSelectGear("Release");           
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });

            //!*********fulfillment request**********!//
         
            browser.get(fulfillmentRequestsUrl);
            console.log("the sale sorder is "+SONumber)
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(2000);
            callCenter.shipAccountselect(browser.params.shipaccount);
            callCenter.packageSelection(browser.params.packageValue);
            callCenter.packageTrackingNumber(1236547890);
            callCenter.enterItemQty("1");
            callCenter.unselectPkg();
            callCenter.addPackageToShipment();
            callCenter.finalizeShipment();
            browser.sleep(1500);
            salesOrderSummary.viewShipmentVisibility();
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(5000);
                  	
        })

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {      
			browser.get(callCenterReturnsUrl);
	        browser.driver.manage().window().maximize();
	//total display validation    
	         returnsSummary.totalResults().then(function (total) {
	         	rslt = total.substring(0, 5);
	         	totalresult = parseInt(rslt);
	            console.log("The total results available are : "+totalresult);
	            expect(totalresult).toBeGreaterThan(1000);
	
		            });
	         browser.refresh();
		     returnsCreate.createNewRMA();

	//customer ID search      
	         commons.searchWithCriteria('Customer ID', 'starts with',browser.params.customerId);
	         browser.sleep(3000);
	         expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);
	         browser.refresh();
	         
	//customer Name search      
	         browser.sleep(1000);
	         commons.searchWithCriteria('Customer Name', 'starts with',browser.params.custFirstName);
	         expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);  
	         browser.refresh();	
	       //customer ID search for more than one customer and advanced criteria     
	         browser.sleep(1000);
	         commons.searchWithCriteria('Customer ID', 'contains',browser.params.customerId2);
	         returnsSummary.selectAllResultFromListCheck();
	         returnsSummary.advancedsearchClick();
	// expect(returnsSummary.advancedTabDetails()).toEqual(2);
	         returnsSummary.deleteTheAdancedCriteria(2);
	         commons.search();
	         expect(returnsSummary.searchValidation(browser.params.advancesearchName)).toBe(false);
	//adding disposition
		    browser.sleep(2000);
	        browser.refresh();	
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
		    returnsCreate.orderSelectForReturnCheckBox();
		    returnsCreate.OrderSelectionButtonCartIcon();
		   // returnsCreate.returningLocationDropDown(browser.params.returninglocation);
		    returnsCreate.EditLine();
		    //returnsCreate.addNewLine(); 
		    //browser.sleep(2000);
	        commons.save();
            expect(returnsEdit.AlertPresence()).toBe(true);//no items selected//already known issue.
	        //returnsCreate.orderSelectForReturnCheckBox();
	        //browser.sleep(2000);
	        //returnsCreate.OrderSelectionButtonCartIcon();
	        //browser.sleep(1000);
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(1000);
	        returnsCreate.EditLine();
	        browser.sleep(4000);
	        returnsCreate.addNewLine();	    
	//without any details    
	        commons.save();
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);	                    	
	        expect(returnsCreate.noDispositionReasonError(2)).toBe(true);
	       
	//with qty but no reason
	        
	        returnsCreate.linedispositionreasonValidation(1, "this is a test");
	        commons.save();
	        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
	        browser.sleep(1000);
	 //with reason but no qty
	        returnsCreate.clearQTy();
	        returnsCreate.linedispositionNoQTYValidation("DAMAGED", "this is a test");
	        commons.save();
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	//0 QTY
	        browser.sleep(1000);
	        returnsCreate.linedispositionDetails(0,"DAMAGED", "this is a test");
	        commons.save();
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	//-ve QTY
	        returnsCreate.clearQTy();
	        returnsCreate.linedispositionDetails(-2,"DAMAGED", "this is a test");
	        commons.save();
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	        
	//more than available qty  
	        returnsCreate.clearQTy();
	        returnsCreate.linedispositionDetails(100,"DAMAGED", "this is a test");
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
	//adding details
	        returnsCreate.linedispositionDetails(1,"DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save();//saving disposition
	//no location dropdown checking
	       // browser.sleep(2000);
	        commons.save();
	//finalizing the RMA Creation        
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(4000);
	        returnsCreate.getRMANumber().then(function(value) {
	            RMAdata = value.substring(14, 24);
	            RMANumber = RMAdata;
	            console.log("the RMA Number is: "+RMANumber);
	            })
	        returnsCreate.RMASubmit();
	        browser.sleep(1000);	  
        });
	})
	
	it("Call center Returns Mulitple RMA creation for same order TC0024", function() {
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
		browser.wait(function () {
            return SONumber != '';
        }).then( function () {	    
	        browser.get(callCenterReturnsUrl);
	       // console.log("the sale sorder # in returns screen "+SONumber)
	        returnsCreate.createNewRMA();
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
	        returnsCreate.orderSelectForReturnCheckBox();
	        returnsCreate.OrderSelectionButtonCartIcon();
	        returnsCreate.returningLocationDropDown(browser.params.retruninglocation1);
	        browser.sleep(2000);
	        returnsCreate.EditLine();
	        returnsCreate.addNewLine();
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        commons.save(); //saving the returning line
	        browser.sleep(2000);
	        commons.save(); //saving the RMA
	       // returnsCreate.RMAPresence();
	        returnsCreate.getRMANumber().then(function(value) {
	            RMAdata = value.substring(14, 24);
	            RMANumber = RMAdata;
	            console.log("the RMA Number is: "+RMANumber);
	            });
	        returnsCreate.RMASubmit();
	        browser.sleep(2000);
        });
		browser.wait(function () {
            return SONumber != '';
        }).then( function () {	    
	        browser.get(callCenterReturnsUrl);
	       // console.log("the sale sorder # in returns screen "+SONumber)
	        returnsCreate.createNewRMA();
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
	        returnsCreate.orderSelectForReturnCheckBox();
	        returnsCreate.OrderSelectionButtonCartIcon();
	        returnsCreate.returningLocationDropDown(browser.params.retruninglocation1);
	        browser.sleep(2000);
	        returnsCreate.EditLine();
	        returnsCreate.addNewLine();
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        commons.save(); //saving the returning line
	        browser.sleep(2000);
	        commons.save(); //saving the RMA
	       // returnsCreate.RMAPresence();
	        browser.sleep(3000);
	        if(expect( returnsCreate.multipleReturnItemAlert()).toBe(true))//multiple RMA creation error message pop up check
	        {
	        	console.log("Alert present")
	        }
	        else{
	        	returnsCreate.getRMANumber().then(function(value) {
		            RMAdata = value.substring(14, 24);
		            RMANumber = RMAdata;
		            console.log("the RMA Number is: "+RMANumber);
	            });
		        returnsCreate.RMASubmit();
		        browser.sleep(2000);
	        }
        });
		browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        browser.get(callCenterReturnsUrl);
        salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
        expect(returnsSummary.multipleRMAForSingleOrderInSearchScreen().count()).toEqual(1);
        browser.sleep(1000);    
       });    
	
	})
	
	it("RMA returns validation TC0025", function() {
        	browser.get(RMAReturnsUrl);
            //total display validation    
            returnsSummary.totalResults().then(function (total) {
            	rslt = total.substring(0, 5);
            	totalresult = parseInt(rslt);
            	console.log("The total results available are : "+totalresult);
            	expect(totalresult).toBeGreaterThan(40);
   	        });
      //customer ID search      
            browser.sleep(3000);
            commons.searchWithCriteria('Customer ID', 'starts with',browser.params.customerId);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);
            browser.refresh();
       //customer Name search      
            browser.sleep(3000);
            commons.searchWithCriteria('Customer Name', 'starts with',browser.params.custFirstName);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);  
            browser.refresh();

   		 browser.wait(function () {
   	            return SONumber != '';
   	        }).then( function () {	   	        	
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(3000);
	            returnsCreate.RMASelect();
	            browser.sleep(1000);
//without adding details
		        returnsCreate.inspectSubmit();
		        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
//inspecting screen
	            returnsCreate.inspectclick();
	            browser.sleep(1000);
//with out any details
	            commons.save(); //saving disposition
		        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);//ALREADY KNOWN ISSUE
		        browser.sleep(1000);
		       // returnsCreate.inspectSubmit();
		       // expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
   	        });
		        
//going back to RMA Returns		        
   		browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
   		 		browser.get(RMAReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            returnsCreate.RMASelect();
	            returnsCreate.addNewLine();
	            returnsCreate.RMASelect();
	            returnsCreate.inspectclick();
	            returnsCreate.addNewLine();
	            returnsCreate.linedispositionDetails(1,"DAMAGED","This is a Test");  	
	            commons.save(); //saving disposition
	            expect(returnsEdit.AlertPresence()).toBe(false);

	
	     });
	 })
	 
})
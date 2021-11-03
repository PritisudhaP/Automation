var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');

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
global.orderReturnStatus = "";
global.orderReturnReleaseStatus = "";
var customers = [browser.params.custDisplayName,browser.params.customerName2];
var salesorders = [];
var salesorders1 = [];
global.firstOrderRMANumber = "";
global.secondOrderRMANumber = "";
global.SONumber1 = "";
global.SONumber2 = "";

describe("Fulfillment return: ", function() {
  	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();
	var invoiceSummary=new invoiceSummaryScreen();

	utils.Login(browser.params.login.user,browser.params.login.password);
   it('Fulfillment return full QTY - TC0007', function(){
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
	            console.log("the sale sorder is "+SONumber)
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            browser.sleep(2000);
	            callCenter.packageSelection(browser.params.packageValue);
	            browser.sleep(5000);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("1");
	          //  callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);	                    	
	 
	        })
	        
	        //!***Fulfillment returns****!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
            browser.get(FRReturnsUrl);
	        browser.sleep(3000);
            console.log("the sale sorder # in returns screen "+SONumber);
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
	     //   returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	     //   browser.sleep(2000);
	        returnsCreate.EditLine();
	        browser.sleep(4000);
	        returnsCreate.addFRDisposition();
	        browser.sleep(2000);
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        browser.sleep(3000);
	        commons.save(); //saving the returning line
	        browser.sleep(4000);	        
            returnsCreate.RMASubmit();
            browser.sleep(2000);           
	       
	        })
	        
	     //!*********payment disposition************!//
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        browser.get(paymentDispositionUrl);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
            browser.sleep(5000);       
            returnsEdit.selectRMALineClickForReceive();//clicking on the selected order at payment disposition screen.
            browser.sleep(3000);
            returnsCreate.refundtype(browser.params.refundMethod);
            browser.sleep(3000)
            commons.save();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsCreate.paymentDispositionSubmit();
            browser.sleep(3000);    
           // 	browser.get(paymentDispositionUrl);
        	//browser.sleep(3000);
            //salesOrderSummary.salesOrderSearch("RMA Number", RMANumber.toString());
           // browser.sleep(3000);
           // returnsCreate.RMAStatus().then(function (status) {
           // 	paymentDispositionStatus = status;
	        //        console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
	         //       expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");

	           // });
	        })
	        
	      //!**************Changing status to Received***************************!//
	        
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        
	            browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('PENDING PAYMENT');

	            });               
                browser.sleep(2000);
                returnsEdit.selectRMALineClickForReceive();
                browser.sleep(2000);
                callCenter.editLineGear("1")
                browser.sleep(1000);
                callCenter.lineItemselectOptions("Receive Inventory");
                browser.sleep(1000);
                returnsEdit.selectInvPool("San Diego - DC");
                browser.sleep(2000);
                returnsEdit.itemReceive();
                browser.sleep(1000);
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnStatus);
		            expect(orderReturnStatus).toEqual('RECEIVED');
            	
	            });      

	        });  
     })
     
   
     it('Fulfillment return Partial QTY - TC0008', function(){
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
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(2000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            callCenter.packageSelection(browser.params.packageValue);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("4");
	         //   callCenter.unselectPkg();
	            callCenter.addPackageToShipment();
	            browser.sleep(1000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(3000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);                   	
	        })
	        
	        //!***Fulfillment returns****!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
            browser.get(FRReturnsUrl);
            console.log("the sale sorder # in returns screen "+SONumber);
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
	        returnsCreate.orderSelectForReturnCheckBox();
	        returnsCreate.OrderSelectionButtonCartIcon();
	        returnsCreate.EditLine();
	        returnsCreate.addFRDisposition();
	        returnsCreate.linedispositionDetails(2, "DAMAGED", "this is a test");
	        commons.save(); //saving the returning line
	        browser.sleep(2000);	        
            returnsCreate.RMASubmit();
            browser.sleep(1000);           	       
	        });
	        
	     //!*********payment disposition************!//
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        browser.get(paymentDispositionUrl);
            salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
            returnsEdit.selectRMALineClickForReceive();//clicking on the selected order at payment disposition screen.
            returnsCreate.refundtype(browser.params.refundMethod);
            commons.save();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsCreate.paymentDispositionSubmit();
            browser.sleep(3000);    
        	
	        })
	        
	      //!**************Changing status to Received***************************!//
	        
	         browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        
	            browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('PENDING PAYMENT');

	            });               
                returnsEdit.selectRMALineClickForReceive();
                callCenter.editLineGear("1")
                callCenter.lineItemselectOptions("Receive Inventory");
                returnsEdit.selectInvPool("San Diego - DC");
                returnsEdit.itemReceive();
                browser.sleep(1000);
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnStatus);
		            expect(orderReturnStatus).toEqual('RECEIVED');
            	
	            });      

	        });  
     })
     	it('Partially Shipped- TC0009', function(){
    	
    	browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize(); browser.sleep(2000);
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
        //commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
        salesOrderSummary.salesOrderSearch("SKU", browser.params.searchValueSKU2);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectItemFromSOScreen();
        callCenter.addToOrderFromSalesOrder();
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
            returnsCreate.selectShipmentLine();
            callCenter.shipmentLineReject("2");
            callCenter.ShipmentReject(1,"Product Damaged","This is a test");
            callCenter.fulfillmentOrderShipmentStatusChanage("Create Shipment")
            browser.sleep(1000);
            callCenter.shipAccountselect(browser.params.shipaccount);
            callCenter.packageSelection(browser.params.packageValue);
            callCenter.packageTrackingNumber(1236547890);
            callCenter.enterItemQty("1");
          //  callCenter.unselectPkg();
            callCenter.addPackageToShipment();
            callCenter.finalizeShipment();
            browser.sleep(5000);
            salesOrderSummary.viewShipmentVisibility();
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(3000);
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            });                
        });
        
        //!***Fulfillment returns****!//
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {        	
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        console.log("the sale sorder # in returns screen "+SONumber);
        commons.searchWithCriteria('Order #', 'ends with', SONumber);
        returnsCreate.orderSelectForReturnClick();
        commons.search();
        returnsCreate.orderSelectForReturnCheckBox();
        returnsCreate.OrderSelectionButtonCartIcon();
        returnsCreate.EditLine();
        returnsCreate.addFRDisposition();
        browser.sleep(2000);
        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
        commons.save(); //saving the returning line
        browser.sleep(1000);	        
        returnsCreate.RMASubmit();
        browser.sleep(2000); 
        browser.get(callCenterReturnsUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        returnsCreate.RMAStatus().then(function (status) {
            RMAStatus = status;
            console.log("the status of the RMA for the order #"+SONumber+" is: "+RMAStatus);
            expect(RMAStatus).toEqual("INSPECTED");

        }); 
	        browser.get(paymentDispositionUrl);
	        salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
	        returnsCreate.getRMANumberCallcenter().then(function(value) {
	        	RMANmber = value;
	            console.log("the RMA number is "+RMANmber)
	        });
	        	browser.sleep(1000);
        
       });
            browser.wait(function () {
                return SONumber != '';
            }).then( function () { 
        	browser.get(returnsUrl);
            salesOrderSummary.salesOrderSearch("RMA Number", RMANmber);
            returnsEdit.selectRMALineClickForReceive();
            callCenter.editLineGear("1")
            callCenter.lineItemselectOptions("Receive Inventory");
            returnsEdit.selectInvPool("San Diego - DC");
            returnsEdit.itemReceive();
            browser.sleep(2000);
            browser.get(callCenterReturnsUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            returnsCreate.RMAStatus().then(function (status) {
            	RMAchangededStatus = status;
                console.log("the status of the SO#"+ SONumber+" after changing the status is : "+RMAchangededStatus);
                expect(RMAchangededStatus).toEqual("RECEIVED");

            })
        	
        });	
    })     
     it("Multiple_Quantity_Same_Customer TC0012", function() {
	
        browser.wait(function () {
            return browser.params.orders != '';
        }).then(function () {
	    	for(i=0;i<browser.params.orders;i++)
	    	{
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
		        browser.sleep(1000);
		        callCenter.attachCustomer();
		        callCenter.searchCustomer("Name", browser.params.custDisplayName);
		        salesOrderCreate.selectCustomer();
		        salesOrderCreate.useSelectedCustomer();
		        browser.sleep(500);
		        callCenter.editLineGear("4");
		        callCenter.lineItemselectOptions("Edit Line");
		        callCenter.editSKUQuantity(2);
		        callCenter.editLinePopUpSaveBtn(); 
		      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		        salesOrderCreate.saveOption("Save");
		        salesOrderCreate.salesOrderNumber().then(function (value) {		          
		            console.log("sales order number at the "+i+" position is" +salesorders.push(value));
		            console.log("array length" +salesorders.length);
		            SONumber=value;
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
		        browser.wait(function () {
		        	return SONumber != '';
		        	}).then( function () {
				        callCenter.fullFillmentPage();
					    callCenter.page("Fulfillment Requests");
					    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
			            callCenter.fulfillmentOrderSelectGear("Create Shipment");
			            browser.sleep(1000);
			            callCenter.shipAccountselect(browser.params.shipaccount);
			            callCenter.packageSelection(browser.params.packageValue);
			            callCenter.packageTrackingNumber(1236547890);
			            returnsCreate.multiplePackages("1","1");
			            returnsCreate.multiplePackages("3","2");
			            //callCenter.unselectPkg();
			            callCenter.addPackageToShipment();
			            browser.sleep(1000);
			            callCenter.finalizeShipment();
			            browser.sleep(7000);          
			            salesOrderSummary.viewShipmentVisibility();
			            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
			            callCenter.shipmentChangeStatusConfimation();
		        	});
	    	}//for loop
	     })//first function block
	     
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
		            SONumber=value;
		        });
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});		
				browser.sleep(2000);
				callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
		        browser.wait(function () {
		        	return SONumber != '';
		        	}).then( function () {
				        callCenter.fullFillmentPage();
					    callCenter.page("Fulfillment Requests");
					    console.log("the sale sorder in FR is "+salesorders1[i])
			            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
			            callCenter.fulfillmentOrderSelectGear("Create Shipment");
			            browser.sleep(1000);
			            callCenter.shipAccountselect(browser.params.shipaccount);	            
			            callCenter.packageSelection(browser.params.packageValue);
			            callCenter.packageTrackingNumber(1236547890);
			            returnsCreate.multiplePackages("1","1");
			            returnsCreate.multiplePackages("3","1");	           
			            callCenter.unselectPkg();
			            callCenter.addPackageToShipment();
			            callCenter.finalizeShipment();
			            browser.sleep(3000);	           
			            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
			            browser.sleep(7000);
			            callCenter.shipmentChangeStatusConfimation();
			            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
		        	});
	    	}//for loop
	    	
	     })//first function block
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
	
	it("Multiple Line RMA Creation TC0014", function() {
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
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
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
	          //  callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(3000);
	            //expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        
	        });
	        
	        //!***Fulfillment returns****!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
            browser.get(FRReturnsUrl);
	        browser.sleep(3000);
            console.log("the sale sorder # in returns screen "+SONumber);
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
	     //   returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	     //   browser.sleep(2000);
	        returnsCreate.multipleLineEdit(1);
	        browser.sleep(4000);
	        returnsCreate.addFRDisposition();
	        browser.sleep(2000);
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is Line1 test");
	        browser.sleep(3000);
	        commons.save(); //saving the returning line
	        browser.sleep(4000);	        
            returnsCreate.RMASubmit();
            browser.sleep(2000);
            
   //adding disposition for second line 
            
            browser.get(FRReturnsUrl);
	        browser.sleep(3000);
            console.log("the sale sorder # in returns screen "+SONumber);
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
	     //   returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	     //   browser.sleep(2000);
	        returnsCreate.multipleLineEdit(2);
	        browser.sleep(4000);
	        returnsCreate.addFRDisposition();
	        browser.sleep(2000);
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is Line2 test");
	        browser.sleep(3000);
	        commons.save(); //saving the returning line
	        browser.sleep(4000);	        
            returnsCreate.RMASubmit();
            browser.sleep(2000);           
	       
	        });
	 
	  //!*********payment disposition************!//
     
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        browser.get(paymentDispositionUrl);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
            browser.sleep(5000);   
            expect(returnsSummary.multipleRMAForSingleOrderInSearchScreen().count()).toEqual(2);
            browser.sleep(1000);
            expect(returnsSummary.RMALineStatus(1)).toEqual("INSPECTED");
            browser.sleep(1000);
            expect(returnsSummary.RMALineItems(2)).toEqual(browser.params.SkuName1);
            browser.sleep(1000);
            returnsSummary.backToPaymentdisposition();
            browser.sleep(4000);
            expect(returnsSummary.RMALineStatus(2)).toEqual("INSPECTED");
            browser.sleep(1000);
            expect(returnsSummary.RMALineItems(1)).toEqual(browser.params.SkuName2);
            browser.sleep(1000);
            returnsSummary.backToPaymentdisposition();
            browser.sleep(2000);

	     });    
                
	});
});        
	        
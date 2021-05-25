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
global.orderReturnStatus = "";
global.orderReturnReleaseStatus = "";


describe("Fulfillment return: ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
        it('Fulfillment return full QTY - TC0007', function(){
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
	        browser.sleep(4000);
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        browser.sleep(3000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(2000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(3000);	       
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);


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
	            callCenter.enterItemQty("1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
/*	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);	                    	
	*/ 
	        })
	        
	        //***Fulfillment returns****////
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
	        
	     /*********payment disposition************/
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
            /* 	browser.get(paymentDispositionUrl);
        	browser.sleep(3000);
            salesOrderSummary.salesOrderSearch("RMA Number", RMANumber.toString());
            browser.sleep(3000);
            returnsCreate.RMAStatus().then(function (status) {
            	paymentDispositionStatus = status;
	                console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
	                expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");

	            });*/
	        })
	        
	      /**************Changing status to Received***************************/
	        
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
})
	        
	        
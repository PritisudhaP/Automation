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

describe("Fulfillment return : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();

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
	            callCenter.unselectPkg();
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
	        
	        //***Fulfillment returns****////
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
	        
	     /*********payment disposition************/
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
	        
	      /**************Changing status to Received***************************/
	        
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
})
	        
	        
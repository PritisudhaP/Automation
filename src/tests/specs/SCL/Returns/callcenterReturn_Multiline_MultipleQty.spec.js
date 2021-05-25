var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

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
		            //SONumber = value;
		        	//salesorders[i]=value;
		        	//salesorders.push(value);
		            console.log("sales order number at the "+i+" position is" +salesorders.push(value));
		            console.log("array length" +salesorders.length);

		        });
	    	}//for loop
	    	
	     })//first function block
        
        browser.wait(function () {
            return salesorders!= '';
        }).then(function () {
        	for(i=0;i<salesorders.length;i++){
        		
	        	//orderscreated.push(salesorders[i]);
        		//SONumber1 = orderscreated[0];
		    	//SONumber2 = orderscreated[1]
		    	//console.log("first order number is "+SONumber1);
		    	//console.log("second order number is "+SONumber2)
		    	
	            browser.get(callCenterSalesOrdersListUrl);	            
	        	console.log("sales order number of "+i+"  is" +salesorders[i]);
	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
	            //commons.multiselect();
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(3000);
	           /* salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                //console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
        	  });  		         */

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
          /*  callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(5000);
            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        	*/}  //for loop
        	
        	///******CREATING THE INVOICE for shipments*********////
            
            browser.get(routeUrl);
            browser.sleep(3000);
            commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');
	        browser.sleep(3000);
	        returnsCreate.startingReturnInvoiceRoute();
            browser.sleep(2000);
            
            browser.get(routeUrl);
            browser.sleep(3000);
            commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');
	        browser.sleep(3000);
	        returnsCreate.stoppingRoute(2);
            browser.sleep(3000);
            
        })//second function block
		
        ///***call center returns****////
	        browser.wait(function () {
	            return salesorders != '';
	        }).then( function () {
	       	
            browser.get(callCenterReturnsUrl);
	        browser.sleep(2000);
	        returnsCreate.createNewRMA();
	        browser.sleep(2000);
	        for(i=0;i<salesorders.length;i++)
	        { 
	            console.log("the sale sorder # in returns screen "+salesorders[i]);
		        commons.searchWithCriteria('Order #', 'contains', salesorders[i]);
		        browser.sleep(3000);
		        returnsCreate.orderSelectForReturnClick();
		        browser.sleep(4000);
		        commons.search();
		        browser.sleep(3000);
		        returnsCreate.clearSearch();
	        }    
		        returnsCreate.RMASelectAll();
		        browser.sleep(1000);
		        returnsCreate.createNewRma();
		        browser.sleep(4000);
		        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
		        browser.sleep(2000);
		        returnsCreate.multipleRMACreation("Create","DMAGED","This is a Test");
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
	            browser.sleep(3000);
	            returnsCreate.RMASelect();
	            browser.sleep(3000);
		        returnsCreate.multipleRMACreation("Inspect","DMAGED","This is a Test");
		      //checking the order number
		        returnsCreate.firstOrderCheck().then(function (order) {
		        	firstOrder = order;
		        	console.log("first order number "+firstOrder)
	                expect(firstOrder).toEqual(salesorders[1]);

		        });		        
		        returnsCreate.secondOrderCheck().then(function (order) {
		        	secondOrder = order;
		        	console.log("second order number "+secondOrder)
	                expect(secondOrder).toEqual(salesorders[0]);

		        });		        
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

	            });
	      
	      })
	})
})

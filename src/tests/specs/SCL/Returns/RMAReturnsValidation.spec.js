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

describe("Call center return : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	       
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
            expect(returnsEdit.AlertPresence()).toBe(true);//no items selected
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
		
		browser.wait(function () {
            return SONumber != '';
        }).then( function () {
	       for(var i=0;i<2;i++){	
	        browser.get(callCenterReturnsUrl);
	        browser.sleep(3000);
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
	        returnsCreate.RMAPresence();
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
		        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);//ALREADY AN ISSUE
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
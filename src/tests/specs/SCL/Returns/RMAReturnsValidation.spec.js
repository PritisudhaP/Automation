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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

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
          /*  callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(5000);
           */       	
        })

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {      
			browser.get(callCenterReturnsUrl);
	        browser.driver.manage().window().maximize();
	        browser.sleep(4000);
	//total display validation    
	         returnsSummary.totalResults().then(function (total) {
	         	rslt = total.substring(0, 5);
	         	totalresult = parseInt(rslt);
	            console.log("The total results available are : "+totalresult);
	            expect(totalresult).toBeGreaterThan(2484);
	
		            });
	         browser.refresh();
	         browser.sleep(2000);
		     returnsCreate.createNewRMA();

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
	       //customer ID search for more than one customer and advanced criteria     
	         browser.sleep(3000);
	         commons.searchWithCriteria('Customer ID', 'contains',browser.params.customerId2);
	         browser.sleep(3000);
	         returnsSummary.selectAllResultFromListCheck();
	         browser.sleep(2000);
	         returnsSummary.advancedsearchClick();
	         browser.sleep(1000);
	// expect(returnsSummary.advancedTabDetails()).toEqual(2);
	         browser.sleep(2000);
	         returnsSummary.deleteTheAdancedCriteria(2);
	         browser.sleep(2000);
	         commons.search();
	         browser.sleep(000);
	         expect(returnsSummary.searchValidation(browser.params.advancesearchName)).toBe(false);
	//adding disposition
		    browser.sleep(2000);
	        browser.refresh();	
	        browser.sleep(2000);        
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        browser.sleep(3000);
	        returnsCreate.orderSelectForReturnClick();
	        browser.sleep(4000);
	        commons.search();
	        browser.sleep(2000);	        
		    returnsCreate.orderSelectForReturnCheckBox();
		    browser.sleep(2000);
		    returnsCreate.OrderSelectionButtonCartIcon();
		    browser.sleep(1000);
		   // returnsCreate.returningLocationDropDown(browser.params.returninglocation);
		    browser.sleep(1000);
		    returnsCreate.EditLine();
		    browser.sleep(1000);
		    //returnsCreate.addNewLine(); 
		    //browser.sleep(2000);
		    browser.sleep(1000);
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
	        browser.sleep(1000);
	        commons.save();
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);	                    	
	        expect(returnsCreate.noDispositionReasonError(2)).toBe(true);
	       
	//with qty but no reason
	        
	        browser.sleep(1000);
	        returnsCreate.linedispositionreasonValidation(1, "this is a test");
	        browser.sleep(1000);
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
	        browser.sleep(1000);
	 //with reason but no qty
	        returnsCreate.clearQTy();
	        browser.sleep(1000);
	        returnsCreate.linedispositionNoQTYValidation("DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	//0 QTY
	        browser.sleep(1000);
	        returnsCreate.linedispositionDetails(0,"DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	//-ve QTY
	        returnsCreate.clearQTy();
	        browser.sleep(1000);
	        returnsCreate.linedispositionDetails(-2,"DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
	        browser.sleep(1000);
	        
	//more than available qty  
	        returnsCreate.clearQTy();
	        browser.sleep(2000);
	        returnsCreate.linedispositionDetails(100,"DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save();
	        browser.sleep(1000);
	        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
	        browser.sleep(1000);
	//adding details
	        //returnsCreate.linedispositionDetails(1,"DAMAGED", "this is a test");
	     ///   browser.sleep(1000);
	      //  commons.save();//saving disposition
	//no location dropdown checking
	       // browser.sleep(2000);
	        //commons.save();
	//finalizing the RMA Creation        
	    //    returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	  //      browser.sleep(4000);
	 //       browser.sleep(4000);
	  //      returnsCreate.getRMANumber().then(function(value) {
	  //          RMAdata = value.substring(14, 24);
	  //          RMANumber = RMAdata;
	  //          console.log("the RMA Number is: "+RMANumber);
	  //          })
	  ///      browser.sleep(1000);
	  //      returnsCreate.RMASubmit();
	  //      browser.sleep(1000);	  
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
	        browser.sleep(2000);
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        browser.sleep(3000);
	        returnsCreate.orderSelectForReturnClick();
	        browser.sleep(2000);
	        commons.search();
	        browser.sleep(2000);
	        returnsCreate.orderSelectForReturnCheckBox();
	        browser.sleep(1000);
	        returnsCreate.OrderSelectionButtonCartIcon();
	        browser.sleep(2000);
	        returnsCreate.returningLocationDropDown("San Diego - DC");
	        browser.sleep(3000);
	        returnsCreate.EditLine();
	        browser.sleep(1000);
	        returnsCreate.addNewLine();
	        browser.sleep(1000);
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save(); //saving the returning line
	        browser.sleep(5000);
	        commons.save(); //saving the RMA
	        browser.sleep(15000);
	        returnsCreate.getRMANumber().then(function(value) {
	            RMAdata = value.substring(14, 24);
	            RMANumber = RMAdata;
	            console.log("the RMA Number is: "+RMANumber);
	            });
	        browser.sleep(1000);
	        returnsCreate.RMASubmit();
	        browser.sleep(2000);
	       	}
        });
        
		
		browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        browser.get(callCenterReturnsUrl);
        browser.sleep(3000);
        salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
        browser.sleep(3000);   
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
               expect(totalresult).toBeGreaterThan(235);

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
		        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
		        browser.sleep(1000);
		       // returnsCreate.inspectSubmit();
		       // expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
   	        });
		        
//going back to RMA Returns		        
   		browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
   		 		browser.get(RMAReturnsUrl);
		        browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            returnsCreate.RMASelect();
	            browser.sleep(1000);
	            returnsCreate.addNewLine();
	            browser.sleep(1000);
	            returnsCreate.RMASelect();
	            returnsCreate.inspectclick();
	            browser.sleep(1000);
	            returnsCreate.addNewLine();
	            returnsCreate.linedispositionDetails(1,"DAMAGED","This is a Test");  	
		        browser.sleep(1000);
	            commons.save(); //saving disposition
	            expect(returnsEdit.AlertPresence()).toBe(false);

	
	     });
	 })
	 
})
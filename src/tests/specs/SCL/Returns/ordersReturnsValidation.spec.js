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

describe("Order returns : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();  
		it('Validations - TC0020', function(){
			
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
	        browser.sleep(4000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(2000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(3000);	       
	      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(2000);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });

	        browser.wait(function () {
	            return SONumber!= '';
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
            browser.sleep(2000);
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
          //  returnsCreate.multiplePackages("3","1");
          //  browser.sleep(3000);
            callCenter.unselectPkg();
            browser.sleep(3000);
            callCenter.addPackageToShipment();
            browser.sleep(3000);
            callCenter.finalizeShipment();
          /*browser.sleep(5000);
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(3000);
            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
            */
            browser.sleep(3000);
			browser.get(returnsUrl);
            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();
            returnsCreate.orderReturn(); 
            commons.customerLookup();
  //customer Name search      
            browser.sleep(3000);
            commons.searchWithCriteria('Name', 'contains',browser.params.custDisplayName);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.filterCheck(1)).toContain(browser.params.custFirstName);
            browser.refresh();       
 //customer search using Email address  
            commons.customerLookup();
            browser.sleep(2000);
            commons.searchWithCriteria('Customer Email Address', 'contains',browser.params.customerEmail);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.filterCheck(2)).toEqual(browser.params.customerEmail);
//end//            
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
            browser.sleep(2000);  
//Order filter validation            
            commons.searchWithCriteria("Order #","contains",SONumber);
            browser.sleep(1000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.resultCheck(2)).toEqual(SONumber);
            browser.sleep(2000);
            returnsCreate.selectOrder();
            browser.sleep(2000);           
  //use selected button click without selecting the order         
            returnsCreate.UseSelectedItemButtonClick();
            //expect(returnsEdit.AlertPresence()).toBe(true); 
//selecting the items
            returnsCreate.selectOrder();
            browser.sleep(2000);
            returnsCreate.selectAllLineitem();
            browser.sleep(2000);
  //return location validation
         //   expect(returnsCreate.returnLocationValidation("")).toBe(true); 
         //   browser.sleep(2500);
            returnsCreate.returnLocationSelect("Joliet-DC");
            browser.sleep(1000);
            returnsCreate.saveReturns(); 
            browser.sleep(3000);
//credit type       
           // returnsCreate.creditType("");            
           // browser.sleep(2000);
            returnsCreate.orderReturnQtyTextbox(0);
            browser.sleep(2000);
            returnsCreate.totalReturnsItem("");           
            browser.sleep(1000);
            returnsCreate.saveReturns(); 
            browser.sleep(2000);
            expect(returnsCreate.reasonvalidation()).toBe(true); 
            browser.sleep(2000);
 //saving the return
            returnsCreate.totalReturnsItem("DAMAGED");           
            browser.sleep(2000);
            returnsCreate.orderReturnQtyTextbox(1);
            browser.sleep(1000);
            returnsCreate.creditType("REFUND");            
            browser.sleep(2000);
            returnsEdit.saveReturns();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsEdit.saveAndReleaseReturns();
            browser.sleep(3000);          
            returnsCreate.RMAGenerate();
            browser.sleep(2000);
		});
	        browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                browser.sleep(3000);
//customer name check on the  order returns screen
                
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(3000);
                expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
                browser.sleep(1000);
                expect(returnsCreate.resultCheck(2)).toEqual(browser.params.custDisplayName);
                browser.refresh();       
//RMA Number display check 
                browser.sleep(3000);
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(3000);
                expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
                browser.sleep(1000);
                expect(returnsCreate.resultCheck(1)).toEqual(RMANumber);
              
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });

            });  	
	});
});
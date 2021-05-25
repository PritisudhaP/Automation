var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.firstOrderRMANumber = "";
global.secondOrderRMANumber = "";
global.orderStatus = "";
global.SONumber = "";

describe("Call_center_return", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
	    
	it("Multiple Line RMA Creation TC0014", function() {

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
	            returnsCreate.multiplePackages("3","1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	           /* callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        */
	        });
	        
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
	 
	  /*********payment disposition************/
     
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
                
	})
})

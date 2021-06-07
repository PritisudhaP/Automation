var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');


global.orderStatus = "";
global.SONumber = "";

describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	let EC = protractor.ExpectedConditions;
  //Cancel qty with 2 digit at order level.
  it('canceling 50 Lines or More at Header Level ', function () {
	  
	  browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      callCenter.itemsPerPage("50");
      browser.sleep(1000);
      commons.searchWithCriteria('SKU', 'contains', "A");
      callCenter.itemsPerPage("50");
      browser.sleep(2000);
      //callCenter.selectSKUFromSearch();
      callCenter.selectAllSKU();
      browser.sleep(2000);
      commons.search();
      browser.sleep(1000);   
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      callCenter.preseneceChecking();
     // browser.manage().timeouts().implicitlyWait(10000); 
      callCenter.attachCustomer();
      browser.sleep(1000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custDisplayName);
      browser.sleep(1000);
      salesOrderCreate.selectCustomer();
      browser.sleep(1000);
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
		browser.sleep(15000);
		browser.wait(function () {
            return SONumber != '';
        }).then(function () {
           browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            //expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          });	 
           salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	       browser.sleep(1000);	       
	       callCenter.editLineGear(1);
	       callCenter.lineItemselectOptions("Cancel");
	       salesOrderSummary.CancellAllLine();
	       salesOrderSummary.CancelAllLineReason("NotNeeded");
	       browser.sleep(1000);
	       salesOrderSummary.CNFButton();
	       browser.sleep(2000);
	       expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELLED");//after completely canceling the line item	        
		   browser.sleep(2000);
        });
	   
  	});
});
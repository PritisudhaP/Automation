var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');


global.orderStatus = "";
global.SONumber = "";
global.ATS1 = "";
global.Res1 = "";
global.ATS2 = "";
global.Res2 = "";
global.ATSafterCancel1 = "";
global.ResafterCancel1 = "";
global.ATSafterCancel2 = "";
global.ResafterCancel2 = "";
global.incQtySave = "";
global.incQtySave = "";
global.availabletoCancel = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	
  //partialy released status cancel line item.
  it('Cancelig the Partially shipped Order-Line Level', function () {
  
	  
	  browser.get(InventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      salesOrderCreate.AddSkuOption();
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU3);
      salesOrderCreate.SelectFirstSKU(1)
      browser.sleep(1000);
      salesOrderCreate.useSelectedSkuOption();
      salesOrderCreate.minimumSkuQTYUpdate();
      salesOrderCreate.skuSearch();
      browser.sleep(500);
      salesOrderCreate.ATSCountcheck(1).then(function (totalAvailableValue) {
    	  ATS1 = parseInt(totalAvailableValue);
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);  
          salesOrderCreate.ATSCountupdate(ATS1);
      });   
      browser.sleep(1500);
      browser.get(callcenterorder);
      browser.driver.manage().window().maximize();
      callCenter.attachCustomer();
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
      salesOrderCreate.selectCustomer();
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(1000)
      salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
      callCenter.selectSKUFromSearch();
      commons.search();
      callCenter.selectSKUFromResults();
      callCenter.addToOrderFromSalesOrder();
      salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      commons.search();
      callCenter.selectSKUFromResults();
      callCenter.addToOrderFromSalesOrder();
      browser.sleep(500);       
      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
      browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
	
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
          });
           salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	       browser.sleep(2000);	     
	       //expect(salesOrderSummary.LinceCancelCheck(1,"NotNeeded")).toEqual("CANCELLED");
	       callCenter.editLineGear("4");
	        callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	        browser.sleep(1000);
	        salesOrderSummary.avaialbleTocancelQTY(5).then(function (value) {    
	        	Cancel = value;
	        	availabletoCancel = parseInt(Cancel);
			    console.log("Remaining qty to cancel "+availabletoCancel);	       
		        salesOrderSummary.CanclQTY(availabletoCancel)
		        salesOrderSummary.CanclReason("NotNeeded");
		        browser.sleep(1000);
		        salesOrderSummary.CancelNotes("This is a Test Cancellation");
		        browser.sleep(1000);
		        salesOrderSummary.CNFButton();
	        });
	        browser.sleep(2000);
	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("CANCELLED");//after completely canceling the line item
	        browser.sleep(1000);
        });
    });
  	
 //partially released status cancel whole order.
  it('Cancellig the Partially shipped Order - Header Level', function () {
	  
	  browser.get(InventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      salesOrderCreate.AddSkuOption();
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU3);
      salesOrderCreate.SelectFirstSKU(1)
      browser.sleep(1000);
      salesOrderCreate.useSelectedSkuOption();
      salesOrderCreate.minimumSkuQTYUpdate();
      salesOrderCreate.skuSearch();
      browser.sleep(500);
      salesOrderCreate.ATSCountcheck(1).then(function (totalAvailableValue) {
    	  ATS1 = parseInt(totalAvailableValue);
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);  
          salesOrderCreate.ATSCountupdate(ATS1);
      });   
      browser.sleep(1500);
      browser.get(callcenterorder);
      browser.driver.manage().window().maximize();
      callCenter.attachCustomer();
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
      salesOrderCreate.selectCustomer();
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(1000)
      salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
      callCenter.selectSKUFromSearch();
      commons.search();
      callCenter.selectSKUFromResults();
      callCenter.addToOrderFromSalesOrder();
      salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      commons.search();
      callCenter.selectSKUFromResults();
      callCenter.addToOrderFromSalesOrder();
      browser.sleep(500);       
     
      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
      browser.sleep(300);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
	
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
          });
           salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	       browser.sleep(2000);	    
	       callCenter.editLineGear(1);
	       callCenter.lineItemselectOptions("Cancel");
	       browser.sleep(1000);
	       salesOrderSummary.cancelAllLines();//canceling all the items at header level one by one by entering the reason.
	       browser.sleep(2000);
	       salesOrderSummary.CNFButton();
	       browser.sleep(2000);
	       expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED");//after completely canceling the order

	       
        });
    });
  
});

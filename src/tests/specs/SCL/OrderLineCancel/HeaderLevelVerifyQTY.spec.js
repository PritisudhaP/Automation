var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

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
global.ATSAfterHeaderCancel1="";
global.ATSAfterHeaderCancel2="";
global.ResAfterHeaderCancel1="";
global.ResAfterHeaderCancel2="";
global.incQtySave = "";
global.incQtySave = "";
global.availabletoCancel = "";
describe('Order Line Cancel ', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();

    //Verify ATS and reserved qty while cancelling Released status order at header level.
    //Verify ATS and reserved qty while cancelling few line items at header level.
  it('Verifying ATS and reserved qty while cancelling an order at header level ', function () {     


	  browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(1000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      browser.sleep(1000);
      commons.search();
      browser.sleep(1000);    
      callCenter.invSelection(1);
      browser.sleep(1000);
      //>>>>>>>>>>>Before release Inventory levels>>>>>>>>>>
      callCenter.inventoryDetailsCount("9").then(function (totalAvailableValue) {
    	  ATS1 = totalAvailableValue;
         // postInventoryCount = totalAvailableQty - 1;
          browser.sleep(1000);
          console.log("pre-release available count"+ATS1);
         // browser.sleep(1000);
      });
      browser.sleep(1000);
      callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
    	  Res1 = reservedValue;
          //postResCount = reservedInventoryQty + 1;
          browser.sleep(1000);
          console.log("pre-release reserved count"+Res1);        
          //browser.sleep(1000);
      });
      commons.cancel();
      browser.sleep(1000);
      returnsCreate.clearSearch();
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
      browser.sleep(1000);
      callCenter.selectSKUFromSearch();
      browser.sleep(1000);
      commons.search();
      browser.sleep(1000);
      callCenter.invSelection(2);
      browser.sleep(1000);
      //>>>>>>>>>>>Before release Inventory levels>>>>>>>>>>
      callCenter.inventoryDetailsCount("9").then(function (totalAvailableValue) {
    	  ATS2 = totalAvailableValue;
         // postInventoryCount = totalAvailableQty - 1;
          browser.sleep(1000);
          console.log("pre-release available count"+ATS2);
          browser.sleep(1000);
      });
      browser.sleep(1000);
      callCenter.inventoryDetailsCount("10").then(function (reservedValue) {
    	  Res2 = reservedValue;
          //postResCount = reservedInventoryQty + 1;
          browser.sleep(1000);
          console.log("pre-release reserved count"+Res2);        
          browser.sleep(1000);
      });  
      commons.cancel();
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      browser.sleep(2000);
      callCenter.attachCustomer();
      browser.sleep(2000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custDisplayName);
      browser.sleep(3000);
      salesOrderCreate.selectCustomer();
      browser.sleep(2000);
      salesOrderCreate.useSelectedCustomer();
      browser.sleep(1000);
      callCenter.editLineGear("3");
      callCenter.lineItemselectOptions("Edit Line");
      browser.sleep(1000);
      callCenter.editSKUQuantity(browser.params.Incqty);
      browser.sleep(1000);
      callCenter.editLinePopUpSaveBtn();
      browser.sleep(2000); 
      callCenter.editLineGear("4");
      callCenter.lineItemselectOptions("Edit Line");
      browser.sleep(1000);
      callCenter.editSKUQuantity(browser.params.Incqty);
      browser.sleep(1000);
      callCenter.editLinePopUpSaveBtn();
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          });	 
           salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	       browser.sleep(2000);
//Partial Header level cancel
	       
	       callCenter.editLineGear(1);
	       callCenter.lineItemselectOptions("Cancel");
	       browser.sleep(1000);
	       salesOrderSummary.CanclQTYHeaderLevel(1, 1);
	       browser.sleep(1000);
	       salesOrderSummary.CanclQTYHeaderLevel(2, 1);
	       browser.sleep(1000);
	       salesOrderSummary.CanclReasonHeaderLevel(1, "NotNeeded");
	       browser.sleep(1000);
	       salesOrderSummary.CanclReasonHeaderLevel(2, "NotNeeded");
	       browser.sleep(1000);
	       salesOrderSummary.CNFButton();
	       browser.sleep(2000);
	       salesOrderSummary.lineDetails(1);
	       browser.sleep(500);
	       salesOrderSummary.inventoryOptionPane();
	       browser.sleep(1000);
	      //>>>>>>>>>>>After partial line cancel Inventory levels>>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSafterCancel1 = totalAvailableValue;
	           // postInventoryCount = totalAvailableQty - 1;
	            browser.sleep(1000);
	            console.log("available count after partially cancellig the line1: "+ATSafterCancel1);
	            browser.sleep(1000);
	            diff1=ATS1-ATSafterCancel1;
	            expect(diff1).toEqual((browser.params.Incqty)-1)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	      	  ResafterCancel1 = reservedValue;
	            //postResCount = reservedInventoryQty + 1;
	            browser.sleep(1000);
	            console.log("available reserved count after partially cancellig the line1: "+ResafterCancel1);        
	            browser.sleep(1000);
	            diff2=ResafterCancel1-Res1;
	            expect(diff1).toEqual((browser.params.Incqty)-1)
	       });  
	       salesOrderSummary.Done();
	       browser.sleep(2000);
	       salesOrderSummary.lineDetails(2);
	       browser.sleep(500);
	       salesOrderSummary.inventoryOptionPane();
	       browser.sleep(1000);
	      //>>>>>>>>>>>After partial line cancel Inventory levels>>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSafterCancel2 = totalAvailableValue;
	           // postInventoryCount = totalAvailableQty - 1;
	            browser.sleep(1000);
	            console.log("available count after partially cancellig the line 2: "+ATSafterCancel2);
	            browser.sleep(1000);
	            diff2=ATS2-ATSafterCancel2;
	            expect(diff2).toEqual((browser.params.Incqty)-1)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	      	  ResafterCancel2 = reservedValue;
	            //postResCount = reservedInventoryQty + 1;
	            browser.sleep(1000);
	            console.log("available reserved count after partially cancellig the line2: "+ResafterCancel2);        
	            browser.sleep(1000);
	            diff2=ResafterCancel2-Res2;
	            expect(diff2).toEqual((browser.params.Incqty)-1)
	        });  
	        salesOrderSummary.Done();

//Complete Header level cancel
	       callCenter.editLineGear(1);
	       callCenter.lineItemselectOptions("Cancel");
	       browser.sleep(1000);
//cancel all line check
	       salesOrderSummary.CancellAllLine();
	       expect(salesOrderSummary.reasonDropdownAvailability()).toBe(false);
	       browser.sleep(1000);
	       salesOrderSummary.CancellAllLine();
	       expect(salesOrderSummary.cancelQTYHeaderLevelCheck(1)).toBe(true);
	       expect(salesOrderSummary.cancelQTYHeaderLevelCheck(2)).toBe(true);
	       expect(salesOrderSummary.reasonDropdownAvailability()).toBe(true);
	       browser.sleep(1000);
//Complete Header level cancel	       
	       salesOrderSummary.CancellAllLine();
	       salesOrderSummary.CancelAllLineReason("NotNeeded");
	       browser.sleep(1000);
	       salesOrderSummary.CNFButton();
	       browser.sleep(2000);
	       salesOrderSummary.lineDetails(1);
	       browser.sleep(500);
	       salesOrderSummary.inventoryOptionPane();
	       browser.sleep(1000);
	     //>>>>>>>>>>>After complete header cancel Inventory levels>>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSAfterHeaderCancel1 = totalAvailableValue;
	            browser.sleep(1000);
	            console.log("available count after complete  cancellation of line1: "+ATSAfterHeaderCancel1);
	            browser.sleep(1000);
	            expect(ATS1).toEqual(ATSAfterHeaderCancel1)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	        	ResAfterHeaderCancel1 = reservedValue;
	            browser.sleep(1000);
	            console.log("available reserved count after complete  cancellation of line1: "+ResAfterHeaderCancel1);        
	            browser.sleep(1000);
	            expect(Res1).toEqual(ResAfterHeaderCancel1)
	       });  
	       salesOrderSummary.Done();
	       browser.sleep(2000);
	       salesOrderSummary.lineDetails(2);
	       browser.sleep(500);
	       salesOrderSummary.inventoryOptionPane();
	       browser.sleep(1000);
	      //>>>>>>>>>>>After complete line cancel Inventory levels>>>>>>>>>>
	        salesOrderSummary.inventoryDetailsCountInSO("1").then(function (totalAvailableValue) {
	        	ATSAfterHeaderCancel2 = totalAvailableValue;
	            browser.sleep(1000);
	            console.log("available count after complete  cancellation of line 2: "+ATSAfterHeaderCancel2);
	            browser.sleep(1000);
	            expect(ATS2).toEqual(ATSAfterHeaderCancel2)
	        });
	        browser.sleep(1000);
	        salesOrderSummary.inventoryDetailsCountInSO("2").then(function (reservedValue) {
	        	ResAfterHeaderCancel2 = reservedValue;
	            browser.sleep(1000);
	            console.log("available reserved count after complete  cancellation of line2: "+ResAfterHeaderCancel2);        
	            browser.sleep(1000);
	            expect(Res2).toEqual(ResAfterHeaderCancel2)
	        });  
	        salesOrderSummary.Done();
	       
        });
	});
});
		
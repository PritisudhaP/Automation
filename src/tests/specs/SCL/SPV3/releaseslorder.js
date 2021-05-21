'use strict';

const { browser } = require("protractor");

var spv3Obj = require(process.cwd()+'/screens/Storeportalv3/spv3locator.js');
// var moStrPortV2 = require(process.cwd()+'/screens/mixedOrder/shipMO_StorePortalV2.js');
// var validateStat = require(process.cwd()+'/screens/mixedOrder/validateMO_Status.js');
 var util = require(process.cwd()+'/screens/mixedOrder/util.js');
 var dataFile = require(process.cwd()+'/autoFiles/SPV3.json');
 
 describe('Store_Portalv3_Scenario1', function() { 
	//var salesOrderSummary = new salesOrdersummaryscreen();
     //Place an Order and Release it 
	
	it('Item & customer selection', function() { //pass 
		
		   	var soOrderLoc = spv3Obj.SOLocators;
		   	soOrderLoc.menuCallCenter.click();
			soOrderLoc.tileSalesOrders.click();
	    	// util.scrollToView(soOrderLoc.newOrderButton);
	    	// util.scrollDownByPixel();
	    	soOrderLoc.newOrderButton.click();
	    	//Customer Selection
	    	soOrderLoc.attachCustomerBtn.click();
	    	soOrderLoc.custSelectFilter.click();
	    	soOrderLoc.custSelectSearchCriteria.sendKeys("Name")
	    	soOrderLoc.custSelectSearchFilter.sendKeys("is");
	    	soOrderLoc.custSearchTextBox.sendKeys(dataFile.custName);
	    	soOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);//enter from keyboard 
	    	browser.sleep(2000);
	    	soOrderLoc.selectCustCheckBox.click();
            soOrderLoc.selectCustomer.click();
			browser.sleep(2000);
            // //Item Selection single line item 
	    	
			soOrderLoc.itemSelectFilter.click();
			soOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			soOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			soOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);//
			soOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(3000);
		
            
		
		    	
		    util.fluentWaitForClickable(soOrderLoc.selectSearchItem);
		    	
		    	soOrderLoc.selectSearchItem.click();
		    	soOrderLoc.searchBtn.click();
		    	soOrderLoc.selectitemformultiorder.click();
				soOrderLoc.addToOrder.click();
				browser.sleep(5000);
				//FOR BOPIS ORDER
				soOrderLoc.morebutton.click();//SL Order
				soOrderLoc.editline.click();
				// //for increasing unit 
				 soOrderLoc.increasequantity.click();
                 soOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
			    soOrderLoc.fulfillmentStore.sendKeys('sandiego-dc');
			    soOrderLoc.applyBtn.click();
				browser.sleep(2000);
	        	soOrderLoc.saveSalesOrder.click();
	    	    soOrderLoc.confirmSalesOrder.click();
				browser.sleep(2000);
				// //Write SO number to JSON file//fail
				util.fluentWaitForPresence(soOrderLoc.SONo);
				util.getSONo(process.cwd()+'/autoFiles/SPV3.json');
				browser.sleep(2000);
				

    });
    it('Release_Order', function() {  //pass
		
		var releaseSOLoc = spv3Obj. releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();
		browser.sleep(5000);
		
   
});
});
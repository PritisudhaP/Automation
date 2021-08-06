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
			browser.sleep(2000);
	    	soOrderLoc.newOrderButton.click();
            //for changing channel 
			 soOrderLoc.channeleditbutton.click();
             soOrderLoc.channeldropdown.sendKeys("B2C");
             soOrderLoc.channelcheckbox.click();

	    	//Customer Selection
	    	   soOrderLoc.attachCustomerBtn.click();
	    	
			//for substituted skus
			soOrderLoc.customersearchtextbox.sendKeys(dataFile.substitutedclient);
			util.fluentWaitForClickable(soOrderLoc.selectSearchItem);
			soOrderLoc.selectSearchItem.click();
            soOrderLoc.useselectedcustomer.click();
	    
			browser.sleep(5000);
// 			//multiline order
            soOrderLoc.itemSelectFilter.click();
			soOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			soOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			soOrderLoc.itemSearchTextBox.sendKeys(dataFile.substitutedskus);//same site
// // 			soOrderLoc.itemSearchTextBox.sendKeys(dataFile.Multilineskuofdiffsite);//different sites
    			soOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
// 	        browser.sleep(3000);
// // 		//multi line sku allocated to different sites
// // 		    soOrderLoc.itemSelectFilter.click();
// // 			 soOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
// // 			 soOrderLoc.itemSelectSearchFilter.sendKeys("contains");
// // 			 soOrderLoc.itemSearchTextBox.sendKeys(dataFile.Multilineskuofdiffsite);//
// // 			 soOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
		    	
  		    util.fluentWaitForClickable(soOrderLoc.selectSearchItem);
		    	
		    	soOrderLoc.selectSearchItem.click();
				soOrderLoc.selectsecondsku.click();
		    	soOrderLoc.searchBtn.click();
		    	soOrderLoc.selectitemformultiorder.click();
				soOrderLoc.addToOrder.click();
// 				//FOR BOPIS ORDER first line 
			
// 				//  soOrderLoc.firstmorebutton.click();
// 				//  soOrderLoc.editline.click();
// 				// // //for increasing unit 
// 				//  soOrderLoc.increasequantity.click();//this line only
// 				//for 3 units
// 				//browser.actions().doubleClick(soOrderLoc.increasequantity).perform();
//                 //  soOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
// 			    // soOrderLoc.fulfillmentStore.sendKeys('sandiego-dc');
// 			     //soOrderLoc.applyBtn.click();
				
// 				//for BOPIS  2 nd line order
// 				// soOrderLoc.secondmorebutton.click();
// 				// soOrderLoc.editline.click();
// 				// // // //for increasing unit 
// 				//  soOrderLoc.increasequantity.click();//this line only
// 				//  //for 3 units
// 				// //browser.actions().doubleClick(soOrderLoc.increasequantity).perform();
//                 // //  soOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
// 			    // // soOrderLoc.fulfillmentStore.sendKeys('sandiego-dc');
// 			    //  soOrderLoc.applyBtn.click();


				soOrderLoc.saveSalesOrder.click();
	    	    soOrderLoc.confirmSalesOrder.click();
				browser.sleep(2000);
				// //Write SO number to JSON file//
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
		//releaseSOLoc.cancelbutton.click();
		browser.sleep(5000);
		//release again 
		// util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	// util.scrollDownByPixel();
    	// releaseSOLoc.statusHamburgerBtn.click();
		// releaseSOLoc.releaseOrder.click();
		// releaseSOLoc.confirmRelease.click();

		releaseSOLoc.firstcrossmark.click();
		releaseSOLoc.firstcrossmark.click();
		releaseSOLoc.cancelbutton.click();
		browser.sleep(5000);
       
		//substitute skus at line level
		releaseSOLoc.firstheadphoneicon.click();
		releaseSOLoc.selectsku.click();
		releaseSOLoc.applysubstitution.click();
		//for 2 nd sku
		browser.sleep(2000);
		releaseSOLoc.secondheadphoneicon.click();
		releaseSOLoc.selectsku.click();
		releaseSOLoc.applysubstitution.click();
		
		
 });
});
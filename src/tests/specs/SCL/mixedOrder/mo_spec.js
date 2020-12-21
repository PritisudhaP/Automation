'use strict';
var moPageObj = require(process.cwd()+'/src/tests/screens/mixedOrder/mo_po.js');
var moStrPortV2 = require(process.cwd()+'/src/tests/screens/mixedOrder/shipMO_StorePortalV2.js');
var validateStat = require(process.cwd()+'/src/tests/screens/mixedOrder/validateMO_Status.js');
var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

/*
Scenario 1:
===========
1. Order has 2 lines with 1 Qty each. L1=STC and L2=BOPIS 
2. Release the Order and Validate the Fulfillment in Shipment Request tab (Carrier, Pickup Window)
3. Ship the STC line and validate the both the line level statuses and Order status
4. Move the BOPIS line to ACP status and validate the both the line level statuses and Order status
5. Pickup the BOPIS line and validate the both the line level statuses and Order status
*/

describe('Mixed_Order_Scenario1', function() {  
	var lineCount = 2;
	var moScenario1 = 1;
	
	it('Happy_Flow_L1=STC_&_L2=BOPIS', function() {  
		
		   	var moOrderLoc = moPageObj.moOrderLocators;
		   	moOrderLoc.menuCallCenter.click();
	    	moOrderLoc.tileSalesOrders.click();
	    	util.scrollToView(moOrderLoc.newOrderButton);
	    	util.scrollDownByPixel();
	    	moOrderLoc.newOrderButton.click();
	    	//Customer Selection
	    	moOrderLoc.attachCustomerBtn.click();
	    	moOrderLoc.custSelectFilter.click();
	    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
	    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
	    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
	    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	browser.sleep(2000);
	    	moOrderLoc.selectCustCheckBox.click();
	    	moOrderLoc.selectCustomer.click();
	    	//Item Selection
	    	for(var i=0; i<lineCount; i++)
	    	{
		    	moOrderLoc.itemSelectFilter.click();
		    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
		    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
		    	if(i == 1)
	    		{
		    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
	    		}
		    	else
	    		{
		    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
	    		}
		    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
		    	
		    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
		    	
		    	moOrderLoc.selectSearchItem.click();
		    	moOrderLoc.searchBtn.click();
		    	moOrderLoc.selectItem.click();
		    	moOrderLoc.addToOrder.click();

		    	//Change Price
		    	if(i == 1)
		    	{
		    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Version
//		    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
			    	util.scrollDownByPixel();
		    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Version
//		    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
	    		}
		    	else
	    		{
		    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Version
//		    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
			    	util.scrollDownByPixel();
		    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Version
//		    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	    		}
		    	
		    	moOrderLoc.changePrice.click();
		    	if(i == 1)
		    	{
	    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
	    		}
		    	else
	    		{
	    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
	    		}
		    	
		    	moOrderLoc.savePrice.click();
		    	if(i == 1){
			    	moOrderLoc.item2PopUp.click();
			    	moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
			    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
			    	moOrderLoc.applyBtn.click();
		    	}
	    	}
	    	moOrderLoc.saveSalesOrder.click();
	    	moOrderLoc.confirmSalesOrder.click();
	    	
	    	//Write SO number to JSON file
	    	util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  
		
		var releaseSOLoc = moPageObj.releaseSOLocators;
    	
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
    	
    	//Validate Shipment Request Tab in So Screen
    	validateStat.serviceReqTabVal();
	});
	
	it('Ship_Order_From_Store_Portal_V2', function(){  
		moStrPortV2.storePortalShipment(moScenario1);
	});
	    
	it('BOPIS_Order_Pickup_By_Customer', function(){  
		moStrPortV2.bopisCustPickUp(moScenario1);
	});
});


/*
Scenario 2:
===========
1. Order has 2 lines with 2 Qty each. L1=STC and L2=BOPIS
2. Release the Order and Validate the Fulfillment in Shipment Request tab (Carrier, Pickup Window)
3. Partially Ship the STC line and validate both the line level statuses and Order status
4. Move the BOPIS line to PACP status and validate both the line level statuses and Order status
5. Pickup the BOPIS line and validate the both line level statuses and Order status
*/

describe('Mixed_Order_Scenario2', function() {  
	var lineCount = 2;
	var moScenario2 = 2;

	it('Partial_Flow_L1=STC_&_L2=BOPIS', function() {  
		
		var moOrderLoc = moPageObj.moOrderLocators;
	    
    	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click();
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	//moOrderLoc.custSelectSearchFilter.sendKeys("is");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	for(var i=0; i<lineCount; i++)
    	{
	    	moOrderLoc.itemSelectFilter.click();
	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
	    	if(i == 1)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
    		}
	    	else
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    		}
	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	
	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	    	
	    	moOrderLoc.selectSearchItem.click();
	    	moOrderLoc.searchBtn.click();
	    	moOrderLoc.selectItem.click();
	    	moOrderLoc.addToOrder.click();

	    	//Change Price
	    	if(i == 1)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
    		}
	    	else
    		{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    		}
	    	
	    	moOrderLoc.changePrice.click();
	    	if(i == 1)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
    		}
	    	else
    		{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
    		}
	    	
	    	moOrderLoc.savePrice.click();
	    	if(i == 1){
		    	moOrderLoc.item2PopUp.click();
		    	moOrderLoc.soQtyBtn.click();
		    	moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
		    	moOrderLoc.applyBtn.click();
	    	}
	    	else
    		{
	    		moOrderLoc.item1PopUp.click();
	    		moOrderLoc.soQtyBtn.click();
	    		moOrderLoc.applyBtn.click();
    		}
    	}
    	
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  
		
		var releaseSOLoc = moPageObj.releaseSOLocators;
    	util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
    	
    	//Validate Shipment Request Tab in So Screen
    	validateStat.serviceReqTabVal();
	});
	
	it('Ship_Order_From_Store_Portal V2', function(){  
		moStrPortV2.storePortalShipment(moScenario2);  
	});
	    
	it('BOPIS_Order_Pickup_By_Customer', function(){  
		moStrPortV2.bopisCustPickUp(moScenario2);  
	});
});


/*
Scenario 3:
===========
1. Order has 3 lines with 1 Qty each. L1=STC, L2=STC and L3=BOPIS 
2. Release the Order such that L2 is FTA and Validate the Fulfillment in Shipment Request tab (Carrier, Pickup Window)
3. Cancel the FTA Line and validate all the line level statuses and Order status
4. Ship the L1 STC line and validate all the line level statuses and Order status
5. Move the BOPIS line to PBC status and validate all the line level statuses and Order status
*/

describe('Mixed_Order_Scenario3', function() {  
	var lineCount = 3;
	var moScenario3 = 3;

	it('FTA_With_3_Lines_Flow_L1=STC_L2=STC_&_L3=BOPIS', function() {  
	    	
		var moOrderLoc = moPageObj.moOrderLocators;
    	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click();
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	for(var i=0; i<lineCount; i++)
    	{
	    	moOrderLoc.itemSelectFilter.click();
	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
	    	if(i == 2)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item3);
    		}
	    	else if(i == 1)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
    		}
	    	else
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    		}
	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	
	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	    	
	    	moOrderLoc.selectSearchItem.click();
	    	moOrderLoc.searchBtn.click();
	    	moOrderLoc.selectItem.click();
	    	moOrderLoc.addToOrder.click();

	    	//Change Price
	    	if(i == 2)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[3]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[3]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[3]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[3]')).click();			//Older Version
    		}
	    	else if(i == 1)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
    		}
	    	else
    		{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    		}
	    	
	    	moOrderLoc.changePrice.click();
	    	
	    	if(i == 2)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item3Price);
    		}
	    	else if(i == 1)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
    		}
	    	else
    		{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
    		}
	    	
	    	moOrderLoc.savePrice.click();
	    	if(i == 2){
		    	moOrderLoc.item3PopUp.click();
		    	moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
		    	moOrderLoc.applyBtn.click();
	    	}
    	}
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  

		var releaseSOLoc = moPageObj.releaseSOLocators;
	    util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
	});
	
	it('Cancel_FTA_Line', function() {  
    	
		var cancelSOLineLoc = moPageObj.cancelSOLineLocators;
		
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')));	//Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click(); 			//Older Version
		cancelSOLineLoc.cancelLine.click();
		cancelSOLineLoc.cancelQty.click();
		cancelSOLineLoc.cancelReason.sendKeys('NotNeeded');
		cancelSOLineLoc.confirmCancelBtn.click();
		
		
		validateStat.soLineStatusVal3();

	});
	
	it('Ship_Order_From_Store_Portal_V2', function(){  
		moStrPortV2.storePortalShipment(moScenario3);
	});
	    
	it('BOPIS_Order_Pickup_By_Customer', function(){  
		moStrPortV2.bopisCustPickUp(moScenario3);
	});
	
});


/*
Scenarios 4:
============
1. Order has 3 lines with 1 Qty each. L1=STC, L2=BOPIS and L3=BOPIS
2. Release the Order
3. Move L2 and L3 to ACP
4. Ship L1 and check line level status and order status
5. Cancel L2 from FR screen and validate that status should be RESTOCK on FR screen and Line level status should be CANCELLED in SO screen
6. Cancel L3 from Call Center and validate the FR status and line level status in SO screen and should be CANCELLED
*/

describe('Mixed_Order_Scenario4', function() {  
	var lineCount = 3;
	var moScenario4 = 4;
	
	it('Cancel_With_3_Lines_Flow_L1=STC_L2=BOPIS_&_L3=BOPIS', function() {  
		
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click();
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	for(var i=0; i<lineCount; i++)
    	{
	    	moOrderLoc.itemSelectFilter.click();
	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
	    	if(i == 2)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item3);
    		}
	    	else if(i == 1)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
    		}
	    	else
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    		}
	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	
	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	    	
	    	moOrderLoc.selectSearchItem.click();
	    	moOrderLoc.searchBtn.click();
	    	moOrderLoc.selectItem.click();
	    	moOrderLoc.addToOrder.click();

	    	//Change Price
	    	if(i == 2)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[3]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[3]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[3]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[3]')).click();			//Older Version
    		}
	    	else if(i == 1)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
    		}
	    	else
    		{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    		}
	    	
	    	moOrderLoc.changePrice.click();
	    	
	    	if(i == 2)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item3Price);
    		}
	    	else if(i == 1)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
    		}
	    	else
    		{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
    		}
	    	
	    	moOrderLoc.savePrice.click();
	    	if(i == 1)
	    	{
	    		moOrderLoc.item2PopUp.click();
	    		moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
		    	moOrderLoc.applyBtn.click();
	    	}
	    	else if(i == 2)
    		{
	    		moOrderLoc.item3PopUp.click();
	    		moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
		    	moOrderLoc.applyBtn.click();
    		}
    	}
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  
	
    	var releaseSOLoc = moPageObj.releaseSOLocators;
    	util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
	});
		
	
	it('Ship_Order_From_Store_Portal_V2', function(){  
		moStrPortV2.storePortalShipment(moScenario4);
	});
	    
	it('Cancel_ACP_FR_Line', function() {  
		
		var cancelFRLineLoc = moPageObj.cancelFRLineLocators;
		cancelFRLineLoc.menuCallCenter.click();
		cancelFRLineLoc.tileStorePortalV2.click();
		cancelFRLineLoc.selectFRCheckBox.click();
		cancelFRLineLoc.cancelOrderBtn.click();
		cancelFRLineLoc.cancelOrderOpt.click();
		cancelFRLineLoc.cancelOrder.click();
		cancelFRLineLoc.reasonCode.sendKeys("Not");
		cancelFRLineLoc.cancelReason.sendKeys("QA Automation");
		cancelFRLineLoc.confirmBtn.click();
		
		//Assert the FR Line status
		expect(cancelFRLineLoc.restockFRLineStatus.getText()).toContain("RESTOCK");
		//Assert SO screen and Line statuses
		var s1=0;
		validateStat.soLineStatusVal4(s1);
	});
	
	it('Cancel_ACP_SO_Line', function() {  
		
		var cancelSOLineLoc = moPageObj.cancelSOLineLocators;
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"AWAITING CUSTOMER PICKUP")]]/following::en-icon[9])')));		//New Vesrion
//		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"AWAITING CUSTOMER PICKUP")]]/following::en-icon[6])')));	//Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"AWAITING CUSTOMER PICKUP")]]/following::en-icon[9])')).click();					//New Vesrion
//		element(by.xpath('(//*[text()[contains(.,"AWAITING CUSTOMER PICKUP")]]/following::en-icon[6])')).click();			//Older Version
		cancelSOLineLoc.cancelLine.click();
		cancelSOLineLoc.cancelQty.click();
		cancelSOLineLoc.cancelReason.sendKeys('NotNeeded');
		cancelSOLineLoc.confirmCancelBtn.click();
		
		var s2 = 1;
		validateStat.soLineStatusVal4(s2);
	});
});


/*
Scenario 5:
===========
1. Order has 2 lines with 1 Qty each (should have line unit price for items). L1=STC and L2=BOPIS
2. Release the order
3. Move the L1 to Shipped and L2 to PBC
4. Reship the Order and validate the the line level statuses and Order status also the Order total should be zero
5. Ship the STC line and validate both the line level statuses and Order status for Reshipped SO
6. Move the BOPIS line to ACP status and validate both the line level statuses and Order status Reshipped SO
7. Pickup the BOPIS line and validate the both the line level statuses and Order status Reshipped SO
*/

describe('Mixed_Order_Scenario5', function() {  
	var lineCount = 2;
	var moScenario5 = 5;
	var moScenario51 = 51;
	
	it('Reship_L1=STC_&_L2=BOPIS', function() { 
		
		var moOrderLoc = moPageObj.moOrderLocators;		
		moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click();
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	for(var i=0; i<lineCount; i++)
    	{
	    	moOrderLoc.itemSelectFilter.click();
	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
	    	if(i == 1)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
    		}
	    	else
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    		}
	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	
	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	    	
	    	moOrderLoc.selectSearchItem.click();
	    	moOrderLoc.searchBtn.click();
	    	moOrderLoc.selectItem.click();
	    	moOrderLoc.addToOrder.click();

	    	//Change Price
	    	if(i == 1)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
    		}
	    	else
    		{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    		}
	    	
	    	moOrderLoc.changePrice.click();
	    	if(i == 1)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
    		}
	    	else
    		{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
    		}
	    	
	    	moOrderLoc.savePrice.click();
	    	if(i == 1){
		    	moOrderLoc.item2PopUp.click();
		    	moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
		    	moOrderLoc.applyBtn.click();
	    	}
    	}
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  
    	
		var releaseSOLoc = moPageObj.releaseSOLocators;
    	util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
	});
	
	it('Ship_Order_From_Store_Portal_V2', function(){  
		moStrPortV2.storePortalShipment(moScenario5);
	});
	    
	it('BOPIS_Order_Pickup_By_Customer', function(){  
		moStrPortV2.bopisCustPickUp(moScenario5);
	});
	
	it('Re-Ship_Order', function(){  
		
		var reShipSOLoc = moPageObj.reShipSOLocators;
    	var moOrderLoc = moPageObj.moOrderLocators;
    	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	reShipSOLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
    	reShipSOLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
		element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
    	util.scrollToView(reShipSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	reShipSOLoc.statusHamburgerBtn.click();
		reShipSOLoc.reShipOrder.click();
		reShipSOLoc.reasonCode.sendKeys("delay");
		reShipSOLoc.reasonComment.sendKeys("QA Automation")
		reShipSOLoc.reShipConfirm.click();
		reShipSOLoc.saveReShipSO.click();
		reShipSOLoc.confirmReShipSO.click();
		
		//Write Re-Ship SO number to JSON file
    	util.fluentWaitForPresence(reShipSOLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
    	
    	//Assert the Balance Amount of Re-Shipped Order
		expect(reShipSOLoc.reshipSOBalance.getText()).toContain("$0.00");
		
		validateStat.soLineStatusVal5();
	});
	
	it('Release_Re-Ship_Order', function() {  
		var releaseSOLoc = moPageObj.releaseSOLocators;
    	util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
	});
	
	it('Ship_Reshipped_Order_From_Store_Portal_V2', function(){  
		moStrPortV2.storePortalShipment(moScenario51);		
	});
	    
	it('Reshipped_BOPIS_Order_Pickup_By_Customer', function(){  
		moStrPortV2.bopisCustPickUp(moScenario51);
	});
});


/*
Scenario 6:
===========
1. Create MLMU order such that L1 is STC, L2 is bopis
2. Release Order such that L1 is patially released and bopis line is released
3. Move bopis line, L2 to ACP, order is now "partially shipped"
4. Cancel bopis line in ACP from store portal or call center
5. Verify if order moves to partially released
*/

describe('Mixed_Order_Scenario6', function() {
	var lineCount = 2;
	var moScenario6 = 6;
	
	it('Update_Inventory_For_PartialRelease', function() {
		console.log("I am here");
		var invLookupLoc = moPageObj.invLookupLocators;	
		invLookupLoc.menuInventory.click();
		invLookupLoc.tileInvLookup.click();
		invLookupLoc.addSkusBtn.click();
//		invLookupLoc.skuSelectFilter.click();
//		invLookupLoc.skuSelectSearchCriteria.sendKeys("Name");
//		invLookupLoc.skuSelectSearchFilter.sendKeys("contains");
//		invLookupLoc.skuSearchTextBox.sendKeys(dataFile.ItemPartial);
		invLookupLoc.skuDirectSearchTextBox.sendKeys(dataFile.ItemPartial);
		invLookupLoc.skuDirectSearchTextBox.sendKeys(protractor.Key.RETURN);
		invLookupLoc.selectSku.click();
		invLookupLoc.skuSearchQty.clear().sendKeys("0");
		invLookupLoc.addSkuBtn.click();
		invLookupLoc.searchBtn.click();
		invLookupLoc.skuHamburgerBtn.click();
		invLookupLoc.skuDetails.click();
		invLookupLoc.entryAdjTab.click();
		invLookupLoc.adjQtyBy.sendKeys("1");
		invLookupLoc.adjReason.sendKeys("QA Automation");
		invLookupLoc.saveBtn.click();
	});
	
	it('Partial_Released_L1=STC_&_L2=BOPIS', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;	
		moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click();
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	for(var i=0; i<lineCount; i++)
    	{
	    	moOrderLoc.itemSelectFilter.click();
	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
	    	if(i == 1)
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    		}
	    	else
    		{
	    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
    		}
	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	    	
	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	    	
	    	moOrderLoc.selectSearchItem.click();
	    	moOrderLoc.searchBtn.click();
	    	moOrderLoc.selectItem.click();
	    	moOrderLoc.addToOrder.click();

	    	//Change Price
	    	if(i == 1)
	    	{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
    		}
	    	else
    		{
	    		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Vesrion
//	    		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		    	util.scrollDownByPixel();
	    		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Vesrion
//	    		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    		}
	    	
	    	moOrderLoc.changePrice.click();
	    	if(i == 1)
	    	{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
    		}
	    	else
    		{
    			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
    		}
	    	
	    	moOrderLoc.savePrice.click();
	    	if(i == 1){
		    	moOrderLoc.item2PopUp.click();
		    	moOrderLoc.soQtyBtn.click();
		    	moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
		    	moOrderLoc.fulfillmentStore.sendKeys('Joliet');
		    	moOrderLoc.applyBtn.click();
	    	}
	    	else
    		{
	    		moOrderLoc.item1PopUp.click();
	    		moOrderLoc.soQtyBtn.click();
	    		moOrderLoc.applyBtn.click();
    		}
    	}
    	
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
	}); 
	
	it('Release_Order', function() {  
		var releaseSOLoc = moPageObj.releaseSOLocators;
    	util.scrollToView(releaseSOLoc.statusHamburgerBtn);
    	util.scrollDownByPixel();
    	releaseSOLoc.statusHamburgerBtn.click();
    	releaseSOLoc.releaseOrder.click();
    	releaseSOLoc.confirmRelease.click();
    	
    	//Validate Shipment Request Tab in So Screen
    	validateStat.serviceReqTabVal();
	});
	
	it('Ship_Order_From_Store_Portal V2', function(){  
		moStrPortV2.storePortalShipment(moScenario6);  
	});
	    
	it('Cancel_FTA_Line', function() {  
		var moOrderLoc = moPageObj.moOrderLocators;
		var cancelSOLineLoc = moPageObj.cancelSOLineLocators;
		
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		moOrderLoc.filterSOTextBox.clear().sendKeys(dataFile.SONumber);
		moOrderLoc.filterSOTextBox.sendKeys(protractor.Key.RETURN);
		element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click();
		
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]')));		//New Vesrion
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')));	//Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click();					//New Vesrion
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
		cancelSOLineLoc.cancelQty.click();
		cancelSOLineLoc.cancelReason.sendKeys('NotNeeded');
		cancelSOLineLoc.cancelLine.click();
		cancelSOLineLoc.confirmCancelBtn.click();
		
		validateStat.soLineStatusVal6();
	});
});

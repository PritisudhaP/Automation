'use strict'; 

var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var moStrPortV2 = require(process.cwd()+'/src/tests/screens/mixedOrder/shipMO_StorePortalV2.js');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
var validateStat = require(process.cwd()+'/src/tests/screens/mixedOrder/validateMO_Status.js');

module.exports = { 

		storePortalShipment: function(cancelAPIScenario, salesOrderNo) {
			    	
	    	var storePortalLoc = moStrPortV2.storePortalLocators;
	    	
	    	storePortalLoc.menuCallCenter.click();
	    	storePortalLoc.tileStorePortalV2.click();
	    	
	    	element.all(protractor.By.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])')).count()
    		.then(function(count) {
    			if(count == 2)
				{
    				storePortalLoc.savedSONumber.click();
				}
    		});
	    	
	    	storePortalLoc.soSelectFilter.click();
	    	storePortalLoc.soSelectSearchCriteria.click();
	    	storePortalLoc.soSelectSearchCriteria.sendKeys('Order #');
	    	storePortalLoc.soSelectSearchFilter.click()
	    	storePortalLoc.soSearchTextBox.sendKeys(salesOrderNo);
	    	storePortalLoc.soSearchTextBox.sendKeys(protractor.Key.RETURN);

    		element.all(protractor.By.xpath('//*[@class="en-collection-row"]')).count()
    		.then(function(count) {
    			console.log('FR Count with Pending Status in FR List Screen is : '+count);
    			for (var i=0; i<count; i++)
    			{
    		    	if(i != 0)
		    		{
    		    		storePortalLoc.menuCallCenter.click();
        		    	storePortalLoc.tileStorePortalV2.click();
		    		}
    		    	
	   				browser.waitForAngularEnabled(true);
	   				if(i == 0 && cancelAPIScenario == 13 || cancelAPIScenario == 14 || cancelAPIScenario == 17 ||
	   						cancelAPIScenario == 18 || cancelAPIScenario == 21)
    				{
    					element(by.xpath('(//*[@class="en-collection-row"])[1]')).click();
    				}
	   				else if(i == 0)
    				{
    					element(by.xpath('(//*[@class="en-collection-row"])[2]')).click();
    				}
    				else
					{
    					storePortalLoc.selectPendingFR.click();
					}
    					
					storePortalLoc.orderCheckBox.click();
			    	storePortalLoc.acceptOrderBtn.click();
			    	storePortalLoc.confirmAcceptBtn.click();
			    	storePortalLoc.pickAndPackBtn.click();
			    	storePortalLoc.itemToPack.click();
			    	if(cancelAPIScenario == 6 || cancelAPIScenario == 13 || (i == 0 && cancelAPIScenario == 15))
		    		{
			    		storePortalLoc.qtyIncrementBtn.click();
			    		storePortalLoc.qtyIncrementBtn.click();
		    		}
			    	else
			    	{
			    		storePortalLoc.qtyIncrementBtn.click();
			    	}
			    	
			    	storePortalLoc.includeInPackageBtn.click();
			    	storePortalLoc.packageType.sendKeys("8x6x8 Small Box");
			    	
			    	//Check and enter the WEIGHT box Value if present in Packing Screen
			    	storePortalLoc.weightTextBox.isPresent().then(function(result) {
			    	    if (result) 
			    	    {
			    	    	storePortalLoc.weightTextBox.sendKeys("4");
			    	    } 
			    	});
			    	
			    	storePortalLoc.trackingNumber.sendKeys("1234567");
			    	storePortalLoc.addPackage.click();
			    	storePortalLoc.completeFFBtn.click();
			    	
			    	if(cancelAPIScenario == 12 || cancelAPIScenario == 14 || (i == 1 && cancelAPIScenario == 15) || 
			    			(i == 0 && cancelAPIScenario == 16 || i == 1 && cancelAPIScenario == 16) || 
			    			cancelAPIScenario == 18)						
		    		{
			    		browser.sleep(1500);
			    		storePortalLoc.rejectReason.sendKeys("Product Damaged");	//Comment for Old Version
			    		storePortalLoc.rejectComment.sendKeys("QA Automation");		//Comment for Old Version
		    		   	storePortalLoc.confirmCompleteFFBtn.click();
		    		   	browser.sleep(5000);
		    		   	
		    		}
			    	
			    	if(cancelAPIScenario == 10 || cancelAPIScenario == 11 || cancelAPIScenario == 12 || cancelAPIScenario == 22)						
		    		{
			    		i=count;
		    		}

    			}
    			
    		});
		},
		
		
		bopisCustPickUp: function(cancelAPIScenario) {
	    	
	    	var bopisCustPickUpLoc = moStrPortV2.bopisCustPickupLocators;
	    	var storePortalLoc = moStrPortV2.storePortalLocators;
	    	
	    	storePortalLoc.menuCallCenter.click();
	    	storePortalLoc.tileStorePortalV2.click();
	    	bopisCustPickUpLoc.selectACPFR.click();
	    	bopisCustPickUpLoc.pickupOrderBtn.click();
	    	bopisCustPickUpLoc.pickupOrder.click();
	    	bopisCustPickUpLoc.pickedUpBy.clear().sendKeys("Automation");
	    	bopisCustPickUpLoc.verification.sendKeys('Driving');
	    	bopisCustPickUpLoc.confirmBtn.click();
	    	
//	    	//Validate SO and Line level status after BOPIS order picked up by Customer
//	    	if(cancelAPIScenario == 1)
//    		{
//	    		validateStat.soLineStatusVal1();
//    		}
//	    	if(cancelAPIScenario == 2)
//    		{
//	    		validateStat.soLineStatusVal2();
//    		}
//	    	if(cancelAPIScenario == 3)
//    		{
//	    		var n = 1;
//	    		validateStat.soLineStatusVal3(n);
//    		}
//	    	if(cancelAPIScenario == 51)
//    		{
//	    		var s = 2;
//	    		validateStat.soLineStatusVal5(s);
//    		}
		},
		
//		serviceReqTabVal: function() 
//		{
//			var shipReqTabLoc = this.shipReqTabLocators; 
//			
//			shipReqTabLoc.shipReqTab.click();
//			
//			element.all(protractor.By.xpath('//en-panel')).count()
//			.then(function(count) {
//				console.log('FR Count is : '+count);
//				for (var i=0; i<count; i++)
//				{
//					browser.waitForAngularEnabled(true);
//					if(i==0)
//					{
//						element(by.xpath('//en-panel[1]')).click();
//					}
//					else
//					{
//						element(by.xpath('//en-panel[2]')).click();
//					}
//					shipReqTabLoc.carrier.getText()
//					.then(function(text) {
//						  if(text == "Carrier: PICKUP_IN_STORE")
//						  {
//							  expect(shipReqTabLoc.carrier.getText()).not.toContain("FDX");
//							  expect(shipReqTabLoc.carrier.getText()).toContain("PICKUP_IN_STORE");
//							  expect(shipReqTabLoc.pickUpStartDate.getText()).toContain("Pickup Start Date:");
//							  expect(shipReqTabLoc.pickUpEndDate.getText()).toContain("Pickup End Date:");
//						  }
//						  else
//						  {
//							  expect(shipReqTabLoc.carrier.getText()).toContain("FDX");
//							  expect(shipReqTabLoc.carrier.getText()).not.toContain("PICKUP_IN_STORE");
//							  expect(shipReqTabLoc.pickUpStartDate.getText()).not.toContain("Pickup Start Date:");
//							  expect(shipReqTabLoc.pickUpEndDate.getText()).not.toContain("Pickup End Date:");
//						  }
//					});		
//				}
//			});
//		},
};
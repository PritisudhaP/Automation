'use strict'; 

var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
var validateStat = require(process.cwd()+'/src/tests/screens/mixedOrder/validateMO_Status.js');

module.exports = { 

		storePortalLocators: { 
			menuCallCenter : element(by.xpath('(//*[text()[contains(.,"Fulfillment")]])[1]')),
			tileStorePortalV2 : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[6]')),
			savedSONumber : element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')),
			soSelectFilter : element(by.xpath('(//*[text()[contains(.,"Filters")]])[1]')),
	    	soSelectSearchCriteria : element(by.model('apiSearchFilter.filter')),
	    	soSelectSearchFilter : element(by.model('apiSearchFilter.arg')),
	    	soSearchTextBox : element(by.model('apiSearchFilter.value')),
			filterSOTextBox : element(by.model('apiSearchText.value')),
			selectPendingFR : element(by.xpath('//*[text()[contains(.,"PENDING")]]')),
			orderCheckBox : element(by.xpath('(//input[@type="checkbox"])[1]')),
			acceptOrderBtn : element(by.xpath('//*[text()[contains(.,"Accept Order")]]')),
			confirmAcceptBtn : element(by.xpath('(//*[text()[contains(.,"Confirm")]])[2]')),
			pickAndPackBtn : element(by.xpath('//button[@class="button button-info en-button ng-scope"]')),
			itemToPack : element(by.xpath('(//input[@type="checkbox"])[1]')),
			qtyIncrementBtn : element(by.xpath('(//button[@class="en-button"])[2]')),
			includeInPackageBtn : element(by.xpath('//*[text()[contains(.,"Include in Package")]]')),
			packageType	: element(by.model('order.package.packageType')),
			addPackage : element(by.xpath('//*[text()[contains(.,"Add Package")]]')),
			weightTextBox : element(by.model('order.package.weight')),
			trackingNumber : element(by.model('order.package.trackingNumber')),
			completeFFBtn : element(by.xpath('//*[text()[contains(.,"Complete Fulfillment")]]')),
			rejectReason : element(by.model('modalObject.reasonCode')),
			rejectComment : element(by.model('modalObject.reason')),
			backToFRList : element(by.xpath('(//div[@class="back-button margin-right is-clickable"])[1]')),
			fulfillmentType : element(by.xpath('(//*[@class="en-collection-row"]/div[19])[1]')),
			confirmCompleteFFBtn : element(by.xpath('(//*[text()[contains(.,"Confirm")]])[2]')),
		},
		
		bopisCustPickupLocators: { 
			selectACPFR : element(by.xpath('//*[text()="AWAITING CUSTOMER PICKUP"]/preceding::input[@class="ng-scope ng-pristine ng-untouched ng-valid"]')),
			pickupOrderBtn : element(by.xpath('(//button[@class="en-button margin-right trim"]/following::en-icon)[4]')),
			pickupOrder : element(by.xpath('//button[@class="button-popover-dark trim en-button"]')),
			pickedUpBy : element(by.model('data.pickUpDetails.pickedUpBy')),
			verification : element(by.model('data.pickUpDetails.verificationProof')),
			confirmBtn : element(by.xpath('//button[@class="button text-center button-primary en-button ng-scope"]')),
		},
		
		
		storePortalShipment: function(moScenario) {
			    	
	    	var storePortalLoc = this.storePortalLocators;
	    	
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
	    	storePortalLoc.soSearchTextBox.sendKeys(dataFile.SONumber);
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
	   				if(i == 0 && moScenario == 6)
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
			    	if(moScenario == 6)
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
			    	browser.sleep(5000);
			    	
			    	if(moScenario == 2)						
		    		{
			    		browser.sleep(1500);
//			    		storePortalLoc.rejectReason.sendKeys("Product Damaged");	//New Version
//			    		storePortalLoc.rejectComment.sendKeys("QA Automation");		//New Version
		    		   	storePortalLoc.confirmCompleteFFBtn.click();
		    		}
			    	
			    	for(var j=0; j<2; j++)
		    		{
			    		util.scrollToView(storePortalLoc.backToFRList);
				    	util.scrollDownByPixel();
			    		storePortalLoc.backToFRList.click();
			    		browser.sleep(3000);
		    		}

			    	//Validate SO and Line level status
			    	if(moScenario == 1)
		    		{
			    		validateStat.soLineStatusVal1(i);
		    		}
			    	else if(moScenario == 2)
		    		{
			    		validateStat.soLineStatusVal2(i);
		    		}
			    	else if(moScenario == 3 && i == 0)	//Validating only for STC line fulfilled as per the scenario
		    		{
	    				var k=0;
			    		validateStat.soLineStatusVal3(k);
			    		//count--;
		    		}
			    	else if(moScenario == 4 && i == 2)
		    		{
			    		validateStat.soLineStatusVal4();
		    		}
			    	else if(moScenario == 51)
		    		{
			    		validateStat.soLineStatusVal5(i);
		    		}
			    	else if(moScenario == 6)
		    		{
			    		i = 4;
		    		}
			    	
//		    		});
    			}
    			
    		});
		},
		
		
		bopisCustPickUp: function(moScenario) {
	    	
	    	var bopisCustPickUpLoc = this.bopisCustPickupLocators;
	    	var storePortalLoc = this.storePortalLocators;
	    	
	    	storePortalLoc.menuCallCenter.click();
	    	storePortalLoc.tileStorePortalV2.click();
	    	bopisCustPickUpLoc.selectACPFR.click();
	    	bopisCustPickUpLoc.pickupOrderBtn.click();
	    	bopisCustPickUpLoc.pickupOrder.click();
	    	bopisCustPickUpLoc.pickedUpBy.clear().sendKeys("Automation");
	    	bopisCustPickUpLoc.verification.sendKeys('Driving');
	    	bopisCustPickUpLoc.confirmBtn.click();
	    	
	    	//Validate SO and Line level status after BOPIS order picked up by Customer
	    	if(moScenario == 1)
    		{
	    		validateStat.soLineStatusVal1();
    		}
	    	if(moScenario == 2)
    		{
	    		validateStat.soLineStatusVal2();
    		}
	    	if(moScenario == 3)
    		{
	    		var n = 1;
	    		validateStat.soLineStatusVal3(n);
    		}
	    	if(moScenario == 51)
    		{
	    		var s = 2;
	    		validateStat.soLineStatusVal5(s);
    		}
		},
		
		serviceReqTabVal: function() 
		{
			var shipReqTabLoc = this.shipReqTabLocators; 
			
			shipReqTabLoc.shipReqTab.click();
			
			element.all(protractor.By.xpath('//en-panel')).count()
			.then(function(count) {
				console.log('FR Count is : '+count);
				for (var i=0; i<count; i++)
				{
					browser.waitForAngularEnabled(true);
					if(i==0)
					{
						element(by.xpath('//en-panel[1]')).click();
					}
					else
					{
						element(by.xpath('//en-panel[2]')).click();
					}
					shipReqTabLoc.carrier.getText()
					.then(function(text) {
						  if(text == "Carrier: PICKUP_IN_STORE")
						  {
							  expect(shipReqTabLoc.carrier.getText()).not.toContain("FDX");
							  expect(shipReqTabLoc.carrier.getText()).toContain("PICKUP_IN_STORE");
							  expect(shipReqTabLoc.pickUpStartDate.getText()).toContain("Pickup Start Date:");
							  expect(shipReqTabLoc.pickUpEndDate.getText()).toContain("Pickup End Date:");
						  }
						  else
						  {
							  expect(shipReqTabLoc.carrier.getText()).toContain("FDX");
							  expect(shipReqTabLoc.carrier.getText()).not.toContain("PICKUP_IN_STORE");
							  expect(shipReqTabLoc.pickUpStartDate.getText()).not.toContain("Pickup Start Date:");
							  expect(shipReqTabLoc.pickUpEndDate.getText()).not.toContain("Pickup End Date:");
						  }
					});		
				}
			});
		},
};
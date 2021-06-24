
'use strict'; 

var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

module.exports = {  
	
	shipReqTabLocators: {

		shipReqTab : element(by.xpath('(//*[text()[contains(.,"Shipping Requests")]])[1]')),
		pickUpStartDate : element(by.xpath('(//*[@class="card card-bordered margin-vertical margin-top-collapse"]/div[5])')),
		pickUpEndDate : element(by.xpath('(//*[@class="card card-bordered margin-vertical margin-top-collapse"]/div[6])')),
		carrier : element(by.xpath('//*[@class="card card-bordered margin-vertical margin-top-collapse"]/div[3]')),
		},
		
	soLineStatusLocators:{
		
		menuCallCenter : element(by.xpath('(//*[text()[contains(.,"Call Center")]])[1]')),
		tileSalesOrders : element(by.xpath('(//div[@class="card card-bordered card-split card-lifted is-clickable"])[3]')),
		soFilterTextBox : element(by.model('apiSearchText.value')),
		soStatus : element(by.xpath('//*[@class="label-md margin-right uppercase bold ng-scope label-warn"]')),
		shipToCustStatus : element(by.xpath('(//*[@class="faded ng-binding ng-scope" and text()[contains(.,"SHIP TO CUSTOMER")]]/following::en-label/small)[1]')),
		shipToCustStatus1 : element(by.xpath('(//*[@class="faded ng-binding ng-scope" and text()[contains(.,"SHIP TO CUSTOMER")]]/following::en-label/small)[2]')),
		bopisStatus : element(by.xpath('(//*[@class="faded ng-binding ng-scope" and text()[contains(.,"PICKUP IN STORE")]]//following::en-label/small)[1]')),
		bopisStatus1 : element(by.xpath('(//*[@class="faded ng-binding ng-scope" and text()[contains(.,"PICKUP IN STORE")]]//following::en-label/small)[2]')),
		soHeaderStatus : element(by.xpath('(//en-label)[1]')),
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
		
	
	soLineStatusVal1: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 
		
		soLineStatusLoc.menuCallCenter.click();
		soLineStatusLoc.tileSalesOrders.click();
		soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
		soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
		element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
		
		if(cnt == 0)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("RELEASED");
		}
		else if(cnt == 1)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("AWAITING CUSTOMER PICKUP");
		}
		else
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("CLOSED");
		}
	},
	
	soLineStatusVal2: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 
		
		soLineStatusLoc.menuCallCenter.click();
		soLineStatusLoc.tileSalesOrders.click();
		soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
		soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
		element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
			
		if(cnt == 0)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("RELEASED");
		}
		else if(cnt == 1)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("AWAITING CUSTOMER PICKUP");
		}
		else
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("CLOSED");
		}
	},
	
	soLineStatusVal3: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 
		
		if(cnt == 0)
		{
			soLineStatusLoc.menuCallCenter.click();
			soLineStatusLoc.tileSalesOrders.click();
			soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
			soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.shipToCustStatus1.getText()).toContain("CANCELLED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("RELEASED");
		}
		else if(cnt == 1)
		{
			soLineStatusLoc.menuCallCenter.click();
			soLineStatusLoc.tileSalesOrders.click();
			soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
			soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.shipToCustStatus1.getText()).toContain("CANCELLED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("CLOSED");
		}
		else
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("RELEASED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("RELEASED");
			expect(soLineStatusLoc.shipToCustStatus1.getText()).toContain("CANCELLED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("RELEASED");
		}
	},
	
	soLineStatusVal4: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 
		if(cnt != 1)
		{
			soLineStatusLoc.menuCallCenter.click();
			soLineStatusLoc.tileSalesOrders.click();
			soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
			soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
		}
		
			
		if(cnt == 0)
		{
				expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
				expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
				expect(soLineStatusLoc.bopisStatus.getText()).toContain("CANCELLED");
				expect(soLineStatusLoc.bopisStatus1.getText()).toContain("AWAITING CUSTOMER PICKUP");
		}
		
		else if(cnt == 1)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			//ACP status should be added in bopis correlation to Cancel from SO screen
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("CANCELLED");
			expect(soLineStatusLoc.bopisStatus1.getText()).toContain("CANCELLED"); 
		}
		else
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("AWAITING CUSTOMER PICKUP");
			expect(soLineStatusLoc.bopisStatus1.getText()).toContain("AWAITING CUSTOMER PICKUP");
		}
	},
	
	soLineStatusVal5: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 
		
		if(cnt == 0 || cnt == 1 || cnt == 2)
		{
			soLineStatusLoc.menuCallCenter.click();
			soLineStatusLoc.tileSalesOrders.click();
			soLineStatusLoc.soFilterTextBox.clear().sendKeys(dataFile.SONumber);
			soLineStatusLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			element(by.xpath("//*[text()[contains(.,'"+dataFile.SONumber+"')]]")).click()
		}
		
		if(cnt == 0)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("RELEASED");
		}
		else if(cnt == 1)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("AWAITING CUSTOMER PICKUP");
		}
		else if(cnt == 2)
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("SHIPPED");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("CLOSED");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("CLOSED");
		}
		else
		{
			expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("OPEN");
			expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("OPEN");
			expect(soLineStatusLoc.bopisStatus.getText()).toContain("OPEN");
		}
	},
	
	soLineStatusVal6: function(cnt) 
	{
		var soLineStatusLoc = this.soLineStatusLocators; 

		expect(soLineStatusLoc.soHeaderStatus.getText()).toContain("PARTIALLY RELEASED");
		expect(soLineStatusLoc.shipToCustStatus.getText()).toContain("PARTIALLY RELEASED");
		expect(soLineStatusLoc.bopisStatus.getText()).toContain("CANCELLED");
	},
};
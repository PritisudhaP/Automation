'use strict';
var correlationPageObj = require(process.cwd()+'/src/tests/screens/correlation/correlation.screen.js');
var settingsPageObj = require(process.cwd()+'/src/tests/screens/settings/settings.salesChannels.js');
var moPageObj = require(process.cwd()+'/src/tests/screens/mixedOrder/mo_po.js');
var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var corrFile = require(process.cwd()+'/src/tests/autoFiles/autoSaveOrderEnabled.json');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

describe('AutoSave Sales Order', function() {
	
	it('Enable AutoSave Correlation', function() {
	
		var correlationLoc = correlationPageObj.correlationLocators;
		correlationLoc.menuSettings.click();
		correlationLoc.sectionMenu.click();
		correlationLoc.dataManagement.click();
		correlationLoc.correlations.click();
		correlationLoc.correlationSelectFilter.click();
		correlationLoc.correlationSelectSearchCriteria.click();
		correlationLoc.correlationSelectSearchFilter.click();
		correlationLoc.correlationSearchTextBox.clear().sendKeys("autoSaveOrderEnabled");
		correlationLoc.correlationSearchTextBox.sendKeys(protractor.Key.RETURN);
		correlationLoc.selectCorrelation.click();
		correlationLoc.addUpdateViaFile.click();
		util.scrollToView(correlationLoc.chooseFile);
    	util.scrollDownByPixel();
		correlationLoc.chooseFile.sendKeys(process.cwd()+'/src/tests/autoFiles/autoSaveOrderEnabled.json');
		correlationLoc.saveCorrelation.click();
		browser.sleep(1000);
		
	}),
	
	it('Auto Save SO Adding Customer and then Item + Change Price + Add Discount to reflect in Total', function() {
		
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
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);

		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Version
//	    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Version
//	    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    	
    	moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys("25.56");
    	moOrderLoc.savePrice.click();
    	
    	//Validate that Total is re-calculated after adding the item Unit Price in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$25.56");
    	
    	moOrderLoc.addItem1Discount.click();
    	moOrderLoc.discountAmount.sendKeys("5.11");
    	moOrderLoc.discountReason.sendKeys("EmployeeDiscount");
    	moOrderLoc.discountDesc.sendKeys("Automation Desc");
    	moOrderLoc.discountNotes.sendKeys("Automation Notes");
    	moOrderLoc.applyDiscount.click();
    	util.fluentWaitForPresence(moOrderLoc.SOTotal);
    	
    	//Validate that Total is re-calculated after adding the Discount in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$20.45");
    	browser.sleep(3000);
	})
	
	
	it('Auto Save SO Adding Item and then Customer + Change Price + Add Discount to reflect in Total', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	
    	//Customer Selection
    	util.scrollToView(moOrderLoc.attachCustomerBtn);
    	util.scrollDownByPixel();
    	moOrderLoc.attachCustomerBtn.click();
    	element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')).click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
      	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);

		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Version
//	    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Version
//	    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    	
    	moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys("25.56");
    	moOrderLoc.savePrice.click();
    	
    	//Validate that Total is re-calculated after adding the item Unit Price in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$25.56");
    	
    	moOrderLoc.addItem1Discount.click();
    	moOrderLoc.discountAmount.sendKeys("5.11");
    	moOrderLoc.discountReason.sendKeys("EmployeeDiscount");
    	moOrderLoc.discountDesc.sendKeys("Automation Desc");
    	moOrderLoc.discountNotes.sendKeys("Automation Notes");
    	moOrderLoc.applyDiscount.click();
    	util.fluentWaitForPresence(moOrderLoc.SOTotal);
    	
    	//Validate that Total is re-calculated after adding the Discount in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$20.45");
    	browser.sleep(3000);
	}),
	
	
it('Auto Save SO Adding Customer and then Multiple Items', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click();
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectAllSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectAllItem.click();
    	moOrderLoc.addToOrder.click();
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);
	})
	
	
	it('Auto Save SO Adding Multiple Items and then Customer', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectAllSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectAllItem.click();
    	moOrderLoc.addToOrder.click();
    	
    	//Customer Selection
    	util.scrollToView(moOrderLoc.attachCustomerBtn);
    	util.scrollDownByPixel();
    	moOrderLoc.attachCustomerBtn.click();
    	element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')).click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
      	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);
	}),
	
	
	it('Enable Require customer selection before products on orders settings', function() {
		
		var correlationLoc = correlationPageObj.correlationLocators;
		var settingsSalesChannelsLocatorsLoc = settingsPageObj.settingsSalesChannelsLocators;
		correlationLoc.menuSettings.click();
		correlationLoc.sectionMenu.click();
		settingsSalesChannelsLocatorsLoc.company.click();
		settingsSalesChannelsLocatorsLoc.salesChannels.click();
		settingsSalesChannelsLocatorsLoc.channelB2B.click();
		settingsSalesChannelsLocatorsLoc.reqCustChkBox.click();
		settingsSalesChannelsLocatorsLoc.saveChannelSettings.click();
		browser.sleep(1000);
		
	}),
	
	
	it('Auto Save SO with Require customer selection before products settings for B2B channel', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	expect(element(by.xpath('//*[@class="adv-search-field adv-search-simplified"]')).isPresent()).toBe(false);
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click(); //Clear previously saved Customer search filter
    	element(by.xpath('(//*[text()[contains(.,"Filters")]])')).click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);

		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Version
//	    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Version
//	    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    	
    	moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys("25.56");
    	moOrderLoc.savePrice.click();
    	
    	//Validate that Total is re-calculated after adding the item Unit Price in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$25.56");
    	
    	moOrderLoc.addItem1Discount.click();
    	moOrderLoc.discountAmount.sendKeys("5.11");
    	moOrderLoc.discountReason.sendKeys("EmployeeDiscount");
    	moOrderLoc.discountDesc.sendKeys("Automation Desc");
    	moOrderLoc.discountNotes.sendKeys("Automation Notes");
    	moOrderLoc.applyDiscount.click();
    	util.fluentWaitForPresence(moOrderLoc.SOTotal);
    	
    	//Validate that Total is re-calculated after adding the Discount in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$20.45");
    	browser.sleep(3000);
	}),
	
	
	it('Auto Save SO with Item and then customer for B2C channel with Required Customer selection before products settings for B2B channel', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	moOrderLoc.channelEditIcon.click();
    	moOrderLoc.channelValue.sendKeys("B2C");
    	moOrderLoc.confirmChannel.click();
    	
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	
    	//Customer Selection
    	util.scrollToView(moOrderLoc.attachCustomerBtn);
    	util.scrollDownByPixel();
    	moOrderLoc.attachCustomerBtn.click();
    	element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')).click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
      	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);

		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]')));		//New Version
//	    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
    	util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click();					//New Version
//	    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
    	
    	moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys("25.56");
    	moOrderLoc.savePrice.click();
    	
    	//Validate that Total is re-calculated after adding the item Unit Price in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$25.56");
    	
    	moOrderLoc.addItem1Discount.click();
    	moOrderLoc.discountAmount.sendKeys("5.11");
    	moOrderLoc.discountReason.sendKeys("EmployeeDiscount");
    	moOrderLoc.discountDesc.sendKeys("Automation Desc");
    	moOrderLoc.discountNotes.sendKeys("Automation Notes");
    	moOrderLoc.applyDiscount.click();
    	util.fluentWaitForPresence(moOrderLoc.SOTotal);
    	
    	//Validate that Total is re-calculated after adding the Discount in Draft Status and updated in SO Total
    	expect(moOrderLoc.SOTotal.getText()).toContain("$20.45");
    	browser.sleep(3000);
	}),
	
	
	it('Disable Require customer selection before products on orders settings', function() {
		
		var correlationLoc = correlationPageObj.correlationLocators;
		var settingsSalesChannelsLocatorsLoc = settingsPageObj.settingsSalesChannelsLocators;
		correlationLoc.menuSettings.click();
		correlationLoc.sectionMenu.click();
		settingsSalesChannelsLocatorsLoc.company.click();
		settingsSalesChannelsLocatorsLoc.salesChannels.click();
		settingsSalesChannelsLocatorsLoc.channelB2B.click();
		settingsSalesChannelsLocatorsLoc.reqCustChkBox.click();
		settingsSalesChannelsLocatorsLoc.saveChannelSettings.click();
		browser.sleep(1000);
		
	}),
	
	
	it('Verify Find Product field available after disabling Require customer selection before products settings for B2B channel', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	
    	//Customer Selection
    	util.scrollToView(moOrderLoc.attachCustomerBtn);
    	util.scrollDownByPixel();
    	moOrderLoc.attachCustomerBtn.click();
    	element(by.xpath('(//*[@ng-repeat="criteria in object.search.criteria"])[1]')).click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
      	util.fluentWaitForPresence(moOrderLoc.SONo);
    	
    	//Validate that SO Number is generated in Draft status
    	expect(moOrderLoc.SONo.isPresent()).toBe(true);
	}),

	
	it('Disable AutoSave Correlation', function() {
		
		var correlationLoc = correlationPageObj.correlationLocators;
		correlationLoc.menuSettings.click();
		correlationLoc.sectionMenu.click();
		correlationLoc.dataManagement.click();
		correlationLoc.correlations.click();
		correlationLoc.correlationSelectFilter.click();
		correlationLoc.correlationSelectSearchCriteria.click();
		correlationLoc.correlationSelectSearchFilter.click();
		correlationLoc.correlationSearchTextBox.clear().sendKeys("autoSaveOrderEnabled");
		correlationLoc.correlationSearchTextBox.sendKeys(protractor.Key.RETURN);
		correlationLoc.selectCorrelation.click();
		correlationLoc.addUpdateViaFile.click();
		util.scrollToView(correlationLoc.chooseFile);
    	util.scrollDownByPixel();
		correlationLoc.chooseFile.sendKeys(process.cwd()+'/src/tests/autoFiles/autoSaveOrderDisabled.json');
		correlationLoc.saveCorrelation.click();
		browser.sleep(1000);
	}),
		
		
	it('Should not Auto Save SO after disabling the value in Correlation', function() {
		
		var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	expect(element(by.xpath('//*[@class="adv-search-field adv-search-simplified"]')).isPresent()).toBe(true);
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
    	moOrderLoc.savedCustSearchFilter.click(); //Clear previously saved Customer search filter
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(1000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	//Item Selection
    	moOrderLoc.savedItemSearchFilter.click(); //Clear previously saved Item search filter
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
     	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	
    	//Validate that SO Number is generated in Draft status
    	browser.sleep(3000);
    	expect(moOrderLoc.SONo.isPresent()).toBe(false);
	})

});





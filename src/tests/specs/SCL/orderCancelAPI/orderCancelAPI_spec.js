'use strict';
const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
var moPageObj = require(process.cwd() + '/src/tests/screens/mixedOrder/mo_po.js');
var cancelAPIStrPortV2 = require(process.cwd() + '/src/tests/specs/SCL/orderCancelAPI/cancelAPIShip_StorePortalV2.js');
//var validateStat = require(process.cwd() + '/src/tests/screens/mixedOrder/validateMO_Status.js');
var util = require(process.cwd() + '/src/tests/screens/mixedOrder/util.js');
var dataFile = require(process.cwd() + '/src/tests/autoFiles/mixedOrderData.json');
global.salesOrderNo = "1234";

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');


describe('Order Cancellation through API', function () {

	it('TC - 01 ==> Cancel Draft status Order from API', done => {

		var lineCount = 1;
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

		//Change Price
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

		moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
		moOrderLoc.savePrice.click();

		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.saveAsDraft.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");

	});


	it('TC - 02 ==> Cancel Open status Order from API', done => {

		var lineCount = 1;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		
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

		//Change Price
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

		moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
		moOrderLoc.savePrice.click();
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");

	});


	it('TC - 03 ==> Cancel FTA status Order from API', done => {

		var lineCount = 1;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		moOrderLoc.itemSelectFilter.click();
		moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
		moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
		moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

		util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

		moOrderLoc.selectSearchItem.click();
		moOrderLoc.searchBtn.click();
		moOrderLoc.selectItem.click();
		moOrderLoc.addToOrder.click();

		//Change Price
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

		moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
		moOrderLoc.savePrice.click();
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();
//		releaseSOLoc.cancelReleasePopup.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.sleep(3000);
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");

	});


	it('TC - 04 ==> Cancel Released status Order from API', done => {

		var lineCount = 1;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
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

		//Change Price
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

		moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
		moOrderLoc.savePrice.click();
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");

	});


	it('TC - 05 ==> Cancel FTV status Order from API', done => {

		var lineCount = 1;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
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

		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		//Change Price
		util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
		util.scrollDownByPixel();
		element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

		moOrderLoc.changePrice.click();
		moOrderLoc.priceTextBox.clear().sendKeys("0.3456");
		moOrderLoc.savePrice.click();
		moOrderLoc.saveEditedSO.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");

	});


	it('TC - 06 ==> Cancel order in Partially Released status (line1- Released, line2 - Partially Released) ', done => {

		var invLookupLoc = moPageObj.invLookupLocators;
		invLookupLoc.menuInventory.click();
		invLookupLoc.tileInvLookup.click();
		invLookupLoc.addSkusBtn.click();
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

		var lineCount = 2;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		for (var i = 0; i < lineCount; i++) {
			moOrderLoc.itemSelectFilter.click();
			moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			if (i == 1) {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
			} else {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
			}
			moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

			util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

			moOrderLoc.selectSearchItem.click();
			moOrderLoc.searchBtn.click();
			moOrderLoc.selectItem.click();
			moOrderLoc.addToOrder.click();

			//Change Price
			if (i == 1) {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
			} else {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
			}

			moOrderLoc.changePrice.click();
			if (i == 1) {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
			} else {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
			}

			moOrderLoc.savePrice.click();
			if (i == 1) {
				moOrderLoc.item2PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			} else {
				moOrderLoc.item1PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			}
		}
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 07 ==> Cancel order in Partially Released status(line1- Partially Released, line2 - Partially Released)', done => {
		
		var invLookupLoc = moPageObj.invLookupLocators;
		invLookupLoc.menuInventory.click();
		invLookupLoc.tileInvLookup.click();
		invLookupLoc.addSkusBtn.click();
		invLookupLoc.skuDirectSearchTextBox.sendKeys(dataFile.ItemPartial2);
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
		
		var lineCount = 2;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		for (var i = 0; i < lineCount; i++) {
			moOrderLoc.itemSelectFilter.click();
			moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			if (i == 1) {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
			} else {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial2);
			}
			moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

			util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

			moOrderLoc.selectSearchItem.click();
			moOrderLoc.searchBtn.click();
			moOrderLoc.selectItem.click();
			moOrderLoc.addToOrder.click();

			//Change Price
			if (i == 1) {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
			} else {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
			}

			moOrderLoc.changePrice.click();
			if (i == 1) {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
			} else {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
			}

			moOrderLoc.savePrice.click();
			if (i == 1) {
				moOrderLoc.item2PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			} else {
				moOrderLoc.item1PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			}
		}
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});
		
		
		util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 08 ==> Cancel order in Partially Released status(line1- FTA, line2 - Partially Released)  ', done => {
		
		var lineCount = 2;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		for (var i = 0; i < lineCount; i++) {
			moOrderLoc.itemSelectFilter.click();
			moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			if (i == 1) {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
			} else {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
			}
			moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

			util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

			moOrderLoc.selectSearchItem.click();
			moOrderLoc.searchBtn.click();
			moOrderLoc.selectItem.click();
			moOrderLoc.addToOrder.click();

			//Change Price
			if (i == 1) {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
			} else {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
			}

			moOrderLoc.changePrice.click();
			if (i == 1) {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
			} else {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
			}

			moOrderLoc.savePrice.click();
			if (i == 1) {
				moOrderLoc.item2PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			} else {
				moOrderLoc.item1PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			}
		}
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});
		
		
		util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 09 ==> Cancel order in Partially Released status (line1- Released, line2 - FTA)', done => {
		
		var lineCount = 2;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		for (var i = 0; i < lineCount; i++) {
			moOrderLoc.itemSelectFilter.click();
			moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			if (i == 1) {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
			} else {
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
			}
			moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

			util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

			moOrderLoc.selectSearchItem.click();
			moOrderLoc.searchBtn.click();
			moOrderLoc.selectItem.click();
			moOrderLoc.addToOrder.click();

			//Change Price
			if (i == 1) {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
			} else {
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
			}

			moOrderLoc.changePrice.click();
			if (i == 1) {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
			} else {
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
			}

			moOrderLoc.savePrice.click();
			if (i == 1) {
				moOrderLoc.item2PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			} else {
				moOrderLoc.item1PopUp.click();
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();
			}
		}
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});
		
		
		util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();

		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 10 ==> Cancel order in Partially Shipped status(line1- Released, line2 - Partially Shipped)', done => {
		
		var createOrder = function(){
		
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 10;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});
	
	
	it('TC - 11 ==> Cancel order in Partially Shipped status(line1- Partially Released, line2 - Shipped) ', done => {
		
		var createOrder = function(){
			
			var invLookupLoc = moPageObj.invLookupLocators;
			invLookupLoc.menuInventory.click();
			invLookupLoc.tileInvLookup.click();
			invLookupLoc.addSkusBtn.click();
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
		
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
//					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 11;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});

	
	it('TC - 12 ==> Cancel order in Partially Shipped status(line1- Partially Released, line2 - Partially Shipped)', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 12;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});

	
	it('TC - 13 ==> Cancel order in Partially Shipped status(line1- FTA, line2 - Shipped)', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} 
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 13;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});
	
	

	
	it('TC - 14 ==> Cancel order in Partially Shipped status(line1- FTA, line2 - Partially Shipped)', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTAItem);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} 
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 14;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});	

	
	it('TC - 15 ==> Cancel order in Partially Shipped status(line1- Partially Shipped, line2 - Shipped)', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 15;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});
	
	
	it('TC - 16 ==> Cancel order in Partially Shipped status(line1- Partially Shipped, line2 - Partially Shipped)', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.soQtyBtn.click();
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 16;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});


	it('TC - 17 ==> Cancel Shipped status Order from API', done => {	
	
		var createOrder = function(){
			var lineCount = 1;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
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
	
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			//Change Price
			util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//		util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
			util.scrollDownByPixel();
			element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//		element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	
			moOrderLoc.changePrice.click();
			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
			moOrderLoc.savePrice.click();
			moOrderLoc.saveEditedSO.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 17;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();

		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].errorMessage).toContain("Sales Order is in SHIPPED state");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");

	});

	
	it('TC - 18 ==> Cancel Partially Shipped status order', done => {
		
		var createOrder = function(){
			
			var lineCount = 1;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
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
	
				//Change Price
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	
				moOrderLoc.changePrice.click();
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
	
				moOrderLoc.savePrice.click();
				moOrderLoc.item1PopUp.click();
				moOrderLoc.fulfillmentStore.sendKeys('Joliet');
				moOrderLoc.soQtyBtn.click();
				moOrderLoc.applyBtn.click();

			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 18;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("SHIPPED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("SHIPPED");
	});

	it('TC - 20 ==> Cancel order in Partially Released status', done => {
		
//		var invLookupLoc = moPageObj.invLookupLocators;
//		invLookupLoc.menuInventory.click();
//		invLookupLoc.tileInvLookup.click();
//		invLookupLoc.addSkusBtn.click();
//		invLookupLoc.skuDirectSearchTextBox.sendKeys(dataFile.ItemPartial);
//		invLookupLoc.skuDirectSearchTextBox.sendKeys(protractor.Key.RETURN);
//		invLookupLoc.selectSku.click();
//		invLookupLoc.skuSearchQty.clear().sendKeys("0");
//		invLookupLoc.addSkuBtn.click();
//		invLookupLoc.searchBtn.click();
//		invLookupLoc.skuHamburgerBtn.click();
//		invLookupLoc.skuDetails.click();
//		invLookupLoc.entryAdjTab.click();
//		invLookupLoc.adjQtyBy.sendKeys("1");
//		invLookupLoc.adjReason.sendKeys("QA Automation");
//		invLookupLoc.saveBtn.click();
			
		var lineCount = 1;
		var moOrderLoc = moPageObj.moOrderLocators;
		moOrderLoc.menuCallCenter.click();
		moOrderLoc.tileSalesOrders.click();
		util.scrollToView(moOrderLoc.newOrderButton);
		util.scrollDownByPixel();
		moOrderLoc.newOrderButton.click();
		//Customer Selection
		moOrderLoc.attachCustomerBtn.click();
		//moOrderLoc.savedCustSearchFilter.click();
		moOrderLoc.custSelectFilter.click();
		moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
		moOrderLoc.custSelectSearchFilter.sendKeys("contains");
		moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
		moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
		browser.sleep(2000);
		moOrderLoc.selectCustCheckBox.click();
		moOrderLoc.selectCustomer.click();
		//Item Selection
		//moOrderLoc.savedItemSearchFilter.click();
		for (var i = 0; i < lineCount; i++) {
			moOrderLoc.itemSelectFilter.click();
			moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
			moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
			moOrderLoc.itemSearchTextBox.sendKeys(dataFile.ItemPartial);
			moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);

			util.fluentWaitForClickable(moOrderLoc.selectSearchItem);

			moOrderLoc.selectSearchItem.click();
			moOrderLoc.searchBtn.click();
			moOrderLoc.selectItem.click();
			moOrderLoc.addToOrder.click();

			//Change Price
			util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
			util.scrollDownByPixel();
			element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version

			moOrderLoc.changePrice.click();
			moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);

			moOrderLoc.savePrice.click();
			moOrderLoc.item1PopUp.click();
			moOrderLoc.fulfillmentStore.sendKeys('Joliet');
			moOrderLoc.soQtyBtn.click();
			moOrderLoc.applyBtn.click();

		}
		moOrderLoc.saveSalesOrder.click();
		moOrderLoc.confirmSalesOrder.click();

		var paymentLoc = moPageObj.payment;
		paymentLoc.payBtn.isPresent().then(function (result) {
			if (result) {
				paymentLoc.payBtn.click();
				paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
				paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
				paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
				paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
				paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
				paymentLoc.cvv.sendKeys(dataFile.cvv);
				paymentLoc.Submit.click();
			}
		});
		
		util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

		var releaseSOLoc = moPageObj.releaseSOLocators;
		util.scrollToView(releaseSOLoc.statusHamburgerBtn);
		util.scrollDownByPixel();
		releaseSOLoc.statusHamburgerBtn.click();
		releaseSOLoc.releaseOrder.click();
		releaseSOLoc.confirmRelease.click();
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("PARTIALLY RELEASED");
		
		
		moOrderLoc.SONo.getText().then(function (text) {
			var salesOrderNo = text;
			console.log("Sales Order Number : " + salesOrderNo);
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		browser.refresh();
		browser.sleep(3000);
		expect(moOrderLoc.soHeaderStatus.getText()).toBe("CANCELED");
	});

	
	it('TC - 21 ==> Cancel order in Awaiting Customer Pickup status', done => {
		
		var createOrder = function(){
			
			var lineCount = 1;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
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
	
				//Change Price
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	
				moOrderLoc.changePrice.click();
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
	
				moOrderLoc.savePrice.click();
				moOrderLoc.item1PopUp.click();
				moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
				moOrderLoc.fulfillmentStore.sendKeys('Joliet');
				moOrderLoc.applyBtn.click();

			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 21;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 22 ==> Cancel order in Partially Awaiting Customer Pickup', done => {
		
		var createOrder = function(){
			
			var lineCount = 2;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				if (i == 1) {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
				} else {
					moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
				}
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				if (i == 1) {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[2]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[2]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[2]')).click();			//Older Version
				} else {
					util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
	//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
					util.scrollDownByPixel();
					element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
	//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
				}
	
				moOrderLoc.changePrice.click();
				if (i == 1) {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item2Price);
				} else {
					moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				}
	
				moOrderLoc.savePrice.click();
				if (i == 1) {
					moOrderLoc.item2PopUp.click();
					moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
					moOrderLoc.fulfillmentStore.sendKeys('Sandiego');
					moOrderLoc.applyBtn.click();
				} else {
					moOrderLoc.item1PopUp.click();
					moOrderLoc.fulfillmentType.sendKeys('Pick Up At Store');
					moOrderLoc.fulfillmentStore.sendKeys('Joliet');
					moOrderLoc.applyBtn.click();
				}
			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
	
			var releaseSOLoc = moPageObj.releaseSOLocators;
			util.scrollToView(releaseSOLoc.statusHamburgerBtn);
			util.scrollDownByPixel();
			releaseSOLoc.statusHamburgerBtn.click();
			releaseSOLoc.releaseOrder.click();
			releaseSOLoc.confirmRelease.click();
		};
		createOrder();
		
		var shipOrder = function(){

			moPageObj.moOrderLocators.SONo.getText().then(function (text) {

			salesOrderNo = text;
			var cancelAPIScenario = 22;
			console.log("Sales Order Number is :"+salesOrderNo);
			cancelAPIStrPortV2.storePortalShipment(cancelAPIScenario, salesOrderNo);
			
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			moOrderLoc.soFilterTextBox.clear().sendKeys(salesOrderNo);
			moOrderLoc.soFilterTextBox.sendKeys(protractor.Key.RETURN);
			util.fluentWaitForPresence(element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")));
			element(by.xpath("//*[text()[contains(.,'"+salesOrderNo+"')]]")).click();

			});
		};
		shipOrder();
			
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 25 ==> Cancel order in FTV status', done => {
		
		var createOrder = function(){
			
			var lineCount = 1;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTVItem);
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	
				moOrderLoc.changePrice.click();
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				moOrderLoc.savePrice.click();

			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
		};
		createOrder();
		
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var salesOrderNo = text;
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
					"orders": [{
						"orderNumber": salesOrderNo,
						"orderOrganization": "TheHonestKitchen-Organization-",
						"status": "CANCELED",
						"reasonCode": "CustomerRequest",
						"reasonDescription": "Cancelled by Customer"
					}]
				}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("CANCELED");
	});
	
	
	it('TC - 26 ==> Cancel line in FTV status', done => {
		
		var createOrder = function(){
			
			var lineCount = 1;
			var moOrderLoc = moPageObj.moOrderLocators;
			moOrderLoc.menuCallCenter.click();
			moOrderLoc.tileSalesOrders.click();
			util.scrollToView(moOrderLoc.newOrderButton);
			util.scrollDownByPixel();
			moOrderLoc.newOrderButton.click();
			//Customer Selection
			moOrderLoc.attachCustomerBtn.click();
			//moOrderLoc.savedCustSearchFilter.click();
			moOrderLoc.custSelectFilter.click();
			moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
			moOrderLoc.custSelectSearchFilter.sendKeys("contains");
			moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
			moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
			browser.sleep(2000);
			moOrderLoc.selectCustCheckBox.click();
			moOrderLoc.selectCustomer.click();
			//Item Selection
			//moOrderLoc.savedItemSearchFilter.click();
			for (var i = 0; i < lineCount; i++) {
				moOrderLoc.itemSelectFilter.click();
				moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
				moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
				moOrderLoc.itemSearchTextBox.sendKeys(dataFile.FTVItem);
				moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
	
				util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
	
				moOrderLoc.selectSearchItem.click();
				moOrderLoc.searchBtn.click();
				moOrderLoc.selectItem.click();
				moOrderLoc.addToOrder.click();
	
				//Change Price
				util.scrollToView(element(by.xpath('(//*[text()[contains(.,"More")]])[1]'))); //New Version
//			    util.scrollToView(element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]'))); //Older Version
				util.scrollDownByPixel();
				element(by.xpath('(//*[text()[contains(.,"More")]])[1]')).click(); //New Version
//			    element(by.xpath('(//*[@class="text-right trim"]/en-icon)[1]')).click();			//Older Version
	
				moOrderLoc.changePrice.click();
				moOrderLoc.priceTextBox.clear().sendKeys(dataFile.Item1Price);
				moOrderLoc.savePrice.click();

			}
			moOrderLoc.saveSalesOrder.click();
			moOrderLoc.confirmSalesOrder.click();
	
			var paymentLoc = moPageObj.payment;
			paymentLoc.payBtn.isPresent().then(function (result) {
				if (result) {
					paymentLoc.payBtn.click();
					paymentLoc.paymentMethod.sendKeys(dataFile.paymentMethod);
					paymentLoc.cardNumber.sendKeys(dataFile.cardNumber);
					paymentLoc.nameOnCard.sendKeys(dataFile.nameOnCard);
					paymentLoc.expirationMonth.sendKeys(dataFile.expirationMonth);
					paymentLoc.expirationYear.sendKeys(dataFile.expirationYear);
					paymentLoc.cvv.sendKeys(dataFile.cvv);
					paymentLoc.Submit.click();
				}
			});
			
			util.fluentWaitForPresence(moOrderLoc.SONo);
	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
		};
		createOrder();
		
		var cancelOrder = function(){
		
		moPageObj.moOrderLocators.SONo.getText().then(function (text) {
		var salesOrderNo = text;
		var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order/cancel',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + token
				},

				body: {
						"orders": [
					        {
					            "orderNumber": salesOrderNo,
					            "orderOrganization": "TheHonestKitchen-Organization-",
					            "lineItems": [
					                {
					                    "lineNumber": 1,
					                    "status": "CANCELLED",
					                    "reasonCode": "CustomerRequest",
					                    "reasonDescription": "Cancelled by Customer"
					                }
					            ]
					        }
					    ]
					}
			};

			options.json = true;
			console.log("token from token generation is " + options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('error:', +error);
				console.log('statusCode:', response && response.statusCode);
				console.log('body:', body);
				expect(response.statusCode).toBe(200);
				expect(response.body[0].status).toBe("CANCELED");
				done();

			});
		});
		};

		cancelOrder();
		browser.sleep(2000);
		browser.refresh();
		expect(moPageObj.moOrderLocators.soHeaderStatus.getText()).toBe("CANCELED");
		expect(moPageObj.moOrderLocators.line1Status.getText()).toBe("CANCELLED");
	});
	

});
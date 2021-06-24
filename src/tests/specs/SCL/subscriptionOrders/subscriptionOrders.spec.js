'use strict';
const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
var moPageObj = require(process.cwd()+'/src/tests/screens/mixedOrder/mo_po.js');
var moStrPortV2 = require(process.cwd()+'/src/tests/screens/mixedOrder/shipMO_StorePortalV2.js');
var validateStat = require(process.cwd()+'/src/tests/screens/mixedOrder/validateMO_Status.js');
var util = require(process.cwd()+'/src/tests/screens/mixedOrder/util.js');
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');

var today = new Date().getDate(); //Today's Date
var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); //Next Date is calculated by adding 24 hrs
var startDate = currentDate.getFullYear() + "-" +currentDate.getMonth()+1 + "-" + currentDate.getDate(); //Month starts from 0 hence adding 1
var endDate = currentDate.getFullYear()+ "-" +currentDate.getMonth()+4 + "-" + currentDate.getDate();



describe('Subscription Orders', function() { 
	
//	it('TC - 01 ==> Monthly Subscription via API', done =>{  
//		
//		var options = {
//		        method: 'POST',
//		        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
//		        headers: {
//		            'Content-Type': 'application/json',
//		            'Authorization': 'Bearer '+token
//		        },
//	        
//	       body: {
//	    	   "orders": [
//	    		    {
//	    		      "priority": "1",
//	    		      "orderDate": "2020-10-12T13:24:15-08:00",
//	    		      "orderNumber": order+1,
//	    		      "orderType": "SubscriptionOrder",
//	    		      "purchaseOrderNumber": "PUR-205",
//	    		      "channel": "B2B",
//	    		      "status": "OPEN",
//	    		      "orderOrganization": "TheHonestKitchen-Organization-",
//	    		      "orderTransactionType": "Subscription",
//	    		      "enteredBy": "Bhavya",
//	    		      "enspireCreateDate": "2020-02-12T13:24:15-08:00",
//	    		      "migrationOrder": false,
//	    		      "subscriptionInfo":{
//	    		                "frequency": "Monthly",
//	    		                "monthly" : [5,15,21,27],
//	    		                "weekly" : [4],
//	    		                "startDate" : startDate,
//	    		                "endDate" : endDate,
//	    		                "skipSchedules" :[],
//	    		                "holdSchedules" :[]
//	    		      },
//	    		      
//	    		      "lineItems": [
//	    		        {
//	    		          "lineNumber": 1,
//	    		          "status": "OPEN",
//	    		          "retailerReferenceItemSKU": "aaa",
//	    		          "lineItemId": "Barbie Pop Star Doll",
//	    		          "itemTitle": "Barbie Pop Star Doll",
//	    		          "itemDescription": "Computers",
//	    		          "itemUnitOfMeasure": "EA",
//	    		          "itemUnitPrice": "0",
//	    		          "lineItemQty": 1,
//	    		          "originalOrderedQty": 1,
//	    		          "deliveryMethod": "PICKUP_IN_STORE",
//	    		          "fulfillmentType": "SHIP_TO_CUSTOMER",
//	    		          "fulfillmentSite": "metrocashcarry",
//	    		          "reasonCode": "ABC",
//	    		          "bundleParent": true,
//	    		          "presell": true,
//	    		          "gift": true,
//	    		          "giftWrap": true,
//	    		          "shipFromSingleNode": true,
//	    		          "expectedShipDate": "2020-02-09T11:30:15-08:00",
//	    		          "expectedDeliveryDate": "2020-02-09T11:30:15-08:00",
//	    		          "shippingCarrier": "FEDEX",
//	    		          "carrierServiceType": "FedExGround",
//	    		          "shipAlone": true,
//	    		          "shipComplete": true,
//	    		          "shipToContact": {
//	    		            "firstName": "WENDY",
//	    		            "lastName": "ZIESEMANN",
//	    		            "address": {
//	    		              "address1": "24 Green St",
//	    		              "city": "Hudson",
//	    		              "state": "MA",
//	    		              "zip5": "01749",
//	    		              "country": "US"
//	    		            },
//	    		            "primaryEmail": "wendyziesemann01749@thk.com",
//	    		            "primaryPhone": "(000) 000-0423"
//	    		          },
//	    		          "priceInfo": {
//	    		            "unitPrice": 77.99,
//	    		            "retailPrice": 77.99,
//	    		            "listPrice": 97.99
//	    		          },
//	    		          "promos": [
//	    		            {
//	    		              "promoId": "BUY1GET1Free",
//	    		              "promoGroup":"BOGOF",
//	    		              "promoType":"SELL"
//	    		            },
//	    		            {
//	    		              "promoId": "BUY2GET1Free",
//	    		              "promoGroup":"B2G1F",
//	    		              "promoType":"SELLS"
//	    		            }
//	    		            
//	    		          ],
//	    		          "messages": [
//	    		            {
//	    		              "messageType": "GiftMessage",
//	    		              "messageText": "Hope You Enjoy This Gift!"
//	    		            }
//	    		          ],
//	    		          "references": [
//	    		            {
//	    		       "type": "String",
//	    		       "data": "PRESCRIPTION",
//	    		       "value": "PRESCRIPTION"
//	    		      },
//	    		            {
//	    		              "type": "String",
//	    		              "data":"pritilineref",
//	    		              "value": "12",
//	    		              "systemInd":"N",
//	    		              "requiredInd":"Y"
//	    		            },
//	    		            {
//	    		              "type": "Boolean",
//	    		              "data":"pritilinerefBoolean",
//	    		              "value": true,
//	    		              "systemInd":"Y",
//	    		              "requiredInd":"Y"
//	    		            }
//	    		          ],
//	    		          "notes": [
//	    		            {
//	    		              "noteType": "aaa",
//	    		              "noteText": "bbb note texxte"
//	    		            }
//	    		          ],
//	    		          "holds": [
//	    		            {
//	    		              "holdType": "dss",
//	    		              "holdStatus": "open",
//	    		              "holdReason": "fff"
//	    		            }
//	    		          ]
//	    		        }
//	    		      ],
//	    		      "referenceData": [
//	    		        {
//	    				   "type": "String",
//	    				   "data": "PRESCRIPTION",
//	    				   "value": "PRESCRIPTION"
//	    				},
//	    		        {
//	    		          "type": "String",
//	    		          "data":"pritirefOrder",
//	    		          "value": "12"
//	    		        }
//	    		      ],
//	    		     "promos": [
//	    		        {
//	    		          "promoId": "BUY1GET150%",
//	    		         "promoGroup":"BOGOF",
//	    		          "promoType":"priti"
//	    		        }
//	    		      ],
//	    		      "buyerContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "billToContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "shipToContacts": [
//	    		        {
//	    		          "firstName": "WENDY",
//	    		          "lastName": "ZIESEMANN",
//	    		          "address": {
//	    		            "address1": "24 Green St",
//	    		            "city": "Hudson",
//	    		            "state": "MA",
//	    		            "zip5": "01749",
//	    		            "country": "US"
//	    		          },
//	    		          "primaryEmail": "wendyziesemann01749@thk.com",
//	    		          "primaryPhone": "(000) 000-0423"
//	    		        }
//	    		      ],
//	    		      "holds": [
//	    		        {
//	    		          "holdType": "dss",
//	    		          "holdStatus": "open",
//	    		          "holdReason": "fff"
//	    		        }
//	    		      ],
//	    		      "timeDateReferences": [
//	    		        {
//	    		          "timeDateType": "eee",
//	    		          "strDateValue": "2020-02-06T11:30:15-08:00"
//	    		        }
//	    		      ],
//	    		      "messages": [
//	    		        {
//	    		          "messageType": "GiftMessage",
//	    		          "messageText": "Hope You Enjoy This Gift!"
//	    		        }
//	    		      ],
//	    		      "notes": [
//	    		        {
//	    		          "noteType": "aaa",
//	    		          "noteText": "bbb"
//	    		        }
//	    		      ],
//	    		     
//	    		      "expectedShipDate": "2019-03-03T11:30:15-08:00",
//	    		      "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
//	    		      "shippingCarrier": "FEDEX",
//	    		      "carrierServiceType": "FedExGround",
//	    		      "paymentTerms": "payterm",
//	    		      "orderLookUpKey": "22226",
//	    		      "shipFromSingleNode": true,
//	    		      "taxExempt": true,
//	    		      "taxExemptCertificate": "CERT",
//	    		      "taxPayerId": "123456",
//	    		      "orderSessionId": "session123"
//	    		       
//	    		    }
//	    		  ]
//	    		}
//	    };
//	    
//	    options.json = true;
//	    console.log("token from token generation is "+options.headers.Authorization);
//	    request(options, function (error, response, body) {
//			var errors = error;
//			console.log('error:', + error);
//			console.log('statusCode:', response && response.statusCode);
//			console.log('body:', body);
//			expect(response.statusCode).toBe(200);
//			expect(response.body.orders[0].orderNumber).toBe(order+1);
//			expect(response.body.orders[0].status).toBe("OPEN");
//			done();
//
//	      });
//	});
//	
//	
//	it('TC - 02 ==> Weekly Subscription via API', done =>{  
//		
//		var options = {
//		        method: 'POST',
//		        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
//		        headers: {
//		            'Content-Type': 'application/json',
//		            'Authorization': 'Bearer '+token
//		        },
//	        
//	       body: {
//	    	   "orders": [
//	    		    {
//	    		      "priority": "1",
//	    		      "orderDate": "2020-10-12T13:24:15-08:00",
//	    		      "orderNumber": order+2,
//	    		      "orderType": "SubscriptionOrder",
//	    		      "purchaseOrderNumber": "PUR-205",
//	    		      "channel": "B2B",
//	    		      "status": "OPEN",
//	    		      "orderOrganization": "TheHonestKitchen-Organization-",
//	    		      "orderTransactionType": "Subscription",
//	    		      "enteredBy": "Bhavya",
//	    		      "enspireCreateDate": "2020-02-12T13:24:15-08:00",
//	    		      "migrationOrder": false,
//	    		      "subscriptionInfo":{
//	    		                "frequency": "Weekly",
//	    		                "monthly" : [],
//	    		                "weekly" : [2,4,6],
//	    		                "startDate" : startDate,
//	    		                "endDate" : endDate,
//	    		                "skipSchedules" :[],
//	    		                "holdSchedules" :[]
//	    		      },
//	    		      
//	    		      "lineItems": [
//	    		        {
//	    		          "lineNumber": 1,
//	    		          "status": "OPEN",
//	    		          "retailerReferenceItemSKU": "aaa",
//	    		          "lineItemId": "Barbie Pop Star Doll",
//	    		          "itemTitle": "Barbie Pop Star Doll",
//	    		          "itemDescription": "Computers",
//	    		          "itemUnitOfMeasure": "EA",
//	    		          "itemUnitPrice": "0",
//	    		          "lineItemQty": 1,
//	    		          "originalOrderedQty": 1,
//	    		          "deliveryMethod": "PICKUP_IN_STORE",
//	    		          "fulfillmentType": "SHIP_TO_CUSTOMER",
//	    		          "fulfillmentSite": "metrocashcarry",
//	    		          "reasonCode": "ABC",
//	    		          "bundleParent": true,
//	    		          "presell": true,
//	    		          "gift": true,
//	    		          "giftWrap": true,
//	    		          "shipFromSingleNode": true,
//	    		          "expectedShipDate": "2020-02-09T11:30:15-08:00",
//	    		          "expectedDeliveryDate": "2020-02-09T11:30:15-08:00",
//	    		          "shippingCarrier": "FEDEX",
//	    		          "carrierServiceType": "FedExGround",
//	    		          "shipAlone": true,
//	    		          "shipComplete": true,
//	    		          "shipToContact": {
//	    		            "firstName": "WENDY",
//	    		            "lastName": "ZIESEMANN",
//	    		            "address": {
//	    		              "address1": "24 Green St",
//	    		              "city": "Hudson",
//	    		              "state": "MA",
//	    		              "zip5": "01749",
//	    		              "country": "US"
//	    		            },
//	    		            "primaryEmail": "wendyziesemann01749@thk.com",
//	    		            "primaryPhone": "(000) 000-0423"
//	    		          },
//	    		          "priceInfo": {
//	    		            "unitPrice": 77.99,
//	    		            "retailPrice": 77.99,
//	    		            "listPrice": 97.99
//	    		          },
//	    		          "promos": [
//	    		            {
//	    		              "promoId": "BUY1GET1Free",
//	    		              "promoGroup":"BOGOF",
//	    		              "promoType":"SELL"
//	    		            },
//	    		            {
//	    		              "promoId": "BUY2GET1Free",
//	    		              "promoGroup":"B2G1F",
//	    		              "promoType":"SELLS"
//	    		            }
//	    		            
//	    		          ],
//	    		          "messages": [
//	    		            {
//	    		              "messageType": "GiftMessage",
//	    		              "messageText": "Hope You Enjoy This Gift!"
//	    		            }
//	    		          ],
//	    		          "references": [
//	    		            {
//	    		       "type": "String",
//	    		       "data": "PRESCRIPTION",
//	    		       "value": "PRESCRIPTION"
//	    		      },
//	    		            {
//	    		              "type": "String",
//	    		              "data":"pritilineref",
//	    		              "value": "12",
//	    		              "systemInd":"N",
//	    		              "requiredInd":"Y"
//	    		            },
//	    		            {
//	    		              "type": "Boolean",
//	    		              "data":"pritilinerefBoolean",
//	    		              "value": true,
//	    		              "systemInd":"Y",
//	    		              "requiredInd":"Y"
//	    		            }
//	    		          ],
//	    		          "notes": [
//	    		            {
//	    		              "noteType": "aaa",
//	    		              "noteText": "bbb note texxte"
//	    		            }
//	    		          ],
//	    		          "holds": [
//	    		            {
//	    		              "holdType": "dss",
//	    		              "holdStatus": "open",
//	    		              "holdReason": "fff"
//	    		            }
//	    		          ]
//	    		        }
//	    		      ],
//	    		      "referenceData": [
//	    		        {
//	    				   "type": "String",
//	    				   "data": "PRESCRIPTION",
//	    				   "value": "PRESCRIPTION"
//	    				},
//	    		        {
//	    		          "type": "String",
//	    		          "data":"pritirefOrder",
//	    		          "value": "12"
//	    		        }
//	    		      ],
//	    		     "promos": [
//	    		        {
//	    		          "promoId": "BUY1GET150%",
//	    		         "promoGroup":"BOGOF",
//	    		          "promoType":"priti"
//	    		        }
//	    		      ],
//	    		      "buyerContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "billToContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "shipToContacts": [
//	    		        {
//	    		          "firstName": "WENDY",
//	    		          "lastName": "ZIESEMANN",
//	    		          "address": {
//	    		            "address1": "24 Green St",
//	    		            "city": "Hudson",
//	    		            "state": "MA",
//	    		            "zip5": "01749",
//	    		            "country": "US"
//	    		          },
//	    		          "primaryEmail": "wendyziesemann01749@thk.com",
//	    		          "primaryPhone": "(000) 000-0423"
//	    		        }
//	    		      ],
//	    		      "holds": [
//	    		        {
//	    		          "holdType": "dss",
//	    		          "holdStatus": "open",
//	    		          "holdReason": "fff"
//	    		        }
//	    		      ],
//	    		      "timeDateReferences": [
//	    		        {
//	    		          "timeDateType": "eee",
//	    		          "strDateValue": "2020-02-06T11:30:15-08:00"
//	    		        }
//	    		      ],
//	    		      "messages": [
//	    		        {
//	    		          "messageType": "GiftMessage",
//	    		          "messageText": "Hope You Enjoy This Gift!"
//	    		        }
//	    		      ],
//	    		      "notes": [
//	    		        {
//	    		          "noteType": "aaa",
//	    		          "noteText": "bbb"
//	    		        }
//	    		      ],
//	    		     
//	    		      "expectedShipDate": "2019-03-03T11:30:15-08:00",
//	    		      "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
//	    		      "shippingCarrier": "FEDEX",
//	    		      "carrierServiceType": "FedExGround",
//	    		      "paymentTerms": "payterm",
//	    		      "orderLookUpKey": "22226",
//	    		      "shipFromSingleNode": true,
//	    		      "taxExempt": true,
//	    		      "taxExemptCertificate": "CERT",
//	    		      "taxPayerId": "123456",
//	    		      "orderSessionId": "session123"
//	    		       
//	    		    }
//	    		  ]
//	    		}
//	    };
//	    
//	    options.json = true;
//	    console.log("token from token generation is "+options.headers.Authorization);
//	    request(options, function (error, response, body) {
//			var errors = error;
//			console.log('error:', + error);
//			console.log('statusCode:', response && response.statusCode);
//			console.log('body:', body);
//			expect(response.statusCode).toBe(200);
//			expect(response.body.orders[0].orderNumber).toBe(order+2);
//			expect(response.body.orders[0].status).toBe("OPEN");
//			done();
//
//	      });
//	});
//
//	it('TC - 03 and TC - 11 and and TC - 16 ==> Monthly Subscription via UI / OrderType field should be non editable once saved / Multi select of Dates', function() {  
//		
//		   	var moOrderLoc = moPageObj.moOrderLocators;
//		   	moOrderLoc.menuCallCenter.click();
//	    	moOrderLoc.tileSalesOrders.click();
//	    	util.scrollToView(moOrderLoc.newOrderButton);
//	    	util.scrollDownByPixel();
//	    	moOrderLoc.newOrderButton.click();
//	    	//Order Type
//	    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
//	    	//Customer Selection
//	    	moOrderLoc.attachCustomerBtn.click();
//	    	util.fluentWaitForClickable(moOrderLoc.custSelectFilter);
//	    	moOrderLoc.custSelectFilter.click();
//	    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
//	    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
//	    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
//	    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
//	    	browser.sleep(2000);
//	    	moOrderLoc.selectCustCheckBox.click();
//	    	moOrderLoc.selectCustomer.click();
//	    	
//	    	//Item Selection
//
//	    	moOrderLoc.itemSelectFilter.click();
//	    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
//	    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
//    		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
//	    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
//		    	
//	    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
//	    	
//	    	moOrderLoc.selectSearchItem.click();
//	    	moOrderLoc.searchBtn.click();
//	    	moOrderLoc.selectItem.click();
//	    	moOrderLoc.addToOrder.click();
//    		  
//	    	util.scrollToView(moOrderLoc.saveSalesOrder);
//	    	util.scrollDownByPixel();
//	    	moOrderLoc.saveSalesOrder.click();
//	    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
//	    	moOrderLoc.saveAsDraft.click();
//	    	
//	    	expect(element(by.xpath('//*[@class="ng-pristine ng-untouched ng-valid ng-scope"]')).isPresent()).toBeFalsy();
//	    	expect(element(by.xpath('//*[@class="ng-valid ng-scope ng-dirty ng-valid-parse ng-touched"]')).isPresent()).toBeFalsy();
//	    	
//	    	moOrderLoc.editSubEndDate.click();
//	    	moOrderLoc.subEndDateField.click();
//	    	for(var i=0; i<3 ; i++){
//	    		moOrderLoc.nextMonthSelector.click()
//	    	}
//	    	moOrderLoc.dateSelector.click();
//	    	moOrderLoc.editSubFrequency.click();
//	    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
//	    	moOrderLoc.editSubDays.click();
//	    	
//	    	moOrderLoc.selectDatesFrom1.click();
//	    	moOrderLoc.addToChosen.click();
//	    	moOrderLoc.selectDatesFrom2.click();
//	    	moOrderLoc.addToChosen.click();
//	    	moOrderLoc.selectDatesFrom3.click();
//	    	moOrderLoc.addToChosen.click();
//
//	    	moOrderLoc.submitChosenDaysDates.click();
//	    	moOrderLoc.saveSalesOrder.click();
//	    	moOrderLoc.confirmSalesOrder.click();
//	    	browser.sleep(2000);
//			
//	    	//Write SO number to JSON file
//	    	util.fluentWaitForPresence(moOrderLoc.SONo);
//	    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
//	    	browser.sleep(2000);
//	});
//	
//	
//	it('TC - 04 and and TC - 16 ==> Weekly Subscription via UI and Multi select of Days', function() {  
//		
//	   	var moOrderLoc = moPageObj.moOrderLocators;
//	   	moOrderLoc.menuCallCenter.click();
//    	moOrderLoc.tileSalesOrders.click();
//    	util.scrollToView(moOrderLoc.newOrderButton);
//    	util.scrollDownByPixel();
//    	moOrderLoc.newOrderButton.click();
//    	//Order Type
//    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
//    	//Customer Selection
//    	moOrderLoc.attachCustomerBtn.click();
//    	util.fluentWaitForClickable(moOrderLoc.savedCustSearchFilter);
//    	moOrderLoc.savedCustSearchFilter.click();
//    	moOrderLoc.custSelectFilter.click();
//    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
//    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
//    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
//    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
//    	browser.sleep(2000);
//    	moOrderLoc.selectCustCheckBox.click();
//    	moOrderLoc.selectCustomer.click();
//    	
//    	//Item Selection
//    	moOrderLoc.savedItemSearchFilter.click();
//    	moOrderLoc.itemSelectFilter.click();
//    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
//    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
//		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
//    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
//	    	
//    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
//    	
//    	moOrderLoc.selectSearchItem.click();
//    	moOrderLoc.searchBtn.click();
//    	moOrderLoc.selectItem.click();
//    	moOrderLoc.addToOrder.click();
//		  
//    	util.scrollToView(moOrderLoc.saveSalesOrder);
//    	util.scrollDownByPixel();
//    	moOrderLoc.saveSalesOrder.click();
////    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
//    	moOrderLoc.saveAsDraft.click();
//    	
//    	moOrderLoc.editSubEndDate.click();
//    	moOrderLoc.subEndDateField.click();
//    	for(var i=0; i<3 ; i++){
//    		moOrderLoc.nextMonthSelector.click()
//    	}
//    	moOrderLoc.dateSelector.click();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("WEEKLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDaysFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDaysFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDaysFrom3.click();
//    	moOrderLoc.addToChosen.click();
//
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.saveSalesOrder.click();
//    	moOrderLoc.confirmSalesOrder.click();
//    	
//    	browser.sleep(4000);
//    	
//    	//Write SO number to JSON file
//    	util.fluentWaitForPresence(moOrderLoc.SONo);
//    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
//    	browser.sleep(2000);
//	});
//	
//	
//	it('TC - 08 ==> Past dates - Validation via API', done =>{  
//		
//		var options = {
//		        method: 'POST',
//		        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
//		        headers: {
//		            'Content-Type': 'application/json',
//		            'Authorization': 'Bearer '+token
//		        },
//	        
//	       body: {
//	    	   "orders": [
//	    		    {
//	    		      "priority": "1",
//	    		      "orderDate": "2020-10-12T13:24:15-08:00",
//	    		      "orderNumber": order+3,
//	    		      "orderType": "SubscriptionOrder",
//	    		      "purchaseOrderNumber": "PUR-205",
//	    		      "channel": "B2B",
//	    		      "status": "OPEN",
//	    		      "orderOrganization": "TheHonestKitchen-Organization-",
//	    		      "orderTransactionType": "Subscription",
//	    		      "enteredBy": "Bhavya",
//	    		      "enspireCreateDate": "2020-02-12T13:24:15-08:00",
//	    		      "migrationOrder": false,
//	    		      "subscriptionInfo":{
//	    		                "frequency": "Weekly",
//	    		                "monthly" : [],
//	    		                "weekly" : [2,4,6],
//	    		                "startDate" : "2020-12-13",
//	    		                "endDate" : "2021-03-30",
//	    		                "skipSchedules" :[],
//	    		                "holdSchedules" :[]
//	    		      },
//	    		      
//	    		      "lineItems": [
//	    		        {
//	    		          "lineNumber": 1,
//	    		          "status": "OPEN",
//	    		          "retailerReferenceItemSKU": "aaa",
//	    		          "lineItemId": "Barbie Pop Star Doll",
//	    		          "itemTitle": "Barbie Pop Star Doll",
//	    		          "itemDescription": "Computers",
//	    		          "itemUnitOfMeasure": "EA",
//	    		          "itemUnitPrice": "0",
//	    		          "lineItemQty": 1,
//	    		          "originalOrderedQty": 1,
//	    		          "deliveryMethod": "PICKUP_IN_STORE",
//	    		          "fulfillmentType": "SHIP_TO_CUSTOMER",
//	    		          "fulfillmentSite": "metrocashcarry",
//	    		          "reasonCode": "ABC",
//	    		          "bundleParent": true,
//	    		          "presell": true,
//	    		          "gift": true,
//	    		          "giftWrap": true,
//	    		          "shipFromSingleNode": true,
//	    		          "expectedShipDate": "2020-02-09T11:30:15-08:00",
//	    		          "expectedDeliveryDate": "2020-02-09T11:30:15-08:00",
//	    		          "shippingCarrier": "FEDEX",
//	    		          "carrierServiceType": "FedExGround",
//	    		          "shipAlone": true,
//	    		          "shipComplete": true,
//	    		          "shipToContact": {
//	    		            "firstName": "WENDY",
//	    		            "lastName": "ZIESEMANN",
//	    		            "address": {
//	    		              "address1": "24 Green St",
//	    		              "city": "Hudson",
//	    		              "state": "MA",
//	    		              "zip5": "01749",
//	    		              "country": "US"
//	    		            },
//	    		            "primaryEmail": "wendyziesemann01749@thk.com",
//	    		            "primaryPhone": "(000) 000-0423"
//	    		          },
//	    		          "priceInfo": {
//	    		            "unitPrice": 77.99,
//	    		            "retailPrice": 77.99,
//	    		            "listPrice": 97.99
//	    		          },
//	    		          "promos": [
//	    		            {
//	    		              "promoId": "BUY1GET1Free",
//	    		              "promoGroup":"BOGOF",
//	    		              "promoType":"SELL"
//	    		            },
//	    		            {
//	    		              "promoId": "BUY2GET1Free",
//	    		              "promoGroup":"B2G1F",
//	    		              "promoType":"SELLS"
//	    		            }
//	    		            
//	    		          ],
//	    		          "messages": [
//	    		            {
//	    		              "messageType": "GiftMessage",
//	    		              "messageText": "Hope You Enjoy This Gift!"
//	    		            }
//	    		          ],
//	    		          "references": [
//	    		            {
//	    		       "type": "String",
//	    		       "data": "PRESCRIPTION",
//	    		       "value": "PRESCRIPTION"
//	    		      },
//	    		            {
//	    		              "type": "String",
//	    		              "data":"pritilineref",
//	    		              "value": "12",
//	    		              "systemInd":"N",
//	    		              "requiredInd":"Y"
//	    		            },
//	    		            {
//	    		              "type": "Boolean",
//	    		              "data":"pritilinerefBoolean",
//	    		              "value": true,
//	    		              "systemInd":"Y",
//	    		              "requiredInd":"Y"
//	    		            }
//	    		          ],
//	    		          "notes": [
//	    		            {
//	    		              "noteType": "aaa",
//	    		              "noteText": "bbb note texxte"
//	    		            }
//	    		          ],
//	    		          "holds": [
//	    		            {
//	    		              "holdType": "dss",
//	    		              "holdStatus": "open",
//	    		              "holdReason": "fff"
//	    		            }
//	    		          ]
//	    		        }
//	    		      ],
//	    		      "referenceData": [
//	    		        {
//	    				   "type": "String",
//	    				   "data": "PRESCRIPTION",
//	    				   "value": "PRESCRIPTION"
//	    				},
//	    		        {
//	    		          "type": "String",
//	    		          "data":"pritirefOrder",
//	    		          "value": "12"
//	    		        }
//	    		      ],
//	    		     "promos": [
//	    		        {
//	    		          "promoId": "BUY1GET150%",
//	    		         "promoGroup":"BOGOF",
//	    		          "promoType":"priti"
//	    		        }
//	    		      ],
//	    		      "buyerContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "billToContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "shipToContacts": [
//	    		        {
//	    		          "firstName": "WENDY",
//	    		          "lastName": "ZIESEMANN",
//	    		          "address": {
//	    		            "address1": "24 Green St",
//	    		            "city": "Hudson",
//	    		            "state": "MA",
//	    		            "zip5": "01749",
//	    		            "country": "US"
//	    		          },
//	    		          "primaryEmail": "wendyziesemann01749@thk.com",
//	    		          "primaryPhone": "(000) 000-0423"
//	    		        }
//	    		      ],
//	    		      "holds": [
//	    		        {
//	    		          "holdType": "dss",
//	    		          "holdStatus": "open",
//	    		          "holdReason": "fff"
//	    		        }
//	    		      ],
//	    		      "timeDateReferences": [
//	    		        {
//	    		          "timeDateType": "eee",
//	    		          "strDateValue": "2020-02-06T11:30:15-08:00"
//	    		        }
//	    		      ],
//	    		      "messages": [
//	    		        {
//	    		          "messageType": "GiftMessage",
//	    		          "messageText": "Hope You Enjoy This Gift!"
//	    		        }
//	    		      ],
//	    		      "notes": [
//	    		        {
//	    		          "noteType": "aaa",
//	    		          "noteText": "bbb"
//	    		        }
//	    		      ],
//	    		     
//	    		      "expectedShipDate": "2019-03-03T11:30:15-08:00",
//	    		      "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
//	    		      "shippingCarrier": "FEDEX",
//	    		      "carrierServiceType": "FedExGround",
//	    		      "paymentTerms": "payterm",
//	    		      "orderLookUpKey": "22226",
//	    		      "shipFromSingleNode": true,
//	    		      "taxExempt": true,
//	    		      "taxExemptCertificate": "CERT",
//	    		      "taxPayerId": "123456",
//	    		      "orderSessionId": "session123"
//	    		       
//	    		    }
//	    		  ]
//	    		}
//	    };
//	    
//	    options.json = true;
//	    console.log("token from token generation is "+options.headers.Authorization);
//	    request(options, function (error, response, body) {
//			var errors = error;
//			console.log('error:', + error);
//			console.log('statusCode:', response && response.statusCode);
//			console.log('body:', body);
//			expect(response.statusCode).toBe(400);
//			expect(response.body.message).toContain("not a valid subscription start date, it must be a future date");
//			done();
//
//	      });
//	});
//	
//	
//	it('TC - 13 ==> Do not pass orderType - it should be sales order', done =>{  
//		
//		var options = {
//		        method: 'POST',
//		        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
//		        headers: {
//		            'Content-Type': 'application/json',
//		            'Authorization': 'Bearer '+token
//		        },
//	        
//	       body: {
//	    	   "orders": [
//	    		    {
//	    		      "priority": "1",
//	    		      "orderDate": "2020-10-12T13:24:15-08:00",
//	    		      "orderNumber": order+4,
//	    		      "purchaseOrderNumber": "PUR-205",
//	    		      "channel": "B2B",
//	    		      "status": "OPEN",
//	    		      "orderOrganization": "TheHonestKitchen-Organization-",
//	    		      "orderTransactionType": "Subscription",
//	    		      "enteredBy": "Automation",
//	    		      "enspireCreateDate": "2020-02-12T13:24:15-08:00",
//	    		      "migrationOrder": false,
//	    		      "subscriptionInfo":{
//	    		                "frequency": "Monthly",
//	    		                "monthly" : [15,16,26,27],
//	    		                "weekly" : [4],
//	    		                "startDate" : startDate,
//	    		                "endDate" : endDate,
//	    		                "skipSchedules" :[],
//	    		                "holdSchedules" :[]
//	    		      },
//	    		      
//	    		      "lineItems": [
//	    		        {
//	    		          "lineNumber": 1,
//	    		          "status": "OPEN",
//	    		          "retailerReferenceItemSKU": "aaa",
//	    		          "lineItemId": "Barbie Pop Star Doll",
//	    		          "itemTitle": "Barbie Pop Star Doll",
//	    		          "itemDescription": "Computers",
//	    		          "itemUnitOfMeasure": "EA",
//	    		          "itemUnitPrice": "0",
//	    		          "lineItemQty": 1,
//	    		          "originalOrderedQty": 1,
//	    		          "deliveryMethod": "PICKUP_IN_STORE",
//	    		          "fulfillmentType": "SHIP_TO_CUSTOMER",
//	    		          "fulfillmentSite": "metrocashcarry",
//	    		          "reasonCode": "ABC",
//	    		          "bundleParent": true,
//	    		          "presell": true,
//	    		          "gift": true,
//	    		          "giftWrap": true,
//	    		          "shipFromSingleNode": true,
//	    		          "expectedShipDate": "2020-02-09T11:30:15-08:00",
//	    		          "expectedDeliveryDate": "2020-02-09T11:30:15-08:00",
//	    		          "shippingCarrier": "FEDEX",
//	    		          "carrierServiceType": "FedExGround",
//	    		          "shipAlone": true,
//	    		          "shipComplete": true,
//	    		          "shipToContact": {
//	    		            "firstName": "WENDY",
//	    		            "lastName": "ZIESEMANN",
//	    		            "address": {
//	    		              "address1": "24 Green St",
//	    		              "city": "Hudson",
//	    		              "state": "MA",
//	    		              "zip5": "01749",
//	    		              "country": "US"
//	    		            },
//	    		            "primaryEmail": "wendyziesemann01749@thk.com",
//	    		            "primaryPhone": "(000) 000-0423"
//	    		          },
//	    		          "priceInfo": {
//	    		            "unitPrice": 77.99,
//	    		            "retailPrice": 77.99,
//	    		            "listPrice": 97.99
//	    		          },
//	    		          "promos": [
//	    		            {
//	    		              "promoId": "BUY1GET1Free",
//	    		              "promoGroup":"BOGOF",
//	    		              "promoType":"SELL"
//	    		            },
//	    		            {
//	    		              "promoId": "BUY2GET1Free",
//	    		              "promoGroup":"B2G1F",
//	    		              "promoType":"SELLS"
//	    		            }
//	    		            
//	    		          ],
//	    		          "messages": [
//	    		            {
//	    		              "messageType": "GiftMessage",
//	    		              "messageText": "Hope You Enjoy This Gift!"
//	    		            }
//	    		          ],
//	    		          "references": [
//	    		            {
//	    		       "type": "String",
//	    		       "data": "PRESCRIPTION",
//	    		       "value": "PRESCRIPTION"
//	    		      },
//	    		            {
//	    		              "type": "String",
//	    		              "data":"pritilineref",
//	    		              "value": "12",
//	    		              "systemInd":"N",
//	    		              "requiredInd":"Y"
//	    		            },
//	    		            {
//	    		              "type": "Boolean",
//	    		              "data":"pritilinerefBoolean",
//	    		              "value": true,
//	    		              "systemInd":"Y",
//	    		              "requiredInd":"Y"
//	    		            }
//	    		          ],
//	    		          "notes": [
//	    		            {
//	    		              "noteType": "aaa",
//	    		              "noteText": "bbb note texxte"
//	    		            }
//	    		          ],
//	    		          "holds": [
//	    		            {
//	    		              "holdType": "dss",
//	    		              "holdStatus": "open",
//	    		              "holdReason": "fff"
//	    		            }
//	    		          ]
//	    		        }
//	    		      ],
//	    		      "referenceData": [
//	    		        {
//	    				   "type": "String",
//	    				   "data": "PRESCRIPTION",
//	    				   "value": "PRESCRIPTION"
//	    				},
//	    		        {
//	    		          "type": "String",
//	    		          "data":"pritirefOrder",
//	    		          "value": "12"
//	    		        }
//	    		      ],
//	    		     "promos": [
//	    		        {
//	    		          "promoId": "BUY1GET150%",
//	    		         "promoGroup":"BOGOF",
//	    		          "promoType":"priti"
//	    		        }
//	    		      ],
//	    		      "buyerContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "billToContactInfo": {
//	    		        "firstName": "WENDY",
//	    		        "lastName": "ZIESEMANN",
//	    		        "address": {
//	    		          "address1": "24 Green St",
//	    		          "city": "Hudson",
//	    		          "state": "MA",
//	    		          "zip5": "01749",
//	    		          "country": "US"
//	    		        },
//	    		        "primaryEmail": "wendyziesemann01749@thk.com",
//	    		        "primaryPhone": "(000) 000-0423"
//	    		      },
//	    		      "shipToContacts": [
//	    		        {
//	    		          "firstName": "WENDY",
//	    		          "lastName": "ZIESEMANN",
//	    		          "address": {
//	    		            "address1": "24 Green St",
//	    		            "city": "Hudson",
//	    		            "state": "MA",
//	    		            "zip5": "01749",
//	    		            "country": "US"
//	    		          },
//	    		          "primaryEmail": "wendyziesemann01749@thk.com",
//	    		          "primaryPhone": "(000) 000-0423"
//	    		        }
//	    		      ],
//	    		      "holds": [
//	    		        {
//	    		          "holdType": "dss",
//	    		          "holdStatus": "open",
//	    		          "holdReason": "fff"
//	    		        }
//	    		      ],
//	    		      "timeDateReferences": [
//	    		        {
//	    		          "timeDateType": "eee",
//	    		          "strDateValue": "2020-02-06T11:30:15-08:00"
//	    		        }
//	    		      ],
//	    		      "messages": [
//	    		        {
//	    		          "messageType": "GiftMessage",
//	    		          "messageText": "Hope You Enjoy This Gift!"
//	    		        }
//	    		      ],
//	    		      "notes": [
//	    		        {
//	    		          "noteType": "aaa",
//	    		          "noteText": "bbb"
//	    		        }
//	    		      ],
//	    		     
//	    		      "expectedShipDate": "2019-03-03T11:30:15-08:00",
//	    		      "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
//	    		      "shippingCarrier": "FEDEX",
//	    		      "carrierServiceType": "FedExGround",
//	    		      "paymentTerms": "payterm",
//	    		      "orderLookUpKey": "22226",
//	    		      "shipFromSingleNode": true,
//	    		      "taxExempt": true,
//	    		      "taxExemptCertificate": "CERT",
//	    		      "taxPayerId": "123456",
//	    		      "orderSessionId": "session123"
//	    		       
//	    		    }
//	    		  ]
//	    		}
//	    };
//	    
//	    options.json = true;
//	    console.log("token from token generation is "+options.headers.Authorization);
//	    request(options, function (error, response, body) {
//			var errors = error;
//			console.log('error:', + error);
//			console.log('statusCode:', response && response.statusCode);
//			console.log('body:', body);
//			expect(response.body.orders[0].orderNumber).toBe(order+4);
//			expect(response.body.orders[0].status).toBe("OPEN");
//			expect(response.body.orders[0].orderTransactionType).toBe("SALES");
//			done();
//
//	      });
//	});
//	
//	
it('TC - 15 and TC - 20 and TC - 21 Adding SKU and Update subscription End date (extend and prepone) and Update Start date', function() {  
		
	   	var moOrderLoc = moPageObj.moOrderLocators;
	   	moOrderLoc.menuCallCenter.click();
    	moOrderLoc.tileSalesOrders.click();
    	util.scrollToView(moOrderLoc.newOrderButton);
    	util.scrollDownByPixel();
    	moOrderLoc.newOrderButton.click();
    	//Order Type
    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
    	
    	//Customer Selection
    	moOrderLoc.attachCustomerBtn.click();
//    	util.fluentWaitForClickable(moOrderLoc.savedCustSearchFilter);
//    	moOrderLoc.savedCustSearchFilter.click();
    	util.fluentWaitForClickable(moOrderLoc.custSelectFilter);
    	moOrderLoc.custSelectFilter.click();
    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
    	browser.sleep(2000);
    	moOrderLoc.selectCustCheckBox.click();
    	moOrderLoc.selectCustomer.click();
    	
    	//Item Selection
//    	moOrderLoc.savedItemSearchFilter.click();
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
		  
    	util.scrollToView(moOrderLoc.saveSalesOrder);
    	util.scrollDownByPixel();
    	moOrderLoc.saveSalesOrder.click();
    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
    	moOrderLoc.saveAsDraft.click();
    	
    	moOrderLoc.editSubEndDate.click();
    	moOrderLoc.subEndDateField.click();
    	for(var i=0; i<3 ; i++){
    		moOrderLoc.nextMonthSelector.click()
    	}
    	moOrderLoc.dateSelector.click();
    	moOrderLoc.editSubFrequency.click();
    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
    	moOrderLoc.editSubDays.click();
    	
    	moOrderLoc.selectDatesFrom1.click();
    	moOrderLoc.addToChosen.click();
    	moOrderLoc.selectDatesFrom2.click();
    	moOrderLoc.addToChosen.click();
    	moOrderLoc.selectDatesFrom3.click();
    	moOrderLoc.addToChosen.click();

    	moOrderLoc.submitChosenDaysDates.click();
    	moOrderLoc.saveSalesOrder.click();
    	moOrderLoc.confirmSalesOrder.click();
    	browser.sleep(2000);
    	
    	//Write SO number to JSON file
    	util.fluentWaitForPresence(moOrderLoc.SONo);
    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
    	browser.sleep(2000);
    	
    	var curEndDate = moOrderLoc.subEndDate.getText();
    	//Change End Date to future date
    	util.scrollToView(moOrderLoc.editSubEndDate);
    	util.scrollDownByPixel();
    	moOrderLoc.editSubEndDate.click();
    	moOrderLoc.subEndDateField.click();
    	//Postpone by one Month
    	moOrderLoc.nextMonthSelector.click();
    	moOrderLoc.dateSelector.click();
    	expect(moOrderLoc.subStartDate.getText()).not.toEqual(curEndDate);
    	
    	curEndDate = moOrderLoc.subEndDate.getText();
    	//Change End Date to previous date
    	util.scrollToView(moOrderLoc.editSubEndDate);
    	util.scrollDownByPixel();
    	moOrderLoc.editSubEndDate.click();
    	moOrderLoc.subEndDateField.click();
    	//Postpone by one Month
    	moOrderLoc.previousMonthSelector.click();
    	moOrderLoc.dateSelector.click();
    	expect(moOrderLoc.subStartDate.getText()).not.toEqual(curEndDate);
    	
    	var curStartDate = moOrderLoc.subStartDate.getText();
    	//Change Start Date to future date
    	util.scrollToView(moOrderLoc.editSubStartDate);
    	util.scrollDownByPixel();
    	moOrderLoc.editSubStartDate.click();
    	moOrderLoc.subStartDateField.click();
    	//Postpone by one Month
    	moOrderLoc.nextMonthSelector.click();
    	moOrderLoc.dateSelector.click();
    	expect(moOrderLoc.subStartDate.getText()).not.toEqual(curStartDate)
    	browser.sleep(2000);
    	
    	
//    	moOrderLoc.savedItemSearchFilter.click();
    	moOrderLoc.itemSelectFilter.click();
    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item2);
    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
    	
    	moOrderLoc.selectSearchItem.click();
    	moOrderLoc.searchBtn.click();
    	moOrderLoc.selectItem.click();
    	moOrderLoc.addToOrder.click();
    	moOrderLoc.saveEditedSO.click();
    	expect(element(by.xpath('//*[text()[contains(.,"'+dataFile.Item2+'")]]')).isPresent()).toBe(true);
    	browser.sleep(2000);
	});
//
//	
//	it('TC - 22 Update subscription Frequency - Monthly to Weekly & Vice Versa', function() {  
//		
//	   	var moOrderLoc = moPageObj.moOrderLocators;
//	   	moOrderLoc.menuCallCenter.click();
//    	moOrderLoc.tileSalesOrders.click();
//    	util.scrollToView(moOrderLoc.newOrderButton);
//    	util.scrollDownByPixel();
//    	moOrderLoc.newOrderButton.click();
//    	//Order Type
//    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
//    	
//    	//Customer Selection
//    	moOrderLoc.attachCustomerBtn.click();
//    	util.fluentWaitForClickable(moOrderLoc.savedCustSearchFilter);
//    	moOrderLoc.savedCustSearchFilter.click();
//    	util.fluentWaitForClickable(moOrderLoc.custSelectFilter);
//    	moOrderLoc.custSelectFilter.click();
//    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
//    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
//    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
//    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
//    	browser.sleep(2000);
//    	moOrderLoc.selectCustCheckBox.click();
//    	moOrderLoc.selectCustomer.click();
//    	
//    	//Item Selection
//    	moOrderLoc.savedItemSearchFilter.click();
//    	moOrderLoc.itemSelectFilter.click();
//    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
//    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
//		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
//    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
//	    	
//    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
//    	
//    	moOrderLoc.selectSearchItem.click();
//    	moOrderLoc.searchBtn.click();
//    	moOrderLoc.selectItem.click();
//    	moOrderLoc.addToOrder.click();
//		  
//    	util.scrollToView(moOrderLoc.saveSalesOrder);
//    	util.scrollDownByPixel();
//    	moOrderLoc.saveSalesOrder.click();
//    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
//    	moOrderLoc.saveAsDraft.click();
//    	
//    	expect(element(by.xpath('//*[@class="ng-pristine ng-untouched ng-valid ng-scope"]')).isPresent()).toBeFalsy();
//    	expect(element(by.xpath('//*[@class="ng-valid ng-scope ng-dirty ng-valid-parse ng-touched"]')).isPresent()).toBeFalsy();
//    	
//    	moOrderLoc.editSubEndDate.click();
//    	moOrderLoc.subEndDateField.click();
//    	for(var i=0; i<3 ; i++){
//    		moOrderLoc.nextMonthSelector.click()
//    	}
//    	moOrderLoc.dateSelector.click();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDatesFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom3.click();
//    	moOrderLoc.addToChosen.click();
//
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.saveSalesOrder.click();
//    	moOrderLoc.confirmSalesOrder.click();
//    	browser.sleep(2000);
//    	
//    	//Write SO number to JSON file
//    	util.fluentWaitForPresence(moOrderLoc.SONo);
//    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
//    	browser.sleep(2000);
//    	
//    	//Change frequency from Monthly to Weekly
//    	util.scrollToView(moOrderLoc.editSubFrequency);
//    	util.scrollDownByPixel();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("WEEKLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDaysFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDaysFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDaysFrom3.click();
//    	moOrderLoc.addToChosen.click();
//
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.saveEditedSO.click();
//    	browser.sleep(2000);
//    	util.fluentWaitForPresence(moOrderLoc.subFrequencyType);
//    	expect(moOrderLoc.subFrequencyType.getText()).toBe('WEEKLY');
//    	
//    	//Change frequency from Weekly to Monthly
//    	util.scrollToView(moOrderLoc.editSubFrequency);
//    	util.scrollDownByPixel();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDatesFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom3.click();
//    	moOrderLoc.addToChosen.click();
//
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.saveEditedSO.click();
//    	browser.sleep(2000);
//    	util.fluentWaitForPresence(moOrderLoc.subFrequencyType);
//    	expect(moOrderLoc.subFrequencyType.getText()).toBe('MONTHLY');
//	});
//	
//	
//it('TC - 24 and TC - 27  and TC - 40 Hold and Skip multiple intervals and Save and Refresh Web Page', function() {  
//		
//	   	var moOrderLoc = moPageObj.moOrderLocators;
//	   	moOrderLoc.menuCallCenter.click();
//    	moOrderLoc.tileSalesOrders.click();
//    	util.scrollToView(moOrderLoc.newOrderButton);
//    	util.scrollDownByPixel();
//    	moOrderLoc.newOrderButton.click();
//    	//Order Type
//    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
//    	
//    	//Customer Selection
//    	moOrderLoc.attachCustomerBtn.click();
//    	util.fluentWaitForClickable(moOrderLoc.savedCustSearchFilter);
//    	moOrderLoc.savedCustSearchFilter.click();
//    	util.fluentWaitForClickable(moOrderLoc.custSelectFilter);
//    	moOrderLoc.custSelectFilter.click();
//    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
//    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
//    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
//    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
//    	browser.sleep(2000);
//    	moOrderLoc.selectCustCheckBox.click();
//    	moOrderLoc.selectCustomer.click();
//    	
//    	//Item Selection
//    	moOrderLoc.savedItemSearchFilter.click();
//    	moOrderLoc.itemSelectFilter.click();
//    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
//    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
//		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
//    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
//	    	
//    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
//    	
//    	moOrderLoc.selectSearchItem.click();
//    	moOrderLoc.searchBtn.click();
//    	moOrderLoc.selectItem.click();
//    	moOrderLoc.addToOrder.click();
//		  
//    	util.scrollToView(moOrderLoc.saveSalesOrder);
//    	util.scrollDownByPixel();
//    	moOrderLoc.saveSalesOrder.click();
//    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
//    	moOrderLoc.saveAsDraft.click();
//    	
//    	moOrderLoc.editSubEndDate.click();
//    	moOrderLoc.subEndDateField.click();
//    	for(var i=0; i<3 ; i++){
//    		moOrderLoc.nextMonthSelector.click();
//    	}
//    	moOrderLoc.dateSelector.click();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDatesFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom3.click();
//    	moOrderLoc.addToChosen.click();
//
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.saveSalesOrder.click();
//    	moOrderLoc.confirmSalesOrder.click();
//    	browser.sleep(2000);
//    	
//    	//Write SO number to JSON file
//    	util.fluentWaitForPresence(moOrderLoc.SONo);
//    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
//    	browser.sleep(2000);
//    	
//    	//Add 2 Hold Intervals
//    	util.scrollHorizontal(moOrderLoc.holdAndSkipTab);
//    	moOrderLoc.holdAndSkipTab.click();
//    	moOrderLoc.addHoldBtn.click();			// Adding 1st Hold
//    	moOrderLoc.editHoldEndDate1.click();	
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.editHoldStartDate1.click();
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.addHoldBtn.click();			// Adding 2nd Hold
//    	moOrderLoc.editHoldEndDate2.click();
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.editHoldStartDate2.click();
//    	util.fluentWaitForPresence(moOrderLoc.holdStartEndField)
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	
//    	//Add 2 Skip Intervals
//    	moOrderLoc.addSkipBtn.click();			// Adding 1st Skip
//    	moOrderLoc.editSkipEndDate1.click();	
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.editSkipStartDate1.click();
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.addSkipBtn.click();			// Adding 2nd Skip
//    	moOrderLoc.editSkipEndDate2.click();
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//    	moOrderLoc.editSkipStartDate2.click();
//    	util.fluentWaitForPresence(moOrderLoc.holdStartEndField)
//    	moOrderLoc.holdStartEndField.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.nextMonthSelector.click();
//    	moOrderLoc.selectHighlightedDate.click();
//
//    	var getHoldStartDate1 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[2]')).getText();
//    	var getHoldStartDate2 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[3]')).getText();
//    	var getHoldEndDate1 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[5]')).getText();
//    	var getHoldEndDate2 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[6]')).getText();
//    	var getSkipStartDate1 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[8]')).getText();
//    	var getSkipStartDate2 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[9]')).getText();
//    	var getSkipEndDate1 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[11]')).getText();
//    	var getSkipEndDate2 = element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[12]')).getText();
//    	moOrderLoc.saveEditedSO.click();
//    	browser.sleep(3000);
//    	browser.refresh();
//    	util.scrollHorizontal(moOrderLoc.holdAndSkipTab);
//    	moOrderLoc.holdAndSkipTab.click();
//    	
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[2]')).getText()).toBe(getHoldStartDate1);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[3]')).getText()).toBe(getHoldStartDate2);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[5]')).getText()).toBe(getHoldEndDate1);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[6]')).getText()).toBe(getHoldEndDate2);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[8]')).getText()).toBe(getSkipStartDate1);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[9]')).getText()).toBe(getSkipStartDate2);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[11]')).getText()).toBe(getSkipEndDate1);
//    	expect(element(by.xpath('((//*[@class="body margin-sm padding-sm"])//en-item)[12]')).getText()).toBe(getSkipEndDate2);
//    	
//	});
//
//	
//	it('TC - 35 and TC - 38 Subscription Start, Hold Start and Skip Start date should enable todays date and Default Current + 1 date as Start and End Date', function() {  
//		
//	   	var moOrderLoc = moPageObj.moOrderLocators;
//	   	moOrderLoc.menuCallCenter.click();
//    	moOrderLoc.tileSalesOrders.click();
//    	util.scrollToView(moOrderLoc.newOrderButton);
//    	util.scrollDownByPixel();
//    	moOrderLoc.newOrderButton.click();
//    	//Order Type
//    	moOrderLoc.soType.sendKeys("SubscriptionOrder");
//    	//Customer Selection
//    	moOrderLoc.attachCustomerBtn.click();
//    	util.fluentWaitForClickable(moOrderLoc.savedCustSearchFilter);
//    	moOrderLoc.savedCustSearchFilter.click();
//    	util.fluentWaitForClickable(moOrderLoc.custSelectFilter);
//    	moOrderLoc.custSelectFilter.click();
//    	moOrderLoc.custSelectSearchCriteria.sendKeys("Customer Number")
//    	moOrderLoc.custSelectSearchFilter.sendKeys("contains");
//    	moOrderLoc.custSearchTextBox.sendKeys(dataFile.custNumber);
//    	moOrderLoc.custSearchTextBox.sendKeys(protractor.Key.RETURN);
//    	browser.sleep(2000);
//    	moOrderLoc.selectCustCheckBox.click();
//    	moOrderLoc.selectCustomer.click();
//    	
//    	//Item Selection
//    	moOrderLoc.savedItemSearchFilter.click();
//    	moOrderLoc.itemSelectFilter.click();
//    	moOrderLoc.itemSelectSearchCriteria.sendKeys("Name");
//    	moOrderLoc.itemSelectSearchFilter.sendKeys("contains");
//		moOrderLoc.itemSearchTextBox.sendKeys(dataFile.Item1);
//    	moOrderLoc.itemSearchTextBox.sendKeys(protractor.Key.RETURN);
//	    	
//    	util.fluentWaitForClickable(moOrderLoc.selectSearchItem);
//    	
//    	moOrderLoc.selectSearchItem.click();
//    	moOrderLoc.searchBtn.click();
//    	moOrderLoc.selectItem.click();
//    	moOrderLoc.addToOrder.click();
//		  
//    	util.scrollToView(moOrderLoc.saveSalesOrder);
//    	util.scrollDownByPixel();
//    	moOrderLoc.saveSalesOrder.click();
//    	util.fluentWaitForClickable(moOrderLoc.saveAsDraft);
//    	moOrderLoc.saveAsDraft.click();
//    	//Checking Subscription Order Start and End Date is default set from next Day
//    	expect(moOrderLoc.subStartDate.getText()).toContain(currentDate.getDate());
//    	expect(moOrderLoc.subEndDate.getText()).toContain(currentDate.getDate());
//    	
//    	moOrderLoc.editSubEndDate.click();
//    	moOrderLoc.subEndDateField.click();
//    	for(var i=0; i<3 ; i++){
//    		moOrderLoc.nextMonthSelector.click()
//    	}
//
//    	moOrderLoc.dateSelector.click();
//    	moOrderLoc.editSubFrequency.click();
//    	moOrderLoc.subFrequency.sendKeys("MONTHLY");
//    	moOrderLoc.editSubDays.click();
//    	
//    	moOrderLoc.selectDatesFrom1.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom2.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.selectDatesFrom3.click();
//    	moOrderLoc.addToChosen.click();
//    	moOrderLoc.submitChosenDaysDates.click();
//    	moOrderLoc.editSubStartDate.click();
//    	moOrderLoc.subStartDateField.click();
//    	//checking that today's date is disabled
//    	expect(element(by.xpath('//*[@class="cal-day ng-binding ng-scope datepicker-disabled" and text()[contains(.,"'+today+'")]]')).isPresent()).toBe(true);
//    	moOrderLoc.SONo.click(); //to close the calendar
//    	
//    	////Check that the today's date is disabled in the Hold calendar
//    	util.scrollHorizontal(moOrderLoc.holdAndSkipTab);
//    	moOrderLoc.holdAndSkipTab.click();
//    	moOrderLoc.addHoldBtn.click();			
//    	moOrderLoc.editHoldEndDate1.click();	
//    	moOrderLoc.holdStartEndField.click();
//    	expect(element(by.xpath('//*[@class="cal-day ng-binding ng-scope datepicker-disabled" and text()[contains(.,"'+today+'")]]')).isPresent()).toBe(true);
//    	
//    	//Check that the today's date is disabled in the Skip calendar
//    	moOrderLoc.addSkipBtn.click();			
//    	element(by.xpath('(//*[@class="ng-binding"]/en-icon)[7]')).click();	
//    	moOrderLoc.holdStartEndField.click();
//    	expect(element(by.xpath('//*[@class="cal-day ng-binding ng-scope datepicker-disabled" and text()[contains(.,"'+today+'")]]')).isPresent()).toBe(true);
//    	
//    	moOrderLoc.saveSalesOrder.click();
//    	moOrderLoc.confirmSalesOrder.click();
//    	browser.sleep(2000);
//		
//    	//Write SO number to JSON file
//    	util.fluentWaitForPresence(moOrderLoc.SONo);
//    	util.getSONo(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');
//    	browser.sleep(2000);
//	});
});

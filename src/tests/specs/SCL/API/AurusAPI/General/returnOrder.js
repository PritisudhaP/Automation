const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');


//var shipmentRequestNumber = 000000011610;

describe("retrurn order creation", function () {
	
		var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
		var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();	

    it("return order", done =>{
     var options = {
      method: 'POST',
      url: browser.params.APIRequest+'/order',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
      },
       body: 
       {
        "orders": [
          {
            "orderDate": "2021-11-25T13:24:15-08:00",
            "channel": "B2C",
            "orderOrganization": "TheHonestKitchen-Organization-",
            "orderTransactionType": "Return",
            "status": "OPEN",
            "returnSite": "sandiego-dc",
            "fulfillmentSite": "sandiego-dc",
            "returnLocation": {
              "refName": "sandiego-dc",
              "dataDomain": [
                "com.thk"
              ],
              "objRef": true,
              "objRefType": "com.eis.core.api.v1.model.Site",
              "displayName": "sandiego-dc"
            },
            "lineItems": [
              {
                "lineNumber": 1,
                "status": "OPEN",
                "lineItemId": "testPriti1",
                "lineItemQty": 1,
                "originalOrderedQty": 1,
                "returnReason": "DAMAGED",
                "dispositionCode": "DAMAGED",
                "itemUnitPrice": browser.params.Amount1,
                "originalLine": {
                  "orderNo": orderId,
                  "orderOrganization": "TheHonestKitchen-Organization-",
                  "lineNumber": 1,
                  "shipmentRequestNo": shipmentRequestNumber
                },
                "returnFrom": {
                              "firstName": "John",
                              "lastName": "Doe",
                              "name": "John Doe",
                              "primaryEmail": "enspire@envistacorp.com",
                              "primaryPhone": "246-898-3672",
                              "companyName": "",
                              "address": {
                                "address1": "2 Pierce Place, 17th Floor",
                                "address2": "|1700",
                                "city": "Itasca",
                                "state": "IL",
                                "zip5": "60143",
                                "postalCode": "60143",
                                "country": "US"
                              }
                            },
                "priceInfo": {
                  "unitPrice": browser.params.Amount1,
                  "retailPrice": browser.params.Amount1,
                  "listPrice": browser.params.Amount1
                },
                "returnTo": {
                              "firstName": "John",
                              "lastName": "Doe",
                              "name": "John Doe",
                              "primaryEmail": "enspire@envistacorp.com",
                              "primaryPhone": "246-898-3672",
                              "companyName": "",
                              "address": {
                                "address1": "2 Pierce Place, 17th Floor",
                                "address2": "|1700",
                                "city": "Itasca",
                                "state": "IL",
                                "zip5": "60143",
                                "postalCode": "60143",
                                "country": "US"
                              }
                            }
              }
            ],
            "returnFrom": {
                              "firstName": "John",
                              "lastName": "Doe",
                              "name": "John Doe",
                              "primaryEmail": "enspire@envistacorp.com",
                              "primaryPhone": "246-898-3672",
                              "companyName": "",
                              "address": {
                                "address1": "2 Pierce Place, 17th Floor",
                                "address2": "|1700",
                                "city": "Itasca",
                                "state": "IL",
                                "zip5": "60143",
                                "postalCode": "60143",
                                "country": "US"
                              }
                            },
            "returnTo": {
                              "firstName": "John",
                              "lastName": "Doe",
                              "name": "John Doe",
                              "primaryEmail": "enspire@envistacorp.com",
                              "primaryPhone": "246-898-3672",
                              "companyName": "",
                              "address": {
                                "address1": "2 Pierce Place, 17th Floor",
                                "address2": "|1700",
                                "city": "Itasca",
                                "state": "IL",
                                "zip5": "60143",
                                "postalCode": "60143",
                                "country": "US"
                              }
                            }
	          		}
	        	]
	      	}	
	      };
	      options.json = true;
	      request(options, function (error, response, body) {
          var errors = error;
          console.log('statusCode:', response && response.statusCode);
          //console.log("id is from fr details "+body.items[0].id);
           console.log('body of return order ', body);
           global.returnOrderId=body.orders[0].id;
           global.rmaNumber=body.orders[0].orderNumber;
           console.log("sales order id is "+returnOrderId);
           console.log("RMA number is "+rmaNumber);
           browser.wait(function () {
               return rmaNumber != '';
           		}).then( function () {           	
           		browser.get(RMAReturnsUrl);
               salesOrderSummary.salesOrderSearch("Original Order #", rmaNumber);
               returnsCreate.RMASelect();
               browser.sleep(1000);
               returnsCreate.inspectclick();
               returnsCreate.getRMAQuantity().then(function(value) {
                   InspectedQTY = value;
                   expect(InspectedQTY).toEqual('1');

               })
               returnsCreate.inspectDetails("DAMAGED","This is a Test");  	
               commons.save(); //saving disposition
   	           browser.sleep(1000);
   	           returnsCreate.inspectSubmit();
   	           browser.sleep(3000);
               browser.get(callCenterReturnsUrl);
               salesOrderSummary.salesOrderSearch("Original Order #", rmaNumber);
               returnsCreate.RMAStatus().then(function (status) {
                	RMAInspectedStatus = status;
                    console.log("the status of the RMA #"+ rmaNumber+" after inspection is : "+RMAInspectedStatus);
                    expect(RMAInspectedStatus).toEqual("INSPECTED");
               })
               browser.sleep(2000);	            
               ///*****Adding payment disposition**********////
                callCenter.editLineGear("1");
                returnsCreate.paymentDispositionClik();
                returnsCreate.refundtype(browser.params.refundMethod);
                commons.save();
                returnsCreate.paymentDispositionSubmit();
                browser.sleep(4000);    
             	browser.get(paymentDispositionUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", rmaNumber);
                returnsCreate.RMAStatus().then(function (status) {
                	paymentDispositionStatus = status;
    	            console.log("the payment status of the RMA #"+ rmaNumber+" after payment Disposition is : "+paymentDispositionStatus);
    	            expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");
                });
           	});      
                browser.sleep(2000);
      done();

    });

  });
      
});

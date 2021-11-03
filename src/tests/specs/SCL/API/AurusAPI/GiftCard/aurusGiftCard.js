const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');



var NowMoment = moment();
var order = "GC"+NowMoment.format('YYMMDDHHmmss');

describe( "order creation", function () {

    it("create SO", done =>{
       
    var options = {
        method: 'POST',
        url: browser.params.APIRequest+'/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        

       body: { 
        
    	   "orders": [
    		    {
    		      "orderDate": "2020-02-23T16:40:02.057-05:00",
    		      "puchaseOrderNumber": order,
    		      "orderNumber": order,
    		      "migrationOrder": false,
    		      "carrierServiceType": "Ground",
    		      "originalOrderNumber": order,
    		      "status": "OPEN",
    		      "channel": "B2C",
    		      "orderOrganization": "TheHonestKitchen-Organization-",
    		      "orderTransactionType": "SALES",
    		      "lineItems": [
    		        {
    		          "lineNumber": 1,
    		          "lineItemId": "testPriti1",
    		          "itemTitle": "testPriti1",
    		          "itemUnitPrice": browser.params.Amount,
    		          "itemDescription": "testPriti1",
    		          "lineItemQty": 1,
    		          "status": "OPEN",
    		          "originalOrderedQty": "1",
    		          "carrierServiceType": "Ground",
    		          "fulfillmentType": "SHIP_TO_CUSTOMER",
    		          
    		          "presell": false,
    		          "references": [
    		            {
    		              "data": "UPC",
    		              "type": "String",
    		              "value": "850645008547"
    		            },
    		            {
    		              "data": "size",
    		              "type": "String",
    		              "value": "12 Cans"
    		            },
    		            {
    		              "data": "itemImageURL",
    		              "type": "String",
    		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"
    		            }
    		          ],
    		          "shipToContact": {
    		           "firstName": "WENDY",
    		            "lastName": "ZIESEMANN",
    		            "address": {
    		              "address1": "24 Green St",
    		              "city": "Hudson",
    		              "state": "MA",
    		              "zip5": "01749",
    		              "country": "US"
    		            },
    		            "primaryEmail": "wendyziesemann01749@thk.com",
    		            "primaryPhone": "(000) 000-0423"
    		          },
    		          "priceInfo": {
    		            "unitPrice": browser.params.Amount,
    		            "retailPrice": browser.params.Amount,
    		            "listPrice": browser.params.Amount
    		          },
    		          "lineTaxes": [
    		            {
    		              "taxName": "SALES_TAX",
    		              "taxAmount": 0,
    		              "taxRate": 0.0
    		            }
    		          ],
    		          "lineCharges": [
    		            {
    		              "chargeCategory": "SHIPPING",
    		              "chargeName": "SHIPPING",
    		              "chargeAmount": 0.0,
    		              "originalChargeAmount": 0.0
    		            }
    		          ]
    		        }   		         
    		    
    		    ],
    		      "buyerContactInfo": {
    		       "firstName": "WENDY",
    		            "lastName": "ZIESEMANN",
    		            "address": {
    		              "address1": "24 Green St",
    		              "city": "Hudson",
    		              "state": "MA",
    		              "zip5": "01749",
    		              "country": "US"
    		            },
    		            "primaryEmail": "wendyziesemann01749@thk.com",
    		            "primaryPhone": "(000) 000-0423"
    		      },
    		      "billToContactInfo": {
    		       "firstName": "WENDY",
    		            "lastName": "ZIESEMANN",
    		            "address": {
    		              "address1": "24 Green St",
    		              "city": "Hudson",
    		              "state": "MA",
    		              "zip5": "01749",
    		              "country": "US"
    		            },
    		            "primaryEmail": "wendyziesemann01749@thk.com",
    		            "primaryPhone": "(000) 000-0423"
    		      },
    		      "shipToContacts": [
    		        {
    		        "firstName": "WENDY",
    		            "lastName": "ZIESEMANN",
    		            "address": {
    		              "address1": "24 Green St",
    		              "city": "Hudson",
    		              "state": "MA",
    		              "zip5": "01749",
    		              "country": "US"
    		            },
    		            "primaryEmail": "wendyziesemann01749@thk.com",
    		            "primaryPhone": "(000) 000-0423"
    		    }
    		      ],
    		      "orderPayments": [
    		        {
    		          "status": "authorized",
    		          "transactionDate": "2020-04-16T00:00:00",
    		          "pnRef": browser.params.TransactionID,
    		          "paymentType": "GIFT_CARD",
    		          "nameOnCard": "SUJIT KUMAR SAHOO",
    		          "currency": "USD",
    		          "CorpID": "2472",
    		          "cardToken": browser.params.CardIdentifier,
    		          "expirationYear": "20",
    		          "expirationMonth": "02",
    		          "chargeSequence": 1,
    		          "refundSequence": 4,
    		          "maskedCardNumber": "5546",
    		          "totalChargedAmount":browser.params.Amount,
    		          "authorized": true,
    		          "fullyCaptured": true,
    		          "referenceData": [
    		                        {
    		                            "data": "OneOrderToken",
    		                            "type": "String",
    		                            "value": browser.params.OOTNum
    		                  
    		                        }
    		          ],
    		          "orderPaymentTransactions": [
    		            {
    		              "transactionDate": "2019-11-12T00:00:00",
    		              "transactionType": "SALE",
    		              "transactionActualAmount": browser.params.Amount,
    		              "transactionAttemptedAmount": browser.params.Amount,
    		              "pnRef": browser.params.TransactionID,
    		              "authorizedAmount": browser.params.Amount,
    		              "transactionExpirationDate": "2019-06-19T00:00:00",
    		              "referenceData": [],
    		              "paymentAccountDataToken": browser.params.CardIdentifier,
    		              "nameOnCard": "SUJIT KUMAR SAHOO",
    		              "expirationDate": "0220",
    		              "maskedCardNumber": "5546",
    		              "CorpID": "2472",
    		              "error": false,
    		              "cardIssuerTrxId": browser.params.ticketNumber
    		            }
    		          ]
    		        }
    		      ],
    		      "orderCharges": [],
    		      "orderDiscounts": [],
    		      "holds": [],
    		      "referenceData": [
    		        {
    		          "data": "CustomerID",
    		          "type": "String",
    		          "value": "000000000771"
    		        },
    		        {
    		          "data": "EmailPreferenceFlag",
    		          "type": "String",
    		          "value": "true"
    		        },
    		        {
    		          "data": "OrderUUID",
    		          "type": "String",
    		          "value": "664d76cfc0a8ed1d44f736565ed14700"
    		        },
    		        {
    		          "data": "SpeedFCShippingCode",
    		          "type": "String",
    		          "value": "SMRT"
    		        },
    		        {
    		          "data": "ORSOCode",
    		          "type": "String",
    		          "value": "0101"
    		        },
    		        {
    		          "data": "ORSOName",
    		          "type": "String",
    		          "value": "SFCC_DOMESTIC"
    		        },
    		        {
    		          "data": "ORSOType",
    		          "type": "String",
    		          "value": "SFCC"
    		        },
    		        {
    		          "data": "NoPayment",
    		          "type": "String",
    		          "value": "N"
    		        },
    		        {
    		          "data": "Expedite",
    		          "type": "String",
    		          "value": "true"
    		        },
    		        {
    		          "data": "CustomerOrderID",
    		          "type": "String",
    		          "value": order
    		        }
    		      ],
    		      "dataDomain": [
    		        "com.thk"
    		      ]
    		    }
    		  ]
             }
    

    };
    options.json = true;
        console.log("token from token generation is "+options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
          global.newGlobalVar=body.orders[0].id;
           global.orderId=body.orders[0].orderNumber;
         
           console.log("sales order id is "+newGlobalVar);
           console.log("order number is "+orderId);
           

          done();

        });



    })



})
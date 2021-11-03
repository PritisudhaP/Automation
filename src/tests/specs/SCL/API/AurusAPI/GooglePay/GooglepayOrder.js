const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
//var XLSX = require('xlsx');


var NowMoment = moment();
var order = "GP"+NowMoment.format('YYMMDDHHmmss');

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
            "orderDate": "2021-11-18T16:40:02.057-05:00",
            "puchaseOrderNumber": order,
            "orderNumber": order,
            "migrationOrder": false,
            "carrierServiceType": "FedExGround",
           "orderSource":"-",
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
                "carrierServiceType": "FedExGround",
                "fulfillmentType": "SHIP_TO_CUSTOMER",
                //"fulfillmentSite": "sandiego-dc",	
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
                  "firstName": "John",
                  "lastName": "Doe",
                  "name": "John Doe",
                  "primaryEmail": "enspire@envistacorp.com",
                  "primaryPhone": "6126126126",
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
                  "unitPrice": "30",
                  "retailPrice": 30,
                  "listPrice": 30
                },
                "lineTaxes": [
                  {
                    "taxName": "SALES_TAX",
                    "taxAmount": 0,
                    "taxRate": 0.0501
                  }
                ],
                "lineCharges": [
                  {
                    "chargeCategory": "SHIPPING",
                    "chargeName": "SHIPPING",
                    "chargeAmount": 0,
                    "originalChargeAmount": 0
                  },
                  {
                    "chargeCategory": "HANDLING",
                    "chargeName": "SHIPPING",
                    "chargeAmount": 0,
                    "originalChargeAmount": 0
                  }
                ],
                "lineDiscounts": [
                  {
                    "discountAmount": 0,
                    "discountName": "ORDER_DISCOUNT",
                    "originalDiscountAmount": 0,
                    "description": "10 Percent Off",
                    "promo": {
                      "promoId": "10%OFF",
                      "promoType": "OrderDisc",
                      "promoGroup": "OrderDisc"
                    },
                    "notes": [
                      {
                        "noteType": "INFO",
                        "noteText": "SAVE10"
                      }
                    ]
                  }
                ]
              }
            ],
            "buyerContactInfo": {
              "firstName": "John",
              "lastName": "Doe",
              "name": "John Doe",
              "primaryEmail": "enspire@envistacorp.com",
              "primaryPhone": "6126126126",
              "companyName": "",
              "nameId": "John Doe",
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
            "billToContactInfo": {
              "firstName": "John",
              "lastName": "Doe",
              "name": "John Doe",
              "primaryEmail": "enspire@envistacorp.com",
              "primaryPhone": "6126126126",
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
            "shipToContacts": [
              {
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
            ],
            "orderPayments": [
              {
                "status": "authorized",
                "transactionDate": "2020-04-16T00:00:00",
                "pnRef": browser.params.TransactionID,
                "paymentType": "GOOGLEPAY",
                "currency": "USD",
                "cardType": "GOOGLEPAY_INDIRECT",
                "cardToken": "",
                "expirationYear": "25",
                "expirationMonth": "05",
                "maskedCardNumber": "",
                "authorizedAmount": browser.params.Amount,
                "authorized": true,
                "fullyCaptured": false,
                "chargeSequence" : 1,
                 "refundSequence":1,
                "referenceData": [
                              {
                                  "data": "OneOrderToken",
                                  "type": "String",
                                  "value": browser.params.OOTNum
                                          
                              }
                ],
                "orderPaymentTransactions": [
                  {
                    "transactionDate": "2020-04-16T00:00:00",
                    "transactionType": "AUTHONLY",
                    "transactionActualAmount": browser.params.Amount,
                    "transactionAttemptedAmount": browser.params.Amount,
                    "pnRef": browser.params.TransactionID,
                    "authorizedAmount": browser.params.Amount,
                    "referenceData": [],
                    "paymentAccountDataToken": "",
                    "transactionExpirationDate" : "2020-04-20T00:00:00", 
                    "expirationDate": "",
                    "maskedCardNumber": "",
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
                "value": "O0004342"
              },
              {
                "data": "EmailPreferenceFlag",
                "type": "String",
                "value": "true"
              },
              {
                "data": "OrderUUID",
                "type": "String",
                "value": "664d76cfc0a8ed1d44f736565ed14777"
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
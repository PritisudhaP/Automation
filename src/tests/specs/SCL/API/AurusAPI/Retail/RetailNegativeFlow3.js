const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');

var NowMoment = moment();
var order = "CCR"+NowMoment.format('YYMMDDHHmmss');

describe( "order creation", function () {

    it("create SO", done =>{
       
    var options = {
        method: 'POST',
        url: 'https://project5-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        

       body: { 
        
                "orders": [
                  {
                    "priority": "1",
                    "orderDate": "2020-02-14T13:24:15-08:00",
                    "orderNumber": order,
                    "purchaseOrderNumber": order,
                    "channel": "B2C",
                    "status": "OPEN",
                    "orderOrganization": "TheHonestKitchen-Organization-",
                    "enteredBy": "Bharath",
                    "orderTransactionType": "SALES",
                    "enspireCreateDate": "2020-02-14T13:24:15-08:00",
                    "migrationOrder": false,
                    "lineItems": [
                      
                       {
                        "lineNumber": 1,
                        "status": "OPEN",
                        "retailerReferenceItemSKU": "testPriti1",
                        "lineItemId": "testPriti1",
                        "itemTitle": "testPriti1",
                        "itemDescription": "Computers",
                        "itemUnitOfMeasure": "EA",
                        "itemUnitPrice": browser.params.Amount,
                        "lineItemQty": 1,
                        "originalOrderedQty": 1,
                        "deliveryMethod": "SHIP_TO_CUSTOMER",
                        "fulfillmentType": "SHIP_TO_CUSTOMER",
                        //"fulfillmentSite": "sandiego-dc",
                        "reasonCode": "ABC",
                        "bundleParent": true,
                        "presell": false,
                        "gift": true,
                        "giftWrap": true,
                        "shipFromSingleNode": true,
                        "expectedShipDate": "2019-03-07T11:30:15-08:00",
                        "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
                        "shippingCarrier": "FEDEX",
                        "carrierServiceType": "FedExGround",
                        "shipAlone": true,
                        "shipComplete": true,
                        "shipToContact": {
                          "firstName": "John",
                          "lastName": "Scott",
                          "address": {
                            "address1": "123 test address",
                            "city": "Carmel",
                            "state": "IN",
                            "zip5": "46032",
                            "country": "US"
                          },
                          "primaryEmail": "jscott@enspirecommerce.com",
                          "primaryPhone": "516-476-8610"
                        },
                        "priceInfo": {
                          "unitPrice": browser.params.Amount,
                          "retailPrice": browser.params.Amount,
                          "listPrice": browser.params.Amount
                        },
                        "lineCharges": [
                          {
                            "chargeCategory": "SHIPPING",
                            "chargeName": "SHIPPING",
                            "chargeAmount": 0.0,
                            "originalChargeAmount": 0.0
                          },
                          {
                            "chargeCategory": "SHIPPING",
                            "chargeName": "OVERSIZE_SHIPPING",
                            "chargeAmount": 0.0,
                            "originalChargeAmount": 0.0
                          }
                        ],
                        "lineTaxes": [
                          {
                            "taxName": "SALES_TAX",
                            "taxAmount": 0.0,
                            "taxRate": 0.0
                          },
                          {
                            "taxName": "SHIPPING_TAX",
                            "taxAmount": 0.0,
                            "taxRate": 0.0
                          }
                        ],
                        "messages": [
                          {
                            "messageType": "GiftMessage",
                            "messageText": "Hope You Enjoy This Gift!"
                          }
                        ],
                        "references": [
                          
                        ],
                        "notes": [
                          {
                            "noteType": "aaa",
                            "noteText": "bbb note texxte"
                          }
                        ],
                        "holds": [
                          {
                            "holdType": "dss",
                            "holdStatus": "open",
                            "holdReason": "fff"
                          }
                        ]
                      }
                      
                    ],
                    "orderPayments": [
                      {
                        "processId" : "",
                        "corpId" : "2472",
                        "status": "authorized",
                        "nameOnCard": "psp",
                        "totalAuthorizedAmount": browser.params.Amount,
                        "totalChargedAmount": browser.params.Amount,
                        "transactionDate": "2018-03-05T11:25:15-08:00",
                        "currency": "USD",
                        "pnRef": browser.params.TransactionID,
                        "paymentType": "CREDIT_CARD",
                        "cardType": browser.params.cardType,
                        "cardToken": browser.params.CardIdentifier,
                        "expirationYear": "22",
                        "expirationMonth": "10",
                        "authorized": true,
                        "fullyCaptured" : true,
                        "chargeSequence": 2,
                        "refundSequence": 2,
                        "cardIssuerTrxId": browser.params.ticketNumber,
                         "referenceData": [
                                            {
                                                "data": "storeId",
                                                "type": "string",
                                                "value": "910002"
                                            }, {
                                                "data": "merchantId",
                                                "type": "string",
                                                "value": "12847221"
                                            }, {
                                                "data": "terminalId",
                                                "type": "string",
                                                "value": "100000063475"
                                            }
                          ],
                        "orderPaymentTransactions": [
                          {
                            "processId" : "",
                            "transactionDate": "2018-03-05T11:26:15-08:00",
                            "transactionType": "SALE",
                            "firstName": "",
                            "lastName": "",
                            "nameOnCard": "",
                            "transactionActualAmount": browser.params.Amount,
                            "transactionAttemptedAmount": browser.params.Amount,
                            "authorizedAmount": browser.params.Amount,
                            "approvalCode": "567678",
                             "referenceData": [
                                            {
                                                "data": "storeId",
                                                "type": "string",
                                                "value": ""
                                            }, {
                                                "data": "merchantId",
                                                "type": "string",
                                                "value": ""
                                            }, {
                                                "data": "terminalId",
                                                "type": "string",
                                                "value": ""
                                            }
                          ],
                            "pnRef": browser.params.TransactionID,
                            "cardIssuerTrxId": browser.params.ticketNumber,
                            "paymentAccountDataToken" : browser.params.CardIdentifier,
                            "cvvResultMessage": "success",
                            "cvvResultCode": "01",
                            "transactionExpirationDate": "2019-12-12T11:27:15-08:00"
                           
                          }
                        ]
                      }
                      
                    ],
                    "referenceData": [
                      
                    ],
                    "orderCharges": [
                      
                    ],
                    "orderDiscounts": [
                      
                    ],
                    "orderTaxes": [
                      
                    ],
                    "orderTotals": {
                     
                    },
                    "promos": [
                      
                    ],
                    "buyerContactInfo": {
                      "firstName": "John",
                      "lastName": "Scott",
                      "primaryEmail": "jscott@enspirecommerce.com",
                      "primaryPhone": "416-234-1234",
                      "address": {
                        "address1": "123 test address",
                        "city": "Carmel",
                        "state": "IN",
                        "zip5": "46032",
                        "country": "US"
                      }
                    },
                    "billToContactInfo": {
                      "firstName": "Mike",
                      "lastName": "Scott",
                      "primaryEmail": "mscott@enspirecommerce.com",
                      "primaryPhone": "546-345-6456",
                      "address": {
                        "address1": "456 Meridian blvd",
                        "city": "Fishers",
                        "state": "IN",
                        "zip5": "46037",
                        "country": "US"
                      }
                    },
                    "shipToContacts": [
                      {
                        "firstName": "John",
                        "lastName": "Scott",
                        "address": {
                          "address1": "123 test address",
                          "city": "Carmel",
                          "state": "IN",
                          "zip5": "46032",
                          "country": "US"
                        },
                        "primaryEmail": "jscott@enspirecommerce.com",
                        "primaryPhone": "516-476-8610"
                      }
                    ],
                    "holds": [
                      {
                        "holdType": "dss",
                        "holdStatus": "open",
                        "holdReason": "fff"
                      }
                    ],
                    "timeDateReferences": [
                      {
                        "timeDateType": "eee",
                        "strDateValue": "2019-04-03T11:30:15-08:00"
                      }
                    ],
                    "messages": [
                      {
                        "messageType": "GiftMessage",
                        "messageText": "Hope You Enjoy This Gift!"
                      }
                    ],
                    "notes": [
                      {
                        "noteType": "aaa",
                        "noteText": "bbb"
                      }
                    ],
                    "expectedShipDate": "2019-03-03T11:30:15-08:00",
                    "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
                    "shippingCarrier": "FEDEX",
                    "carrierServiceType": "FedExGround",
                    "paymentTerms": "payterm",
                    "orderLookUpKey": "22226",
                    "shipFromSingleNode": true,
                    "taxExempt": true,
                    "taxExemptCertificate": "CERT",
                    "taxPayerId": "123456",
                    "orderSessionId": "session123"
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
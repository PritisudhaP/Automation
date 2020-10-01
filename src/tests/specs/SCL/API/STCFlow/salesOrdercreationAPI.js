const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');




var NowMoment = moment();
var order =NowMoment.format('YYYY-MM-DDHHmmss');

describe( "order creation", function () {




    it("create SO", done =>{



    var options = {
        method: 'POST',
        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },


       body: {
            "orders": [
                {
                    "priority": "1",
                    "orderDate": "2019-04-05T13:24:15-08:00",
                    "orderNumber": order,
                    "orderType":"salesOrder",
                    "purchaseOrderNumber": "PUR-205",
                    "channel": "B2B",
                    "status": "Open",
                    "orderOrganization": "TheHonestKitchen-Organization-",
                    "orderTransactionType": "Sales",
                    "enteredBy": "Nivee",
                    "enspireCreateDate": "2019-03-05T11:30:15-08:00",
                    "lineItems": [
                        {
                            "lineNumber": 1,
                            "status": "OPEN",
                            "lineItemId": "NiveeSku1",
                            "itemTitle": "NiveeSku1",
                            "itemDescription": "NiveeSku1",
                            "itemUnitOfMeasure": "EA",
                            "itemUnitPrice": "10",
                            "lineItemQty": 1,
                            "originalOrderedQty": 1,
                            "deliveryMethod": "PICKUP_IN_STORE",
                            "fulfillmentType": "",
                            "fulfillmentSite": "joliet-dc",
                            "reasonCode": "ABC",
                            "bundleParent": true,
                            "presell": false,
                            "gift": true,
                            "giftWrap": true,
                            "shipFromSingleNode": true,
                            "expectedShipDate": "2019-03-07T11:30:15-08:00",
                            "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
                            "shippingCarrier": "FDX",
                            "carrierServiceType": "Ground",
                            "shipAlone": true,
                            "shipComplete": true,
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
                                "unitPrice": 77.99,
                                "retailPrice": 77.99,
                                "listPrice": 97.99
                            },
                            "lineCharges": [
                                {
                                    "chargeCategory": "SHIPPING",
                                    "chargeName": "SHIPPING",
                                    "chargeAmount": 6.99,
                                    "originalChargeAmount": 6.99
                                },
                                {
                                    "chargeCategory": "SHIPPING",
                                    "chargeName": "OVERSIZE_SHIPPING",
                                    "chargeAmount": 16.99,
                                    "originalChargeAmount": 16.99
                                }
                            ],

                            "lineTaxes": [
                                {
                                    "taxName": "SALES_TAX",
                                    "taxAmount": 3.45,
                                    "taxRate": 5.75
                                },
                                {
                                    "taxName": "SHIPPING_TAX",
                                    "taxAmount": 3.45,
                                    "taxRate": 5.75
                                }
                            ],
                            "lineTotals": {
                                "lineSubTotalBeforeTax": 87.97,
                                "lineExtendedPrice": 83.97,
                                "lineTax": 3.45,
                                "lineDiscount": 2.99,
                                "lineCharges": 6.99,
                                "lineTotal": 91.42
                            },
                            "promos": [
                                {
                                    "promoGroup": null,
                                    "promoType": null,
                                    "promoId": "TEST01",
                                    "coupon":{
                                        "couponId": "testcoupon",
                                        "couponGroup": "BOGOF",
                                        "couponType": "SELL"
                                    }
                                }

                            ],
                            "messages": [
                                {
                                    "messageType": "GiftMessage",
                                    "messageText": "Hope You Enjoy This Gift!"
                                }
                            ],
                            "references": [
                                {
                                    "type": "String",
                                    "data":"pritilineref",
                                    "value": "12",
                                    "systemInd":"N",
                                    "requiredInd":"Y"
                                },
                                {
                                    "type": "Boolean",
                                    "data":"pritilinerefBoolean",
                                    "value": true,
                                    "systemInd":"Y",
                                    "requiredInd":"Y"
                                }
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

                    "referenceData": [
                        {
                            "type": "String",
                            "data":"pritirefOrder",
                            "value": "12"
                        }
                    ],
                    "orderCharges": [
                        {
                            "chargeCategory": "050",
                            "chargeName": "Freight",
                            "chargeAmount": 95.87,
                            "originalChargeAmount": 94.48
                        }
                    ],

                    "orderTaxes": [
                        {
                            "taxName": "VAT",
                            "taxAmount": 10,
                            "taxRate": 10
                        }
                    ],
                    "orderTotals": {
                        "orderSubTotalBeforeTax": 87.97,
                        "orderTax": 0,
                        "orderDiscount": 0,
                        "orderCharges": 0,
                        "orderTotal": 91.42
                    },

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
                    "orderPayments": [
                        {
                            "status": "authorized",
                            "nameOnCard":"psp",
                            "totalAuthorizedAmount": 224.67,
                            "totalChargedAmount": 91.42,
                            "transactionDate": "2018-03-05T11:25:15-08:00",
                            "currency":"USD",
                            "pnRef": "1234",
                            "paymentType": "CREDIT_CARD",
                            "cardType": "MASTERCARD",
                            "cardToken": "34355656878879899",
                            "expirationYear": "22",
                            "expirationMonth": "10",
                            "chargeSequence":"",
                            "orderPaymentTransactions": [
                                {
                                    "transactionDate": "2018-03-05T11:26:15-08:00",
                                    "transactionType": "AUTHONLY",
                                    "firstName":"",
                                    "lastName":"",
                                    "nameOnCard":"",
                                    "transactionActualAmount": 91.42,
                                    "transactionAttemptedAmount":70.98,
                                    "authorizedAmount":23.98,
                                    "approvalCode": "567678",
                                    "pnRef": "1234",
                                    "cardIssuerTrxId": "2424325435456",
                                    "cvvResultMessage": "success",
                                    "cvvResultCode": "01",
                                    "transactionExpirationDate": "2018-03-12T11:27:15-08:00"
                                }
                            ]
                        }
                    ],
                    "expectedShipDate": "2019-03-03T11:30:15-08:00",
                    "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
                    "shippingCarrier": "FDX",
                    "carrierServiceType": "Ground",
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


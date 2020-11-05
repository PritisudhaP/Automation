const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');

describe( "Service Order API", function () {

    it("TC - 01 -> Create a sales order by providing only mandatory fileds", done =>{

    var options = {
        method: 'POST',
        url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        

       body: {
    	   "orders":[
    		      {
    		         "orderDate":"2018-03-05T11:24:15-08:00",
    		         "orderNumber":order+1,
    		         "status":"OPEN",
    		         "channel":"B2B",
    		         "orderOrganization":"TheHonestKitchen-Organization-",
    		         "orderTransactionType":"Sales",
    		         "lineItems":[
    		            {
    		               "lineNumber":1,
    		               "status":"OPEN",
    		               "lineItemId": "AcuSKU1",
    		               "lineItemQty":5,
    		               "originalOrderedQty":5,
    		               "shipToContact":{
    		                  "firstName":"Priti",
    		                  "lastName":"Testing",
    		                  "address":{
    		                     "address1":"1296 Regency",
    		                     "city":"Eugene",
    		                     "state":"OR",
    		                     "zip5":"97401",
    		                     "country":"US"
    		                  },
    		                  "primaryEmail":"priti@gmail.com",
    		                  "primaryPhone":"(000) 000-0429"
    		               },
    		               "priceInfo":{
    		                  "unitPrice":77.99,
    		                  "retailPrice":77.99,
    		                  "listPrice":97.99
    		               }
    		            }
    		         ],
    		         "buyerContactInfo":{
    		            "firstName":"John",
    		            "lastName":"Scott",
    		            "primaryEmail":"jscott@enspirecommerce.com",
    		            "primaryPhone":"416-234-1234",
    		            "address":{
    		               "address1":"123 test address",
    		               "city":"Carmel",
    		               "state":"IN",
    		               "zip5":"46032",
    		               "country":"US"
    		            }
    		         },
    		         "billToContactInfo":{
    		            "firstName":"Mike",
    		            "lastName":"Scott",
    		            "primaryEmail":"mscott@enspirecommerce.com",
    		            "primaryPhone":"546-345-6456",
    		            "address":{
    		               "address1":"456 Meridian blvd",
    		               "city":"Fishers",
    		               "state":"IN",
    		               "zip5":"46037",
    		               "country":"US"
    		            }
    		         }
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
		expect(response.statusCode).toBe(200);
		expect(response.body.orders[0].orderNumber).toContain(order+1);
		done();

        });
    }),
    
    
    
    
    it("TC - 02 -> With multiple line items in a single order", done =>{

        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            

           body: { 
        	   "orders":[ 
        		      { 
        		         "priority":"1",
        		         "orderDate":"2019-12-27T13:24:15-08:00",
        		         "orderNumber":order+2,
        		         "orderType":"salesOrder",
        		         "purchaseOrderNumber":"PUR-205",
        		         "channel":"B2B",
        		         "status":"DRAFT",
        		         "orderOrganization":"TheHonestKitchen-Organization-",
        		         "orderTransactionType":"Sales",
        		         "enteredBy":"priti",
        		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
        		         "customer":
        		           {
        						"customerId": "CustAQA002"
        		           },
        		         "lineItems":[ 
        		            { 
        		               "lineNumber":1,
        		               "status":"OPEN",
        		               "retailerReferenceItemSKU":"aaa",
        		               "lineItemId": "AcuSKU2",
        		               "itemTitle":"AcuSKU2",
        		               "itemDescription":"Computers",
        		               "itemUnitOfMeasure":"EA",
        		               "itemUnitPrice":"10",
        		               "lineItemQty":1,
        		               "originalOrderedQty":1,
        		               "deliveryMethod":"shipToHome",
        		               "fulfillmentType":"ShipToHome",
        		               "fulfillmentSite":"joliet-dc",
        		               "reasonCode":"ABC",
        		               "bundleParent":true,
        		               "presell":false,
        		               "gift":true,
        		               "giftWrap":true,
        		               "shipFromSingleNode":true,
        		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
        		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
        		               "shippingCarrier":"FEDEX",
        		               "carrierServiceType":"FedExGround",
        		               "shipAlone":true,
        		               "shipComplete":true,
        		               "shipToContact":{ 
        		                  "firstName":"XYZ",
        		                  "lastName":"M",
        		                  "address":{ 
        		                     "address1":"3 Smoky Hollow Lane",
        		                     "city":"Deltona",
        		                     "state":"FL",
        		                     "zip5":"32725",
        		                     "country":"US"
        		                  },
        		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
        		                  "primaryPhone":"456-456-4567"
        		               },
        		               "priceInfo":{ 
        		                  "unitPrice":77.99,
        		                  "retailPrice":77.99,
        		                  "listPrice":97.99
        		               },
        		               "lineCharges":[ 
        		                  { 
        		                     "chargeCategory":"SHIPPING",
        		                     "chargeName":"SHIPPING",
        		                     "chargeAmount":6.99,
        		                     "originalChargeAmount":6.99
        		                  },
        		                  { 
        		                     "chargeCategory":"SHIPPING",
        		                     "chargeName":"OVERSIZE_SHIPPING",
        		                     "chargeAmount":16.99,
        		                     "originalChargeAmount":16.99
        		                  }
        		               ],
        		               "lineDiscounts":[ 
        		                  { 
        		                     "discountAmount":2.99,
        		                     "discountName":"ITEM_DISCOUNT",
        		                     "originalDiscountAmount":2.99
        		                  },
        		                  { 
        		                     "discountAmount":2.99,
        		                     "discountName":"ORDER_DISCOUNT",
        		                     "originalDiscountAmount":2.99
        		                  }
        		               ],
        		               "lineTaxes":[ 
        		                  { 
        		                     "taxName":"SALES_TAX",
        		                     "taxAmount":3.45,
        		                     "taxRate":5.75
        		                  },
        		                  { 
        		                     "taxName":"SHIPPING_TAX",
        		                     "taxAmount":3.45,
        		                     "taxRate":5.75
        		                  }
        		               ],
        		               "promos":[ 
        		                  { 
        		                     "promoId":"BUY1GET1Free",
        		                     "promoGroup":"BOGOF",
        		                     "promoType":"SELL"
        		                  },
        		                  { 
        		                     "promoId":"BUY2GET1Free",
        		                     "promoGroup":"B2G1F",
        		                     "promoType":"SELLS"
        		                  }
        		               ],
        		               "messages":[ 
        		                  { 
        		                     "messageType":"GiftMessage",
        		                     "messageText":"Hope You Enjoy This Gift!"
        		                  }
        		               ],
        		               "references":[ 
        		                  { 
        		                     "type":"String",
        		                     "data":"pritilineref",
        		                     "value":"12",
        		                     "systemInd":"N",
        		                     "requiredInd":"Y"
        		                  },
        		                  { 
        		                     "type":"Boolean",
        		                     "data":"pritilinerefBoolean",
        		                     "value":true,
        		                     "systemInd":"Y",
        		                     "requiredInd":"Y"
        		                  }
        		               ],
        		               "notes":[ 
        		                  { 
        		                     "noteType":"aaa",
        		                     "noteText":"bbb note texxte"
        		                  }
        		               ],
        		               "holds":[ 
        		                  { 
        		                     "holdType":"dss",
        		                     "holdStatus":"open",
        		                     "holdReason":"fff"
        		                  }
        		               ]
        		            },
        					{ 
        		               "lineNumber":2,
        		               "status":"OPEN",
        		               "retailerReferenceItemSKU":"aaa",
        		               "lineItemId": "AcuSKU1",
        		               "itemTitle":"AcuSKU1",
        		               "itemDescription":"Computers",
        		               "itemUnitOfMeasure":"EA",
        		               "itemUnitPrice":"10",
        		               "lineItemQty":1,
        		               "originalOrderedQty":1,
        		               "deliveryMethod":"shipToHome",
        		               "fulfillmentType":"ShipToHome",
        		               "fulfillmentSite":"joliet-dc",
        		               "reasonCode":"ABC",
        		               "bundleParent":true,
        		               "presell":false,
        		               "gift":true,
        		               "giftWrap":true,
        		               "shipFromSingleNode":true,
        		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
        		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
        		               "shippingCarrier":"FEDEX",
        		               "carrierServiceType":"FedExGround",
        		               "shipAlone":true,
        		               "shipComplete":true,
        		               "shipToContact":{ 
        		                  "firstName":"XYZ",
        		                  "lastName":"M",
        		                  "address":{ 
        		                     "address1":"3 Smoky Hollow Lane",
        		                     "city":"Deltona",
        		                     "state":"FL",
        		                     "zip5":"32725",
        		                     "country":"US"
        		                  },
        		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
        		                  "primaryPhone":"456-456-4567"
        		               },
        		               "priceInfo":{ 
        		                  "unitPrice":77.99,
        		                  "retailPrice":77.99,
        		                  "listPrice":97.99
        		               },
        		               "lineCharges":[ 
        		                  { 
        		                     "chargeCategory":"SHIPPING",
        		                     "chargeName":"SHIPPING",
        		                     "chargeAmount":6.99,
        		                     "originalChargeAmount":6.99
        		                  },
        		                  { 
        		                     "chargeCategory":"SHIPPING",
        		                     "chargeName":"OVERSIZE_SHIPPING",
        		                     "chargeAmount":16.99,
        		                     "originalChargeAmount":16.99
        		                  }
        		               ],
        		               "lineDiscounts":[ 
        		                  { 
        		                     "discountAmount":2.99,
        		                     "discountName":"ITEM_DISCOUNT",
        		                     "originalDiscountAmount":2.99
        		                  },
        		                  { 
        		                     "discountAmount":2.99,
        		                     "discountName":"ORDER_DISCOUNT",
        		                     "originalDiscountAmount":2.99
        		                  }
        		               ],
        		               "lineTaxes":[ 
        		                  { 
        		                     "taxName":"SALES_TAX",
        		                     "taxAmount":3.45,
        		                     "taxRate":5.75
        		                  },
        		                  { 
        		                     "taxName":"SHIPPING_TAX",
        		                     "taxAmount":3.45,
        		                     "taxRate":5.75
        		                  }
        		               ],
        		               "promos":[ 
        		                  { 
        		                     "promoId":"BUY1GET1Free",
        		                     "promoGroup":"BOGOF",
        		                     "promoType":"SELL"
        		                  },
        		                  { 
        		                     "promoId":"BUY2GET1Free",
        		                     "promoGroup":"B2G1F",
        		                     "promoType":"SELLS"
        		                  }
        		               ],
        		               "messages":[ 
        		                  { 
        		                     "messageType":"GiftMessage",
        		                     "messageText":"Hope You Enjoy This Gift!"
        		                  }
        		               ],
        		               "references":[ 
        		                  { 
        		                     "type":"String",
        		                     "data":"pritilineref",
        		                     "value":"12",
        		                     "systemInd":"N",
        		                     "requiredInd":"Y"
        		                  },
        		                  { 
        		                     "type":"Boolean",
        		                     "data":"pritilinerefBoolean",
        		                     "value":true,
        		                     "systemInd":"Y",
        		                     "requiredInd":"Y"
        		                  }
        		               ],
        		               "notes":[ 
        		                  { 
        		                     "noteType":"aaa",
        		                     "noteText":"bbb note texxte"
        		                  }
        		               ],
        		               "holds":[ 
        		                  { 
        		                     "holdType":"dss",
        		                     "holdStatus":"open",
        		                     "holdReason":"fff"
        		                  }
        		               ]
        		            }
        		         ],
        		         "referenceData":[ 
        		            { 
        		               "type":"String",
        		               "data":"pritirefOrder",
        		               "value":"12"
        		            }
        		         ],
        		         "orderCharges":[ 
        		            { 
        		               "chargeCategory":"050",
        		               "chargeName":"SHIPPING",
        		               "chargeAmount":95.87,
        		               "originalChargeAmount":94.48
        		            }
        		         ],
        		         "orderDiscounts":[ 
        		            { 
        		               "discountName":"50%",
        		               "discountAmount":20,
        		               "originalDiscountAmount":25
        		            }
        		         ],
        		         "orderTaxes":[ 
        		            { 
        		               "taxName":"VAT",
        		               "taxAmount":10,
        		               "taxRate":10
        		            }
        		         ],
        		         "promos":[ 
        		            { 
        		               "promoId":"BUY1GET150%",
        		               "promoGroup":"BOGOF",
        		               "promoType":"priti"
        		            }
        		         ],
        		         "buyerContactInfo":{ 
        		            "firstName":"WENDY",
        		            "lastName":"ZIESEMANN",
        		            "address":{ 
        		               "address1":"24 Green St",
        		               "city":"Hudson",
        		               "state":"MA",
        		               "zip5":"01749",
        		               "country":"US"
        		            },
        		            "primaryEmail":"wendyziesemann01749@thk.com",
        		            "primaryPhone":"(000) 000-0423"
        		         },
        		         "billToContactInfo":{ 
        		            "firstName":"WENDY",
        		            "lastName":"ZIESEMANN",
        		            "address":{ 
        		               "address1":"24 Green St",
        		               "city":"Hudson",
        		               "state":"MA",
        		               "zip5":"01749",
        		               "country":"US"
        		            },
        		            "primaryEmail":"wendyziesemann01749@thk.com",
        		            "primaryPhone":"(000) 000-0423"
        		         },
        		         "shipToContacts":[ 
        		            { 
        		               "firstName":"WENDY",
        		               "lastName":"ZIESEMANN",
        		               "address":{ 
        		                  "address1":"24 Green St",
        		                  "city":"Hudson",
        		                  "state":"MA",
        		                  "zip5":"01749",
        		                  "country":"US"
        		               },
        		               "primaryEmail":"wendyziesemann01749@thk.com",
        		               "primaryPhone":"(000) 000-0423"
        		            }
        		         ],
        		         "holds":[ 
        		            { 
        		               "holdType":"dss",
        		               "holdStatus":"open",
        		               "holdReason":"fff"
        		            }
        		         ],
        		         "timeDateReferences":[ 
        		            { 
        		               "timeDateType":"eee",
        		               "strDateValue":"2019-04-03T11:30:15-08:00"
        		            }
        		         ],
        		         "messages":[ 
        		            { 
        		               "messageType":"GiftMessage",
        		               "messageText":"Hope You Enjoy This Gift!"
        		            }
        		         ],
        		         "notes":[ 
        		            { 
        		               "noteType":"PACKING_INSTRUCTIONS",
        		               "noteText":"Test"
        		            }
        		         ],
        		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
        		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
        		         "shippingCarrier":"FEDEX",
        		         "carrierServiceType":"FedExGround",
        		         "paymentTerms":"payterm",
        		         "orderLookUpKey":"22226",
        		         "shipFromSingleNode":true,
        		         "taxExempt":true,
        		         "taxExemptCertificate":"CERT",
        		         "taxPayerId":"123456",
        		         "orderSessionId":"session123"
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
    		expect(response.statusCode).toBe(200);
    		expect(response.body.orders[0].orderNumber).toContain(order+2);
    		done();

            });
        }),
        
        
        
        
    it("TC - 03 -> Item quantity with negative value", done =>{

        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            

           body: {
        	   "orders":[
        		      {
        		         "orderDate":"2018-03-05T11:24:15-08:00",
        		         "orderNumber":order+3,
        		         "channel":"B2B",
        		         "orderOrganization":"TheHonestKitchen-Organization-",
        		         "orderTransactionType":"Sales",
        		         "lineItems":[
        		            {
        		               "lineNumber":1,
        		               "status":"OPEN",
        		               "lineItemId": "AcuSKU1",
        		               "lineItemQty":-5,
        		               "originalOrderedQty":5,
        		               "shipToContact":{
        		                  "firstName":"Priti",
        		                  "lastName":"Testing",
        		                  "address":{
        		                     "address1":"1296 Regency",
        		                     "city":"Eugene",
        		                     "state":"OR",
        		                     "zip5":"97401",
        		                     "country":"US"
        		                  },
        		                  "primaryEmail":"priti@gmail.com",
        		                  "primaryPhone":"(000) 000-0429"
        		               },
        		               "priceInfo":{
        		                  "unitPrice":77.99,
        		                  "retailPrice":77.99,
        		                  "listPrice":97.99
        		               }
        		            }
        		         ],
        		         "buyerContactInfo":{
        		            "firstName":"John",
        		            "lastName":"Scott",
        		            "primaryEmail":"jscott@enspirecommerce.com",
        		            "primaryPhone":"416-234-1234",
        		            "address":{
        		               "address1":"123 test address",
        		               "city":"Carmel",
        		               "state":"IN",
        		               "zip5":"46032",
        		               "country":"US"
        		            }
        		         },
        		         "billToContactInfo":{
        		            "firstName":"Mike",
        		            "lastName":"Scott",
        		            "primaryEmail":"mscott@enspirecommerce.com",
        		            "primaryPhone":"546-345-6456",
        		            "address":{
        		               "address1":"456 Meridian blvd",
        		               "city":"Fishers",
        		               "state":"IN",
        		               "zip5":"46037",
        		               "country":"US"
        		            }
        		         }
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
    		expect(response.statusCode).toBe(400);
    		expect(response.body.developerMessage).toContain("lineItemQty: must be greater than or equal to 0");
    		done();

            });
        }),
        
        
        
        
        it("TC - 04 -> Create order whose shipping address not present in system", done =>{

            var options = {
                method: 'POST',
                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                

               body: {
            	   "orders":[
            		      {
            		         "orderDate":"2018-03-05T11:24:15-08:00",
            		         "orderNumber":order+4,
            		         "status":"OPEN",
            		         "channel":"B2B",
            		         "orderOrganization":"TheHonestKitchen-Organization-",
            		         "orderTransactionType":"Sales",
            		         "lineItems":[
            		            {
            		               "lineNumber":1,
            		               "status":"OPEN",
            		               "lineItemId": "AcuSKU1",
            		               "lineItemQty":5,
            		               "originalOrderedQty":5,
            		               "shipToContact":{
            		                  "firstName":"Priti",
            		                  "lastName":"Testing",
            		                  "address":{
            		                     "address1":order+4+" Regency",
            		                     "city":"Eugene",
            		                     "state":"OR",
            		                     "zip5":"97401",
            		                     "country":"US"
            		                  },
            		                  "primaryEmail":"priti@gmail.com",
            		                  "primaryPhone":"(000) 000-0429"
            		               },
            		               "priceInfo":{
            		                  "unitPrice":77.99,
            		                  "retailPrice":77.99,
            		                  "listPrice":97.99
            		               }
            		            }
            		         ],
            		         "buyerContactInfo":{
            		            "firstName":"John",
            		            "lastName":"Scott",
            		            "primaryEmail":"jscott@enspirecommerce.com",
            		            "primaryPhone":"416-234-1234",
            		            "address":{
            		               "address1":"123 test address",
            		               "city":"Carmel",
            		               "state":"IN",
            		               "zip5":"46032",
            		               "country":"US"
            		            }
            		         },
            		         "billToContactInfo":{
            		            "firstName":"Mike",
            		            "lastName":"Scott",
            		            "primaryEmail":"mscott@enspirecommerce.com",
            		            "primaryPhone":"546-345-6456",
            		            "address":{
            		               "address1":"456 Meridian blvd",
            		               "city":"Fishers",
            		               "state":"IN",
            		               "zip5":"46037",
            		               "country":"US"
            		            }
            		         }
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
        		expect(response.statusCode).toBe(200);
        		expect(response.body.orders[0].orderNumber).toContain(order+4);
        		done();

                });
            }),
            
            
            
            
            it("TC - 05 -> Without line number", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+5,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("lineNumber: may not be null");
            		done();

                    });
            }),
            
            
            
            
            it("TC - 06 -> Negative line number", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+6,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":-1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("lineNumber: must be greater than 0");
            		done();

                    });
            }),
            
            
            
            
            it("TC - 07 -> SKU not present in system", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber": order+7,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"Nonavailable",
                		               "lineItemId":"Nonavailable",
                		               "itemTitle":"Nonavailable",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(200);
            		expect(response.body.orders[0].orderNumber).toContain(order+7);
            		expect(response.body.orders[0].status).toContain("FAILED_TO_VALIDATE");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 08 -> Without orderdate", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderNumber":order+8,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("orderDate: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 09 -> Without order number", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("orderNumber: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 10 -> Ordernumber as NULL (Blank)", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":"",
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("orderNumber: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 11 -> Without channel", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+11,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId":"B4",
                		               "itemTitle":"B4",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("channel: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 12 -> Channel not exist in system", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+12,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2Bs",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(404);
            		expect(response.body.message).toContain("Channel B2Bs not found");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 13 -> Without Order Organization", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+13,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("orderOrganization: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 14 -> Order Organization not exist in system", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+14,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-s",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(404);
            		expect(response.body.message).toContain("Organization TheHonestKitchen-Organization-s not found");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 15 -> Without Order Transaction Type", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+15,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("orderTransactionType: Order Transaction Type cannot be blank");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 16 -> Invalid Order Transaction Type", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+16,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Saless",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.message).toContain("Order Transaction Type Saless is invalid");
            		done();

                    });
            }),
            
            
            
            
            
            
            it("TC - 17 -> Without line items", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+17,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "status":"Open",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "orderPayments":[
                		            {
                		               "status":"authorized",
                		               "nameOnCard":"psp",
                		               "totalAuthorizedAmount":224.67,
                		               "totalChargedAmount":91.42,
                		               "transactionDate":"2018-03-05T11:25:15-08:00",
                		               "currency":"USD",
                		               "pnRef":"1234",
                		               "paymentType":"CREDIT_CARD",
                		               "cardType":"MASTERCARD",
                		               "cardToken":"34355656878879899",
                		               "expirationYear":"22",
                		               "expirationMonth":"10",
                		               "chargeSequence":"",
                		               "orderPaymentTransactions":[
                		                  {
                		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                		                     "transactionType":"AUTHONLY",
                		                     "firstName":"",
                		                     "lastName":"",
                		                     "nameOnCard":"",
                		                     "transactionActualAmount":91.42,
                		                     "transactionAttemptedAmount":70.98,
                		                     "authorizedAmount":23.98,
                		                     "approvalCode":"567678",
                		                     "pnRef":"1234",
                		                     "cardIssuerTrxId":"2424325435456",
                		                     "cvvResultMessage":"success",
                		                     "cvvResultCode":"01",
                		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                		                  }
                		               ]
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("lineItems: may not be null");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 18 -> Without Order status", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+18,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "status":"OPEN",
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.message).toContain("status is invalid for insertion its not DRAFT/OPEN");
            		done();

                    });
            }),
            
            
            
            
            
            it("TC - 19 -> Without Line status", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
                		      {
                		         "priority":"1",
                		         "orderDate":"2019-04-05T13:24:15-08:00",
                		         "orderNumber":order+19,
                		         "orderType":"salesOrder",
                		         "purchaseOrderNumber":"PUR-701",
                		         "channel":"B2B",
                		         "orderOrganization":"TheHonestKitchen-Organization-",
                		         "orderTransactionType":"Sales",
                		         "enteredBy":"priti",
                		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                		         "lineItems":[
                		            {
                		               "lineNumber":1,
                		               "retailerReferenceItemSKU":"aaa",
                		               "lineItemId": "AcuSKU1",
                		               "itemTitle":"AcuSKU1",
                		               "itemDescription":"Computers",
                		               "itemUnitOfMeasure":"EA",
                		               "itemUnitPrice":"20",
                		               "lineItemQty":2,
                		               "originalOrderedQty":2,
                		               "deliveryMethod":"shipToHome",
                		               "fulfillmentType":"ShipToHome",
                		               "fulfillmentSite":"joliet-dc",
                		               "reasonCode":"ABC",
                		               "bundleParent":true,
                		               "presell":true,
                		               "gift":true,
                		               "giftWrap":true,
                		               "shipFromSingleNode":true,
                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		               "shippingCarrier":"FEDEX",
                		               "carrierServiceType":"FedExGround",
                		               "shipAlone":true,
                		               "shipComplete":true,
                		               "shipToContact":{
                		                  "firstName":"WENDY",
                		                  "lastName":"ZIESEMANN",
                		                  "address":{
                		                     "address1":"24 Green St",
                		                     "city":"Hudson",
                		                     "state":"MA",
                		                     "zip5":"01749",
                		                     "country":"US"
                		                  },
                		                  "primaryEmail":"wendyziesemann01749@thk.com",
                		                  "primaryPhone":"(000) 000-0423"
                		               },
                		               "priceInfo":{
                		                  "unitPrice":20,
                		                  "retailPrice":20,
                		                  "listPrice":20
                		               },
                		               "lineCharges":[
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"SHIPPING",
                		                     "chargeAmount":10,
                		                     "originalChargeAmount":10
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"OVERSIZE_SHIPPING",
                		                     "chargeAmount":20,
                		                     "originalChargeAmount":20
                		                  },
                		                  {
                		                     "chargeCategory":"SHIPPING",
                		                     "chargeName":"HANDLING",
                		                     "chargeAmount":5,
                		                     "originalChargeAmount":5
                		                  }
                		               ],
                		               "lineDiscounts":[
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ITEM_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  },
                		                  {
                		                     "discountAmount":3,
                		                     "discountName":"ORDER_DISCOUNT",
                		                     "originalDiscountAmount":3
                		                  }
                		               ],
                		               "lineTaxes":[
                		                  {
                		                     "taxName":"SALES_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  },
                		                  {
                		                     "taxName":"SHIPPING_TAX",
                		                     "taxAmount":2,
                		                     "taxRate":5.75
                		                  }
                		               ],
                		               "promos":[
                		                  {
                		                     "promoId":"BUY1GET1Free",
                		                     "promoGroup":"BOGOF",
                		                     "promoType":"SELL"
                		                  },
                		                  {
                		                     "promoId":"BUY2GET1Free",
                		                     "promoGroup":"B2G1F",
                		                     "promoType":"SELLS"
                		                  }
                		               ],
                		               "messages":[
                		                  {
                		                     "messageType":"GiftMessage",
                		                     "messageText":"Hope You Enjoy This Gift!"
                		                  }
                		               ],
                		               "references":[
                		                  {
                		                     "type":"String",
                		                     "data":"pritilineref",
                		                     "value":"12",
                		                     "systemInd":"N",
                		                     "requiredInd":"Y"
                		                  },
                		                  {
                		                     "type":"Boolean",
                		                     "data":"pritilinerefBoolean",
                		                     "value":true,
                		                     "systemInd":"Y",
                		                     "requiredInd":"Y"
                		                  }
                		               ],
                		               "notes":[
                		                  {
                		                     "noteType":"aaa",
                		                     "noteText":"bbb note texxte"
                		                  }
                		               ],
                		               "holds":[
                		                  {
                		                     "holdType":"dss",
                		                     "holdStatus":"open",
                		                     "holdReason":"fff"
                		                  }
                		               ]
                		            }
                		         ],
                		         "referenceData":[
                		            {
                		               "type":"String",
                		               "data":"pritirefOrder",
                		               "value":"12"
                		            }
                		         ],
                		         "orderCharges":[
                		            {
                		               "chargeCategory":"050",
                		               "chargeName":"Freight",
                		               "chargeAmount":20,
                		               "originalChargeAmount":20
                		            }
                		         ],
                		         "orderDiscounts":[
                		            {
                		               "discountName":"50%",
                		               "discountAmount":10,
                		               "originalDiscountAmount":5
                		            }
                		         ],
                		         "orderTaxes":[
                		            {
                		               "taxName":"VAT",
                		               "taxAmount":5,
                		               "taxRate":5
                		            }
                		         ],
                		         "promos":[
                		            {
                		               "promoId":"BUY1GET150%",
                		               "promoGroup":"BOGOF",
                		               "promoType":"priti"
                		            }
                		         ],
                		         "buyerContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "billToContactInfo":{
                		            "firstName":"WENDY",
                		            "lastName":"ZIESEMANN",
                		            "address":{
                		               "address1":"24 Green St",
                		               "city":"Hudson",
                		               "state":"MA",
                		               "zip5":"01749",
                		               "country":"US"
                		            },
                		            "primaryEmail":"wendyziesemann01749@thk.com",
                		            "primaryPhone":"(000) 000-0423"
                		         },
                		         "shipToContacts":[
                		            {
                		               "firstName":"WENDY",
                		               "lastName":"ZIESEMANN",
                		               "address":{
                		                  "address1":"24 Green St",
                		                  "city":"Hudson",
                		                  "state":"MA",
                		                  "zip5":"01749",
                		                  "country":"US"
                		               },
                		               "primaryEmail":"wendyziesemann01749@thk.com",
                		               "primaryPhone":"(000) 000-0423"
                		            }
                		         ],
                		         "holds":[
                		            {
                		               "holdType":"dss",
                		               "holdStatus":"open",
                		               "holdReason":"fff"
                		            }
                		         ],
                		         "timeDateReferences":[
                		            {
                		               "timeDateType":"eee",
                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                		            }
                		         ],
                		         "messages":[
                		            {
                		               "messageType":"GiftMessage",
                		               "messageText":"Hope You Enjoy This Gift!"
                		            }
                		         ],
                		         "notes":[
                		            {
                		               "noteType":"aaa",
                		               "noteText":"bbb"
                		            }
                		         ],
                		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                		         "shippingCarrier":"FEDEX",
                		         "carrierServiceType":"FedExGround",
                		         "paymentTerms":"payterm",
                		         "orderLookUpKey":"22226",
                		         "shipFromSingleNode":true,
                		         "taxExempt":true,
                		         "taxExemptCertificate":"CERT",
                		         "taxPayerId":"123456",
                		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("lineItems[0].status: may not be empty");
            		done();

                    });
            }),
            
            
            
            
            it("TC - 20 -> Different number in lineitemqty and originalOrderqty", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders":[
             		      {
             		         "orderDate":"2018-03-05T11:24:15-08:00",
             		         "orderNumber":order+20,
             		         "status":"OPEN",
             		         "channel":"B2B",
             		         "orderOrganization":"TheHonestKitchen-Organization-",
             		         "orderTransactionType":"Sales",
             		         "lineItems":[
             		            {
             		               "lineNumber":1,
             		               "status":"OPEN",
             		               "lineItemId": "AcuSKU1",
             		               "lineItemQty":3,
             		               "originalOrderedQty":5,
             		               "shipToContact":{
             		                  "firstName":"Priti",
             		                  "lastName":"Testing",
             		                  "address":{
             		                     "address1":"1296 Regency",
             		                     "city":"Eugene",
             		                     "state":"OR",
             		                     "zip5":"97401",
             		                     "country":"US"
             		                  },
             		                  "primaryEmail":"priti@gmail.com",
             		                  "primaryPhone":"(000) 000-0429"
             		               },
             		               "priceInfo":{
             		                  "unitPrice":77.99,
             		                  "retailPrice":77.99,
             		                  "listPrice":97.99
             		               }
             		            }
             		         ],
             		         "buyerContactInfo":{
             		            "firstName":"John",
             		            "lastName":"Scott",
             		            "primaryEmail":"jscott@enspirecommerce.com",
             		            "primaryPhone":"416-234-1234",
             		            "address":{
             		               "address1":"123 test address",
             		               "city":"Carmel",
             		               "state":"IN",
             		               "zip5":"46032",
             		               "country":"US"
             		            }
             		         },
             		         "billToContactInfo":{
             		            "firstName":"Mike",
             		            "lastName":"Scott",
             		            "primaryEmail":"mscott@enspirecommerce.com",
             		            "primaryPhone":"546-345-6456",
             		            "address":{
             		               "address1":"456 Meridian blvd",
             		               "city":"Fishers",
             		               "state":"IN",
             		               "zip5":"46037",
             		               "country":"US"
             		            }
             		         }
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
         		expect(response.statusCode).toBe(200);
         		expect(response.body.orders[0].orderNumber).toContain(order+20);
         		done();

                 });
             }),
                
    
             
             
             
             it("TC - 21 -> Without shiptoContact", done =>{

                 var options = {
                     method: 'POST',
                     url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+token
                     },
                     

                    body: {
                    	   "orders":[
                    		      {
                    		         "priority":"1",
                    		         "orderDate":"2019-04-05T13:24:15-08:00",
                    		         "orderNumber":order+21,
                    		         "orderType":"salesOrder",
                    		         "purchaseOrderNumber":"PUR-701",
                    		         "channel":"B2B",
                    		         "status":"Open",
                    		         "orderOrganization":"TheHonestKitchen-Organization-",
                    		         "orderTransactionType":"Sales",
                    		         "enteredBy":"priti",
                    		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                    		         "lineItems":[
                    		            {
                    		               "lineNumber":1,
                    		               "status":"OPEN",
                    		               "retailerReferenceItemSKU":"aaa",
                    		               "lineItemId": "AcuSKU1",
                    		               "itemTitle":"AcuSKU1",
                    		               "itemDescription":"Computers",
                    		               "itemUnitOfMeasure":"EA",
                    		               "itemUnitPrice":"20",
                    		               "lineItemQty":2,
                    		               "originalOrderedQty":2,
                    		               "deliveryMethod":"shipToHome",
                    		               "fulfillmentType":"ShipToHome",
                    		               "fulfillmentSite":"joliet-dc",
                    		               "reasonCode":"ABC",
                    		               "bundleParent":true,
                    		               "presell":true,
                    		               "gift":true,
                    		               "giftWrap":true,
                    		               "shipFromSingleNode":true,
                    		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                    		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		               "shippingCarrier":"FEDEX",
                    		               "carrierServiceType":"FedExGround",
                    		               "shipAlone":true,
                    		               "shipComplete":true,
                    		               "priceInfo":{
                    		                  "unitPrice":20,
                    		                  "retailPrice":20,
                    		                  "listPrice":20
                    		               },
                    		               "lineCharges":[
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"SHIPPING",
                    		                     "chargeAmount":10,
                    		                     "originalChargeAmount":10
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"OVERSIZE_SHIPPING",
                    		                     "chargeAmount":20,
                    		                     "originalChargeAmount":20
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"HANDLING",
                    		                     "chargeAmount":5,
                    		                     "originalChargeAmount":5
                    		                  }
                    		               ],
                    		               "lineDiscounts":[
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ITEM_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  },
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ORDER_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  }
                    		               ],
                    		               "lineTaxes":[
                    		                  {
                    		                     "taxName":"SALES_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  },
                    		                  {
                    		                     "taxName":"SHIPPING_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  }
                    		               ],
                    		               "promos":[
                    		                  {
                    		                     "promoId":"BUY1GET1Free",
                    		                     "promoGroup":"BOGOF",
                    		                     "promoType":"SELL"
                    		                  },
                    		                  {
                    		                     "promoId":"BUY2GET1Free",
                    		                     "promoGroup":"B2G1F",
                    		                     "promoType":"SELLS"
                    		                  }
                    		               ],
                    		               "messages":[
                    		                  {
                    		                     "messageType":"GiftMessage",
                    		                     "messageText":"Hope You Enjoy This Gift!"
                    		                  }
                    		               ],
                    		               "references":[
                    		                  {
                    		                     "type":"String",
                    		                     "data":"pritilineref",
                    		                     "value":"12",
                    		                     "systemInd":"N",
                    		                     "requiredInd":"Y"
                    		                  },
                    		                  {
                    		                     "type":"Boolean",
                    		                     "data":"pritilinerefBoolean",
                    		                     "value":true,
                    		                     "systemInd":"Y",
                    		                     "requiredInd":"Y"
                    		                  }
                    		               ],
                    		               "notes":[
                    		                  {
                    		                     "noteType":"aaa",
                    		                     "noteText":"bbb note texxte"
                    		                  }
                    		               ],
                    		               "holds":[
                    		                  {
                    		                     "holdType":"dss",
                    		                     "holdStatus":"open",
                    		                     "holdReason":"fff"
                    		                  }
                    		               ]
                    		            }
                    		         ],
                    		         "referenceData":[
                    		            {
                    		               "type":"String",
                    		               "data":"pritirefOrder",
                    		               "value":"12"
                    		            }
                    		         ],
                    		         "orderCharges":[
                    		            {
                    		               "chargeCategory":"050",
                    		               "chargeName":"Freight",
                    		               "chargeAmount":20,
                    		               "originalChargeAmount":20
                    		            }
                    		         ],
                    		         "orderDiscounts":[
                    		            {
                    		               "discountName":"50%",
                    		               "discountAmount":10,
                    		               "originalDiscountAmount":5
                    		            }
                    		         ],
                    		         "orderTaxes":[
                    		            {
                    		               "taxName":"VAT",
                    		               "taxAmount":5,
                    		               "taxRate":5
                    		            }
                    		         ],
                    		         "promos":[
                    		            {
                    		               "promoId":"BUY1GET150%",
                    		               "promoGroup":"BOGOF",
                    		               "promoType":"priti"
                    		            }
                    		         ],
                    		         "buyerContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "billToContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "shipToContacts":[
                    		            {
                    		               "firstName":"WENDY",
                    		               "lastName":"ZIESEMANN",
                    		               "address":{
                    		                  "address1":"24 Green St",
                    		                  "city":"Hudson",
                    		                  "state":"MA",
                    		                  "zip5":"01749",
                    		                  "country":"US"
                    		               },
                    		               "primaryEmail":"wendyziesemann01749@thk.com",
                    		               "primaryPhone":"(000) 000-0423"
                    		            }
                    		         ],
                    		         "holds":[
                    		            {
                    		               "holdType":"dss",
                    		               "holdStatus":"open",
                    		               "holdReason":"fff"
                    		            }
                    		         ],
                    		         "timeDateReferences":[
                    		            {
                    		               "timeDateType":"eee",
                    		               "strDateValue":"2019-04-03T11:30:15-08:00"
                    		            }
                    		         ],
                    		         "messages":[
                    		            {
                    		               "messageType":"GiftMessage",
                    		               "messageText":"Hope You Enjoy This Gift!"
                    		            }
                    		         ],
                    		         "notes":[
                    		            {
                    		               "noteType":"aaa",
                    		               "noteText":"bbb"
                    		            }
                    		         ],
                    		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                    		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		         "shippingCarrier":"FEDEX",
                    		         "carrierServiceType":"FedExGround",
                    		         "paymentTerms":"payterm",
                    		         "orderLookUpKey":"22226",
                    		         "shipFromSingleNode":true,
                    		         "taxExempt":true,
                    		         "taxExemptCertificate":"CERT",
                    		         "taxPayerId":"123456",
                    		         "orderSessionId":"session123"
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
          		expect(response.statusCode).toBe(200);
          		expect(response.body.orders[0].orderNumber).toContain(order+21);
          		expect(response.body.orders[0].status).toContain("FAILED_TO_VALIDATE");
          		done();

                  });
              }),
              
              
              
              
              
              it("TC - 22 -> Without price info", done =>{

                  var options = {
                      method: 'POST',
                      url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token
                      },
                      

                     body: {
                    	   "orders":[
                    		      {
                    		         "priority":"1",
                    		         "orderDate":"2019-04-05T13:24:15-08:00",
                    		         "orderNumber":order+23,
                    		         "orderType":"salesOrder",
                    		         "purchaseOrderNumber":"PUR-701",
                    		         "channel":"B2B",
                    		         "status":"Open",
                    		         "orderOrganization":"TheHonestKitchen-Organization-",
                    		         "orderTransactionType":"Sales",
                    		         "enteredBy":"priti",
                    		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                    		         "lineItems":[
                    		            {
                    		               "lineNumber":1,
                    		               "status":"OPEN",
                    		               "retailerReferenceItemSKU":"aaa",
                    		               "lineItemId": "AcuSKU1",
                    		               "itemTitle":"AcuSKU1",
                    		               "itemDescription":"Computers",
                    		               "itemUnitOfMeasure":"EA",
                    		               "itemUnitPrice":"20",
                    		               "lineItemQty":2,
                    		               "originalOrderedQty":2,
                    		               "deliveryMethod":"shipToHome",
                    		               "fulfillmentType":"ShipToHome",
                    		               "fulfillmentSite":"joliet-dc",
                    		               "reasonCode":"ABC",
                    		               "bundleParent":true,
                    		               "presell":true,
                    		               "gift":true,
                    		               "giftWrap":true,
                    		               "shipFromSingleNode":true,
                    		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                    		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		               "shippingCarrier":"FEDEX",
                    		               "carrierServiceType":"FedExGround",
                    		               "shipAlone":true,
                    		               "shipComplete":true,
                    		               "shipToContact":{
                    		                  "firstName":"WENDY",
                    		                  "lastName":"ZIESEMANN",
                    		                  "address":{
                    		                     "address1":"24 Green St",
                    		                     "city":"Hudson",
                    		                     "state":"MA",
                    		                     "zip5":"01749",
                    		                     "country":"US"
                    		                  },
                    		                  "primaryEmail":"wendyziesemann01749@thk.com",
                    		                  "primaryPhone":"(000) 000-0423"
                    		               },
                    		               "lineCharges":[
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"SHIPPING",
                    		                     "chargeAmount":10,
                    		                     "originalChargeAmount":10
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"OVERSIZE_SHIPPING",
                    		                     "chargeAmount":20,
                    		                     "originalChargeAmount":20
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"HANDLING",
                    		                     "chargeAmount":5,
                    		                     "originalChargeAmount":5
                    		                  }
                    		               ],
                    		               "lineDiscounts":[
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ITEM_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  },
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ORDER_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  }
                    		               ],
                    		               "lineTaxes":[
                    		                  {
                    		                     "taxName":"SALES_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  },
                    		                  {
                    		                     "taxName":"SHIPPING_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  }
                    		               ],
                    		               "promos":[
                    		                  {
                    		                     "promoId":"BUY1GET1Free",
                    		                     "promoGroup":"BOGOF",
                    		                     "promoType":"SELL"
                    		                  },
                    		                  {
                    		                     "promoId":"BUY2GET1Free",
                    		                     "promoGroup":"B2G1F",
                    		                     "promoType":"SELLS"
                    		                  }
                    		               ],
                    		               "messages":[
                    		                  {
                    		                     "messageType":"GiftMessage",
                    		                     "messageText":"Hope You Enjoy This Gift!"
                    		                  }
                    		               ],
                    		               "references":[
                    		                  {
                    		                     "type":"String",
                    		                     "data":"pritilineref",
                    		                     "value":"12",
                    		                     "systemInd":"N",
                    		                     "requiredInd":"Y"
                    		                  },
                    		                  {
                    		                     "type":"Boolean",
                    		                     "data":"pritilinerefBoolean",
                    		                     "value":true,
                    		                     "systemInd":"Y",
                    		                     "requiredInd":"Y"
                    		                  }
                    		               ],
                    		               "notes":[
                    		                  {
                    		                     "noteType":"aaa",
                    		                     "noteText":"bbb note texxte"
                    		                  }
                    		               ],
                    		               "holds":[
                    		                  {
                    		                     "holdType":"dss",
                    		                     "holdStatus":"open",
                    		                     "holdReason":"fff"
                    		                  }
                    		               ]
                    		            }
                    		         ],
                    		         "referenceData":[
                    		            {
                    		               "type":"String",
                    		               "data":"pritirefOrder",
                    		               "value":"12"
                    		            }
                    		         ],
                    		         "orderCharges":[
                    		            {
                    		               "chargeCategory":"050",
                    		               "chargeName":"Freight",
                    		               "chargeAmount":20,
                    		               "originalChargeAmount":20
                    		            }
                    		         ],
                    		         "orderDiscounts":[
                    		            {
                    		               "discountName":"50%",
                    		               "discountAmount":10,
                    		               "originalDiscountAmount":5
                    		            }
                    		         ],
                    		         "orderTaxes":[
                    		            {
                    		               "taxName":"VAT",
                    		               "taxAmount":5,
                    		               "taxRate":5
                    		            }
                    		         ],
                    		         "promos":[
                    		            {
                    		               "promoId":"BUY1GET150%",
                    		               "promoGroup":"BOGOF",
                    		               "promoType":"priti"
                    		            }
                    		         ],
                    		         "buyerContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "billToContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "shipToContacts":[
                    		            {
                    		               "firstName":"WENDY",
                    		               "lastName":"ZIESEMANN",
                    		               "address":{
                    		                  "address1":"24 Green St",
                    		                  "city":"Hudson",
                    		                  "state":"MA",
                    		                  "zip5":"01749",
                    		                  "country":"US"
                    		               },
                    		               "primaryEmail":"wendyziesemann01749@thk.com",
                    		               "primaryPhone":"(000) 000-0423"
                    		            }
                    		         ],
                    		         "holds":[
                    		            {
                    		               "holdType":"dss",
                    		               "holdStatus":"open",
                    		               "holdReason":"fff"
                    		            }
                    		         ],
                    		         "timeDateReferences":[
                    		            {
                    		               "timeDateType":"eee",
                    		               "strDateValue":"2019-04-03T11:30:15-08:00"
                    		            }
                    		         ],
                    		         "messages":[
                    		            {
                    		               "messageType":"GiftMessage",
                    		               "messageText":"Hope You Enjoy This Gift!"
                    		            }
                    		         ],
                    		         "notes":[
                    		            {
                    		               "noteType":"aaa",
                    		               "noteText":"bbb"
                    		            }
                    		         ],
                    		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                    		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		         "shippingCarrier":"FEDEX",
                    		         "carrierServiceType":"FedExGround",
                    		         "paymentTerms":"payterm",
                    		         "orderLookUpKey":"22226",
                    		         "shipFromSingleNode":true,
                    		         "taxExempt":true,
                    		         "taxExemptCertificate":"CERT",
                    		         "taxPayerId":"123456",
                    		         "orderSessionId":"session123"
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
           		expect(response.statusCode).toBe(400);
           		expect(response.body.message).toContain("PriceInfo field can not be null");
           		done();

                   });
               }),
               
               
               
               
               
               it("TC - 23 -> Unit price in negative number", done =>{

                   var options = {
                       method: 'POST',
                       url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
                       },
                       

                      body: {
                    	   "orders":[
                    		      {
                    		         "priority":"1",
                    		         "orderDate":"2019-04-05T13:24:15-08:00",
                    		         "orderNumber":order+23,
                    		         "orderType":"salesOrder",
                    		         "purchaseOrderNumber":"PUR-701",
                    		         "channel":"B2B",
                    		         "status":"Open",
                    		         "orderOrganization":"TheHonestKitchen-Organization-",
                    		         "orderTransactionType":"Sales",
                    		         "enteredBy":"priti",
                    		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                    		         "lineItems":[
                    		            {
                    		               "lineNumber":1,
                    		               "status":"OPEN",
                    		               "retailerReferenceItemSKU":"aaa",
                    		               "lineItemId": "AcuSKU1",
                    		               "itemTitle":"AcuSKU1",
                    		               "itemDescription":"Computers",
                    		               "itemUnitOfMeasure":"EA",
                    		               "itemUnitPrice":"-20",
                    		               "lineItemQty":2,
                    		               "originalOrderedQty":2,
                    		               "deliveryMethod":"shipToHome",
                    		               "fulfillmentType":"ShipToHome",
                    		               "fulfillmentSite":"joliet-dc",
                    		               "reasonCode":"ABC",
                    		               "bundleParent":true,
                    		               "presell":true,
                    		               "gift":true,
                    		               "giftWrap":true,
                    		               "shipFromSingleNode":true,
                    		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                    		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		               "shippingCarrier":"FEDEX",
                    		               "carrierServiceType":"FedExGround",
                    		               "shipAlone":true,
                    		               "shipComplete":true,
                    		               "shipToContact":{
                    		                  "firstName":"WENDY",
                    		                  "lastName":"ZIESEMANN",
                    		                  "address":{
                    		                     "address1":"24 Green St",
                    		                     "city":"Hudson",
                    		                     "state":"MA",
                    		                     "zip5":"01749",
                    		                     "country":"US"
                    		                  },
                    		                  "primaryEmail":"wendyziesemann01749@thk.com",
                    		                  "primaryPhone":"(000) 000-0423"
                    		               },
                    		               "priceInfo":{
                    		                  "unitPrice":20,
                    		                  "retailPrice":20,
                    		                  "listPrice":20
                    		               },
                    		               "lineCharges":[
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"SHIPPING",
                    		                     "chargeAmount":10,
                    		                     "originalChargeAmount":10
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"OVERSIZE_SHIPPING",
                    		                     "chargeAmount":20,
                    		                     "originalChargeAmount":20
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"HANDLING",
                    		                     "chargeAmount":5,
                    		                     "originalChargeAmount":5
                    		                  }
                    		               ],
                    		               "lineDiscounts":[
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ITEM_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  },
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ORDER_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  }
                    		               ],
                    		               "lineTaxes":[
                    		                  {
                    		                     "taxName":"SALES_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  },
                    		                  {
                    		                     "taxName":"SHIPPING_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  }
                    		               ],
                    		               "promos":[
                    		                  {
                    		                     "promoId":"BUY1GET1Free",
                    		                     "promoGroup":"BOGOF",
                    		                     "promoType":"SELL"
                    		                  },
                    		                  {
                    		                     "promoId":"BUY2GET1Free",
                    		                     "promoGroup":"B2G1F",
                    		                     "promoType":"SELLS"
                    		                  }
                    		               ],
                    		               "messages":[
                    		                  {
                    		                     "messageType":"GiftMessage",
                    		                     "messageText":"Hope You Enjoy This Gift!"
                    		                  }
                    		               ],
                    		               "references":[
                    		                  {
                    		                     "type":"String",
                    		                     "data":"pritilineref",
                    		                     "value":"12",
                    		                     "systemInd":"N",
                    		                     "requiredInd":"Y"
                    		                  },
                    		                  {
                    		                     "type":"Boolean",
                    		                     "data":"pritilinerefBoolean",
                    		                     "value":true,
                    		                     "systemInd":"Y",
                    		                     "requiredInd":"Y"
                    		                  }
                    		               ],
                    		               "notes":[
                    		                  {
                    		                     "noteType":"aaa",
                    		                     "noteText":"bbb note texxte"
                    		                  }
                    		               ],
                    		               "holds":[
                    		                  {
                    		                     "holdType":"dss",
                    		                     "holdStatus":"open",
                    		                     "holdReason":"fff"
                    		                  }
                    		               ]
                    		            }
                    		         ],
                    		         "referenceData":[
                    		            {
                    		               "type":"String",
                    		               "data":"pritirefOrder",
                    		               "value":"12"
                    		            }
                    		         ],
                    		         "orderCharges":[
                    		            {
                    		               "chargeCategory":"050",
                    		               "chargeName":"Freight",
                    		               "chargeAmount":20,
                    		               "originalChargeAmount":20
                    		            }
                    		         ],
                    		         "orderDiscounts":[
                    		            {
                    		               "discountName":"50%",
                    		               "discountAmount":10,
                    		               "originalDiscountAmount":5
                    		            }
                    		         ],
                    		         "orderTaxes":[
                    		            {
                    		               "taxName":"VAT",
                    		               "taxAmount":5,
                    		               "taxRate":5
                    		            }
                    		         ],
                    		         "promos":[
                    		            {
                    		               "promoId":"BUY1GET150%",
                    		               "promoGroup":"BOGOF",
                    		               "promoType":"priti"
                    		            }
                    		         ],
                    		         "buyerContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "billToContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "shipToContacts":[
                    		            {
                    		               "firstName":"WENDY",
                    		               "lastName":"ZIESEMANN",
                    		               "address":{
                    		                  "address1":"24 Green St",
                    		                  "city":"Hudson",
                    		                  "state":"MA",
                    		                  "zip5":"01749",
                    		                  "country":"US"
                    		               },
                    		               "primaryEmail":"wendyziesemann01749@thk.com",
                    		               "primaryPhone":"(000) 000-0423"
                    		            }
                    		         ],
                    		         "holds":[
                    		            {
                    		               "holdType":"dss",
                    		               "holdStatus":"open",
                    		               "holdReason":"fff"
                    		            }
                    		         ],
                    		         "timeDateReferences":[
                    		            {
                    		               "timeDateType":"eee",
                    		               "strDateValue":"2019-04-03T11:30:15-08:00"
                    		            }
                    		         ],
                    		         "messages":[
                    		            {
                    		               "messageType":"GiftMessage",
                    		               "messageText":"Hope You Enjoy This Gift!"
                    		            }
                    		         ],
                    		         "notes":[
                    		            {
                    		               "noteType":"aaa",
                    		               "noteText":"bbb"
                    		            }
                    		         ],
                    		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                    		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		         "shippingCarrier":"FEDEX",
                    		         "carrierServiceType":"FedExGround",
                    		         "paymentTerms":"payterm",
                    		         "orderLookUpKey":"22226",
                    		         "shipFromSingleNode":true,
                    		         "taxExempt":true,
                    		         "taxExemptCertificate":"CERT",
                    		         "taxPayerId":"123456",
                    		         "orderSessionId":"session123"
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
            		expect(response.statusCode).toBe(400);
            		expect(response.body.developerMessage).toContain("itemUnitPrice: must be greater than or equal to 0");
            		done();

                    });
                }),
                
                
                
                
                it("TC - 25 -> Order status apart from Draft or Open", done =>{

                    var options = {
                        method: 'POST',
                        url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        },
                        

                       body: {
                    	   "orders":[
                    		      {
                    		         "priority":"1",
                    		         "orderDate":"2019-04-05T13:24:15-08:00",
                    		         "orderNumber":order+25,
                    		         "orderType":"salesOrder",
                    		         "purchaseOrderNumber":"PUR-701",
                    		         "channel":"B2B",
                    		         "status":"Released",
                    		         "orderOrganization":"TheHonestKitchen-Organization-",
                    		         "orderTransactionType":"Sales",
                    		         "enteredBy":"priti",
                    		         "enspireCreateDate":"2019-03-08T11:30:15-08:00",
                    		         "lineItems":[
                    		            {
                    		               "lineNumber":1,
                    		               "status":"OPEN",
                    		               "retailerReferenceItemSKU":"aaa",
                    		               "lineItemId":"AcuSKU1",
                    		               "itemTitle":"AcuSKU1",
                    		               "itemDescription":"Computers",
                    		               "itemUnitOfMeasure":"EA",
                    		               "itemUnitPrice":"20",
                    		               "lineItemQty":2,
                    		               "originalOrderedQty":2,
                    		               "deliveryMethod":"shipToHome",
                    		               "fulfillmentType":"ShipToHome",
                    		               "fulfillmentSite":"joliet-dc",
                    		               "reasonCode":"ABC",
                    		               "bundleParent":true,
                    		               "presell":true,
                    		               "gift":true,
                    		               "giftWrap":true,
                    		               "shipFromSingleNode":true,
                    		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                    		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		               "shippingCarrier":"FEDEX",
                    		               "carrierServiceType":"FedExGround",
                    		               "shipAlone":true,
                    		               "shipComplete":true,
                    		               "shipToContact":{
                    		                  "firstName":"WENDY",
                    		                  "lastName":"ZIESEMANN",
                    		                  "address":{
                    		                     "address1":"24 Green St",
                    		                     "city":"Hudson",
                    		                     "state":"MA",
                    		                     "zip5":"01749",
                    		                     "country":"US"
                    		                  },
                    		                  "primaryEmail":"wendyziesemann01749@thk.com",
                    		                  "primaryPhone":"(000) 000-0423"
                    		               },
                    		               "priceInfo":{
                    		                  "unitPrice":20,
                    		                  "retailPrice":20,
                    		                  "listPrice":20
                    		               },
                    		               "lineCharges":[
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"SHIPPING",
                    		                     "chargeAmount":10,
                    		                     "originalChargeAmount":10
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"OVERSIZE_SHIPPING",
                    		                     "chargeAmount":20,
                    		                     "originalChargeAmount":20
                    		                  },
                    		                  {
                    		                     "chargeCategory":"SHIPPING",
                    		                     "chargeName":"HANDLING",
                    		                     "chargeAmount":5,
                    		                     "originalChargeAmount":5
                    		                  }
                    		               ],
                    		               "lineDiscounts":[
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ITEM_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  },
                    		                  {
                    		                     "discountAmount":3,
                    		                     "discountName":"ORDER_DISCOUNT",
                    		                     "originalDiscountAmount":3
                    		                  }
                    		               ],
                    		               "lineTaxes":[
                    		                  {
                    		                     "taxName":"SALES_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  },
                    		                  {
                    		                     "taxName":"SHIPPING_TAX",
                    		                     "taxAmount":2,
                    		                     "taxRate":5.75
                    		                  }
                    		               ],
                    		               "promos":[
                    		                  {
                    		                     "promoId":"BUY1GET1Free",
                    		                     "promoGroup":"BOGOF",
                    		                     "promoType":"SELL"
                    		                  },
                    		                  {
                    		                     "promoId":"BUY2GET1Free",
                    		                     "promoGroup":"B2G1F",
                    		                     "promoType":"SELLS"
                    		                  }
                    		               ],
                    		               "messages":[
                    		                  {
                    		                     "messageType":"GiftMessage",
                    		                     "messageText":"Hope You Enjoy This Gift!"
                    		                  }
                    		               ],
                    		               "references":[
                    		                  {
                    		                     "type":"String",
                    		                     "data":"pritilineref",
                    		                     "value":"12",
                    		                     "systemInd":"N",
                    		                     "requiredInd":"Y"
                    		                  },
                    		                  {
                    		                     "type":"Boolean",
                    		                     "data":"pritilinerefBoolean",
                    		                     "value":true,
                    		                     "systemInd":"Y",
                    		                     "requiredInd":"Y"
                    		                  }
                    		               ],
                    		               "notes":[
                    		                  {
                    		                     "noteType":"aaa",
                    		                     "noteText":"bbb note texxte"
                    		                  }
                    		               ],
                    		               "holds":[
                    		                  {
                    		                     "holdType":"dss",
                    		                     "holdStatus":"open",
                    		                     "holdReason":"fff"
                    		                  }
                    		               ]
                    		            }
                    		         ],
                    		         "referenceData":[
                    		            {
                    		               "type":"String",
                    		               "data":"pritirefOrder",
                    		               "value":"12"
                    		            }
                    		         ],
                    		         "orderCharges":[
                    		            {
                    		               "chargeCategory":"050",
                    		               "chargeName":"Freight",
                    		               "chargeAmount":20,
                    		               "originalChargeAmount":20
                    		            }
                    		         ],
                    		         "orderDiscounts":[
                    		            {
                    		               "discountName":"50%",
                    		               "discountAmount":10,
                    		               "originalDiscountAmount":5
                    		            }
                    		         ],
                    		         "orderTaxes":[
                    		            {
                    		               "taxName":"VAT",
                    		               "taxAmount":5,
                    		               "taxRate":5
                    		            }
                    		         ],
                    		         "promos":[
                    		            {
                    		               "promoId":"BUY1GET150%",
                    		               "promoGroup":"BOGOF",
                    		               "promoType":"priti"
                    		            }
                    		         ],
                    		         "buyerContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "billToContactInfo":{
                    		            "firstName":"WENDY",
                    		            "lastName":"ZIESEMANN",
                    		            "address":{
                    		               "address1":"24 Green St",
                    		               "city":"Hudson",
                    		               "state":"MA",
                    		               "zip5":"01749",
                    		               "country":"US"
                    		            },
                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                    		            "primaryPhone":"(000) 000-0423"
                    		         },
                    		         "shipToContacts":[
                    		            {
                    		               "firstName":"WENDY",
                    		               "lastName":"ZIESEMANN",
                    		               "address":{
                    		                  "address1":"24 Green St",
                    		                  "city":"Hudson",
                    		                  "state":"MA",
                    		                  "zip5":"01749",
                    		                  "country":"US"
                    		               },
                    		               "primaryEmail":"wendyziesemann01749@thk.com",
                    		               "primaryPhone":"(000) 000-0423"
                    		            }
                    		         ],
                    		         "holds":[
                    		            {
                    		               "holdType":"dss",
                    		               "holdStatus":"open",
                    		               "holdReason":"fff"
                    		            }
                    		         ],
                    		         "timeDateReferences":[
                    		            {
                    		               "timeDateType":"eee",
                    		               "strDateValue":"2019-04-03T11:30:15-08:00"
                    		            }
                    		         ],
                    		         "messages":[
                    		            {
                    		               "messageType":"GiftMessage",
                    		               "messageText":"Hope You Enjoy This Gift!"
                    		            }
                    		         ],
                    		         "notes":[
                    		            {
                    		               "noteType":"aaa",
                    		               "noteText":"bbb"
                    		            }
                    		         ],
                    		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                    		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                    		         "shippingCarrier":"FEDEX",
                    		         "carrierServiceType":"FedExGround",
                    		         "paymentTerms":"payterm",
                    		         "orderLookUpKey":"22226",
                    		         "shipFromSingleNode":true,
                    		         "taxExempt":true,
                    		         "taxExemptCertificate":"CERT",
                    		         "taxPayerId":"123456",
                    		         "orderSessionId":"session123"
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
             		expect(response.statusCode).toBe(400);
             		expect(response.body.message).toContain("status is invalid for insertion its not DRAFT/OPEN");
             		done();

                     });
                 }),
                 
                 
                 
                 
                 it("TC - 26 -> Create order with multi line/multi quantity", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: { 
                     	   "orders":[ 
                     		      { 
                     		         "priority":"1",
                     		         "orderDate":"2019-12-27T13:24:15-08:00",
                     		         "orderNumber":order+26,
                     		         "orderType":"salesOrder",
                     		         "purchaseOrderNumber":"PUR-205",
                     		         "channel":"B2B",
                     		         "status":"DRAFT",
                     		         "orderOrganization":"TheHonestKitchen-Organization-",
                     		         "orderTransactionType":"Sales",
                     		         "enteredBy":"priti",
                     		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                     		         "customer":
                     		           {
                     						"customerId": "CustAQA002"
                     		           },
                     		         "lineItems":[ 
                     		            { 
                     		               "lineNumber":1,
                     		               "status":"OPEN",
                     		               "retailerReferenceItemSKU":"aaa",
                     		               "lineItemId": "AcuSKU2",
                     		               "itemTitle":"AcuSKU2",
                     		               "itemDescription":"Computers",
                     		               "itemUnitOfMeasure":"EA",
                     		               "itemUnitPrice":"10",
                     		               "lineItemQty":3,
                     		               "originalOrderedQty":3,
                     		               "deliveryMethod":"shipToHome",
                     		               "fulfillmentType":"ShipToHome",
                     		               "fulfillmentSite":"joliet-dc",
                     		               "reasonCode":"ABC",
                     		               "bundleParent":true,
                     		               "presell":false,
                     		               "gift":true,
                     		               "giftWrap":true,
                     		               "shipFromSingleNode":true,
                     		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                     		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                     		               "shippingCarrier":"FEDEX",
                     		               "carrierServiceType":"FedExGround",
                     		               "shipAlone":true,
                     		               "shipComplete":true,
                     		               "shipToContact":{ 
                     		                  "firstName":"XYZ",
                     		                  "lastName":"M",
                     		                  "address":{ 
                     		                     "address1":"3 Smoky Hollow Lane",
                     		                     "city":"Deltona",
                     		                     "state":"FL",
                     		                     "zip5":"32725",
                     		                     "country":"US"
                     		                  },
                     		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                     		                  "primaryPhone":"456-456-4567"
                     		               },
                     		               "priceInfo":{ 
                     		                  "unitPrice":77.99,
                     		                  "retailPrice":77.99,
                     		                  "listPrice":97.99
                     		               },
                     		               "lineCharges":[ 
                     		                  { 
                     		                     "chargeCategory":"SHIPPING",
                     		                     "chargeName":"SHIPPING",
                     		                     "chargeAmount":6.99,
                     		                     "originalChargeAmount":6.99
                     		                  },
                     		                  { 
                     		                     "chargeCategory":"SHIPPING",
                     		                     "chargeName":"OVERSIZE_SHIPPING",
                     		                     "chargeAmount":16.99,
                     		                     "originalChargeAmount":16.99
                     		                  }
                     		               ],
                     		               "lineDiscounts":[ 
                     		                  { 
                     		                     "discountAmount":2.99,
                     		                     "discountName":"ITEM_DISCOUNT",
                     		                     "originalDiscountAmount":2.99
                     		                  },
                     		                  { 
                     		                     "discountAmount":2.99,
                     		                     "discountName":"ORDER_DISCOUNT",
                     		                     "originalDiscountAmount":2.99
                     		                  }
                     		               ],
                     		               "lineTaxes":[ 
                     		                  { 
                     		                     "taxName":"SALES_TAX",
                     		                     "taxAmount":3.45,
                     		                     "taxRate":5.75
                     		                  },
                     		                  { 
                     		                     "taxName":"SHIPPING_TAX",
                     		                     "taxAmount":3.45,
                     		                     "taxRate":5.75
                     		                  }
                     		               ],
                     		               "promos":[ 
                     		                  { 
                     		                     "promoId":"BUY1GET1Free",
                     		                     "promoGroup":"BOGOF",
                     		                     "promoType":"SELL"
                     		                  },
                     		                  { 
                     		                     "promoId":"BUY2GET1Free",
                     		                     "promoGroup":"B2G1F",
                     		                     "promoType":"SELLS"
                     		                  }
                     		               ],
                     		               "messages":[ 
                     		                  { 
                     		                     "messageType":"GiftMessage",
                     		                     "messageText":"Hope You Enjoy This Gift!"
                     		                  }
                     		               ],
                     		               "references":[ 
                     		                  { 
                     		                     "type":"String",
                     		                     "data":"pritilineref",
                     		                     "value":"12",
                     		                     "systemInd":"N",
                     		                     "requiredInd":"Y"
                     		                  },
                     		                  { 
                     		                     "type":"Boolean",
                     		                     "data":"pritilinerefBoolean",
                     		                     "value":true,
                     		                     "systemInd":"Y",
                     		                     "requiredInd":"Y"
                     		                  }
                     		               ],
                     		               "notes":[ 
                     		                  { 
                     		                     "noteType":"aaa",
                     		                     "noteText":"bbb note texxte"
                     		                  }
                     		               ],
                     		               "holds":[ 
                     		                  { 
                     		                     "holdType":"dss",
                     		                     "holdStatus":"open",
                     		                     "holdReason":"fff"
                     		                  }
                     		               ]
                     		            },
                     					{ 
                     		               "lineNumber":2,
                     		               "status":"OPEN",
                     		               "retailerReferenceItemSKU":"aaa",
                     		               "lineItemId": "AcuSKU1",
                     		               "itemTitle":"AcuSKU1",
                     		               "itemDescription":"Computers",
                     		               "itemUnitOfMeasure":"EA",
                     		               "itemUnitPrice":"10",
                     		               "lineItemQty":5,
                     		               "originalOrderedQty":5,
                     		               "deliveryMethod":"shipToHome",
                     		               "fulfillmentType":"ShipToHome",
                     		               "fulfillmentSite":"joliet-dc",
                     		               "reasonCode":"ABC",
                     		               "bundleParent":true,
                     		               "presell":false,
                     		               "gift":true,
                     		               "giftWrap":true,
                     		               "shipFromSingleNode":true,
                     		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                     		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                     		               "shippingCarrier":"FEDEX",
                     		               "carrierServiceType":"FedExGround",
                     		               "shipAlone":true,
                     		               "shipComplete":true,
                     		               "shipToContact":{ 
                     		                  "firstName":"XYZ",
                     		                  "lastName":"M",
                     		                  "address":{ 
                     		                     "address1":"3 Smoky Hollow Lane",
                     		                     "city":"Deltona",
                     		                     "state":"FL",
                     		                     "zip5":"32725",
                     		                     "country":"US"
                     		                  },
                     		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                     		                  "primaryPhone":"456-456-4567"
                     		               },
                     		               "priceInfo":{ 
                     		                  "unitPrice":77.99,
                     		                  "retailPrice":77.99,
                     		                  "listPrice":97.99
                     		               },
                     		               "lineCharges":[ 
                     		                  { 
                     		                     "chargeCategory":"SHIPPING",
                     		                     "chargeName":"SHIPPING",
                     		                     "chargeAmount":6.99,
                     		                     "originalChargeAmount":6.99
                     		                  },
                     		                  { 
                     		                     "chargeCategory":"SHIPPING",
                     		                     "chargeName":"OVERSIZE_SHIPPING",
                     		                     "chargeAmount":16.99,
                     		                     "originalChargeAmount":16.99
                     		                  }
                     		               ],
                     		               "lineDiscounts":[ 
                     		                  { 
                     		                     "discountAmount":2.99,
                     		                     "discountName":"ITEM_DISCOUNT",
                     		                     "originalDiscountAmount":2.99
                     		                  },
                     		                  { 
                     		                     "discountAmount":2.99,
                     		                     "discountName":"ORDER_DISCOUNT",
                     		                     "originalDiscountAmount":2.99
                     		                  }
                     		               ],
                     		               "lineTaxes":[ 
                     		                  { 
                     		                     "taxName":"SALES_TAX",
                     		                     "taxAmount":3.45,
                     		                     "taxRate":5.75
                     		                  },
                     		                  { 
                     		                     "taxName":"SHIPPING_TAX",
                     		                     "taxAmount":3.45,
                     		                     "taxRate":5.75
                     		                  }
                     		               ],
                     		               "promos":[ 
                     		                  { 
                     		                     "promoId":"BUY1GET1Free",
                     		                     "promoGroup":"BOGOF",
                     		                     "promoType":"SELL"
                     		                  },
                     		                  { 
                     		                     "promoId":"BUY2GET1Free",
                     		                     "promoGroup":"B2G1F",
                     		                     "promoType":"SELLS"
                     		                  }
                     		               ],
                     		               "messages":[ 
                     		                  { 
                     		                     "messageType":"GiftMessage",
                     		                     "messageText":"Hope You Enjoy This Gift!"
                     		                  }
                     		               ],
                     		               "references":[ 
                     		                  { 
                     		                     "type":"String",
                     		                     "data":"pritilineref",
                     		                     "value":"12",
                     		                     "systemInd":"N",
                     		                     "requiredInd":"Y"
                     		                  },
                     		                  { 
                     		                     "type":"Boolean",
                     		                     "data":"pritilinerefBoolean",
                     		                     "value":true,
                     		                     "systemInd":"Y",
                     		                     "requiredInd":"Y"
                     		                  }
                     		               ],
                     		               "notes":[ 
                     		                  { 
                     		                     "noteType":"aaa",
                     		                     "noteText":"bbb note texxte"
                     		                  }
                     		               ],
                     		               "holds":[ 
                     		                  { 
                     		                     "holdType":"dss",
                     		                     "holdStatus":"open",
                     		                     "holdReason":"fff"
                     		                  }
                     		               ]
                     		            }
                     		         ],
                     		         "referenceData":[ 
                     		            { 
                     		               "type":"String",
                     		               "data":"pritirefOrder",
                     		               "value":"12"
                     		            }
                     		         ],
                     		         "orderCharges":[ 
                     		            { 
                     		               "chargeCategory":"050",
                     		               "chargeName":"SHIPPING",
                     		               "chargeAmount":95.87,
                     		               "originalChargeAmount":94.48
                     		            }
                     		         ],
                     		         "orderDiscounts":[ 
                     		            { 
                     		               "discountName":"50%",
                     		               "discountAmount":20,
                     		               "originalDiscountAmount":25
                     		            }
                     		         ],
                     		         "orderTaxes":[ 
                     		            { 
                     		               "taxName":"VAT",
                     		               "taxAmount":10,
                     		               "taxRate":10
                     		            }
                     		         ],
                     		         "promos":[ 
                     		            { 
                     		               "promoId":"BUY1GET150%",
                     		               "promoGroup":"BOGOF",
                     		               "promoType":"priti"
                     		            }
                     		         ],
                     		         "buyerContactInfo":{ 
                     		            "firstName":"WENDY",
                     		            "lastName":"ZIESEMANN",
                     		            "address":{ 
                     		               "address1":"24 Green St",
                     		               "city":"Hudson",
                     		               "state":"MA",
                     		               "zip5":"01749",
                     		               "country":"US"
                     		            },
                     		            "primaryEmail":"wendyziesemann01749@thk.com",
                     		            "primaryPhone":"(000) 000-0423"
                     		         },
                     		         "billToContactInfo":{ 
                     		            "firstName":"WENDY",
                     		            "lastName":"ZIESEMANN",
                     		            "address":{ 
                     		               "address1":"24 Green St",
                     		               "city":"Hudson",
                     		               "state":"MA",
                     		               "zip5":"01749",
                     		               "country":"US"
                     		            },
                     		            "primaryEmail":"wendyziesemann01749@thk.com",
                     		            "primaryPhone":"(000) 000-0423"
                     		         },
                     		         "shipToContacts":[ 
                     		            { 
                     		               "firstName":"WENDY",
                     		               "lastName":"ZIESEMANN",
                     		               "address":{ 
                     		                  "address1":"24 Green St",
                     		                  "city":"Hudson",
                     		                  "state":"MA",
                     		                  "zip5":"01749",
                     		                  "country":"US"
                     		               },
                     		               "primaryEmail":"wendyziesemann01749@thk.com",
                     		               "primaryPhone":"(000) 000-0423"
                     		            }
                     		         ],
                     		         "holds":[ 
                     		            { 
                     		               "holdType":"dss",
                     		               "holdStatus":"open",
                     		               "holdReason":"fff"
                     		            }
                     		         ],
                     		         "timeDateReferences":[ 
                     		            { 
                     		               "timeDateType":"eee",
                     		               "strDateValue":"2019-04-03T11:30:15-08:00"
                     		            }
                     		         ],
                     		         "messages":[ 
                     		            { 
                     		               "messageType":"GiftMessage",
                     		               "messageText":"Hope You Enjoy This Gift!"
                     		            }
                     		         ],
                     		         "notes":[ 
                     		            { 
                     		               "noteType":"PACKING_INSTRUCTIONS",
                     		               "noteText":"Test"
                     		            }
                     		         ],
                     		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                     		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                     		         "shippingCarrier":"FEDEX",
                     		         "carrierServiceType":"FedExGround",
                     		         "paymentTerms":"payterm",
                     		         "orderLookUpKey":"22226",
                     		         "shipFromSingleNode":true,
                     		         "taxExempt":true,
                     		         "taxExemptCertificate":"CERT",
                     		         "taxPayerId":"123456",
                     		         "orderSessionId":"session123"
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
                 		expect(response.statusCode).toBe(200);
                 		expect(response.body.orders[0].orderNumber).toContain(order+26);
                 		done();

                         });
                     }),
                     
                     
                     
                     
                     it("TC - 27 -> Create order with items shipping to multiple addresses", done =>{

                         var options = {
                             method: 'POST',
                             url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer '+token
                             },
                             

                            body: {
                            	   "orders":[
                            		      {
                            		         "priority":"1",
                            		         "orderDate":"2019-12-27T13:24:15-08:00",
                            		         "orderNumber":order+27,
                            		         "orderType":"salesOrder",
                            		         "purchaseOrderNumber":"PUR-205",
                            		         "channel":"B2B",
                            		         "status":"OPEN",
                            		         "orderOrganization":"TheHonestKitchen-Organization-",
                            		         "orderTransactionType":"Sales",
                            		         "enteredBy":"priti",
                            		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                            		         "lineItems":[
                            		            {
                            		               "lineNumber":1,
                            		               "status":"OPEN",
                            		               "retailerReferenceItemSKU":"aaa",
                            		               "lineItemId":"testPriti1",
                            		               "itemTitle":"testPriti1",
                            		               "itemDescription":"Computers",
                            		               "itemUnitOfMeasure":"EA",
                            		               "itemUnitPrice":"10",
                            		               "lineItemQty":1,
                            		               "originalOrderedQty":1,
                            		               "deliveryMethod":"shipToHome",
                            		               "fulfillmentType":"ShipToHome",
                            		               "fulfillmentSite":"joliet-dc",
                            		               "reasonCode":"ABC",
                            		               "bundleParent":true,
                            		               "presell":false,
                            		               "gift":true,
                            		               "giftWrap":true,
                            		               "shipFromSingleNode":true,
                            		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                            		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                            		               "shippingCarrier":"FEDEX",
                            		               "carrierServiceType":"FedExGround",
                            		               "shipAlone":true,
                            		               "shipComplete":true,
                            		               "shipToContact":{
                            		                  "firstName":"Richard E ",
                            		                  "lastName":"Morado",
                            		                  "address":{
                            		                     "address1":"4294  Mount Tabor",
                            		                     "city":"White Plains",
                            		                     "state":"NY",
                            		                     "zip5":"10601",
                            		                     "country":"US"
                            		                  },
                            		                  "primaryEmail":"4op1b066ir2@temporary-mail.net",
                            		                  "primaryPhone":"914-538-3240"
                            		               },
                            		               "priceInfo":{
                            		                  "unitPrice":77.99,
                            		                  "retailPrice":77.99,
                            		                  "listPrice":97.99
                            		               },
                            		               "lineCharges":[
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"SHIPPING",
                            		                     "chargeAmount":6.99,
                            		                     "originalChargeAmount":6.99
                            		                  },
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"OVERSIZE_SHIPPING",
                            		                     "chargeAmount":16.99,
                            		                     "originalChargeAmount":16.99
                            		                  }
                            		               ],
                            		               "lineDiscounts":[
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ITEM_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  },
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ORDER_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  }
                            		               ],
                            		               "lineTaxes":[
                            		                  {
                            		                     "taxName":"SALES_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  },
                            		                  {
                            		                     "taxName":"SHIPPING_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  }
                            		               ],
                            		               "lineTotals":{
                            		                  "lineSubTotalBeforeTax":87.97,
                            		                  "lineExtendedPrice":83.97,
                            		                  "lineTax":3.45,
                            		                  "lineDiscount":2.99,
                            		                  "lineCharges":6.99,
                            		                  "lineTotal":91.42
                            		               },
                            		               "promos":[
                            		                  {
                            		                     "promoId":"BUY1GET1Free",
                            		                     "promoGroup":"BOGOF",
                            		                     "promoType":"SELL"
                            		                  },
                            		                  {
                            		                     "promoId":"BUY2GET1Free",
                            		                     "promoGroup":"B2G1F",
                            		                     "promoType":"SELLS"
                            		                  }
                            		               ],
                            		               "messages":[
                            		                  {
                            		                     "messageType":"GiftMessage",
                            		                     "messageText":"Hope You Enjoy This Gift!"
                            		                  }
                            		               ],
                            		               "references":[
                            		                  {
                            		                     "type":"String",
                            		                     "data":"pritilineref",
                            		                     "value":"12",
                            		                     "systemInd":"N",
                            		                     "requiredInd":"Y"
                            		                  },
                            		                  {
                            		                     "type":"Boolean",
                            		                     "data":"pritilinerefBoolean",
                            		                     "value":true,
                            		                     "systemInd":"Y",
                            		                     "requiredInd":"Y"
                            		                  }
                            		               ],
                            		               "notes":[
                            		                  {
                            		                     "noteType":"aaa",
                            		                     "noteText":"bbb note texxte"
                            		                  }
                            		               ],
                            		               "holds":[
                            		                  {
                            		                     "holdType":"dss",
                            		                     "holdStatus":"open",
                            		                     "holdReason":"fff"
                            		                  }
                            		               ]
                            		            },
                            		            {
                            		               "lineNumber":2,
                            		               "status":"OPEN",
                            		               "retailerReferenceItemSKU":"aaa",
                            		               "lineItemId":"testPriti",
                            		               "itemTitle":"testPriti",
                            		               "itemDescription":"Computers",
                            		               "itemUnitOfMeasure":"EA",
                            		               "itemUnitPrice":"10",
                            		               "lineItemQty":2,
                            		               "originalOrderedQty":2,
                            		               "deliveryMethod":"shipToHome",
                            		               "fulfillmentType":"ShipToHome",
                            		               "fulfillmentSite":"joliet-dc",
                            		               "reasonCode":"ABC",
                            		               "bundleParent":true,
                            		               "presell":false,
                            		               "gift":true,
                            		               "giftWrap":true,
                            		               "shipFromSingleNode":true,
                            		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                            		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                            		               "shippingCarrier":"FEDEX",
                            		               "carrierServiceType":"FedExGround",
                            		               "shipAlone":true,
                            		               "shipComplete":true,
                            		               "shipToContact":{
                            		                  "firstName":"John",
                            		                  "lastName":"Doe",
                            		                  "name":"John Doe",
                            		                  "primaryEmail":"enspire@envistacorp.com",
                            		                  "primaryPhone":"6126126126",
                            		                  "companyName":"",
                            		                  "address":{
                            		                     "address1":"2 Pierce Place, 17th Floor",
                            		                     "address2":"|1700",
                            		                     "city":"Itasca",
                            		                     "state":"IL",
                            		                     "zip5":"60143",
                            		                     "postalCode":"60143",
                            		                     "country":"US"
                            		                  }
                            		               },
                            		               "priceInfo":{
                            		                  "unitPrice":77.99,
                            		                  "retailPrice":77.99,
                            		                  "listPrice":97.99
                            		               },
                            		               "lineCharges":[
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"SHIPPING",
                            		                     "chargeAmount":6.99,
                            		                     "originalChargeAmount":6.99
                            		                  },
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"OVERSIZE_SHIPPING",
                            		                     "chargeAmount":16.99,
                            		                     "originalChargeAmount":16.99
                            		                  }
                            		               ],
                            		               "lineDiscounts":[
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ITEM_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  },
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ORDER_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  }
                            		               ],
                            		               "lineTaxes":[
                            		                  {
                            		                     "taxName":"SALES_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  },
                            		                  {
                            		                     "taxName":"SHIPPING_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  }
                            		               ],
                            		               "lineTotals":{
                            		                  "lineSubTotalBeforeTax":87.97,
                            		                  "lineExtendedPrice":83.97,
                            		                  "lineTax":3.45,
                            		                  "lineDiscount":2.99,
                            		                  "lineCharges":6.99,
                            		                  "lineTotal":91.42
                            		               },
                            		               "promos":[
                            		                  {
                            		                     "promoId":"BUY1GET1Free",
                            		                     "promoGroup":"BOGOF",
                            		                     "promoType":"SELL"
                            		                  },
                            		                  {
                            		                     "promoId":"BUY2GET1Free",
                            		                     "promoGroup":"B2G1F",
                            		                     "promoType":"SELLS"
                            		                  }
                            		               ],
                            		               "messages":[
                            		                  {
                            		                     "messageType":"GiftMessage",
                            		                     "messageText":"Hope You Enjoy This Gift!"
                            		                  }
                            		               ],
                            		               "references":[
                            		                  {
                            		                     "type":"String",
                            		                     "data":"pritilineref",
                            		                     "value":"12",
                            		                     "systemInd":"N",
                            		                     "requiredInd":"Y"
                            		                  },
                            		                  {
                            		                     "type":"Boolean",
                            		                     "data":"pritilinerefBoolean",
                            		                     "value":true,
                            		                     "systemInd":"Y",
                            		                     "requiredInd":"Y"
                            		                  }
                            		               ],
                            		               "notes":[
                            		                  {
                            		                     "noteType":"aaa",
                            		                     "noteText":"bbb note texxte"
                            		                  }
                            		               ],
                            		               "holds":[
                            		                  {
                            		                     "holdType":"dss",
                            		                     "holdStatus":"open",
                            		                     "holdReason":"fff"
                            		                  }
                            		               ]
                            		            }
                            		         ],
                            		         "referenceData":[
                            		            {
                            		               "type":"String",
                            		               "data":"pritirefOrder",
                            		               "value":"12"
                            		            }
                            		         ],
                            		         "orderCharges":[
                            		            {
                            		               "chargeCategory":"050",
                            		               "chargeName":"Freight",
                            		               "chargeAmount":95.87,
                            		               "originalChargeAmount":94.48
                            		            }
                            		         ],
                            		         "orderDiscounts":[
                            		            {
                            		               "discountName":"50%",
                            		               "discountAmount":20,
                            		               "originalDiscountAmount":25
                            		            }
                            		         ],
                            		         "orderTaxes":[
                            		            {
                            		               "taxName":"VAT",
                            		               "taxAmount":20,
                            		               "taxRate":10
                            		            }
                            		         ],
                            		         "orderTotals":{
                            		            "orderSubTotalBeforeTax":87.97,
                            		            "orderTax":0,
                            		            "orderDiscount":0,
                            		            "orderCharges":0,
                            		            "orderTotal":91.42
                            		         },
                            		         "promos":[
                            		            {
                            		               "promoId":"BUY1GET150%",
                            		               "promoGroup":"BOGOF",
                            		               "promoType":"priti"
                            		            }
                            		         ],
                            		         "buyerContactInfo":{
                            		            "firstName":"Richard E ",
                            		            "lastName":"Morado",
                            		            "address":{
                            		               "address1":"4294  Mount Tabor",
                            		               "city":"White Plains",
                            		               "state":"NY",
                            		               "zip5":"10601",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"4op1b066ir2@temporary-mail.net",
                            		            "primaryPhone":"914-538-3240"
                            		         },
                            		         "billToContactInfo":{
                            		            "firstName":"Richard E ",
                            		            "lastName":"Morado",
                            		            "address":{
                            		               "address1":"4294  Mount Tabor",
                            		               "city":"White Plains",
                            		               "state":"NY",
                            		               "zip5":"10601",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"4op1b066ir2@temporary-mail.net",
                            		            "primaryPhone":"914-538-3240"
                            		         },
                            		         "shipToContacts":[
                            		            {
                            		               "firstName":"Richard E ",
                            		               "lastName":"Morado",
                            		               "address":{
                            		                  "address1":"4294  Mount Tabor",
                            		                  "city":"White Plains",
                            		                  "state":"NY",
                            		                  "zip5":"10601",
                            		                  "country":"US"
                            		               },
                            		               "primaryEmail":"4op1b066ir2@temporary-mail.net",
                            		               "primaryPhone":"914-538-3240"
                            		            }
                            		         ],
                            		         "holds":[
                            		            {
                            		               "holdType":"dss",
                            		               "holdStatus":"open",
                            		               "holdReason":"fff"
                            		            }
                            		         ],
                            		         "timeDateReferences":[
                            		            {
                            		               "timeDateType":"eee",
                            		               "strDateValue":"2019-04-03T11:30:15-08:00"
                            		            }
                            		         ],
                            		         "messages":[
                            		            {
                            		               "messageType":"GiftMessage",
                            		               "messageText":"Hope You Enjoy This Gift!"
                            		            }
                            		         ],
                            		         "notes":[
                            		            {
                            		               "noteType":"aaa",
                            		               "noteText":"bbb"
                            		            }
                            		         ],
                            		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                            		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                            		         "shippingCarrier":"FEDEX",
                            		         "carrierServiceType":"FedExGround",
                            		         "paymentTerms":"payterm",
                            		         "orderLookUpKey":"22226",
                            		         "shipFromSingleNode":true,
                            		         "taxExempt":true,
                            		         "taxExemptCertificate":"CERT",
                            		         "taxPayerId":"123456",
                            		         "orderSessionId":"session123"
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
                     		expect(response.statusCode).toBe(200);
                     		expect(response.body.orders[0].orderNumber).toContain(order+27);
                     		done();

                             });
                         }),
                         
                         
                         
                 it("TC - 28 -> Create order with shipping charges", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: {
                        	   "orders":[
                        		      {
                        		         "priority":"1",
                        		         "orderDate":"2019-12-27T13:24:15-08:00",
                        		         "orderNumber":order+28,
                        		         "orderType":"salesOrder",
                        		         "purchaseOrderNumber":"PUR-205",
                        		         "channel":"B2B",
                        		         "status":"DRAFT",
                        		         "orderOrganization":"TheHonestKitchen-Organization-",
                        		         "orderTransactionType":"Sales",
                        		         "enteredBy":"priti",
                        		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                        		         "customer":{
                        		            "customerId":"CustAQA002"
                        		         },
                        		         "lineItems":[
                        		            {
                        		               "lineNumber":1,
                        		               "status":"OPEN",
                        		               "retailerReferenceItemSKU":"aaa",
                        		               "lineItemId":"AcuSKU1",
                        		               "itemTitle":"AcuSKU1",
                        		               "itemDescription":"Computers",
                        		               "itemUnitOfMeasure":"EA",
                        		               "itemUnitPrice":"10",
                        		               "lineItemQty":1,
                        		               "originalOrderedQty":1,
                        		               "deliveryMethod":"shipToHome",
                        		               "fulfillmentType":"ShipToHome",
                        		               "fulfillmentSite":"joliet-dc",
                        		               "reasonCode":"ABC",
                        		               "bundleParent":true,
                        		               "presell":false,
                        		               "gift":true,
                        		               "giftWrap":true,
                        		               "shipFromSingleNode":true,
                        		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                        		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                        		               "shippingCarrier":"FEDEX",
                        		               "carrierServiceType":"FedExGround",
                        		               "shipAlone":true,
                        		               "shipComplete":true,
                        		               "shipToContact":{
                        		                  "firstName":"XYZ",
                        		                  "lastName":"M",
                        		                  "address":{
                        		                     "address1":"3 Smoky Hollow Lane",
                        		                     "city":"Deltona",
                        		                     "state":"FL",
                        		                     "zip5":"32725",
                        		                     "country":"US"
                        		                  },
                        		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                        		                  "primaryPhone":"456-456-4567"
                        		               },
                        		               "priceInfo":{
                        		                  "unitPrice":77.99,
                        		                  "retailPrice":77.99,
                        		                  "listPrice":97.99
                        		               },
                        		               "lineCharges":[
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"SHIPPING",
                        		                     "chargeAmount":6.99,
                        		                     "originalChargeAmount":6.99
                        		                  },
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"OVERSIZE_SHIPPING",
                        		                     "chargeAmount":16.99,
                        		                     "originalChargeAmount":16.99
                        		                  }
                        		               ],
                        		               "lineDiscounts":[
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ITEM_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  },
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ORDER_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  }
                        		               ],
                        		               "lineTaxes":[
                        		                  {
                        		                     "taxName":"SALES_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  },
                        		                  {
                        		                     "taxName":"SHIPPING_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  }
                        		               ],
                        		               "lineTotals":{
                        		                  "lineSubTotalBeforeTax":87.97,
                        		                  "lineExtendedPrice":83.97,
                        		                  "lineTax":3.45,
                        		                  "lineDiscount":2.99,
                        		                  "lineCharges":6.99,
                        		                  "lineTotal":91.42
                        		               },
                        		               "promos":[
                        		                  {
                        		                     "promoId":"BUY1GET1Free",
                        		                     "promoGroup":"BOGOF",
                        		                     "promoType":"SELL"
                        		                  },
                        		                  {
                        		                     "promoId":"BUY2GET1Free",
                        		                     "promoGroup":"B2G1F",
                        		                     "promoType":"SELLS"
                        		                  }
                        		               ],
                        		               "messages":[
                        		                  {
                        		                     "messageType":"GiftMessage",
                        		                     "messageText":"Hope You Enjoy This Gift!"
                        		                  }
                        		               ],
                        		               "references":[
                        		                  {
                        		                     "type":"String",
                        		                     "data":"pritilineref",
                        		                     "value":"12",
                        		                     "systemInd":"N",
                        		                     "requiredInd":"Y"
                        		                  },
                        		                  {
                        		                     "type":"Boolean",
                        		                     "data":"pritilinerefBoolean",
                        		                     "value":true,
                        		                     "systemInd":"Y",
                        		                     "requiredInd":"Y"
                        		                  }
                        		               ],
                        		               "notes":[
                        		                  {
                        		                     "noteType":"aaa",
                        		                     "noteText":"bbb note texxte"
                        		                  }
                        		               ],
                        		               "holds":[
                        		                  {
                        		                     "holdType":"dss",
                        		                     "holdStatus":"open",
                        		                     "holdReason":"fff"
                        		                  }
                        		               ]
                        		            }
                        		         ],
                        		         "referenceData":[
                        		            {
                        		               "type":"String",
                        		               "data":"pritirefOrder",
                        		               "value":"12"
                        		            }
                        		         ],
                        		         "orderCharges":[
                        		            {
                        		               "chargeCategory":"050",
                        		               "chargeName":"SHIPPING",
                        		               "chargeAmount":95.87,
                        		               "originalChargeAmount":94.48
                        		            }
                        		         ],
                        		         "orderDiscounts":[
                        		            {
                        		               "discountName":"50%",
                        		               "discountAmount":20,
                        		               "originalDiscountAmount":25
                        		            }
                        		         ],
                        		         "orderTaxes":[
                        		            {
                        		               "taxName":"VAT",
                        		               "taxAmount":10,
                        		               "taxRate":10
                        		            }
                        		         ],
                        		         "orderTotals":{
                        		            "orderSubTotalBeforeTax":87.97,
                        		            "orderTax":0,
                        		            "orderDiscount":0,
                        		            "orderCharges":0,
                        		            "orderTotal":91.42
                        		         },
                        		         "promos":[
                        		            {
                        		               "promoId":"BUY1GET150%",
                        		               "promoGroup":"BOGOF",
                        		               "promoType":"priti"
                        		            }
                        		         ],
                        		         "buyerContactInfo":{
                        		            "firstName":"WENDY",
                        		            "lastName":"ZIESEMANN",
                        		            "address":{
                        		               "address1":"24 Green St",
                        		               "city":"Hudson",
                        		               "state":"MA",
                        		               "zip5":"01749",
                        		               "country":"US"
                        		            },
                        		            "primaryEmail":"wendyziesemann01749@thk.com",
                        		            "primaryPhone":"(000) 000-0423"
                        		         },
                        		         "billToContactInfo":{
                        		            "firstName":"WENDY",
                        		            "lastName":"ZIESEMANN",
                        		            "address":{
                        		               "address1":"24 Green St",
                        		               "city":"Hudson",
                        		               "state":"MA",
                        		               "zip5":"01749",
                        		               "country":"US"
                        		            },
                        		            "primaryEmail":"wendyziesemann01749@thk.com",
                        		            "primaryPhone":"(000) 000-0423"
                        		         },
                        		         "shipToContacts":[
                        		            {
                        		               "firstName":"WENDY",
                        		               "lastName":"ZIESEMANN",
                        		               "address":{
                        		                  "address1":"24 Green St",
                        		                  "city":"Hudson",
                        		                  "state":"MA",
                        		                  "zip5":"01749",
                        		                  "country":"US"
                        		               },
                        		               "primaryEmail":"wendyziesemann01749@thk.com",
                        		               "primaryPhone":"(000) 000-0423"
                        		            }
                        		         ],
                        		         "holds":[
                        		            {
                        		               "holdType":"dss",
                        		               "holdStatus":"open",
                        		               "holdReason":"fff"
                        		            }
                        		         ],
                        		         "timeDateReferences":[
                        		            {
                        		               "timeDateType":"eee",
                        		               "strDateValue":"2019-04-03T11:30:15-08:00"
                        		            }
                        		         ],
                        		         "messages":[
                        		            {
                        		               "messageType":"GiftMessage",
                        		               "messageText":"Hope You Enjoy This Gift!"
                        		            }
                        		         ],
                        		         "notes":[
                        		            {
                        		               "noteType":"PACKING_INSTRUCTIONS",
                        		               "noteText":"Test"
                        		            }
                        		         ],
                        		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                        		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                        		         "shippingCarrier":"FEDEX",
                        		         "carrierServiceType":"FedExGround",
                        		         "paymentTerms":"payterm",
                        		         "orderLookUpKey":"22226",
                        		         "shipFromSingleNode":true,
                        		         "taxExempt":true,
                        		         "taxExemptCertificate":"CERT",
                        		         "taxPayerId":"123456",
                        		         "orderSessionId":"session123"
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
                 		expect(response.statusCode).toBe(200);
                 		expect(response.body.orders[0].orderNumber).toContain(order+28);
                 		done();

                         });
                     }),
                     
                     
                     
                     
                     it("TC - 29 -> Create order with discounts", done =>{

                         var options = {
                             method: 'POST',
                             url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer '+token
                             },
                             

                            body: {
                            	   "orders":[
                            		      {
                            		         "priority":"1",
                            		         "orderDate":"2019-12-27T13:24:15-08:00",
                            		         "orderNumber":order+29,
                            		         "orderType":"salesOrder",
                            		         "purchaseOrderNumber":"PUR-205",
                            		         "channel":"B2B",
                            		         "status":"DRAFT",
                            		         "orderOrganization":"TheHonestKitchen-Organization-",
                            		         "orderTransactionType":"Sales",
                            		         "enteredBy":"priti",
                            		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                            		         "customer":{
                            		            "customerId":"CustAQA002"
                            		         },
                            		         "lineItems":[
                            		            {
                            		               "lineNumber":1,
                            		               "status":"OPEN",
                            		               "retailerReferenceItemSKU":"aaa",
                            		               "lineItemId":"AcuSKU1",
                            		               "itemTitle":"AcuSKU1",
                            		               "itemDescription":"Computers",
                            		               "itemUnitOfMeasure":"EA",
                            		               "itemUnitPrice":"10",
                            		               "lineItemQty":1,
                            		               "originalOrderedQty":1,
                            		               "deliveryMethod":"shipToHome",
                            		               "fulfillmentType":"ShipToHome",
                            		               "fulfillmentSite":"joliet-dc",
                            		               "reasonCode":"ABC",
                            		               "bundleParent":true,
                            		               "presell":false,
                            		               "gift":true,
                            		               "giftWrap":true,
                            		               "shipFromSingleNode":true,
                            		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                            		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                            		               "shippingCarrier":"FEDEX",
                            		               "carrierServiceType":"FedExGround",
                            		               "shipAlone":true,
                            		               "shipComplete":true,
                            		               "shipToContact":{
                            		                  "firstName":"XYZ",
                            		                  "lastName":"M",
                            		                  "address":{
                            		                     "address1":"3 Smoky Hollow Lane",
                            		                     "city":"Deltona",
                            		                     "state":"FL",
                            		                     "zip5":"32725",
                            		                     "country":"US"
                            		                  },
                            		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                            		                  "primaryPhone":"456-456-4567"
                            		               },
                            		               "priceInfo":{
                            		                  "unitPrice":77.99,
                            		                  "retailPrice":77.99,
                            		                  "listPrice":97.99
                            		               },
                            		               "lineCharges":[
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"SHIPPING",
                            		                     "chargeAmount":6.99,
                            		                     "originalChargeAmount":6.99
                            		                  },
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"OVERSIZE_SHIPPING",
                            		                     "chargeAmount":16.99,
                            		                     "originalChargeAmount":16.99
                            		                  }
                            		               ],
                            		               "lineDiscounts":[
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ITEM_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  },
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ORDER_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  }
                            		               ],
                            		               "lineTaxes":[
                            		                  {
                            		                     "taxName":"SALES_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  },
                            		                  {
                            		                     "taxName":"SHIPPING_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  }
                            		               ],
                            		               "lineTotals":{
                            		                  "lineSubTotalBeforeTax":87.97,
                            		                  "lineExtendedPrice":83.97,
                            		                  "lineTax":3.45,
                            		                  "lineDiscount":2.99,
                            		                  "lineCharges":6.99,
                            		                  "lineTotal":91.42
                            		               },
                            		               "promos":[
                            		                  {
                            		                     "promoId":"BUY1GET1Free",
                            		                     "promoGroup":"BOGOF",
                            		                     "promoType":"SELL"
                            		                  },
                            		                  {
                            		                     "promoId":"BUY2GET1Free",
                            		                     "promoGroup":"B2G1F",
                            		                     "promoType":"SELLS"
                            		                  }
                            		               ],
                            		               "messages":[
                            		                  {
                            		                     "messageType":"GiftMessage",
                            		                     "messageText":"Hope You Enjoy This Gift!"
                            		                  }
                            		               ],
                            		               "references":[
                            		                  {
                            		                     "type":"String",
                            		                     "data":"pritilineref",
                            		                     "value":"12",
                            		                     "systemInd":"N",
                            		                     "requiredInd":"Y"
                            		                  },
                            		                  {
                            		                     "type":"Boolean",
                            		                     "data":"pritilinerefBoolean",
                            		                     "value":true,
                            		                     "systemInd":"Y",
                            		                     "requiredInd":"Y"
                            		                  }
                            		               ],
                            		               "notes":[
                            		                  {
                            		                     "noteType":"aaa",
                            		                     "noteText":"bbb note texxte"
                            		                  }
                            		               ],
                            		               "holds":[
                            		                  {
                            		                     "holdType":"dss",
                            		                     "holdStatus":"open",
                            		                     "holdReason":"fff"
                            		                  }
                            		               ]
                            		            }
                            		         ],
                            		         "referenceData":[
                            		            {
                            		               "type":"String",
                            		               "data":"pritirefOrder",
                            		               "value":"12"
                            		            }
                            		         ],
                            		         "orderCharges":[
                            		            {
                            		               "chargeCategory":"050",
                            		               "chargeName":"SHIPPING",
                            		               "chargeAmount":95.87,
                            		               "originalChargeAmount":94.48
                            		            }
                            		         ],
                            		         "orderDiscounts":[
                            		            {
                            		               "discountName":"50%",
                            		               "discountAmount":20,
                            		               "originalDiscountAmount":25
                            		            }
                            		         ],
                            		         "orderTaxes":[
                            		            {
                            		               "taxName":"VAT",
                            		               "taxAmount":10,
                            		               "taxRate":10
                            		            }
                            		         ],
                            		         "orderTotals":{
                            		            "orderSubTotalBeforeTax":87.97,
                            		            "orderTax":0,
                            		            "orderDiscount":0,
                            		            "orderCharges":0,
                            		            "orderTotal":91.42
                            		         },
                            		         "promos":[
                            		            {
                            		               "promoId":"BUY1GET150%",
                            		               "promoGroup":"BOGOF",
                            		               "promoType":"priti"
                            		            }
                            		         ],
                            		         "buyerContactInfo":{
                            		            "firstName":"WENDY",
                            		            "lastName":"ZIESEMANN",
                            		            "address":{
                            		               "address1":"24 Green St",
                            		               "city":"Hudson",
                            		               "state":"MA",
                            		               "zip5":"01749",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"wendyziesemann01749@thk.com",
                            		            "primaryPhone":"(000) 000-0423"
                            		         },
                            		         "billToContactInfo":{
                            		            "firstName":"WENDY",
                            		            "lastName":"ZIESEMANN",
                            		            "address":{
                            		               "address1":"24 Green St",
                            		               "city":"Hudson",
                            		               "state":"MA",
                            		               "zip5":"01749",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"wendyziesemann01749@thk.com",
                            		            "primaryPhone":"(000) 000-0423"
                            		         },
                            		         "shipToContacts":[
                            		            {
                            		               "firstName":"WENDY",
                            		               "lastName":"ZIESEMANN",
                            		               "address":{
                            		                  "address1":"24 Green St",
                            		                  "city":"Hudson",
                            		                  "state":"MA",
                            		                  "zip5":"01749",
                            		                  "country":"US"
                            		               },
                            		               "primaryEmail":"wendyziesemann01749@thk.com",
                            		               "primaryPhone":"(000) 000-0423"
                            		            }
                            		         ],
                            		         "holds":[
                            		            {
                            		               "holdType":"dss",
                            		               "holdStatus":"open",
                            		               "holdReason":"fff"
                            		            }
                            		         ],
                            		         "timeDateReferences":[
                            		            {
                            		               "timeDateType":"eee",
                            		               "strDateValue":"2019-04-03T11:30:15-08:00"
                            		            }
                            		         ],
                            		         "messages":[
                            		            {
                            		               "messageType":"GiftMessage",
                            		               "messageText":"Hope You Enjoy This Gift!"
                            		            }
                            		         ],
                            		         "notes":[
                            		            {
                            		               "noteType":"PACKING_INSTRUCTIONS",
                            		               "noteText":"Test"
                            		            }
                            		         ],
                            		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                            		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                            		         "shippingCarrier":"FEDEX",
                            		         "carrierServiceType":"FedExGround",
                            		         "paymentTerms":"payterm",
                            		         "orderLookUpKey":"22226",
                            		         "shipFromSingleNode":true,
                            		         "taxExempt":true,
                            		         "taxExemptCertificate":"CERT",
                            		         "taxPayerId":"123456",
                            		         "orderSessionId":"session123"
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
                     		expect(response.statusCode).toBe(200);
                     		expect(response.body.orders[0].orderNumber).toContain(order+29);
                     		done();

                             });
                         }),

                         
                         
                         
                         
                 it("TC - 31 -> Create order with payment information where payment processing rule is not defined", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: {
                        	   "orders":[
                        		      {
                        		         "priority":"1",
                        		         "orderDate":"2019-03-05T13:24:15-08:00",
                        		         "orderNumber":order+31,
                        		         "orderType":"salesOrder",
                        		         "purchaseOrderNumber":"PUR-205",
                        		         "channel":"B2B",
                        		         "status":"Open",
                        		         "orderOrganization":"TheHonestKitchen-Organization-",
                        		         "orderTransactionType":"Sales",
                        		         "enteredBy":"priti",
                        		         "enspireCreateDate":"2019-03-05T11:30:15-08:00",
                        		         "lineItems":[
                        		            {
                        		               "lineNumber":1,
                        		               "status":"OPEN",
                        		               "retailerReferenceItemSKU":"aaa",
                        		               "lineItemId":"AcuSKU1",
                        		               "itemTitle":"AcuSKU1",
                        		               "itemDescription":"Computers",
                        		               "itemUnitOfMeasure":"EA",
                        		               "itemUnitPrice":"10",
                        		               "lineItemQty":1,
                        		               "originalOrderedQty":1,
                        		               "deliveryMethod":"shipToHome",
                        		               "fulfillmentType":"ShipToHome",
                        		               "fulfillmentSite":"joliet-dc",
                        		               "reasonCode":"ABC",
                        		               "bundleParent":true,
                        		               "presell":true,
                        		               "gift":true,
                        		               "giftWrap":true,
                        		               "shipFromSingleNode":true,
                        		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                        		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                        		               "shippingCarrier":"FEDEX",
                        		               "carrierServiceType":"FedExGround",
                        		               "shipAlone":true,
                        		               "shipComplete":true,
                        		               "shipToContact":{
                        		                  "firstName":"John",
                        		                  "lastName":"Scott",
                        		                  "address":{
                        		                     "address1":"123 test address",
                        		                     "city":"Carmel",
                        		                     "state":"IN",
                        		                     "zip5":"46032",
                        		                     "country":"US"
                        		                  },
                        		                  "primaryEmail":"jscott@enspirecommerce.com",
                        		                  "primaryPhone":"516-476-8610"
                        		               },
                        		               "priceInfo":{
                        		                  "unitPrice":77.99,
                        		                  "retailPrice":77.99,
                        		                  "listPrice":97.99
                        		               },
                        		               "lineCharges":[
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"SHIPPING",
                        		                     "chargeAmount":6.99,
                        		                     "originalChargeAmount":6.99
                        		                  },
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"OVERSIZE_SHIPPING",
                        		                     "chargeAmount":16.99,
                        		                     "originalChargeAmount":16.99
                        		                  }
                        		               ],
                        		               "lineDiscounts":[
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ITEM_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  },
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ORDER_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  }
                        		               ],
                        		               "lineTaxes":[
                        		                  {
                        		                     "taxName":"SALES_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  },
                        		                  {
                        		                     "taxName":"SHIPPING_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  }
                        		               ],
                        		               "lineTotals":{
                        		                  "lineSubTotalBeforeTax":87.97,
                        		                  "lineExtendedPrice":83.97,
                        		                  "lineTax":3.45,
                        		                  "lineDiscount":2.99,
                        		                  "lineCharges":6.99,
                        		                  "lineTotal":91.42
                        		               },
                        		               "promos":[
                        		                  {
                        		                     "promoId":"BUY1GET1Free",
                        		                     "promoGroup":"BOGOF",
                        		                     "promoType":"SELL"
                        		                  },
                        		                  {
                        		                     "promoId":"BUY2GET1Free",
                        		                     "promoGroup":"B2G1F",
                        		                     "promoType":"SELLS"
                        		                  }
                        		               ],
                        		               "messages":[
                        		                  {
                        		                     "messageType":"GiftMessage",
                        		                     "messageText":"Hope You Enjoy This Gift!"
                        		                  }
                        		               ],
                        		               "references":[
                        		                  {
                        		                     "type":"String",
                        		                     "data":"pritilineref",
                        		                     "value":"12",
                        		                     "systemInd":"N",
                        		                     "requiredInd":"Y"
                        		                  },
                        		                  {
                        		                     "type":"Boolean",
                        		                     "data":"pritilinerefBoolean",
                        		                     "value":true,
                        		                     "systemInd":"Y",
                        		                     "requiredInd":"Y"
                        		                  }
                        		               ],
                        		               "notes":[
                        		                  {
                        		                     "noteType":"aaa",
                        		                     "noteText":"bbb note texxte"
                        		                  }
                        		               ],
                        		               "holds":[
                        		                  {
                        		                     "holdType":"dss",
                        		                     "holdStatus":"open",
                        		                     "holdReason":"fff"
                        		                  }
                        		               ]
                        		            }
                        		         ],
                        		         "referenceData":[
                        		            {
                        		               "type":"String",
                        		               "data":"pritirefOrder",
                        		               "value":"12"
                        		            }
                        		         ],
                        		         "orderCharges":[
                        		            {
                        		               "chargeCategory":"050",
                        		               "chargeName":"Freight",
                        		               "chargeAmount":95.87,
                        		               "originalChargeAmount":94.48
                        		            }
                        		         ],
                        		         "orderDiscounts":[
                        		            {
                        		               "discountName":"50%",
                        		               "discountAmount":20,
                        		               "originalDiscountAmount":25
                        		            }
                        		         ],
                        		         "orderTaxes":[
                        		            {
                        		               "taxName":"VAT",
                        		               "taxAmount":10,
                        		               "taxRate":10
                        		            }
                        		         ],
                        		         "orderTotals":{
                        		            "orderSubTotalBeforeTax":87.97,
                        		            "orderTax":0,
                        		            "orderDiscount":0,
                        		            "orderCharges":0,
                        		            "orderTotal":91.42
                        		         },
                        		         "promos":[
                        		            {
                        		               "promoId":"BUY1GET150%",
                        		               "promoGroup":"BOGOF",
                        		               "promoType":"priti"
                        		            }
                        		         ],
                        		         "buyerContactInfo":{
                        		            "firstName":"John",
                        		            "lastName":"Scott",
                        		            "primaryEmail":"jscott@enspirecommerce.com",
                        		            "primaryPhone":"416-234-1234",
                        		            "address":{
                        		               "address1":"123 test address",
                        		               "city":"Carmel",
                        		               "state":"IN",
                        		               "zip5":"46032",
                        		               "country":"US"
                        		            }
                        		         },
                        		         "billToContactInfo":{
                        		            "firstName":"Mike",
                        		            "lastName":"Scott",
                        		            "primaryEmail":"mscott@enspirecommerce.com",
                        		            "primaryPhone":"546-345-6456",
                        		            "address":{
                        		               "address1":"456 Meridian blvd",
                        		               "city":"Fishers",
                        		               "state":"IN",
                        		               "zip5":"46037",
                        		               "country":"US"
                        		            }
                        		         },
                        		         "shipToContacts":[
                        		            {
                        		               "firstName":"John",
                        		               "lastName":"Scott",
                        		               "address":{
                        		                  "address1":"123 test address",
                        		                  "city":"Carmel",
                        		                  "state":"IN",
                        		                  "zip5":"46032",
                        		                  "country":"US"
                        		               },
                        		               "primaryEmail":"jscott@enspirecommerce.com",
                        		               "primaryPhone":"516-476-8610"
                        		            }
                        		         ],
                        		         "holds":[
                        		            {
                        		               "holdType":"dss",
                        		               "holdStatus":"open",
                        		               "holdReason":"fff"
                        		            }
                        		         ],
                        		         "timeDateReferences":[
                        		            {
                        		               "timeDateType":"eee",
                        		               "strDateValue":"2019-04-03T11:30:15-08:00"
                        		            }
                        		         ],
                        		         "messages":[
                        		            {
                        		               "messageType":"GiftMessage",
                        		               "messageText":"Hope You Enjoy This Gift!"
                        		            }
                        		         ],
                        		         "notes":[
                        		            {
                        		               "noteType":"aaa",
                        		               "noteText":"bbb"
                        		            }
                        		         ],
                        		         "orderPayments":[
                        		            {
                        		               "status":"authorized",
                        		               "nameOnCard":"psp",
                        		               "totalAuthorizedAmount":224.67,
                        		               "totalChargedAmount":91.42,
                        		               "transactionDate":"2018-03-05T11:25:15-08:00",
                        		               "currency":"USD",
                        		               "pnRef":"1234",
                        		               "paymentType":"CREDIT_CARD",
                        		               "cardType":"MASTERCARD",
                        		               "cardToken":"34355656878879899",
                        		               "expirationYear":"22",
                        		               "expirationMonth":"10",
                        		               "chargeSequence":"",
                        		               "orderPaymentTransactions":[
                        		                  {
                        		                     "transactionDate":"2018-03-05T11:26:15-08:00",
                        		                     "transactionType":"AUTHONLY",
                        		                     "firstName":"",
                        		                     "lastName":"",
                        		                     "nameOnCard":"",
                        		                     "transactionActualAmount":91.42,
                        		                     "transactionAttemptedAmount":70.98,
                        		                     "authorizedAmount":23.98,
                        		                     "approvalCode":"567678",
                        		                     "pnRef":"1234",
                        		                     "cardIssuerTrxId":"2424325435456",
                        		                     "cvvResultMessage":"success",
                        		                     "cvvResultCode":"01",
                        		                     "transactionExpirationDate":"2018-03-12T11:27:15-08:00"
                        		                  }
                        		               ]
                        		            }
                        		         ],
                        		         "expectedShipDate":"2019-03-03T11:30:15-08:00",
                        		         "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                        		         "shippingCarrier":"FEDEX",
                        		         "carrierServiceType":"FedExGround",
                        		         "paymentTerms":"payterm",
                        		         "orderLookUpKey":"22226",
                        		         "shipFromSingleNode":true,
                        		         "taxExempt":true,
                        		         "taxExemptCertificate":"CERT",
                        		         "taxPayerId":"123456",
                        		         "orderSessionId":"session123"
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
                 		expect(response.statusCode).toBe(200);
                 		expect(response.body.orders[0].orderNumber).toContain(order+31);
                 		done();

                         });
                     }),
                     
                     
                     
                     
                     
                     it("TC - 32 -> Error out if duplicate order# sent", done =>{

                         var options = {
                             method: 'POST',
                             url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer '+token
                             },
                             

                            body: {
                            	   "orders":[
                            		      {
                            		         "priority":"1",
                            		         "orderDate":"2019-12-27T13:24:15-08:00",
                            		         "orderNumber":order+28,
                            		         "orderType":"salesOrder",
                            		         "purchaseOrderNumber":"PUR-205",
                            		         "channel":"B2B",
                            		         "status":"DRAFT",
                            		         "orderOrganization":"TheHonestKitchen-Organization-",
                            		         "orderTransactionType":"Sales",
                            		         "enteredBy":"priti",
                            		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                            		         "customer":{
                            		            "customerId":"CustAQA002"
                            		         },
                            		         "lineItems":[
                            		            {
                            		               "lineNumber":1,
                            		               "status":"OPEN",
                            		               "retailerReferenceItemSKU":"aaa",
                            		               "lineItemId":"AcuSKU1",
                            		               "itemTitle":"AcuSKU1",
                            		               "itemDescription":"Computers",
                            		               "itemUnitOfMeasure":"EA",
                            		               "itemUnitPrice":"10",
                            		               "lineItemQty":1,
                            		               "originalOrderedQty":1,
                            		               "deliveryMethod":"shipToHome",
                            		               "fulfillmentType":"ShipToHome",
                            		               "fulfillmentSite":"joliet-dc",
                            		               "reasonCode":"ABC",
                            		               "bundleParent":true,
                            		               "presell":false,
                            		               "gift":true,
                            		               "giftWrap":true,
                            		               "shipFromSingleNode":true,
                            		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                            		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                            		               "shippingCarrier":"FEDEX",
                            		               "carrierServiceType":"FedExGround",
                            		               "shipAlone":true,
                            		               "shipComplete":true,
                            		               "shipToContact":{
                            		                  "firstName":"XYZ",
                            		                  "lastName":"M",
                            		                  "address":{
                            		                     "address1":"3 Smoky Hollow Lane",
                            		                     "city":"Deltona",
                            		                     "state":"FL",
                            		                     "zip5":"32725",
                            		                     "country":"US"
                            		                  },
                            		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                            		                  "primaryPhone":"456-456-4567"
                            		               },
                            		               "priceInfo":{
                            		                  "unitPrice":77.99,
                            		                  "retailPrice":77.99,
                            		                  "listPrice":97.99
                            		               },
                            		               "lineCharges":[
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"SHIPPING",
                            		                     "chargeAmount":6.99,
                            		                     "originalChargeAmount":6.99
                            		                  },
                            		                  {
                            		                     "chargeCategory":"SHIPPING",
                            		                     "chargeName":"OVERSIZE_SHIPPING",
                            		                     "chargeAmount":16.99,
                            		                     "originalChargeAmount":16.99
                            		                  }
                            		               ],
                            		               "lineDiscounts":[
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ITEM_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  },
                            		                  {
                            		                     "discountAmount":2.99,
                            		                     "discountName":"ORDER_DISCOUNT",
                            		                     "originalDiscountAmount":2.99
                            		                  }
                            		               ],
                            		               "lineTaxes":[
                            		                  {
                            		                     "taxName":"SALES_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  },
                            		                  {
                            		                     "taxName":"SHIPPING_TAX",
                            		                     "taxAmount":3.45,
                            		                     "taxRate":5.75
                            		                  }
                            		               ],
                            		               "lineTotals":{
                            		                  "lineSubTotalBeforeTax":87.97,
                            		                  "lineExtendedPrice":83.97,
                            		                  "lineTax":3.45,
                            		                  "lineDiscount":2.99,
                            		                  "lineCharges":6.99,
                            		                  "lineTotal":91.42
                            		               },
                            		               "promos":[
                            		                  {
                            		                     "promoId":"BUY1GET1Free",
                            		                     "promoGroup":"BOGOF",
                            		                     "promoType":"SELL"
                            		                  },
                            		                  {
                            		                     "promoId":"BUY2GET1Free",
                            		                     "promoGroup":"B2G1F",
                            		                     "promoType":"SELLS"
                            		                  }
                            		               ],
                            		               "messages":[
                            		                  {
                            		                     "messageType":"GiftMessage",
                            		                     "messageText":"Hope You Enjoy This Gift!"
                            		                  }
                            		               ],
                            		               "references":[
                            		                  {
                            		                     "type":"String",
                            		                     "data":"pritilineref",
                            		                     "value":"12",
                            		                     "systemInd":"N",
                            		                     "requiredInd":"Y"
                            		                  },
                            		                  {
                            		                     "type":"Boolean",
                            		                     "data":"pritilinerefBoolean",
                            		                     "value":true,
                            		                     "systemInd":"Y",
                            		                     "requiredInd":"Y"
                            		                  }
                            		               ],
                            		               "notes":[
                            		                  {
                            		                     "noteType":"aaa",
                            		                     "noteText":"bbb note texxte"
                            		                  }
                            		               ],
                            		               "holds":[
                            		                  {
                            		                     "holdType":"dss",
                            		                     "holdStatus":"open",
                            		                     "holdReason":"fff"
                            		                  }
                            		               ]
                            		            }
                            		         ],
                            		         "referenceData":[
                            		            {
                            		               "type":"String",
                            		               "data":"pritirefOrder",
                            		               "value":"12"
                            		            }
                            		         ],
                            		         "orderCharges":[
                            		            {
                            		               "chargeCategory":"050",
                            		               "chargeName":"SHIPPING",
                            		               "chargeAmount":95.87,
                            		               "originalChargeAmount":94.48
                            		            }
                            		         ],
                            		         "orderDiscounts":[
                            		            {
                            		               "discountName":"50%",
                            		               "discountAmount":20,
                            		               "originalDiscountAmount":25
                            		            }
                            		         ],
                            		         "orderTaxes":[
                            		            {
                            		               "taxName":"VAT",
                            		               "taxAmount":10,
                            		               "taxRate":10
                            		            }
                            		         ],
                            		         "orderTotals":{
                            		            "orderSubTotalBeforeTax":87.97,
                            		            "orderTax":0,
                            		            "orderDiscount":0,
                            		            "orderCharges":0,
                            		            "orderTotal":91.42
                            		         },
                            		         "promos":[
                            		            {
                            		               "promoId":"BUY1GET150%",
                            		               "promoGroup":"BOGOF",
                            		               "promoType":"priti"
                            		            }
                            		         ],
                            		         "buyerContactInfo":{
                            		            "firstName":"WENDY",
                            		            "lastName":"ZIESEMANN",
                            		            "address":{
                            		               "address1":"24 Green St",
                            		               "city":"Hudson",
                            		               "state":"MA",
                            		               "zip5":"01749",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"wendyziesemann01749@thk.com",
                            		            "primaryPhone":"(000) 000-0423"
                            		         },
                            		         "billToContactInfo":{
                            		            "firstName":"WENDY",
                            		            "lastName":"ZIESEMANN",
                            		            "address":{
                            		               "address1":"24 Green St",
                            		               "city":"Hudson",
                            		               "state":"MA",
                            		               "zip5":"01749",
                            		               "country":"US"
                            		            },
                            		            "primaryEmail":"wendyziesemann01749@thk.com",
                            		            "primaryPhone":"(000) 000-0423"
                            		         },
                            		         "shipToContacts":[
                            		            {
                            		               "firstName":"WENDY",
                            		               "lastName":"ZIESEMANN",
                            		               "address":{
                            		                  "address1":"24 Green St",
                            		                  "city":"Hudson",
                            		                  "state":"MA",
                            		                  "zip5":"01749",
                            		                  "country":"US"
                            		               },
                            		               "primaryEmail":"wendyziesemann01749@thk.com",
                            		               "primaryPhone":"(000) 000-0423"
                            		            }
                            		         ],
                            		         "holds":[
                            		            {
                            		               "holdType":"dss",
                            		               "holdStatus":"open",
                            		               "holdReason":"fff"
                            		            }
                            		         ],
                            		         "timeDateReferences":[
                            		            {
                            		               "timeDateType":"eee",
                            		               "strDateValue":"2019-04-03T11:30:15-08:00"
                            		            }
                            		         ],
                            		         "messages":[
                            		            {
                            		               "messageType":"GiftMessage",
                            		               "messageText":"Hope You Enjoy This Gift!"
                            		            }
                            		         ],
                            		         "notes":[
                            		            {
                            		               "noteType":"PACKING_INSTRUCTIONS",
                            		               "noteText":"Test"
                            		            }
                            		         ],
                            		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                            		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                            		         "shippingCarrier":"FEDEX",
                            		         "carrierServiceType":"FedExGround",
                            		         "paymentTerms":"payterm",
                            		         "orderLookUpKey":"22226",
                            		         "shipFromSingleNode":true,
                            		         "taxExempt":true,
                            		         "taxExemptCertificate":"CERT",
                            		         "taxPayerId":"123456",
                            		         "orderSessionId":"session123"
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
                     		expect(response.statusCode).toBe(500);
                     		expect(response.body.message).toContain("E11000 duplicate key error collection");
                     		done();

                             });
                         }),
                         
                         
                         
                         
                         it("TC - 33 -> Pass promocodes", done =>{

                             var options = {
                                 method: 'POST',
                                 url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                 headers: {
                                     'Content-Type': 'application/json',
                                     'Authorization': 'Bearer '+token
                                 },
                                 

                                body: {
                                	   "orders":[
                                		      {
                                		         "priority":"1",
                                		         "orderDate":"2019-12-27T13:24:15-08:00",
                                		         "orderNumber":order+33,
                                		         "orderType":"salesOrder",
                                		         "purchaseOrderNumber":"PUR-205",
                                		         "channel":"B2B",
                                		         "status":"DRAFT",
                                		         "orderOrganization":"TheHonestKitchen-Organization-",
                                		         "orderTransactionType":"Sales",
                                		         "enteredBy":"priti",
                                		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                                		         "customer":{
                                		            "customerId":"CustAQA002"
                                		         },
                                		         "lineItems":[
                                		            {
                                		               "lineNumber":1,
                                		               "status":"OPEN",
                                		               "retailerReferenceItemSKU":"aaa",
                                		               "lineItemId":"AcuSKU1",
                                		               "itemTitle":"AcuSKU1",
                                		               "itemDescription":"Computers",
                                		               "itemUnitOfMeasure":"EA",
                                		               "itemUnitPrice":"10",
                                		               "lineItemQty":1,
                                		               "originalOrderedQty":1,
                                		               "deliveryMethod":"shipToHome",
                                		               "fulfillmentType":"ShipToHome",
                                		               "fulfillmentSite":"joliet-dc",
                                		               "reasonCode":"ABC",
                                		               "bundleParent":true,
                                		               "presell":false,
                                		               "gift":true,
                                		               "giftWrap":true,
                                		               "shipFromSingleNode":true,
                                		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                                		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                                		               "shippingCarrier":"FEDEX",
                                		               "carrierServiceType":"FedExGround",
                                		               "shipAlone":true,
                                		               "shipComplete":true,
                                		               "shipToContact":{
                                		                  "firstName":"XYZ",
                                		                  "lastName":"M",
                                		                  "address":{
                                		                     "address1":"3 Smoky Hollow Lane",
                                		                     "city":"Deltona",
                                		                     "state":"FL",
                                		                     "zip5":"32725",
                                		                     "country":"US"
                                		                  },
                                		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                                		                  "primaryPhone":"456-456-4567"
                                		               },
                                		               "priceInfo":{
                                		                  "unitPrice":77.99,
                                		                  "retailPrice":77.99,
                                		                  "listPrice":97.99
                                		               },
                                		               "lineCharges":[
                                		                  {
                                		                     "chargeCategory":"SHIPPING",
                                		                     "chargeName":"SHIPPING",
                                		                     "chargeAmount":6.99,
                                		                     "originalChargeAmount":6.99
                                		                  },
                                		                  {
                                		                     "chargeCategory":"SHIPPING",
                                		                     "chargeName":"OVERSIZE_SHIPPING",
                                		                     "chargeAmount":16.99,
                                		                     "originalChargeAmount":16.99
                                		                  }
                                		               ],
                                		               "lineDiscounts":[
                                		                  {
                                		                     "discountAmount":2.99,
                                		                     "discountName":"ITEM_DISCOUNT",
                                		                     "originalDiscountAmount":2.99
                                		                  },
                                		                  {
                                		                     "discountAmount":2.99,
                                		                     "discountName":"ORDER_DISCOUNT",
                                		                     "originalDiscountAmount":2.99
                                		                  }
                                		               ],
                                		               "lineTaxes":[
                                		                  {
                                		                     "taxName":"SALES_TAX",
                                		                     "taxAmount":3.45,
                                		                     "taxRate":5.75
                                		                  },
                                		                  {
                                		                     "taxName":"SHIPPING_TAX",
                                		                     "taxAmount":3.45,
                                		                     "taxRate":5.75
                                		                  }
                                		               ],
                                		               "lineTotals":{
                                		                  "lineSubTotalBeforeTax":87.97,
                                		                  "lineExtendedPrice":83.97,
                                		                  "lineTax":3.45,
                                		                  "lineDiscount":2.99,
                                		                  "lineCharges":6.99,
                                		                  "lineTotal":91.42
                                		               },
                                		               "promos":[
                                		                  {
                                		                     "promoId":"BUY1GET1Free",
                                		                     "promoGroup":"BOGOF",
                                		                     "promoType":"SELL"
                                		                  },
                                		                  {
                                		                     "promoId":"BUY2GET1Free",
                                		                     "promoGroup":"B2G1F",
                                		                     "promoType":"SELLS"
                                		                  }
                                		               ],
                                		               "messages":[
                                		                  {
                                		                     "messageType":"GiftMessage",
                                		                     "messageText":"Hope You Enjoy This Gift!"
                                		                  }
                                		               ],
                                		               "references":[
                                		                  {
                                		                     "type":"String",
                                		                     "data":"pritilineref",
                                		                     "value":"12",
                                		                     "systemInd":"N",
                                		                     "requiredInd":"Y"
                                		                  },
                                		                  {
                                		                     "type":"Boolean",
                                		                     "data":"pritilinerefBoolean",
                                		                     "value":true,
                                		                     "systemInd":"Y",
                                		                     "requiredInd":"Y"
                                		                  }
                                		               ],
                                		               "notes":[
                                		                  {
                                		                     "noteType":"aaa",
                                		                     "noteText":"bbb note texxte"
                                		                  }
                                		               ],
                                		               "holds":[
                                		                  {
                                		                     "holdType":"dss",
                                		                     "holdStatus":"open",
                                		                     "holdReason":"fff"
                                		                  }
                                		               ]
                                		            }
                                		         ],
                                		         "referenceData":[
                                		            {
                                		               "type":"String",
                                		               "data":"pritirefOrder",
                                		               "value":"12"
                                		            }
                                		         ],
                                		         "orderCharges":[
                                		            {
                                		               "chargeCategory":"050",
                                		               "chargeName":"SHIPPING",
                                		               "chargeAmount":95.87,
                                		               "originalChargeAmount":94.48
                                		            }
                                		         ],
                                		         "orderDiscounts":[
                                		            {
                                		               "discountName":"50%",
                                		               "discountAmount":20,
                                		               "originalDiscountAmount":25
                                		            }
                                		         ],
                                		         "orderTaxes":[
                                		            {
                                		               "taxName":"VAT",
                                		               "taxAmount":10,
                                		               "taxRate":10
                                		            }
                                		         ],
                                		         "orderTotals":{
                                		            "orderSubTotalBeforeTax":87.97,
                                		            "orderTax":0,
                                		            "orderDiscount":0,
                                		            "orderCharges":0,
                                		            "orderTotal":91.42
                                		         },
                                		         "promos":[
                                		            {
                                		               "promoId":"BUY1GET150%",
                                		               "promoGroup":"BOGOF",
                                		               "promoType":"priti"
                                		            }
                                		         ],
                                		         "buyerContactInfo":{
                                		            "firstName":"WENDY",
                                		            "lastName":"ZIESEMANN",
                                		            "address":{
                                		               "address1":"24 Green St",
                                		               "city":"Hudson",
                                		               "state":"MA",
                                		               "zip5":"01749",
                                		               "country":"US"
                                		            },
                                		            "primaryEmail":"wendyziesemann01749@thk.com",
                                		            "primaryPhone":"(000) 000-0423"
                                		         },
                                		         "billToContactInfo":{
                                		            "firstName":"WENDY",
                                		            "lastName":"ZIESEMANN",
                                		            "address":{
                                		               "address1":"24 Green St",
                                		               "city":"Hudson",
                                		               "state":"MA",
                                		               "zip5":"01749",
                                		               "country":"US"
                                		            },
                                		            "primaryEmail":"wendyziesemann01749@thk.com",
                                		            "primaryPhone":"(000) 000-0423"
                                		         },
                                		         "shipToContacts":[
                                		            {
                                		               "firstName":"WENDY",
                                		               "lastName":"ZIESEMANN",
                                		               "address":{
                                		                  "address1":"24 Green St",
                                		                  "city":"Hudson",
                                		                  "state":"MA",
                                		                  "zip5":"01749",
                                		                  "country":"US"
                                		               },
                                		               "primaryEmail":"wendyziesemann01749@thk.com",
                                		               "primaryPhone":"(000) 000-0423"
                                		            }
                                		         ],
                                		         "holds":[
                                		            {
                                		               "holdType":"dss",
                                		               "holdStatus":"open",
                                		               "holdReason":"fff"
                                		            }
                                		         ],
                                		         "timeDateReferences":[
                                		            {
                                		               "timeDateType":"eee",
                                		               "strDateValue":"2019-04-03T11:30:15-08:00"
                                		            }
                                		         ],
                                		         "messages":[
                                		            {
                                		               "messageType":"GiftMessage",
                                		               "messageText":"Hope You Enjoy This Gift!"
                                		            }
                                		         ],
                                		         "notes":[
                                		            {
                                		               "noteType":"PACKING_INSTRUCTIONS",
                                		               "noteText":"Test"
                                		            }
                                		         ],
                                		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                                		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                                		         "shippingCarrier":"FEDEX",
                                		         "carrierServiceType":"FedExGround",
                                		         "paymentTerms":"payterm",
                                		         "orderLookUpKey":"22226",
                                		         "shipFromSingleNode":true,
                                		         "taxExempt":true,
                                		         "taxExemptCertificate":"CERT",
                                		         "taxPayerId":"123456",
                                		         "orderSessionId":"session123"
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
                         		expect(response.statusCode).toBe(200);
                         		expect(response.body.orders[0].orderNumber).toContain(order+33);
                         		done();

                                 });
                             }),
                             
                             
                             it("TC - 34 -> Pass Messages", done =>{

                                 var options = {
                                     method: 'POST',
                                     url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                     headers: {
                                         'Content-Type': 'application/json',
                                         'Authorization': 'Bearer '+token
                                     },
                                     

                                    body: {
                                    	   "orders":[
                                    		      {
                                    		         "priority":"1",
                                    		         "orderDate":"2019-12-27T13:24:15-08:00",
                                    		         "orderNumber":order+34,
                                    		         "orderType":"salesOrder",
                                    		         "purchaseOrderNumber":"PUR-205",
                                    		         "channel":"B2B",
                                    		         "status":"DRAFT",
                                    		         "orderOrganization":"TheHonestKitchen-Organization-",
                                    		         "orderTransactionType":"Sales",
                                    		         "enteredBy":"priti",
                                    		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                                    		         "customer":{
                                    		            "customerId":"CustAQA002"
                                    		         },
                                    		         "lineItems":[
                                    		            {
                                    		               "lineNumber":1,
                                    		               "status":"OPEN",
                                    		               "retailerReferenceItemSKU":"aaa",
                                    		               "lineItemId":"AcuSKU1",
                                    		               "itemTitle":"AcuSKU1",
                                    		               "itemDescription":"Computers",
                                    		               "itemUnitOfMeasure":"EA",
                                    		               "itemUnitPrice":"10",
                                    		               "lineItemQty":1,
                                    		               "originalOrderedQty":1,
                                    		               "deliveryMethod":"shipToHome",
                                    		               "fulfillmentType":"ShipToHome",
                                    		               "fulfillmentSite":"joliet-dc",
                                    		               "reasonCode":"ABC",
                                    		               "bundleParent":true,
                                    		               "presell":false,
                                    		               "gift":true,
                                    		               "giftWrap":true,
                                    		               "shipFromSingleNode":true,
                                    		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                                    		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                                    		               "shippingCarrier":"FEDEX",
                                    		               "carrierServiceType":"FedExGround",
                                    		               "shipAlone":true,
                                    		               "shipComplete":true,
                                    		               "shipToContact":{
                                    		                  "firstName":"XYZ",
                                    		                  "lastName":"M",
                                    		                  "address":{
                                    		                     "address1":"3 Smoky Hollow Lane",
                                    		                     "city":"Deltona",
                                    		                     "state":"FL",
                                    		                     "zip5":"32725",
                                    		                     "country":"US"
                                    		                  },
                                    		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                                    		                  "primaryPhone":"456-456-4567"
                                    		               },
                                    		               "priceInfo":{
                                    		                  "unitPrice":77.99,
                                    		                  "retailPrice":77.99,
                                    		                  "listPrice":97.99
                                    		               },
                                    		               "lineCharges":[
                                    		                  {
                                    		                     "chargeCategory":"SHIPPING",
                                    		                     "chargeName":"SHIPPING",
                                    		                     "chargeAmount":6.99,
                                    		                     "originalChargeAmount":6.99
                                    		                  },
                                    		                  {
                                    		                     "chargeCategory":"SHIPPING",
                                    		                     "chargeName":"OVERSIZE_SHIPPING",
                                    		                     "chargeAmount":16.99,
                                    		                     "originalChargeAmount":16.99
                                    		                  }
                                    		               ],
                                    		               "lineDiscounts":[
                                    		                  {
                                    		                     "discountAmount":2.99,
                                    		                     "discountName":"ITEM_DISCOUNT",
                                    		                     "originalDiscountAmount":2.99
                                    		                  },
                                    		                  {
                                    		                     "discountAmount":2.99,
                                    		                     "discountName":"ORDER_DISCOUNT",
                                    		                     "originalDiscountAmount":2.99
                                    		                  }
                                    		               ],
                                    		               "lineTaxes":[
                                    		                  {
                                    		                     "taxName":"SALES_TAX",
                                    		                     "taxAmount":3.45,
                                    		                     "taxRate":5.75
                                    		                  },
                                    		                  {
                                    		                     "taxName":"SHIPPING_TAX",
                                    		                     "taxAmount":3.45,
                                    		                     "taxRate":5.75
                                    		                  }
                                    		               ],
                                    		               "lineTotals":{
                                    		                  "lineSubTotalBeforeTax":87.97,
                                    		                  "lineExtendedPrice":83.97,
                                    		                  "lineTax":3.45,
                                    		                  "lineDiscount":2.99,
                                    		                  "lineCharges":6.99,
                                    		                  "lineTotal":91.42
                                    		               },
                                    		               "promos":[
                                    		                  {
                                    		                     "promoId":"BUY1GET1Free",
                                    		                     "promoGroup":"BOGOF",
                                    		                     "promoType":"SELL"
                                    		                  },
                                    		                  {
                                    		                     "promoId":"BUY2GET1Free",
                                    		                     "promoGroup":"B2G1F",
                                    		                     "promoType":"SELLS"
                                    		                  }
                                    		               ],
                                    		               "messages":[
                                    		                  {
                                    		                     "messageType":"GiftMessage",
                                    		                     "messageText":"Hope You Enjoy This Gift!"
                                    		                  }
                                    		               ],
                                    		               "references":[
                                    		                  {
                                    		                     "type":"String",
                                    		                     "data":"pritilineref",
                                    		                     "value":"12",
                                    		                     "systemInd":"N",
                                    		                     "requiredInd":"Y"
                                    		                  },
                                    		                  {
                                    		                     "type":"Boolean",
                                    		                     "data":"pritilinerefBoolean",
                                    		                     "value":true,
                                    		                     "systemInd":"Y",
                                    		                     "requiredInd":"Y"
                                    		                  }
                                    		               ],
                                    		               "notes":[
                                    		                  {
                                    		                     "noteType":"aaa",
                                    		                     "noteText":"bbb note texxte"
                                    		                  }
                                    		               ],
                                    		               "holds":[
                                    		                  {
                                    		                     "holdType":"dss",
                                    		                     "holdStatus":"open",
                                    		                     "holdReason":"fff"
                                    		                  }
                                    		               ]
                                    		            }
                                    		         ],
                                    		         "referenceData":[
                                    		            {
                                    		               "type":"String",
                                    		               "data":"pritirefOrder",
                                    		               "value":"12"
                                    		            }
                                    		         ],
                                    		         "orderCharges":[
                                    		            {
                                    		               "chargeCategory":"050",
                                    		               "chargeName":"SHIPPING",
                                    		               "chargeAmount":95.87,
                                    		               "originalChargeAmount":94.48
                                    		            }
                                    		         ],
                                    		         "orderDiscounts":[
                                    		            {
                                    		               "discountName":"50%",
                                    		               "discountAmount":20,
                                    		               "originalDiscountAmount":25
                                    		            }
                                    		         ],
                                    		         "orderTaxes":[
                                    		            {
                                    		               "taxName":"VAT",
                                    		               "taxAmount":10,
                                    		               "taxRate":10
                                    		            }
                                    		         ],
                                    		         "orderTotals":{
                                    		            "orderSubTotalBeforeTax":87.97,
                                    		            "orderTax":0,
                                    		            "orderDiscount":0,
                                    		            "orderCharges":0,
                                    		            "orderTotal":91.42
                                    		         },
                                    		         "promos":[
                                    		            {
                                    		               "promoId":"BUY1GET150%",
                                    		               "promoGroup":"BOGOF",
                                    		               "promoType":"priti"
                                    		            }
                                    		         ],
                                    		         "buyerContactInfo":{
                                    		            "firstName":"WENDY",
                                    		            "lastName":"ZIESEMANN",
                                    		            "address":{
                                    		               "address1":"24 Green St",
                                    		               "city":"Hudson",
                                    		               "state":"MA",
                                    		               "zip5":"01749",
                                    		               "country":"US"
                                    		            },
                                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                                    		            "primaryPhone":"(000) 000-0423"
                                    		         },
                                    		         "billToContactInfo":{
                                    		            "firstName":"WENDY",
                                    		            "lastName":"ZIESEMANN",
                                    		            "address":{
                                    		               "address1":"24 Green St",
                                    		               "city":"Hudson",
                                    		               "state":"MA",
                                    		               "zip5":"01749",
                                    		               "country":"US"
                                    		            },
                                    		            "primaryEmail":"wendyziesemann01749@thk.com",
                                    		            "primaryPhone":"(000) 000-0423"
                                    		         },
                                    		         "shipToContacts":[
                                    		            {
                                    		               "firstName":"WENDY",
                                    		               "lastName":"ZIESEMANN",
                                    		               "address":{
                                    		                  "address1":"24 Green St",
                                    		                  "city":"Hudson",
                                    		                  "state":"MA",
                                    		                  "zip5":"01749",
                                    		                  "country":"US"
                                    		               },
                                    		               "primaryEmail":"wendyziesemann01749@thk.com",
                                    		               "primaryPhone":"(000) 000-0423"
                                    		            }
                                    		         ],
                                    		         "holds":[
                                    		            {
                                    		               "holdType":"dss",
                                    		               "holdStatus":"open",
                                    		               "holdReason":"fff"
                                    		            }
                                    		         ],
                                    		         "timeDateReferences":[
                                    		            {
                                    		               "timeDateType":"eee",
                                    		               "strDateValue":"2019-04-03T11:30:15-08:00"
                                    		            }
                                    		         ],
                                    		         "messages":[
                                    		            {
                                    		               "messageType":"GiftMessage",
                                    		               "messageText":"Hope You Enjoy This Gift!"
                                    		            }
                                    		         ],
                                    		         "notes":[
                                    		            {
                                    		               "noteType":"PACKING_INSTRUCTIONS",
                                    		               "noteText":"Test"
                                    		            }
                                    		         ],
                                    		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                                    		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                                    		         "shippingCarrier":"FEDEX",
                                    		         "carrierServiceType":"FedExGround",
                                    		         "paymentTerms":"payterm",
                                    		         "orderLookUpKey":"22226",
                                    		         "shipFromSingleNode":true,
                                    		         "taxExempt":true,
                                    		         "taxExemptCertificate":"CERT",
                                    		         "taxPayerId":"123456",
                                    		         "orderSessionId":"session123"
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
                             		expect(response.statusCode).toBe(200);
                             		expect(response.body.orders[0].orderNumber).toContain(order+34);
                             		done();

                                     });
                              }),
                              
                              
                              it("TC - 35 -> Pass notes", done =>{

                                  var options = {
                                      method: 'POST',
                                      url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                      headers: {
                                          'Content-Type': 'application/json',
                                          'Authorization': 'Bearer '+token
                                      },
                                      

                                     body: {
                                     	   "orders":[
                                     		      {
                                     		         "priority":"1",
                                     		         "orderDate":"2019-12-27T13:24:15-08:00",
                                     		         "orderNumber":order+35,
                                     		         "orderType":"salesOrder",
                                     		         "purchaseOrderNumber":"PUR-205",
                                     		         "channel":"B2B",
                                     		         "status":"DRAFT",
                                     		         "orderOrganization":"TheHonestKitchen-Organization-",
                                     		         "orderTransactionType":"Sales",
                                     		         "enteredBy":"priti",
                                     		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                                     		         "customer":{
                                     		            "customerId":"CustAQA002"
                                     		         },
                                     		         "lineItems":[
                                     		            {
                                     		               "lineNumber":1,
                                     		               "status":"OPEN",
                                     		               "retailerReferenceItemSKU":"aaa",
                                     		               "lineItemId":"AcuSKU1",
                                     		               "itemTitle":"AcuSKU1",
                                     		               "itemDescription":"Computers",
                                     		               "itemUnitOfMeasure":"EA",
                                     		               "itemUnitPrice":"10",
                                     		               "lineItemQty":1,
                                     		               "originalOrderedQty":1,
                                     		               "deliveryMethod":"shipToHome",
                                     		               "fulfillmentType":"ShipToHome",
                                     		               "fulfillmentSite":"joliet-dc",
                                     		               "reasonCode":"ABC",
                                     		               "bundleParent":true,
                                     		               "presell":false,
                                     		               "gift":true,
                                     		               "giftWrap":true,
                                     		               "shipFromSingleNode":true,
                                     		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                                     		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                                     		               "shippingCarrier":"FEDEX",
                                     		               "carrierServiceType":"FedExGround",
                                     		               "shipAlone":true,
                                     		               "shipComplete":true,
                                     		               "shipToContact":{
                                     		                  "firstName":"XYZ",
                                     		                  "lastName":"M",
                                     		                  "address":{
                                     		                     "address1":"3 Smoky Hollow Lane",
                                     		                     "city":"Deltona",
                                     		                     "state":"FL",
                                     		                     "zip5":"32725",
                                     		                     "country":"US"
                                     		                  },
                                     		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                                     		                  "primaryPhone":"456-456-4567"
                                     		               },
                                     		               "priceInfo":{
                                     		                  "unitPrice":77.99,
                                     		                  "retailPrice":77.99,
                                     		                  "listPrice":97.99
                                     		               },
                                     		               "lineCharges":[
                                     		                  {
                                     		                     "chargeCategory":"SHIPPING",
                                     		                     "chargeName":"SHIPPING",
                                     		                     "chargeAmount":6.99,
                                     		                     "originalChargeAmount":6.99
                                     		                  },
                                     		                  {
                                     		                     "chargeCategory":"SHIPPING",
                                     		                     "chargeName":"OVERSIZE_SHIPPING",
                                     		                     "chargeAmount":16.99,
                                     		                     "originalChargeAmount":16.99
                                     		                  }
                                     		               ],
                                     		               "lineDiscounts":[
                                     		                  {
                                     		                     "discountAmount":2.99,
                                     		                     "discountName":"ITEM_DISCOUNT",
                                     		                     "originalDiscountAmount":2.99
                                     		                  },
                                     		                  {
                                     		                     "discountAmount":2.99,
                                     		                     "discountName":"ORDER_DISCOUNT",
                                     		                     "originalDiscountAmount":2.99
                                     		                  }
                                     		               ],
                                     		               "lineTaxes":[
                                     		                  {
                                     		                     "taxName":"SALES_TAX",
                                     		                     "taxAmount":3.45,
                                     		                     "taxRate":5.75
                                     		                  },
                                     		                  {
                                     		                     "taxName":"SHIPPING_TAX",
                                     		                     "taxAmount":3.45,
                                     		                     "taxRate":5.75
                                     		                  }
                                     		               ],
                                     		               "lineTotals":{
                                     		                  "lineSubTotalBeforeTax":87.97,
                                     		                  "lineExtendedPrice":83.97,
                                     		                  "lineTax":3.45,
                                     		                  "lineDiscount":2.99,
                                     		                  "lineCharges":6.99,
                                     		                  "lineTotal":91.42
                                     		               },
                                     		               "promos":[
                                     		                  {
                                     		                     "promoId":"BUY1GET1Free",
                                     		                     "promoGroup":"BOGOF",
                                     		                     "promoType":"SELL"
                                     		                  },
                                     		                  {
                                     		                     "promoId":"BUY2GET1Free",
                                     		                     "promoGroup":"B2G1F",
                                     		                     "promoType":"SELLS"
                                     		                  }
                                     		               ],
                                     		               "messages":[
                                     		                  {
                                     		                     "messageType":"GiftMessage",
                                     		                     "messageText":"Hope You Enjoy This Gift!"
                                     		                  }
                                     		               ],
                                     		               "references":[
                                     		                  {
                                     		                     "type":"String",
                                     		                     "data":"pritilineref",
                                     		                     "value":"12",
                                     		                     "systemInd":"N",
                                     		                     "requiredInd":"Y"
                                     		                  },
                                     		                  {
                                     		                     "type":"Boolean",
                                     		                     "data":"pritilinerefBoolean",
                                     		                     "value":true,
                                     		                     "systemInd":"Y",
                                     		                     "requiredInd":"Y"
                                     		                  }
                                     		               ],
                                     		               "notes":[
                                     		                  {
                                     		                     "noteType":"aaa",
                                     		                     "noteText":"bbb note texxte"
                                     		                  }
                                     		               ],
                                     		               "holds":[
                                     		                  {
                                     		                     "holdType":"dss",
                                     		                     "holdStatus":"open",
                                     		                     "holdReason":"fff"
                                     		                  }
                                     		               ]
                                     		            }
                                     		         ],
                                     		         "referenceData":[
                                     		            {
                                     		               "type":"String",
                                     		               "data":"pritirefOrder",
                                     		               "value":"12"
                                     		            }
                                     		         ],
                                     		         "orderCharges":[
                                     		            {
                                     		               "chargeCategory":"050",
                                     		               "chargeName":"SHIPPING",
                                     		               "chargeAmount":95.87,
                                     		               "originalChargeAmount":94.48
                                     		            }
                                     		         ],
                                     		         "orderDiscounts":[
                                     		            {
                                     		               "discountName":"50%",
                                     		               "discountAmount":20,
                                     		               "originalDiscountAmount":25
                                     		            }
                                     		         ],
                                     		         "orderTaxes":[
                                     		            {
                                     		               "taxName":"VAT",
                                     		               "taxAmount":10,
                                     		               "taxRate":10
                                     		            }
                                     		         ],
                                     		         "orderTotals":{
                                     		            "orderSubTotalBeforeTax":87.97,
                                     		            "orderTax":0,
                                     		            "orderDiscount":0,
                                     		            "orderCharges":0,
                                     		            "orderTotal":91.42
                                     		         },
                                     		         "promos":[
                                     		            {
                                     		               "promoId":"BUY1GET150%",
                                     		               "promoGroup":"BOGOF",
                                     		               "promoType":"priti"
                                     		            }
                                     		         ],
                                     		         "buyerContactInfo":{
                                     		            "firstName":"WENDY",
                                     		            "lastName":"ZIESEMANN",
                                     		            "address":{
                                     		               "address1":"24 Green St",
                                     		               "city":"Hudson",
                                     		               "state":"MA",
                                     		               "zip5":"01749",
                                     		               "country":"US"
                                     		            },
                                     		            "primaryEmail":"wendyziesemann01749@thk.com",
                                     		            "primaryPhone":"(000) 000-0423"
                                     		         },
                                     		         "billToContactInfo":{
                                     		            "firstName":"WENDY",
                                     		            "lastName":"ZIESEMANN",
                                     		            "address":{
                                     		               "address1":"24 Green St",
                                     		               "city":"Hudson",
                                     		               "state":"MA",
                                     		               "zip5":"01749",
                                     		               "country":"US"
                                     		            },
                                     		            "primaryEmail":"wendyziesemann01749@thk.com",
                                     		            "primaryPhone":"(000) 000-0423"
                                     		         },
                                     		         "shipToContacts":[
                                     		            {
                                     		               "firstName":"WENDY",
                                     		               "lastName":"ZIESEMANN",
                                     		               "address":{
                                     		                  "address1":"24 Green St",
                                     		                  "city":"Hudson",
                                     		                  "state":"MA",
                                     		                  "zip5":"01749",
                                     		                  "country":"US"
                                     		               },
                                     		               "primaryEmail":"wendyziesemann01749@thk.com",
                                     		               "primaryPhone":"(000) 000-0423"
                                     		            }
                                     		         ],
                                     		         "holds":[
                                     		            {
                                     		               "holdType":"dss",
                                     		               "holdStatus":"open",
                                     		               "holdReason":"fff"
                                     		            }
                                     		         ],
                                     		         "timeDateReferences":[
                                     		            {
                                     		               "timeDateType":"eee",
                                     		               "strDateValue":"2019-04-03T11:30:15-08:00"
                                     		            }
                                     		         ],
                                     		         "messages":[
                                     		            {
                                     		               "messageType":"GiftMessage",
                                     		               "messageText":"Hope You Enjoy This Gift!"
                                     		            }
                                     		         ],
                                     		         "notes":[
                                     		            {
                                     		               "noteType":"PACKING_INSTRUCTIONS",
                                     		               "noteText":"Test"
                                     		            }
                                     		         ],
                                     		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                                     		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                                     		         "shippingCarrier":"FEDEX",
                                     		         "carrierServiceType":"FedExGround",
                                     		         "paymentTerms":"payterm",
                                     		         "orderLookUpKey":"22226",
                                     		         "shipFromSingleNode":true,
                                     		         "taxExempt":true,
                                     		         "taxExemptCertificate":"CERT",
                                     		         "taxPayerId":"123456",
                                     		         "orderSessionId":"session123"
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
                              		expect(response.statusCode).toBe(200);
                              		expect(response.body.orders[0].orderNumber).toContain(order+35);
                              		done();

                               });
                       }),
                       
                       
                       it("TC - 42 -> With reference data", done =>{

                           var options = {
                               method: 'POST',
                               url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                               headers: {
                                   'Content-Type': 'application/json',
                                   'Authorization': 'Bearer '+token
                               },
                               

                              body: {
                              	   "orders":[
                              		      {
                              		         "priority":"1",
                              		         "orderDate":"2019-12-27T13:24:15-08:00",
                              		         "orderNumber":order+42,
                              		         "orderType":"salesOrder",
                              		         "purchaseOrderNumber":"PUR-205",
                              		         "channel":"B2B",
                              		         "status":"DRAFT",
                              		         "orderOrganization":"TheHonestKitchen-Organization-",
                              		         "orderTransactionType":"Sales",
                              		         "enteredBy":"priti",
                              		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                              		         "customer":{
                              		            "customerId":"CustAQA002"
                              		         },
                              		         "lineItems":[
                              		            {
                              		               "lineNumber":1,
                              		               "status":"OPEN",
                              		               "retailerReferenceItemSKU":"aaa",
                              		               "lineItemId":"AcuSKU1",
                              		               "itemTitle":"AcuSKU1",
                              		               "itemDescription":"Computers",
                              		               "itemUnitOfMeasure":"EA",
                              		               "itemUnitPrice":"10",
                              		               "lineItemQty":1,
                              		               "originalOrderedQty":1,
                              		               "deliveryMethod":"shipToHome",
                              		               "fulfillmentType":"ShipToHome",
                              		               "fulfillmentSite":"joliet-dc",
                              		               "reasonCode":"ABC",
                              		               "bundleParent":true,
                              		               "presell":false,
                              		               "gift":true,
                              		               "giftWrap":true,
                              		               "shipFromSingleNode":true,
                              		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                              		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                              		               "shippingCarrier":"FEDEX",
                              		               "carrierServiceType":"FedExGround",
                              		               "shipAlone":true,
                              		               "shipComplete":true,
                              		               "shipToContact":{
                              		                  "firstName":"XYZ",
                              		                  "lastName":"M",
                              		                  "address":{
                              		                     "address1":"3 Smoky Hollow Lane",
                              		                     "city":"Deltona",
                              		                     "state":"FL",
                              		                     "zip5":"32725",
                              		                     "country":"US"
                              		                  },
                              		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                              		                  "primaryPhone":"456-456-4567"
                              		               },
                              		               "priceInfo":{
                              		                  "unitPrice":77.99,
                              		                  "retailPrice":77.99,
                              		                  "listPrice":97.99
                              		               },
                              		               "lineCharges":[
                              		                  {
                              		                     "chargeCategory":"SHIPPING",
                              		                     "chargeName":"SHIPPING",
                              		                     "chargeAmount":6.99,
                              		                     "originalChargeAmount":6.99
                              		                  },
                              		                  {
                              		                     "chargeCategory":"SHIPPING",
                              		                     "chargeName":"OVERSIZE_SHIPPING",
                              		                     "chargeAmount":16.99,
                              		                     "originalChargeAmount":16.99
                              		                  }
                              		               ],
                              		               "lineDiscounts":[
                              		                  {
                              		                     "discountAmount":2.99,
                              		                     "discountName":"ITEM_DISCOUNT",
                              		                     "originalDiscountAmount":2.99
                              		                  },
                              		                  {
                              		                     "discountAmount":2.99,
                              		                     "discountName":"ORDER_DISCOUNT",
                              		                     "originalDiscountAmount":2.99
                              		                  }
                              		               ],
                              		               "lineTaxes":[
                              		                  {
                              		                     "taxName":"SALES_TAX",
                              		                     "taxAmount":3.45,
                              		                     "taxRate":5.75
                              		                  },
                              		                  {
                              		                     "taxName":"SHIPPING_TAX",
                              		                     "taxAmount":3.45,
                              		                     "taxRate":5.75
                              		                  }
                              		               ],
                              		               "lineTotals":{
                              		                  "lineSubTotalBeforeTax":87.97,
                              		                  "lineExtendedPrice":83.97,
                              		                  "lineTax":3.45,
                              		                  "lineDiscount":2.99,
                              		                  "lineCharges":6.99,
                              		                  "lineTotal":91.42
                              		               },
                              		               "promos":[
                              		                  {
                              		                     "promoId":"BUY1GET1Free",
                              		                     "promoGroup":"BOGOF",
                              		                     "promoType":"SELL"
                              		                  },
                              		                  {
                              		                     "promoId":"BUY2GET1Free",
                              		                     "promoGroup":"B2G1F",
                              		                     "promoType":"SELLS"
                              		                  }
                              		               ],
                              		               "messages":[
                              		                  {
                              		                     "messageType":"GiftMessage",
                              		                     "messageText":"Hope You Enjoy This Gift!"
                              		                  }
                              		               ],
                              		               "references":[
                              		                  {
                              		                     "type":"String",
                              		                     "data":"pritilineref",
                              		                     "value":"12",
                              		                     "systemInd":"N",
                              		                     "requiredInd":"Y"
                              		                  },
                              		                  {
                              		                     "type":"Boolean",
                              		                     "data":"pritilinerefBoolean",
                              		                     "value":true,
                              		                     "systemInd":"Y",
                              		                     "requiredInd":"Y"
                              		                  }
                              		               ],
                              		               "notes":[
                              		                  {
                              		                     "noteType":"aaa",
                              		                     "noteText":"bbb note texxte"
                              		                  }
                              		               ],
                              		               "holds":[
                              		                  {
                              		                     "holdType":"dss",
                              		                     "holdStatus":"open",
                              		                     "holdReason":"fff"
                              		                  }
                              		               ]
                              		            }
                              		         ],
                              		         "referenceData":[
                              		            {
                              		               "type":"String",
                              		               "data":"pritirefOrder",
                              		               "value":"12"
                              		            }
                              		         ],
                              		         "orderCharges":[
                              		            {
                              		               "chargeCategory":"050",
                              		               "chargeName":"SHIPPING",
                              		               "chargeAmount":95.87,
                              		               "originalChargeAmount":94.48
                              		            }
                              		         ],
                              		         "orderDiscounts":[
                              		            {
                              		               "discountName":"50%",
                              		               "discountAmount":20,
                              		               "originalDiscountAmount":25
                              		            }
                              		         ],
                              		         "orderTaxes":[
                              		            {
                              		               "taxName":"VAT",
                              		               "taxAmount":10,
                              		               "taxRate":10
                              		            }
                              		         ],
                              		         "orderTotals":{
                              		            "orderSubTotalBeforeTax":87.97,
                              		            "orderTax":0,
                              		            "orderDiscount":0,
                              		            "orderCharges":0,
                              		            "orderTotal":91.42
                              		         },
                              		         "promos":[
                              		            {
                              		               "promoId":"BUY1GET150%",
                              		               "promoGroup":"BOGOF",
                              		               "promoType":"priti"
                              		            }
                              		         ],
                              		         "buyerContactInfo":{
                              		            "firstName":"WENDY",
                              		            "lastName":"ZIESEMANN",
                              		            "address":{
                              		               "address1":"24 Green St",
                              		               "city":"Hudson",
                              		               "state":"MA",
                              		               "zip5":"01749",
                              		               "country":"US"
                              		            },
                              		            "primaryEmail":"wendyziesemann01749@thk.com",
                              		            "primaryPhone":"(000) 000-0423"
                              		         },
                              		         "billToContactInfo":{
                              		            "firstName":"WENDY",
                              		            "lastName":"ZIESEMANN",
                              		            "address":{
                              		               "address1":"24 Green St",
                              		               "city":"Hudson",
                              		               "state":"MA",
                              		               "zip5":"01749",
                              		               "country":"US"
                              		            },
                              		            "primaryEmail":"wendyziesemann01749@thk.com",
                              		            "primaryPhone":"(000) 000-0423"
                              		         },
                              		         "shipToContacts":[
                              		            {
                              		               "firstName":"WENDY",
                              		               "lastName":"ZIESEMANN",
                              		               "address":{
                              		                  "address1":"24 Green St",
                              		                  "city":"Hudson",
                              		                  "state":"MA",
                              		                  "zip5":"01749",
                              		                  "country":"US"
                              		               },
                              		               "primaryEmail":"wendyziesemann01749@thk.com",
                              		               "primaryPhone":"(000) 000-0423"
                              		            }
                              		         ],
                              		         "holds":[
                              		            {
                              		               "holdType":"dss",
                              		               "holdStatus":"open",
                              		               "holdReason":"fff"
                              		            }
                              		         ],
                              		         "timeDateReferences":[
                              		            {
                              		               "timeDateType":"eee",
                              		               "strDateValue":"2019-04-03T11:30:15-08:00"
                              		            }
                              		         ],
                              		         "messages":[
                              		            {
                              		               "messageType":"GiftMessage",
                              		               "messageText":"Hope You Enjoy This Gift!"
                              		            }
                              		         ],
                              		         "notes":[
                              		            {
                              		               "noteType":"PACKING_INSTRUCTIONS",
                              		               "noteText":"Test"
                              		            }
                              		         ],
                              		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                              		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                              		         "shippingCarrier":"FEDEX",
                              		         "carrierServiceType":"FedExGround",
                              		         "paymentTerms":"payterm",
                              		         "orderLookUpKey":"22226",
                              		         "shipFromSingleNode":true,
                              		         "taxExempt":true,
                              		         "taxExemptCertificate":"CERT",
                              		         "taxPayerId":"123456",
                              		         "orderSessionId":"session123"
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
                       		expect(response.statusCode).toBe(200);
                       		expect(response.body.orders[0].orderNumber).toContain(order+42);
                       		done();

                        });
                 }),
                 
                 
                 
                 
                 
                 it("TC - 43 -> Item title that doesn't exist in system for that sku", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: {
                        	   "orders":[
                        		      {
                        		         "priority":"1",
                        		         "orderDate":"2019-12-27T13:24:15-08:00",
                        		         "orderNumber":order+43,
                        		         "orderType":"salesOrder",
                        		         "purchaseOrderNumber":"PUR-205",
                        		         "channel":"B2B",
                        		         "status":"DRAFT",
                        		         "orderOrganization":"TheHonestKitchen-Organization-",
                        		         "orderTransactionType":"Sales",
                        		         "enteredBy":"priti",
                        		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                        		         "customer":{
                        		            "customerId":"CustAQA002"
                        		         },
                        		         "lineItems":[
                        		            {
                        		               "lineNumber":1,
                        		               "status":"OPEN",
                        		               "retailerReferenceItemSKU":"aaa",
                        		               "lineItemId":"xyzabc123",
                        		               "itemTitle":"AcuSKU1",
                        		               "itemDescription":"Computers",
                        		               "itemUnitOfMeasure":"EA",
                        		               "itemUnitPrice":"10",
                        		               "lineItemQty":1,
                        		               "originalOrderedQty":1,
                        		               "deliveryMethod":"shipToHome",
                        		               "fulfillmentType":"ShipToHome",
                        		               "fulfillmentSite":"joliet-dc",
                        		               "reasonCode":"ABC",
                        		               "bundleParent":true,
                        		               "presell":false,
                        		               "gift":true,
                        		               "giftWrap":true,
                        		               "shipFromSingleNode":true,
                        		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                        		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                        		               "shippingCarrier":"FEDEX",
                        		               "carrierServiceType":"FedExGround",
                        		               "shipAlone":true,
                        		               "shipComplete":true,
                        		               "shipToContact":{
                        		                  "firstName":"XYZ",
                        		                  "lastName":"M",
                        		                  "address":{
                        		                     "address1":"3 Smoky Hollow Lane",
                        		                     "city":"Deltona",
                        		                     "state":"FL",
                        		                     "zip5":"32725",
                        		                     "country":"US"
                        		                  },
                        		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                        		                  "primaryPhone":"456-456-4567"
                        		               },
                        		               "priceInfo":{
                        		                  "unitPrice":77.99,
                        		                  "retailPrice":77.99,
                        		                  "listPrice":97.99
                        		               },
                        		               "lineCharges":[
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"SHIPPING",
                        		                     "chargeAmount":6.99,
                        		                     "originalChargeAmount":6.99
                        		                  },
                        		                  {
                        		                     "chargeCategory":"SHIPPING",
                        		                     "chargeName":"OVERSIZE_SHIPPING",
                        		                     "chargeAmount":16.99,
                        		                     "originalChargeAmount":16.99
                        		                  }
                        		               ],
                        		               "lineDiscounts":[
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ITEM_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  },
                        		                  {
                        		                     "discountAmount":2.99,
                        		                     "discountName":"ORDER_DISCOUNT",
                        		                     "originalDiscountAmount":2.99
                        		                  }
                        		               ],
                        		               "lineTaxes":[
                        		                  {
                        		                     "taxName":"SALES_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  },
                        		                  {
                        		                     "taxName":"SHIPPING_TAX",
                        		                     "taxAmount":3.45,
                        		                     "taxRate":5.75
                        		                  }
                        		               ],
                        		               "lineTotals":{
                        		                  "lineSubTotalBeforeTax":87.97,
                        		                  "lineExtendedPrice":83.97,
                        		                  "lineTax":3.45,
                        		                  "lineDiscount":2.99,
                        		                  "lineCharges":6.99,
                        		                  "lineTotal":91.42
                        		               },
                        		               "promos":[
                        		                  {
                        		                     "promoId":"BUY1GET1Free",
                        		                     "promoGroup":"BOGOF",
                        		                     "promoType":"SELL"
                        		                  },
                        		                  {
                        		                     "promoId":"BUY2GET1Free",
                        		                     "promoGroup":"B2G1F",
                        		                     "promoType":"SELLS"
                        		                  }
                        		               ],
                        		               "messages":[
                        		                  {
                        		                     "messageType":"GiftMessage",
                        		                     "messageText":"Hope You Enjoy This Gift!"
                        		                  }
                        		               ],
                        		               "references":[
                        		                  {
                        		                     "type":"String",
                        		                     "data":"pritilineref",
                        		                     "value":"12",
                        		                     "systemInd":"N",
                        		                     "requiredInd":"Y"
                        		                  },
                        		                  {
                        		                     "type":"Boolean",
                        		                     "data":"pritilinerefBoolean",
                        		                     "value":true,
                        		                     "systemInd":"Y",
                        		                     "requiredInd":"Y"
                        		                  }
                        		               ],
                        		               "notes":[
                        		                  {
                        		                     "noteType":"aaa",
                        		                     "noteText":"bbb note texxte"
                        		                  }
                        		               ],
                        		               "holds":[
                        		                  {
                        		                     "holdType":"dss",
                        		                     "holdStatus":"open",
                        		                     "holdReason":"fff"
                        		                  }
                        		               ]
                        		            }
                        		         ],
                        		         "referenceData":[
                        		            {
                        		               "type":"String",
                        		               "data":"pritirefOrder",
                        		               "value":"12"
                        		            }
                        		         ],
                        		         "orderCharges":[
                        		            {
                        		               "chargeCategory":"050",
                        		               "chargeName":"SHIPPING",
                        		               "chargeAmount":95.87,
                        		               "originalChargeAmount":94.48
                        		            }
                        		         ],
                        		         "orderDiscounts":[
                        		            {
                        		               "discountName":"50%",
                        		               "discountAmount":20,
                        		               "originalDiscountAmount":25
                        		            }
                        		         ],
                        		         "orderTaxes":[
                        		            {
                        		               "taxName":"VAT",
                        		               "taxAmount":10,
                        		               "taxRate":10
                        		            }
                        		         ],
                        		         "orderTotals":{
                        		            "orderSubTotalBeforeTax":87.97,
                        		            "orderTax":0,
                        		            "orderDiscount":0,
                        		            "orderCharges":0,
                        		            "orderTotal":91.42
                        		         },
                        		         "promos":[
                        		            {
                        		               "promoId":"BUY1GET150%",
                        		               "promoGroup":"BOGOF",
                        		               "promoType":"priti"
                        		            }
                        		         ],
                        		         "buyerContactInfo":{
                        		            "firstName":"WENDY",
                        		            "lastName":"ZIESEMANN",
                        		            "address":{
                        		               "address1":"24 Green St",
                        		               "city":"Hudson",
                        		               "state":"MA",
                        		               "zip5":"01749",
                        		               "country":"US"
                        		            },
                        		            "primaryEmail":"wendyziesemann01749@thk.com",
                        		            "primaryPhone":"(000) 000-0423"
                        		         },
                        		         "billToContactInfo":{
                        		            "firstName":"WENDY",
                        		            "lastName":"ZIESEMANN",
                        		            "address":{
                        		               "address1":"24 Green St",
                        		               "city":"Hudson",
                        		               "state":"MA",
                        		               "zip5":"01749",
                        		               "country":"US"
                        		            },
                        		            "primaryEmail":"wendyziesemann01749@thk.com",
                        		            "primaryPhone":"(000) 000-0423"
                        		         },
                        		         "shipToContacts":[
                        		            {
                        		               "firstName":"WENDY",
                        		               "lastName":"ZIESEMANN",
                        		               "address":{
                        		                  "address1":"24 Green St",
                        		                  "city":"Hudson",
                        		                  "state":"MA",
                        		                  "zip5":"01749",
                        		                  "country":"US"
                        		               },
                        		               "primaryEmail":"wendyziesemann01749@thk.com",
                        		               "primaryPhone":"(000) 000-0423"
                        		            }
                        		         ],
                        		         "holds":[
                        		            {
                        		               "holdType":"dss",
                        		               "holdStatus":"open",
                        		               "holdReason":"fff"
                        		            }
                        		         ],
                        		         "timeDateReferences":[
                        		            {
                        		               "timeDateType":"eee",
                        		               "strDateValue":"2019-04-03T11:30:15-08:00"
                        		            }
                        		         ],
                        		         "messages":[
                        		            {
                        		               "messageType":"GiftMessage",
                        		               "messageText":"Hope You Enjoy This Gift!"
                        		            }
                        		         ],
                        		         "notes":[
                        		            {
                        		               "noteType":"PACKING_INSTRUCTIONS",
                        		               "noteText":"Test"
                        		            }
                        		         ],
                        		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                        		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                        		         "shippingCarrier":"FEDEX",
                        		         "carrierServiceType":"FedExGround",
                        		         "paymentTerms":"payterm",
                        		         "orderLookUpKey":"22226",
                        		         "shipFromSingleNode":true,
                        		         "taxExempt":true,
                        		         "taxExemptCertificate":"CERT",
                        		         "taxPayerId":"123456",
                        		         "orderSessionId":"session123"
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
                 		expect(response.statusCode).toBe(200);
                 		expect(response.body.orders[0].orderNumber).toContain(order+43);
                 		done();

                  });
           }),
           
           
           
           
           
           
           it("TC - 44 -> With all fields", done =>{

               var options = {
                   method: 'POST',
                   url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer '+token
                   },
                   

                  body: {
                  	   "orders":[
                  		      {
                  		         "priority":"1",
                  		         "orderDate":"2019-12-27T13:24:15-08:00",
                  		         "orderNumber":order+42,
                  		         "orderType":"salesOrder",
                  		         "purchaseOrderNumber":"PUR-205",
                  		         "channel":"B2B",
                  		         "status":"DRAFT",
                  		         "orderOrganization":"TheHonestKitchen-Organization-",
                  		         "orderTransactionType":"Sales",
                  		         "enteredBy":"priti",
                  		         "enspireCreateDate":"2019-12-27T11:30:15-08:00",
                  		         "customer":{
                  		            "customerId":"CustAQA002"
                  		         },
                  		         "lineItems":[
                  		            {
                  		               "lineNumber":1,
                  		               "status":"OPEN",
                  		               "retailerReferenceItemSKU":"aaa",
                  		               "lineItemId":"AcuSKU1",
                  		               "itemTitle":"AcuSKU1",
                  		               "itemDescription":"Computers",
                  		               "itemUnitOfMeasure":"EA",
                  		               "itemUnitPrice":"10",
                  		               "lineItemQty":1,
                  		               "originalOrderedQty":1,
                  		               "deliveryMethod":"shipToHome",
                  		               "fulfillmentType":"ShipToHome",
                  		               "fulfillmentSite":"joliet-dc",
                  		               "reasonCode":"ABC",
                  		               "bundleParent":true,
                  		               "presell":false,
                  		               "gift":true,
                  		               "giftWrap":true,
                  		               "shipFromSingleNode":true,
                  		               "expectedShipDate":"2019-03-07T11:30:15-08:00",
                  		               "expectedDeliveryDate":"2019-03-08T11:30:15-08:00",
                  		               "shippingCarrier":"FEDEX",
                  		               "carrierServiceType":"FedExGround",
                  		               "shipAlone":true,
                  		               "shipComplete":true,
                  		               "shipToContact":{
                  		                  "firstName":"XYZ",
                  		                  "lastName":"M",
                  		                  "address":{
                  		                     "address1":"3 Smoky Hollow Lane",
                  		                     "city":"Deltona",
                  		                     "state":"FL",
                  		                     "zip5":"32725",
                  		                     "country":"US"
                  		                  },
                  		                  "primaryEmail":"anshuman.mohapatra@omnichannel.com",
                  		                  "primaryPhone":"456-456-4567"
                  		               },
                  		               "priceInfo":{
                  		                  "unitPrice":77.99,
                  		                  "retailPrice":77.99,
                  		                  "listPrice":97.99
                  		               },
                  		               "lineCharges":[
                  		                  {
                  		                     "chargeCategory":"SHIPPING",
                  		                     "chargeName":"SHIPPING",
                  		                     "chargeAmount":6.99,
                  		                     "originalChargeAmount":6.99
                  		                  },
                  		                  {
                  		                     "chargeCategory":"SHIPPING",
                  		                     "chargeName":"OVERSIZE_SHIPPING",
                  		                     "chargeAmount":16.99,
                  		                     "originalChargeAmount":16.99
                  		                  }
                  		               ],
                  		               "lineDiscounts":[
                  		                  {
                  		                     "discountAmount":2.99,
                  		                     "discountName":"ITEM_DISCOUNT",
                  		                     "originalDiscountAmount":2.99
                  		                  },
                  		                  {
                  		                     "discountAmount":2.99,
                  		                     "discountName":"ORDER_DISCOUNT",
                  		                     "originalDiscountAmount":2.99
                  		                  }
                  		               ],
                  		               "lineTaxes":[
                  		                  {
                  		                     "taxName":"SALES_TAX",
                  		                     "taxAmount":3.45,
                  		                     "taxRate":5.75
                  		                  },
                  		                  {
                  		                     "taxName":"SHIPPING_TAX",
                  		                     "taxAmount":3.45,
                  		                     "taxRate":5.75
                  		                  }
                  		               ],
                  		               "lineTotals":{
                  		                  "lineSubTotalBeforeTax":87.97,
                  		                  "lineExtendedPrice":83.97,
                  		                  "lineTax":3.45,
                  		                  "lineDiscount":2.99,
                  		                  "lineCharges":6.99,
                  		                  "lineTotal":91.42
                  		               },
                  		               "promos":[
                  		                  {
                  		                     "promoId":"BUY1GET1Free",
                  		                     "promoGroup":"BOGOF",
                  		                     "promoType":"SELL"
                  		                  },
                  		                  {
                  		                     "promoId":"BUY2GET1Free",
                  		                     "promoGroup":"B2G1F",
                  		                     "promoType":"SELLS"
                  		                  }
                  		               ],
                  		               "messages":[
                  		                  {
                  		                     "messageType":"GiftMessage",
                  		                     "messageText":"Hope You Enjoy This Gift!"
                  		                  }
                  		               ],
                  		               "references":[
                  		                  {
                  		                     "type":"String",
                  		                     "data":"pritilineref",
                  		                     "value":"12",
                  		                     "systemInd":"N",
                  		                     "requiredInd":"Y"
                  		                  },
                  		                  {
                  		                     "type":"Boolean",
                  		                     "data":"pritilinerefBoolean",
                  		                     "value":true,
                  		                     "systemInd":"Y",
                  		                     "requiredInd":"Y"
                  		                  }
                  		               ],
                  		               "notes":[
                  		                  {
                  		                     "noteType":"aaa",
                  		                     "noteText":"bbb note texxte"
                  		                  }
                  		               ],
                  		               "holds":[
                  		                  {
                  		                     "holdType":"dss",
                  		                     "holdStatus":"open",
                  		                     "holdReason":"fff"
                  		                  }
                  		               ]
                  		            }
                  		         ],
                  		         "referenceData":[
                  		            {
                  		               "type":"String",
                  		               "data":"pritirefOrder",
                  		               "value":"12"
                  		            }
                  		         ],
                  		         "orderCharges":[
                  		            {
                  		               "chargeCategory":"050",
                  		               "chargeName":"SHIPPING",
                  		               "chargeAmount":95.87,
                  		               "originalChargeAmount":94.48
                  		            }
                  		         ],
                  		         "orderDiscounts":[
                  		            {
                  		               "discountName":"50%",
                  		               "discountAmount":20,
                  		               "originalDiscountAmount":25
                  		            }
                  		         ],
                  		         "orderTaxes":[
                  		            {
                  		               "taxName":"VAT",
                  		               "taxAmount":10,
                  		               "taxRate":10
                  		            }
                  		         ],
                  		         "orderTotals":{
                  		            "orderSubTotalBeforeTax":87.97,
                  		            "orderTax":0,
                  		            "orderDiscount":0,
                  		            "orderCharges":0,
                  		            "orderTotal":91.42
                  		         },
                  		         "promos":[
                  		            {
                  		               "promoId":"BUY1GET150%",
                  		               "promoGroup":"BOGOF",
                  		               "promoType":"priti"
                  		            }
                  		         ],
                  		         "buyerContactInfo":{
                  		            "firstName":"WENDY",
                  		            "lastName":"ZIESEMANN",
                  		            "address":{
                  		               "address1":"24 Green St",
                  		               "city":"Hudson",
                  		               "state":"MA",
                  		               "zip5":"01749",
                  		               "country":"US"
                  		            },
                  		            "primaryEmail":"wendyziesemann01749@thk.com",
                  		            "primaryPhone":"(000) 000-0423"
                  		         },
                  		         "billToContactInfo":{
                  		            "firstName":"WENDY",
                  		            "lastName":"ZIESEMANN",
                  		            "address":{
                  		               "address1":"24 Green St",
                  		               "city":"Hudson",
                  		               "state":"MA",
                  		               "zip5":"01749",
                  		               "country":"US"
                  		            },
                  		            "primaryEmail":"wendyziesemann01749@thk.com",
                  		            "primaryPhone":"(000) 000-0423"
                  		         },
                  		         "shipToContacts":[
                  		            {
                  		               "firstName":"WENDY",
                  		               "lastName":"ZIESEMANN",
                  		               "address":{
                  		                  "address1":"24 Green St",
                  		                  "city":"Hudson",
                  		                  "state":"MA",
                  		                  "zip5":"01749",
                  		                  "country":"US"
                  		               },
                  		               "primaryEmail":"wendyziesemann01749@thk.com",
                  		               "primaryPhone":"(000) 000-0423"
                  		            }
                  		         ],
                  		         "holds":[
                  		            {
                  		               "holdType":"dss",
                  		               "holdStatus":"open",
                  		               "holdReason":"fff"
                  		            }
                  		         ],
                  		         "timeDateReferences":[
                  		            {
                  		               "timeDateType":"eee",
                  		               "strDateValue":"2019-04-03T11:30:15-08:00"
                  		            }
                  		         ],
                  		         "messages":[
                  		            {
                  		               "messageType":"GiftMessage",
                  		               "messageText":"Hope You Enjoy This Gift!"
                  		            }
                  		         ],
                  		         "notes":[
                  		            {
                  		               "noteType":"PACKING_INSTRUCTIONS",
                  		               "noteText":"Test"
                  		            }
                  		         ],
                  		         "expectedShipDate":"2019-12-30T11:30:15-08:00",
                  		         "expectedDeliveryDate":"2019-12-30T11:30:15-08:00",
                  		         "shippingCarrier":"FEDEX",
                  		         "carrierServiceType":"FedExGround",
                  		         "paymentTerms":"payterm",
                  		         "orderLookUpKey":"22226",
                  		         "shipFromSingleNode":true,
                  		         "taxExempt":true,
                  		         "taxExemptCertificate":"CERT",
                  		         "taxPayerId":"123456",
                  		         "orderSessionId":"session123"
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
           		expect(response.statusCode).toBe(200);
           		expect(response.body.orders[0].orderNumber).toContain(order+44);
           		done();

            });
     })
                         
});

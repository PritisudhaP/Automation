const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');

describe( "Service Return Order Creation", function () {

    it("TC - 03 -> Without order date", done =>{

    var options = {
        method: 'POST',
        url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        

       body: {
    	   "orders": [{
    		   "orderNumber":order,
    		   "channel": "B2B",
    		   "orderOrganization": "TheHonestKitchen-Organization-",
    		   "orderTransactionType": "Return",
    		    "returnSite":"joliet-dc",
    		   "lineItems": [
    		   {
    		   "lineNumber": 1,
    		   "status":"OPEN",
    		   "lineItemId": "AcuSKU2",
    		   "lineItemQty": 1,
    		   "originalOrderedQty": 1,
    		   "originalLine":{
    		       "orderNo":"000000013796",
    		       "orderOrganization":"TheHonestKitchen-Organization-",
    		       "lineNumber":1,
    		       "shipmentRequestNo":""
    		     },
    		   "returnFrom":
    		   {
    		   "firstName": "ram",
    		   "lastName": "Das",
    		   "address": {
    		   "address1": "2259  Watson Street",
    		   "city": "Maple Shade",
    		   "state": "NJ",
    		   "zip5": "08052",
    		   "country": "US"
    		   },
    		   "primaryEmail": "pspso@enspirecommerce.com",
    		   "primaryPhone": "516-476-8612"
    		   }
    		   ,
    		   "priceInfo": {
    		   "unitPrice": 77.99,
    		   "retailPrice": 77.99,
    		   "listPrice": 97.99
    		   },
    		   "returnTo": {
    		   "firstName": "Sita",
    		   "lastName": "P",
    		   "primaryEmail": "sita@enspirecommerce.com",
    		   "primaryPhone": "546-345-6450",
    		   "address": {
    		   "address1": "4061  Oakmound Drive",
    		   "city": "Chicago",
    		   "state": "IL",
    		   "zip5": "60620",
    		   "country": "US"
    		   }
    		   }
    		   }
    		   ],
    		   "returnFrom":
    		   {
    		   "firstName": "ram",
    		   "lastName": "Das",
    		   "address": {
    		   "address1": "2259  Watson Street",
    		   "city": "Maple Shade",
    		   "state": "NJ",
    		   "zip5": "08052",
    		   "country": "US"
    		   },
    		   "primaryEmail": "pspso@enspirecommerce.com",
    		   "primaryPhone": "516-476-8612"
    		   }
    		   ,
    		   "priceInfo": {
    		   "unitPrice": 77.99,
    		   "retailPrice": 77.99,
    		   "listPrice": 97.99
    		   },
    		   "returnTo": {
    		   "firstName": "Sita",
    		   "lastName": "P",
    		   "primaryEmail": "sita@enspirecommerce.com",
    		   "primaryPhone": "546-345-6450",
    		   "address": {
    		   "address1": "4061  Oakmound Drive",
    		   "city": "Chicago",
    		   "state": "IL",
    		   "zip5": "60620",
    		   "country": "US"
    		   }
    		   },
    		   "billToContactInfo": {
    		           "firstName": "Manoj",
    		           "lastName": "Sahu",
    		           "primaryEmail": "manoj@enspirecommerce.com",
    		           "primaryPhone": "546-345-6458",
    		           "address": {
    		             "address1": "3822  Todds Lane",
    		             "city": "San Antonio",
    		             "state": "TX",
    		             "zip5": "78212",
    		             "country": "US"
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
		expect(response.body.developerMessage).toContain("orderDate: may not be empty");
		done();

        });
    }),
    
    
    it("TC - 04 -> Without channel", done =>{

        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            

           body: {
        	   "orders": [{
        		   "orderDate":"2019-03-05T13:24:15-08:00",
        		   "orderNumber":order,
        		   "orderOrganization": "TheHonestKitchen-Organization-",
        		   "orderTransactionType": "Return",
        		    "returnSite":"joliet-dc",
        		   "lineItems": [
        		   {
        		   "lineNumber": 1,
        		   "status":"OPEN",
        		   "lineItemId": "AcuSKU2",
        		   "lineItemQty": 1,
        		   "originalOrderedQty": 1,
        		   "originalLine":{
        		       "orderNo":"000000013796",
        		       "orderOrganization":"TheHonestKitchen-Organization-",
        		       "lineNumber":1,
        		       "shipmentRequestNo":""
        		     },
        		   "returnFrom":
        		   {
        		   "firstName": "ram",
        		   "lastName": "Das",
        		   "address": {
        		   "address1": "2259  Watson Street",
        		   "city": "Maple Shade",
        		   "state": "NJ",
        		   "zip5": "08052",
        		   "country": "US"
        		   },
        		   "primaryEmail": "pspso@enspirecommerce.com",
        		   "primaryPhone": "516-476-8612"
        		   }
        		   ,
        		   "priceInfo": {
        		   "unitPrice": 77.99,
        		   "retailPrice": 77.99,
        		   "listPrice": 97.99
        		   },
        		   "returnTo": {
        		   "firstName": "Sita",
        		   "lastName": "P",
        		   "primaryEmail": "sita@enspirecommerce.com",
        		   "primaryPhone": "546-345-6450",
        		   "address": {
        		   "address1": "4061  Oakmound Drive",
        		   "city": "Chicago",
        		   "state": "IL",
        		   "zip5": "60620",
        		   "country": "US"
        		   }
        		   }
        		   }
        		   ],
        		   "returnFrom":
        		   {
        		   "firstName": "ram",
        		   "lastName": "Das",
        		   "address": {
        		   "address1": "2259  Watson Street",
        		   "city": "Maple Shade",
        		   "state": "NJ",
        		   "zip5": "08052",
        		   "country": "US"
        		   },
        		   "primaryEmail": "pspso@enspirecommerce.com",
        		   "primaryPhone": "516-476-8612"
        		   }
        		   ,
        		   "priceInfo": {
        		   "unitPrice": 77.99,
        		   "retailPrice": 77.99,
        		   "listPrice": 97.99
        		   },
        		   "returnTo": {
        		   "firstName": "Sita",
        		   "lastName": "P",
        		   "primaryEmail": "sita@enspirecommerce.com",
        		   "primaryPhone": "546-345-6450",
        		   "address": {
        		   "address1": "4061  Oakmound Drive",
        		   "city": "Chicago",
        		   "state": "IL",
        		   "zip5": "60620",
        		   "country": "US"
        		   }
        		   },
        		   "billToContactInfo": {
        		           "firstName": "Manoj",
        		           "lastName": "Sahu",
        		           "primaryEmail": "manoj@enspirecommerce.com",
        		           "primaryPhone": "546-345-6458",
        		           "address": {
        		             "address1": "3822  Todds Lane",
        		             "city": "San Antonio",
        		             "state": "TX",
        		             "zip5": "78212",
        		             "country": "US"
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
    		expect(response.body.developerMessage).toContain("channel: may not be empty");
    		done();

            });
        }),
    
        
        it("TC - 05 -> Invalid channel", done =>{

            var options = {
                method: 'POST',
                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                

               body: {
            	   "orders": [{
            		   "orderDate":"2019-03-05T13:24:15-08:00",
            		   "orderNumber": order,
            		   "channel": "B2B1",
            		   "orderOrganization": "TheHonestKitchen-Organization-",
            		   "orderTransactionType": "Return",
            		    "returnSite":"joliet-dc",
            		   "lineItems": [
            		   {
            		   "lineNumber": 1,
            		   "status":"OPEN",
            		   "lineItemId": "AcuSKU2",
            		   "lineItemQty": 1,
            		   "originalOrderedQty": 1,
            		   "originalLine":{
            		       "orderNo":"000000013796",
            		       "orderOrganization":"TheHonestKitchen-Organization-",
            		       "lineNumber":1,
            		       "shipmentRequestNo":""
            		     },
            		   "returnFrom":
            		   {
            		   "firstName": "ram",
            		   "lastName": "Das",
            		   "address": {
            		   "address1": "2259  Watson Street",
            		   "city": "Maple Shade",
            		   "state": "NJ",
            		   "zip5": "08052",
            		   "country": "US"
            		   },
            		   "primaryEmail": "pspso@enspirecommerce.com",
            		   "primaryPhone": "516-476-8612"
            		   }
            		   ,
            		   "priceInfo": {
            		   "unitPrice": 77.99,
            		   "retailPrice": 77.99,
            		   "listPrice": 97.99
            		   },
            		   "returnTo": {
            		   "firstName": "Sita",
            		   "lastName": "P",
            		   "primaryEmail": "sita@enspirecommerce.com",
            		   "primaryPhone": "546-345-6450",
            		   "address": {
            		   "address1": "4061  Oakmound Drive",
            		   "city": "Chicago",
            		   "state": "IL",
            		   "zip5": "60620",
            		   "country": "US"
            		   }
            		   }
            		   }
            		   ],
            		   "returnFrom":
            		   {
            		   "firstName": "ram",
            		   "lastName": "Das",
            		   "address": {
            		   "address1": "2259  Watson Street",
            		   "city": "Maple Shade",
            		   "state": "NJ",
            		   "zip5": "08052",
            		   "country": "US"
            		   },
            		   "primaryEmail": "pspso@enspirecommerce.com",
            		   "primaryPhone": "516-476-8612"
            		   }
            		   ,
            		   "priceInfo": {
            		   "unitPrice": 77.99,
            		   "retailPrice": 77.99,
            		   "listPrice": 97.99
            		   },
            		   "returnTo": {
            		   "firstName": "Sita",
            		   "lastName": "P",
            		   "primaryEmail": "sita@enspirecommerce.com",
            		   "primaryPhone": "546-345-6450",
            		   "address": {
            		   "address1": "4061  Oakmound Drive",
            		   "city": "Chicago",
            		   "state": "IL",
            		   "zip5": "60620",
            		   "country": "US"
            		   }
            		   },
            		   "billToContactInfo": {
            		           "firstName": "Manoj",
            		           "lastName": "Sahu",
            		           "primaryEmail": "manoj@enspirecommerce.com",
            		           "primaryPhone": "546-345-6458",
            		           "address": {
            		             "address1": "3822  Todds Lane",
            		             "city": "San Antonio",
            		             "state": "TX",
            		             "zip5": "78212",
            		             "country": "US"
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
        		expect(response.statusCode).toBe(404);
        		expect(response.body.message).toContain("Channel B2B1 not found");
        		done();

                });
            }),
            
            
            
            
            it("TC - 06 -> Without order organization", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

                   body: {
                	   "orders": [{
                		   "orderDate":"2019-03-05T13:24:15-08:00",
                		   "orderNumber":order,
                		   "channel": "B2B",

                		   "orderTransactionType": "Return",
                		    "returnSite":"joliet-dc",
                		   "lineItems": [
                		   {
                		   "lineNumber": 1,
                		   "status":"OPEN",
                		   "lineItemId": "AcuSKU2",
                		   "lineItemQty": 1,
                		   "originalOrderedQty": 1,
                		   "originalLine":{
                		       "orderNo":"000000013796",
                		       "orderOrganization":"TheHonestKitchen-Organization-",
                		       "lineNumber":1,
                		       "shipmentRequestNo":""
                		     },
                		   "returnFrom":
                		   {
                		   "firstName": "ram",
                		   "lastName": "Das",
                		   "address": {
                		   "address1": "2259  Watson Street",
                		   "city": "Maple Shade",
                		   "state": "NJ",
                		   "zip5": "08052",
                		   "country": "US"
                		   },
                		   "primaryEmail": "pspso@enspirecommerce.com",
                		   "primaryPhone": "516-476-8612"
                		   }
                		   ,
                		   "priceInfo": {
                		   "unitPrice": 77.99,
                		   "retailPrice": 77.99,
                		   "listPrice": 97.99
                		   },
                		   "returnTo": {
                		   "firstName": "Sita",
                		   "lastName": "P",
                		   "primaryEmail": "sita@enspirecommerce.com",
                		   "primaryPhone": "546-345-6450",
                		   "address": {
                		   "address1": "4061  Oakmound Drive",
                		   "city": "Chicago",
                		   "state": "IL",
                		   "zip5": "60620",
                		   "country": "US"
                		   }
                		   }
                		   }
                		   ],
                		   "returnFrom":
                		   {
                		   "firstName": "ram",
                		   "lastName": "Das",
                		   "address": {
                		   "address1": "2259  Watson Street",
                		   "city": "Maple Shade",
                		   "state": "NJ",
                		   "zip5": "08052",
                		   "country": "US"
                		   },
                		   "primaryEmail": "pspso@enspirecommerce.com",
                		   "primaryPhone": "516-476-8612"
                		   }
                		   ,
                		   "priceInfo": {
                		   "unitPrice": 77.99,
                		   "retailPrice": 77.99,
                		   "listPrice": 97.99
                		   },
                		   "returnTo": {
                		   "firstName": "Sita",
                		   "lastName": "P",
                		   "primaryEmail": "sita@enspirecommerce.com",
                		   "primaryPhone": "546-345-6450",
                		   "address": {
                		   "address1": "4061  Oakmound Drive",
                		   "city": "Chicago",
                		   "state": "IL",
                		   "zip5": "60620",
                		   "country": "US"
                		   }
                		   },
                		   "billToContactInfo": {
                		           "firstName": "Manoj",
                		           "lastName": "Sahu",
                		           "primaryEmail": "manoj@enspirecommerce.com",
                		           "primaryPhone": "546-345-6458",
                		           "address": {
                		             "address1": "3822  Todds Lane",
                		             "city": "San Antonio",
                		             "state": "TX",
                		             "zip5": "78212",
                		             "country": "US"
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
            		expect(response.body.developerMessage).toContain("orderOrganization: may not be empty");
            		done();

                    });
                }),
                
                
                
                
                it("TC - 07 -> Invalid order organization", done =>{

                    var options = {
                        method: 'POST',
                        url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        },
                        

                       body: {
                    	   "orders": [{
                    		   "orderDate":"2019-03-05T13:24:15-08:00",
                    		   "orderNumber":order,
                    		   "channel": "B2B",
                    		   "orderOrganization": "TheHonestKitchen-Organization-1",
                    		   "orderTransactionType": "Return",
                    		    "returnSite":"joliet-dc",
                    		   "lineItems": [
                    		   {
                    		   "lineNumber": 1,
                    		   "status":"OPEN",
                    		   "lineItemId": "AcuSKU2",
                    		   "lineItemQty": 1,
                    		   "originalOrderedQty": 1,
                    		   "originalLine":{
                    		       "orderNo":"000000013796",
                    		       "orderOrganization":"TheHonestKitchen-Organization-",
                    		       "lineNumber":1,
                    		       "shipmentRequestNo":""
                    		     },
                    		   "returnFrom":
                    		   {
                    		   "firstName": "ram",
                    		   "lastName": "Das",
                    		   "address": {
                    		   "address1": "2259  Watson Street",
                    		   "city": "Maple Shade",
                    		   "state": "NJ",
                    		   "zip5": "08052",
                    		   "country": "US"
                    		   },
                    		   "primaryEmail": "pspso@enspirecommerce.com",
                    		   "primaryPhone": "516-476-8612"
                    		   }
                    		   ,
                    		   "priceInfo": {
                    		   "unitPrice": 77.99,
                    		   "retailPrice": 77.99,
                    		   "listPrice": 97.99
                    		   },
                    		   "returnTo": {
                    		   "firstName": "Sita",
                    		   "lastName": "P",
                    		   "primaryEmail": "sita@enspirecommerce.com",
                    		   "primaryPhone": "546-345-6450",
                    		   "address": {
                    		   "address1": "4061  Oakmound Drive",
                    		   "city": "Chicago",
                    		   "state": "IL",
                    		   "zip5": "60620",
                    		   "country": "US"
                    		   }
                    		   }
                    		   }
                    		   ],
                    		   "returnFrom":
                    		   {
                    		   "firstName": "ram",
                    		   "lastName": "Das",
                    		   "address": {
                    		   "address1": "2259  Watson Street",
                    		   "city": "Maple Shade",
                    		   "state": "NJ",
                    		   "zip5": "08052",
                    		   "country": "US"
                    		   },
                    		   "primaryEmail": "pspso@enspirecommerce.com",
                    		   "primaryPhone": "516-476-8612"
                    		   }
                    		   ,
                    		   "priceInfo": {
                    		   "unitPrice": 77.99,
                    		   "retailPrice": 77.99,
                    		   "listPrice": 97.99
                    		   },
                    		   "returnTo": {
                    		   "firstName": "Sita",
                    		   "lastName": "P",
                    		   "primaryEmail": "sita@enspirecommerce.com",
                    		   "primaryPhone": "546-345-6450",
                    		   "address": {
                    		   "address1": "4061  Oakmound Drive",
                    		   "city": "Chicago",
                    		   "state": "IL",
                    		   "zip5": "60620",
                    		   "country": "US"
                    		   }
                    		   },
                    		   "billToContactInfo": {
                    		           "firstName": "Manoj",
                    		           "lastName": "Sahu",
                    		           "primaryEmail": "manoj@enspirecommerce.com",
                    		           "primaryPhone": "546-345-6458",
                    		           "address": {
                    		             "address1": "3822  Todds Lane",
                    		             "city": "San Antonio",
                    		             "state": "TX",
                    		             "zip5": "78212",
                    		             "country": "US"
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
                		expect(response.statusCode).toBe(404);
                		expect(response.body.message).toContain("Organization TheHonestKitchen-Organization-1 not found");
                		done();

                        });
                    }),
                    
                    
                    
                    
                    it("TC - 08 -> Without order transaction type", done =>{

                        var options = {
                            method: 'POST',
                            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token
                            },
                            

                           body: {
                        	   "orders": [{
                        		   "orderDate":"2019-03-05T13:24:15-08:00",
                        		   "orderNumber":order,
                        		   "channel": "B2B",
                        		   "orderOrganization": "TheHonestKitchen-Organization-",

                        		    "returnSite":"joliet-dc",
                        		   "lineItems": [
                        		   {
                        		   "lineNumber": 1,
                        		   "status":"OPEN",
                        		   "lineItemId": "AcuSKU2",
                        		   "lineItemQty": 1,
                        		   "originalOrderedQty": 1,
                        		   "originalLine":{
                        		       "orderNo":"000000013796",
                        		       "orderOrganization":"TheHonestKitchen-Organization-",
                        		       "lineNumber":1,
                        		       "shipmentRequestNo":""
                        		     },
                        		   "returnFrom":
                        		   {
                        		   "firstName": "ram",
                        		   "lastName": "Das",
                        		   "address": {
                        		   "address1": "2259  Watson Street",
                        		   "city": "Maple Shade",
                        		   "state": "NJ",
                        		   "zip5": "08052",
                        		   "country": "US"
                        		   },
                        		   "primaryEmail": "pspso@enspirecommerce.com",
                        		   "primaryPhone": "516-476-8612"
                        		   }
                        		   ,
                        		   "priceInfo": {
                        		   "unitPrice": 77.99,
                        		   "retailPrice": 77.99,
                        		   "listPrice": 97.99
                        		   },
                        		   "returnTo": {
                        		   "firstName": "Sita",
                        		   "lastName": "P",
                        		   "primaryEmail": "sita@enspirecommerce.com",
                        		   "primaryPhone": "546-345-6450",
                        		   "address": {
                        		   "address1": "4061  Oakmound Drive",
                        		   "city": "Chicago",
                        		   "state": "IL",
                        		   "zip5": "60620",
                        		   "country": "US"
                        		   }
                        		   }
                        		   }
                        		   ],
                        		   "returnFrom":
                        		   {
                        		   "firstName": "ram",
                        		   "lastName": "Das",
                        		   "address": {
                        		   "address1": "2259  Watson Street",
                        		   "city": "Maple Shade",
                        		   "state": "NJ",
                        		   "zip5": "08052",
                        		   "country": "US"
                        		   },
                        		   "primaryEmail": "pspso@enspirecommerce.com",
                        		   "primaryPhone": "516-476-8612"
                        		   }
                        		   ,
                        		   "priceInfo": {
                        		   "unitPrice": 77.99,
                        		   "retailPrice": 77.99,
                        		   "listPrice": 97.99
                        		   },
                        		   "returnTo": {
                        		   "firstName": "Sita",
                        		   "lastName": "P",
                        		   "primaryEmail": "sita@enspirecommerce.com",
                        		   "primaryPhone": "546-345-6450",
                        		   "address": {
                        		   "address1": "4061  Oakmound Drive",
                        		   "city": "Chicago",
                        		   "state": "IL",
                        		   "zip5": "60620",
                        		   "country": "US"
                        		   }
                        		   },
                        		   "billToContactInfo": {
                        		           "firstName": "Manoj",
                        		           "lastName": "Sahu",
                        		           "primaryEmail": "manoj@enspirecommerce.com",
                        		           "primaryPhone": "546-345-6458",
                        		           "address": {
                        		             "address1": "3822  Todds Lane",
                        		             "city": "San Antonio",
                        		             "state": "TX",
                        		             "zip5": "78212",
                        		             "country": "US"
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
                    		expect(response.body.developerMessage).toContain("orderTransactionType: Order Transaction Type cannot be blank");
                    		done();

                            });
                        }),
                        
                        
                        
                        
                        it("TC - 09 -> Invalid order transaction type", done =>{

                            var options = {
                                method: 'POST',
                                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token
                                },
                                

                               body: {
                            	   "orders": [{
                            		   "orderDate":"2019-03-05T13:24:15-08:00",
                            		   "orderNumber":order,
                            		   "channel": "B2B",
                            		   "orderOrganization": "TheHonestKitchen-Organization-",
                            		   "orderTransactionType": "Return12",
                            		    "returnSite":"joliet-dc",
                            		   "lineItems": [
                            		   {
                            		   "lineNumber": 1,
                            		   "status":"OPEN",
                            		   "lineItemId": "AcuSKU2",
                            		   "lineItemQty": 1,
                            		   "originalOrderedQty": 1,
                            		   "originalLine":{
                            		       "orderNo":"000000013796",
                            		       "orderOrganization":"TheHonestKitchen-Organization-",
                            		       "lineNumber":1,
                            		       "shipmentRequestNo":""
                            		     },
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   }
                            		   }
                            		   ],
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   },
                            		   "billToContactInfo": {
                            		           "firstName": "Manoj",
                            		           "lastName": "Sahu",
                            		           "primaryEmail": "manoj@enspirecommerce.com",
                            		           "primaryPhone": "546-345-6458",
                            		           "address": {
                            		             "address1": "3822  Todds Lane",
                            		             "city": "San Antonio",
                            		             "state": "TX",
                            		             "zip5": "78212",
                            		             "country": "US"
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
                        		expect(response.body.message).toContain("Order Transaction Type Return12 is invalid");
                        		done();

                                });
                            }),
                            
                            
                            
                        it("TC - 10 -> Without return site", done =>{

                            var options = {
                                method: 'POST',
                                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token
                                },
                                

                               body: {
                            	   "orders": [{
                            		   "orderDate":"2019-03-05T13:24:15-08:00",
                            		   "orderNumber":order,
                            		   "channel": "B2B",
                            		   "orderOrganization": "TheHonestKitchen-Organization-",
                            		   "orderTransactionType": "Return",
                            		   "lineItems": [
                            		   {
                            		   "lineNumber": 1,
                            		   "status":"OPEN",
                            		   "lineItemId": "AcuSKU2",
                            		   "lineItemQty": 1,
                            		   "originalOrderedQty": 1,
                            		   "originalLine":{
                            		       "orderNo":"000000013796",
                            		       "orderOrganization":"TheHonestKitchen-Organization-",
                            		       "lineNumber":1,
                            		       "shipmentRequestNo":""
                            		     },
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   }
                            		   }
                            		   ],
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   },
                            		   "billToContactInfo": {
                            		           "firstName": "Manoj",
                            		           "lastName": "Sahu",
                            		           "primaryEmail": "manoj@enspirecommerce.com",
                            		           "primaryPhone": "546-345-6458",
                            		           "address": {
                            		             "address1": "3822  Todds Lane",
                            		             "city": "San Antonio",
                            		             "state": "TX",
                            		             "zip5": "78212",
                            		             "country": "US"
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
                        		expect(response.body.developerMessage).toContain("Return Site must be non-null for Receipt RMA");
                        		done();

                                });
                            }),
                                
                                
                                
                        it("TC - 11 -> Invalid return site", done =>{

                            var options = {
                                method: 'POST',
                                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token
                                },
                                

                               body: {
                            	   "orders": [{
                            		   "orderDate":"2019-03-05T13:24:15-08:00",
                            		   "orderNumber":order,
                            		   "channel": "B2B",
                            		   "orderOrganization": "TheHonestKitchen-Organization-",
                            		   "orderTransactionType": "Return",
                            		    "returnSite":"joliet-dca",
                            		   "lineItems": [
                            		   {
                            		   "lineNumber": 1,
                            		   "status":"OPEN",
                            		   "lineItemId": "AcuSKU2",
                            		   "lineItemQty": 1,
                            		   "originalOrderedQty": 1,
                            		   "originalLine":{
                            		       "orderNo":"000000013796",
                            		       "orderOrganization":"TheHonestKitchen-Organization-",
                            		       "lineNumber":1,
                            		       "shipmentRequestNo":""
                            		     },
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   }
                            		   }
                            		   ],
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   },
                            		   "billToContactInfo": {
                            		           "firstName": "Manoj",
                            		           "lastName": "Sahu",
                            		           "primaryEmail": "manoj@enspirecommerce.com",
                            		           "primaryPhone": "546-345-6458",
                            		           "address": {
                            		             "address1": "3822  Todds Lane",
                            		             "city": "San Antonio",
                            		             "state": "TX",
                            		             "zip5": "78212",
                            		             "country": "US"
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
                        		expect(response.statusCode).toBe(404);
                        		expect(response.body.message).toContain("Site joliet-dca not found");
                        		done();

                                });
                            }),
                            
                            
                            
                            it("TC - 12 -> Without lineitems", done =>{

                            var options = {
                                method: 'POST',
                                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token
                                },
                                

                               body: {
                            	   "orders": [{
                            		   "orderDate":"2019-03-05T13:24:15-08:00",
                            		   "orderNumber":order,
                            		   "channel": "B2B",
                            		   "orderOrganization": "TheHonestKitchen-Organization-",
                            		   "orderTransactionType": "Return",
                            		    "returnSite":"joliet-dc",
                            		   "lineItemss": [
                            		   {
                            		   "lineNumber": 1,
                            		   "status":"OPEN",
                            		   "lineItemId": "AcuSKU2",
                            		   "lineItemQty": 1,
                            		   "originalOrderedQty": 1,
                            		   "originalLine":{
                            		       "orderNo":"000000013796",
                            		       "orderOrganization":"TheHonestKitchen-Organization-",
                            		       "lineNumber":1,
                            		       "shipmentRequestNo":""
                            		     },
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   }
                            		   }
                            		   ],
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   },
                            		   "billToContactInfo": {
                            		           "firstName": "Manoj",
                            		           "lastName": "Sahu",
                            		           "primaryEmail": "manoj@enspirecommerce.com",
                            		           "primaryPhone": "546-345-6458",
                            		           "address": {
                            		             "address1": "3822  Todds Lane",
                            		             "city": "San Antonio",
                            		             "state": "TX",
                            		             "zip5": "78212",
                            		             "country": "US"
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
                        		expect(response.body.developerMessage).toContain("lineItems: may not be null");
                        		done();

                                });
                            }),
                            
                            
                            
                            it("TC - 13 -> Without line number", done =>{

                                var options = {
                                    method: 'POST',
                                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+token
                                    },
                                    

                                   body: {
                                	   "orders": [{
                                		   "orderDate":"2019-03-05T13:24:15-08:00",
                                		   "orderNumber":order,
                                		   "channel": "B2B",
                                		   "orderOrganization": "TheHonestKitchen-Organization-",
                                		   "orderTransactionType": "Return",
                                		    "returnSite":"joliet-dc",
                                		   "lineItems": [
                                		   {
                                		   "status":"OPEN",
                                		   "lineItemId": "AcuSKU2",
                                		   "lineItemQty": 1,
                                		   "originalOrderedQty": 1,
                                		   "originalLine":{
                                		       "orderNo":"000000013796",
                                		       "orderOrganization":"TheHonestKitchen-Organization-",
                                		       "lineNumber":1,
                                		       "shipmentRequestNo":""
                                		     },
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   }
                                		   }
                                		   ],
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   },
                                		   "billToContactInfo": {
                                		           "firstName": "Manoj",
                                		           "lastName": "Sahu",
                                		           "primaryEmail": "manoj@enspirecommerce.com",
                                		           "primaryPhone": "546-345-6458",
                                		           "address": {
                                		             "address1": "3822  Todds Lane",
                                		             "city": "San Antonio",
                                		             "state": "TX",
                                		             "zip5": "78212",
                                		             "country": "US"
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
                            		expect(response.body.developerMessage).toContain("lineItems[0].lineNumber: may not be null");
                            		done();

                                    });
                                }),
                                
                                
                                
                                
                            it("TC - 14 -> Without line status", done =>{

                                var options = {
                                    method: 'POST',
                                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+token
                                    },
                                    

                                   body: {
                                	   "orders": [{
                                		   "orderDate":"2019-03-05T13:24:15-08:00",
                                		   "orderNumber":order,
                                		   "channel": "B2B",
                                		   "orderOrganization": "TheHonestKitchen-Organization-",
                                		   "orderTransactionType": "Return",
                                		    "returnSite":"joliet-dc",
                                		   "lineItems": [
                                		   {
                                		   "lineNumber": 1,
                                		   "lineItemId": "AcuSKU2",
                                		   "lineItemQty": 1,
                                		   "originalOrderedQty": 1,
                                		   "originalLine":{
                                		       "orderNo":"000000013796",
                                		       "orderOrganization":"TheHonestKitchen-Organization-",
                                		       "lineNumber":1,
                                		       "shipmentRequestNo":""
                                		     },
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   }
                                		   }
                                		   ],
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   },
                                		   "billToContactInfo": {
                                		           "firstName": "Manoj",
                                		           "lastName": "Sahu",
                                		           "primaryEmail": "manoj@enspirecommerce.com",
                                		           "primaryPhone": "546-345-6458",
                                		           "address": {
                                		             "address1": "3822  Todds Lane",
                                		             "city": "San Antonio",
                                		             "state": "TX",
                                		             "zip5": "78212",
                                		             "country": "US"
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
                            		expect(response.body.developerMessage).toContain("lineItems[0].status: may not be empty");
                            		done();

                                    });
                                }),
                                
                                
                                
                                
                            it("TC - 15 -> Invalid status", done =>{

                                var options = {
                                    method: 'POST',
                                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer '+token
                                    },
                                    

                                   body: {
                                	   "orders": [{
                                		   "orderDate":"2019-03-05T13:24:15-08:00",
                                		   "orderNumber":order,
                                		   "channel": "B2B",
                                		   "orderOrganization": "TheHonestKitchen-Organization-",
                                		   "orderTransactionType": "Return",
                                		    "returnSite":"joliet-dc",
                                		   "lineItems": [
                                		   {
                                		   "lineNumber": 1,
                                		   "status":"OPENswe",
                                		   "lineItemId": "AcuSKU2",
                                		   "lineItemQty": 1,
                                		   "originalOrderedQty": 1,
                                		   "originalLine":{
                                		       "orderNo":"000000013796",
                                		       "orderOrganization":"TheHonestKitchen-Organization-",
                                		       "lineNumber":1,
                                		       "shipmentRequestNo":""
                                		     },
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   }
                                		   }
                                		   ],
                                		   "returnFrom":
                                		   {
                                		   "firstName": "ram",
                                		   "lastName": "Das",
                                		   "address": {
                                		   "address1": "2259  Watson Street",
                                		   "city": "Maple Shade",
                                		   "state": "NJ",
                                		   "zip5": "08052",
                                		   "country": "US"
                                		   },
                                		   "primaryEmail": "pspso@enspirecommerce.com",
                                		   "primaryPhone": "516-476-8612"
                                		   }
                                		   ,
                                		   "priceInfo": {
                                		   "unitPrice": 77.99,
                                		   "retailPrice": 77.99,
                                		   "listPrice": 97.99
                                		   },
                                		   "returnTo": {
                                		   "firstName": "Sita",
                                		   "lastName": "P",
                                		   "primaryEmail": "sita@enspirecommerce.com",
                                		   "primaryPhone": "546-345-6450",
                                		   "address": {
                                		   "address1": "4061  Oakmound Drive",
                                		   "city": "Chicago",
                                		   "state": "IL",
                                		   "zip5": "60620",
                                		   "country": "US"
                                		   }
                                		   },
                                		   "billToContactInfo": {
                                		           "firstName": "Manoj",
                                		           "lastName": "Sahu",
                                		           "primaryEmail": "manoj@enspirecommerce.com",
                                		           "primaryPhone": "546-345-6458",
                                		           "address": {
                                		             "address1": "3822  Todds Lane",
                                		             "city": "San Antonio",
                                		             "state": "TX",
                                		             "zip5": "78212",
                                		             "country": "US"
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
                            		expect(response.body.orders[0].orderNumber).toBe(order);
                            		done();

                                    });
                           }),
                           
                           
                           
                           it("TC - 16 -> Without line itemid", done =>{

                               var options = {
                                   method: 'POST',
                                   url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                   headers: {
                                       'Content-Type': 'application/json',
                                       'Authorization': 'Bearer '+token
                                   },
                                   

                                  body: {
                                	  "orders": [{
                                		  "orderDate":"2019-03-05T13:24:15-08:00",
                                		  "orderNumber":order,
                                		  "channel": "B2B",
                                		  "orderOrganization": "TheHonestKitchen-Organization-",
                                		  "orderTransactionType": "Return",
                                		   "returnSite":"joliet-dc",
                                		  "lineItems": [
                                		  {
                                		  "lineNumber": 1,
                                		  "status":"OPEN",
                                		  "lineItemQty": 1,
                                		  "originalOrderedQty": 1,
                                		  "originalLine":{
                                		      "orderNo":"000000013796",
                                		      "orderOrganization":"TheHonestKitchen-Organization-",
                                		      "lineNumber":1,
                                		      "shipmentRequestNo":""
                                		    },
                                		  "returnFrom":
                                		  {
                                		  "firstName": "ram",
                                		  "lastName": "Das",
                                		  "address": {
                                		  "address1": "2259  Watson Street",
                                		  "city": "Maple Shade",
                                		  "state": "NJ",
                                		  "zip5": "08052",
                                		  "country": "US"
                                		  },
                                		  "primaryEmail": "pspso@enspirecommerce.com",
                                		  "primaryPhone": "516-476-8612"
                                		  }
                                		  ,
                                		  "priceInfo": {
                                		  "unitPrice": 77.99,
                                		  "retailPrice": 77.99,
                                		  "listPrice": 97.99
                                		  },
                                		  "returnTo": {
                                		  "firstName": "Sita",
                                		  "lastName": "P",
                                		  "primaryEmail": "sita@enspirecommerce.com",
                                		  "primaryPhone": "546-345-6450",
                                		  "address": {
                                		  "address1": "4061  Oakmound Drive",
                                		  "city": "Chicago",
                                		  "state": "IL",
                                		  "zip5": "60620",
                                		  "country": "US"
                                		  }
                                		  }
                                		  }
                                		  ],
                                		  "returnFrom":
                                		  {
                                		  "firstName": "ram",
                                		  "lastName": "Das",
                                		  "address": {
                                		  "address1": "2259  Watson Street",
                                		  "city": "Maple Shade",
                                		  "state": "NJ",
                                		  "zip5": "08052",
                                		  "country": "US"
                                		  },
                                		  "primaryEmail": "pspso@enspirecommerce.com",
                                		  "primaryPhone": "516-476-8612"
                                		  }
                                		  ,
                                		  "priceInfo": {
                                		  "unitPrice": 77.99,
                                		  "retailPrice": 77.99,
                                		  "listPrice": 97.99
                                		  },
                                		  "returnTo": {
                                		  "firstName": "Sita",
                                		  "lastName": "P",
                                		  "primaryEmail": "sita@enspirecommerce.com",
                                		  "primaryPhone": "546-345-6450",
                                		  "address": {
                                		  "address1": "4061  Oakmound Drive",
                                		  "city": "Chicago",
                                		  "state": "IL",
                                		  "zip5": "60620",
                                		  "country": "US"
                                		  }
                                		  },
                                		  "billToContactInfo": {
                                		          "firstName": "Manoj",
                                		          "lastName": "Sahu",
                                		          "primaryEmail": "manoj@enspirecommerce.com",
                                		          "primaryPhone": "546-345-6458",
                                		          "address": {
                                		            "address1": "3822  Todds Lane",
                                		            "city": "San Antonio",
                                		            "state": "TX",
                                		            "zip5": "78212",
                                		            "country": "US"
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
                           		expect(response.body.developerMessage).toContain("lineItems[0].lineItemId: may not be empty");
                           		done();

                                });
                          }),
                          
                          
                          
                          it("TC - 17 -> Invalid itemid", done =>{

                               var options = {
                                   method: 'POST',
                                   url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                   headers: {
                                       'Content-Type': 'application/json',
                                       'Authorization': 'Bearer '+token
                                   },
                                   

                                  body: {
                                	  "orders": [{
                                		  "orderDate":"2019-03-05T13:24:15-08:00",
                                		  "orderNumber":order,
                                		  "channel": "B2B",
                                		  "orderOrganization": "TheHonestKitchen-Organization-",
                                		  "orderTransactionType": "Return",
                                		   "returnSite":"joliet-dc",
                                		  "lineItems": [
                                		  {
                                		  "lineNumber": 1,
                                		  "status":"OPEN",
                                		  "lineItemId": "AcuSKU234",
                                		  "lineItemQty": 1,
                                		  "originalOrderedQty": 1,
                                		  "originalLine":{
                                		      "orderNo":"000000013796",
                                		      "orderOrganization":"TheHonestKitchen-Organization-",
                                		      "lineNumber":1,
                                		      "shipmentRequestNo":""
                                		    },
                                		  "returnFrom":
                                		  {
                                		  "firstName": "ram",
                                		  "lastName": "Das",
                                		  "address": {
                                		  "address1": "2259  Watson Street",
                                		  "city": "Maple Shade",
                                		  "state": "NJ",
                                		  "zip5": "08052",
                                		  "country": "US"
                                		  },
                                		  "primaryEmail": "pspso@enspirecommerce.com",
                                		  "primaryPhone": "516-476-8612"
                                		  }
                                		  ,
                                		  "priceInfo": {
                                		  "unitPrice": 77.99,
                                		  "retailPrice": 77.99,
                                		  "listPrice": 97.99
                                		  },
                                		  "returnTo": {
                                		  "firstName": "Sita",
                                		  "lastName": "P",
                                		  "primaryEmail": "sita@enspirecommerce.com",
                                		  "primaryPhone": "546-345-6450",
                                		  "address": {
                                		  "address1": "4061  Oakmound Drive",
                                		  "city": "Chicago",
                                		  "state": "IL",
                                		  "zip5": "60620",
                                		  "country": "US"
                                		  }
                                		  }
                                		  }
                                		  ],
                                		  "returnFrom":
                                		  {
                                		  "firstName": "ram",
                                		  "lastName": "Das",
                                		  "address": {
                                		  "address1": "2259  Watson Street",
                                		  "city": "Maple Shade",
                                		  "state": "NJ",
                                		  "zip5": "08052",
                                		  "country": "US"
                                		  },
                                		  "primaryEmail": "pspso@enspirecommerce.com",
                                		  "primaryPhone": "516-476-8612"
                                		  }
                                		  ,
                                		  "priceInfo": {
                                		  "unitPrice": 77.99,
                                		  "retailPrice": 77.99,
                                		  "listPrice": 97.99
                                		  },
                                		  "returnTo": {
                                		  "firstName": "Sita",
                                		  "lastName": "P",
                                		  "primaryEmail": "sita@enspirecommerce.com",
                                		  "primaryPhone": "546-345-6450",
                                		  "address": {
                                		  "address1": "4061  Oakmound Drive",
                                		  "city": "Chicago",
                                		  "state": "IL",
                                		  "zip5": "60620",
                                		  "country": "US"
                                		  }
                                		  },
                                		  "billToContactInfo": {
                                		          "firstName": "Manoj",
                                		          "lastName": "Sahu",
                                		          "primaryEmail": "manoj@enspirecommerce.com",
                                		          "primaryPhone": "546-345-6458",
                                		          "address": {
                                		            "address1": "3822  Todds Lane",
                                		            "city": "San Antonio",
                                		            "state": "TX",
                                		            "zip5": "78212",
                                		            "country": "US"
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
                           		expect(response.statusCode).toBe(404);
                           		expect(response.body.message).toContain("Sku AcuSKU234 not found");
                           		done();

                                });
                          }),
                          
                          
                          
                          
                          it("TC - 18 -> Without line itemqty", done =>{

                              var options = {
                                  method: 'POST',
                                  url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                  headers: {
                                      'Content-Type': 'application/json',
                                      'Authorization': 'Bearer '+token
                                  },
                                  

                                 body: {
                                	 "orders": [{
                                		 "orderDate":"2020-03-05T13:24:15-08:00",
                                		 "orderNumber":order+18,
                                		 "channel": "B2B",
                                		 "orderOrganization": "TheHonestKitchen-Organization-",
                                		 "orderTransactionType": "Return",
                                		  "returnSite":"joliet-dc",
                                		 "lineItems": [
                                		 {
                                		 "lineNumber": 1,
                                		 "status":"OPEN",
                                		 "lineItemId": "AcuSKU2",
                                		 "originalOrderedQty": 1,
                                		 "originalLine":{
                                		     "orderNo":"000000013796",
                                		     "orderOrganization":"TheHonestKitchen-Organization-",
                                		     "lineNumber":1,
                                		     "shipmentRequestNo":""
                                		   },
                                		 "returnFrom":
                                		 {
                                		 "firstName": "ram",
                                		 "lastName": "Das",
                                		 "address": {
                                		 "address1": "2259  Watson Street",
                                		 "city": "Maple Shade",
                                		 "state": "NJ",
                                		 "zip5": "08052",
                                		 "country": "US"
                                		 },
                                		 "primaryEmail": "pspso@enspirecommerce.com",
                                		 "primaryPhone": "516-476-8612"
                                		 }
                                		 ,
                                		 "priceInfo": {
                                		 "unitPrice": 77.99,
                                		 "retailPrice": 77.99,
                                		 "listPrice": 97.99
                                		 },
                                		 "returnTo": {
                                		 "firstName": "Sita",
                                		 "lastName": "P",
                                		 "primaryEmail": "sita@enspirecommerce.com",
                                		 "primaryPhone": "546-345-6450",
                                		 "address": {
                                		 "address1": "4061  Oakmound Drive",
                                		 "city": "Chicago",
                                		 "state": "IL",
                                		 "zip5": "60620",
                                		 "country": "US"
                                		 }
                                		 }
                                		 }
                                		 ],
                                		 "returnFrom":
                                		 {
                                		 "firstName": "ram",
                                		 "lastName": "Das",
                                		 "address": {
                                		 "address1": "2259  Watson Street",
                                		 "city": "Maple Shade",
                                		 "state": "NJ",
                                		 "zip5": "08052",
                                		 "country": "US"
                                		 },
                                		 "primaryEmail": "pspso@enspirecommerce.com",
                                		 "primaryPhone": "516-476-8612"
                                		 }
                                		 ,
                                		 "priceInfo": {
                                		 "unitPrice": 77.99,
                                		 "retailPrice": 77.99,
                                		 "listPrice": 97.99
                                		 },
                                		 "returnTo": {
                                		 "firstName": "Sita",
                                		 "lastName": "P",
                                		 "primaryEmail": "sita@enspirecommerce.com",
                                		 "primaryPhone": "546-345-6450",
                                		 "address": {
                                		 "address1": "4061  Oakmound Drive",
                                		 "city": "Chicago",
                                		 "state": "IL",
                                		 "zip5": "60620",
                                		 "country": "US"
                                		 }
                                		 },
                                		 "billToContactInfo": {
                                		         "firstName": "Manoj",
                                		         "lastName": "Sahu",
                                		         "primaryEmail": "manoj@enspirecommerce.com",
                                		         "primaryPhone": "546-345-6458",
                                		         "address": {
                                		           "address1": "3822  Todds Lane",
                                		           "city": "San Antonio",
                                		           "state": "TX",
                                		           "zip5": "78212",
                                		           "country": "US"
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
                          		expect(response.body.orders[0].orderNumber).toBe(order+18);
                          		done();

                               });
                         }),
                         
                         
                         
                         
                         it("TC - 19 -> Without original orderqty", done =>{

                             var options = {
                                 method: 'POST',
                                 url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                 headers: {
                                     'Content-Type': 'application/json',
                                     'Authorization': 'Bearer '+token
                                 },
                                 

                                body: {
                                	"orders": [{
                                		"orderDate":"2020-03-05T13:24:15-08:00",
                                		"orderNumber":order+19,
                                		"channel": "B2B",
                                		"orderOrganization": "TheHonestKitchen-Organization-",
                                		"orderTransactionType": "Return",
                                		 "returnSite":"joliet-dc",
                                		"lineItems": [
                                		{
                                		"lineNumber": 1,
                                		"status":"OPEN",
                                		"lineItemId": "AcuSKU2",
                                		"lineItemQty": 1,
                                		"originalLine":{
                                		    "orderNo":"000000013796",
                                		    "orderOrganization":"TheHonestKitchen-Organization-",
                                		    "lineNumber":1,
                                		    "shipmentRequestNo":""
                                		  },
                                		"returnFrom":
                                		{
                                		"firstName": "ram",
                                		"lastName": "Das",
                                		"address": {
                                		"address1": "2259  Watson Street",
                                		"city": "Maple Shade",
                                		"state": "NJ",
                                		"zip5": "08052",
                                		"country": "US"
                                		},
                                		"primaryEmail": "pspso@enspirecommerce.com",
                                		"primaryPhone": "516-476-8612"
                                		}
                                		,
                                		"priceInfo": {
                                		"unitPrice": 77.99,
                                		"retailPrice": 77.99,
                                		"listPrice": 97.99
                                		},
                                		"returnTo": {
                                		"firstName": "Sita",
                                		"lastName": "P",
                                		"primaryEmail": "sita@enspirecommerce.com",
                                		"primaryPhone": "546-345-6450",
                                		"address": {
                                		"address1": "4061  Oakmound Drive",
                                		"city": "Chicago",
                                		"state": "IL",
                                		"zip5": "60620",
                                		"country": "US"
                                		}
                                		}
                                		}
                                		],
                                		"returnFrom":
                                		{
                                		"firstName": "ram",
                                		"lastName": "Das",
                                		"address": {
                                		"address1": "2259  Watson Street",
                                		"city": "Maple Shade",
                                		"state": "NJ",
                                		"zip5": "08052",
                                		"country": "US"
                                		},
                                		"primaryEmail": "pspso@enspirecommerce.com",
                                		"primaryPhone": "516-476-8612"
                                		}
                                		,
                                		"priceInfo": {
                                		"unitPrice": 77.99,
                                		"retailPrice": 77.99,
                                		"listPrice": 97.99
                                		},
                                		"returnTo": {
                                		"firstName": "Sita",
                                		"lastName": "P",
                                		"primaryEmail": "sita@enspirecommerce.com",
                                		"primaryPhone": "546-345-6450",
                                		"address": {
                                		"address1": "4061  Oakmound Drive",
                                		"city": "Chicago",
                                		"state": "IL",
                                		"zip5": "60620",
                                		"country": "US"
                                		}
                                		},
                                		"billToContactInfo": {
                                		        "firstName": "Manoj",
                                		        "lastName": "Sahu",
                                		        "primaryEmail": "manoj@enspirecommerce.com",
                                		        "primaryPhone": "546-345-6458",
                                		        "address": {
                                		          "address1": "3822  Todds Lane",
                                		          "city": "San Antonio",
                                		          "state": "TX",
                                		          "zip5": "78212",
                                		          "country": "US"
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
                         		expect(response.body.orders[0].orderNumber).toBe(order+19);
                         		done();

                              });
                        }),
                        
                        
                        
                        
                        it("TC - 21 -> Without order organization in original line", done =>{

                             var options = {
                                 method: 'POST',
                                 url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                 headers: {
                                     'Content-Type': 'application/json',
                                     'Authorization': 'Bearer '+token
                                 },
                                 

                                body: {
                                	"orders": [{
                                		"orderDate":"2019-03-05T13:24:15-08:00",
                                		"orderNumber":order+21,
                                		"channel": "B2B",
                                		"orderOrganization": "TheHonestKitchen-Organization-",
                                		"orderTransactionType": "Return",
                                		 "returnSite":"joliet-dc",
                                		"lineItems": [
                                		{
                                		"lineNumber": 1,
                                		"status":"OPEN",
                                		"lineItemId": "AcuSKU2",
                                		"lineItemQty": 1,
                                		"originalOrderedQty": 1,
                                		"originalLine":{
                                		    "orderNo":"000000013796",
                                		    "lineNumber":1,
                                		    "shipmentRequestNo":""
                                		  },
                                		"returnFrom":
                                		{
                                		"firstName": "ram",
                                		"lastName": "Das",
                                		"address": {
                                		"address1": "2259  Watson Street",
                                		"city": "Maple Shade",
                                		"state": "NJ",
                                		"zip5": "08052",
                                		"country": "US"
                                		},
                                		"primaryEmail": "pspso@enspirecommerce.com",
                                		"primaryPhone": "516-476-8612"
                                		}
                                		,
                                		"priceInfo": {
                                		"unitPrice": 77.99,
                                		"retailPrice": 77.99,
                                		"listPrice": 97.99
                                		},
                                		"returnTo": {
                                		"firstName": "Sita",
                                		"lastName": "P",
                                		"primaryEmail": "sita@enspirecommerce.com",
                                		"primaryPhone": "546-345-6450",
                                		"address": {
                                		"address1": "4061  Oakmound Drive",
                                		"city": "Chicago",
                                		"state": "IL",
                                		"zip5": "60620",
                                		"country": "US"
                                		}
                                		}
                                		}
                                		],
                                		"returnFrom":
                                		{
                                		"firstName": "ram",
                                		"lastName": "Das",
                                		"address": {
                                		"address1": "2259  Watson Street",
                                		"city": "Maple Shade",
                                		"state": "NJ",
                                		"zip5": "08052",
                                		"country": "US"
                                		},
                                		"primaryEmail": "pspso@enspirecommerce.com",
                                		"primaryPhone": "516-476-8612"
                                		}
                                		,
                                		"priceInfo": {
                                		"unitPrice": 77.99,
                                		"retailPrice": 77.99,
                                		"listPrice": 97.99
                                		},
                                		"returnTo": {
                                		"firstName": "Sita",
                                		"lastName": "P",
                                		"primaryEmail": "sita@enspirecommerce.com",
                                		"primaryPhone": "546-345-6450",
                                		"address": {
                                		"address1": "4061  Oakmound Drive",
                                		"city": "Chicago",
                                		"state": "IL",
                                		"zip5": "60620",
                                		"country": "US"
                                		}
                                		},
                                		"billToContactInfo": {
                                		        "firstName": "Manoj",
                                		        "lastName": "Sahu",
                                		        "primaryEmail": "manoj@enspirecommerce.com",
                                		        "primaryPhone": "546-345-6458",
                                		        "address": {
                                		          "address1": "3822  Todds Lane",
                                		          "city": "San Antonio",
                                		          "state": "TX",
                                		          "zip5": "78212",
                                		          "country": "US"
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
                         		expect(response.body.developerMessage).toContain("lineItems[0].originalLine.orderOrganization: may not be empty");
                         		done();

                              });
                        }),
                        
                        
                        
                        
                        it("TC - 22 -> Invalid order organization in orginal line", done =>{

                            var options = {
                                method: 'POST',
                                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+token
                                },
                                

                               body: {
                            	   "orders": [{
                            		   "orderDate":"2019-03-05T13:24:15-08:00",
                            		   "orderNumber":"AQA0101088",
                            		   "channel": "B2B",
                            		   "orderOrganization": "TheHonestKitchen-Organization-",
                            		   "orderTransactionType": "Return",
                            		    "returnSite":"joliet-dc",
                            		   "lineItems": [
                            		   {
                            		   "lineNumber": 1,
                            		   "status":"OPEN",
                            		   "lineItemId": "AcuSKU2",
                            		   "lineItemQty": 1,
                            		   "originalOrderedQty": 1,
                            		   "originalLine":{
                            		       "orderNo":"000000013796",
                            		       "orderOrganization":"TheHonestKitchen-Organization-1",
                            		       "lineNumber":1,
                            		       "shipmentRequestNo":""
                            		     },
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   }
                            		   }
                            		   ],
                            		   "returnFrom":
                            		   {
                            		   "firstName": "ram",
                            		   "lastName": "Das",
                            		   "address": {
                            		   "address1": "2259  Watson Street",
                            		   "city": "Maple Shade",
                            		   "state": "NJ",
                            		   "zip5": "08052",
                            		   "country": "US"
                            		   },
                            		   "primaryEmail": "pspso@enspirecommerce.com",
                            		   "primaryPhone": "516-476-8612"
                            		   }
                            		   ,
                            		   "priceInfo": {
                            		   "unitPrice": 77.99,
                            		   "retailPrice": 77.99,
                            		   "listPrice": 97.99
                            		   },
                            		   "returnTo": {
                            		   "firstName": "Sita",
                            		   "lastName": "P",
                            		   "primaryEmail": "sita@enspirecommerce.com",
                            		   "primaryPhone": "546-345-6450",
                            		   "address": {
                            		   "address1": "4061  Oakmound Drive",
                            		   "city": "Chicago",
                            		   "state": "IL",
                            		   "zip5": "60620",
                            		   "country": "US"
                            		   }
                            		   },
                            		   "billToContactInfo": {
                            		           "firstName": "Manoj",
                            		           "lastName": "Sahu",
                            		           "primaryEmail": "manoj@enspirecommerce.com",
                            		           "primaryPhone": "546-345-6458",
                            		           "address": {
                            		             "address1": "3822  Todds Lane",
                            		             "city": "San Antonio",
                            		             "state": "TX",
                            		             "zip5": "78212",
                            		             "country": "US"
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
                        		expect(response.body.message).toContain("Invalid organization TheHonestKitchen-Organization-1 in sales order details");
                        		done();

                             });
                       }),
                       
                       
                       
                       
                       it("TC - 23 -> Without line number in original line", done =>{

                           var options = {
                               method: 'POST',
                               url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                               headers: {
                                   'Content-Type': 'application/json',
                                   'Authorization': 'Bearer '+token
                               },
                               

                              body: {
                            	  "orders": [{
                            		  "orderDate":"2019-03-05T13:24:15-08:00",
                            		  "orderNumber":order+23,
                            		  "channel": "B2B",
                            		  "orderOrganization": "TheHonestKitchen-Organization-",
                            		  "orderTransactionType": "Return",
                            		   "returnSite":"joliet-dc",
                            		  "lineItems": [
                            		  {
                            		  "lineNumber": 1,
                            		  "status":"OPEN",
                            		  "lineItemId": "AcuSKU2",
                            		  "lineItemQty": 1,
                            		  "originalOrderedQty": 1,
                            		  "originalLine":{
                            		      "orderNo":"000000013796",
                            		      "orderOrganization":"TheHonestKitchen-Organization-",
                            		      "shipmentRequestNo":""
                            		    },
                            		  "returnFrom":
                            		  {
                            		  "firstName": "ram",
                            		  "lastName": "Das",
                            		  "address": {
                            		  "address1": "2259  Watson Street",
                            		  "city": "Maple Shade",
                            		  "state": "NJ",
                            		  "zip5": "08052",
                            		  "country": "US"
                            		  },
                            		  "primaryEmail": "pspso@enspirecommerce.com",
                            		  "primaryPhone": "516-476-8612"
                            		  }
                            		  ,
                            		  "priceInfo": {
                            		  "unitPrice": 77.99,
                            		  "retailPrice": 77.99,
                            		  "listPrice": 97.99
                            		  },
                            		  "returnTo": {
                            		  "firstName": "Sita",
                            		  "lastName": "P",
                            		  "primaryEmail": "sita@enspirecommerce.com",
                            		  "primaryPhone": "546-345-6450",
                            		  "address": {
                            		  "address1": "4061  Oakmound Drive",
                            		  "city": "Chicago",
                            		  "state": "IL",
                            		  "zip5": "60620",
                            		  "country": "US"
                            		  }
                            		  }
                            		  }
                            		  ],
                            		  "returnFrom":
                            		  {
                            		  "firstName": "ram",
                            		  "lastName": "Das",
                            		  "address": {
                            		  "address1": "2259  Watson Street",
                            		  "city": "Maple Shade",
                            		  "state": "NJ",
                            		  "zip5": "08052",
                            		  "country": "US"
                            		  },
                            		  "primaryEmail": "pspso@enspirecommerce.com",
                            		  "primaryPhone": "516-476-8612"
                            		  }
                            		  ,
                            		  "priceInfo": {
                            		  "unitPrice": 77.99,
                            		  "retailPrice": 77.99,
                            		  "listPrice": 97.99
                            		  },
                            		  "returnTo": {
                            		  "firstName": "Sita",
                            		  "lastName": "P",
                            		  "primaryEmail": "sita@enspirecommerce.com",
                            		  "primaryPhone": "546-345-6450",
                            		  "address": {
                            		  "address1": "4061  Oakmound Drive",
                            		  "city": "Chicago",
                            		  "state": "IL",
                            		  "zip5": "60620",
                            		  "country": "US"
                            		  }
                            		  },
                            		  "billToContactInfo": {
                            		          "firstName": "Manoj",
                            		          "lastName": "Sahu",
                            		          "primaryEmail": "manoj@enspirecommerce.com",
                            		          "primaryPhone": "546-345-6458",
                            		          "address": {
                            		            "address1": "3822  Todds Lane",
                            		            "city": "San Antonio",
                            		            "state": "TX",
                            		            "zip5": "78212",
                            		            "country": "US"
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
                       		expect(response.body.developerMessage).toContain("lineItems[0].originalLine.lineNumber: may not be empty");
                       		done();

                            });
                      }),
                      
                      
                      
                      
                      it("TC - 24 -> Without return from in lines", done =>{

                          var options = {
                              method: 'POST',
                              url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                              headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': 'Bearer '+token
                              },
                              

                             body: {
                            	 "orders": [{
                            		 "orderDate":"2019-03-05T13:24:15-08:00",
                            		 "orderNumber":order+24,
                            		 "channel": "B2B",
                            		 "orderOrganization": "TheHonestKitchen-Organization-",
                            		 "orderTransactionType": "Return",
                            		  "returnSite":"joliet-dc",
                            		 "lineItems": [
                            		 {
                            		 "lineNumber": 1,
                            		 "status":"OPEN",
                            		 "lineItemId": "AcuSKU2",
                            		 "lineItemQty": 1,
                            		 "originalOrderedQty": 1,
                            		 "originalLine":{
                            		     "orderNo":"000000013796",
                            		     "orderOrganization":"TheHonestKitchen-Organization-",
                            		     "lineNumber":1
                            		   },

                            		 "priceInfo": {
                            		 "unitPrice": 77.99,
                            		 "retailPrice": 77.99,
                            		 "listPrice": 97.99
                            		 },
                            		 "returnTo": {
                            		 "firstName": "Sita",
                            		 "lastName": "P",
                            		 "primaryEmail": "sita@enspirecommerce.com",
                            		 "primaryPhone": "546-345-6450",
                            		 "address": {
                            		 "address1": "4061  Oakmound Drive",
                            		 "city": "Chicago",
                            		 "state": "IL",
                            		 "zip5": "60620",
                            		 "country": "US"
                            		 }
                            		 }
                            		 }
                            		 ],
                            		 "returnFrom":
                            		 {
                            		 "firstName": "ram",
                            		 "lastName": "Das",
                            		 "address": {
                            		 "address1": "2259  Watson Street",
                            		 "city": "Maple Shade",
                            		 "state": "NJ",
                            		 "zip5": "08052",
                            		 "country": "US"
                            		 },
                            		 "primaryEmail": "pspso@enspirecommerce.com",
                            		 "primaryPhone": "516-476-8612"
                            		 }
                            		 ,
                            		 "priceInfo": {
                            		 "unitPrice": 77.99,
                            		 "retailPrice": 77.99,
                            		 "listPrice": 97.99
                            		 },
                            		 "returnTo": {
                            		 "firstName": "Sita",
                            		 "lastName": "P",
                            		 "primaryEmail": "sita@enspirecommerce.com",
                            		 "primaryPhone": "546-345-6450",
                            		 "address": {
                            		 "address1": "4061  Oakmound Drive",
                            		 "city": "Chicago",
                            		 "state": "IL",
                            		 "zip5": "60620",
                            		 "country": "US"
                            		 }
                            		 },
                            		 "billToContactInfo": {
                            		         "firstName": "Manoj",
                            		         "lastName": "Sahu",
                            		         "primaryEmail": "manoj@enspirecommerce.com",
                            		         "primaryPhone": "546-345-6458",
                            		         "address": {
                            		           "address1": "3822  Todds Lane",
                            		           "city": "San Antonio",
                            		           "state": "TX",
                            		           "zip5": "78212",
                            		           "country": "US"
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
                      		expect(response.body.developerMessage).toContain("lineItems[0].returnFrom: may not be null");
                      		done();

                           });
                     }),
                     
                     
                     
                     
                     it("TC - 25 -> Without priceinfo", done =>{

                         var options = {
                             method: 'POST',
                             url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                             headers: {
                                 'Content-Type': 'application/json',
                                 'Authorization': 'Bearer '+token
                             },
                             

                            body: {
                            	"orders": [{
                            		"orderDate":"2019-03-05T13:24:15-08:00",
                            		"orderNumber":order+25,
                            		"channel": "B2B",
                            		"orderOrganization": "TheHonestKitchen-Organization-",
                            		"orderTransactionType": "Return",
                            		 "returnSite":"joliet-dc",
                            		"lineItems": [
                            		{
                            		"lineNumber": 1,
                            		"status":"OPENswe",
                            		"lineItemId": "AcuSKU2",
                            		"lineItemQty": 1,
                            		"originalOrderedQty": 1,
                            		"originalLine":{
                            		    "orderNo":"000000013816",
                            		    "orderOrganization":"TheHonestKitchen-Organization-",
                            		    "lineNumber":1,
                            		    "shipmentRequestNo":""
                            		  },
                            		"returnFrom":
                            		{
                            		"firstName": "ram",
                            		"lastName": "Das",
                            		"address": {
                            		"address1": "2259  Watson Street",
                            		"city": "Maple Shade",
                            		"state": "NJ",
                            		"zip5": "08052",
                            		"country": "US"
                            		},
                            		"primaryEmail": "pspso@enspirecommerce.com",
                            		"primaryPhone": "516-476-8612"
                            		}
                            		,
                            		"priceInfo": {
                            		"unitPrice": 77.99,
                            		"retailPrice": 77.99,
                            		"listPrice": 97.99
                            		},
                            		"returnTo": {
                            		"firstName": "Sita",
                            		"lastName": "P",
                            		"primaryEmail": "sita@enspirecommerce.com",
                            		"primaryPhone": "546-345-6450",
                            		"address": {
                            		"address1": "4061  Oakmound Drive",
                            		"city": "Chicago",
                            		"state": "IL",
                            		"zip5": "60620",
                            		"country": "US"
                            		}
                            		}
                            		}
                            		],
                            		"returnFrom":
                            		{
                            		"firstName": "ram",
                            		"lastName": "Das",
                            		"address": {
                            		"address1": "2259  Watson Street",
                            		"city": "Maple Shade",
                            		"state": "NJ",
                            		"zip5": "08052",
                            		"country": "US"
                            		},
                            		"primaryEmail": "pspso@enspirecommerce.com",
                            		"primaryPhone": "516-476-8612"
                            		},
                            		"returnTo": {
                            		"firstName": "Sita",
                            		"lastName": "P",
                            		"primaryEmail": "sita@enspirecommerce.com",
                            		"primaryPhone": "546-345-6450",
                            		"address": {
                            		"address1": "4061  Oakmound Drive",
                            		"city": "Chicago",
                            		"state": "IL",
                            		"zip5": "60620",
                            		"country": "US"
                            		}
                            		},
                            		"billToContactInfo": {
                            		        "firstName": "Manoj",
                            		        "lastName": "Sahu",
                            		        "primaryEmail": "manoj@enspirecommerce.com",
                            		        "primaryPhone": "546-345-6458",
                            		        "address": {
                            		          "address1": "3822  Todds Lane",
                            		          "city": "San Antonio",
                            		          "state": "TX",
                            		          "zip5": "78212",
                            		          "country": "US"
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
                     		expect(response.body.orders[0].orderNumber).toBe(order+25);
                     		done();

                          });
                    }),
                        
                    
                    
                    
                    it("TC - 26 -> Without return to in lines", done =>{

                        var options = {
                            method: 'POST',
                            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+token
                            },
                            

                           body: {
                        	   "orders": [{
                        		   "orderDate":"2019-03-05T13:24:15-08:00",
                        		   "orderNumber":order+26,
                        		   "channel": "B2B",
                        		   "orderOrganization": "TheHonestKitchen-Organization-",
                        		   "orderTransactionType": "Return",
                        		    "returnSite":"joliet-dc",
                        		   "lineItems": [
                        		   {
                        		   "lineNumber": 1,
                        		   "status":"OPEN",
                        		   "lineItemId": "AcuSKU2",
                        		   "lineItemQty": 1,
                        		   "originalOrderedQty": 1,
                        		   "originalLine":{
                        		       "orderNo":"000000013796",
                        		       "orderOrganization":"TheHonestKitchen-Organization-",
                        		       "lineNumber":1
                        		     },
                        		   "returnFrom":
                        		   {
                        		   "firstName": "ram",
                        		   "lastName": "Das",
                        		   "address": {
                        		   "address1": "2259  Watson Street",
                        		   "city": "Maple Shade",
                        		   "state": "NJ",
                        		   "zip5": "08052",
                        		   "country": "US"
                        		   },
                        		   "primaryEmail": "pspso@enspirecommerce.com",
                        		   "primaryPhone": "516-476-8612"
                        		   }
                        		   ,
                        		   "priceInfo": {
                        		   "unitPrice": 77.99,
                        		   "retailPrice": 77.99,
                        		   "listPrice": 97.99
                        		   }

                        		   }
                        		   ],
                        		   "returnFrom":
                        		   {
                        		   "firstName": "ram",
                        		   "lastName": "Das",
                        		   "address": {
                        		   "address1": "2259  Watson Street",
                        		   "city": "Maple Shade",
                        		   "state": "NJ",
                        		   "zip5": "08052",
                        		   "country": "US"
                        		   },
                        		   "primaryEmail": "pspso@enspirecommerce.com",
                        		   "primaryPhone": "516-476-8612"
                        		   }
                        		   ,
                        		   "priceInfo": {
                        		   "unitPrice": 77.99,
                        		   "retailPrice": 77.99,
                        		   "listPrice": 97.99
                        		   },
                        		   "returnTo": {
                        		   "firstName": "Sita",
                        		   "lastName": "P",
                        		   "primaryEmail": "sita@enspirecommerce.com",
                        		   "primaryPhone": "546-345-6450",
                        		   "address": {
                        		   "address1": "4061  Oakmound Drive",
                        		   "city": "Chicago",
                        		   "state": "IL",
                        		   "zip5": "60620",
                        		   "country": "US"
                        		   }
                        		   },
                        		   "billToContactInfo": {
                        		           "firstName": "Manoj",
                        		           "lastName": "Sahu",
                        		           "primaryEmail": "manoj@enspirecommerce.com",
                        		           "primaryPhone": "546-345-6458",
                        		           "address": {
                        		             "address1": "3822  Todds Lane",
                        		             "city": "San Antonio",
                        		             "state": "TX",
                        		             "zip5": "78212",
                        		             "country": "US"
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
                    		expect(response.body.developerMessage).toContain("lineItems[0].returnTo: may not be null");
                    		done();

                         });
                   }),
                   
                   
                   
                   it("TC - 27 -> Without return from header level", done =>{

                       var options = {
                           method: 'POST',
                           url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                           headers: {
                               'Content-Type': 'application/json',
                               'Authorization': 'Bearer '+token
                           },
                           

                          body: {
                        	  "orders": [{
                        		  "orderDate":"2019-03-05T13:24:15-08:00",
                        		  "orderNumber":order+27,
                        		  "channel": "B2B",
                        		  "orderOrganization": "TheHonestKitchen-Organization-",
                        		  "orderTransactionType": "Return",
                        		   "returnSite":"joliet-dc",
                        		  "lineItems": [
                        		  {
                        		  "lineNumber": 1,
                        		  "status":"OPEN",
                        		  "lineItemId": "AcuSKU2",
                        		  "lineItemQty": 1,
                        		  "originalOrderedQty": 1,
                        		  "originalLine":{
                        		      "orderNo":"000000013796",
                        		      "orderOrganization":"TheHonestKitchen-Organization-",
                        		      "lineNumber":1
                        		    },
                        		  "returnFrom":
                        		  {
                        		  "firstName": "ram",
                        		  "lastName": "Das",
                        		  "address": {
                        		  "address1": "2259  Watson Street",
                        		  "city": "Maple Shade",
                        		  "state": "NJ",
                        		  "zip5": "08052",
                        		  "country": "US"
                        		  },
                        		  "primaryEmail": "pspso@enspirecommerce.com",
                        		  "primaryPhone": "516-476-8612"
                        		  }
                        		  ,
                        		  "priceInfo": {
                        		  "unitPrice": 77.99,
                        		  "retailPrice": 77.99,
                        		  "listPrice": 97.99
                        		  },
                        		  "returnTo": {
                        		  "firstName": "Sita",
                        		  "lastName": "P",
                        		  "primaryEmail": "sita@enspirecommerce.com",
                        		  "primaryPhone": "546-345-6450",
                        		  "address": {
                        		  "address1": "4061  Oakmound Drive",
                        		  "city": "Chicago",
                        		  "state": "IL",
                        		  "zip5": "60620",
                        		  "country": "US"
                        		  }
                        		  }
                        		  }
                        		  ],

                        		  "priceInfo": {
                        		  "unitPrice": 77.99,
                        		  "retailPrice": 77.99,
                        		  "listPrice": 97.99
                        		  },
                        		  "returnTo": {
                        		  "firstName": "Sita",
                        		  "lastName": "P",
                        		  "primaryEmail": "sita@enspirecommerce.com",
                        		  "primaryPhone": "546-345-6450",
                        		  "address": {
                        		  "address1": "4061  Oakmound Drive",
                        		  "city": "Chicago",
                        		  "state": "IL",
                        		  "zip5": "60620",
                        		  "country": "US"
                        		  }
                        		  },
                        		  "billToContactInfo": {
                        		          "firstName": "Manoj",
                        		          "lastName": "Sahu",
                        		          "primaryEmail": "manoj@enspirecommerce.com",
                        		          "primaryPhone": "546-345-6458",
                        		          "address": {
                        		            "address1": "3822  Todds Lane",
                        		            "city": "San Antonio",
                        		            "state": "TX",
                        		            "zip5": "78212",
                        		            "country": "US"
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
                   		expect(response.body.developerMessage).toContain("returnFrom: may not be null");
                   		done();

                        });
                  }),
                  
                  
                  
                  
                  it("TC - 28 -> Without return to in header level", done =>{

                      var options = {
                          method: 'POST',
                          url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': 'Bearer '+token
                          },
                          

                         body: {
                        	 "orders": [{
                        		 "orderDate":"2019-03-05T13:24:15-08:00",
                        		 "orderNumber":order+28,
                        		 "channel": "B2B",
                        		 "orderOrganization": "TheHonestKitchen-Organization-",
                        		 "orderTransactionType": "Return",
                        		  "returnSite":"joliet-dc",
                        		 "lineItems": [
                        		 {
                        		 "lineNumber": 1,
                        		 "status":"OPEN",
                        		 "lineItemId": "AcuSKU2",
                        		 "lineItemQty": 1,
                        		 "originalOrderedQty": 1,
                        		 "originalLine":{
                        		     "orderNo":"000000013796",
                        		     "orderOrganization":"TheHonestKitchen-Organization-",
                        		     "lineNumber":1
                        		   },
                        		 "returnFrom":
                        		 {
                        		 "firstName": "ram",
                        		 "lastName": "Das",
                        		 "address": {
                        		 "address1": "2259  Watson Street",
                        		 "city": "Maple Shade",
                        		 "state": "NJ",
                        		 "zip5": "08052",
                        		 "country": "US"
                        		 },
                        		 "primaryEmail": "pspso@enspirecommerce.com",
                        		 "primaryPhone": "516-476-8612"
                        		 }
                        		 ,
                        		 "priceInfo": {
                        		 "unitPrice": 77.99,
                        		 "retailPrice": 77.99,
                        		 "listPrice": 97.99
                        		 },
                        		 "returnTo": {
                        		 "firstName": "Sita",
                        		 "lastName": "P",
                        		 "primaryEmail": "sita@enspirecommerce.com",
                        		 "primaryPhone": "546-345-6450",
                        		 "address": {
                        		 "address1": "4061  Oakmound Drive",
                        		 "city": "Chicago",
                        		 "state": "IL",
                        		 "zip5": "60620",
                        		 "country": "US"
                        		 }
                        		 }
                        		 }
                        		 ],
                        		 "returnFrom":
                        		 {
                        		 "firstName": "ram",
                        		 "lastName": "Das",
                        		 "address": {
                        		 "address1": "2259  Watson Street",
                        		 "city": "Maple Shade",
                        		 "state": "NJ",
                        		 "zip5": "08052",
                        		 "country": "US"
                        		 },
                        		 "primaryEmail": "pspso@enspirecommerce.com",
                        		 "primaryPhone": "516-476-8612"
                        		 }
                        		 ,


                        		 "billToContactInfo": {
                        		         "firstName": "Manoj",
                        		         "lastName": "Sahu",
                        		         "primaryEmail": "manoj@enspirecommerce.com",
                        		         "primaryPhone": "546-345-6458",
                        		         "address": {
                        		           "address1": "3822  Todds Lane",
                        		           "city": "San Antonio",
                        		           "state": "TX",
                        		           "zip5": "78212",
                        		           "country": "US"
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
                  		expect(response.body.developerMessage).toContain("returnTo: may not be null");
                  		done();

                       });
                 }),
                 
                 
                 
                 
                 it("TC - 29 -> Mandatory with blind return", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: {
                        	"orders": [{
                        		"orderDate":"2019-03-05T13:24:15-08:00",
                        		"orderNumber":order+29,
                        		"channel": "B2B",
                        		"orderOrganization": "TheHonestKitchen-Organization-",
                        		"orderTransactionType": "Return",
                        		 "returnSite":"joliet-dc",
                        		"lineItems": [
                        		{
                        		"lineNumber": 1,
                        		"status":"OPEN",
                        		"lineItemId": "AcuSKU2",
                        		"lineItemQty": 1,
                        		"originalOrderedQty": 1,

                        		"returnFrom":
                        		{
                        		"firstName": "ram",
                        		"lastName": "Das",
                        		"address": {
                        		"address1": "2259  Watson Street",
                        		"city": "Maple Shade",
                        		"state": "NJ",
                        		"zip5": "08052",
                        		"country": "US"
                        		},
                        		"primaryEmail": "pspso@enspirecommerce.com",
                        		"primaryPhone": "516-476-8612"
                        		}
                        		,
                        		"priceInfo": {
                        		"unitPrice": 77.99,
                        		"retailPrice": 77.99,
                        		"listPrice": 97.99
                        		},
                        		"returnTo": {
                        		"firstName": "Sita",
                        		"lastName": "P",
                        		"primaryEmail": "sita@enspirecommerce.com",
                        		"primaryPhone": "546-345-6450",
                        		"address": {
                        		"address1": "4061  Oakmound Drive",
                        		"city": "Chicago",
                        		"state": "IL",
                        		"zip5": "60620",
                        		"country": "US"
                        		}
                        		}
                        		}
                        		],
                        		"returnFrom":
                        		{
                        		"firstName": "ram",
                        		"lastName": "Das",
                        		"address": {
                        		"address1": "2259  Watson Street",
                        		"city": "Maple Shade",
                        		"state": "NJ",
                        		"zip5": "08052",
                        		"country": "US"
                        		},
                        		"primaryEmail": "pspso@enspirecommerce.com",
                        		"primaryPhone": "516-476-8612"
                        		}
                        		,

                        		"returnTo": {
                        		"firstName": "Sita",
                        		"lastName": "P",
                        		"primaryEmail": "sita@enspirecommerce.com",
                        		"primaryPhone": "546-345-6450",
                        		"address": {
                        		"address1": "4061  Oakmound Drive",
                        		"city": "Chicago",
                        		"state": "IL",
                        		"zip5": "60620",
                        		"country": "US"
                        		}
                        		},
                        		"billToContactInfo": {
                        		        "firstName": "Manoj",
                        		        "lastName": "Sahu",
                        		        "primaryEmail": "manoj@enspirecommerce.com",
                        		        "primaryPhone": "546-345-6458",
                        		        "address": {
                        		          "address1": "3822  Todds Lane",
                        		          "city": "San Antonio",
                        		          "state": "TX",
                        		          "zip5": "78212",
                        		          "country": "US"
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
                 		expect(response.body.orders[0].orderNumber).toBe(order+29);
                 		done();

                      });
                }),
                 
                 
                 
                 
                 
                 it("TC - 30 -> Blind return without billtocontactinfo", done =>{

                     var options = {
                         method: 'POST',
                         url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                         headers: {
                             'Content-Type': 'application/json',
                             'Authorization': 'Bearer '+token
                         },
                         

                        body: {
	                        	"orders": [{
	                        		"orderDate":"2019-03-05T13:24:15-08:00",
	                        		"orderNumber":order+30,
	                        		"channel": "B2B",
	                        		"orderOrganization": "TheHonestKitchen-Organization-",
	                        		"orderTransactionType": "Return",
	                        		 "returnSite":"joliet-dc",
	                        		"lineItems": [
	                        		{
	                        		"lineNumber": 1,
	                        		"status":"OPEN",
	                        		"lineItemId": "AcuSKU2",
	                        		"lineItemQty": 1,
	                        		"originalOrderedQty": 1,
	
	                        		"returnFrom":
	                        		{
	                        		"firstName": "ram",
	                        		"lastName": "Das",
	                        		"address": {
	                        		"address1": "2259  Watson Street",
	                        		"city": "Maple Shade",
	                        		"state": "NJ",
	                        		"zip5": "08052",
	                        		"country": "US"
	                        		},
	                        		"primaryEmail": "pspso@enspirecommerce.com",
	                        		"primaryPhone": "516-476-8612"
	                        		}
	                        		,
	                        		"priceInfo": {
	                        		"unitPrice": 77.99,
	                        		"retailPrice": 77.99,
	                        		"listPrice": 97.99
	                        		},
	                        		"returnTo": {
	                        		"firstName": "Sita",
	                        		"lastName": "P",
	                        		"primaryEmail": "sita@enspirecommerce.com",
	                        		"primaryPhone": "546-345-6450",
	                        		"address": {
	                        		"address1": "4061  Oakmound Drive",
	                        		"city": "Chicago",
	                        		"state": "IL",
	                        		"zip5": "60620",
	                        		"country": "US"
	                        		}
	                        		}
	                        		}
	                        		],
	                        		"returnFrom":
	                        		{
	                        		"firstName": "ram",
	                        		"lastName": "Das",
	                        		"address": {
	                        		"address1": "2259  Watson Street",
	                        		"city": "Maple Shade",
	                        		"state": "NJ",
	                        		"zip5": "08052",
	                        		"country": "US"
	                        		},
	                        		"primaryEmail": "pspso@enspirecommerce.com",
	                        		"primaryPhone": "516-476-8612"
	                        		}
	                        		,
	
	                        		"returnTo": {
	                        		"firstName": "Sita",
	                        		"lastName": "P",
	                        		"primaryEmail": "sita@enspirecommerce.com",
	                        		"primaryPhone": "546-345-6450",
	                        		"address": {
	                        		"address1": "4061  Oakmound Drive",
	                        		"city": "Chicago",
	                        		"state": "IL",
	                        		"zip5": "60620",
	                        		"country": "US"
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
                 		expect(response.body.message).toContain("Bill to Contact must be present for Blind Return");
                 		done();

                      });
                })                
                
                
                
                
                
                it("TC - 31 -> Return order without order number to verify autocreation of order number", done =>{

                    var options = {
                        method: 'POST',
                        url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                        },
                        

                       body: {
                    		"orders": [{
                    			"orderDate": "2020-03-05T13:24:15-08:00",
                    			"channel": "B2B",
                    			"orderOrganization": "TheHonestKitchen-Organization-",
                    			"orderTransactionType": "Return",
                    			"returnSite": "joliet-dc",
                    			"lineItems": [{
                    				"lineNumber": 1,
                    				"status": "OPEN",
                    				"lineItemId": "AcuSKU2",
                    				"lineItemQty": 1,
                    				"originalOrderedQty": 1,
                    				"originalLine": {
                    					"orderNo": "000000013796",
                    					"orderOrganization": "TheHonestKitchen-Organization-",
                    					"lineNumber": 1
                    				},

                    				"returnFrom": {
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
                    					"unitPrice": 77.99,
                    					"retailPrice": 77.99,
                    					"listPrice": 97.99
                    				},
                    				"returnTo": {
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
                    				}
                    			}],
                    			"returnFrom": {
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
                    			"returnTo": {
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
                		expect(response.body.orders[0].orderNumber).toContain("RMA");
                		done();

                     });
               }),
               
               
               
               
               it("TC - 32 -> Return order with sku which is not belongs to that order", done =>{

                   var options = {
                       method: 'POST',
                       url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                       headers: {
                           'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
                       },
                       

                      body: {
                    	  "orders": [{
                    		  "orderDate":"2020-03-05T13:24:15-08:00",
                    		  "channel": "B2B",
                    		  "orderOrganization": "TheHonestKitchen-Organization-",
                    		  "orderTransactionType": "Return",
                    		   "returnSite":"joliet-dc",
                    		  "lineItems": [
                    		  {
                    		  "lineNumber": 1,
                    		  "status":"OPEN",
                    		  "lineItemId": "AcuPresale",
                    		  "lineItemQty": 1,
                    		  "originalOrderedQty": 1,
                    		  "originalLine":{
                    		      "orderNo":"000000013816",
                    		      "orderOrganization":"TheHonestKitchen-Organization-",
                    		      "lineNumber":1
                    		    },
                    		  "returnFrom":
                    		  {
                    		  "firstName": "ram",
                    		  "lastName": "Das",
                    		  "address": {
                    		  "address1": "2259  Watson Street",
                    		  "city": "Maple Shade",
                    		  "state": "NJ",
                    		  "zip5": "08052",
                    		  "country": "US"
                    		  },
                    		  "primaryEmail": "pspso@enspirecommerce.com",
                    		  "primaryPhone": "516-476-8612"
                    		  }
                    		  ,

                    		  "returnTo": {
                    		  "firstName": "Sita",
                    		  "lastName": "P",
                    		  "primaryEmail": "sita@enspirecommerce.com",
                    		  "primaryPhone": "546-345-6450",
                    		  "address": {
                    		  "address1": "4061  Oakmound Drive",
                    		  "city": "Chicago",
                    		  "state": "IL",
                    		  "zip5": "60620",
                    		  "country": "US"
                    		  }
                    		  }
                    		  }
                    		  ],
                    		  "returnFrom":
                    		  {
                    		  "firstName": "ram",
                    		  "lastName": "Das",
                    		  "address": {
                    		  "address1": "2259  Watson Street",
                    		  "city": "Maple Shade",
                    		  "state": "NJ",
                    		  "zip5": "08052",
                    		  "country": "US"
                    		  },
                    		  "primaryEmail": "pspso@enspirecommerce.com",
                    		  "primaryPhone": "516-476-8612"
                    		  }
                    		  ,
                    		  "priceInfo": {
                    		  "unitPrice": 77.99,
                    		  "retailPrice": 77.99,
                    		  "listPrice": 97.99
                    		  },
                    		  "returnTo": {
                    		  "firstName": "Sita",
                    		  "lastName": "P",
                    		  "primaryEmail": "sita@enspirecommerce.com",
                    		  "primaryPhone": "546-345-6450",
                    		  "address": {
                    		  "address1": "4061  Oakmound Drive",
                    		  "city": "Chicago",
                    		  "state": "IL",
                    		  "zip5": "60620",
                    		  "country": "US"
                    		  }
                    		  },
                    		  "billToContactInfo": {
                    		          "firstName": "Manoj",
                    		          "lastName": "Sahu",
                    		          "primaryEmail": "manoj@enspirecommerce.com",
                    		          "primaryPhone": "546-345-6458",
                    		          "address": {
                    		            "address1": "3822  Todds Lane",
                    		            "city": "San Antonio",
                    		            "state": "TX",
                    		            "zip5": "78212",
                    		            "country": "US"
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
               		expect(response.body.message).toContain("Sales order SKU AcuSKU2 is different from return order SKU AcuPresale");
               		done();

                    });
              }),
              
              
              
              
              it("TC - 33 -> Return blind return with the sku which is not present in system", done =>{

                  var options = {
                      method: 'POST',
                      url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token
                      },
                      

                     body: {
                    	 "orders": [{
                    		 "orderDate":"2019-03-05T13:24:15-08:00",
                    		 "orderNumber":order+33,
                    		 "channel": "B2B",
                    		 "status":"Draft",
                    		 "orderOrganization": "TheHonestKitchen-Organization-",
                    		 "orderTransactionType": "Return",
                    		  "returnSite":"joliet-dc",
                    		 "lineItems": [
                    		 {
                    		 "lineNumber": 1,
                    		 "status":"OPEN",
                    		 "lineItemId": "AcuSKU212",
                    		 "lineItemQty": 1,
                    		 "originalOrderedQty": 1,

                    		 "returnFrom":
                    		 {
                    		 "firstName": "ram",
                    		 "lastName": "Das",
                    		 "address": {
                    		 "address1": "2259  Watson Street",
                    		 "city": "Maple Shade",
                    		 "state": "NJ",
                    		 "zip5": "08052",
                    		 "country": "US"
                    		 },
                    		 "primaryEmail": "pspso@enspirecommerce.com",
                    		 "primaryPhone": "516-476-8612"
                    		 }
                    		 ,
                    		 "priceInfo": {
                    		 "unitPrice": 77.99,
                    		 "retailPrice": 77.99,
                    		 "listPrice": 97.99
                    		 },
                    		 "returnTo": {
                    		 "firstName": "Sita",
                    		 "lastName": "P",
                    		 "primaryEmail": "sita@enspirecommerce.com",
                    		 "primaryPhone": "546-345-6450",
                    		 "address": {
                    		 "address1": "4061  Oakmound Drive",
                    		 "city": "Chicago",
                    		 "state": "IL",
                    		 "zip5": "60620",
                    		 "country": "US"
                    		 }
                    		 }
                    		 }
                    		 ],
                    		 "returnFrom":
                    		 {
                    		 "firstName": "ram",
                    		 "lastName": "Das",
                    		 "address": {
                    		 "address1": "2259  Watson Street",
                    		 "city": "Maple Shade",
                    		 "state": "NJ",
                    		 "zip5": "08052",
                    		 "country": "US"
                    		 },
                    		 "primaryEmail": "pspso@enspirecommerce.com",
                    		 "primaryPhone": "516-476-8612"
                    		 }
                    		 ,

                    		 "returnTo": {
                    		 "firstName": "Sita",
                    		 "lastName": "P",
                    		 "primaryEmail": "sita@enspirecommerce.com",
                    		 "primaryPhone": "546-345-6450",
                    		 "address": {
                    		 "address1": "4061  Oakmound Drive",
                    		 "city": "Chicago",
                    		 "state": "IL",
                    		 "zip5": "60620",
                    		 "country": "US"
                    		 }
                    		 },
                    		 "billToContactInfo": {
                    		         "firstName": "Manoj",
                    		         "lastName": "Sahu",
                    		         "primaryEmail": "manoj@enspirecommerce.com",
                    		         "primaryPhone": "546-345-6458",
                    		         "address": {
                    		           "address1": "3822  Todds Lane",
                    		           "city": "San Antonio",
                    		           "state": "TX",
                    		           "zip5": "78212",
                    		           "country": "US"
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
              		expect(response.statusCode).toBe(404);
              		expect(response.body.message).toContain("Sku AcuSKU212 not found");
              		done();

                   });
             }),
             
             
             
             
             
             it("TC - 34 -> Return order with order date which is not belongs to the date on which order is created", done =>{

                 var options = {
                     method: 'POST',
                     url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+token
                     },
                     

                body: {
                    	"orders": [{
                    		"orderDate":"2019-03-05T13:24:15-08:00",
                    		"orderNumber":order+34,
                    		"channel": "B2B",
                    		"orderOrganization": "TheHonestKitchen-Organization-",
                    		"orderTransactionType": "Return",
                    		 "returnSite":"joliet-dc",
                    		"lineItems": [
                    		{
                    		"lineNumber": 1,
                    		"status":"OPEN",
                    		"lineItemId": "AcuSKU2",
                    		"lineItemQty": 1,
                    		"originalOrderedQty": 1,
                    		"originalLine":{
                    		    "orderNo":"AQA010108",
                    		    "orderOrganization":"TheHonestKitchen-Organization-",
                    		    "lineNumber":1
                    		  },
                    		"returnFrom":
                    		{
                    		"firstName": "ram",
                    		"lastName": "Das",
                    		"address": {
                    		"address1": "2259  Watson Street",
                    		"city": "Maple Shade",
                    		"state": "NJ",
                    		"zip5": "08052",
                    		"country": "US"
                    		},
                    		"primaryEmail": "pspso@enspirecommerce.com",
                    		"primaryPhone": "516-476-8612"
                    		}
                    		,
                    		"priceInfo": {
                    		"unitPrice": 77.99,
                    		"retailPrice": 77.99,
                    		"listPrice": 97.99
                    		},
                    		"returnTo": {
                    		"firstName": "Sita",
                    		"lastName": "P",
                    		"primaryEmail": "sita@enspirecommerce.com",
                    		"primaryPhone": "546-345-6450",
                    		"address": {
                    		"address1": "4061  Oakmound Drive",
                    		"city": "Chicago",
                    		"state": "IL",
                    		"zip5": "60620",
                    		"country": "US"
                    		}
                    		}
                    		}
                    		],
                    		"returnFrom":
                    		{
                    		"firstName": "ram",
                    		"lastName": "Das",
                    		"address": {
                    		"address1": "2259  Watson Street",
                    		"city": "Maple Shade",
                    		"state": "NJ",
                    		"zip5": "08052",
                    		"country": "US"
                    		},
                    		"primaryEmail": "pspso@enspirecommerce.com",
                    		"primaryPhone": "516-476-8612"
                    		}
                    		,

                    		"returnTo": {
                    		"firstName": "Sita",
                    		"lastName": "P",
                    		"primaryEmail": "sita@enspirecommerce.com",
                    		"primaryPhone": "546-345-6450",
                    		"address": {
                    		"address1": "4061  Oakmound Drive",
                    		"city": "Chicago",
                    		"state": "IL",
                    		"zip5": "60620",
                    		"country": "US"
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
             		expect(response.body.message).toContain("Return order date 12/27/19 4:24 PM must be greater than sales order date");
             		done();

                  });
            }),
            
            
            
            
            it("TC - 35 -> Return order where channel is different from created channel", done =>{

                var options = {
                    method: 'POST',
                    url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    },
                    

	               body: {
	            		"orders": [{
	            			"orderDate": "2020-03-05T13:24:15-08:00",
	            			"channel": "B2C",
	            			"orderOrganization": "TheHonestKitchen-Organization-",
	            			"orderTransactionType": "Return",
	            			"returnSite": "joliet-dc",
	            			"lineItems": [{
	            				"lineNumber": 1,
	            				"status": "OPEN",
	            				"lineItemId": "AcuSKU2",
	            				"lineItemQty": 1,
	            				"originalOrderedQty": 1,
	            				"originalLine": {
	            					"orderNo": "000000013796",
	            					"orderOrganization": "TheHonestKitchen-Organization-",
	            					"lineNumber": 1
	            				},
	
	            				"returnFrom": {
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
	            					"unitPrice": 77.99,
	            					"retailPrice": 77.99,
	            					"listPrice": 97.99
	            				},
	            				"returnTo": {
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
	            				}
	            			}],
	            			"returnFrom": {
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
	            			"returnTo": {
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
            		expect(response.body.orders[0].orderNumber).toContain("RMA");
            		done();

                 });
           }),
           
           
           
           
           it("TC - 36 -> Return order with same order number two times", done =>{

               var options = {
                   method: 'POST',
                   url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': 'Bearer '+token
                   },
                   

	               body: {
	            	   "orders": [{
	            		   "orderDate":"2020-03-05T13:24:15-08:00",
	            		   "orderNumber":"AQA0101086",
	            		   "channel": "B2B",
	            		   "orderOrganization": "TheHonestKitchen-Organization-",
	            		   "orderTransactionType": "Return",
	            		    "returnSite":"joliet-dc",
	            		   "lineItems": [
	            		   {
	            		   "lineNumber": 1,
	            		   "status":"OPEN",
	            		   "lineItemId": "AcuSKU2",
	            		   "lineItemQty": 1,
	            		   "originalLine":{
	            		       "orderNo":"000000013796",
	            		       "orderOrganization":"TheHonestKitchen-Organization-",
	            		       "lineNumber":1,
	            		       "shipmentRequestNo":""
	            		     },
	            		   "returnFrom":
	            		   {
	            		   "firstName": "ram",
	            		   "lastName": "Das",
	            		   "address": {
	            		   "address1": "2259  Watson Street",
	            		   "city": "Maple Shade",
	            		   "state": "NJ",
	            		   "zip5": "08052",
	            		   "country": "US"
	            		   },
	            		   "primaryEmail": "pspso@enspirecommerce.com",
	            		   "primaryPhone": "516-476-8612"
	            		   }
	            		   ,
	            		   "priceInfo": {
	            		   "unitPrice": 77.99,
	            		   "retailPrice": 77.99,
	            		   "listPrice": 97.99
	            		   },
	            		   "returnTo": {
	            		   "firstName": "Sita",
	            		   "lastName": "P",
	            		   "primaryEmail": "sita@enspirecommerce.com",
	            		   "primaryPhone": "546-345-6450",
	            		   "address": {
	            		   "address1": "4061  Oakmound Drive",
	            		   "city": "Chicago",
	            		   "state": "IL",
	            		   "zip5": "60620",
	            		   "country": "US"
	            		   }
	            		   }
	            		   }
	            		   ],
	            		   "returnFrom":
	            		   {
	            		   "firstName": "ram",
	            		   "lastName": "Das",
	            		   "address": {
	            		   "address1": "2259  Watson Street",
	            		   "city": "Maple Shade",
	            		   "state": "NJ",
	            		   "zip5": "08052",
	            		   "country": "US"
	            		   },
	            		   "primaryEmail": "pspso@enspirecommerce.com",
	            		   "primaryPhone": "516-476-8612"
	            		   }
	            		   ,
	            		   "priceInfo": {
	            		   "unitPrice": 77.99,
	            		   "retailPrice": 77.99,
	            		   "listPrice": 97.99
	            		   },
	            		   "returnTo": {
	            		   "firstName": "Sita",
	            		   "lastName": "P",
	            		   "primaryEmail": "sita@enspirecommerce.com",
	            		   "primaryPhone": "546-345-6450",
	            		   "address": {
	            		   "address1": "4061  Oakmound Drive",
	            		   "city": "Chicago",
	            		   "state": "IL",
	            		   "zip5": "60620",
	            		   "country": "US"
	            		   }
	            		   },
	            		   "billToContactInfo": {
	            		           "firstName": "Manoj",
	            		           "lastName": "Sahu",
	            		           "primaryEmail": "manoj@enspirecommerce.com",
	            		           "primaryPhone": "546-345-6458",
	            		           "address": {
	            		             "address1": "3822  Todds Lane",
	            		             "city": "San Antonio",
	            		             "state": "TX",
	            		             "zip5": "78212",
	            		             "country": "US"
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
           		expect(response.body.message).toContain("Can not Save returnMerchandiseAuthorization with refName:AQA0101086 because one already exists with in the passed data domain of com.thk");
           		done();

                });
          }),
          
          
          
          
          it("TC - 37 -> Return order which is already returned", done =>{

              var options = {
                  method: 'POST',
                  url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+token
                  },
                  

	               body: {
	            	   "orders": [{
	            		   "orderDate":"2020-03-05T13:24:15-08:00",
	            		   "channel": "B2B",
	            		   "orderOrganization": "TheHonestKitchen-Organization-",
	            		   "orderTransactionType": "Return",
	            		    "returnSite":"joliet-dc",
	            		   "lineItems": [
	            		   {
	            		   "lineNumber": 1,
	            		   "status":"OPEN",
	            		   "lineItemId": "AcuSKU2",
	            		   "lineItemQty": 1,
	            		   "originalOrderedQty": 1,
	            		   "originalLine":{
	            		       "orderNo":"AQA010113",
	            		       "orderOrganization":"TheHonestKitchen-Organization-",
	            		       "lineNumber":1
	            		     },
	            		   "returnFrom":
	            		   {
	            		   "firstName": "ram",
	            		   "lastName": "Das",
	            		   "address": {
	            		   "address1": "2259  Watson Street",
	            		   "city": "Maple Shade",
	            		   "state": "NJ",
	            		   "zip5": "08052",
	            		   "country": "US"
	            		   },
	            		   "primaryEmail": "pspso@enspirecommerce.com",
	            		   "primaryPhone": "516-476-8612"
	            		   },

	            		   "returnTo": {
	            		   "firstName": "Sita",
	            		   "lastName": "P",
	            		   "primaryEmail": "sita@enspirecommerce.com",
	            		   "primaryPhone": "546-345-6450",
	            		   "address": {
	            		   "address1": "4061  Oakmound Drive",
	            		   "city": "Chicago",
	            		   "state": "IL",
	            		   "zip5": "60620",
	            		   "country": "US"
	            		   }
	            		   }
	            		   }
	            		   ],
	            		   "returnFrom":
	            		   {
	            		   "firstName": "ram",
	            		   "lastName": "Das",
	            		   "address": {
	            		   "address1": "2259  Watson Street",
	            		   "city": "Maple Shade",
	            		   "state": "NJ",
	            		   "zip5": "08052",
	            		   "country": "US"
	            		   },
	            		   "primaryEmail": "pspso@enspirecommerce.com",
	            		   "primaryPhone": "516-476-8612"
	            		   }
	            		   ,
	            		   "priceInfo": {
	            		   "unitPrice": 77.99,
	            		   "retailPrice": 77.99,
	            		   "listPrice": 97.99
	            		   },
	            		   "returnTo": {
	            		   "firstName": "Sita",
	            		   "lastName": "P",
	            		   "primaryEmail": "sita@enspirecommerce.com",
	            		   "primaryPhone": "546-345-6450",
	            		   "address": {
	            		   "address1": "4061  Oakmound Drive",
	            		   "city": "Chicago",
	            		   "state": "IL",
	            		   "zip5": "60620",
	            		   "country": "US"
	            		   }
	            		   },
	            		   "billToContactInfo": {
	            		           "firstName": "Manoj",
	            		           "lastName": "Sahu",
	            		           "primaryEmail": "manoj@enspirecommerce.com",
	            		           "primaryPhone": "546-345-6458",
	            		           "address": {
	            		             "address1": "3822  Todds Lane",
	            		             "city": "San Antonio",
	            		             "state": "TX",
	            		             "zip5": "78212",
	            		             "country": "US"
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
          		expect(response.body.message).toContain("Cannot return 1 of Product:AcuSKU2 because only 1 have been shipped and 1 have already been returned");
          		done();

               });
         }),
         
         
         
         
         
         it("TC - 39 -> Return order by providing wrong line number", done =>{

             var options = {
                 method: 'POST',
                 url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer '+token
                 },
                 

	               body: {
	            		"orders": [{
	            			"orderDate": "2020-03-05T13:24:15-08:00",
	            			"channel": "B2B",
	            			"orderOrganization": "TheHonestKitchen-Organization-",
	            			"orderTransactionType": "Return",
	            			"returnSite": "joliet-dc",
	            			"lineItems": [{
	            				"lineNumber": 2,
	            				"status": "OPEN",
	            				"lineItemId": "AcuSKU2",
	            				"lineItemQty": 1,
	            				"originalOrderedQty": 1,
	            				"originalLine": {
	            					"orderNo": "000000013796",
	            					"orderOrganization": "TheHonestKitchen-Organization-",
	            					"lineNumber": 1
	            				},

	            				"returnFrom": {
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
	            					"unitPrice": 77.99,
	            					"retailPrice": 77.99,
	            					"listPrice": 97.99
	            				},
	            				"returnTo": {
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
	            				}
	            			}],
	            			"returnFrom": {
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
	            			"returnTo": {
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
         		expect(response.body.orders[0].orderNumber).toContain("RMA");
         		done();

              });
        }),
        
        
        
        
        
        it("TC - 40 -> Return order with multiple line items", done =>{

            var options = {
                method: 'POST',
                url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
                

	               body: {
	            		"orders": [{
	            			"orderDate": "2020-03-05T13:24:15-08:00",
	            			"channel": "B2B",
	            			"orderOrganization": "TheHonestKitchen-Organization-",
	            			"orderTransactionType": "Return",
	            			"returnSite": "joliet-dc",
	            			"lineItems": [{
	            				"lineNumber": 1,
	            				"status": "OPEN",
	            				"lineItemId": "AcuSKU2",
	            				"lineItemQty": 1,
	            				"originalOrderedQty": 1,
	            				"originalLine": {
	            					"orderNo": "000000013816",
	            					"orderOrganization": "TheHonestKitchen-Organization-",
	            					"lineNumber": 1
	            				},

	            				"returnFrom": {
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
	            					"unitPrice": 77.99,
	            					"retailPrice": 77.99,
	            					"listPrice": 97.99
	            				},
	            				"returnTo": {
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
	            				}
	            			},
	            			{
	            				"lineNumber": 2,
	            				"status": "OPEN",
	            				"lineItemId": "AcuSKU1",
	            				"lineItemQty": 1,
	            				"originalOrderedQty": 1,
	            				"originalLine": {
	            					"orderNo": "000000013816",
	            					"orderOrganization": "TheHonestKitchen-Organization-",
	            					"lineNumber": 2
	            				},

	            				"returnFrom": {
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
	            					"unitPrice": 77.99,
	            					"retailPrice": 77.99,
	            					"listPrice": 97.99
	            				},
	            				"returnTo": {
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
	            				}
	            			}],
	            			"returnFrom": {
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
	            			"returnTo": {
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
        		expect(response.body.orders[0].orderNumber).toContain("RMA");
        		done();

             });
       }),
       
       
       
       
       
       it("TC - 41 -> Return order which is in OPEN Status", done =>{

           var options = {
               method: 'POST',
               url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer '+token
               },
               

	               body: {
	            		"orders": [{
	            			"orderDate": "2020-03-05T13:24:15-08:00",
	            			"channel": "B2B",
	            			"orderOrganization": "TheHonestKitchen-Organization-",
	            			"orderTransactionType": "Return",
	            			"returnSite": "joliet-dc",
	            			"lineItems": [{
	            				"lineNumber": 1,
	            				"status": "OPEN",
	            				"lineItemId": "AcuSKU2",
	            				"lineItemQty": 1,
	            				"originalOrderedQty": 1,
	            				"originalLine": {
	            					"orderNo": "000000013662",
	            					"orderOrganization": "TheHonestKitchen-Organization-",
	            					"lineNumber": 1
	            				},

	            				"returnFrom": {
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
	            					"unitPrice": 77.99,
	            					"retailPrice": 77.99,
	            					"listPrice": 97.99
	            				},
	            				"returnTo": {
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
	            				}
	            			}],
	            			"returnFrom": {
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
	            			"returnTo": {
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
       		expect(response.body.message).toContain("Order 000000013662 is OPEN hence cannot be returned");
       		done();

            });
      }),
       
                 
      
      
      
      it("TC - 44 -> Return order with all fileds", done =>{

          var options = {
              method: 'POST',
              url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token
              },
              

               body: {
            	   "orders": [
            		    {
            		      "priority": "1",
            		      "orderDate": "2019-04-05T13:24:15-08:00",
            			  "orderNumber": order+44,
            		      "orderType":"salesOrder",
            		      "purchaseOrderNumber": "AQA0101097",
            		      "channel": "B2B",
            		      "status": "Open",
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "Return",
            		      "enteredBy": "priti",
            		      "enspireCreateDate": "2019-03-08T11:30:15-08:00",
            		               "returnSite":"joliet-dc",
            		      "lineItems": [
            		        {
            		          "lineNumber": 1,
            		          "status": "OPEN",
            		          "retailerReferenceItemSKU": "aaa",
            		          "lineItemId": "AcuSKU2",
            		          "itemTitle": "AcuSKU2",
            		          "itemDescription": "Computers",
            		          "itemUnitOfMeasure": "EA",
            		          "itemUnitPrice": "10",
            		          "returnSite":"joliet-dc",
            		          "lineItemQty": 1,
            		          "originalOrderedQty": 1,
            		          "deliveryMethod": "shipToHome",
            		          "fulfillmentType": "ShipToHome",
            		          "dispositionCode":"dfgh",
            		          "reasonCode": "ABC",
            		          "bundleParent": true,
            		          "gift": true,
            		          "expectedShipDate": "2019-03-07T11:30:15-08:00",
            		          "expectedDeliveryDate": "2019-03-08T11:30:15-08:00",
            		          "shippingCarrier": "FEDEX",
            		          "carrierServiceType": "FedExGround",
            		         "returnReason":"DAMAGED",
            		"originalLine":{
            		    "orderNo":"000000013796",
            		    "orderOrganization":"TheHonestKitchen-Organization-",
            		    "lineNumber":1
            		  },
            		     "returnFrom":
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
            		,
            		"returnTo": {
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
            		          "lineDiscounts": [
            		          	
            		            {
            		              "discountAmount": 2.99,
            		              "discountName": "ITEM_DISCOUNT",
            		              "originalDiscountAmount": 2.99
            		            },
            		            {
            		              "discountAmount": 2.99,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 2.99
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
            		              "promoId": "BUY1GET1Free",
            		              "promoGroup":"BOGOF",
            		              "promoType":"SELL"
            		            },
            		            {
            		              "promoId": "BUY2GET1Free",
            		              "promoGroup":"B2G1F",
            		              "promoType":"SELLS"
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
            		"returnFrom":
            		{
            		"firstName": "ram",
            		"lastName": "Das",
            		"address": {
            		"address1": "2259  Watson Street",
            		"city": "Maple Shade",
            		"state": "NJ",
            		"zip5": "08052",
            		"country": "US"
            		},
            		"primaryEmail": "pspso@enspirecommerce.com",
            		"primaryPhone": "516-476-8612"
            		}
            		,

            		"returnTo": {
            		"firstName": "Sita",
            		"lastName": "P",
            		"primaryEmail": "sita@enspirecommerce.com",
            		"primaryPhone": "546-345-6450",
            		"address": {
            		"address1": "4061  Oakmound Drive",
            		"city": "Chicago",
            		"state": "IL",
            		"zip5": "60620",
            		"country": "US"
            		}
            		},
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
            		      "orderDiscounts": [
            		        {
            		          "discountName": "50%",
            		          "discountAmount": 20,
            		          "originalDiscountAmount": 25
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
            		      "promos": [
            		        {
            		          "promoId": "BUY1GET150%",
            		          "promoGroup":"BOGOF",
            		          "promoType":"priti"
            		        }
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
		  		expect(response.statusCode).toBe(200);
		  		expect(response.body.orders[0].orderNumber).toContain(order+44);
		  		done();

		      });
      	})
});


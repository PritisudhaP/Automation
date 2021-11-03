const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');
global.bodytext = "";
global.SONumber="";
describe( "Order Line Cancel", function () {
	
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();

    it("Order Line cancel for SO witrh more than 50 lines", done =>{

    var options = {
        method: 'POST',
        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        

       body: {
   		"orders":[
			  {
				 "orderDate":"2018-03-05T11:24:15-08:00",
				 "orderNumber": order+1,
				 "status":"OPEN",
				 "channel":"B2B",
				 "orderOrganization":"TheHonestKitchen-Organization-",
				 "orderTransactionType":"Sales",
				 "lineItems":[
					{
					   "lineNumber":1,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":2,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":3,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":4,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":5,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":6,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":7,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":8,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":9,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":10,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":11,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":12,
					   "status":"OPEN",
					   "lineItemId": "18MSKU05",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},{
					   "lineNumber":13,
					   "status":"OPEN",
					   "lineItemId": "18MSKU06",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},{
					   "lineNumber":14,
					   "status":"OPEN",
					   "lineItemId": "18MSKU07",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},{
					   "lineNumber":15,
					   "status":"OPEN",
					   "lineItemId": "18MSKU08",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":16,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":17,
					   "status":"OPEN",
					   "lineItemId": "18MSKU10",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":18,
					   "status":"OPEN",
					   "lineItemId": "18MSKU12",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":19,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					
					{
					   "lineNumber":20,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					
					{
					   "lineNumber":21,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":22,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":23,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":24,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":25,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":26,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":27,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":28,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":29,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":30,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					
					{
					   "lineNumber":31,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":32,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":33,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":34,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":35,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":36,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":37,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":38,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":39,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					
					{
					   "lineNumber":40,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":41,
					   "status":"OPEN",
					   "lineItemId": "CivicSku2",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":42,
					   "status":"OPEN",
					   "lineItemId": "16SKU2101",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":43,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":44,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":45,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":46,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":47,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":48,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":49,
					   "status":"OPEN",
					   "lineItemId": "15SKU2107",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":50,
					   "status":"OPEN",
					   "lineItemId": "CivicSku1",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					},
					{
					   "lineNumber":51,
					   "status":"OPEN",
					   "lineItemId": "15SKU2109",
					   "lineItemQty":5,
					   "originalOrderedQty":5,
					   "shipToContact":{
						  "firstName":"Steve",
						  "lastName":"Smith",
						  "address":{
							 "address1":"1296 Regency",
							 "city":"Eugene",
							 "state":"OR",
							 "zip5":"97401",
							 "country":"US"
						  },
						  "primaryEmail":"sm@test.com",
						  "primaryPhone":"(000) 000-0429"
					   },
					   "priceInfo":{
						  "unitPrice":0.0,
						  "retailPrice":0.0,
						  "listPrice":0.0
					   }
					}
				 ],
				 "buyerContactInfo":{
					"firstName":"Steve",
					"lastName":"Smith",
					"primaryEmail":"sm@test.com",
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
					"firstName":"Steve",
					"lastName":"Smith",
					"primaryEmail":"sm@test.com",
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
		SONumber=response.body.orders[0].orderNumber;
		console.log("The Order Number  is "+SONumber);
		expect(response.statusCode).toBe(200);		
		done();

        });
    
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
        //utils.Login(browser.params.login.user,browser.params.login.password);
        browser.get(callCenterSalesOrdersListUrl);
        browser.driver.manage().window().maximize();
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);	 
        salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
        //browser.sleep(2000);
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
		savedStatus = value;
	    console.log("the orderstatus is "+savedStatus);	
	    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});		
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Cancel");
        browser.sleep(500);	    	       
        salesOrderSummary.itemsPerPage(51,2)
        browser.sleep(2500);
        salesOrderSummary.cancelAllLines();//canceling all the items at header level one by one by entering the reason.
        browser.sleep(2000);
        salesOrderSummary.CNFButton();
        browser.sleep(120000);
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED"); 
       /* browser.get(callCenterSalesOrdersListUrl);
        browser.driver.manage().window().maximize();
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
        	});
    	*/});
    });
});

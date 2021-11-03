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
global.SONumber1="";
describe( "Order Line Cancel", function () {
	
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();

    it("Create API order with RELEASED status and cancel at Line level", done =>{

    var options = {
        method: 'POST',
        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
       body:  {
    		"orders":[
    			  {
    				 "orderDate":"2021-07-16T11:24:15-08:00",
    				 "orderNumber":order+1,
    				 "status":"OPEN",
    				 "channel":"B2B",
    				 "orderOrganization":"TheHonestKitchen-Organization-",
    				 "orderTransactionType":"Sales",
    				 "lineItems":[
    					{
    					   "lineNumber":1,
    					   "status":"OPEN",
    					   "lineItemId": browser.params.searchValueSKU1,
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
     					   "lineItemId": browser.params.searchValueSKU2,
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
	        browser.get(callCenterSalesOrdersListUrl);
	        browser.driver.manage().window().maximize();
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        browser.sleep(2000);
	        salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          });
	        salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	        browser.sleep(100);
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Cancel Line");//Cancel button click 
	        browser.sleep(1000);
	        salesOrderSummary.CanclQTY(5)
	        salesOrderSummary.CanclReason("NotNeeded");
	        browser.sleep(1000);
	        salesOrderSummary.CNFButton();
	        browser.sleep(1000);
	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELED");
        });
    
    }),
    
     it("Create API order with RELEASED status and cancel at Header level", done =>{

    var options = {
        method: 'POST',
        url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
       body:  {
    		"orders":[
    			  {
    				 "orderDate":"2018-03-05T11:24:15-08:00",
    				 "orderNumber":order+2,
    				 "status":"OPEN",
    				 "channel":"B2B",
    				 "orderOrganization":"TheHonestKitchen-Organization-",
    				 "orderTransactionType":"Sales",
    				 "lineItems":[
    					{
    					   "lineNumber":1,
    					   "status":"OPEN",
    					   "lineItemId": browser.params.searchValueSKU1,
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
     					   "lineItemId": browser.params.searchValueSKU2,
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
		SONumber1=response.body.orders[0].orderNumber;
		console.log("The Order Number  is "+SONumber1);
		expect(response.statusCode).toBe(200);		
		done();

        });
    
	    browser.wait(function () {
	        return SONumber1 != '';
	    }).then(function () {
	       browser.get(callCenterSalesOrdersListUrl);
	       browser.driver.manage().window().maximize();
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);	 
	        browser.sleep(2000);
	        salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          });
	       salesOrderSummary.salesOrderSelectGear("Cancel");//editing the Order        
	       browser.sleep(500);	    	       
	       salesOrderSummary.cancelAllLines();//canceling all the items at header level one by one by entering the reason.
	       browser.sleep(2000);
	       salesOrderSummary.CNFButton();
	       browser.sleep(2000);
	       salesOrderSummary.salesOrderStatus().then(function (status) {
               orderStatus = status;
               console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
         });
	       
	    });
    
    })
    
});

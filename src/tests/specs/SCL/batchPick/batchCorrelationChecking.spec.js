const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var batchPickCreate = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.create.screen.js');
var batchPickEdit = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.edit.screen.js');
var batchPickSummary = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');

global.orderStatus = "";
global.SONumber = "";
var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');
global.bodytext = "";
global.SONumber="";
global.BatchId = "";
var ordernumbers = [];
global.qty="";
global.orders="";
var i = 0;
var j = 0;

describe("Batch Pick Medium Priority: ", function() {
  	var batchCreate = new batchPickCreate();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
  	var returnsCreate = new returnsCreateScreen();
  	var salesOrderEdit = new salesOrderEditScreen(); 
  	for(i=0;i<browser.params.listoforders;i++){
	  	it("Batch pick for more than 100 Qty", done =>{
	  		j++;
            console.log('J value is ' + j);
	        var options = {
	            method: 'POST',
	            url: 'https://project4-qa.enspirecommerce.com/api/v1/order',
	            headers: {
	                'Content-Type': 'application/json',
	                'Authorization': 'Bearer '+token
	            },
	            body:  {
	        		"orders":[
	        			  {
	        				 "orderDate":"2021-07-16T11:24:13-08:00",
	        				 "orderNumber":order+j,
	        				 "status":"OPEN",
	        				 "channel":"B2B",
	        				 "orderOrganization":"TheHonestKitchen-Organization-",
	        				 "orderTransactionType":"Sales",
	        				 "lineItems":[
	        				  {
	        					   "lineNumber":1,
	        					   "status":"OPEN",
	        					   "lineItemId": browser.params.batcpickSKU1,
	        					   "lineItemQty":1,
	        					   "originalOrderedQty":1,
	        					   "deliveryMethod": "SHIP_TO_CUSTOMER",
        				           "fulfillmentType": "SHIP_TO_CUSTOMER",
        				           "fulfillmentSite": "batchpicksite",
        				           "shippingCarrier": "FEDEX",
        				           "carrierServiceType": "FedExGround",
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
	    		console.log("The Order Number  is "+ordernumbers.push(SONumber));
                global.newGlobalVar = body.orders[0].id;
	    		//expect(response.statusCode).toBe(200);		
	    		done();

	            });
	   })
		it("TC - 02 -> Releasing 100 Orders", done =>{
			var options = {
		            method: 'POST',
		            url: 'https://project4-qa.enspirecommerce.com/api/v1/salesOrder/releaseOrders',
		            headers: {
		                'Content-Type': 'application/json',
		                'Authorization': 'Bearer '+token
		            },
		             body: [
		            	 newGlobalVar
		              ]
		            };
		            options.json = true;
		            request(options, function (error, response, body) {
		                var errors = error;
		                console.log('statusCode:', response && response.statusCode);
		             //    console.log('body of release order ', body);
		                done();
		     });
		});
	   
	}//for loop
	it("Correlation_checking_on_Batches_TC0058", function() {
  	 browser.wait(function () {
         return ordernumbers != '';
      }).then(function () {
    	 utils.Login(browser.params.login.user,browser.params.login.password);
    	 browser.get(correlations);
    	 commons.searchWithCriteria('Name', 'ends with', 'BatchPickConfig');            
    	 salesOrderSummary.salesOrderSelectGear("View");
    	 batchCreate.keyValues().then(function (value) {
		    key = value;
		    console.log("the key values are "+key);
	        batchCreate.correlation(key,"PickBatchShipmentBatchSize",4);
	        browser.sleep(2000);
    	 });
    	 console.log("orders in the pdf "+ordernumbers);
    	 batchCreate.batchPick();//redirecting to batch pick page  
         batchCreate.CreateNewBatch();
         browser.sleep(1000);
         batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
         batchCreate.selectSite();
         batchCreate.siteConfirm();
         batchCreate.createBatchConfirm();
         browser.sleep(5000);
         batchCreate.BatchNumber().then(function (batchnumber) {
             batch = batchnumber;
             BatchId = batchnumber.substring(7, 19)
             console.log("the Batch ID is "+BatchId);
         });	            
         batchCreate.close();
     	 browser.sleep(1000);
    	 
         });
  	 
	  	browser.wait(function () {
	        return ordernumbers != '';
	     }).then(function () {
	    	
	    	browser.get(batchPickUrl);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
            batchCreate.refreshBatch();
            batchCreate.printIconClick(2);
    		batchCreate.printDocument("Packing Slips");
    		browser.sleep(3000);
    		batchCreate.printIconClick(2);
    		batchCreate.printDocument("Shipping Labels");
    		browser.sleep(3000);
    		batchCreate.printIconClick(2);
    		batchCreate.printDocument("Combined Slips & Labels");
    		browser.sleep(1000);
	     });  	 
	  	
	  //!* verifying the packing slip document content*!//           
		browser.wait(function () {
		    return BatchId != '';
		}).then(function () {
			browser.sleep(3000);
			var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
			console.log("the file name is "+filename);
			var pdfpath= browser.params.labelPath+"//"+filename;
			utils.pdfRead(pdfpath).then(function (status) {            
			details = status;
			var line = [];
			line=details.split("\n");
			for (i = 0;i<ordernumbers.length;i++){
				if(details.includes(ordernumbers[i])){
					expect(details).toContain(ordernumbers[i]);
				}
				else{
					console.log("the order number not in Packing slip is "+ordernumbers[i]);
					expect(details).toContain(ordernumbers[i]);					
				}
			}
			expect(details).toContain(BatchId);//batch id checking
			expect(details).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
	    	expect(utils.getNumberOfPages(pdfpath)).toEqual(ordernumbers.length);

		    });
		});
		//!*End of Doc check*!//
		 //!* verifying the Shipping Label document content*!//           
		browser.wait(function () {
		    return BatchId != '';
		}).then(function () {
			browser.sleep(3000);
			var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
			console.log("the file name is "+filename);
			var pdfpath= browser.params.labelPath+"//"+filename;
			utils.pdfRead(pdfpath).then(function (status) {            
				details = status;
				var line = [];
				line=details.split("\n");
				expect(details).toContain((browser.params.custDisplayName).toUpperCase());//customer name checking	
		    	expect(utils.getNumberOfPages(pdfpath)).toEqual(ordernumbers.length);
			});
        });
 //!*End of Doc check*!//	
		browser.wait(function () {
		    return BatchId != '';
		}).then(function () {
			
			 batchCreate.shipmentstatus(5,1).then(function (status) {
	             orderStatus = status;
	             console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		         browser.sleep(2000);
		         batchCreate.truckIcon(orderStatus);
	         });
	         browser.sleep(2000);
	         batchCreate.yesButton();
	         browser.sleep(2000);
             batchCreate.refreshBatch();
             
             batchCreate.shipmentstatus(5,1).then(function (status) {
	             orderStatus = status;
	             console.log("the status of the Batch is: "+orderStatus);
		         browser.sleep(2000);
		         expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
             });
	         
		});	
     });
  	
});

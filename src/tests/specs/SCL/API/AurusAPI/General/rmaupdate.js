const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var jobScreen = require(process.cwd() + '/src/tests/screens/jobs/jobs.summary.screen.js');

//global.obj="";
//global.value="";
global.jsondata ="";

describe("release the order", function () {
	var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();	
    var job = new jobScreen();

  
     /*     it("rma update", done =>{
              
           var options = {
            method: 'GET',
            url: browser.params.APIRequest+'/rma/id/'+returnOrderId,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            
            };
            options.json = true;
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                 
               //var orderDetailsJson = JSON.stringify(body);
              
                 console.log('body of rma order ', body);

              //   obj=JSON.parse(orderDetailsJson);
               //  value =obj.returnMerchandiseAuthorizationStatus;
                // console.log(value);

                done();

            });

    });
    
   it("rma release", done =>{
              
        var options = {
         method: 'PUT',
         url: browser.params.APIRequest+'/rma/release/'+returnOrderId,
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+token
         },
         
        };
         options.json = true;
         request(options, function (error, response, body) {
             var errors = error;
             console.log('statusCode:', response && response.statusCode);
              
            var orderDetailsJson = JSON.stringify(body);
           
              console.log('body of rma order ', body);

             obj=JSON.parse(orderDetailsJson);
            value =obj.returnMerchandiseAuthorizationStatus;
             console.log(value);

             done();

         });

 });

    /*it("rma update", done =>{

        var options = {
         method: 'PUT',

         url: 'https://project5-qa.enspirecommerce.com/api/v1/rma/release/5f58f0c9-4adf-49f1-8007-75718ecf5dbe',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+token
             
         },
            
         body:[
            returnOrderId
         ]
             
         };

         options.json = true;
         
         
         request(options, function (error, response, body) {
            var errors = error;
            
            
             console.log('statusCode:', response && response.statusCode);
              console.log('body of rma order ', response.body);
             done();

         });
       

 });

*/
//updated by Vishak	
	
    
    it("Getting the RMA response", done =>{
    	browser.sleep(1000);
        var options = {
                method: 'GET',
                url: browser.params.APIRequest+'/rma/id/'+returnOrderId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },
        	};
        options.json = true;
        request(options, function (error, response, body) {
    		var errors = error;
    		console.log('error:', + error);
    		console.log('statusCode:', response && response.statusCode);
    		response1 = JSON.stringify(body);
    		console.log("response1 "+response1)
    		response2= response1.split(",")
    		console.log("the length of body array is : ", response2.length);
    		for(i=0;i<response2.length;i++){         			
    			if(response2[i]=='"returnMerchandiseAuthorizationStatus":"PENDING_PAYMENT"'){
    				console.log("the value before updting array is "+response2[i])
    				response2[i]='"returnMerchandiseAuthorizationStatus":"RECEIVED"';
    				console.log("the value updted is "+response2[i])
    			}    
    		}
    		jsondata=JSON.parse(response2)
    		expect(response.statusCode).toBe(200);
	     	done();
        });
     }),
	   //sending the PUT Request to updat the Order status
    it("updating the RMA status ", done =>{
        var options = {
                method: 'PUT',
                url: browser.params.APIRequest+'rma/id/'+returnOrderId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                },	                        
              body: jsondata,
         }	  		 
         options.json = true;
         request(options, function (error, response, body) {
    		var errors = error;
    		console.log('error:', + error);
    		console.log('statusCode:', response && response.statusCode);
    		expect(response.statusCode).toBe(200);
    		done();
            });
    	});

  });








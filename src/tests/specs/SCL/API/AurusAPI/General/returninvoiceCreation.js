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
    
    it("creating the return invoice", function() {
   	 browser.wait(function () {
   	     return rmaNumber != '';
   	 }).then(function () {
   		 
   	     browser.get(routeUrl);
   	     commons.searchWithCriteria('Data Domain', 'starts with', 'com.thk');
   	     browser.sleep(1500);
   	     commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
   	     browser.sleep(1500);
   	     utils.status(5,1).then(function (value) {
   				savedStatus = value;
   			    console.log("the route status is "+savedStatus);	
   			    browser.sleep(1000);
   			    utils.startingReturnInvoiceRoute(savedStatus,2);
   			});	
   	     
   	    // expect(utils.status(5,1)).toEqual("STARTED");
   	     browser.get(callCenterReturnsUrl);
   	     salesOrderSummary.salesOrderSearch("Original Order #", rmaNumber);
   	     returnsCreate.RMAStatus().then(function (status) {
   	     	retunInvoiceStatus = status;
   	         console.log("the status of the "+rmaNumber+" ater running the route is: "+retunInvoiceStatus);
   	         expect(retunInvoiceStatus).toEqual("INVOICED");
   	         browser.get(routeUrl);
   	         browser.sleep(3000);
       	     commons.searchWithCriteria('Data Domain', 'starts with', 'com.thk');
       	     browser.sleep(1500);
   	         commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
       	     browser.sleep(1500);
   	         utils.status(5,1).then(function (value) {
   	 			savedStatus = value;
   	 		    console.log("the route status is "+savedStatus);	
   	 		    utils.StopRoute(savedStatus,2);
   	 		});	
   	         expect(utils.status(5,1)).toEqual("STOPPED");
   	     	});
   	 	});
    	});

     it("capture the return invoice", function() {
    	 
    	 browser.get(jobsUrl);
         browser.sleep(1000);
     //  route.routeSearch("Name","routeToValidateShipmentConfirmation");
         commons.searchWithCriteria("Name","ends with",browser.params.returnCapture);
         browser.sleep(2000);
         job.jobsStart();
         browser.sleep(3000);
    	 
    	 
     });
     
     it("Return Invoice search", function(){

         browser.get(invoicesUrl);
         commons.searchWithCriteria("Order Number","ends with",orderId);
          expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
     	});
     
  });








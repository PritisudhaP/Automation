const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var batchPickCreate = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.create.screen.js');
var util = require(process.cwd() + '/src/tests/screens/Utilities/util.js');
var FRCreateScreen = require(process.cwd() + '/src/tests/screens/FRScreen/FRScreen.Create.Screen.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');
var FRSummaryScreen = require(process.cwd() + '/src/tests/screens/FRScreen/FRScreen.Summary.Screen.js');
var BOPISCreateScreen =  require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Create.Screen.js');
var BOPISEditScreen = require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Edit.screen.js');
var BOPISSummaryScreen = require(process.cwd() + '/src/tests/screens/BOPIS/BOPIS.Summary.Screen.js');


global.orderStatus = "";
global.SONumber = "000000035006";
global.invoiceId="2817ad6c-ffa2-422a-885e-641530757199";
global.INVNumber="0000014995";
global.RMANumber="RMA0003321";
global.RMAId="3aec5b07-8c7a-4ddc-86dc-db91c4147140";
global.newGlobalVar = "cb8389a6-88e9-45a3-ab5a-a23aaf5722f3"
global.shipmentRequestNumber = "";
global.order = "000000037690";
var response=[]
let jsondata="";
//create a batch with single line and complete fulfillment.TC1
//create a batch with single FR multiple lines and complete fulfillment.TC2
//create a batch with single FR multiple lines multiple QTY and complete fulfillment.TC3


describe("Batch Pick: ", function() {
	var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();
	var returnsCreate = new returnsCreateScreen();
	var invoiceSummary=new invoiceSummaryScreen();
	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
  	var batchCreate = new batchPickCreate();
  	var FRCreate= new FRCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var FRSummary = new FRSummaryScreen();
    var BOPISCreate = new BOPISCreateScreen();
    var BOPISEdit = new BOPISEditScreen();
    var BOPISSummary = new BOPISSummaryScreen();
	utils.Login(browser.params.login.user,browser.params.login.password);
/*
	  	 it("Invoice Creation using Order API_V2 TC-28", done =>{
	    
	    	//callCenter.OrdersPage();
	       // callCenter.page("Invoices");
        	//browser.get(paymentDispositionUrl);
	      //  salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	      //  invoiceSummary.lineSelctor(1)            
	        //util.currentURL().then(function(value){
/*	        	url="https://project0-qa.enspirecommerce.com/dist/#/call-center/sales/c39e58de-ef28-426d-9cc2-950e9c17a234/";
		        console.log("the current url is "+url);
		        console.log("the current url length is "+url.length);
		        id=url.substring(65,101);
		        console.log("the id is "+id);
		        console.log("the length of the id is "+id.length);
*/
	    	
	    	
	  /*  	
	    	 var options = {
                     method: 'GET',
                     url: 'https://project0-qa.enspirecommerce.com/api/v1/rma/id/'+RMAId+'',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+token
                     },
             	};
             
             options.json = true;
             console.log("token from token generation is "+options.headers.Authorization);
             request(options, function (error, response, body) {
         		var errors = error;
         		console.log('error:', + error);
         		console.log('statusCode:', response && response.statusCode);
         		response1 = JSON.stringify(body);
         		response2= response1.split(",")
         		console.log("the length of body array is : ", response2.length);
         		console.log("the order status is  : ",response2[1160]);
         		for(i=0;i<response2.length;i++){         			
         			if(response2[i]=='"returnMerchandiseAuthorizationStatus":"PENDING_PAYMENT"'){
         				console.log("the value before updting array is "+response2[i])
         				response2[i]='"returnMerchandiseAuthorizationStatus":"RECEIVED"';
         				console.log("the value updted is "+response2[i])
         			}         			
         		}
         		jsondata=JSON.parse(response2)
         		//console.log('body after update is:', jsondata);
         		expect(response.statusCode).toBe(200);
         		done();

                 });
             	        	
	       // });
    });
	  	 
	  	 it("Invoice Creation using Order API_V2 TC-28", done =>{
	  		 
	  		
	  		 var options = {
                     method: 'PUT',
                     url: 'https://project0-qa.enspirecommerce.com/api/v1/rma/id/'+RMAId+'',
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+token
                     },
                     
                   body: jsondata,
                   
              }	  		 
	  		 options.json = true;
             console.log("token from token generation is "+options.headers.Authorization);
             request(options, function (error, response, body) {
         		var errors = error;
         		console.log('error:', + error);
         		console.log('statusCode:', response && response.statusCode);
         		console.log('body:', body);
         		expect(response.statusCode).toBe(200);
         		done();
                 });
	  		 
	  	 });
		
	*/	
		//it("rough work", function() {
			
			  	/*callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Order #", SONumber);
	            browser.sleep(1500);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(1000);
	            callCenter.unselectPkg();
	            browser.sleep(15500);
	            

			date = util.currentDate();
			console.log("the current date is "+date);
			finaldate = util.convertDate(date,"mm/")
			console.log("the new date fornmat is "+finaldate );	
*/		
			/*
			browser.get(correlations);
		 	commons.searchWithCriteria('Name', 'ends with', 'RSOJobLastExecutionDate');
		 	invoiceSummary.lineSelctor(1);
		 	
	 		invoiceSummary.correlationDataValue(browser.params.subscriptionpastdate);
*/
			
			
	    /*	 browser.get(correlations);
	    	 commons.searchWithCriteria('Name', 'ends with', 'orderCalculationSettings');            
	    	 salesOrderSummary.salesOrderSelectGear("View");
	    	 batchCreate.keyValues().then(function (value) {
			    key = value;
			    console.log("the key values are "+key);
		        batchCreate.correlation(key,"chargeActualShippingCost","false");
		        browser.sleep(1000);
	    	 });
			*/
			
			//callCenter.fullFillmentPage();
	       // callCenter.page("Fulfillment Requests");
		/*	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.frRequestLink(1);
	        browser.wait(function () {
            return SONumber != '';
        	}).then( function () {
		        FRCreate.frStatus("Reject",1);
		       // 
		       data = FRCreate.rejectConfirm();
		       /*.then(function(value){
		        	var data= value
		        	console.log("the presence is "+data);
		        	
		        });*/
		     //  console.log("the presence is "+data);
		        //expect(FRCreate.rejectConfirm()).toBe(true);
				
        	//});	
			
		/*	browser.get(callCenterSalesOrdersListUrl);
		    salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
			salesOrderSummary.salesOrderSelectGear("View");
			browser.sleep(10000);
			salesOrderCreate.editPencilButton(5);
			BOPISCreate.pickupStartDateEdit(browser.params.BOPISStartDate,5);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(7);    		 
            BOPISCreate.pickupEndDateEdit(browser.params.BOPISEndDate,7);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(6);
    		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(8);
    		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTime,8);
        	salesOrderSummary.salesOrderPane("Line Items");
        	browser.sleep(10000);*/
		/*	function formatDate(date) {
			    var d = new Date(date),
			        month = '' + (d.getMonth() + 1),
			        day = '' + d.getDate(),
			        year = d.getFullYear();
			    if (month.length < 2) 
			        month = '0' + month;
			    if (day.length < 2) 
			        day = '0' + day;

			    return [month, day, year].join('/');
			}
			 */
			
			//BOPISCreate.pickWindowDetails(1,"10/07/2021 14:15 - 10/07/2021 14:15");
			//BOPISCreate.pickWindowDetails(2,"10/07/2021 14:15 - 10/07/2021 14:15");
			//BOPISCreate.pickWindowDetails(3,"10/07/2021 14:15 - 10/07/2021 14:15");
			//BOPISCreate.pickWindowDetails(4,"10/07/2021 14:15 - 10/07/2021 14:15");
			//var datastatus=util.foundFile(browser.params.labelPath);
		//	console.log("the File status is "+datastatus);
		//	expect(util.foundFile(browser.params.labelPath)).toBe(true);
		 //	commons.searchWithCriteria('Name', 'ends with', 'bopis');
		// 	invoiceSummary.lineSelctor(1);
		// 	BOPISCreate.keysAndValues().then(function (value) {
		//	    data = value;
		//	    console.log("the data are "+data);
		//	    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		//	});
	    
		    /*	callCenter.fullFillmentPage();
		    	callCenter.page("Store Portal - V2");
		    	BOPISCreate.bopisSearch("Status","is","Pending");//status checking
	 			BOPISCreate.bopisScreen(5).then(function (total) {
	                 status = total;
	                 console.log("the status in the BOPIS screen : "+status);
	                 expect(BOPISCreate.bopisScreenData(status,"PENDING")).toBe(true);
	 	    	 });
	 			browser.sleep(10000);
		    	BOPISCreate.lineSelect(1);*/
			
			//BOPISSummary.siteCalenderEndDateChecking("14:30","10.30","10/14/2021").then(function(value){

			//	pickupdate = value;
			//	console.log("the pickup date from the calender checking is "+pickupdate);
				//expect(BOPISSummary.siteCalenderEndDateChecking("14:30","10.30","10/14/2021")).toEqual("10/14/2021");
				
			//});
			
	/*		browser.get(correlations);
		 	commons.searchWithCriteria('Name', 'ends with', browser.params.BOPIScorrelation);
		 	invoiceSummary.lineSelctor(1);
		 	BOPISCreate.keysAndValues().then(function (value) {
			    data = value;
			    console.log("the data are "+data);
			    BOPISCreate.Correlation(data,'LagTime','3h');
			    
			});
		 	commons.cancel();
		 	commons.searchWithCriteria('Name', 'ends with', browser.params.BOPIScorrelation);
		 	invoiceSummary.lineSelctor(1);
		 	BOPISCreate.keysAndValues().then(function (value) {
			    data = value;
			    console.log("the data are "+data);
			    BOPISCreate.Correlation(data,'MaxDuration','5h');
			    
			});
			
			browser.get(correlations);
		 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
		 	invoiceSummary.lineSelctor(1);
		 	BOPISCreate.keysAndValues().then(function (value) {
			    data = value;
			    console.log("the data are "+data);
			    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
			});
			*/
    		
			//
//			var endTime = "5:30";
//			 console.log("Time difference is "+endTime.diff(util.currentTime("HM"),'hours'));			
			//var time = BOPISSummary.lagTimeCheck("18:30","16:00");
			//console.log("The time difference is "+time);
			//pickupStartTime = util.convertTime("03: 15 PM",'24hrs')
		//	console.log("pick up start time in 24Hrs "+pickupStartTime);
			
			/*
			BOPISSummary.PickUpTimeDifference("11:30","16:00").then(function (value) {
			    data = value;
			    console.log("the time is "+data);

			});
			*/
			
			/*browser.get(eventSubscription);
			BOPISCreate.eventSubscriptonData().then(function (value) {
			    data = value;
			    console.log("the Subscription data are "+data); 
			    BOPISCreate.eventSubscribedOrNot(data).then(function (value) { //checking whether the event is active or not
			    var status = value;
			    console.log("the checked status "+status);
			    BOPISCreate.eventSubscriptonEnable(data,browser.params.eventSubscriptonKey,browser.params.eventSubscriptonValue,status);//updating the event
			});
		});*/
			
			
	    	 
	    	/* BOPISCreate.pickupNotdueBGColor(2).then(function (value) {
	    		 color = value;
		    	 console.log("the legend not due yet color is "+color);
		    	 rgb = color.split(",");
		    	 r=parseInt(rgb[0]);
		    	 g=parseInt(rgb[1]);
		    	 b=parseInt(rgb[2]);
		    	 var convertedcolor = util.convertColor(r,g,b);
				 console.log("the color converted is "+convertedcolor);
	    	 
	    	 });
	    	 */
	    	 
	    	
	    	/* BOPISCreate.backgroundColorExpired(7,1).then(function (value) {
				    color = value;
			    	 console.log("the color is "+color);
			    	 rgb = color.split(",");
			    	 r=parseInt(rgb[0]);
			    	 g=parseInt(rgb[1]);
			    	 b=parseInt(rgb[2]);
			    	 var convertedcolor = util.convertColor(r,g,b);
					 console.log("the color converted is "+convertedcolor);

		    	 });
	    */	 
	    	
	    	/* BOPISCreate.backgroundColordueToday(7,1).then(function (value) {
				    color = value;
			    	 console.log("the color is "+color);
			    	 rgb = color.split(",");
			    	 r=parseInt(rgb[0]);
			    	 g=parseInt(rgb[1]);
			    	 b=parseInt(rgb[2]);
			    	 var convertedcolor = util.convertColor(r,g,b);
					 console.log("the color converted is "+convertedcolor);

		    	 });
*/
	    	 
	    	 it("release the order", done =>{
	             var options = {
	              method: 'POST',
	              url: browser.params.APIRequest+'/salesOrder/releaseOrders',
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
	                  //console.log('body of release order ', body);
	                  done();
	              });
	              
		});
	    	 it("get the FR details", done =>{

	             var options = {
	              method: 'GET',
	              url: browser.params.APIRequest+'/shipmentRequest/bySalesOrderId/'+newGlobalVar,
	              headers: {
	                  'Content-Type': 'application/json',
	                 'Authorization': 'Bearer '+token
	              },

	              }
	              options.json = true,
	              request(options, function (error, response, body) {
	                  var errors = error;
	                  console.log('statusCode:', response && response.statusCode);
	                console.log("id is from fr details "+body.items[0].id);
	                console.log("shipment number is fom fr details "+body.items[0].header.shipmentRequestNumber);
	                shipmentRequestNumber=body.items[0].header.shipmentRequestNumber;
	                  done();

	              });



	      });	 
	    	 
});
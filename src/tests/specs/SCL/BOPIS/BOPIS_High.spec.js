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
global.SONumber = "";
global.FRNumber = "";
global.pickupStartDate = "";
global.pickupEndDate = "";
global.pickupStartTime = "";
global.pickupEndTime = "";
global.fulfillmentType = "";
var dateUpdated = "";
global.awaitingCP = "";
global.pendingFulfillment = ""
global.awaitingCP1 = "";
global.pendingFulfillment1 = ""
global.awaitingCP2 = "";
global.pendingFulfillment2 = ""
global.ATSCountBefore = "";
global.reservedCountBefore="";
global.ATSCountafter = "";
global.reservedCountafter="";
global.ATSUpdated  = "";
global.token="";
var roundTimeValues = ["00","15","30","45"];
global.headerexpiredColor = "";
global.headerdueTodayColor = "";
global.headerNotYetColor = "";

describe("BOPIS High Level Test Cases: ", function() {
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
	
//BOPIS_4:Verify the PW start and end time values is rounding off due to the Correlation or not	
	it("Verify the PW start and end time values is rounding off due to the Correlation or not_BOPIS__001", function() {
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', browser.params.PickupDateBOPIScorrelation);
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.PickupDateBOPIScorrelationKey,browser.params.PickupDateBOPIScorrelationvalue);
		    
		});
	 	browser.sleep(1500);
	    browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.BOPISSku1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
	    callCenter.lineItemselectOptions("Edit Line");
	    salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.BOPISSIteName);
	    browser.sleep(100);
	    callCenter.editLinePopUpSaveBtn(); 
	    browser.sleep(1500);
	  //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		
			salesOrderSummary.OrderStatusDetails(1).then(function (value) {
				savedStatus = value;
			    console.log("the orderstatus is "+savedStatus);	
			    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
			});	
			browser.sleep(3000);
			BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			})
			
			BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 2				
				data=value;
				console.log('fulfillment type at line 1 '+data);
				expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 2
			});
			
			BOPISSummary.pickupStartTime().then(function(value){
				
				pickuptime= value;
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				console.log("pick up start time in 24Hrs "+pickupStartTime);		
				pickupMinute =  pickupStartTime.substring(3).trim();
				console.log("the pick up minute after round off is "+pickupMinute);
				expect(roundTimeValues).toContain(pickupMinute);
				
			});
			
			BOPISSummary.pickupEndTime().then(function(value){
				
				pickupTime= value;
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				console.log("pick up end time in 24Hrs "+pickupEndTime);	
				pickupEndMinute =  pickupEndTime.substring(3).trim();
				console.log("the pick up end minute after round off is "+pickupEndMinute);
				expect(roundTimeValues).toContain(pickupEndMinute);
				
			});	

			//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        browser.sleep(1000);
	        BOPISSummary.pickupStartTime().then(function(value){
				
				pickuptime= value;
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				console.log("pick up start time in 24Hrs "+pickupStartTime);		
				pickupMinute =  pickupStartTime.substring(3).trim();
				console.log("the pick up minute after round off is "+pickupMinute);
				expect(roundTimeValues).toContain(pickupMinute);
				
			});
			
			BOPISSummary.pickupEndTime().then(function(value){
				
				pickupTime= value;
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				console.log("pick up end time in 24Hrs "+pickupEndTime);	
				pickupEndMinute =  pickupEndTime.substring(3).trim();
				console.log("the pick up end minute after round off is "+pickupEndMinute);
				expect(roundTimeValues).toContain(pickupEndMinute);
				
			});	
			
	
	});
	
	
	//BOPIS_002 : Verify if Pickup window dates are getting from the site calendar dates or not. Check the control center site calendar dates are reflecting in Sales order or not	
	//BOPIS_003 : Verify the lag time and max duration for pIckup start and end time in the Sales order		
	
	it("Verify Pickup dates from the site calendar_BOPIS__002", function() {
		
		browser.get(correlations);
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
		browser.get(controlCenter);
		salesOrderSummary.salesOrderSearch('Site Type',browser.params.BOPISSIteName);
		BOPISCreate.selectFromTheSearch(2);
		BOPISCreate.scheduleEdit();
		BOPISCreate.maxOrder(55410);
		BOPISCreate.patterenRadioButton(1);
		browser.sleep(500);
		BOPISCreate.recurringDay(1);
		BOPISCreate.storeStartTime(browser.params.storeStartTime);
		BOPISCreate.storeCloseTime(browser.params.storeCloseTime);
		BOPISCreate.addRule();
		BOPISCreate.applyRule();
		BOPISCreate.confirmButton();
		commons.pageHeader("Integration");
        commons.page("Jobs");
        salesOrderSummary.jobExecution();
        commons.searchWithCriteria('Name', 'ends with', browser.params.siteCalenderJob);
        utils.startJob(1);
        browser.sleep(5000);
        browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.BOPISSku1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.BOPISSIteName);
        browser.sleep(100);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		
			salesOrderSummary.OrderStatusDetails(1).then(function (value) {
				savedStatus = value;
			    console.log("the orderstatus is "+savedStatus);	
			    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
			});	
			browser.sleep(3000);
			BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			})
			
			BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 2				
				data=value;
				console.log('fulfillment type at line 1 '+data);
				expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 2
			});
			BOPISSummary.pickupStartDate().then(function(value){
				pickupDate= value;
				pickupStartDate=util.convertDate(pickupDate,'MMM/dd/YYYY')
				console.log("pick up start date "+pickupStartDate);			
			});
			
			BOPISSummary.pickupEndDate().then(function(value){
						
				pickupDate= value;
				pickupEndDate=util.convertDate(pickupDate,'MMM/dd/YYYY')
				console.log("pick up end date in mm/dd/yyyy "+pickupEndDate);		
			});
			
			BOPISSummary.pickupStartTime().then(function(value){
				
				pickuptime= value;
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				console.log("pick up start time in 24Hrs "+pickupStartTime);			
			});
			
			BOPISSummary.pickupEndTime().then(function(value){
				
				pickupTime= value;
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				console.log("pick up end time in 24Hrs "+pickupEndTime);			
			});	
			expect(BOPISSummary.siteCalenderEndDateChecking(pickupStartTime,pickupEndTime,pickupEndDate)).toEqual(pickupEndDate);// pickup date checking based on calendar site 
			//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
			browser.wait(function () {
				return SONumber != '';
				}).then(function () {
		    	expect(BOPISSummary.PickUpTimeDifference(pickupStartTime,pickupEndTime)).toEqual(browser.params.maximumDuration);//checking the maximum duration as per the correlation
	//	    	expect(BOPISSummary.lagTimeCheck(pickupStartTime,pickupEndTime)).toEqual(browser.params.lagTime)//lag time checking
		});

	});

//BOPIS_005: Verify if user able to edit Line level Pickup dates and check the PW dates is reflecting in StorePortal-v2 screen
	
	it("Verify if user is  able to  edit Line level Pickup dates_BOPIS__003", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		BOPISSummary.lineLevelPickupStartDateEdit(browser.params.BOPISStartDate);
		BOPISSummary.lineLevelPickupEndDateEdit(browser.params.BOPISEndDate);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn();
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
        browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window details are: "+orderStatus);
				//browser.sleep(2000);
				expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(browser.params.BOPISStartDate);//checking the pick up date is updated based on the line level date update
				expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(browser.params.BOPISEndDate); //checking the pcik up end date is updated based on the line level date update
	    	 });		
	    });
	});
//BOPIS_006: Verify the expired PW dates is recalculating to current site calendar dates after complete fulfillment in StorePortal-v2 screen	
	it("PW dates is recalculating to current site calendar dates after complete fulfillment in StorePortal-v2 screen_BOPIS__004", function() {
		var Date = "";
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			
			data=value;
			expect(data).toBe(false);
		});
		
	//	salesOrderCreate.editPencilButton(5);
    //    BOPISCreate.pickupStartDateEdit(browser.params.BOPISPastStartDate,5);
   // 	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(7);    		 
        BOPISCreate.pickupEndDateEdit(browser.params.BOPISPastEndDate,5);
    	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(6);
		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
    	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(8);
		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTime,8);
    	salesOrderSummary.salesOrderPane("Line Items");
    	browser.sleep(1000);
    	salesOrderEdit.reSave();
    	Date=util.currentDate();
    	 BOPISSummary.pickupStartDate().then(function(value){ 				
 			data=value;
 			console.log('pick up start date at header level '+data);
 			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
 		});
         BOPISSummary.pickupEndDate().then(function(value){ 				
 			data=value;
 			console.log('pick up end date at header level '+data);
 			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
 		});
     	salesOrderCreate.editPencilButton(5);
        //BOPISCreate.pickupStartDateEdit(browser.params.BOPISStartDateExpired,5);
     	BOPISCreate.pastDatePicker();
     	//salesOrderSummary.salesOrderPane("Line Items");
     	browser.sleep(1000);
    	salesOrderEdit.reSave();
    	BOPISSummary.pickupStartDate().then(function(value){ 				
  			data=value;
  			console.log('pick up start date at header level '+data);
  			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
  		});
    	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
			data=value;
			console.log('fulfillment type at line 1 '+data);
			expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
		});
        BOPISSummary.pickupStartDate().then(function(value){ 				
			data=value;
			console.log('pick up start date at header level '+data);
			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupEndDate().then(function(value){ 				
			data=value;
			console.log('pick up end date at header level '+data);
			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupStartTime().then(function(value){ 				
			data=value;
			console.log('pick up start time at header level '+data);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);
		});
        BOPISSummary.pickupEndTime().then(function(value){ 				
			data=value;
			console.log('pick up end time at header level '+data);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);
			
		});
        
        browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window details are: "+orderStatus);
				//browser.sleep(2000);
				expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(Date);//checking whether the past pick up start date is recalculating to current date
				expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(Date); //checking whether the  pcik up end past date is recalculating to current date
	    	 });		
	    });
		
	});

//BOPIS:17_Verify if user is able to select fulfillment type as "Ship to customer" in sales order	
	it("fulfillment type as 'Ship to customer' in sales order_BOPIS__005", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType("SHIP TO CUSTOMER");
        browser.sleep(100);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
   	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(true);
		})
		
		BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 2				
			data=value;
			console.log('fulfillment type at line 1 '+data);
			expect(data).toContain(browser.params.fulfillmentvalidation2);//fulfillment type checking at line 2
		});
		BOPISCreate.pickupStartDatePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupEndDatePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupStartTimePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupEndTimePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})		
		browser.sleep(2000);
	//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");      
        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 2				
			data=value;
			console.log('fulfillment type at line 1 '+data);
			expect(data).toContain(browser.params.fulfillmentvalidation2);//fulfillment type checking at line 2
		});
        BOPISCreate.pickupStartDatePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupEndDatePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupStartTimePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})
		BOPISCreate.pickupEndTimePresence().then(function(value){
			data=value;
			expect(data).toBe(false);
		})		
	});	  
	 	
	 //BOPIS_11_Verify if user is able to edit the pickup start, end date & time in sales order
	//BOPIS_18_Verify Mixed order 
	it("fulfillment type with mixed order_BOPIS__006", function() {
		
		var date = util.currentDay();
		console.log("current date of the month is "+date)
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        browser.sleep(100);
        salesOrderCreate.availableStore(browser.params.availableStore);
        browser.sleep(500);
        callCenter.editLinePopUpSaveBtn(); 
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType("SHIP TO CUSTOMER");
        browser.sleep(100);
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
   	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			
			data=value;
			expect(data).toBe(true);
		})
		salesOrderCreate.editPencilButton(5);
	//	util.currentMonthAndYear().then(function(value){
   //     	mnthyear=value;
   // 		var changeDate = parseInt(date)+1;
   // 		var newDate=changedate+"/"+mnthyear;
   // 		dateUpdated=newDate.toString();
    //    	console.log("the new date is "+dateUpdated);      }); 
            BOPISCreate.pickupStartDateEdit(browser.params.BOPISStartDate,6);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(7);    		 
            BOPISCreate.pickupEndDateEdit(browser.params.BOPISEndDate,6);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(6);
    		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
        	salesOrderSummary.salesOrderPane("Line Items");
    		salesOrderCreate.editPencilButton(8);
    		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTime,8);
        	salesOrderSummary.salesOrderPane("Line Items");
        	browser.sleep(10000);
        	salesOrderEdit.reSave();
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
			
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
				data=value;
				console.log('fulfillment type at line 1 '+data);
				expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.fulfillmentTypeValidation(2).then(function(value){ //fulfillment type at line 2				
				data=value;
				console.log('fulfillment type at line 2 '+data);
				expect(data).toContain(browser.params.fulfillmentvalidation2);//fulfillment type checking at line 2
			});
	        
	        BOPISSummary.pickupStartDate().then(function(value){ 				
				data=value;
				console.log('pick up start date at header level '+data);
				expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(browser.params.BOPISStartDate);
				
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
				data=value;
				console.log('pick up end date at header level '+data);
				expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(browser.params.BOPISEndDate);
				
			});
	        
	        BOPISSummary.pickupStartTime().then(function(value){ 				
				data=value;
				console.log('pick up start time at header level '+data);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime); // Issue OMS-5317
			});
	        
	        BOPISSummary.pickupEndTime().then(function(value){ 				
				data=value;
				console.log('pick up end time at header level '+data);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);//// Issue OMS-5317
				
			});
	        
	 });
	
//BOPIS_12:Verify if user able to change the fulfillment type as "Pickup In Store" after saving the order	
//BOPIS: header level date update and comparing it with store portal Also, legends checking for not yet due.
	it("change the fulfillment type as 'Pickup In Store' after saving the order & Header level pick up date update_BOPIS__007", function() {
		
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			browser.sleep(1000);
			callCenter.attachCustomer();
			callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			salesOrderCreate.selectCustomer();
			salesOrderCreate.useSelectedCustomer();
   	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			browser.sleep(2000);
			salesOrderCreate.saveOption("Save");
			salesOrderCreate.salesOrderNumber().then(function (value) {
			    SONumber = value;
			    console.log("sales order number"+SONumber);
			});
			salesOrderSummary.OrderStatusDetails(1).then(function (value) {
				savedStatus = value;
			    console.log("the orderstatus is "+savedStatus);	
			    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
			});	
			browser.sleep(3000);
			BOPISCreate.ShippingAddressCheck().then(function(value){
				
				data=value;
				expect(data).toBe(true);
			});
			callCenter.editLineGear("3");
			callCenter.lineItemselectOptions("Edit Line");
			salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
			browser.sleep(100);
			salesOrderCreate.availableStore(browser.params.availableStore);
			browser.sleep(500);
			callCenter.editLinePopUpSaveBtn(); 
			salesOrderCreate.editPencilButton(5);
	        BOPISCreate.pickupStartDateEdit(browser.params.BOPISStartDate,5);
			salesOrderCreate.editPencilButton(7);    		 
	        BOPISCreate.pickupEndDateEdit(browser.params.BOPISEndDate,5);
			salesOrderCreate.editPencilButton(6);
			BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
	    	salesOrderSummary.salesOrderPane("Line Items");
			salesOrderCreate.editPencilButton(8);
			BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTime,8);
	    	salesOrderSummary.salesOrderPane("Line Items");
	    	browser.sleep(10000);
	    	salesOrderEdit.reSave();
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
				data=value;
				console.log('fulfillment type at line 1 '+data);
				expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.pickupStartDate().then(function(value){ 				
				data=value;
				console.log('pick up start date at header level '+data);
				pickupStartDate = util.convertDate(data,'MMM/dd/YYYY');
				console.log('pick up start date after conversion at header level '+pickupStartDate);
				expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(browser.params.BOPISStartDate);
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
				data=value;
				console.log('pick up end date at header level '+data);
				pickupEndDate = util.convertDate(data,'MMM/dd/YYYY');
				console.log('pick up end date after conversion at header level '+pickupEndDate);
				expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(browser.params.BOPISEndDate);
			});
	        BOPISSummary.pickupStartTime().then(function(value){ 				
				data=value;
				console.log('pick up start time at header level '+data);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);// Issue OMS-5317
			});
	        BOPISSummary.pickupEndTime().then(function(value){ 				
				data=value;
				console.log('pick up end time at header level '+data);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);// Issue OMS-5317
				
			});
			
			browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window details are: "+orderStatus);
				//browser.sleep(2000);
				//expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(pickupStartDate);//checking the pick up date //// Issue OMS-5331
				//expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(pickupEndDate); //checking the pcik up end date//// Issue OMS-5331
		    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
		 			orderStatus = status;
					console.log("the pickup window status is: "+orderStatus);
					browser.sleep(2000);
					expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
	    		});
		    	BOPISCreate.lineSelect(1);
		    	BOPISCreate.acceptButton();
		    	BOPISCreate.acceptOrder(1);
		    	BOPISCreate.confirmButton();
		    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
		 			orderStatus = status;
					console.log("the pickup window status is: "+orderStatus);
					browser.sleep(2000);
					expect(orderStatus).toEqual("ACCEPTED");
	    		});
		    	BOPISCreate.lineClick(1);
		    	BOPISCreate.selectFromTheSearch(1);
		    	BOPISCreate.submitPack("Pick & Pack");
		    	batchCreate.selectFromTheSearch(2);
			    batchCreate.qtyInc(1,1);
			    batchCreate.submitPack("Include in Package");
			    browser.sleep(500);
			    batchCreate.PackingtypeSelect(browser.params.packageValue);
			    batchCreate.submitPack("Add Package");
			    browser.sleep(500);
			    batchCreate.submitPack("Complete Fulfillment");
			    browser.sleep(3000);
			    callCenter.fullFillmentPage();
		    	callCenter.page("Store Portal - V2");
		    	BOPISCreate.pickupNotdueBGColor(2).then(function (value) {
		    		 color = value;
			    	 console.log("the legend not due yet header color is "+color);
			    	 rgb = color.split(",");
			    	 r=parseInt(rgb[0]);
			    	 g=parseInt(rgb[1]);
			    	 b=parseInt(rgb[2]);
			    	 headerNotYetColor = util.convertColor(r,g,b);
					 console.log("the color converted for not due yet is "+headerNotYetColor);
		    	 
		    	 });
		    	BOPISCreate.backgroundColornotdue(7,1).then(function (value) {
				     color = value;
			    	 console.log("the due not yet  color at line level is "+color);
			    	 rgb = color.split(",");
			    	 r=parseInt(rgb[0]);
			    	 g=parseInt(rgb[1]);
			    	 b=parseInt(rgb[2]);
			    	 var convertedcolor = util.convertColor(r,g,b);
					 console.log("the color converted at line level for due not yet is "+convertedcolor);
					 //expect(headerNotYetColor).toEqual(convertedcolor)
		    	 });
		    	 
			 });
	    });
	 });

//BOPIS_13:Verify if user is not able to select past dates from the current date  in pickup start and end date also check pickup start date > pickup end date

	it("Verify if user is not able to select past dates and check pickup start date > pickup end date_BOPIS__008", function() {
		var Date = "";
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			
			data=value;
			expect(data).toBe(false);
		});
		
		salesOrderCreate.editPencilButton(5);
        BOPISCreate.pickupStartDateEdit(browser.params.BOPISPastStartDate,5);
    	//salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(7);    		 
        BOPISCreate.pickupEndDateEdit(browser.params.BOPISPastEndDate,5);
    	
		salesOrderCreate.editPencilButton(6);
		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
    	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(8);
		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTime,8);
    	salesOrderSummary.salesOrderPane("Line Items");
    	browser.sleep(1000);
    	salesOrderEdit.reSave();
    	Date=util.currentDate();
    	 BOPISSummary.pickupStartDate().then(function(value){ 				
 			data=value;
 			console.log('pick up start date at header level '+data);
 			//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
 		});
         BOPISSummary.pickupEndDate().then(function(value){ 				
 			data=value;
 			console.log('pick up end date at header level '+data);
 			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
 		});
     	salesOrderCreate.editPencilButton(5);
        BOPISCreate.pickupStartDateEdit(browser.params.BOPISStartDateExpired,5);
    	salesOrderSummary.salesOrderPane("Line Items");
     	browser.sleep(1000);
    	salesOrderEdit.reSave();
    	BOPISSummary.pickupStartDate().then(function(value){ 				
  			data=value;
  			console.log('pick up start date at header level '+data);
  			//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
  		});
    	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
			data=value;
			console.log('fulfillment type at line 1 '+data);
			expect(data).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
		});
        BOPISSummary.pickupStartDate().then(function(value){ 				
			data=value;
			console.log('pick up start date at header level '+data);
			//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupEndDate().then(function(value){ 				
			data=value;
			console.log('pick up end date at header level '+data);
			expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupStartTime().then(function(value){ 				
			data=value;
			console.log('pick up start time at header level '+data);
		//	expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);// Issue OMS-5317
		});
        BOPISSummary.pickupEndTime().then(function(value){ 				
			data=value;
			console.log('pick up end time at header level '+data);
		//	expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);// Issue OMS-5317
			
		});
		
	});
	
	//BOPIS_15:Verify if user able to edit Pickup end time as less than pickup start time then check order is going to Failed to validate or not
	it("edit Pickup end time as less than pickup start time then check order is going to Failed to validate _BOPIS__009", function() {
		var Date = "";
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			
			data=value;
			expect(data).toBe(false);
		});
		salesOrderCreate.editPencilButton(6);
		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
    	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(8);
		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTimeLess,8);//Updating the pick up end time >start time 
    	salesOrderSummary.salesOrderPane("Line Items");
    	browser.sleep(1000);
    	salesOrderEdit.reSave();
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO VALIDATE"); 
	});
	
//BOPIS_19 : Verify if user able to  view the pickup window dates , fulfillment type in BOPIS store portal screen	
//BOPIS_25 : Verify if user able to view Carrier and Carrier sevice as "Pickup In Store" in shipment screen
//BOPIS_20 : Verify if user able to view the Accept,Reject,printpicklist by order/item,Accept partial action icons should enabled at header for Pending FR
//BOPIS_21 : Verify if user is able to accept the order through "Accept order" button in BOPIS store portal screen
//BOPIS_24 : Verify if user is able to complete fulfillment for "Pickup In Store" fulfillment type  order and check the order status
//BOPIS_26 : Verify if user is able to view the print pick list by order/item at UI icons and  header level options 
//BOPIS_28 : Verify if user able to download .pdf from the print pick list
//BOPIS_31 : Verify if user able to perform pickup order for "Awaiting customer pickup" FR
	
	it("view the pickup window dates , fulfillment type in BOPIS store portal screen_BOPIS__010", function() {
			var Date = "";
			utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
			console.log("Folder cleared successfully");
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			browser.sleep(1000);
			callCenter.attachCustomer();
			callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			salesOrderCreate.selectCustomer();
			salesOrderCreate.useSelectedCustomer();
			callCenter.editLineGear("3");
			callCenter.lineItemselectOptions("Edit Line");
			salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
			browser.sleep(100);
			salesOrderCreate.availableStore(browser.params.availableStore);
			browser.sleep(500);
			callCenter.editLinePopUpSaveBtn(); 
			salesOrderSummary.lineDetails(1);
		    browser.sleep(500);
		    salesOrderSummary.inventoryOptionPane();
		    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
		    	ATSCountBefore =parseInt(qty);
		          console.log("pre-release available count"+ATSCountBefore);
		      });
		      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountBefore = parseInt(qty);
		          browser.sleep(1000);
		          console.log("pre-release reserved count"+reservedCountBefore);        
		      });
		      salesOrderSummary.Done();
		    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			browser.sleep(2000);
			salesOrderCreate.saveOption("Save");
			salesOrderCreate.salesOrderNumber().then(function (value) {
			    SONumber = value;
			    console.log("sales order number"+SONumber);
			});
			salesOrderSummary.OrderStatusDetails(1).then(function (value) {
				savedStatus = value;
			    console.log("the orderstatus is "+savedStatus);	
			    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
			});	
			browser.sleep(3000);
			BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
			
	   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				//expect(fulfillmentType).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.pickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
				console.log('pick up start date at header level '+pickupStartDate);
	
				//expect(util.convertDate(pickupStartDate,'MMM/dd/YYYY')).toEqual(Date);
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
				console.log('pick up end date at header level '+pickupEndDate);
				//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
			});
	        BOPISSummary.pickupStartTime().then(function(value){ 				
	        	pickupStartTime=value;
				console.log('pick up start time at header level '+pickupStartTime);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);
			});
	        BOPISSummary.pickupEndTime().then(function(value){ 				
	        	pickupEndTime=value;
				console.log('pick up end time at header level '+pickupEndTime);
				//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);
	        });
	    	 salesOrderSummary.lineDetails(1);
	 	     browser.sleep(500);
		     salesOrderSummary.inventoryOptionPane();	
			 salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
				 ATSCountafter = parseInt(qty);
			     console.log("available ATS count after release "+ATSCountafter);
			     expect(ATSCountafter).toEqual((ATSCountBefore-1));
		      });
		      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountafter = parseInt(qty);
		          console.log("reserved count after release "+reservedCountafter);       
		          expect(reservedCountafter).toEqual((reservedCountBefore+1));

		      });
		      salesOrderSummary.Done();
		
        browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window details are: "+orderStatus);
				//browser.sleep(2000);
				expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(pickupStartDate);//checking the pick up date
				expect(BOPISCreate.pickWindowDetails(2,orderStatus)).toEqual(pickupStartTime);//checking teh pick up start time
				expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(pickupEndDate); //checking the pcik up end date
				expect(BOPISCreate.pickWindowDetails(4,orderStatus)).toEqual(pickupEndTime); //checking the pick up end time
		    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
		 			orderStatus = status;
					console.log("the pickup window status is: "+orderStatus);
					browser.sleep(2000);
					expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
	    		});
		    	BOPISCreate.lineSelect(1);
		    	expect(BOPISCreate.rejectButtonPresence()).toBe(true);  // checking the presence of Reject Button
		    	expect(BOPISCreate.pickListButtonPresence()).toBe(true); //checking the presence of print button
		    	BOPISCreate.printButtonClick();
		    	expect(BOPISCreate.printPickListbyOrder()).toBe(true);//checking the pick list by order presence
		    	BOPISCreate.printPickListOrder();
		    	expect(BOPISCreate.PrintViewPresence()).toBe(true);//pick list by order print console presence checking
		    	BOPISCreate.pickListDownload();//downloading the picklist
		    	BOPISCreate.PrintCloseButton();
		    	BOPISCreate.lineSelect(1);
		    	BOPISCreate.printButtonClick();
		    	expect(BOPISCreate.printPickListbyItem()).toBe(true);//checking the  pick list by item print presence
		    	BOPISCreate.printPickListItem();
		    	expect(BOPISCreate.PrintViewPresence()).toBe(true);//pick list by Item print console presence checking
		    	BOPISCreate.PrintCloseButton();
		    	expect(BOPISCreate.printConfirm()).toBe(true);//checking printed or not
		    	BOPISCreate.plusIconAtLine();
		    	expect(BOPISCreate.skuInformation(2)).toEqual(browser.params.searchValueSKU1);
		    	BOPISCreate.lineSelect(1);
		    	BOPISCreate.acceptButton();
		    	expect(BOPISCreate.acceptButtonPresence(1)).toBe(true); // Accept Button is presence checking
		    	expect(BOPISCreate.acceptButtonPresence(2)).toBe(true); // PArtial Accept button presence checking
		    	BOPISCreate.acceptOrder(1);
		    	BOPISCreate.confirmButton();
		    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
		 			orderStatus = status;
					console.log("the pickup window status is: "+orderStatus);
					browser.sleep(2000);
					expect(orderStatus).toEqual("ACCEPTED");
	    		});
		    	BOPISCreate.lineClick(1);
		    	BOPISCreate.selectFromTheSearch(1);
		    	BOPISCreate.submitPack("Pick & Pack");
		    	batchCreate.selectFromTheSearch(2);
			    batchCreate.qtyInc(1,1);
			    batchCreate.submitPack("Include in Package");
			    browser.sleep(500);
			    batchCreate.PackingtypeSelect(browser.params.packageValue);
			    batchCreate.submitPack("Add Package");
			    browser.sleep(500);
			    batchCreate.submitPack("Complete Fulfillment");
			    browser.sleep(3000);
			 });
	    });
    	 browser.wait(function () {
 	        return SONumber != '';
 	    }).then(function () {
			expect(util.foundFile(browser.params.labelPath)).toBe(true);//checking whether the file download is success or not
    		callCenter.CallCenterPage();
    		callCenter.page("Sales Orders");
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
            salesOrderSummary.salesOrderSelectGear("View");
	    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
	    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);          
            expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
	        salesOrderSummary.frRequestLink(1);
	        expect(FRCreate.frHeaderStatus()).toEqual("AWAITING CUSTOMER PICKUP");
	        expect(BOPISSummary.frScreenCarrierType(1)).toEqual("PICKUP_IN_STORE")
	        expect(BOPISSummary.frSCreenServiceType(2)).toEqual("PICKUP_IN_STORE")

	    });
    	 
    	 browser.wait(function () {
  	        return SONumber != '';
  	    }).then(function () {
  	    	
  	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
	    	 BOPISCreate.orderCount(2).then(function (count) {
	    		 awaitingCP1 = parseInt(count);
	    		 console.log("the Orders Awaiting Customer Pickup before pick up is "+awaitingCP1)
	    	 });
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
		     BOPISCreate.lineSelect(1);
	    	 salesOrderCreate.TruckIconHeaderClick();
	  	     browser.sleep(500);
	  	     salesOrderCreate.pickupDetails(browser.params.custDisplayName,"Driving License","1236541","test");
	  	     browser.sleep(500);
	  	     salesOrderSummary.CNFButton();
	  	     browser.sleep(5000);
	  	     BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status after pick up is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order After pick up 
   		    });
	  	    BOPISCreate.orderCount(2).then(function (count) {
	    		 awaitingCP2 = parseInt(count);
	    		 console.log("the Orders Awaiting Customer Pickup after pick up is "+awaitingCP2)
	    		 expect((awaitingCP2)).toEqual((awaitingCP1-1));
	    	 });
  	    	
  	    });
    	 
    	 browser.wait(function () {
  	        return SONumber != '';
  	    }).then(function () {
 			expect(util.foundFile(browser.params.labelPath)).toBe(true);//checking whether the file download is success or not
     		callCenter.CallCenterPage();
     		callCenter.page("Sales Orders");
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.lineDetails(1);
	 	    browser.sleep(500);
		    salesOrderSummary.inventoryOptionPane();
            salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
				 ATSCountafter = parseInt(qty);
			     console.log("available ATS count after release "+ATSCountafter);
			     expect(ATSCountafter).toEqual((ATSCountBefore-1));
            });
            salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountafter = parseInt(qty);
		          console.log("reserved count after release "+reservedCountafter);       
		          expect(reservedCountafter).toEqual((reservedCountBefore));
            });
            salesOrderSummary.Done();
 	    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PICKEDUP BY CUSTOMER"); //HEADER LEVEL; CHECKING
 	    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED"); //Line LEVEL; CHECKING
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);          
            expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");
 	        salesOrderSummary.frRequestLink(1);
 	        expect(FRCreate.frHeaderStatus()).toEqual("PICKEDUP BY CUSTOMER");
 	        expect(BOPISSummary.frScreenCarrierType(1)).toEqual("PICKUP_IN_STORE")
 	        expect(BOPISSummary.frSCreenServiceType(2)).toEqual("PICKUP_IN_STORE")

 	    });
		
	});
	
	//BOPIS_16:Verify if order is going to Failed to Allocate when ATS is less than ordered qty
	it("order is going to Failed to Allocate when ATS is less than ordered qty_BOPIS__011", function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	         console.log("pre-release available count"+ATSCountBefore);
	         ATSUpdated = ATSCountBefore+10;
	         console.log("ATS Updated count"+ATSUpdated);
	        salesOrderSummary.Done();
	    });
	   
 		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
 		browser.sleep(100);
 		salesOrderCreate.availableStore(browser.params.availableStore);
 		browser.sleep(500);
 		callCenter.editLinePopUpSaveBtn();
 		browser.sleep(1000);
 		callCenter.editLineGear("3");
  		callCenter.lineItemselectOptions("Edit Line");
 		callCenter.editSKUQuantity(ATSUpdated);
 		browser.sleep(500);
 		callCenter.editLinePopUpSaveBtn();
	//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			
			data=value;
			expect(data).toBe(false);
		});
		salesOrderCreate.editPencilButton(6);
		BOPISCreate.pickupStartTimeEdit(browser.params.BOPISstartTime,6);
    	salesOrderSummary.salesOrderPane("Line Items");
		salesOrderCreate.editPencilButton(8);
		BOPISCreate.pickupEndTimeEdit(browser.params.BOPISEndTimeLess,8);//Updating the pick up end time >start time 
    	salesOrderSummary.salesOrderPane("Line Items");
    	browser.sleep(1000);
    	salesOrderEdit.reSave();
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO VALIDATE"); 
        //callCenter.editLineGear("1");
    //    callCenter.lineItemselectOptions("Release");
    //    salesOrderSummary.orderRelease("Release",2);     
    //    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO ALLOCATE"); 
     //   expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("FAILED TO ALLOCATE"); 
        
	});
	
//BOPIS:23_Verify if user is able to reject the order through "Reject Order" button in BOPIS store portal screen with BOPIS correlation as false	
	
	it("if user is able to reject the order through Reject Order button in BOPIS store portal_BOPIS Correlation false _BOPIS__012", function() {

		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	          console.log("pre-release available count"+ATSCountBefore);
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountBefore = parseInt(qty);
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+reservedCountBefore);        
	      });
	      salesOrderSummary.Done();
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
        	fulfillmentType=value;
			console.log('fulfillment type at line 1 '+fulfillmentType);
			//expect(fulfillmentType).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
		});
        BOPISSummary.pickupStartDate().then(function(value){ 				
        	pickupDate=value;
			pickupStartDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
			console.log('pick up start date at header level '+pickupStartDate);

			//expect(util.convertDate(pickupStartDate,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupEndDate().then(function(value){ 				
        	pickupDate=value;
			pickupEndDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
			console.log('pick up end date at header level '+pickupEndDate);
			//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupStartTime().then(function(value){ 				
        	pickupStartTime=value;
			console.log('pick up start time at header level '+pickupStartTime);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);
		});
        BOPISSummary.pickupEndTime().then(function(value){ 				
        	pickupEndTime=value;
			console.log('pick up end time at header level '+pickupEndTime);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);
        });
    	 salesOrderSummary.lineDetails(1);
 	     browser.sleep(500);
	     salesOrderSummary.inventoryOptionPane();	
		 salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
			 ATSCountafter = parseInt(qty);
		     console.log("available ATS count after release "+ATSCountafter);
		     expect(ATSCountafter).toEqual((ATSCountBefore-1));
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountafter = parseInt(qty);
	          console.log("reserved count after release "+reservedCountafter);       
	          expect(reservedCountafter).toEqual((reservedCountBefore+1));

	      });
	      salesOrderSummary.Done();
	
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
 			orderStatus = status;
			console.log("the pickup window details are: "+orderStatus);
			//browser.sleep(2000);
			expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(pickupStartDate);//checking the pick up date
			expect(BOPISCreate.pickWindowDetails(2,orderStatus)).toEqual(pickupStartTime);//checking teh pick up start time
			expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(pickupEndDate); //checking the pcik up end date
			expect(BOPISCreate.pickWindowDetails(4,orderStatus)).toEqual(pickupEndTime); //checking the pick up end time
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	expect(BOPISCreate.rejectButtonPresence()).toBe(true);  // checking the presence of Reject Button
	    	BOPISCreate.rejectTrash();
	    	BOPISCreate.rejectOrder(1);//Reject Order
	    	BOPISCreate.BOPISReject(browser.params.rejectReason,browser.params.rejectComments);
	    	BOPISCreate.rejectConfirm();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED");
    			});
    			BOPISCreate.printButtonClick();
				expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
				BOPISCreate.printButtonClick();
				BOPISCreate.printButtonClick();
				expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
		 	});
    	});
	 	browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO ALLOCATE');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO ALLOCATE"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("FAILED TO ALLOCATE"); //HEADER LEVEL; CHECKING
    	salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountAfter =parseInt(qty);
	          console.log("qty count after reject "+ATSCountAfter);
	          expect(ATSCountBefore).toEqual(ATSCountAfter);
	    });
	    salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	   	  reservedCountAfter = parseInt(qty);
          console.log("qty reserved after reject "+reservedCountAfter);   
          expect(reservedCountBefore).toEqual(reservedCountAfter);
	    });
	    salesOrderSummary.Done();
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("REJECTED");
	    });	
	});
	

//BOPIS:22_Verify if user is able to reject the order through "Reject Order" button in BOPIS store portal screen with BOPIS correlation as true	
//BOPIS:30_	Verify if Print pick list by order/item options is enabled  only for Pending , Accepted and Partially accepted statuses and disbaled for remaining statuses or not
	it("if user is able to reject the order through Reject Order button in BOPIS store portal_BOPIS Correlation true _BOPIS__013", function() {

		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"true");
		});
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	          console.log("pre-release available count"+ATSCountBefore);
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountBefore = parseInt(qty);
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+reservedCountBefore);        
	      });
	      salesOrderSummary.Done();
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
		BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});
        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
        	fulfillmentType=value;
			console.log('fulfillment type at line 1 '+fulfillmentType);
			//expect(fulfillmentType).toContain(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
		});
        BOPISSummary.pickupStartDate().then(function(value){ 				
        	pickupDate=value;
			pickupStartDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
			console.log('pick up start date at header level '+pickupStartDate);

			//expect(util.convertDate(pickupStartDate,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupEndDate().then(function(value){ 				
        	pickupDate=value;
			pickupEndDate = util.convertDate(pickupDate,'MMM/dd/YYYY');
			console.log('pick up end date at header level '+pickupEndDate);
			//expect(util.convertDate(data,'MMM/dd/YYYY')).toEqual(Date);
		});
        BOPISSummary.pickupStartTime().then(function(value){ 				
        	pickupStartTime=value;
			console.log('pick up start time at header level '+pickupStartTime);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISstartTime);
		});
        BOPISSummary.pickupEndTime().then(function(value){ 				
        	pickupEndTime=value;
			console.log('pick up end time at header level '+pickupEndTime);
			//expect(util.convertTime(data,'HHMMZO')).toEqual(browser.params.BOPISEndTime);
        });
    	 salesOrderSummary.lineDetails(1);
 	     browser.sleep(500);
	     salesOrderSummary.inventoryOptionPane();	
		 salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
			 ATSCountafter = parseInt(qty);
		     console.log("available ATS count after release "+ATSCountafter);
		     expect(ATSCountafter).toEqual((ATSCountBefore-1));
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountafter = parseInt(qty);
	          console.log("reserved count after release "+reservedCountafter);       
	          expect(reservedCountafter).toEqual((reservedCountBefore+1));

	      });
	      salesOrderSummary.Done();
	
	      browser.wait(function () {
	    	  return SONumber != '';
	      }).then(function () {
	    	  callCenter.fullFillmentPage();
	    	  callCenter.page("Store Portal - V2");
	    	  commons.searchWithCriteria("Order #","ends with",SONumber);
	    	  BOPISCreate.storePortalItemLine(7,1).then(function (status) {
	    	  orderStatus = status;
			  console.log("the pickup window details are: "+orderStatus);
			  //browser.sleep(2000);
			  expect(BOPISCreate.pickWindowDetails(1,orderStatus)).toEqual(pickupStartDate);//checking the pick up date
			  expect(BOPISCreate.pickWindowDetails(2,orderStatus)).toEqual(pickupStartTime);//checking teh pick up start time
			  expect(BOPISCreate.pickWindowDetails(3,orderStatus)).toEqual(pickupEndDate); //checking the pcik up end date
			  expect(BOPISCreate.pickWindowDetails(4,orderStatus)).toEqual(pickupEndTime); //checking the pick up end time
	    	  BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
	    	  });
	    	  BOPISCreate.lineSelect(1);
	          expect(BOPISCreate.rejectButtonPresence()).toBe(true);  // checking the presence of Reject Button
	    	  BOPISCreate.rejectTrash();
	    	  BOPISCreate.rejectOrder(1);//Reject Order
	    	  BOPISCreate.BOPISReject(browser.params.rejectReason,browser.params.rejectComments);
	    	  BOPISCreate.rejectConfirm();
	    	  BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("REJECTED");
    			});
	    	  BOPISCreate.printButtonClick();
	    	  expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
	    	  BOPISCreate.printButtonClick();
	    	  BOPISCreate.printButtonClick();
	    	  expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
	    	  
		 	});
    	});
	 	browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.CallCenterPage();
	    	callCenter.page("Sales Orders");
	    	salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	    	expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
	    	salesOrderSummary.salesOrderSelectGear("View");
	    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED"); //HEADER LEVEL; CHECKING
	    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELLED"); //HEADER LEVEL; CHECKING
	    	salesOrderSummary.lineDetails(1);
	    	browser.sleep(500);
	    	salesOrderSummary.inventoryOptionPane();
	    	salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountAfter =parseInt(qty);
	          console.log("qty count after reject "+ATSCountAfter);
	          expect(ATSCountBefore).toEqual(ATSCountAfter);
	    	});
	    	salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    		reservedCountAfter = parseInt(qty);
	    		console.log("qty reserved after reject "+reservedCountAfter);   
	    		expect(reservedCountBefore).toEqual(reservedCountAfter);
	    	});
	    	salesOrderSummary.Done();
	    	salesOrderSummary.salesOrderPane("Shipping Requests");
	    	salesOrderSummary.collapseIcon(1);          
	    	expect(FRCreate.shipmentPaneStatus(2)).toEqual("REJECTED");
	    	});	
		});
	
//	BOPIS_29: Veriy if user able to view the "Orders Pending Fulfillment" and "Orders Awaiting customer pickup" count is updating or not 
//	BOPIS_30: Verify if Print pick list by order/item options is enabled  only for Pending , Accepted and Partially accepted statuses and disbaled for remaining statuses or not
//	BOPIS_40: Verify if Print Documents option is enabled for only( Awaiting/ partially awaiting customer pickup,pickedup by customer) statuses or not 	
	it('verify the "Orders Pending Fulfillment" and "Orders Awaiting customer pickup" count is updating or not_BOPIS__014', function() {
		
		browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'bopis');
	 	invoiceSummary.lineSelctor(1);
	 	BOPISCreate.keysAndValues().then(function (value) {
		    data = value;
		    console.log("the data are "+data);
		    BOPISCreate.Correlation(data,browser.params.BOPISCorrelationKey,"false");
		});
		browser.get(callcenterorder);
		callCenter.fullFillmentPage();
   	 	callCenter.page("Store Portal - V2");
   	 	BOPISCreate.orderCount(2).then(function (count) {
   	 		awaitingCP = parseInt(count);
   	 		console.log("the Orders Awaiting Customer Pickup intial is "+awaitingCP)
   	 	});
   	 	BOPISCreate.orderCount(1).then(function (count) {
   	 		pendingFulfillment = parseInt(count);
   	 		console.log("the pending order for fulfillment initial is  "+pendingFulfillment)
   	 	});
   	 	browser.sleep(1500);
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
    		BOPISCreate.orderCount(2).then(function (count) {
       	 		awaitingCP1 = parseInt(count);
       	 		console.log("the Orders Awaiting Customer Pickup after release is "+awaitingCP1)
       	 		expect(awaitingCP).toEqual(awaitingCP1);
       	 	});
       	 	BOPISCreate.orderCount(1).then(function (count) {
       	 		pendingFulfillment1 = parseInt(count);
       	 		console.log("the pending order for fulfillment after release is  "+pendingFulfillment1)
       	 		expect(pendingFulfillment1).toEqual((pendingFulfillment+1));

       	 	});
    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
 			orderStatus = status;
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		 });
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 BOPISCreate.orderCount(2).then(function (count) {
    		 awaitingCP1 = parseInt(count);
    		 console.log("the Orders Awaiting Customer Pickup after shipment creation is "+awaitingCP1)
    		 expect(awaitingCP1).toEqual((awaitingCP+1))
    	 });
    	 BOPISCreate.orderCount(1).then(function (count) {
    	 		pendingFulfillment1 = parseInt(count);
    	 		console.log("the pending order for fulfillment after shipment creation is  "+pendingFulfillment1)
    	 		expect(pendingFulfillment1).toEqual((pendingFulfillment));

    	 });
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
	     BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
		 BOPISCreate.printButtonClick();
		 BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
    	 salesOrderCreate.TruckIconHeaderClick();
  	     browser.sleep(500);
  	     salesOrderCreate.pickupDetails(browser.params.custDisplayName,"Driving License","1236541","test");
  	     browser.sleep(500);
  	     salesOrderSummary.CNFButton();
  	     browser.sleep(5000);
  	     BOPISCreate.storePortalItemLine(5,1).then(function (status) {
 			orderStatus = status;
			console.log("the pickup window status after pick up is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER"); //checking the status of the order After pick up 
		    });
  	     BOPISCreate.orderCount(2).then(function (count) {
    		 awaitingCP2 = parseInt(count);
    		 console.log("the Orders Awaiting Customer Pickup after pick up is "+awaitingCP2)
    		 expect((awaitingCP2)).toEqual((awaitingCP));
    	 });
  	     
  	   BOPISCreate.orderCount(1).then(function (count) {
	 		pendingFulfillment2 = parseInt(count);
	 		console.log("the order pending fulfillment after shipment creation is  "+pendingFulfillment2)
	 		expect(pendingFulfillment2).toEqual(pendingFulfillment);

  	   	});
  	   
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
  	   BOPISCreate.printButtonClick();
  	   BOPISCreate.printButtonClick();
  	   expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
	 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("PICKEDUP BY CUSTOMER"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED"); //Line LEVEL; CHECKING
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CLOSED");

	    });
	
	});
	
//BOPIS_32: Verify if user able to perform Header level cancel order for "Awaiting customer pickup" FR
//BOPIS_33: Verify if user able to perform "Release Inventory" for "Restock" FR	
	it('Verify if user able to perform Header level cancel order for Awaiting customer pickup And Restock FR_BOPIS__015', function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	          console.log("pre-release available count"+ATSCountBefore);
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountBefore = parseInt(qty);
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+reservedCountBefore);        
	      });
	      salesOrderSummary.Done();
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
 			orderStatus = status;
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		 });
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
	     BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
		 BOPISCreate.printButtonClick();
		 BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
		 BOPISCreate.rejectTrash();
   	  	 BOPISCreate.rejectOrder(2);//Cancel Order
   	  	 BOPISCreate.cancelOrderHeader();
   	  	 BOPISCreate.BOPISReject(browser.params.rejectReason1,browser.params.rejectComments);
   	  	 BOPISCreate.confirmButton();
   	  	 BOPISCreate.storePortalItemLine(5,1).then(function (status) {
			orderStatus = status;
			console.log("the pickup window status is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("RESTOCK");
			});
	 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELLED"); //Line LEVEL; CHECKING
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("RESTOCK");

	    });
	 	browser.wait(function () {
	        return SONumber != '';
	 		}).then(function () {
	    	callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");
	    	commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.ReleaseINVHeader();
	    	expect(BOPISCreate.releaseINVDropdownPresence()).toBe(true);
	    	BOPISCreate.releaseINVDropdown();
	    	BOPISCreate.Yes();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
				orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("CANCELLED");
			});
	    });
	
	 	browser.wait(function () {
	        return SONumber != '';
	 		}).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELLED"); //Line LEVEL; CHECKING
		    salesOrderSummary.lineDetails(1);
		    browser.sleep(500);
		    salesOrderSummary.inventoryOptionPane();
		    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
		    	ATSCountafter =parseInt(qty);
		          console.log("available ATS count  after RESTOCK"+ATSCountafter);
		          expect(ATSCountBefore).toEqual(ATSCountafter);
		      });
		      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountafter = parseInt(qty);
		          browser.sleep(1000);
		          console.log(" available reserved count after RESTOCK"+reservedCountafter); 
		          expect(reservedCountBefore).toEqual(reservedCountafter);

		      });
		      salesOrderSummary.Done();
		      salesOrderSummary.salesOrderPane("Shipping Requests");
		      salesOrderSummary.collapseIcon(1);          
		      expect(FRCreate.shipmentPaneStatus(2)).toEqual("CANCELLED");
	        
	    });

	});
//BOPIS_034: Verify if user able to perform Line level cancel for "Awaiting customer pickup" FR in cancel order screen	
	it('Verify if user able to perform Line level cancel order for Awaiting customer pickup_BOPIS__016', function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 
		salesOrderSummary.lineDetails(1);
	    browser.sleep(500);
	    salesOrderSummary.inventoryOptionPane();
	    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
	    	ATSCountBefore =parseInt(qty);
	          console.log("pre-release available count"+ATSCountBefore);
	      });
	      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
	    	  reservedCountBefore = parseInt(qty);
	          browser.sleep(1000);
	          console.log("pre-release reserved count"+reservedCountBefore);        
	      });
	      salesOrderSummary.Done();
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
    	 callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
    	 BOPISCreate.storePortalItemLine(7,1).then(function (status) {
 			orderStatus = status;
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);
		 });
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	     callCenter.fullFillmentPage();
    	 callCenter.page("Store Portal - V2");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	     BOPISCreate.lineSelect(1);
	     BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(1)).toBe(true);//checking the pick list by order is disabled
		 BOPISCreate.printButtonClick();
		 BOPISCreate.printButtonClick();
		 expect(BOPISCreate.printPickListDisabled(2)).toBe(true);//checking the  pick list by item is disabled
		 BOPISCreate.rejectTrash();
   	  	 BOPISCreate.rejectOrder(2);//Cancel Order
   	  	 BOPISCreate.lineLevelCancel();
   	  	 BOPISCreate.lineLevelReject(1,browser.params.rejectReason1,browser.params.rejectComments);
   	  	 BOPISCreate.confirmButton();
   	  	 callCenter.fullFillmentPage();
   	  	 callCenter.page("Store Portal - V2");
   	  	 BOPISCreate.storePortalItemLine(5,1).then(function (status) {
			orderStatus = status;
			console.log("the pickup window status is: "+orderStatus);
			browser.sleep(2000);
			expect(orderStatus).toEqual("CANCELLED");
			});
	 });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	 		callCenter.CallCenterPage();
	 		callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('CANCELED');
	        salesOrderSummary.salesOrderSelectGear("View");
		    expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("CANCELED"); //HEADER LEVEL; CHECKING
		    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CANCELLED"); //Line LEVEL; CHECKING
		    salesOrderSummary.lineDetails(1);
		    browser.sleep(500);
		    salesOrderSummary.inventoryOptionPane();
		    salesOrderSummary.inventoryDetailsCountInSO("1").then(function (qty) {
		    	ATSCountafter =parseInt(qty);
		          console.log("available ATS count  after cancel "+ATSCountafter);
		          expect(ATSCountBefore).toEqual(ATSCountafter);
		      });
		      salesOrderSummary.inventoryDetailsCountInSO("2").then(function (qty) {
		    	  reservedCountafter = parseInt(qty);
		          browser.sleep(1000);
		          console.log(" available reserved count after cancel "+reservedCountafter); 
		          expect(reservedCountBefore).toEqual(reservedCountafter);

		      });
		      salesOrderSummary.Done();
		    salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);          
	        expect(FRCreate.shipmentPaneStatus(2)).toEqual("CANCELLED");
	    });

	 });
	
	//BOPIS_036: Verify if user able to filter the orders by( order# , status) fiter criteria in the BOPIS Store portal screen	
	it('Filter Validations( order# , status) in the BOPIS Store portal screen_BOPIS__016', function() {
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	   
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("Store Portal - V2");
//checking the order number from the filter 
	    	 salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	    	 BOPISCreate.bopisScreen(11).then(function (total) {
	                order = total;
	                console.log("the order number in the BOPIS screen : "+order);
	                expect(order).toContain(SONumber);
		    	 });
	    	 /*
//checking the status from the filter 
	    	 browser.refresh();
	    	 salesOrderSummary.salesOrderSearch("Status", "Pending");
	    	 BOPISCreate.bopisScreen(11).then(function (total) {
	    		 status = total;
                 console.log("the status in the BOPIS screen : "+status);
                 expect(BOPISCreate.bopisScreenData(status,"PENDING")).toBe(true);
		    	 });*/
// Custom filters - order number search
	   	commons.searchWithCriteria("Order #","ends with",SONumber);//order number checking
	 
	    	 BOPISCreate.bopisScreenLine(11).then(function (total) {
                order = total;
                console.log("the order number in the BOPIS screen : "+order);
                expect(order).toEqual(SONumber);
	    	 });
	    	 
// Custom filters - Status search
	    	 
 			browser.refresh();
 			BOPISCreate.bopisSearch("Status","is","Pending");//status checking
 			BOPISCreate.bopisScreen(5).then(function (total) {
                 status = total;
                 console.log("the status in the BOPIS screen : "+status);
                 expect(BOPISCreate.bopisScreenData(status,"PENDING")).toBe(true);
 	    	 });
 			browser.refresh();
 			commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);		 
    });
	 browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
		callCenter.CallCenterPage();
		callCenter.page("Sales Orders");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
        salesOrderSummary.salesOrderSelectGear("View");
    	expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
    	expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP"); //HEADER LEVEL; CHECKING
        salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);          
        expect(FRCreate.shipmentPaneStatus(2)).toEqual("AWAITING CUSTOMER PICKUP");
        
	    });
	});
	
	//BOPIS_035: Verify if user able to view "Pickup window" dates color boxes at fulfillment type are changing as per the Legends or not	
	it('Verify if user able to view "Pickup window" dates color boxes at fulfillment type are changing as per the Legends or not BOPIS__021', function() {
		browser.get(callcenterorder);
		callCenter.fullFillmentPage();
    	callCenter.page("Store Portal - V2");
    	BOPISCreate.overdueBGColor().then(function (value) {
    		 color = value;
	    	 console.log("the legend expired color at header is "+color);
	    	 rgb = color.split(",");
	    	 r=parseInt(rgb[0]);
	    	 g=parseInt(rgb[1]);
	    	 b=parseInt(rgb[2]);
	    	 headerexpiredColor = util.convertColor(r,g,b);
			 console.log("the color converted ate header for expired is "+headerexpiredColor);
    	 
    	 });
    	
    	 BOPISCreate.pickupNotdueBGColor(1).then(function (value) {
    		 color = value;
	    	 console.log("the legend due today hedaer color is "+color);
	    	 rgb = color.split(",");
	    	 r=parseInt(rgb[0]);
	    	 g=parseInt(rgb[1]);
	    	 b=parseInt(rgb[2]);
	    	 headerdueTodayColor = util.convertColor(r,g,b);
			 console.log("the color converted hedaer due todayis "+headerdueTodayColor);
    	 
    	 });
 		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
		callCenter.lineItemselectOptions("Edit Line");
		salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
		browser.sleep(100);
		salesOrderCreate.availableStore(browser.params.availableStore);
		browser.sleep(500);
		callCenter.editLinePopUpSaveBtn(); 	   
	    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		browser.sleep(3000);
	
   //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        BOPISCreate.ShippingAddressCheck().then(function(value){
			data=value;
			expect(data).toBe(false);
		});	
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	callCenter.fullFillmentPage();
	    	callCenter.page("Store Portal - V2");	    	
 			commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.lineSelect(1);
	    	BOPISCreate.acceptButton();
	    	BOPISCreate.acceptOrder(1);
	    	BOPISCreate.confirmButton();
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("ACCEPTED");
    		});
	    	BOPISCreate.lineClick(1);
	    	BOPISCreate.selectFromTheSearch(1);
	    	BOPISCreate.submitPack("Pick & Pack");
	    	batchCreate.selectFromTheSearch(2);
		    batchCreate.qtyInc(1,1);
		    batchCreate.submitPack("Include in Package");
		    browser.sleep(500);
		    batchCreate.PackingtypeSelect(browser.params.packageValue);
		    batchCreate.submitPack("Add Package");
		    browser.sleep(500);
		    batchCreate.submitPack("Complete Fulfillment");
		    browser.sleep(3000);		 
	    });
		 browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	callCenter.fullFillmentPage();
		    	callCenter.page("Store Portal - V2");	    	
		    	commons.searchWithCriteria("Order #","ends with",SONumber);
		    	 BOPISCreate.backgroundColordueToday(7,1).then(function (value) {
				     color = value;
			    	 console.log("the due today color at line level is "+color);
			    	 rgb = color.split(",");
			    	 r=parseInt(rgb[0]);
			    	 g=parseInt(rgb[1]);
			    	 b=parseInt(rgb[2]);
			    	 var convertedcolor = util.convertColor(r,g,b);
					 console.log("the color converted at line level for due today is "+convertedcolor);
					 //expect(headerdueTodayColor).toEqual(convertedcolor)// Issue OMS-5333

		    	 });
		    	 
		    	 browser.refresh();
				 commons.searchWithCriteria("Order #","ends with",browser.params.expiredOrder);
				 BOPISCreate.backgroundColorExpired(7,1).then(function (value) {
			     color = value;
		    	 console.log("the expired color at line level is "+color);
		    	 rgb = color.split(",");
		    	 r=parseInt(rgb[0]);
		    	 g=parseInt(rgb[1]);
		    	 b=parseInt(rgb[2]);
		    	 var convertedcolor = util.convertColor(r,g,b);
				 console.log("the color converted at line level for expired is "+convertedcolor);
				// expect(headerexpiredColor).toEqual(convertedcolor)// Issue OMS-5333
	    	 });
		    	 
		    });
		});
		
	//generating token for API orders	
		it("Token Generation", done =>
		{
			console.log("Creating token");
			var options = {
			method: 'POST',
			url: 'https://project0-qa.enspirecommerce.com/api/v1/security/access/token?grant_type=client_credentials&scope=refreshToken',
			headers: {
				  'refreshToken':'application/x-www-form-urlencoded',
				  //'Authorization':'Basic YWRtaW5AdGhrLmNvbTpteXBhc3N3b3Jk',//p4
				  'Authorization':'Basic YWRtaW5AdGhrLmNvbTo5NV56Q1h3N1o3RHd1PVRN',//p0
				  'Content-Type':'application/x-www-form-urlencoded'
			},
		};
		options.json = true;
		request(options, function (error, response, body) {
			var errors = error;
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);
			token=body.access_token;
			console.log("token is "+token);
			done();
		});
	});
	
	
//BOPIS_7:Verify with API order with Header level pickup window dates only	
	it("Verify with API order with Header level pickup window dates only_BOPIS_017", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
        var options = {
            method: 'POST',
            url: orderApi,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:  {
            	  "orders": [
            		    {
            		      "orderDate": "2020-02-23T16:40:02.057-05:00",
            		      "puchaseOrderNumber": order,
            		      "orderNumber": order,
            		      "migrationOrder": false,
            		      "carrierServiceType": "Ground",
            		      "originalOrderNumber": order,
            		      "status": "OPEN",
            		      "channel": "B2C",
            		      "pickupWindowStartTime": browser.params.pickupWindowStartTimeAPI,
            		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeAPI,	   
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [      
            		          {
            		          "lineNumber": 1,
            		          "lineItemId": browser.params.searchValueSKU1,
            		          "itemTitle": browser.params.searchValueSKU1,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU1,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",     
            		          "fulfillmentSite": "sandiego-dc",         
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"

            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        },
            		         {
            		          "lineNumber": 2,
            		          "lineItemId": browser.params.searchValueSKU2,
            		          "itemTitle": browser.params.searchValueSKU2,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU2,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "2",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"
            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        }         
            		    ],
            		      "buyerContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "nameId": "Wendy Ziesemann",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },

            		      "billToContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },
            		      "shipToContacts": [
            		        {
            		          "firstName": "Wendy",
            		          "lastName": "Ziesemann",
            		          "name": "Wendy Ziesemann",
            		          "primaryEmail": "enspire@envistacorp.com",
            		          "primaryPhone": "246-898-3672",
            		          "companyName": "",
            		          "address": {
            		            "address1": "24 Green St",
            		            "address2": "",
            		            "city": "Hudson",
            		            "state": "MA",
            		            "zip5": "01749",
            		            "postalCode": "01749",
            		            "country": "US"
            		          }
            		        }
            		      ],
            		      "orderPayments": [
            		        {
            		          "status": "authorized",
            		          "transactionDate": "2020-04-14T00:00:00",
            		          "pnRef": "194201613302177334",
            		          "paymentType": "CREDIT_CARD",
            		          "nameOnCard": "SUJIT KUMAR SAHOO",
            		          "currency": "USD",
            		          "cardType": "VISA",
            		          "cardToken": "2000000000002629",
            		          "expirationYear": "20",
            		          "expirationMonth": "02",
            		          "maskedCardNumber": "2629",
            		          "authorizedAmount": 206,
            		          "authorized": true,
            		          "fullyCaptured": false,
            		           "chargeSequence" : 2,
            		            "refundSequence":2,
            		          "referenceData": [
    		                        {
    		                            "data": "oneORderTOKen",
    		                            "type": "String",
    		                            "value": "20000000000003783922"
    		                        }
            		          ],
            		          "orderPaymentTransactions": [
            		            {
            		              "transactionDate": "2020-04-14T00:00:00",
            		              "transactionType": "AUTHONLY",
            		              "transactionActualAmount": 206,
            		              "transactionAttemptedAmount": 206,
            		              "pnRef": "194201613302177334",
            		              "authorizedAmount": "206",
            		              "transactionExpirationDate": "2020-05-15T00:00:00",
            		              "referenceData": [],
            		              "paymentAccountDataToken": "2000000000002629",
            		              "nameOnCard": "SUJIT KUMAR SAHOO",
            		              "expirationDate": "0220",
            		              "maskedCardNumber": "2629",
            		              "error": false,
            		              "cardIssuerTrxId": "420161330217740135"
            		            }
            		          ]
            		        }
            		      ],
            		      "orderCharges": [],
            		      "orderDiscounts": [],
            		      "holds": [],
            		      "referenceData": [
            		        {
            		          "data": "CustomerID",
            		          "type": "String",
            		          "value": "000000001070"
            		        },
            		        {
            		          "data": "EmaMAPreferenceFlag",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "OrderUUID",
            		          "type": "String",
            		          "value": "664d76cfc0a8ed1d44f736565ed14700"
            		        },
            		        {
            		          "data": "SpeedFCShippingCode",
            		          "type": "String",
            		          "value": "SMRT"
            		        },
            		        {
            		          "data": "ORSOCode",
            		          "type": "String",
            		          "value": "0101"
            		        },
            		        {
            		          "data": "ORSOName",
            		          "type": "String",
            		          "value": "SFCC_DOMESTIC"
            		        },
            		        {
            		          "data": "ORSOType",
            		          "type": "String",
            		          "value": "SFCC"
            		        },
            		        {
            		          "data": "NoPayment",
            		          "type": "String",
            		          "value": "N"
            		        },
            		        {
            		          "data": "Expedite",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "CustomerOrderID",
            		          "type": "String",
            		          "value": "QAtest170620002"
            		        }
            		      ],
            		      "dataDomain": [
            		        "com.thk"
            		      ]
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
    		  
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	
        	browser.get(callCenterSalesOrdersListUrl);
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
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.pickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'YYYY-MM-DD');
				console.log('pick up start date at header level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'YYYY-MM-DD');;
				console.log('pick up end date at header level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.pickupStartTime().then(function(value){ 				
	        	pickuptime=value;
				console.log('pick up start time at header level '+pickuptime);
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				//expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.pickupEndTime().then(function(value){ 				
	        	pickupTime=value;
				console.log('pick up end time at header level '+pickupTime);
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				//expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndTime);
	        });
        });
        done();
        });      
	});

//BOPIS_08: Verify API order which contains Line level Pickup Window dates only	
	it("Verify with API order with Line level pickup window dates only_BOPIS_018", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
        var options = {
            method: 'POST',
            url: orderApi,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:  {
            	  "orders": [
            		    {
            		      "orderDate": "2020-02-23T16:40:02.057-05:00",
            		      "puchaseOrderNumber": order+1,
            		      "orderNumber": order+1,
            		      "migrationOrder": false,
            		      "carrierServiceType": "Ground",
            		      "originalOrderNumber": order+1,
            		      "status": "OPEN",
            		      "channel": "B2C",
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [      
            		          {
            		          "lineNumber": 1,
            		          "lineItemId": browser.params.searchValueSKU1,
            		          "itemTitle": browser.params.searchValueSKU1,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU1,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",   
            		          "pickupWindowStartTime": browser.params.pickupWindowStartTimeAPI,
                		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeAPI,	
            		          "fulfillmentSite": "sandiego-dc",         
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"

            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        },
            		         {
            		          "lineNumber": 2,
            		          "lineItemId": browser.params.searchValueSKU2,
            		          "itemTitle": browser.params.searchValueSKU2,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU2,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "2",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",
            		          "pickupWindowStartTime": browser.params.pickupWindowStartTimeAPI,
                		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeAPI,	
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"
            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        }         
            		    ],
            		      "buyerContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "nameId": "Wendy Ziesemann",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },

            		      "billToContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },
            		      "shipToContacts": [
            		        {
            		          "firstName": "Wendy",
            		          "lastName": "Ziesemann",
            		          "name": "Wendy Ziesemann",
            		          "primaryEmail": "enspire@envistacorp.com",
            		          "primaryPhone": "246-898-3672",
            		          "companyName": "",
            		          "address": {
            		            "address1": "24 Green St",
            		            "address2": "",
            		            "city": "Hudson",
            		            "state": "MA",
            		            "zip5": "01749",
            		            "postalCode": "01749",
            		            "country": "US"
            		          }
            		        }
            		      ],
            		      "orderPayments": [
            		        {
            		          "status": "authorized",
            		          "transactionDate": "2020-04-14T00:00:00",
            		          "pnRef": "194201613302177334",
            		          "paymentType": "CREDIT_CARD",
            		          "nameOnCard": "SUJIT KUMAR SAHOO",
            		          "currency": "USD",
            		          "cardType": "VISA",
            		          "cardToken": "2000000000002629",
            		          "expirationYear": "20",
            		          "expirationMonth": "02",
            		          "maskedCardNumber": "2629",
            		          "authorizedAmount": 206,
            		          "authorized": true,
            		          "fullyCaptured": false,
            		           "chargeSequence" : 2,
            		            "refundSequence":2,
            		          "referenceData": [
    		                        {
    		                            "data": "oneORderTOKen",
    		                            "type": "String",
    		                            "value": "20000000000003783922"
    		                        }
            		          ],
            		          "orderPaymentTransactions": [
            		            {
            		              "transactionDate": "2020-04-14T00:00:00",
            		              "transactionType": "AUTHONLY",
            		              "transactionActualAmount": 206,
            		              "transactionAttemptedAmount": 206,
            		              "pnRef": "194201613302177334",
            		              "authorizedAmount": "206",
            		              "transactionExpirationDate": "2020-05-15T00:00:00",
            		              "referenceData": [],
            		              "paymentAccountDataToken": "2000000000002629",
            		              "nameOnCard": "SUJIT KUMAR SAHOO",
            		              "expirationDate": "0220",
            		              "maskedCardNumber": "2629",
            		              "error": false,
            		              "cardIssuerTrxId": "420161330217740135"
            		            }
            		          ]
            		        }
            		      ],
            		      "orderCharges": [],
            		      "orderDiscounts": [],
            		      "holds": [],
            		      "referenceData": [
            		        {
            		          "data": "CustomerID",
            		          "type": "String",
            		          "value": "000000001070"
            		        },
            		        {
            		          "data": "EmaMAPreferenceFlag",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "OrderUUID",
            		          "type": "String",
            		          "value": "664d76cfc0a8ed1d44f736565ed14700"
            		        },
            		        {
            		          "data": "SpeedFCShippingCode",
            		          "type": "String",
            		          "value": "SMRT"
            		        },
            		        {
            		          "data": "ORSOCode",
            		          "type": "String",
            		          "value": "0101"
            		        },
            		        {
            		          "data": "ORSOName",
            		          "type": "String",
            		          "value": "SFCC_DOMESTIC"
            		        },
            		        {
            		          "data": "ORSOType",
            		          "type": "String",
            		          "value": "SFCC"
            		        },
            		        {
            		          "data": "NoPayment",
            		          "type": "String",
            		          "value": "N"
            		        },
            		        {
            		          "data": "Expedite",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "CustomerOrderID",
            		          "type": "String",
            		          "value": "QAtest170620002"
            		        }
            		      ],
            		      "dataDomain": [
            		        "com.thk"
            		      ]
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
    		 
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	
        	browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
            //browser.sleep(2000);
    		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
			});	
   //Line Level Pick up details validation    		
    		callCenter.editLineGear("3");
    		callCenter.lineItemselectOptions("Edit Line");
    		BOPISSummary.lineLevelPickupStartDate(1).then(function(value){ 				
	        	pickupDate=value;
				console.log('pick up start date at line level before convertion is '+pickupDate);
				pickupStartDate = util.convertDate(pickupDate,'MM/DD/YYYY');
				console.log('pick up start date at line level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.lineLevelPickupEndDate(2).then(function(value){ 				
	        	pickupDate=value;
				console.log('pick up start date at line level before convertion is '+pickupDate);
				pickupEndDate = util.convertDate(pickupDate,'MM/DD/YYYY');;
				console.log('pick up end date at line level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.lineLevelPickupStartTime().then(function(value){ 				
	        	pickuptimeStart=value.substring(0, 5);
				console.log('pick up start time at line level '+pickuptimeStart);
				pickupStartTime = util.convertTime(pickuptimeStart,'24hrs')
				console.log('pick up start time at line level after conversion '+pickupStartTime);
				//expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.lineLevelPickupEndTime().then(function(value){ 				
	        	pickupTimeEnd=value.substring(0, 5);
				console.log('pick up end time at line level '+pickupTimeEnd);
				pickupEndTime = util.convertTime(pickupTimeEnd,'24hrs');
				console.log('pick up end time at line level after conversion '+pickupEndTime);
				//expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndTime);
	        });
	        commons.cancel();
    		callCenter.editLineGear("4");
    		callCenter.lineItemselectOptions("Edit Line");
    		BOPISSummary.lineLevelPickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'MM/DD/YYYY');
				console.log('pick up start date at header level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.lineLevelPickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'MM/DD/YYYY');;
				console.log('pick up end date at header level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.lineLevelPickupStartTime().then(function(value){ 				
	        	pickuptime=value.substring(0, 5);
				console.log('pick up start time at header level '+pickuptime);
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				//expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.lineLevelPickupEndTime().then(function(value){ 				
	        	pickupTime=value.substring(0, 5);
				console.log('pick up end time at header level '+pickupTime);
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				//expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndTime);
	        });
	        commons.cancel();
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.fulfillmentTypeValidation(2).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 2 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	//Header Level Pick up details validation      
	        BOPISSummary.pickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'YYYY-MM-DD');
				console.log('pick up start date at header level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'YYYY-MM-DD');;
				console.log('pick up end date at header level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.pickupStartTime().then(function(value){ 				
	        	pickuptime=value;
				console.log('pick up start time at header level '+pickuptime);
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				//expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.pickupEndTime().then(function(value){ 				
	        	pickupTime=value;
				console.log('pick up end time at header level '+pickupTime);
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				//expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndTime);
	        });
	        
        });
        
        done();
        });       
	});
	
	
	//BOPIS_009:Verify API order which contains PW dates validation like PWstartdate > PW end date	
	it("Verify the validation PWstartdate > PW end date_BOPIS_019", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
        var options = {
            method: 'POST',
            url: orderApi,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:  {
            	  "orders": [
            		    {
            		      "orderDate": "2020-02-23T16:40:02.057-05:00",
            		      "puchaseOrderNumber": order+2,
            		      "orderNumber": order+2,
            		      "migrationOrder": false,
            		      "carrierServiceType": "Ground",
            		      "originalOrderNumber": order+2,
            		      "status": "OPEN",
            		      "channel": "B2C",
            		      "pickupWindowStartTime": browser.params.pickupWindowEndTimeAPI,
            		      "pickupWindowEndTime": browser.params.pickupWindowStartTimeAPI,	   
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [      
            		          {
            		          "lineNumber": 1,
            		          "lineItemId": browser.params.searchValueSKU1,
            		          "itemTitle": browser.params.searchValueSKU1,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU1,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",     
            		          "fulfillmentSite": "sandiego-dc",         
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"

            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        },
            		         {
            		          "lineNumber": 2,
            		          "lineItemId": browser.params.searchValueSKU2,
            		          "itemTitle": browser.params.searchValueSKU2,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU2,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "2",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"
            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        }         
            		    ],
            		      "buyerContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "nameId": "Wendy Ziesemann",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },

            		      "billToContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },
            		      "shipToContacts": [
            		        {
            		          "firstName": "Wendy",
            		          "lastName": "Ziesemann",
            		          "name": "Wendy Ziesemann",
            		          "primaryEmail": "enspire@envistacorp.com",
            		          "primaryPhone": "246-898-3672",
            		          "companyName": "",
            		          "address": {
            		            "address1": "24 Green St",
            		            "address2": "",
            		            "city": "Hudson",
            		            "state": "MA",
            		            "zip5": "01749",
            		            "postalCode": "01749",
            		            "country": "US"
            		          }
            		        }
            		      ],
            		      "orderPayments": [
            		        {
            		          "status": "authorized",
            		          "transactionDate": "2020-04-14T00:00:00",
            		          "pnRef": "194201613302177334",
            		          "paymentType": "CREDIT_CARD",
            		          "nameOnCard": "SUJIT KUMAR SAHOO",
            		          "currency": "USD",
            		          "cardType": "VISA",
            		          "cardToken": "2000000000002629",
            		          "expirationYear": "20",
            		          "expirationMonth": "02",
            		          "maskedCardNumber": "2629",
            		          "authorizedAmount": 206,
            		          "authorized": true,
            		          "fullyCaptured": false,
            		           "chargeSequence" : 2,
            		            "refundSequence":2,
            		          "referenceData": [
    		                        {
    		                            "data": "oneORderTOKen",
    		                            "type": "String",
    		                            "value": "20000000000003783922"
    		                        }
            		          ],
            		          "orderPaymentTransactions": [
            		            {
            		              "transactionDate": "2020-04-14T00:00:00",
            		              "transactionType": "AUTHONLY",
            		              "transactionActualAmount": 206,
            		              "transactionAttemptedAmount": 206,
            		              "pnRef": "194201613302177334",
            		              "authorizedAmount": "206",
            		              "transactionExpirationDate": "2020-05-15T00:00:00",
            		              "referenceData": [],
            		              "paymentAccountDataToken": "2000000000002629",
            		              "nameOnCard": "SUJIT KUMAR SAHOO",
            		              "expirationDate": "0220",
            		              "maskedCardNumber": "2629",
            		              "error": false,
            		              "cardIssuerTrxId": "420161330217740135"
            		            }
            		          ]
            		        }
            		      ],
            		      "orderCharges": [],
            		      "orderDiscounts": [],
            		      "holds": [],
            		      "referenceData": [
            		        {
            		          "data": "CustomerID",
            		          "type": "String",
            		          "value": "000000001070"
            		        },
            		        {
            		          "data": "EmaMAPreferenceFlag",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "OrderUUID",
            		          "type": "String",
            		          "value": "664d76cfc0a8ed1d44f736565ed14700"
            		        },
            		        {
            		          "data": "SpeedFCShippingCode",
            		          "type": "String",
            		          "value": "SMRT"
            		        },
            		        {
            		          "data": "ORSOCode",
            		          "type": "String",
            		          "value": "0101"
            		        },
            		        {
            		          "data": "ORSOName",
            		          "type": "String",
            		          "value": "SFCC_DOMESTIC"
            		        },
            		        {
            		          "data": "ORSOType",
            		          "type": "String",
            		          "value": "SFCC"
            		        },
            		        {
            		          "data": "NoPayment",
            		          "type": "String",
            		          "value": "N"
            		        },
            		        {
            		          "data": "Expedite",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "CustomerOrderID",
            		          "type": "String",
            		          "value": "QAtest170620002"
            		        }
            		      ],
            		      "dataDomain": [
            		        "com.thk"
            		      ]
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
    		var orderStatus = response.body.orders[0].status;
    		console.log("the order status is "+orderStatus);
    		expect(orderStatus).toEqual("FAILED_TO_VALIDATE");		
    		expect(response.statusCode).toBe(200);		
    		    
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	
        	browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
            expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO VALIDATE"); 
        });
        done();
        });    
	});
	
	//BOPIS_010:Verify API order which contains Both Header& Line level Pickup Window dates 	
	it("Verify API order which contains Both Header& Line level Pickup Window dates_BOPIS_020", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
        var options = {
            method: 'POST',
            url: orderApi,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:  {
            	  "orders": [
            		    {
            		      "orderDate": "2020-02-23T16:40:02.057-05:00",
            		      "puchaseOrderNumber": order+3,
            		      "orderNumber": order+3,
            		      "migrationOrder": false,
            		      "carrierServiceType": "Ground",
            		      "originalOrderNumber": order+3,
            		      "status": "OPEN",
            		      "channel": "B2C",
            		      "pickupWindowStartTime": browser.params.pickupWindowStartTimeAPI,
            		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeAPI,	   
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [      
            		          {
            		          "lineNumber": 1,
            		          "lineItemId": browser.params.searchValueSKU1,
            		          "itemTitle": browser.params.searchValueSKU1,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU1,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",     
                 		      "pickupWindowStartTime": browser.params.pickupWindowStartTimeLineAPI,
                		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeLineAPI,	
            		          "fulfillmentSite": "sandiego-dc",         
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"

            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        },
            		         {
            		          "lineNumber": 2,
            		          "lineItemId": browser.params.searchValueSKU2,
            		          "itemTitle": browser.params.searchValueSKU2,
            		          "itemUnitPrice": 0,
            		          "itemDescription": browser.params.searchValueSKU2,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "2",
            		          "carrierServiceType": "LocalDelivery",		  
            				  "shippingCarrier":"SHIPT",
            		          "fulfillmentType": "pickupAtStore",
                 		      "pickupWindowStartTime": browser.params.pickupWindowStartTimeLineAPI,
                		      "pickupWindowEndTime": browser.params.pickupWindowEndTimeLineAPI,	
            		          "fulfillmentSite": "sandiego-dc",
            		          "presell": false,
            		          "references": [
            		            {
            		              "data": "UPC",
            		              "type": "String",
            		              "value": "850645008547"
            		            },
            		            {
            		              "data": "size",
            		              "type": "String",
            		              "value": "12 Cans"
            		            },
            		            {
            		              "data": "itemImageURL",
            		              "type": "String",
            		              "value": "https://www.gnc.com/dw/image/v2/BBLB_PRD/on/demandware.static/-/Sites-master-catalog-gnc/default/dw9161c170/hi-res/561335_web_Alani%20Nu%20Energy%20Rainbow%20Candy_Front_Box.jpg?sw=2000&sh=2000&sm=fit"
            		            }
            		          ],
            		          "shipToContact": {
            		            "firstName": "Wendy",
            		            "lastName": "Ziesemann",
            		            "name": "Wendy Ziesemann",
            		            "primaryEmail": "enspire@envistacorp.com",
            		            "primaryPhone": "6126126126",
            		            "companyName": "",
            		            "address": {
            		              "address1": "24 Green St",
            		              "address2": "",
            		              "city": "Hudson",
            		              "state": "MA",
            		              "zip5": "01749",
            		              "postalCode": "01749",
            		              "country": "US"
            		            }
            		          },
            		          "priceInfo": {
            		            "unitPrice": "0.005",
            		            "retailPrice": 0.005,
            		            "listPrice": 0.005
            		          },
            		          "lineTaxes": [
            		            {
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 0,
            		              "taxRate": 0.0
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.0,
            		              "originalChargeAmount": 0.0
            		            }
            		          ]
            		        }         
            		    ],
            		      "buyerContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "nameId": "Wendy Ziesemann",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },

            		      "billToContactInfo": {
            		        "firstName": "Wendy",
            		        "lastName": "Ziesemann",
            		        "name": "Wendy Ziesemann",
            		        "primaryEmail": "enspire@envistacorp.com",
            		        "primaryPhone": "6126126126",
            		        "companyName": "",
            		        "address": {
            		          "address1": "24 Green St",
            		          "address2": "",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "postalCode": "01749",
            		          "country": "US"
            		        }
            		      },
            		      "shipToContacts": [
            		        {
            		          "firstName": "Wendy",
            		          "lastName": "Ziesemann",
            		          "name": "Wendy Ziesemann",
            		          "primaryEmail": "enspire@envistacorp.com",
            		          "primaryPhone": "246-898-3672",
            		          "companyName": "",
            		          "address": {
            		            "address1": "24 Green St",
            		            "address2": "",
            		            "city": "Hudson",
            		            "state": "MA",
            		            "zip5": "01749",
            		            "postalCode": "01749",
            		            "country": "US"
            		          }
            		        }
            		      ],
            		      "orderPayments": [
            		        {
            		          "status": "authorized",
            		          "transactionDate": "2020-04-14T00:00:00",
            		          "pnRef": "194201613302177334",
            		          "paymentType": "CREDIT_CARD",
            		          "nameOnCard": "SUJIT KUMAR SAHOO",
            		          "currency": "USD",
            		          "cardType": "VISA",
            		          "cardToken": "2000000000002629",
            		          "expirationYear": "20",
            		          "expirationMonth": "02",
            		          "maskedCardNumber": "2629",
            		          "authorizedAmount": 206,
            		          "authorized": true,
            		          "fullyCaptured": false,
            		           "chargeSequence" : 2,
            		            "refundSequence":2,
            		          "referenceData": [
    		                        {
    		                            "data": "oneORderTOKen",
    		                            "type": "String",
    		                            "value": "20000000000003783922"
    		                        }
            		          ],
            		          "orderPaymentTransactions": [
            		            {
            		              "transactionDate": "2020-04-14T00:00:00",
            		              "transactionType": "AUTHONLY",
            		              "transactionActualAmount": 206,
            		              "transactionAttemptedAmount": 206,
            		              "pnRef": "194201613302177334",
            		              "authorizedAmount": "206",
            		              "transactionExpirationDate": "2020-05-15T00:00:00",
            		              "referenceData": [],
            		              "paymentAccountDataToken": "2000000000002629",
            		              "nameOnCard": "SUJIT KUMAR SAHOO",
            		              "expirationDate": "0220",
            		              "maskedCardNumber": "2629",
            		              "error": false,
            		              "cardIssuerTrxId": "420161330217740135"
            		            }
            		          ]
            		        }
            		      ],
            		      "orderCharges": [],
            		      "orderDiscounts": [],
            		      "holds": [],
            		      "referenceData": [
            		        {
            		          "data": "CustomerID",
            		          "type": "String",
            		          "value": "000000001070"
            		        },
            		        {
            		          "data": "EmaMAPreferenceFlag",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "OrderUUID",
            		          "type": "String",
            		          "value": "664d76cfc0a8ed1d44f736565ed14700"
            		        },
            		        {
            		          "data": "SpeedFCShippingCode",
            		          "type": "String",
            		          "value": "SMRT"
            		        },
            		        {
            		          "data": "ORSOCode",
            		          "type": "String",
            		          "value": "0101"
            		        },
            		        {
            		          "data": "ORSOName",
            		          "type": "String",
            		          "value": "SFCC_DOMESTIC"
            		        },
            		        {
            		          "data": "ORSOType",
            		          "type": "String",
            		          "value": "SFCC"
            		        },
            		        {
            		          "data": "NoPayment",
            		          "type": "String",
            		          "value": "N"
            		        },
            		        {
            		          "data": "Expedite",
            		          "type": "String",
            		          "value": "true"
            		        },
            		        {
            		          "data": "CustomerOrderID",
            		          "type": "String",
            		          "value": "QAtest170620002"
            		        }
            		      ],
            		      "dataDomain": [
            		        "com.thk"
            		      ]
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
    		var orderStatus = response.body.orders[0].status;
    		console.log("the order status is "+orderStatus);
    		expect(response.statusCode).toBe(200);		
    		   
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	
        	browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order      
 //Line Level Pick up details validation    		
    		callCenter.editLineGear("3");
    		callCenter.lineItemselectOptions("Edit Line");
    		BOPISSummary.lineLevelPickupStartDate(1).then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'MM/DD/YYYY');
				console.log('pick up start date at line level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeLineAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.lineLevelPickupEndDate(2).then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'MM/DD/YYYY');;
				console.log('pick up end date at line level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeLineAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.lineLevelPickupStartTime().then(function(value){ 				
	        	pickuptimeStart=value.substring(0, 5);
				pickupStartTime = util.convertTime(pickuptimeStart,'24hrs')
				console.log('pick up start time at line level after conversion '+pickupStartTime);
				//expect(browser.params.pickupWindowStartTimeLineAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.lineLevelPickupEndTime().then(function(value){ 				
	        	pickupTimeEnd=value.substring(0, 5);
				pickupEndTime = util.convertTime(pickupTimeEnd,'24hrs');
				console.log('pick up end time at line level after conversion '+pickupEndTime);
				//expect(browser.params.pickupWindowEndTimeLineAPI).toContain(pickupEndTime);
	        });
	        commons.cancel();
    		callCenter.editLineGear("4");
    		callCenter.lineItemselectOptions("Edit Line");
    		BOPISSummary.lineLevelPickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'MM/DD/YYYY');
				console.log('pick up start date at header level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeLineAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.lineLevelPickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'MM/DD/YYYY');;
				console.log('pick up end date at header level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeLineAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.lineLevelPickupStartTime().then(function(value){ 				
	        	pickuptime=value.substring(0, 5);
				console.log('pick up start time at header level '+pickuptime);
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				//expect(browser.params.pickupWindowStartTimeLineAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.lineLevelPickupEndTime().then(function(value){ 				
	        	pickupTime=value.substring(0, 5);
				console.log('pick up end time at header level '+pickupTime);
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				//expect(browser.params.pickupWindowEndTimeLineAPI).toContain(pickupEndTime);
	        });
	        commons.cancel();
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        BOPISSummary.fulfillmentTypeValidation(2).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 2 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	        
	        BOPISCreate.ShippingAddressCheck().then(function(value){
				data=value;
				expect(data).toBe(false);
			});
	        BOPISSummary.fulfillmentTypeValidation(1).then(function(value){ //fulfillment type at line 1				
	        	fulfillmentType=value;
				console.log('fulfillment type at line 1 '+fulfillmentType);
				expect(fulfillmentType).toEqual(browser.params.fulfillmentvalidation1);//fulfillment type checking at line 1
			});
	//Header Level Pick up details validation      
	        BOPISSummary.pickupStartDate().then(function(value){ 				
	        	pickupDate=value;
				pickupStartDate = util.convertDate(pickupDate,'YYYY-MM-DD');
				console.log('pick up start date at header level '+pickupStartDate);
				expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartDate);
				
			});
	        BOPISSummary.pickupEndDate().then(function(value){ 				
	        	pickupDate=value;
				pickupEndDate = util.convertDate(pickupDate,'YYYY-MM-DD');;
				console.log('pick up end date at header level '+pickupEndDate);
				expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndDate);
			});
	        BOPISSummary.pickupStartTime().then(function(value){ 				
	        	pickuptime=value;
				console.log('pick up start time at header level '+pickuptime);
				pickupStartTime = util.convertTime(pickuptime,'24hrs')
				//expect(browser.params.pickupWindowStartTimeAPI).toContain(pickupStartTime);
			});
	        BOPISSummary.pickupEndTime().then(function(value){ 				
	        	pickupTime=value;
				console.log('pick up end time at header level '+pickupTime);
				pickupEndTime = util.convertTime(pickupTime,'24hrs');
				//expect(browser.params.pickupWindowEndTimeAPI).toContain(pickupEndTime);
	        });
            
        });
        done();
        });     
	});

});

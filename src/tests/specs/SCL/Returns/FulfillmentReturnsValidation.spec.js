var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.RMANumber = "";
global.orderStatus = "";
global.SONumber = "";
global.RMAStatus = "";
global.discountAmount = "";
global.discountamountDisposition = "";
global.taxAmount = "";
global.taxamountDisposition = "";
global.unitprice = "";
global.unitpriceDisposition = "";

describe("Fulfillment return : ", function() {
  	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();

    it('Fulfillment filters Validation- TC0010', function(){
    	
    	 browser.get(FRReturnsUrl);
         browser.driver.manage().window().maximize();
     //total display validation    
         returnsSummary.totalResults().then(function (total) {
         	rslt = total.substring(0, 5);
         	totalresult = parseInt(rslt);
            console.log("The total results available are : "+totalresult);
            expect(totalresult).toBeGreaterThan(10668);

	            });
   //customer ID search      
         browser.sleep(1000);
         commons.searchWithCriteria('Customer ID', 'starts with',browser.params.customerId);
         expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);
         browser.refresh();
         
    //customer Name search      
         browser.sleep(1000);
         commons.searchWithCriteria('Customer Name', 'starts with',browser.params.custFirstName);
         expect(returnsSummary.FRReturnsSearchFilter()).toBe(true);  
         browser.refresh();
  //customer ID search for more than one customer and advanced criteria     
         browser.sleep(1000);
         commons.searchWithCriteria('Customer ID', 'contains',browser.params.customerId2);
         returnsSummary.selectAllResultFromListCheck();
         returnsSummary.advancedsearchClick();
         browser.sleep(1000);
        // expect(returnsSummary.advancedTabDetails()).toEqual(2);
         returnsSummary.deleteTheAdancedCriteria(2);
         commons.search();
         expect(returnsSummary.searchValidation(browser.params.advancesearchName)).toBe(false);
 
         /*   
        browser.sleep(3000);
        commons.searchWithCriteria('Customer ID', 'starts with',browser.params.customerId);
        browser.sleep(3000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(4000);
        commons.search();
        browser.sleep(3000);
    	returnsSummary.filteredCustomerCheck(browser.params.customerId).then(function (rslt) {
        	result= rslt;
            console.log("The available customer ID is: "+result);
            expect(result).toEqual("0000000580");

	            });
	   
       // expect(returnsSummary.filteredCustomerCheck(browser.params.customerId)).toBe(true);
	    browser.sleep(3000);       
		browser.get(FRReturnsUrl);
		browser.sleep(4000);
		commons.searchWithCriteria('Customer Name', 'starts with',browser.params.searchCustomer);
		browser.sleep(3000);
		returnsCreate.orderSelectForReturnClick();
		browser.sleep(4000);
		commons.search();
        returnsSummary.filteredCustomerCheck(browser.params.searchCustomer).then(function (rslt) {
        	result= rslt;
            console.log("The available customer name is  : "+result);
            expect(result).toEqual("ALICE JOHN");

	           });
        
		
        //expect(returnsSummary.filteredCustomerCheck(browser.params.searchCustomer)).toBe(true);		
        browser.sleep(3000);
        */ 
    	
    }) 
    
    it('Fulfillment disposition Validation- TC0011', function(){
    	
    	browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("4");
        callCenter.editLinePopUpSaveBtn();
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("25.99");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(3000);
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
        browser.sleep(2000);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        browser.sleep(2000)
        callCenter.applyDiscount("Percentage", "7", "EmployeeDiscount", "desc1","notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(2000);
        callCenter.editLinePopUpSaveBtn();
        browser.sleep(3000);
        callCenter.amtFromBilledDetails("Tax:").then(function (value) {
            taxText = value;
            res = taxText.substring(1, 6);
            taxAmount = parseFloat(res);
            console.log(taxAmount);
        });
        returnsEdit.amtFromdispositionDetails("Discount:").then(function (value) {    
            discountText = value;
            res = discountText.substring(2, 6);
            discountAmount = parseFloat(res);
            console.log(discountAmount);
        });
        
        salesOrderCreate.getSalesOrderUnitPrice().then(function (value) {    
            unitpriceText = value;
            res = unitpriceText.substring(1, 6);
            unitprice = parseFloat(res);
            console.log(unitprice);
        });
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        //!*********fulfillment request**********!//
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
            console.log("the sale sorder is "+SONumber)
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            callCenter.shipAccountselect(browser.params.shipaccount);
            browser.sleep(2000);
            callCenter.packageSelection(browser.params.packageValue);
            browser.sleep(1000);
            callCenter.packageTrackingNumber(1236547890);
            browser.sleep(2000);
            callCenter.enterItemQty("4");
          //  callCenter.unselectPkg();
            browser.sleep(2000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(5000);
            salesOrderSummary.viewShipmentVisibility();
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(3000);
           // expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);	                    	
        })
        /***Fulfillment returns****/
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        console.log("the sale sorder # in returns screen "+SONumber);
        commons.searchWithCriteria('Order #', 'ends with', SONumber);
        browser.sleep(2000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(2000);
        commons.search();
        browser.sleep(3000);
        returnsCreate.orderSelectForReturnCheckBox();
        browser.sleep(3000);
        returnsCreate.OrderSelectionButtonCartIcon();
        browser.sleep(2000);
        returnsCreate.EditLine();
        browser.sleep(2000);
        returnsCreate.addFRDisposition();
        browser.sleep(2000);
        commons.save();
  //without any details      
        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);	                    	
        expect(returnsCreate.noDispositionReasonError(2)).toBe(true);
       
  //with qty but no reason
        browser.sleep(1000);
        returnsCreate.addFRDisposition();
        browser.sleep(1000);
        returnsCreate.linedispositionreasonValidation(1, "this is a test");
        browser.sleep(2000);
        commons.save();
        browser.sleep(1000);
        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
        browser.sleep(1000);
  //with reason but no qty
        returnsCreate.clearQTy();
        browser.sleep(1000);
        returnsCreate.linedispositionNoQTYValidation("DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(1000);
        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
        browser.sleep(1000);
     //0 QTY
        browser.sleep(1000);
        returnsCreate.linedispositionDetails(0,"DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(1000);
        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
        browser.sleep(1000);
     //-ve QTY
        returnsCreate.clearQTy();
        browser.sleep(1000);
        returnsCreate.linedispositionDetails(-2,"DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(1000);
        expect(returnsCreate.noDispositionqtyError(1)).toBe(true);
        browser.sleep(1000);
        
    //more than available qty  
        returnsCreate.clearQTy();
        browser.sleep(2000);
        returnsCreate.linedispositionDetails(100,"DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(1000);
        expect(returnsCreate.noDispositionReasonError(1)).toBe(true);
        browser.sleep(1000);
        
    //disposition presence checking
        returnsCreate.clearQTy();
        browser.sleep(1000);
        returnsCreate.linedispositionDetails(4,"DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(3000);
        returnsCreate.RMASubmit();
        browser.sleep(2000);    
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        console.log("the sale sorder # in returns screen "+SONumber);
        commons.searchWithCriteria('Order #', 'ends with', SONumber);
        browser.sleep(2000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        returnsCreate.orderSelectForReturnCheckBox();
        browser.sleep(2000);
        returnsCreate.OrderSelectionButtonCartIcon();
        browser.sleep(2000);
        returnsCreate.EditLine();
        browser.sleep(2000);
        expect(returnsEdit.FRDispositionAvailability()).toBe(true);  
       
        });
        
        
    //trying to create RMA for already a returned full order.    
    	     browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        console.log("the sale sorder # in returns screen "+SONumber);
        commons.searchWithCriteria('Order #', 'ends with', SONumber);
        browser.sleep(2000);
        returnsCreate.orderSelectForReturnClick();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        returnsCreate.orderSelectForReturnCheckBox();
        browser.sleep(2000);
        returnsCreate.OrderSelectionButtonCartIcon();     
        browser.sleep(2000);
       // expect(returnsEdit.FRReturnsShippedQTY()).toEqual(returnsEdit.FRReturnsDispositionQTY());  
        browser.sleep(2000);
        returnsCreate.EditLine();
        browser.sleep(2000);
        returnsCreate.addFRDisposition();
        browser.sleep(2000);
        returnsCreate.linedispositionDetails(4,"DAMAGED", "this is a test");
        browser.sleep(1000);
        commons.save();
        browser.sleep(3000);
        returnsCreate.RMASubmit();
        expect(returnsEdit.AlertPresence()).toBe(true);  

        });
        
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {
        	browser.get(paymentDispositionUrl);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
            browser.sleep(5000);       
            returnsEdit.selectRMALineClickForReceive();//clicking on the selected order at payment disposition screen.
            browser.sleep(3000);
  //getting the tax Amount
            returnsEdit.amtFromdispositionDetails("Tax").then(function (value) {
                taxvalue = value;
                res = taxvalue.substring(1, 4);
                taxamountDisposition = parseFloat(res);
                console.log("Tax at payment disposition is "+taxamountDisposition);
                expect(taxamountDisposition).toEqual(taxAmount);

            });
            
 //getting the discount Amount
            returnsEdit.amtFromdispositionDetails("Discount Price:").then(function (value) {
                disvalue = value;
                res = disvalue.substring(2, 6);
                discountamountDisposition = parseFloat(res);
                console.log("Discount at payment disposition is "+discountamountDisposition);
                expect(discountamountDisposition).toEqual(discountAmount);

            });
    
  //getting the tax Amount
            returnsEdit.amtFromdispositionDetails("Unit Price").then(function (value) {
                unitvalue = value;
                res = unitvalue.substring(1, 6);
                unitpriceDisposition = parseFloat(res);
                console.log("Unit price at payment disposition is "+unitpriceDisposition);
                expect(unitpriceDisposition).toEqual(unitprice);
            });
            
   //updating the amount in the payment disposition
         /*   
            browser.sleep(1000);
            returnsEdit.unitPriceUpateinPaymentdisposition(20);
           */ 
 //notes in the payment disposition
            browser.sleep(2000);
            returnsCreate.addPaymentDispositionNotes("this is a test disposition");
            browser.sleep(2000);
            
  // Available credit types in Payment disposition
            browser.sleep(2000);
            returnsCreate.paymentDispositionCreditTypes().then(function (values) {
            	types=values;
                console.log("Credit types are" +types);
                expect(types).toEqual(['','STORE CREDIT','REFUND','CASH','GIFT CARD']);
            });
            browser.sleep(2000);
            returnsCreate.refundtype(browser.params.refundMethod);
            browser.sleep(2000)
            commons.save();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsCreate.paymentDispositionSubmit();
            browser.sleep(2000);    
        	
        });
        
        browser.wait(function () {
            return RMANumber!= '';
        }).then( function () {
        browser.get(paymentDispositionUrl);
    	browser.sleep(3000);
        salesOrderSummary.salesOrderSearch("RMA Number", RMANumber);
        browser.sleep(3000);
        returnsCreate.RMAStatus().then(function (status) {
        	paymentDispositionStatus = status;
                console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
                expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");

            });
	        browser.sleep(2000);
            returnsEdit.selectRMALineClickForReceive();//clicking on the selected order at payment disposition screen.
            browser.sleep(1000);
	        returnsCreate.viewPaymentDispositionNotes().then(function (value) {
	            note = value;
	            console.log(note);
	           // expect(note).toEqual("this is a test disposition");
	            browser.sleep(2000);
	            returnsCreate.notesCancel();
	        });
	        
        
        });
    })
 
})
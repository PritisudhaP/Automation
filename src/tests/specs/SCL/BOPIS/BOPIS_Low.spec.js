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
global.EventCountBefore= "";
global.EventCountAfter= "";


describe("BOPIS Low Level Test Cases: ", function() {
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

	it("customer rejects pure BOPIS order FR at store portal and the cancellation event should  have 'cancelledLineItems' BOPIS_001", function() {
		utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
		console.log("Folder cleared successfully");
		browser.get(eventSubscription);
		BOPISCreate.eventSubscriptonData().then(function (value) {
		    data = value;
		    console.log("the Subscription data are "+data); 
		    BOPISCreate.eventSubscribedOrNot(data).then(function (value) { //checking whether the event is active or not
		    var status = value;
		    console.log("the checked status "+status);
		    BOPISCreate.eventSubscriptonEnable(data,browser.params.eventSubscriptonKey,browser.params.eventSubscriptonValue,status);//updating the event
		    });
		});
		browser.sleep(500);
		BOPISCreate.mailBoxIcon();		
	   	BOPISCreate.otherMailBox();
	   	BOPISCreate.mailSearch(browser.params.eventSubscriptonValue);
	    BOPISCreate.totalCancelledEventCount().then(function (status) {
	    	EventCountBefore = parseInt(status);
			console.log("the total cancelled events before order cancel is: "+EventCountBefore);
			
  		});
	    browser.sleep(500);
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
    	 callCenter.page("The Ultimate Store Portal");
    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("PENDING"); //checking the status of the order before accepting 
    		});
		     BOPISCreate.lineSelect(1);
		     BOPISCreate.ultimateStorePortalHeader("Fulfill Order");
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
	    
		    browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
	    
	    	 callCenter.fullFillmentPage();
	    	 callCenter.page("The Ultimate Store Portal");
	    	 commons.searchWithCriteria("Order #","ends with",SONumber);
	    	 BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				browser.sleep(2000);
				expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP"); //checking the status of the order before accepting 
			 });
		     BOPISCreate.lineSelect(1);
		     BOPISCreate.ultimateStorePortalCancelHeader();
		     BOPISCreate.ultimateStorePortalHeader("Full Cancel");
	   	  	 BOPISCreate.BOPISReject(browser.params.rejectReason1,browser.params.rejectComments);
	   	  	 BOPISCreate.confirmButton();
		   	 BOPISCreate.storePortalItemLine(5,1).then(function (status) {
	 			orderStatus = status;
				console.log("the pickup window status is: "+orderStatus);
				expect(orderStatus).toEqual("CANCELLED"); //checking the status of the order before accepting 
	  		});
		   	BOPISCreate.mailBoxIcon();
		   	BOPISCreate.otherMailBox();
		   	BOPISCreate.mailSearch(browser.params.eventSubscriptonValue);
		   	browser.sleep(2000);
		    BOPISCreate.totalCancelledEventCount().then(function (status) {
	        	EventCountAfter = parseInt(status);
				console.log("the total cancelled events after order cancel is: "+EventCountAfter);
				expect(EventCountAfter).toEqual((EventCountBefore+1)); //checking the events counts for cancelled orders
				
	  		});
		   	BOPISCreate.cancelEventClick();
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        BOPISCreate.lineSelect(1);
	        BOPISCreate.eventCancelledLineClick();
	        BOPISCreate.eventCancelJSONDownload();
	        BOPISCreate.cancelledOrderId().then(function (status) {
	 			orderId = status.substring(15).trim();
				console.log("the OrderId  is: "+orderId);
				expect(orderId).toEqual(SONumber); //checking the cancelled orderID

	  		});
		    });
	        browser.wait(function () {
		        return SONumber != '';
		    }).then(function () {
		    	browser.sleep(5000);
	    		var filename=util.getFileName(browser.params.labelPath,"ORDER_CANCELLED",SONumber);//getting the file name
	    		console.log("the file name is "+filename);
				expect(util.foundFile(browser.params.labelPath)).toBe(true);//checking whether the file download is success or not

		});
	    
	});
	
	
	it("Geting the Event count_002", function() {
		
		browser.get(eventSubscription);
		BOPISCreate.eventSubscriptonData().then(function (value) {
		    data = value;
		    console.log("the Subscription data are "+data); 
		    BOPISCreate.eventSubscribedOrNot(data).then(function (value) { //checking whether the event is active or not
		    var status = value;
		    console.log("the checked status "+status);
		    BOPISCreate.eventSubscriptonEnable(data,browser.params.eventSubscriptonKey,browser.params.eventSubscriptonValue,status);//updating the event
		    });
		});
		browser.sleep(500);
		BOPISCreate.mailBoxIcon();		
	   	BOPISCreate.otherMailBox();
	   	BOPISCreate.mailSearch(browser.params.eventSubscriptonValue);
	    BOPISCreate.totalCancelledEventCount().then(function (status) {
	    	EventCountBefore = parseInt(status);
			console.log("the total cancelled events before order cancel is: "+EventCountBefore);
		});
	    browser.sleep(500);
	});
	
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

	it("BOPIS auto cancel after FR expires and cancellation event doesn't have 'cancelledLineItems'_BOPIS_003", done =>{
		
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
            		      "pickupWindowStartTime": "2021-10-18T14:30:15-05:00[America/Chicago]",
            		      "pickupWindowEndTime": "2021-10-18T19:30:15-05:00[America/Chicago]",	   
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
                 		      "pickupWindowStartTime": "2021-10-18T14:30:15-05:00[America/Chicago]",
                		      "pickupWindowEndTime": "2021-10-18T19:30:15-05:00[America/Chicago]",	
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
            browser.sleep(1000);
 	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	       
            
        });
        done();
        });     
	});
	
	
});
	
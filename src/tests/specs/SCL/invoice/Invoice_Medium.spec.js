const apiResource = require("protractor-api-resource").ProtractorApiResource;
var moment = require('moment');
var request = require('request');

var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var util = require(process.cwd() + '/src/tests/screens/Utilities/util.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var invoiceSummaryScreen = require(process.cwd() + '/src/tests/screens/invoice/invoice.summary.screen.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var NowMoment = moment();
var order = NowMoment.format('YYYY-MM-DDHHmmss');
global.bodytext = "";
global.SONumber="";
global.unitPrice1="";
global.linePrice1="";
global.discount1="";
global.shippingAndHandling1="";
global.salesTax1="";
global.shippingTax1="";
global.total1="";
global.unitPrice2="";
global.linePrice2="";
global.discount2="";
global.shippingAndHandling2="";
global.salesTax2="";
global.shippingTax2="";
global.total2="";
global.salesOrderGrandTotal="";

global.invoiceunitPrice1 = "";
global.invoicediscount1 = "";
global.total1 = "";
global.invoiceunitPrice2 ="";
global.invoicediscount2 = "";
global.total2="";
global.invoicesalesTax1 = "";
global.totalwithTax1 = "";
global.invoicesalesTax2="";
global.totalwithTax2="";
global.shipping1="";
global.shipping2="";
global.handling1="";
global.handling2="";
global.grandtotal1="";
global.grandtotal2="";
global.grandtotal="";
global.orderTotal="";
global.orderDiscount="";
global.orderSAndH="";
global.orderSalesTax="";
global.orderShippingTax="";
global.invoiceTotal="";
global.invoiceDiscount="";
global.invoiceShipping="";
global.invoiceHandling="";
global.invoiceTax="";

global.orderCarrier="";
global.orderService="";
global.orderTracking="";
global.orderSiteType="";
global.orderSiteName="";
global.orderBOPISCarrier="";
global.orderBOPISTracking="";
global.orderBOPISSite="";

global.invoiceCarrier="";
global.invoiceService="";
global.invoiceTracking="";
global.invoiceSiteType="";
global.invoiceSiteName="";

global.INVNumber1= "";
global.INVNumber2="";
global.FRNumber1= "";
global.FRNumber2="";
var FRNumbers=[];
global.reshipSONumber="";
global.lockid="";
global.authCode="";
global.data="";
global.txnId="";
global.authCode="";


describe( "Invoice_Medium", function () {
	
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
	utils.Login(browser.params.login.user,browser.params.login.password);
	
	
	 it("Gift_Card_balance_inquiry_TC0018", done =>{
			
	    	data = browser.params.data;		
	        var options = {
	            method: 'POST',
	            url: 'https://ecommgiftcard-tc.azurewebsites.net/phoenix/fdr/balance-inquiry-multi-lock',
	            headers: {
	                'Content-Type': 'application/json',
	                'Authorization': 'Bearer '+token
	            },
	            body: {
	            	  "amount": browser.params.giftcardAmount,
	            	  "cardNumber": browser.params.giftcardNumber,
	            	  "transactionId": data,
	            	  "sourceCode":"web",
	            	  "pin":browser.params.giftcardPin
	            }
	        };        
	        options.json = true;
	        console.log("token from token generation is "+options.headers.Authorization);
	        request(options, function (error, response, body) {
	    		var errors = error;
	    		console.log('error:', + error);
	    		console.log('statusCode:', response && response.statusCode);
	    		console.log('body:', body);
	    		lockid=response.body.lockId;
	    		console.log("The lockId  is "+lockid);
	    		expect(response.statusCode).toBe(200);		
	    		done();
	        });   
		}),
		
		it("Gift_card_Redemption_TC0019", done =>{	
			
	    	txnId = browser.params.txnId;
			
	        var options = {
	            method: 'POST',
	            url: 'https://ecommgiftcard-tc.azurewebsites.net/phoenix/fdr/redemption-unlock',
	            headers: {
	                'Content-Type': 'application/json',
	                'Authorization': 'Bearer '+token
	            },
	            body: { 
	            	"transactionId":txnId,
	            	"cardNumber":browser.params.giftcardNumber,
	            	"sourceCode":"web",
	            	"pin":browser.params.giftcardPin,
	            	"amount":browser.params.giftcardAmount,
	            	"lockId": lockid
	            }
	        };        
	        options.json = true;
	        console.log("token from token generation is "+options.headers.Authorization);
	        request(options, function (error, response, body) {
	    		var errors = error;
	    		console.log('error:', + error);
	    		console.log('statusCode:', response && response.statusCode);
	    		console.log('body:', body);
	    		authCode=response.body.authCode;
	    		console.log("The Auth code is "+authCode);
	    		expect(response.statusCode).toBe(200);		
	    		
		        browser.wait(function () {
		            return authCode != '';
		        }).then(function () {
			        //utils.Login(browser.params.login.user,browser.params.login.password);
			    	browser.get(scriptUrl);
			        commons.searchWithCriteria('Name', 'starts with', 'orderPaymentEventListenerBeforeSave');
			        utils.status(3,1).then(function (value) {
						savedStatus = value;
					    console.log("the status is "+savedStatus);	
					    util.ScriptUpdate(savedStatus);
					});	
			        browser.refresh();
			        commons.searchWithCriteria('Name', 'starts with', 'orderPaymentListenerBeforeSave');
			        utils.status(3,1).then(function (value) {
						savedStatus = value;
					    console.log("the status is "+savedStatus);	
					    util.ScriptUpdate(savedStatus);
					});
			        browser.sleep(1500);   
		        });
		        done();
	        });   
		}),
		
		it("Invoice_Creation_Using_Gift_Card_TC0020", done =>{

	        var options = {
	            method: 'POST',
	            url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
	            headers: {
	                'Content-Type': 'application/json',
	                'Authorization': 'Bearer '+token
	            },
	            body:  { 
	            	  "orders": [
	            		    {
	            		      "orderDate": browser.params.purchaseDate,
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
	            		          "itemUnitPrice": 3,
	            		          "itemDescription": browser.params.searchValueSKU1,
	            		          "lineItemQty": 2,
	            		          "status": "OPEN",
	            		          "originalOrderedQty": 2,
	            		          "carrierServiceType": "Ground",
	            		          "fulfillmentType": "Ship To Customer",
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
	            		          "shipToContact":{ 
	            		                  "firstName":"WENDY",
	            		                  "lastName":"ZIESEMANN",
	            		                  "address":{ 
	            		                     "address1":"24 Green St",
	            		                     "city":"Hudson",
	            		                     "state":"MA",
	            		                     "zip5":"01749",
	            		                     "country":"US"
	            		                  },
	            		                  "primaryEmail":"wendyziesemann01749@thk.com",
	            		                  "primaryPhone":"(000) 000-0423"
	            		               },
	            		          "priceInfo": {
	            		            "unitPrice": "30",
	            		            "retailPrice": 30,
	            		            "listPrice": 30
	            		          },
	            		          "lineTaxes": [
	            		            {
	            		              "taxName": "SALES_TAX",
	            		              "taxAmount": 1.00,
	            		              "taxRate": 0.50
	            		            }
	            		          ],
	            		          "lineCharges": [
	            		            {
	            		              "chargeCategory": "SHIPPING",
	            		              "chargeName": "SHIPPING",
	            		              "chargeAmount": 1.0,
	            		              "originalChargeAmount": 1.0
	            		            }
	            		          ],
	            		          "lineDiscounts": [
	            		            {
	            		              "discountAmount": 2.00,
	            		              "discountName": "ORDER_DISCOUNT",
	            		              "originalDiscountAmount": 0.50,
	            		              "description": "10 Percent Off",
	            		              "promo": {
	            		                "promoId": "10%OFF",
	            		                "promoType": "OrderDisc",
	            		                "promoGroup": "OrderDisc"
	            		              },
	            		              "notes": [
	            		                {
	            		                  "noteType": "INFO",
	            		                  "noteText": "SAVE10"
	            		                }
	            		              ]
	            		            }
	            		          ]
	            		        },
	            		         {
	            		          "lineNumber": 2,
	            		          "lineItemId": browser.params.searchValueSKU2,
	            		          "itemTitle": browser.params.searchValueSKU2,
	            		          "itemUnitPrice": 7,
	            		          "itemDescription": browser.params.searchValueSKU2,
	            		          "lineItemQty": 2,
	            		          "status": "OPEN",
	            		          "originalOrderedQty": 2,
	            		          "carrierServiceType": "Ground",
	            		          "fulfillmentType": "Ship To Customer",
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
	            		        "shipToContact":{ 
	            		                  "firstName":"WENDY",
	            		                  "lastName":"ZIESEMANN",
	            		                  "address":{ 
	            		                     "address1":"24 Green St",
	            		                     "city":"Hudson",
	            		                     "state":"MA",
	            		                     "zip5":"01749",
	            		                     "country":"US"
	            		                  },
	            		                  "primaryEmail":"wendyziesemann01749@thk.com",
	            		                  "primaryPhone":"(000) 000-0423"
	            		               },
	            		          "priceInfo": {
	            		            "unitPrice": "30",
	            		            "retailPrice": 30,
	            		            "listPrice": 30
	            		          },
	            		          "lineTaxes": [
	            		            {
	            		              "taxName": "SALES_TAX",
	            		              "taxAmount": 1.00,
	            		              "taxRate": 1.10
	            		            }
	            		          ],
	            		          "lineCharges": [
	            		            {
	            		              "chargeCategory": "SHIPPING",
	            		              "chargeName": "SHIPPING",
	            		              "chargeAmount": 1.00,
	            		              "originalChargeAmount": 0.90
	            		            }
	            		          ],
	            		          "lineDiscounts": [
	            		            {
	            		              "discountAmount": 2,
	            		              "discountName": "ORDER_DISCOUNT",
	            		              "originalDiscountAmount": 2,
	            		              "description": "10 Percent Off",
	            		              "promo": {
	            		                "promoId": "10%OFF",
	            		                "promoType": "OrderDisc",
	            		                "promoGroup": "OrderDisc"
	            		              },
	            		              "notes": [
	            		                {
	            		                  "noteType": "INFO",
	            		                  "noteText": "SAVE10"
	            		                }
	            		              ]
	            		            }
	            		          ]
	            		        }
	            		      ],
	            		      "buyerContactInfo": 
	            		      { 
				                  "firstName":"WENDY",
				                  "lastName":"ZIESEMANN",
				                  "address":{ 
				                     "address1":"24 Green St",
				                     "city":"Hudson",
				                     "state":"MA",
				                     "zip5":"01749",
				                     "country":"US"
				                  },
				                  "primaryEmail":"wendyziesemann01749@thk.com",
				                  "primaryPhone":"(000) 000-0423"
	    		               },
	            		      "billToContactInfo": {
	    		                  "firstName":"WENDY",
	    		                  "lastName":"ZIESEMANN",
	    		                  "address":{ 
	    		                     "address1":"24 Green St",
	    		                     "city":"Hudson",
	    		                     "state":"MA",
	    		                     "zip5":"01749",
	    		                     "country":"US"
	    		                  },
	    		                  "primaryEmail":"wendyziesemann01749@thk.com",
	    		                  "primaryPhone":"(000) 000-0423"
	    		               },
	            		      "shipToContacts": [
	            		       {
	    		                  "firstName":"WENDY",
	    		                  "lastName":"ZIESEMANN",
	    		                  "address":{ 
	    		                     "address1":"24 Green St",
	    		                     "city":"Hudson",
	    		                     "state":"MA",
	    		                     "zip5":"01749",
	    		                     "country":"US"
	    		                  },
	    		                  "primaryEmail":"wendyziesemann01749@thk.com",
	    		                  "primaryPhone":"(000) 000-0423"
	    		               }
	    		               ],
	            		      "orderPayments":
	            		      [
	    		                {
	    		                    "status": "authorized",
	    		                    "maskedCardNumber": browser.params.giftcardNumber,
	    		                    "transactionDate": "2020-03-07T03:23:49",
	    		                    "paymentType": "GIFT_CARD",
	    		                    "currency": "USD",
	    		                    "cardToken": browser.params.giftcardNumber,
	    		                    "pnRef":txnId,
	    		                    "expirationYear": "23",
	    		                    "expirationMonth": "05",
	    		                    "referenceData": [
	    		                        {
	    		                            "data": "giftCardNumber",
	    		                            "type": "string",
	    		                            "value": browser.params.giftcardNumber
	    		                        }, {
	    		                            "data": "giftCardPin",
	    		                            "type": "string",
	    		                            "value": browser.params.giftcardPin
	    		                        }, {
	    		                            "data": "orderRequestID",
	    		                            "type": "string",
	    		                            "value": txnId
	    		                        }
	    		                    ],
	    		                    "orderPaymentTransactions": [
	    		                        {
	    		                            "transactionDate": "2020-03-07T03:23:49",
	    		                            "transactionType": "SALE",
	    		                            "transactionActualAmount": 20.00,
	    		                            "transactionAttemptedAmount": 20.00,
	    		                            "authorizedAmount": "20.00",
	    		                            "transactionExpirationDate": "2020-04-06T03:23:49",
	    		                            "pnRef":txnId,
	    		                            
	    		                            "referenceData": [
	    		                                {
	    		                                    "data": "giftCardTransactionId",
	    		                                    "type": "string",
	    		                                    "value": txnId
	    		                                }, {
	    		                                    "data": "authcode",
	    		                                    "type": "string",
	    		                                    "value": authCode
	    		                                }, {
	    		                                    "data": "giftCardLockId",
	    		                                    "type": "string",
	    		                                    "value": "1"
	    		                                }, {
	    		                                    "data": "orderRequestID",
	    		                                    "type": "string",
	    		                                    "value": txnId
	    		                                },
	    		                                {
	    		                                "data": "giftCardPin",
	    		                                    "type": "string",
	    		                                    "value": browser.params.giftcardPin 
	    		                                }
	    		                            ]
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
	            		          "value": "O0004342"
	            		        },
	            		        {
	            		          "data": "EmailPreferenceFlag",
	            		          "type": "String",
	            		          "value": "true"
	            		        },
	            		        {
	            		          "data": "OrderUUID",
	            		          "type": "String",
	            		          "value": "664d76cfc0a8ed1d44f736565ed14777"
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
	            		          "value": order+1
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
	    		done();
	        });
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	
	        	//utils.Login(browser.params.login.user,browser.params.login.password);
	        	browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	            browser.sleep(2000);
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
	        	
		        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
	        		unitPrice1=parseFloat(value.substring(1));
	        		console.log("the Unit price is "+unitPrice1);
	        		
	        	});
	        	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
	        		linePrice1=parseFloat(value.substring(1));
	        		console.log("total Line Price is "+linePrice1);
	        		
	        	});
	        	salesOrderSummary.lineamount("Discount:",1).then(function(value){
	        		discount1=parseFloat(value.substring(2,6));
	        		console.log("The Total discount is  "+discount1);
	        		
	        	});
	        	salesOrderSummary.lineamount("S & H:",1).then(function(value){
	        		shippingAndHandling1=parseFloat(value.substring(1));
	        		console.log("Total shipping and handling charge is "+shippingAndHandling1);
	        		
	        	});
	        	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
	        		salesTax1=parseFloat(value.substring(1));
	        		console.log("The total Sales Tax is "+salesTax1);
	        		
	        	});        	
	        	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
	        		shippingTax1=parseFloat(value.substring(1));
	        		console.log("The Shipping Tax is "+shippingTax1);
	        		
	        	});
	        	
	        	salesOrderSummary.Totalamount("Total:",1).then(function(value){
	        		ordertotal1=parseFloat(value.substring(1));
	        		console.log("The line1 total is "+ordertotal1);
	        		
	        	});
	        	
	        	
	//line 2        	
	        	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
	        		unitPrice2=parseFloat(value.substring(1));
	        		console.log("the Unit price in line 2 is "+unitPrice2);
	        		
	        	});
	        	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
	        		linePrice2=parseFloat(value.substring(1));
	        		console.log("total Line Price in line 2 is "+linePrice2);
	        		
	        	});
	        	salesOrderSummary.lineamount("Discount:",2).then(function(value){
	        		discount2=parseFloat(value.substring(2,6));
	        		console.log("The Total discount in line 2 is  "+discount2);
	        		
	        	});
	        	salesOrderSummary.lineamount("S & H:",2).then(function(value){
	        		shippingAndHandling2=parseFloat(value.substring(1));
	        		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
	        		
	        	});
	        	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
	        		salesTax2=parseFloat(value.substring(1));
	        		console.log("The total Sales Tax in line 2 is "+salesTax2);
	        		
	        	});        	
	        	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
	        		shippingTax2=parseFloat(value.substring(1));
	        		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
	        		
	        	});
	        	
	        	salesOrderSummary.Totalamount("Total:",2).then(function(value){
	        		ordertotal2=parseFloat(value.substring(1));
	        		console.log("The line1 total is "+ordertotal2);
	        		
	        		salesOrderGrandTotal=parseFloat(total1+total2);
	        	});
	        	
	//Order level values
	        	
	        	salesOrderSummary.orderAmount("Total",4).then(function(value){
	        		orderTotal=parseFloat(value.substring(1));
	        		console.log("the Order total is "+orderTotal);
	        	});

	        	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
	        		orderDiscount=parseFloat(value.substring(2,6));
	        		console.log("The Total discount at order level is  "+orderDiscount);
	        	});
	        	
	        	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
	        		orderSAndH=parseFloat(value.substring(1));
	        		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
	        	});
	        	
	        	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
	        		orderSalesTax=parseFloat(value.substring(1));
	        		console.log("The total Sales Tax at order level is "+orderSalesTax);
	        		
	        	});     
	        	
	        	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
	        		orderShippingTax=parseFloat(value.substring(1));
	        		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
	        	});
	        	
	        	salesOrderSummary.orderAmount("Paid:",1).then(function(value){
	        		paidAmount=parseFloat(value.substring(2,7));
	        		console.log("The Gift Card paid Amount is "+paidAmount);
	        		expect(paidAmount).toEqual(parseFloat(browser.params.giftcardAmount));
	        	});
	        	
	        });
		        //!*********fulfillment request**********!//
		        browser.wait(function () {
		            return SONumber != '';
		        	}).then( function () {
			        callCenter.fullFillmentPage();
			        callCenter.page("Fulfillment Requests");
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            callCenter.fulfillmentOrderSelectGear("Create Shipment");
		            browser.sleep(1000);
		            callCenter.shipAccountselect(browser.params.shipaccount);
		            callCenter.packageSelection(browser.params.packageValue);
		            callCenter.packageTrackingNumber(1236547890);
		            returnsCreate.multiplePackages("1","2");
		            returnsCreate.multiplePackages("3","2");	            
		            callCenter.unselectPkg();
		            callCenter.addPackageToShipment();
		            callCenter.finalizeShipment();
		            browser.sleep(5000);
		            salesOrderSummary.viewShipmentVisibility();
		            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
		            browser.sleep(1500);
		            callCenter.shipmentChangeStatusConfimation();
		            browser.sleep(1000);
		            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
		            browser.get(routeUrl);
		            commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
		            utils.status(5,1).then(function (value) {
						savedStatus = value;
					    console.log("the route status is "+savedStatus);	
					    returnsCreate.startingReturnInvoiceRoute(savedStatus,2);
					});	
		            expect(utils.status(5,1)).toEqual("STARTED");
		            browser.sleep(4000);    
	        	});
		        browser.wait(function () {
	                return SONumber != '';
	            }).then(function () {
	            	browser.get(callCenterSalesOrdersListUrl);
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	                salesOrderSummary.salesOrderStatus().then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	              });
	                callCenter.OrdersPage();
			        callCenter.page("Invoices");
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
	                salesOrderSummary.invoiceSelect();
	                salesOrderSummary.invoiceamount("price",2).then(function (status) {
	                	invoiceunitPrice1=parseFloat(status.substring(1));
	                	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
	                	expect(invoiceunitPrice1).toEqual(unitPrice1)
	                });            
	                salesOrderSummary.invoiceamount("price",3).then(function (status) {
	                	invoicediscount1=parseFloat(status.substring(1));
	                	console.log("Discount for line1 in invoice "+invoicediscount1);
	                	expect(invoicediscount1).toEqual(discount1);
	                });
	                salesOrderSummary.invoiceamount("price",4).then(function (status) {
	                	total1=parseFloat(status.substring(1));
	                	console.log("total after discount is "+total1);
	                	expect(total1).toEqual((linePrice1-discount1));
	                	
	                });
	                
	                salesOrderSummary.invoiceamount("price",8).then(function (status) {
	                	invoiceunitPrice2=parseFloat(status.substring(1));
	                	console.log("unit price for line2 in invoice "+invoiceunitPrice2);
	                	expect(invoiceunitPrice2).toEqual(unitPrice2)
	                
	                });            
	                salesOrderSummary.invoiceamount("price",9).then(function (status) {
	                	invoicediscount2=parseFloat(status.substring(1));
	                	console.log("Discount for line2 in invoice "+invoicediscount2);
	                	expect(invoicediscount2).toEqual(discount2);
	                
	                });
	                salesOrderSummary.invoiceamount("price",10).then(function (status) {
	                	total2=parseFloat(status.substring(1));
	                	console.log("total after discount in line 2 is "+total2);
	                	expect(total2).toEqual((linePrice2-discount2));                	
	                });
	                
	                salesOrderSummary.invoiceamount("tax",3).then(function (status) {
	                	invoicesalesTax1=parseFloat(status.substring(1));
	                	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
	                	//need to add expect condition
	                	expect(invoicesalesTax1).toEqual(parseFloat((salesTax1+shippingTax1).toFixed(2)));
	                
	                });                
	                salesOrderSummary.invoiceamount("tax",4).then(function (status) {
	                	totalwithTax1=parseFloat(status.substring(1));
	                	console.log("total with tax for line1 in invoice "+totalwithTax1);
	                	expect(totalwithTax1).toEqual(parseFloat((total1+invoicesalesTax1).toFixed(2)));
	                });  
	                salesOrderSummary.invoiceamount("tax",7).then(function (status) {
	                	invoicesalesTax2=parseFloat(status.substring(1));
	                	console.log("total salestax for line2 in invoice "+invoicesalesTax2);
	                	//need to add expect condition
	                	expect(invoicesalesTax2).toEqual((salesTax2+shippingTax2))
	                });  
	                salesOrderSummary.invoiceamount("tax",8).then(function (status) {
	                	totalwithTax2=parseFloat(status.substring(1));
	                	console.log("total with tax for line2 in invoice "+totalwithTax2);
	                	//need to add expect condition
	                	expect(totalwithTax2).toEqual(parseFloat((total2+invoicesalesTax2).toFixed(2)));
	                }); 
	                salesOrderSummary.invoiceamount("price",5).then(function (status) {
	                	shipping1=parseFloat(status.substring(1));
	                	console.log("shiping charge for line1  in invoice "+shipping1);
	                	salesOrderSummary.invoiceamount("price",6).then(function (status) {
	                    	handling1=parseFloat(status.substring(1));
	                    	console.log("handling charge for line1  in invoice "+handling1);
	                        expect(shippingAndHandling1).toEqual(parseFloat((shipping1+handling1).toFixed(2)));

	                    });
	                });
	                salesOrderSummary.invoiceamount("price",11).then(function (status) {
	                	shipping2=parseFloat(status.substring(1));
	                	console.log("shiiping charge for line2  in invoice "+shipping2);
	                	salesOrderSummary.invoiceamount("price",12).then(function (status) {
	                    	handling2=parseFloat(status.substring(1));
	                    	console.log("handling charge for line2  in invoice "+handling2);
	                        expect(shippingAndHandling2).toEqual((shipping2+handling2));
	                	});
	                
	                });
	                salesOrderSummary.invoiceamount("all",1).then(function (status) {
	                	grandtotal1=parseFloat(status.substring(1));
	                	console.log("Grand total for line1  in invoice "+grandtotal1);
	                	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
	                	expect(grandtotal1).toEqual(ordertotal1);
	                
	                });
	                salesOrderSummary.invoiceamount("all",2).then(function (status) {
	                	grandtotal2=parseFloat(status.substring(1));
	                	console.log("grandtotal for line2  in invoice "+grandtotal2);
	                	expect(grandtotal2).toEqual(parseFloat((totalwithTax2+shipping2+handling2).toFixed(2)));
	                	expect(grandtotal2).toEqual(ordertotal2);

	                
	                });
	                salesOrderSummary.invoiceamount("total",8).then(function (status) {
	                	grandtotal=parseFloat(status.substring(1));
	                	console.log("grandtotal for invoice "+grandtotal);
	                	expect(grandtotal).toEqual((grandtotal1+grandtotal2));
	                	expect(grandtotal).toEqual((ordertotal1+ordertotal2));
	                
	                });
	                
	                salesOrderSummary.orderAmount("Balance",1).then(function(value){
	            		balance=parseFloat(value.substring(1));
	            		console.log("The Total balance amount is "+balance);
	            		expect(balance).toEqual(parseInt(browser.params.giftcardAmount));

	            	});                
	                
	                browser.sleep(1000);
	        		browser.get(routeUrl);
	                browser.sleep(3000);
	                commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
	                utils.status(5,1).then(function (value) {
	    				savedStatus = value;
	    			    console.log("the route status is "+savedStatus);	
	    			    returnsCreate.StopRoute(savedStatus,2);
	    			});	
	                expect(utils.status(5,1)).toEqual("STOPPED");
	                commons.pageHeader("Integration");
			        commons.page("Jobs");
			        salesOrderSummary.jobExecution();
			        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
			        utils.startJob(1);
			        callCenter.OrdersPage();
			        callCenter.page("Invoices");
			        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
			        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	            });           
		        
		        
		        browser.wait(function () {
		            return SONumber != '';
		        }).then(function () {
			    	browser.get(scriptUrl);
			        commons.searchWithCriteria('Name', 'starts with', 'orderPaymentEventListenerBeforeSave');
			        utils.status(3,1).then(function (value) {
						savedStatus = value;
					    console.log("the status is "+savedStatus);	
					    util.ScriptCancelButton(savedStatus);
					});	
			        browser.refresh();
			        commons.searchWithCriteria('Name', 'starts with', 'orderPaymentListenerBeforeSave');
			        utils.status(3,1).then(function (value) {
						savedStatus = value;
					    console.log("the status is "+savedStatus);	
					    util.ScriptCancelButton(savedStatus);
					});
			        browser.sleep(1500);   
		        });
		        
	     });
	
	//Verify Invoices for Multiple shipments for sales order
	
	it("Invoices_for_Multiple shipments_for_sales_order_TC0013", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        browser.sleep(1000);       
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
        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
    		unitPrice1=parseFloat(value.substring(1));
    		console.log("the Unit price is "+unitPrice1);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
    		linePrice1=parseFloat(value.substring(1));
    		console.log("total Line Price is "+linePrice1);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",1).then(function(value){
    		discount1=parseFloat(value.substring(2,6));
    		console.log("The Total discount is  "+discount1);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",1).then(function(value){
    		shippingAndHandling1=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge is "+shippingAndHandling1);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
    		salesTax1=parseFloat(value.substring(1));
    		console.log("The total Sales Tax is "+salesTax1);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
    		shippingTax1=parseFloat(value.substring(1));
    		console.log("The Shipping Tax is "+shippingTax1);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",1).then(function(value){
    		ordertotal1=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal1);    		
    	});
    	
//line 2        	
    	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
    		unitPrice2=parseFloat(value.substring(1));
    		console.log("the Unit price in line 2 is "+unitPrice2);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
    		linePrice2=parseFloat(value.substring(1));
    		console.log("total Line Price in line 2 is "+linePrice2);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",2).then(function(value){
    		discount2=parseFloat(value.substring(2,6));
    		console.log("The Total discount in line 2 is  "+discount2);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",2).then(function(value){
    		shippingAndHandling2=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
    		salesTax2=parseFloat(value.substring(1));
    		console.log("The total Sales Tax in line 2 is "+salesTax2);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
    		shippingTax2=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",2).then(function(value){
    		ordertotal2=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal2);
    		salesOrderGrandTotal=parseFloat(total1+total2);
    	});   	
    	
//Order level values
    	
    	salesOrderSummary.orderAmount("Total",4).then(function(value){
    		orderTotal=parseFloat(value.substring(1));
    		console.log("the Order total is "+orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
    		orderDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total discount at order level is  "+orderDiscount);
    	});
    	
    	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
    		orderSAndH=parseFloat(value.substring(1));
    		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
    	});
    	
    	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
    		orderSalesTax=parseFloat(value.substring(1));
    		console.log("The total Sales Tax at order level is "+orderSalesTax);
    	});     
    	
    	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
    		orderShippingTax=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
    	});
    	
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
        	FRNumber1=value;
        	console.log("the First FR Number is  "+FRNumber1);
        	
        });
    	
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        	
        });
     
  //!*********first FR fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber1);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","2");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
    	});
  //!*********Second fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","1");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
    	});
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
   
//first request checking
    
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the FR Request #"+FRNumber1+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber1=value;
            	console.log("the invoice number for first FR is  "+INVNumber1);
            });
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(8).then(function(value){
            	INVNumber2=value;
            	console.log("the invoice number for second FR is  "+INVNumber2);
            });
        });
    });
    browser.wait(function () {
        return INVNumber1 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');

        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice2)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount2);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total1=parseFloat(status.substring(1));
        	console.log("total after discount is "+total1);
        	expect(total1).toEqual((linePrice2-discount2));
        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax2+shippingTax2))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 1 "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat(total1+invoicesalesTax1));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping1=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice "+shipping1);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling1=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice "+handling1);
                expect(shippingAndHandling1).toEqual((shipping1+handling1));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal1=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice "+grandtotal1);
        	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
        	expect(grandtotal1).toEqual(ordertotal2);
        });  
    });
 //second request invoice checking
    	
    browser.wait(function () {
        return INVNumber2 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice1)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount1);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total2=parseFloat(status.substring(1));
        	console.log("total after discount is "+total2);
        	expect(total2).toEqual((linePrice1-discount1));        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax2=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax2);
        	//need to add expect condition
        	expect(invoicesalesTax2).toEqual((salesTax1+shippingTax1))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax2=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 2 "+totalwithTax2);
        	expect(totalwithTax2).toEqual(parseFloat(total2+invoicesalesTax2));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping2=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice 2 "+shipping2);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling2=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice 2 "+handling2);
                expect(shippingAndHandling1).toEqual((shipping2+handling2));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal2=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice 2 "+grandtotal2);
        	expect(grandtotal2).toEqual((totalwithTax2+shipping2+handling2))
        	expect(grandtotal2).toEqual(ordertotal1);
        });  
        
        browser.sleep(1000);
		browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
        commons.pageHeader("Integration");
        commons.page("Jobs");
        salesOrderSummary.jobExecution();
        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
        utils.startJob(1);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        browser.refresh();
        browser.sleep(1000);
        browser.refresh();
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.refresh();
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        
    	});   
    
    });	

	
	//Verify Invoices for Multiple shipments for sales order-BOPIS
		
		it("Invoices_for_Multiple shipments_for_sales_order_TC0014", function() {
			
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			browser.sleep(1000);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			callCenter.attachCustomer();
			callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			salesOrderCreate.selectCustomer();
			salesOrderCreate.useSelectedCustomer();
			callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Change Price");
	        callCenter.changingUnitPrice("50");
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.discountButtonEditLine();
	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
	        callCenter.applyButton();
	        browser.sleep(500);
	        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
	        browser.sleep(100);
	        salesOrderCreate.availableStore(browser.params.availableStore);
	        browser.sleep(500);        
	        callCenter.editLinePopUpSaveBtn(); 
	        browser.sleep(1500);
	        callCenter.editLineGear("5");
	        callCenter.lineItemselectOptions("Change Price");
	        callCenter.changingUnitPrice("50");
	        callCenter.editLineGear("5");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity(2);
	        callCenter.discountButtonEditLine();
	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
	        callCenter.applyButton();
	        browser.sleep(1000);     
	        browser.sleep(500);
	        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
	        browser.sleep(100);
	        salesOrderCreate.availableStore(browser.params.availableStore1);
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
	        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
	    		unitPrice1=parseFloat(value.substring(1));
	    		console.log("the Unit price is "+unitPrice1);
	    		
	    	});
	    	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
	    		linePrice1=parseFloat(value.substring(1));
	    		console.log("total Line Price is "+linePrice1);
	    		
	    	});
	    	salesOrderSummary.lineamount("Discount:",1).then(function(value){
	    		discount1=parseFloat(value.substring(2,6));
	    		console.log("The Total discount is  "+discount1);
	    		
	    	});
	    	salesOrderSummary.lineamount("S & H:",1).then(function(value){
	    		shippingAndHandling1=parseFloat(value.substring(1));
	    		console.log("Total shipping and handling charge is "+shippingAndHandling1);
	    		
	    	});
	    	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
	    		salesTax1=parseFloat(value.substring(1));
	    		console.log("The total Sales Tax is "+salesTax1);
	    		
	    	});        	
	    	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
	    		shippingTax1=parseFloat(value.substring(1));
	    		console.log("The Shipping Tax is "+shippingTax1);
	    		
	    	});
	    	
	    	salesOrderSummary.Totalamount("Total:",1).then(function(value){
	    		ordertotal1=parseFloat(value.substring(1));
	    		console.log("The line1 total is "+ordertotal1);    		
	    	});
	    	
	//line 2        	
	    	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
	    		unitPrice2=parseFloat(value.substring(1));
	    		console.log("the Unit price in line 2 is "+unitPrice2);
	    		
	    	});
	    	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
	    		linePrice2=parseFloat(value.substring(1));
	    		console.log("total Line Price in line 2 is "+linePrice2);
	    		
	    	});
	    	salesOrderSummary.lineamount("Discount:",2).then(function(value){
	    		discount2=parseFloat(value.substring(2,6));
	    		console.log("The Total discount in line 2 is  "+discount2);
	    		
	    	});
	    	salesOrderSummary.lineamount("S & H:",2).then(function(value){
	    		shippingAndHandling2=parseFloat(value.substring(1));
	    		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
	    		
	    	});
	    	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
	    		salesTax2=parseFloat(value.substring(1));
	    		console.log("The total Sales Tax in line 2 is "+salesTax2);
	    		
	    	});        	
	    	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
	    		shippingTax2=parseFloat(value.substring(1));
	    		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
	    		
	    	});
	    	
	    	salesOrderSummary.Totalamount("Total:",2).then(function(value){
	    		ordertotal2=parseFloat(value.substring(1));
	    		console.log("The line1 total is "+ordertotal2);
	    		salesOrderGrandTotal=parseFloat(total1+total2);
	    	});   	
	    	
	//Order level values
	    	
	    	salesOrderSummary.orderAmount("Total",4).then(function(value){
	    		orderTotal=parseFloat(value.substring(1));
	    		console.log("the Order total is "+orderTotal);
	    	});

	    	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
	    		orderDiscount=parseFloat(value.substring(2,6));
	    		console.log("The Total discount at order level is  "+orderDiscount);
	    	});
	    	
	    	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
	    		orderSAndH=parseFloat(value.substring(1));
	    		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
	    	});
	    	
	    	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
	    		orderSalesTax=parseFloat(value.substring(1));
	    		console.log("The total Sales Tax at order level is "+orderSalesTax);
	    	});     
	    	
	    	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
	    		orderShippingTax=parseFloat(value.substring(1));
	    		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
	    	});
	    	
	    	salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.shipmentRequestNo(1).then(function(value){
	        	FRNumber1=value;
	        	console.log("the First FR Number is  "+FRNumber1);
	        	
	        });
	    	
	        salesOrderSummary.collapseIcon(1);
	        salesOrderSummary.shipmentRequestNo(2).then(function(value){
	        	FRNumber2=value;
	        	console.log("the second FR Number is  "+FRNumber2);
	        	
	        });
	     
	  //!*********first FR fulfillment request**********!//
	    browser.wait(function () {
	        return SONumber != '';
	    	}).then( function () {
		        callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
		        console.log("the sale sorder is "+SONumber);
		        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber1);
		        callCenter.fulfillmentOrderSelectGear("Create Shipment");
		        browser.sleep(1000);
		        callCenter.shipAccountselect(browser.params.shipaccount);
		        callCenter.packageSelection(browser.params.packageValue);
		        callCenter.packageTrackingNumber(1236547890);
		        returnsCreate.multiplePackages("1","2");
		        callCenter.unselectPkg();
		        callCenter.addPackageToShipment();
		        callCenter.finalizeShipment();
		        browser.sleep(5000);
		        salesOrderSummary.viewShipmentVisibility();
		        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
		        browser.sleep(1500);
		        callCenter.shipmentChangeStatusConfimation();
		        browser.sleep(1000);
		        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	    	});
	  //!*********Second fulfillment request**********!//
	    browser.wait(function () {
	        return SONumber != '';
	    	}).then( function () {
		        callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
		        console.log("the sale sorder is "+SONumber);
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		        callCenter.fulfillmentOrderSelectGear("Create Shipment");
		        browser.sleep(1000);
		        callCenter.shipAccountselect(browser.params.shipaccount);
		        callCenter.packageSelection(browser.params.packageValue);
		        callCenter.packageTrackingNumber(1236547890);
		        returnsCreate.multiplePackages("1","1");
		        callCenter.unselectPkg();
		        callCenter.addPackageToShipment();
		        callCenter.finalizeShipment();
		        browser.sleep(5000);
		        salesOrderSummary.viewShipmentVisibility();
		        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
		        browser.sleep(1500);
		        callCenter.shipmentChangeStatusConfimation();
		        browser.sleep(1000);
		        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	    	});
	    browser.wait(function () {
	        return SONumber != '';
	    	}).then( function () {
	        browser.get(routeUrl);
	        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
	        utils.status(5,1).then(function (value) {
				savedStatus = value;
			    console.log("the route status is "+savedStatus);	
			    utils.startingReturnInvoiceRoute(savedStatus,2);
			});	
	        expect(utils.status(5,1)).toEqual("STARTED");
	        browser.sleep(4000);    
		});
	   
	//first request checking
	    
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	browser.get(callCenterSalesOrdersListUrl);
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        salesOrderSummary.salesOrderStatus().then(function (status) {
	            orderStatus = status;
	            console.log("the status of the FR Request #"+FRNumber1+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	            salesOrderSummary.salesOrderSelectGear("View");
	            salesOrderSummary.salesOrderPane("Shipping Requests");
	            salesOrderSummary.collapseIcon(1);
	            salesOrderSummary.trackingAndInvoice(4).then(function(value){
	            	INVNumber1=value;
	            	console.log("the invoice number for first FR is  "+INVNumber1);
	            });
	            salesOrderSummary.collapseIcon(1);
	            salesOrderSummary.trackingAndInvoice(8).then(function(value){
	            	INVNumber2=value;
	            	console.log("the invoice number for second FR is  "+INVNumber2);
	            });
	        });
	    });
	    browser.wait(function () {
	        return INVNumber1 != '';
	    }).then(function () {
	        callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
	        salesOrderSummary.invoiceSelect();
	        salesOrderSummary.invoiceamount("price",2).then(function (status) {
	        	invoiceunitPrice1=parseFloat(status.substring(1));
	        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
	        	expect(invoiceunitPrice1).toEqual(unitPrice2)
	        });            
	        salesOrderSummary.invoiceamount("price",3).then(function (status) {
	        	invoicediscount1=parseFloat(status.substring(1));
	        	console.log("Discount for line1 in invoice "+invoicediscount1);
	        	expect(invoicediscount1).toEqual(discount2);
	        });
	        salesOrderSummary.invoiceamount("price",4).then(function (status) {
	        	total1=parseFloat(status.substring(1));
	        	console.log("total after discount is "+total1);
	        	expect(total1).toEqual((linePrice2-discount2));
	        	
	        });
	        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
	        	invoicesalesTax1=parseFloat(status.substring(1));
	        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
	        	//need to add expect condition
	        	expect(invoicesalesTax1).toEqual((salesTax2+shippingTax2))
	        
	        });                
	        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
	        	totalwithTax1=parseFloat(status.substring(1));
	        	console.log("total with tax for line1 in invoice 1 "+totalwithTax1);
	        	expect(totalwithTax1).toEqual(parseFloat(total1+invoicesalesTax1));
	        });  
	        salesOrderSummary.invoiceamount("price",5).then(function (status) {
	        	shipping1=parseFloat(status.substring(1));
	        	console.log("shiping charge for line1  in invoice "+shipping1);
	        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
	            	handling1=parseFloat(status.substring(1));
	            	console.log("handling charge for line1  in invoice "+handling1);
	                expect(shippingAndHandling1).toEqual((shipping1+handling1));

	            });
	        });
	        salesOrderSummary.invoiceamount("all",1).then(function (status) {
	        	grandtotal1=parseFloat(status.substring(1));
	        	console.log("Grand total for line1  in invoice "+grandtotal1);
	        	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
	        	expect(grandtotal1).toEqual(ordertotal2);
	        });  
	    });
	 //second request invoice checking
	    	
	    browser.wait(function () {
	        return INVNumber2 != '';
	    }).then(function () {
	        callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
	        salesOrderSummary.invoiceSelect();
	        salesOrderSummary.invoiceamount("price",2).then(function (status) {
	        	invoiceunitPrice1=parseFloat(status.substring(1));
	        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
	        	expect(invoiceunitPrice1).toEqual(unitPrice1)
	        });            
	        salesOrderSummary.invoiceamount("price",3).then(function (status) {
	        	invoicediscount1=parseFloat(status.substring(1));
	        	console.log("Discount for line1 in invoice "+invoicediscount1);
	        	expect(invoicediscount1).toEqual(discount1);
	        });
	        salesOrderSummary.invoiceamount("price",4).then(function (status) {
	        	total2=parseFloat(status.substring(1));
	        	console.log("total after discount is "+total2);
	        	expect(total2).toEqual((linePrice1-discount1));        	
	        });
	        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
	        	invoicesalesTax2=parseFloat(status.substring(1));
	        	console.log("total salesTax for line1 in invoice "+invoicesalesTax2);
	        	//need to add expect condition
	        	expect(invoicesalesTax2).toEqual((salesTax1+shippingTax1))
	        
	        });                
	        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
	        	totalwithTax2=parseFloat(status.substring(1));
	        	console.log("total with tax for line1 in invoice 2 "+totalwithTax2);
	        	expect(totalwithTax2).toEqual(parseFloat(total2+invoicesalesTax2));
	        });  
	        salesOrderSummary.invoiceamount("price",5).then(function (status) {
	        	shipping2=parseFloat(status.substring(1));
	        	console.log("shiping charge for line1  in invoice 2 "+shipping2);
	        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
	            	handling2=parseFloat(status.substring(1));
	            	console.log("handling charge for line1  in invoice 2 "+handling2);
	                expect(shippingAndHandling1).toEqual((shipping2+handling2));

	            });
	        });
	        salesOrderSummary.invoiceamount("all",1).then(function (status) {
	        	grandtotal2=parseFloat(status.substring(1));
	        	console.log("Grand total for line1  in invoice 2 "+grandtotal2);
	        	expect(grandtotal2).toEqual((totalwithTax2+shipping2+handling2))
	        	expect(grandtotal2).toEqual(ordertotal1);
	        });  
	        
	        browser.sleep(1000);
			browser.get(routeUrl);
	        browser.sleep(3000);
	        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
	        utils.status(5,1).then(function (value) {
				savedStatus = value;
			    console.log("the route status is "+savedStatus);	
			    utils.StopRoute(savedStatus,2);
			});	
	        expect(utils.status(5,1)).toEqual("STOPPED");
	        commons.pageHeader("Integration");
	        commons.page("Jobs");
	        salesOrderSummary.jobExecution();
	        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
	        utils.startJob(1);
	        callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        browser.refresh();
	        browser.sleep(1000);
	        browser.refresh();
	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	        browser.refresh();
	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	        
	    	});   
	    
	    });	
	
	//Verify Invoices for Multiple shipments for sales order-Mixed Order
	
	it("Invoices_for_Multiple shipments_for_sales_order_TC0015", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();        
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        browser.sleep(1000);     
        browser.sleep(500);
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        browser.sleep(100);
        salesOrderCreate.availableStore(browser.params.availableStore1);
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
        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
    		unitPrice1=parseFloat(value.substring(1));
    		console.log("the Unit price is "+unitPrice1);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
    		linePrice1=parseFloat(value.substring(1));
    		console.log("total Line Price is "+linePrice1);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",1).then(function(value){
    		discount1=parseFloat(value.substring(2,6));
    		console.log("The Total discount is  "+discount1);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",1).then(function(value){
    		shippingAndHandling1=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge is "+shippingAndHandling1);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
    		salesTax1=parseFloat(value.substring(1));
    		console.log("The total Sales Tax is "+salesTax1);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
    		shippingTax1=parseFloat(value.substring(1));
    		console.log("The Shipping Tax is "+shippingTax1);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",1).then(function(value){
    		ordertotal1=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal1);    		
    	});
    	
//line 2        	
    	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
    		unitPrice2=parseFloat(value.substring(1));
    		console.log("the Unit price in line 2 is "+unitPrice2);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
    		linePrice2=parseFloat(value.substring(1));
    		console.log("total Line Price in line 2 is "+linePrice2);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",2).then(function(value){
    		discount2=parseFloat(value.substring(2,6));
    		console.log("The Total discount in line 2 is  "+discount2);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",2).then(function(value){
    		shippingAndHandling2=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
    		salesTax2=parseFloat(value.substring(1));
    		console.log("The total Sales Tax in line 2 is "+salesTax2);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
    		shippingTax2=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",2).then(function(value){
    		ordertotal2=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal2);
    		salesOrderGrandTotal=parseFloat(total1+total2);
    	});   	
    	
//Order level values
    	
    	salesOrderSummary.orderAmount("Total",4).then(function(value){
    		orderTotal=parseFloat(value.substring(1));
    		console.log("the Order total is "+orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
    		orderDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total discount at order level is  "+orderDiscount);
    	});
    	
    	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
    		orderSAndH=parseFloat(value.substring(1));
    		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
    	});
    	
    	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
    		orderSalesTax=parseFloat(value.substring(1));
    		console.log("The total Sales Tax at order level is "+orderSalesTax);
    	});     
    	
    	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
    		orderShippingTax=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
    	});
    	
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
        	FRNumber1=value;
        	console.log("the First FR Number is  "+FRNumber1);
        	
        });
    	
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        	
        });
     
  //!*********first FR fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber1);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","2");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
    	});
  //!*********Second fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","1");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
    	});
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
   
//first request checking
    
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the FR Request #"+FRNumber1+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber1=value;
            	console.log("the invoice number for first FR is  "+INVNumber1);
            });
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(8).then(function(value){
            	INVNumber2=value;
            	console.log("the invoice number for second FR is  "+INVNumber2);
            });
        });
    });
    browser.wait(function () {
        return INVNumber1 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice2)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount2);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total1=parseFloat(status.substring(1));
        	console.log("total after discount is "+total1);
        	expect(total1).toEqual((linePrice2-discount2));
        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax2+shippingTax2))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 1 "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat(total1+invoicesalesTax1));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping1=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice "+shipping1);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling1=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice "+handling1);
                expect(shippingAndHandling1).toEqual((shipping1+handling1));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal1=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice "+grandtotal1);
        	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
        	expect(grandtotal1).toEqual(ordertotal2);
        });  
    });
 //second request invoice checking
    	
    browser.wait(function () {
        return INVNumber2 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice1)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount1);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total2=parseFloat(status.substring(1));
        	console.log("total after discount is "+total2);
        	expect(total2).toEqual((linePrice1-discount1));        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax2=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax2);
        	//need to add expect condition
        	expect(invoicesalesTax2).toEqual((salesTax1+shippingTax1))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax2=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 2 "+totalwithTax2);
        	expect(totalwithTax2).toEqual(parseFloat(total2+invoicesalesTax2));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping2=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice 2 "+shipping2);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling2=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice 2 "+handling2);
                expect(shippingAndHandling1).toEqual((shipping2+handling2));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal2=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice 2 "+grandtotal2);
        	expect(grandtotal2).toEqual((totalwithTax2+shipping2+handling2))
        	expect(grandtotal2).toEqual(ordertotal1);
        });  
        
        browser.sleep(1000);
		browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
        commons.pageHeader("Integration");
        commons.page("Jobs");
        salesOrderSummary.jobExecution();
        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
        utils.startJob(1);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        browser.refresh();
        browser.sleep(1000);
        browser.refresh();
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.refresh();
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        
    	});   
    
    });	
    
    	
//Invoice_14 Verify invoice generation for Partially Shipped status order
	
	it("Invoices_for_Partially_Shipped_status_order_TC0016", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        browser.sleep(1000);       
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
        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
    		unitPrice1=parseFloat(value.substring(1));
    		console.log("the Unit price is "+unitPrice1);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
    		linePrice1=parseFloat(value.substring(1));
    		console.log("total Line Price is "+linePrice1);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",1).then(function(value){
    		discount1=parseFloat(value.substring(2,6));
    		console.log("The Total discount is  "+discount1);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",1).then(function(value){
    		shippingAndHandling1=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge is "+shippingAndHandling1);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
    		salesTax1=parseFloat(value.substring(1));
    		console.log("The total Sales Tax is "+salesTax1);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
    		shippingTax1=parseFloat(value.substring(1));
    		console.log("The Shipping Tax is "+shippingTax1);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",1).then(function(value){
    		ordertotal1=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal1);    		
    	});
    	
//line 2        	
    	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
    		unitPrice2=parseFloat(value.substring(1));
    		console.log("the Unit price in line 2 is "+unitPrice2);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
    		linePrice2=parseFloat(value.substring(1));
    		console.log("total Line Price in line 2 is "+linePrice2);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",2).then(function(value){
    		discount2=parseFloat(value.substring(2,6));
    		console.log("The Total discount in line 2 is  "+discount2);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",2).then(function(value){
    		shippingAndHandling2=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
    		salesTax2=parseFloat(value.substring(1));
    		console.log("The total Sales Tax in line 2 is "+salesTax2);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
    		shippingTax2=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",2).then(function(value){
    		ordertotal2=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal2);
    		salesOrderGrandTotal=parseFloat(total1+total2);
    	});   	
    	
//Order level values
    	
    	salesOrderSummary.orderAmount("Total",4).then(function(value){
    		orderTotal=parseFloat(value.substring(1));
    		console.log("the Order total is "+orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
    		orderDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total discount at order level is  "+orderDiscount);
    	});
    	
    	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
    		orderSAndH=parseFloat(value.substring(1));
    		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
    	});
    	
    	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
    		orderSalesTax=parseFloat(value.substring(1));
    		console.log("The total Sales Tax at order level is "+orderSalesTax);
    	});     
    	
    	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
    		orderShippingTax=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
    	});
    	
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
        	FRNumber1=value;
        	console.log("the First FR Number is  "+FRNumber1);
        	
        });
    	
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        	
        });
     
  //!*********first FR fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber1);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","2");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
    	});
 
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
   
//first request checking
    
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the FR Request #"+FRNumber1+" is: "+orderStatus);
           // expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber1=value;
            	console.log("the invoice number for first FR is  "+INVNumber1);
            });
            
        });
    });
    browser.wait(function () {
        return INVNumber1 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice2)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount2);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total1=parseFloat(status.substring(1));
        	console.log("total after discount is "+total1);
        	expect(total1).toEqual((linePrice2-discount2));
        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax2+shippingTax2))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 1 "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat(total1+invoicesalesTax1));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping1=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice "+shipping1);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling1=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice "+handling1);
                expect(shippingAndHandling1).toEqual((shipping1+handling1));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal1=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice "+grandtotal1);
        	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
        	expect(grandtotal1).toEqual(ordertotal2);
        });  
        browser.sleep(1000);
		browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
        commons.pageHeader("Integration");
        commons.page("Jobs");
        salesOrderSummary.jobExecution();
        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
        utils.startJob(1);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.refresh();
  
        
    	});   
    
    });	
    
    
	//Invoice_15-Verify invoice generation for Partially awaiting for customer pickup status (BOPIS) order
	
	it("Invoices_for_Partially_Awaiting_for_customer_pickup_status_(BOPIS)_order_TC0017", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU3);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        browser.sleep(500);
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        browser.sleep(100);
        salesOrderCreate.availableStore(browser.params.availableStore);
        browser.sleep(500);        
        callCenter.editLinePopUpSaveBtn(); 
        browser.sleep(1500);
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("5");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity(2);
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        browser.sleep(1000);     
        browser.sleep(500);
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        browser.sleep(100);
        salesOrderCreate.availableStore(browser.params.availableStore1);
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
        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
    		unitPrice1=parseFloat(value.substring(1));
    		console.log("the Unit price is "+unitPrice1);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
    		linePrice1=parseFloat(value.substring(1));
    		console.log("total Line Price is "+linePrice1);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",1).then(function(value){
    		discount1=parseFloat(value.substring(2,6));
    		console.log("The Total discount is  "+discount1);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",1).then(function(value){
    		shippingAndHandling1=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge is "+shippingAndHandling1);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
    		salesTax1=parseFloat(value.substring(1));
    		console.log("The total Sales Tax is "+salesTax1);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
    		shippingTax1=parseFloat(value.substring(1));
    		console.log("The Shipping Tax is "+shippingTax1);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",1).then(function(value){
    		ordertotal1=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal1);    		
    	});
    	
//line 2        	
    	salesOrderSummary.lineamount("Unit Price:",2).then(function(value){
    		unitPrice2=parseFloat(value.substring(1));
    		console.log("the Unit price in line 2 is "+unitPrice2);
    		
    	});
    	salesOrderSummary.lineamount("Line Price:",2).then(function(value){
    		linePrice2=parseFloat(value.substring(1));
    		console.log("total Line Price in line 2 is "+linePrice2);
    		
    	});
    	salesOrderSummary.lineamount("Discount:",2).then(function(value){
    		discount2=parseFloat(value.substring(2,6));
    		console.log("The Total discount in line 2 is  "+discount2);
    		
    	});
    	salesOrderSummary.lineamount("S & H:",2).then(function(value){
    		shippingAndHandling2=parseFloat(value.substring(1));
    		console.log("Total shipping and handling charge in Line 2 is "+shippingAndHandling2);
    		
    	});
    	salesOrderSummary.lineamount("Sales Tax:",2).then(function(value){
    		salesTax2=parseFloat(value.substring(1));
    		console.log("The total Sales Tax in line 2 is "+salesTax2);
    		
    	});        	
    	salesOrderSummary.lineamount("Shipping Tax:",2).then(function(value){
    		shippingTax2=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+shippingTax2);
    		
    	});
    	
    	salesOrderSummary.Totalamount("Total:",2).then(function(value){
    		ordertotal2=parseFloat(value.substring(1));
    		console.log("The line1 total is "+ordertotal2);
    		salesOrderGrandTotal=parseFloat(total1+total2);
    	});   	
    	
//Order level values
    	
    	salesOrderSummary.orderAmount("Total",4).then(function(value){
    		orderTotal=parseFloat(value.substring(1));
    		console.log("the Order total is "+orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",1).then(function(value){
    		orderDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total discount at order level is  "+orderDiscount);
    	});
    	
    	salesOrderSummary.orderAmount("S & H:",1).then(function(value){
    		orderSAndH=parseFloat(value.substring(1));
    		console.log("The Total shipping and handling charge at order level is "+orderSAndH);
    	});
    	
    	salesOrderSummary.orderAmount("Sales Tax:",1).then(function(value){
    		orderSalesTax=parseFloat(value.substring(1));
    		console.log("The total Sales Tax at order level is "+orderSalesTax);
    	});     
    	
    	salesOrderSummary.orderAmount("Shipping Tax:",1).then(function(value){
    		orderShippingTax=parseFloat(value.substring(1));
    		console.log("The Shipping Tax  in line 2 is "+orderShippingTax);
    	});
    	
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(1).then(function(value){
        	FRNumber1=value;
        	console.log("the First FR Number is  "+FRNumber1);
        	
        });
    	
        salesOrderSummary.collapseIcon(1);
        salesOrderSummary.shipmentRequestNo(2).then(function(value){
        	FRNumber2=value;
        	console.log("the second FR Number is  "+FRNumber2);
        	
        });
     
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	        callCenter.fullFillmentPage();
	        callCenter.page("Fulfillment Requests");
	        console.log("the sale sorder is "+SONumber);
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber1);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        returnsCreate.multiplePackages("1","2");
	        callCenter.unselectPkg();
	        callCenter.addPackageToShipment();
	        callCenter.finalizeShipment();
	        browser.sleep(5000);
	        salesOrderSummary.viewShipmentVisibility();
	        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	        browser.sleep(1500);
	        callCenter.shipmentChangeStatusConfimation();
	        browser.sleep(1000);
	        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        callCenter.CallCenterPage();
	        callCenter.page("Sales Orders");
	        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY PICKEDUP BY CUSTOMER');
	        
    	});
  
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        browser.get(routeUrl);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.startingReturnInvoiceRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STARTED");
        browser.sleep(4000);    
	});
   
    
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {
    	browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        salesOrderSummary.salesOrderStatus().then(function (status) {
            orderStatus = status;
            console.log("the status of the FR Request #"+FRNumber1+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY PICKEDUP BY CUSTOMER');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber1=value;
            	console.log("the invoice number for first FR is  "+INVNumber1);
            });
        });
    });
    browser.wait(function () {
        return INVNumber1 != '';
    }).then(function () {
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.invoiceamount("price",2).then(function (status) {
        	invoiceunitPrice1=parseFloat(status.substring(1));
        	console.log("unit price for line1 in invoice "+invoiceunitPrice1);
        	expect(invoiceunitPrice1).toEqual(unitPrice2)
        });            
        salesOrderSummary.invoiceamount("price",3).then(function (status) {
        	invoicediscount1=parseFloat(status.substring(1));
        	console.log("Discount for line1 in invoice "+invoicediscount1);
        	expect(invoicediscount1).toEqual(discount2);
        });
        salesOrderSummary.invoiceamount("price",4).then(function (status) {
        	total1=parseFloat(status.substring(1));
        	console.log("total after discount is "+total1);
        	expect(total1).toEqual((linePrice2-discount2));
        	
        });
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax2+shippingTax2))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice 1 "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat(total1+invoicesalesTax1));
        });  
        salesOrderSummary.invoiceamount("price",5).then(function (status) {
        	shipping1=parseFloat(status.substring(1));
        	console.log("shiping charge for line1  in invoice "+shipping1);
        	salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	handling1=parseFloat(status.substring(1));
            	console.log("handling charge for line1  in invoice "+handling1);
                expect(shippingAndHandling1).toEqual((shipping1+handling1));

            });
        });
        salesOrderSummary.invoiceamount("all",1).then(function (status) {
        	grandtotal1=parseFloat(status.substring(1));
        	console.log("Grand total for line1  in invoice "+grandtotal1);
        	expect(grandtotal1).toEqual((totalwithTax1+shipping1+handling1))
        	expect(grandtotal1).toEqual(ordertotal2);
        });  
        browser.sleep(1000);
		browser.get(routeUrl);
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
        utils.status(5,1).then(function (value) {
			savedStatus = value;
		    console.log("the route status is "+savedStatus);	
		    utils.StopRoute(savedStatus,2);
		});	
        expect(utils.status(5,1)).toEqual("STOPPED");
        commons.pageHeader("Integration");
        commons.page("Jobs");
        salesOrderSummary.jobExecution();
        commons.searchWithCriteria('Name', 'ends with', browser.params.paymentJob);
        utils.startJob(1);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber1);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.refresh();
    	});   
    });
});

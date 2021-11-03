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

global.INVNumber= "";
global.INVNumber2="";
global.FRNumber1= "";
global.FRNumber2="";
var FRNumbers=[];
global.subSONumber="";
global.reshipSONumber="";
global.SONumber1="";
global.SONumber2="";
global.RMANumber="";
global.RMAId="";
var response=[]
let jsondata="";
global.invoiceId="";
global.authorizedAmount = "";
global.capturedAmount = "";


describe( "Invoice High", function () {	
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
	utils.Login(browser.params.login.user,browser.params.login.password);

//Test Case 1: Verify invoice TOTAL amount by creating an order through order api and providing all details in line level only for full shipment
 /*
	it("Create API order with details at line level for an Invoice", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
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
            		      "channel": "B2B",
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [
            		        {
            		          "lineNumber": 1,
            		          "lineItemId": browser.params.searchValueSKU1,
            		          "itemTitle": browser.params.searchValueSKU1,
            		          "itemUnitPrice": 100.45,
            		          "itemDescription": browser.params.searchValueSKU1,
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
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
            		              "taxAmount": 3.34,
            		              "taxRate": 0.0501
            		            },
            		             {
            		              "taxName": "SHIPPING_TAX",
            		              "taxAmount": 0.11,
            		              "taxRate": 0.0501
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.23,
            		              "originalChargeAmount": 7.5
            		            },
            		            {
            		              "chargeCategory": "HANDLING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 3.89,
            		              "originalChargeAmount": 1.5
            		            }
            		          ],
            		          "lineDiscounts": [
            		            {
            		              "discountAmount": 2.34,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 6,
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
            		          "itemUnitPrice": 50.45,
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
            		              "taxAmount": 3.24,
            		              "taxRate": 0.0501
            		            },
            		            {
            		              "taxName": "SHIPPING_TAX",
            		              "taxAmount": 1.29,
            		              "taxRate": 0.0501
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.23,
            		              "originalChargeAmount": 7.5
            		            },
            		              {
            		              "chargeCategory": "HANDLING",
            		              "chargeName": "HANDLING",
            		              "chargeAmount": 1.67,
            		              "originalChargeAmount": 1.5
            		            }
            		          ],
            		          "lineDiscounts": [
            		            {
            		              "discountAmount": 0.89,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 9,
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
            		          "value": "PritiTest128"
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
	            returnsCreate.multiplePackages("1","1");
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
				    util.startingReturnInvoiceRoute(savedStatus,2);
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
                browser.sleep(1000);
        		browser.get(routeUrl);
                //browser.sleep(3000);
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
		        browser.refresh();
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		       // expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
            });
	        browser.wait(function () {
                return SONumber != '';
            }).then(function () {
            	callCenter.CallCenterPage();
         		callCenter.page("Sales Orders");
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                salesOrderSummary.salesOrderSelectGear("View");
                salesOrderSummary.salesOrderPane("Payments");
                browser.sleep(5000);
                salesOrderSummary.collapseIcon(2);    
                salesOrderSummary.orderPaymentAuth(4).then(function (value) {
    				authorized = value;
    			    console.log("the authorized amount before "+authorized);
    				authorizedAmount=authorized.toString().substring(12);
    			    console.log("the authorized amount is "+authorizedAmount);
    			});	
                salesOrderSummary.orderCapturedAmount().then(function (value) {
                	captured= value;
    				capturedAmount=captured.toString().substring(10);
    			    console.log("the captured amount is "+capturedAmount);
    			    expect(authorizedAmount).toEqual(capturedAmount);	    			    
    			});	
                salesOrderSummary.orderPaymentAuth(3).then(function (value) {
                	status= value;
    				method=status.toString().trim();
    			    console.log("the Payment method is "+method);
    			    expect(method).toContain("CREDIT_CARD");
    			});
                
                callCenter.OrdersPage();
		        callCenter.page("Invoices");
		        browser.refresh();
		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
            });    
	        done();
        });    
     });
	 	
//Verify invoice TOTAL AMOUNT  by creating an order through order api and providing all details in line level as well as at order level.
	 
	it("Create API order with Partially Shipped Status TC0002", done =>{
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
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
        		      "puchaseOrderNumber": order+2,
        		      "orderNumber": order+2,
        		      "migrationOrder": false,
        		      "carrierServiceType": "Ground",
        		      "originalOrderNumber": order+2,
        		      "status": "OPEN",
        		      "channel": "B2B",
        		      "orderOrganization": "TheHonestKitchen-Organization-",
        		      "orderTransactionType": "SALES",
        		      "lineItems": [
        		        {
        		          "lineNumber": 1,
        		          "lineItemId": "CivicSku1",
        		          "itemTitle": "CivicSku1",
        		          "itemUnitPrice": 100.45,
        		          "itemDescription": "CivicSku1",
        		          "lineItemQty": 1,
        		          "status": "OPEN",
        		          "originalOrderedQty": "1",
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
        		              "taxAmount": 3.34,
        		              "taxRate": 0.0501
        		            },
        		             {
        		              "taxName": "SHIPPING_TAX",
        		              "taxAmount": 0.11,
        		              "taxRate": 0.0501
        		            }
        		          ],
        		          "lineCharges": [
        		            {
        		              "chargeCategory": "SHIPPING",
        		              "chargeName": "SHIPPING",
        		              "chargeAmount": 0.23,
        		              "originalChargeAmount": 7.5
        		            },
        		            {
        		              "chargeCategory": "HANDLING",
        		              "chargeName": "SHIPPING",
        		              "chargeAmount": 3.89,
        		              "originalChargeAmount": 1.5
        		            }
        		          ],
        		          "lineDiscounts": [
        		            {
        		              "discountAmount": 2.34,
        		              "discountName": "ORDER_DISCOUNT",
        		              "originalDiscountAmount": 6,
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
        		          "lineItemId": "CivicSku2",
        		          "itemTitle": "CivicSku2",
        		          "itemUnitPrice": 50.45,
        		          "itemDescription": "CivicSku2",
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
        		              "taxAmount": 3.24,
        		              "taxRate": 0.0501
        		            },
        		            {
        		              "taxName": "SHIPPING_TAX",
        		              "taxAmount": 1.29,
        		              "taxRate": 0.0501
        		            }
        		          ],
        		          "lineCharges": [
        		            {
        		              "chargeCategory": "SHIPPING",
        		              "chargeName": "SHIPPING",
        		              "chargeAmount": 0.23,
        		              "originalChargeAmount": 7.5
        		            },
        		              {
        		              "chargeCategory": "HANDLING",
        		              "chargeName": "HANDLING",
        		              "chargeAmount": 1.67,
        		              "originalChargeAmount": 1.5
        		            }
        		          ],
        		          "lineDiscounts": [
        		            {
        		              "discountAmount": 0.89,
        		              "discountName": "ORDER_DISCOUNT",
        		              "originalDiscountAmount": 9,
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
        		          "value": "PritiTest128"
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
    		SONumber1=response.body.orders[0].orderNumber;
    		console.log("The Order Number  is "+SONumber1);
    		expect(response.statusCode).toBe(200);		
    		    
	        browser.wait(function () {
	            return SONumber1 != '';
	        }).then( function () {
	        	
	        	//utils.Login(browser.params.login.user,browser.params.login.password);
	        	browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
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
	        });
		        //!*********fulfillment request**********!//
		        browser.wait(function () {
		            return SONumber1 != '';
		        	}).then( function () {
			        callCenter.fullFillmentPage();
			        callCenter.page("Fulfillment Requests");
		            console.log("the sale sorder is "+SONumber1);
		            browser.sleep(1500);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
		            callCenter.fulfillmentOrderSelectGear("Create Shipment");
		            browser.sleep(1000);
		            callCenter.shipAccountselect(browser.params.shipaccount);
		            callCenter.packageSelection(browser.params.packageValue);
		            callCenter.packageTrackingNumber(1236547890);
		            returnsCreate.multiplePackages("1","1");
		            returnsCreate.multiplePackages("3","0");
		            callCenter.unselectPkg();
		            callCenter.addPackageToShipment();
		            callCenter.finalizeShipment();
		            browser.sleep(15000)
		            salesOrderCreate.FRReject(browser.params.rejectReason,browser.params.rejectComments)
		            salesOrderSummary.CNFButton();
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
	                return SONumber1 != '';
	            }).then(function () {
	            	browser.get(callCenterSalesOrdersListUrl);
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
	                salesOrderSummary.salesOrderStatus().then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	              });
	                salesOrderSummary.salesOrderSelectGear("View");//editing the Order  
	    	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("SHIPPED");//after completely canceling the line item               
	    	        expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");//after completely canceling the line item               
	    	        expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("FAILED TO ALLOCATE");//after completely canceling the line item               
	                callCenter.OrdersPage();
			        callCenter.page("Invoices");
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
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
	                	expect(grandtotal1).toEqual(ordertotal1);
	                
	                });          
	                salesOrderSummary.invoiceamount("total",8).then(function (status) {
	                	grandtotal=parseFloat(status.substring(1));
	                	console.log("grandtotal for invoice "+grandtotal);
	                	expect(grandtotal).toEqual((grandtotal1));
	                	expect(grandtotal).toEqual((ordertotal1));
	                
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
			        browser.refresh();
			        browser.sleep(1000);
			        browser.refresh();
			        salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
			        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	            });            
		        done();
        });    
     });
	
//Test Case 3: Verify invoice TOTAL AMOUNT  by creating an order through order api and providing all details in line level as well as at order level.	
	
	it("Create API order with details at order level and line level for an Invoice_TC0003", done =>{
    	
		var NowMoment = moment();
		var order = NowMoment.format('YYYY-MM-DDHHmmss');
		
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
            		      "puchaseOrderNumber": order+3,
            		      "orderNumber": order+3,
            		      "migrationOrder": false,
            		      "carrierServiceType": "Ground",
            		      "originalOrderNumber": order+3,
            		      "status": "OPEN",
            		      "channel": "B2B",
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "orderTransactionType": "SALES",
            		      "lineItems": [
            		        {
            		          "lineNumber": 1,
            		          "lineItemId": "CivicSku1",
            		          "itemTitle": "CivicSku1",
            		          "itemUnitPrice": 100.45,
            		          "itemDescription": "CivicSku1",
            		          "lineItemQty": 1,
            		          "status": "OPEN",
            		          "originalOrderedQty": "1",
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
            		              "taxAmount": 3.34,
            		              "taxRate": 0.0501
            		            },
            		             {
            		              "taxName": "SHIPPING_TAX",
            		              "taxAmount": 0.11,
            		              "taxRate": 0.0501
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.23,
            		              "originalChargeAmount": 7.5
            		            },
            		            {
            		              "chargeCategory": "HANDLING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 3.89,
            		              "originalChargeAmount": 1.5
            		            }
            		          ],
            		          "lineDiscounts": [
            		            {
            		              "discountAmount": 2.34,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 6,
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
            		          "lineItemId": "CivicSku2",
            		          "itemTitle": "CivicSku2",
            		          "itemUnitPrice": 50.45,
            		          "itemDescription": "CivicSku2",
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
            		              "taxAmount": 3.24,
            		              "taxRate": 0.0501
            		            },
            		            {
            		              "taxName": "SHIPPING_TAX",
            		              "taxAmount": 1.29,
            		              "taxRate": 0.0501
            		            }
            		          ],
            		          "lineCharges": [
            		            {
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.23,
            		              "originalChargeAmount": 7.5
            		            },
            		              {
            		              "chargeCategory": "HANDLING",
            		              "chargeName": "HANDLING",
            		              "chargeAmount": 1.67,
            		              "originalChargeAmount": 1.5
            		            }
            		          ],
            		          "lineDiscounts": [
            		            {
            		              "discountAmount": 0.89,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 9,
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
            		     
            		      "orderCharges": [
            		      	{
            		              "chargeCategory": "SHIPPING",
            		              "chargeName": "SHIPPING",
            		              "chargeAmount": 0.23,
            		              "originalChargeAmount": 7.5
            		            }
            		      	],
            		      "orderDiscounts": [
            		      	{
            		              "discountAmount": 0.89,
            		              "discountName": "ORDER_DISCOUNT",
            		              "originalDiscountAmount": 9,
            		              "description": "10 Percent Off",
            		              "promo": {
            		                "promoId": "10%OFF",
            		                "promoType": "OrderDisc",
            		                "promoGroup": "OrderDisc"
            		              }
            		      	}
            		      	],
            		      	"orderTaxes":[
            		      		{
            		              "taxName": "SALES_TAX",
            		              "taxAmount": 3.24,
            		              "taxRate": 0.0501
            		            }
            		      		
            		      		],
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
            		          "value": "PritiTest128"
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
    		SONumber2=response.body.orders[0].orderNumber;
    		console.log("The Order Number  is "+SONumber2);
    		expect(response.statusCode).toBe(200);		
    		    
	        browser.wait(function () {
	            return SONumber2 != '';
	        }).then( function () {
	        	
	        	//utils.Login(browser.params.login.user,browser.params.login.password);
	        	browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
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
	
	        });
		        //!*********fulfillment request**********!//
		        browser.wait(function () {
		            return SONumber2 != '';
		        	}).then( function () {
			        callCenter.fullFillmentPage();
			        callCenter.page("Fulfillment Requests");
		            console.log("the sale sorder is "+SONumber2);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
		            callCenter.fulfillmentOrderSelectGear("Create Shipment");
		            browser.sleep(1000);
		            callCenter.shipAccountselect(browser.params.shipaccount);
		            callCenter.packageSelection(browser.params.packageValue);
		            callCenter.packageTrackingNumber(1236547890);
		            returnsCreate.multiplePackages("1","1");
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
	                return SONumber2 != '';
	            }).then(function () {
	            	browser.get(callCenterSalesOrdersListUrl);
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
	                salesOrderSummary.salesOrderStatus().then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	              });
	                callCenter.OrdersPage();
			        callCenter.page("Invoices");
	                salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
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
	                	expect(invoicesalesTax1).toEqual((salesTax1+shippingTax1))
	                
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
	                        expect(shippingAndHandling1).toEqual((shipping1+handling1));
	
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
	                
	//Invoice header level values            	
	            	salesOrderSummary.orderAmount("Balance",1).then(function(value){
	            		invoiceTotal=parseFloat(value.substring(1));
	            		console.log("the invoice total at header level is "+invoiceTotal);
	            		expect(invoiceTotal).toEqual(orderTotal);
	            	});
	
	            	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
	            		invoiceDiscount=parseFloat(value.substring(2,6));
	            		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
	            		expect(invoiceDiscount).toEqual(orderDiscount);
	
	            	});
	            	
	            	salesOrderSummary.orderAmount("Shipping",1).then(function(value){
	            		invoiceShipping=parseFloat(value.substring(1));
	            		console.log("The Total invoice shipping order level is "+invoiceShipping);
	            	});
	            	
	            	salesOrderSummary.orderAmount("Handling",1).then(function(value){
	            		invoiceHandling=parseFloat(value.substring(1));
	            		console.log("The Total invoice handling charge at order level is "+invoiceHandling);
	            		expect(orderSAndH).toEqual((invoiceShipping+invoiceHandling));
	            		
	            	});
	            	
	            	salesOrderSummary.orderAmount("Tax",1).then(function(value){
	            		invoiceTax=parseFloat(value.substring(1));
	            		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
	            		expect(invoiceTax).toEqual((orderSalesTax+orderShippingTax));
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
			        browser.refresh();
			        browser.sleep(1000);
			        browser.refresh();
			        salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
			        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	            });            
		        done();
        	});    
     });
     
     //invoice_4 : Verify shipping charges on invoice screen when chargeActualShippingCost value is true in orderCalculationSettings correlations.
	 it(" Verify_shipping_charges_in_invoice_screen_when_orderCalculationSettings->chargeActualShippingCost_value_is_true_TC0014", function() {
			
		 browser.get(correlations);
    	 commons.searchWithCriteria('Name', 'ends with', 'orderCalculationSettings');            
    	 salesOrderSummary.salesOrderSelectGear("View");
    	 batchCreate.keyValues().then(function (value) {
		    key = value;
		    console.log("the key values are "+key);
	        batchCreate.correlation(key,"chargeActualShippingCost","true");
	        browser.sleep(1000);
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
			browser.sleep(1000);
	        callCenter.lineItemselectOptions("Change Price");
	        callCenter.changingUnitPrice("50");
	        callCenter.editLineGear("3");
	        browser.sleep(1000);
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.discountButtonEditLine();
	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
	        callCenter.applyButton();
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
	           console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	           expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	           salesOrderSummary.salesOrderSelectGear("View");
	           salesOrderSummary.salesOrderPane("Shipping Requests");
	           salesOrderSummary.collapseIcon(1);
	           
	           salesOrderSummary.shipmentRequestNo(1).then(function(value){
		        	FRNumber1=value;
		        	console.log("the  FR Number is  "+FRNumber1);
		        	
		        });	
	           
	           salesOrderSummary.trackingAndInvoice(4).then(function(value){
	           	INVNumber=value;
	           	console.log("the invoice number is  "+INVNumber);
	           });  
			  });
			});
		    browser.wait(function () {
		        return INVNumber != '';
		    }).then(function () {
		    	browser.sleep(1500);
		        callCenter.OrdersPage();
		        callCenter.page("Invoices");
		        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
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
			   // utils.closeIcon(1);
		        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
                salesOrderSummary.invoiceSelect();
		        util.currentURL().then(function(value){
		        	url=value;
			        console.log("the current url is "+url);
			        invoiceId=url.substring(67,103);
			        console.log("the Invoice id is "+invoiceId);
		        });
		        
		    }); 
	 	});
	        	
       	 it("Getting the Invoice response for costs equals false", done =>{
    	        var options = {
                        method: 'GET',
                        url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
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
            		//console.log('body:', body);
            		response1 = JSON.stringify(body);
            		response2= response1.split(",")
            		console.log("the length of body array is : ", response2.length);
            		for(i=0;i<response2.length;i++){         			
            			if(response2[i]=='"shippingCosts":0'){
            				console.log("the value before updting array is "+response2[i])
            				response2[i]='"shippingCosts":10';
            				console.log("the value updted is "+response2[i]);
            			}         
            			else if(response2[i]=='"handlingCosts":0'){
            				
            				console.log("the value before updting array is "+response2[i])
            				response2[i]='"handlingCosts":15';
            				console.log("the value updted is "+response2[i]);
            			}

            		}
            		jsondata=JSON.parse(response2)
            		expect(response.statusCode).toBe(200);
            		done();

                    });
       	 		});
                //sending the PUT Request
       	 it("updating the invoice response for costs false ", done =>{
                var options = {
                        method: 'PUT',
                        url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
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
       	it("Shiiping and Handling Costs verification", function() {
       		
       		browser.get(invoiceUrl);
	        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
            salesOrderSummary.invoiceSelect();
            salesOrderSummary.invoiceamount("price",5).then(function (status) {
            	invoiceShipping=parseFloat(status.substring(1));
            	console.log("The Shipping Cost is  "+invoiceShipping);
            	expect(invoiceShipping).toEqual(10.00)            
            });         
            
            salesOrderSummary.invoiceamount("price",6).then(function (status) {
            	invoiceHandling=parseFloat(status.substring(1));
            	console.log("The Handling Cost is  "+invoiceHandling);
            	expect(invoiceHandling).toEqual(15.00)            
            });   
                   		
       	});
       	
   	
      //invoice_5 : Verify shipping charges in invoice screen when chargeActualShippingCost value is false in orderCalculationSettings correlations.
   	 it(" Verify_shipping_charges_in_invoice_screen_when_orderCalculationSettings->chargeActualShippingCost_value_is_false_TC0014", function() {
   			
   		 browser.get(correlations);
       	 commons.searchWithCriteria('Name', 'ends with', 'orderCalculationSettings');            
       	 salesOrderSummary.salesOrderSelectGear("View");
       	 batchCreate.keyValues().then(function (value) {
   		    key = value;
   		    console.log("the key values are "+key);
   	        batchCreate.correlation(key,"chargeActualShippingCost","false");
   	        browser.sleep(1000);
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
   			browser.sleep(1000);
   	        callCenter.lineItemselectOptions("Change Price");
   	        callCenter.changingUnitPrice("50");
   	        callCenter.editLineGear("3");
   	        browser.sleep(1000);
   	        callCenter.lineItemselectOptions("Edit Line");
   	        callCenter.discountButtonEditLine();
   	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
   	        callCenter.applyButton();
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
   	           console.log("the status of the order #"+SONumber+" is: "+orderStatus);
   	           expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
   	           salesOrderSummary.salesOrderSelectGear("View");
   	           salesOrderSummary.salesOrderPane("Shipping Requests");
   	           salesOrderSummary.collapseIcon(1);
   	           
   	           salesOrderSummary.shipmentRequestNo(1).then(function(value){
   		        	FRNumber1=value;
   		        	console.log("the  FR Number is  "+FRNumber1);
   		        	
   		        });	
   	           
   	           salesOrderSummary.trackingAndInvoice(4).then(function(value){
   	           	INVNumber=value;
   	           	console.log("the invoice number is  "+INVNumber);
   	           });  
   			  });
   			});
   		    browser.wait(function () {
   		        return INVNumber != '';
   		    }).then(function () {
   		    	browser.sleep(1500);
   		        callCenter.OrdersPage();
   		        callCenter.page("Invoices");
   		        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
   		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
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
   			   // utils.closeIcon(1);
   		        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
   		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
                   salesOrderSummary.invoiceSelect();
   		        util.currentURL().then(function(value){
   		        	url=value;
   			        console.log("the current url is "+url);
   			        invoiceId=url.substring(67,103);
   			        console.log("the Invoice id is "+invoiceId);
   		        });
   		        
   		    }); 
   	 });
   	        	
          	 it("Getting the Invoice response", done =>{
       	        var options = {
                           method: 'GET',
                           url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
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
               		//console.log('body:', body);
               		response1 = JSON.stringify(body);
               		response2= response1.split(",")
               		console.log("the length of body array is : ", response2.length);
               		for(i=0;i<response2.length;i++){         			
               			if(response2[i]=='"shippingCosts":0'){
               				console.log("the value before updting array is "+response2[i])
               				response2[i]='"shippingCosts":10';
               				console.log("the value updted is "+response2[i]);
               			}         
               			else if(response2[i]=='"handlingCosts":0'){
               				
               				console.log("the value before updting array is "+response2[i])
               				response2[i]='"handlingCosts":15';
               				console.log("the value updted is "+response2[i]);
               			}

               		}
               		jsondata=JSON.parse(response2)
               		expect(response.statusCode).toBe(200);
               		done();

                       });
          	 		});
                   //sending the PUT Request
          	 it("updating the invoice response ", done =>{
                   var options = {
                           method: 'PUT',
                           url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/id/'+invoiceId+'',
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
          	it("Shipping and Handling Costs verification", function() {
          		
          		browser.get(invoiceUrl);
   	        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
               salesOrderSummary.invoiceSelect();
               salesOrderSummary.invoiceamount("price",5).then(function (status) {
               	invoiceShipping=parseFloat(status.substring(1));
               	console.log("The Shipping Cost is  "+invoiceShipping);
               	expect(invoiceShipping).toEqual(0.00)            
               });         
               
               salesOrderSummary.invoiceamount("price",6).then(function (status) {
               	invoiceHandling=parseFloat(status.substring(1));
               	console.log("The Handling Cost is  "+invoiceHandling);
               	expect(invoiceHandling).toEqual(0.00)            
               });   
                      		
          	});
           	
       	 

	
//TC_0006 => Verify Shipment information details on Shipment Invoice
    it("Verify_Shipment_information_details_on_Shipment_invoice_TC0006", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
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
        returnsCreate.multiplePackages("1","1");
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
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
      });
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
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
        	expect(invoicesalesTax1).toEqual((salesTax1+shippingTax1))
        
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
                expect(shippingAndHandling1).toEqual((shipping1+handling1));

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
        
//Invoice header level values            	
    	salesOrderSummary.orderAmount("Balance",1).then(function(value){
    		invoiceTotal=parseFloat(value.substring(1));
    		console.log("the invoice total at header level is "+invoiceTotal);
    		expect(invoiceTotal).toEqual(orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
    		invoiceDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
    		expect(invoiceDiscount).toEqual(orderDiscount);

    	});
    	
    	salesOrderSummary.orderAmount("Tax",1).then(function(value){
    		invoiceTax=parseFloat(value.substring(1));
    		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
    		expect(invoiceTax).toEqual((orderSalesTax+orderShippingTax));
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
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
    	});                
    });
	
	
	//TC_0007 => Verify Shipment information details on Vendor Invoice
    it("Verify_Shipment_information_details_on_Vendor_invoice_TC0006", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.vendorSku);
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
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
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

        salesOrderSummary.shippingInfo(4).then(function(value){
        	orderCarrier=value;
    		console.log("the Carrier in order screen is "+orderCarrier);    		
    	});
        
        salesOrderSummary.shippingInfo(5).then(function(value){
        	orderService=value;
    		console.log("the service type in the order screen is "+orderService);    		
    	});

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
        //callCenter.shipAccountselect(browser.params.shipaccount);
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
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.shipmentRequestInfo(1).then(function(value){
            	orderSiteName=value.substr(6);
            	console.log("the site name is  "+orderSiteName);
            	
            });
            salesOrderSummary.trackingAndInvoice(2).then(function(value){
            	orderTracking=value;
            	console.log("the tracking number data "+orderTracking);
            	
            });
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber2=value.substring(0, 11);
            	console.log("the vendor invoice number is  "+INVNumber2);
            	
            });
            salesOrderSummary.trackingAndInvoice(6).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            	
            });  
		  });
		});
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	browser.sleep(1500);
         callCenter.OrdersPage();
         callCenter.page("Invoices");
         salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
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
 
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax1+shippingTax1))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat((total1+invoicesalesTax1).toFixed(2)));
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
        	expect(grandtotal1).toEqual(ordertotal1);
        
        });
  
//Invoice header level values            	
    	salesOrderSummary.orderAmount("Balance",1).then(function(value){
    		invoiceTotal=parseFloat(value.substring(1));
    		console.log("the invoice total at header level is "+invoiceTotal);
    		expect(invoiceTotal).toEqual(orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
    		invoiceDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
    		expect(invoiceDiscount).toEqual(orderDiscount);

    	});
    	
    	salesOrderSummary.orderAmount("Tax",1).then(function(value){
    		invoiceTax=parseFloat(value.substring(1));
    		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
    		expect(invoiceTax).toEqual((orderSalesTax+orderShippingTax));
    	});   
        salesOrderSummary.salesOrderPane("Shipment Information");
        
        invoiceSummary.invoiceShipmentInfo(1).then(function(value){
        	invoiceCarrier=value;
    		console.log("carrier in invoice screen"+invoiceCarrier);
    		expect(invoiceCarrier).toEqual(orderCarrier);
    	}); 
        invoiceSummary.invoiceShipmentInfo(2).then(function(value){
        	invoiceService=value;
    		console.log("service type on invoice screen"+invoiceService);
    		expect(invoiceService).toEqual(orderService);
    	}); 
       
        invoiceSummary.invoiceShipmentInfo(4).then(function(value){
        	invoiceSiteName=value;
    		console.log("the site name on invoice screen"+invoiceSiteName);
    		expect(invoiceSiteName).toEqual(orderSiteName);
    	}); 
        salesOrderSummary.trackingAndInvoice(2).then(function(value){
        	invoiceTracking=value;
        	console.log("the tracking number data on invoice screen "+invoiceTracking);
    		expect(invoiceTracking).toEqual(orderTracking);
        });
        browser.sleep(1500);
    });
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {  
    	callCenter.OrdersPage();
        callCenter.page("Invoices");
        utils.closeIcon(1);
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
        salesOrderSummary.invoiceSelect();
        salesOrderSummary.salesOrderPane("Shipment Information");
        
        invoiceSummary.invoiceShipmentInfo(1).then(function(value){
        	invoiceCarrier=value;
    		console.log("carrier on vendor invoice screen"+invoiceCarrier);
    		expect(invoiceCarrier).toEqual(orderCarrier);
    	}); 
        invoiceSummary.invoiceShipmentInfo(2).then(function(value){
        	invoiceService=value;
    		console.log("service type on vendor invoice screen"+invoiceService);
    		expect(invoiceService).toEqual(orderService);
    	}); 
       
        invoiceSummary.invoiceShipmentInfo(4).then(function(value){
        	invoiceSiteName=value;
    		console.log("the site name on vendor invoice screen"+invoiceSiteName);
    		expect(invoiceSiteName).toEqual(orderSiteName);
    	}); 
        salesOrderSummary.trackingAndInvoice(2).then(function(value){
        	invoiceTracking=value;
        	console.log("the tracking number data on vendor invoice screen "+invoiceTracking);
    		expect(invoiceTracking).toEqual(orderTracking);
        });
        browser.sleep(1500);
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
        browser.sleep(3000);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.sleep(1000);
       // utils.closeIcon(1);
        
    	});                
    });
   //Invoice_0009 : Verify Shipment information details on Invoice for BOPIS Order
    
	it("Verify_Shipment_information_details_on_BOPIS_invoice_TC0007", function() {
		
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
		browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        browser.sleep(1000);
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

       // salesOrderSummary.shippingInfo(4).then(function(value){
       // 	orderCarrier=value;
    //		console.log("the Carrier in order screen is "+orderCarrier);    		
    //	});
        
      //  salesOrderSummary.shippingInfo(5).then(function(value){
       // 	orderService=value;
    //		console.log("the service type in the order screen is "+orderService);    		
    //	});

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
        //callCenter.shipAccountselect(browser.params.shipaccount);
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
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.shipmentRequestInfo(1).then(function(value){
            	orderSiteName=value.substr(6);
            	console.log("the site name is  "+orderSiteName);
            	
            });
            salesOrderSummary.shipmentRequestInfo(2).then(function(value){
            	orderCarrier=value.substr(9);
        		console.log("the Carrier in order screen is "+orderCarrier);    		
        	});
            
            salesOrderSummary.trackingAndInvoice(2).then(function(value){
            	orderTracking=value;
            	console.log("the tracking number data "+orderTracking);
            });
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            });  
		  });
		});
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	browser.sleep(1500);
         callCenter.OrdersPage();
         callCenter.page("Invoices");
         salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
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
 
        salesOrderSummary.invoiceamount("tax",3).then(function (status) {
        	invoicesalesTax1=parseFloat(status.substring(1));
        	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
        	//need to add expect condition
        	expect(invoicesalesTax1).toEqual((salesTax1+shippingTax1))
        
        });                
        salesOrderSummary.invoiceamount("tax",4).then(function (status) {
        	totalwithTax1=parseFloat(status.substring(1));
        	console.log("total with tax for line1 in invoice "+totalwithTax1);
        	expect(totalwithTax1).toEqual(parseFloat((total1+invoicesalesTax1).toFixed(2)));
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
        	expect(grandtotal1).toEqual(ordertotal1);
        
        });
  
//Invoice header level values            	
    	salesOrderSummary.orderAmount("Balance",1).then(function(value){
    		invoiceTotal=parseFloat(value.substring(1));
    		console.log("the invoice total at header level is "+invoiceTotal);
    		expect(invoiceTotal).toEqual(orderTotal);
    	});

    	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
    		invoiceDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
    		expect(invoiceDiscount).toEqual(orderDiscount);

    	});
    	
    	salesOrderSummary.orderAmount("Tax",1).then(function(value){
    		invoiceTax=parseFloat(value.substring(1));
    		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
    		expect(invoiceTax).toEqual((orderSalesTax+orderShippingTax));
    	});   
        salesOrderSummary.salesOrderPane("Shipment Information");
        
        invoiceSummary.invoiceShipmentInfo(1).then(function(value){
        	invoiceCarrier=value;
    		console.log("carrier in invoice screen"+invoiceCarrier);
    		expect(invoiceCarrier).toEqual(orderCarrier);
    	}); 
        invoiceSummary.invoiceShipmentInfo(2).then(function(value){
        	invoiceService=value;
    		console.log("service type on invoice screen"+invoiceService);
    		//expect(invoiceService).toEqual(orderService);
    	}); 
       
        invoiceSummary.invoiceShipmentInfo(4).then(function(value){
        	invoiceSiteName=value;
    		console.log("the site name on invoice screen"+invoiceSiteName);
    		expect(invoiceSiteName).toEqual(orderSiteName);
    	}); 
        salesOrderSummary.trackingAndInvoice(2).then(function(value){
        	invoiceTracking=value;
        	console.log("the tracking number data on invoice screen "+invoiceTracking);
    		expect(invoiceTracking).toEqual(orderTracking);
        });
        browser.sleep(1500);
    });
    browser.wait(function () {
        return SONumber != '';
    }).then(function () {      	
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
        browser.sleep(3000);
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.sleep(1000);
	});
	
	browser.wait(function () {
         return SONumber != '';
        }).then(function () {
        	callCenter.CallCenterPage();
     		callCenter.page("Sales Orders");
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Payments");
            salesOrderSummary.collapseIcon(2);    
            salesOrderSummary.orderPaymentAuth(4).then(function (value) {
				authorized = value;
			    console.log("the authorized amount before "+authorized);
				authorizedAmount=authorized.toString().substring(12);
			    console.log("the authorized amount is "+authorizedAmount);
			});	
            salesOrderSummary.orderCapturedAmount().then(function (value) {
            	captured= value;
				capturedAmount=captured.toString().substring(10);
			    console.log("the captured amount is "+capturedAmount);
			    expect(authorizedAmount).toEqual(capturedAmount);	    			    
			});	
            salesOrderSummary.orderPaymentAuth(3).then(function (value) {
            	status= value;
				method=status.toString().trim();
			    console.log("the Payment method is "+method);
			    expect(method).toContain("CREDIT_CARD");
			});
        });    
    	                
    });
	
	
	//TC: Verify Shipment information details on Invoice for Mixed Orders
	
	it("Verify_Shipment_information_On_Mixed_Order_invoice_TC0008", function() {
		
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
    	salesOrderSummary.salesOrderPane("Shipping Requests");
        salesOrderSummary.collapseIcon(1);   
        salesOrderSummary.fulFillmentNumber(1).then(function (value) {
        	console.log("the first FR number is "+FRNumbers.push(value))
		});      
        salesOrderSummary.collapseIcon(1);           
		salesOrderSummary.fulFillmentNumber(2).then(function (value) {
        	console.log("the second FR number is "+FRNumbers.push(value))
		})
    	
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
        
        for(i=0;i<FRNumbers.length;i++){
        	browser.get(fulfillmentRequestsUrl);
        	browser.sleep(2000);
	        commons.searchWithCriteria("Shipment Request #",'ends with',FRNumbers[i]);
	        callCenter.fulfillmentOrderSelectGear("Create Shipment");
	        browser.sleep(1000);
	        callCenter.shipAccountselect(browser.params.shipaccount);
	        callCenter.packageSelection(browser.params.packageValue);
	        callCenter.packageTrackingNumber(1236547890);
	        if(i==0){	        	
	        	returnsCreate.multiplePackages("1","2");
	        }
	        else{
	        	returnsCreate.multiplePackages("1","1");
	        }
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
	        
        }
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
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);          
            salesOrderSummary.shipmentRequestInfo(1).then(function(value){
            	orderSiteName=value.substr(6);
            	console.log("the site name is  "+orderSiteName);
            	
            });
            salesOrderSummary.shipmentRequestInfo(2).then(function(value){
            	orderCarrier=value.substr(9);
        		console.log("the Carrier in order screen is "+orderCarrier);    		
        	});
            
            salesOrderSummary.trackingAndInvoice(2).then(function(value){
            	orderTracking=value;
            	console.log("the tracking number data "+orderTracking);
            });
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            });  
            browser.refresh();
            
//getting the Shipment details from second line          
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(2);
            salesOrderSummary.shipmentRequestInfo(4).then(function(value){
            	orderBOPISSite=value.substr(6);
            	console.log("the second Order site name is  "+orderBOPISSite);
            });
            salesOrderSummary.shipmentRequestInfo(5).then(function(value){
            	orderBOPISCarrier=value.substr(9);
        		console.log("the Carrier in second order screen is "+orderBOPISCarrier);    		
        	});
            
            salesOrderSummary.trackingAndInvoice(6).then(function(value){
            	orderBOPISTracking=value;
            	console.log("the tracking number on BOPIS Order "+orderBOPISTracking);
            });
            browser.sleep(1000);
            salesOrderSummary.trackingAndInvoice(8).then(function(value){
            	INVNumber2=value;
            	console.log("the BOPIS invoice number is  "+INVNumber2);
            });      
        });
    });
    browser.wait(function () {
        return INVNumber != '';
    }).then(function () {  
        
        callCenter.OrdersPage();
        callCenter.page("Invoices");
        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
        salesOrderSummary.invoiceSelect();
        
//Invoice header level values            	
    	
        salesOrderSummary.orderAmount("Balance",1).then(function(value){
    		invoiceTotal=parseFloat(value.substring(1));
    		console.log("the invoice total at header level is "+invoiceTotal);
    		expect(invoiceTotal).toEqual(ordertotal2);
    	});

    	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
    		invoiceDiscount=parseFloat(value.substring(2,6));
    		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
    		expect(invoiceDiscount).toEqual(discount2);

    	});
    	
    	salesOrderSummary.orderAmount("Tax",1).then(function(value){
    		invoiceTax=parseFloat(value.substring(1));
    		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
    		expect(invoiceTax).toEqual((salesTax2+shippingTax2));
    	});    
    	
    	salesOrderSummary.salesOrderPane("Shipment Information");
        invoiceSummary.invoiceShipmentInfo(1).then(function(value){
        	invoiceCarrier=value;
    		console.log("carrier in invoice screen"+invoiceCarrier);
    		expect(invoiceCarrier).toEqual(orderCarrier);
    	}); 
        invoiceSummary.invoiceShipmentInfo(2).then(function(value){
        	invoiceService=value;
    		console.log("service type on invoice screen"+invoiceService);
    		//expect(invoiceService).toEqual(orderService);
    	}); 
       
        invoiceSummary.invoiceShipmentInfo(4).then(function(value){
        	invoiceSiteName=value;
    		console.log("the site name on invoice screen"+invoiceSiteName);
    		expect(invoiceSiteName).toEqual(orderSiteName);
    	}); 
        salesOrderSummary.trackingAndInvoice(2).then(function(value){
        	invoiceTracking=value;
        	console.log("the tracking number data on invoice screen "+invoiceTracking);
    		expect(invoiceTracking).toEqual(orderTracking);
        });
        browser.sleep(1500);
      });
    
	  browser.wait(function () {
	    return INVNumber2 != '';
	   }).then(function () {  
	    
		 browser.get(invoiceUrl)
        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber2);
	    salesOrderSummary.invoiceSelect();
	//Invoice 2  header level values            	
	    salesOrderSummary.orderAmount("Balance",1).then(function(value){
			invoiceTotal=parseFloat(value.substring(1));
			console.log("the invoice total at header level is "+invoiceTotal);
			expect(invoiceTotal).toEqual(ordertotal1);
		});
	
		salesOrderSummary.orderAmount("Discount:",2).then(function(value){
			invoiceDiscount=parseFloat(value.substring(2,6));
			console.log("The Total invoice discount at header level is  "+invoiceDiscount);
			expect(invoiceDiscount).toEqual(discount1);
	
		});
		
		salesOrderSummary.orderAmount("Tax",1).then(function(value){
			invoiceTax=parseFloat(value.substring(1));
			console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
			expect(invoiceTax).toEqual((salesTax1+shippingTax1));
		});    
		
		salesOrderSummary.salesOrderPane("Shipment Information");
	    invoiceSummary.invoiceShipmentInfo(1).then(function(value){
	    	invoiceCarrier=value;
			console.log("carrier in invoice screen"+invoiceCarrier);
			expect(invoiceCarrier).toEqual(orderBOPISCarrier);
		}); 
	    invoiceSummary.invoiceShipmentInfo(2).then(function(value){
	    	invoiceService=value;
			console.log("service type on invoice screen"+invoiceService);
			//expect(invoiceService).toEqual(orderService);
		}); 
	   
	    invoiceSummary.invoiceShipmentInfo(4).then(function(value){
	    	invoiceSiteName=value;
			console.log("the site name on invoice screen"+invoiceSiteName);
			expect(invoiceSiteName).toEqual(orderBOPISSite);
		}); 
	    salesOrderSummary.trackingAndInvoice(2).then(function(value){
	    	invoiceTracking=value;
	    	console.log("the tracking number data on invoice screen "+invoiceTracking);
			expect(invoiceTracking).toEqual(orderBOPISTracking);
	    });
	    browser.sleep(1500);
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
        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
        browser.refresh();
//Second invoice        
        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber2);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
    	});                
    });

	
//Invoice_10 :Verify the invoice amount being zero is moved to PAID status for the reshipment
	
	 it("Reship_invoice_Verification_TC0009", function() {
		
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
		browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
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
            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
            salesOrderSummary.salesOrderSelectGear("View");
            salesOrderSummary.salesOrderPane("Shipping Requests");
            salesOrderSummary.collapseIcon(1);
            salesOrderSummary.trackingAndInvoice(4).then(function(value){
            	INVNumber=value;
            	console.log("the invoice number is  "+INVNumber);
            });  
		  });
		});
	    browser.wait(function () {
	        return INVNumber != '';
	    }).then(function () {
	    	browser.sleep(1500);
	        callCenter.OrdersPage();
	        callCenter.page("Invoices");
	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
	        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
			browser.get(routeUrl);
	        browser.sleep(3000);
	        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
	        utils.status(5,1).then(function (value) {
				savedStatus = value;
			    console.log("the route status is "+savedStatus);	
			    utils.StopRoute(savedStatus,2);
			});	
	        expect(utils.status(5,1)).toEqual("STOPPED");
	       
       
    	});    
	    
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	browser.get(callCenterSalesOrdersListUrl);
	        salesOrderSummary.salesOrderSearch("Orginal Order#", SONumber);
            salesOrderSummary.salesOrderSelectGear("View");
            callCenter.editLineGear("1");
            callCenter.lineItemselectOptions("Re-Ship");
            invoiceSummary.reshipconfirm(browser.params.reshipreasoncode,browser.params.rejectComments);
            invoiceSummary.reshipConfirm();
            browser.sleep(2000);
    		salesOrderCreate.saveOption("Save");
    		salesOrderCreate.salesOrderNumber().then(function (value) {
    			reshipSONumber = value;
    		    console.log("sales order number"+reshipSONumber);
    		});
    		 callCenter.editLineGear("1");
    		 callCenter.lineItemselectOptions("Release");
    	        salesOrderSummary.orderRelease("Release",2);     
    	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
	        });
    	      //!*********fulfillment request**********!//
    	        browser.wait(function () {
    	            return reshipSONumber != '';
    	        	}).then( function () {
    	            callCenter.fullFillmentPage();
    	            callCenter.page("Fulfillment Requests");
    	            console.log("the re-ship sale sorder is "+reshipSONumber);
    	            salesOrderSummary.salesOrderSearch("Order #", reshipSONumber);
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
    	            salesOrderSummary.salesOrderSearch("Order #", reshipSONumber);
    	            salesOrderSummary.salesOrderStatus().then(function (status) {
    	                orderStatus = status;
    	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	                expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
    	                salesOrderSummary.salesOrderSelectGear("View");
    	                salesOrderSummary.salesOrderPane("Shipping Requests");
    	                salesOrderSummary.collapseIcon(1);
    	                salesOrderSummary.trackingAndInvoice(4).then(function(value){
    	                	INVNumber2=value;
    	                	console.log("the invoice number is  "+INVNumber2);
    	                });  
    	    		});
	    		});
	    	    browser.wait(function () {
	    	        return INVNumber2 != '';
	    	    }).then(function () {
	    	    	browser.sleep(1500);
	    	        callCenter.OrdersPage();
	    	        callCenter.page("Invoices");
	    	        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber2);
	    	        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
	    		    salesOrderSummary.invoiceSelect();
	    	        salesOrderSummary.orderAmount("Balance",1).then(function(value){
	    	    		invoiceTotal=parseFloat(value.substring(1));
	    	    		console.log("the invoice total at header level is "+invoiceTotal);
	    	    		expect(invoiceTotal).toEqual(0.00);
	    	    	});
	    	    	
	    	    	salesOrderSummary.orderAmount("Tax",1).then(function(value){
	    	    		invoiceTax=parseFloat(value.substring(1));
	    	    		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
	    	    		expect(invoiceTax).toEqual(0.00);
	    	    	});    
	    	    	
	    			browser.get(routeUrl);
	    	        browser.sleep(3000);
	    	        commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
	    	        utils.status(5,1).then(function (value) {
	    				savedStatus = value;
	    			    console.log("the route status is "+savedStatus);	
	    			    utils.StopRoute(savedStatus,2);
	    			});	
	    	        expect(utils.status(5,1)).toEqual("STOPPED");
	    	    });
	 });
	

/*	
	//Invoice_23: Verify if the return invoice is generated for v1 of order return
	
	 it("Return_Invoice_generation_Order_Return_TC0010", function() {
		
		 	browser.get(correlations);
		 	commons.searchWithCriteria('Name', 'ends with', 'returnsVersion');
		 	invoiceSummary.lineSelctor(2);
		 	invoiceSummary.keyValues().then(function (value) {
			    data = value;
			    console.log("the data are"+data);
			    invoiceSummary.invoiceCorrelation(data,"V1");
			});
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU4);
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
			browser.sleep(1000);
	        callCenter.lineItemselectOptions("Change Price");
	        callCenter.changingUnitPrice("50");
	        callCenter.editLineGear("3");
	        browser.sleep(1000);
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.discountButtonEditLine();
	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
	        callCenter.applyButton();
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
	           console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	           expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	           salesOrderSummary.salesOrderSelectGear("View");
	           salesOrderSummary.salesOrderPane("Shipping Requests");
	           salesOrderSummary.collapseIcon(1);
	           salesOrderSummary.trackingAndInvoice(4).then(function(value){
	           	INVNumber=value;
	           	console.log("the invoice number is  "+INVNumber);
	           });  
			  });
			});
		    browser.wait(function () {
		        return INVNumber != '';
		    }).then(function () {
		    	browser.sleep(1500);
		        callCenter.OrdersPage();
		        callCenter.page("Invoices");
		        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
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
			   // utils.closeIcon(1);
		        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
		    });  
 //!******orders Returns************!//	
	 browser.wait(function () {
	        return INVNumber != '';
	    }).then(function () {    
            browser.get(returnsUrl);
            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();
            returnsCreate.orderReturn(); 
            commons.customerLookup();
            commons.searchWithCriteria("Customer Contact First Name","contains",browser.params.custFirstName);
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
            commons.searchWithCriteria("Order #","ends with",SONumber);
            returnsCreate.selectOrder();
            returnsCreate.selectAllLineitem();
            returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
            returnsCreate.saveReturns();             
            //returnsCreate.returnReason("1", "DAMAGED");
            returnsCreate.totalReturnsItem("DAMAGED");
            browser.sleep(2000);           
            returnsCreate.creditType("REFUND");            
            browser.sleep(3000);
            returnsEdit.saveReturns();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber = value.substring(34,44);
                console.log("the RMA number is "+RMANumber)
            });
            returnsEdit.saveAndReleaseReturns();
            browser.sleep(3000);          
            returnsCreate.RMAGenerate();
            browser.sleep(2000);
	    });
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });
                browser.sleep(2000);
                returnsEdit.selectRMALineClickForReceive();
                browser.sleep(2000);
                callCenter.editLineGear("1")
                browser.sleep(1000);
                callCenter.lineItemselectOptions("Receive Inventory");
                browser.sleep(3000);
                returnsEdit.selectInvPool(browser.params.InvPool);
                returnsEdit.itemReceive();
                browser.sleep(1000);
            });    
            
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
            	
            	browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnStatus);
		            expect(orderReturnStatus).toEqual('RECEIVED');

	            });
                
               browser.get(routeUrl);
 		       commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');		        
 		       utils.status(5,1).then(function (value) {
 					savedStatus = value;
 				    console.log("the route status is "+savedStatus);	
 				    utils.startingReturnInvoiceRoute(savedStatus,2);
 				});	
 		       	expect(utils.status(5,1)).toEqual("STARTED");
 		       	browser.sleep(4000); 
 		        callCenter.OrdersPage();
		        callCenter.page("Invoices");
 		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber); 	
 		        batchCreate.shipmentstatus(5,1).then(function(value){
 		        	invoiceType=value;
 		        	expect(invoiceType).toEqual("Return");
 		        	 		        	
 		        });
 		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
 		       commons.pageHeader("Integration");
		        commons.page("Jobs");
		        salesOrderSummary.jobExecution();
		        commons.searchWithCriteria('Name', 'ends with', browser.params.returnpaymentJob);
		        utils.startJob(1);
		        browser.sleep(1000);
		        callCenter.OrdersPage();
		        callCenter.page("Invoices");
		        browser.refresh();
 		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber); 		   		
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
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
                	expect(grandtotal1).toEqual(ordertotal1);
                
                });          
                salesOrderSummary.invoiceamount("total",8).then(function (status) {
                	grandtotal=parseFloat(status.substring(1));
                	console.log("grandtotal for invoice "+grandtotal);
                	expect(grandtotal).toEqual((grandtotal1));
                	expect(grandtotal).toEqual((ordertotal1));
                });
                
                browser.get(routeUrl);
		        browser.sleep(3000);
		        commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');		        
		        utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    utils.StopRoute(savedStatus,2);
				});	
		        expect(utils.status(5,1)).toEqual("STOPPED");	     
                
            }); 
	 });
 
	//TC_Invoice_24: Verify if the return invoice is generated for v2 of order return
		
	 it("Return_Invoice_generation_Call center_Return_V2_TC0011", function() {
		
		 	browser.get(correlations);
		 	commons.searchWithCriteria('Name', 'ends with', 'returnsVersion');
		 	invoiceSummary.lineSelctor(1);
		 	invoiceSummary.keyValues().then(function (value) {
			    data = value;
			    console.log("the data are"+data);
			    invoiceSummary.invoiceCorrelation(data,"V2");
			});
			browser.get(callcenterorder);
			salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU4);
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
			browser.sleep(1000);
	        callCenter.lineItemselectOptions("Change Price");
	        callCenter.changingUnitPrice("50");
	        callCenter.editLineGear("3");
	        browser.sleep(1000);
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.discountButtonEditLine();
	        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
	        callCenter.applyButton();
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
	           console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	           expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
	           salesOrderSummary.salesOrderSelectGear("View");
	           
	           util.currentURL().then(function(value){
	            	url=value;
	            	SOId=url.substring(65,101);
	    	        console.log("the Sales Order Id is "+SOId);
	           
	           });
	           salesOrderSummary.salesOrderPane("Shipping Requests");
	           salesOrderSummary.collapseIcon(1);
	           
	           salesOrderSummary.shipmentRequestNo(1).then(function(value){
		        	FRNumber1=value;
		        	console.log("the  FR Number is  "+FRNumber1);
		        	
		        });	
	           
	           salesOrderSummary.trackingAndInvoice(4).then(function(value){
	           	INVNumber=value;
	           	console.log("the invoice number is  "+INVNumber);
	           });  
			  });
			});
		    browser.wait(function () {
		        return INVNumber != '';
		    }).then(function () {
		    	browser.sleep(1500);
		        callCenter.OrdersPage();
		        callCenter.page("Invoices");
		        salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
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
			   // utils.closeIcon(1);
		        commons.searchWithCriteria("Invoice Number",'ends with',INVNumber);
		        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
		    }); 
		    
		     //!***call center returns****!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
            browser.get(callCenterReturnsUrl);
            console.log("the sale sorder # in returns screen "+SONumber)
	        returnsCreate.createNewRMA();
	        commons.searchWithCriteria('Order #', 'ends with', SONumber);
	        returnsCreate.orderSelectForReturnClick();
	        commons.search();
	        returnsCreate.orderSelectForReturnCheckBox();
	        returnsCreate.OrderSelectionButtonCartIcon();
	        returnsCreate.returningLocationDropDown(browser.params.returninglocation);
	        browser.sleep(1000);
	        returnsCreate.EditLine();
	        browser.sleep(1000);
	        returnsCreate.addNewLine();
	        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
	        browser.sleep(1000);
	        commons.save(); //saving the returning line
	        browser.sleep(1000);
	        commons.save(); //saving the RMA
	        returnsCreate.getRMANumber().then(function(value) {
                RMAdata = value.substring(14, 24);
                RMANumber = RMAdata;
                console.log("the RMA Number is: "+RMANumber);
                })
            returnsCreate.RMASubmit();
            browser.sleep(2000);
            browser.get(callCenterReturnsUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            returnsCreate.RMAStatus().then(function (status) {
                RMAStatus = status;
                console.log("the status of the RMA for the order #"+SONumber+" is: "+RMAStatus);
                expect(RMAStatus).toEqual("OPEN");

            	})	       
	        });
		
	            browser.sleep(2000);	        	        
	        //!**********RMA Returns*********!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
	        	browser.get(RMAReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMASelect();
	            browser.sleep(1000);
	            returnsCreate.inspectclick();
	            returnsCreate.getRMAQuantity().then(function(value) {
	                InspectedQTY = value;
	                expect(InspectedQTY).toEqual('1');
	            })
	            returnsCreate.inspectDetails("DAMAGED","This is a Test");  	
	            commons.save(); //saving disposition
		        browser.sleep(1000);
		        returnsCreate.inspectSubmit();
		        browser.sleep(3000);
	            browser.get(callCenterReturnsUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	RMAInspectedStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	                expect(RMAInspectedStatus).toEqual("INSPECTED");
	            })
	            browser.sleep(2000);	           
	            //!*****Adding payment disposition**********!//
	        	browser.get(paymentDispositionUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	  	            	RMAInspectedStatus = status;
	  	                console.log("the status of the RMA #"+ RMANumber+" after inspection is : "+RMAInspectedStatus);
	  	                expect(RMAInspectedStatus).toEqual("INSPECTED");
	  	          })
	            invoiceSummary.lineSelctor(1)
	            returnsCreate.refundtype(browser.params.refundMethod);	          
	            commons.save();
	            returnsCreate.paymentDispositionSubmit();
	            browser.sleep(3000);   
	        	browser.get(paymentDispositionUrl);
	        	browser.sleep(3000);
	            salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            returnsCreate.RMAStatus().then(function (status) {
	            	paymentDispositionStatus = status;
		                console.log("the payment status of the RMA #"+ RMANumber+" after payment Disposition is : "+paymentDispositionStatus);
		                expect(paymentDispositionStatus).toEqual("PENDING PAYMENT");
		                });
	            invoiceSummary.lineSelctor(1)
	            browser.sleep(3000);
	        	util.currentURL().then(function(value){
	            	url=value;
	    	        RMAId=url.substring(83,119);
	    	        console.log("the RMA Id is "+RMAId);
	    	       });
	        	});
	 		});
	       	 it("Getting the RMA response", done =>{
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
	       	 		});
	                //sending the PUT Request
	       	 it("updating the RMA status ", done =>{
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
	 	it("creating the return invoice", function() {
	            browser.wait(function () {
	                return RMANumber != '';
	            }).then(function () {
	                browser.get(callCenterReturnsUrl);
	            	salesOrderSummary.salesOrderSearch("Original Order #", RMANumber);
	            	returnsCreate.RMAStatus().then(function (status) {
	            	RMAStatus = status;
		                console.log("the  status of the RMA #"+ RMANumber+" after RECEIVE  is : "+RMAStatus);
		                expect(RMAStatus).toEqual("RECEIVED");
	            	});	            
	           //!******CREATING THE RETURN INVOICE*********!//
	            browser.get(routeUrl);
	            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
	            utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    returnsCreate.StopRoute(savedStatus,3);
				});	
	            expect(utils.status(5,1)).toEqual("STARTED");
	            browser.sleep(4000); 
	            browser.wait(function () {
		        return INVNumber != '';
			    }).then(function () {
			  		callCenter.OrdersPage();
			        callCenter.page("Invoices");
	 		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber); 		   		
	 		        expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
	 		        commons.pageHeader("Integration");
			        commons.page("Jobs");
			        salesOrderSummary.jobExecution();
			        commons.searchWithCriteria('Name', 'ends with', browser.params.returnpaymentJob);
			        utils.startJob(1);
			        browser.sleep(1000);
			        callCenter.OrdersPage();
			        callCenter.page("Invoices");
			        browser.refresh();
	 		        salesOrderSummary.salesOrderSearch("Original Order #", SONumber); 		   		
			        expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
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
	                	expect(grandtotal1).toEqual(ordertotal1);
	                });          
	                salesOrderSummary.invoiceamount("total",8).then(function (status) {
	                	grandtotal=parseFloat(status.substring(1));
	                	console.log("grandtotal for invoice "+grandtotal);
	                	expect(grandtotal).toEqual((grandtotal1));
	                	expect(grandtotal).toEqual((ordertotal1));
	                });
		                browser.get(routeUrl);
			            browser.sleep(3000);
			            commons.searchWithCriteria('Name', 'starts with', 'invoiceForReturns');
			            utils.status(5,1).then(function (value) {
							savedStatus = value;
						    console.log("the route status is "+savedStatus);	
						    returnsCreate.StopRoute(savedStatus,3);
						});	
			            expect(utils.status(5,1)).toEqual("STOPPED");
		           });
	        });
	 });
	*/
	//Invoice_22: Verify that invoice is generated for partial shipments - 
   it("Verify_invoice_generation_for_partial_shipments_TC0012", function() {
		
		browser.get(callcenterorder);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU2);
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

    
  //!*********fulfillment request**********!//
    browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
    		browser.get(storePortalV2Url);
	        commons.searchWithCriteria('Order #','ends with', SONumber);
	        invoiceSummary.lineSelctor(1);
	        browser.sleep(1000);
	        batchCreate.selectFromTheSearch(1);
	        browser.sleep(1000);
	       // batchCreate.qtyInc(1,2);
	        batchCreate.PickConfirm("Accept Order");
	        batchCreate.submitPack("Confirm");
	        batchCreate.submitPack("Pack & Ship");		        
	        batchCreate.selectFromTheSearch(1);
	        batchCreate.qtyInc(1,1);
	        batchCreate.qtyInc(2,1);
	        batchCreate.submitPack("Include in Package");
	        salesOrderSummary.packageSelectionV2(1,browser.params.packageValue);
	        batchCreate.submitPack("Add Package");
	        batchCreate.submitPack("Complete Fulfillment");
		    batchCreate.rejectreason(1,"P	roduct Damaged")
		    salesOrderSummary.storePortalV2Reject("Product Damaged","This is a test")
		    salesOrderSummary.CNFButton();
		});
    	browser.wait(function () {
        return SONumber != '';
    	}).then( function () {
	    	callCenter.CallCenterPage();
			callCenter.page("Sales Orders");
			salesOrderSummary.salesOrderSearch("Original Order #", SONumber);	
	        salesOrderSummary.salesOrderSelectGear("View");
	        callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);
	        salesOrderSummary.salesOrderPane("Shipping Requests");
	        salesOrderSummary.collapseIcon(1);
	        expect(salesOrderSummary.FRNumbers().count()).toEqual(2);
	        salesOrderSummary.shipmentRequestNo(1).then(function(value){
	        	FRNumber2=value;
	        	console.log("the second FR Number is  "+FRNumber2);
	        	
	        });	
    	});
    	 browser.wait(function () {
	        return SONumber != '';
	    	}).then( function () {
		        callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
		        console.log("the FR Request is "+FRNumber2);
		        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber2);
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
		        callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
		        browser.refresh();
		        commons.searchWithCriteria('Order #','ends with', SONumber);
		        browser.sleep(2500)
	    		salesOrderSummary.invoiceSelect();
		        browser.sleep(5000);
		        invoiceSummary.shipmentPane();
		        invoiceSummary.shipmentClick();
		        callCenter.editLineGear("1");
		        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
		        
				browser.get(routeUrl);
				commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
				utils.status(5,1).then(function (value) {
					savedStatus = value;
				    console.log("the route status is "+savedStatus);	
				    utils.startingReturnInvoiceRoute(savedStatus,2);
				});	
				expect(utils.status(5,1)).toEqual("STARTED");
				browser.sleep(2500);
				browser.get(routeUrl);
                browser.sleep(3000);
                commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
                utils.status(5,1).then(function (value) {
    				savedStatus = value;
    			    console.log("the route status is "+savedStatus);	
    			    returnsCreate.StopRoute(savedStatus,2);
    			});	
                expect(utils.status(5,1)).toEqual("STOPPED");
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
        browser.sleep(1000);
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
    });
	//Invoice_8: Verify Parent order details on Shipment Invoice for Subscription Order
/*
	it("Verify_Parent_order_details_on_Shipment_Invoice_for_Subscription_Order_TC0013", function() {
		
    	browser.get(correlations);
	 	commons.searchWithCriteria('Name', 'ends with', 'RSOJobLastExecutionDate');
	 	invoiceSummary.lineSelctor(1);
 		invoiceSummary.correlationDataValue(browser.params.subscriptionpastdate);
 		browser.sleep(1500);
    	browser.get(callcenterorder);
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		salesOrderCreate.orderTypeSelection(browser.params.orderType);
		salesOrderSummary.salesOrderSearch('SKU', browser.params.searchValueSKU1);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		browser.sleep(1000);
		callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Change Price");
        callCenter.changingUnitPrice("50");
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.discountButtonEditLine();
        callCenter.applyDiscount("Percentage", "10", "EmployeeDiscount", "desc1","notes1");
        callCenter.applyButton();
        callCenter.editLinePopUpSaveBtn(); 
    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(2000);
		salesOrderCreate.saveOption("Save as Draft");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		    console.log("sales order number"+SONumber);
		});
		
		util.pencilButtonEdit(6);
		salesOrderCreate.subscriptionEndDate();
		util.pencilButtonEdit(7);
		salesOrderCreate.SubscriptionFrequency(browser.params.subscription);
		util.pencilButtonEdit(8);
		salesOrderCreate.day();
	    salesOrderSummary.CNFButton();
		salesOrderCreate.saveOption("Save");
		salesOrderCreate.salesOrderNumber().then(function (value) {
		    SONumber = value;
		   // console.log("sales order number"+SONumber);
		});
		
		salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});	
		 salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
     		unitPrice1=parseFloat(value.substring(1));
     		console.log("the Unit price Subscriptipon order is "+unitPrice1);
     		
     	});
     	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
     		linePrice1=parseFloat(value.substring(1));
     		console.log("total Line Price Subscriptipon order is "+linePrice1);
     		
     	});
     	salesOrderSummary.lineamount("Discount:",1).then(function(value){
     		discount1=parseFloat(value.substring(2,6));
     		console.log("The Total discount Subscriptipon order is  "+discount1);
     		
     	});
     	salesOrderSummary.lineamount("S & H:",1).then(function(value){
     		shippingAndHandling1=parseFloat(value.substring(1));
     		console.log("Total shipping and handling charge Subscriptipon order is  "+shippingAndHandling1);
     		
     	});
     	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
     		salesTax1=parseFloat(value.substring(1));
     		console.log("The total Sales Tax Subscriptipon order is "+salesTax1);
     		
     	});        	
     	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
     		shippingTax1=parseFloat(value.substring(1));
     		console.log("The Shipping Tax Subscriptipon order is "+shippingTax1);
     		
     	});
     	
     	salesOrderSummary.Totalamount("Total:",1).then(function(value){
     		ordertotal1=parseFloat(value.substring(1));
     		console.log("The line1 total Subscriptipon order is "+ordertotal1);
     		
     	});
     	 browser.wait(function () {
 	        return SONumber != '';
 	    }).then(function () {
			commons.pageHeader("Integration");
	        commons.page("Jobs");
	        salesOrderSummary.jobExecution();
	        commons.searchWithCriteria('Name', 'ends with', browser.params.subscriptionJob);
	        utils.startJob(1);
	        salesOrderSummary.jobStatus();
	        invoiceSummary.refreshJob();
	        browser.sleep(2000);
	        callCenter.CallCenterPage();
			callCenter.page("Sales Orders");
			browser.refresh();
	      	commons.searchWithCriteria("Original Order #","ends with",SONumber)
	        salesOrderSummary.salesOrderSelectGear("View");
	        salesOrderSummary.salesOrderPane("Subscription Releases");
	        browser.sleep(1000);
	        salesOrderSummary.subscriptionOrderNumber(1).then (function(value){
	        	subSONumber=value;
	        	console.log("the subscription order number is "+subSONumber); 	        	
	        });
 	    });
        browser.wait(function () {
	        return subSONumber != '';
	    }).then(function () {
	        callCenter.CallCenterPage();
			callCenter.page("Sales Orders");
			util.closeIcon(2);
			 commons.searchWithCriteria("Original Order #","ends with",subSONumber)
			salesOrderSummary.salesOrderSelectGear("View");
	        callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);     
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");
	        salesOrderSummary.lineamount("Unit Price:",1).then(function (value){
        		unitPrice1=parseFloat(value.substring(1));
        		console.log("the Unit price is "+unitPrice1);
        		
        	});
        	salesOrderSummary.lineamount("Line Price:",1).then(function(value){
        		linePrice2=parseFloat(value.substring(1));
        		console.log("total Line Price in Sales Order is "+linePrice2);
        		
        	});
        	salesOrderSummary.lineamount("Discount:",1).then(function(value){
        		discount2=parseFloat(value.substring(2,6));
        		console.log("The Total discount in Sales Order is  "+discount2);
        		
        	});
        	salesOrderSummary.lineamount("S & H:",1).then(function(value){
        		shippingAndHandling2=parseFloat(value.substring(1));
        		console.log("Total shipping and handling charge in Sales Order is "+shippingAndHandling2);
        		
        	});
        	salesOrderSummary.lineamount("Sales Tax:",1).then(function(value){
        		salesTax2=parseFloat(value.substring(1));
        		console.log("The total Sales Tax in Sales Order is "+salesTax2);
        		
        	});        	
        	salesOrderSummary.lineamount("Shipping Tax:",1).then(function(value){
        		shippingTax2=parseFloat(value.substring(1));
        		console.log("The Shipping Tax in Sales Order is "+shippingTax2);
        		
        	});
        	
        	salesOrderSummary.Totalamount("Total:",1).then(function(value){
        		ordertotal2=parseFloat(value.substring(1));
        		console.log("The line1 total in Sales Order is "+ordertotal2);
        		
        	});
//Order level values
        	salesOrderSummary.orderAmount("Total",4).then(function(value){
        		orderTotal=parseFloat(value.substring(1));
        		console.log("the Order total in header level is "+orderTotal);
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
        		console.log("The Shipping Tax at order level is "+orderShippingTax);
        	});
	    
	    });	    	   
    //!*********fulfillment request**********!//
 	       browser.wait(function () {
 	       return subSONumber != '';
 		   	}).then( function () {
 		       callCenter.fullFillmentPage();
 		       callCenter.page("Fulfillment Requests");
 		       console.log("the sale sorder is "+subSONumber);
 		       salesOrderSummary.salesOrderSearch("Original Order #", subSONumber);
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
 		       browser.get(routeUrl);
 		       commons.searchWithCriteria('Name', 'starts with', 'invoiceForShipments');		        
 		       utils.status(5,1).then(function (value) {
 					savedStatus = value;
 				    console.log("the route status is "+savedStatus);	
 				    utils.startingReturnInvoiceRoute(savedStatus,2);
 				});	
 		       	//expect(utils.status(5,1)).toEqual("STARTED");
 		       	browser.sleep(4000);    
 		   	});   
 	       browser.wait(function () {
            return subSONumber != '';
 	       }).then(function () {     
 	    	   callCenter.CallCenterPage();
 	    	   callCenter.page("Sales Orders");
        	   salesOrderSummary.salesOrderSearch("Original Order #", subSONumber);
        	   salesOrderSummary.salesOrderStatus().then(function (status) {
		           orderStatus = status;
		           console.log("the status of the order #"+subSONumber+" is: "+orderStatus);
		           expect(salesOrderSummary.salesOrderStatus()).toEqual('INVOICED');
        	   });
	           salesOrderSummary.salesOrderSelectGear("View");
	           salesOrderSummary.salesOrderPane("Shipping Requests");
	           salesOrderSummary.collapseIcon(1);
	           
	           salesOrderSummary.shipmentRequestInfo(1).then(function(value){
	            	orderSiteName=value.substr(6);
	            	console.log("the site name is  "+orderSiteName);
	            	
	            });
	            salesOrderSummary.shipmentRequestInfo(2).then(function(value){
	            	orderCarrier=value.substr(9);
	        		console.log("the Carrier in order screen is "+orderCarrier);    		
	        	});
	            
	            salesOrderSummary.trackingAndInvoice(2).then(function(value){
	            	orderTracking=value;
	            	console.log("the tracking number data "+orderTracking);
	            });
	           
	           salesOrderSummary.trackingAndInvoice(4).then(function(value){
	           	INVNumber=value;
	           	console.log("the invoice number for subscription order is  "+INVNumber);
	           });  
    	   });
    	   browser.wait(function () {
   	        return INVNumber != '';
       	    }).then(function () {
       	    	browser.sleep(1500);
                callCenter.OrdersPage();
                callCenter.page("Invoices");
                salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
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
               salesOrderSummary.invoiceamount("tax",3).then(function (status) {
               	invoicesalesTax1=parseFloat(status.substring(1));
               	console.log("total salesTax for line1 in invoice "+invoicesalesTax1);
               	//need to add expect condition
               	expect(invoicesalesTax1).toEqual((salesTax1+shippingTax1))
               });                
               salesOrderSummary.invoiceamount("tax",4).then(function (status) {
               	totalwithTax1=parseFloat(status.substring(1));
               	console.log("total with tax for line1 in invoice "+totalwithTax1);
               	expect(totalwithTax1).toEqual(parseFloat((total1+invoicesalesTax1).toFixed(2)));
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
               	expect(grandtotal1).toEqual(ordertotal1);
               
               });
         
       //Invoice header level values            	
           	salesOrderSummary.orderAmount("Balance",1).then(function(value){
           		invoiceTotal=parseFloat(value.substring(1));
           		console.log("the invoice total at header level is "+invoiceTotal);
           		expect(invoiceTotal).toEqual(orderTotal);
           	});

           	salesOrderSummary.orderAmount("Discount:",2).then(function(value){
           		invoiceDiscount=parseFloat(value.substring(2,6));
           		console.log("The Total invoice discount at header level is  "+invoiceDiscount);
           		expect(invoiceDiscount).toEqual(orderDiscount);

           	});
           	
           	salesOrderSummary.orderAmount("Tax",1).then(function(value){
           		invoiceTax=parseFloat(value.substring(1));
           		console.log("The total sales and  shipping Tax for invoice at header level is "+invoiceTax);
           		expect(invoiceTax).toEqual((orderSalesTax+orderShippingTax));
           	});   
               salesOrderSummary.salesOrderPane("Shipment Information");
               
               invoiceSummary.invoiceShipmentInfo(1).then(function(value){
               	invoiceCarrier=value;
           		console.log("carrier in invoice screen"+invoiceCarrier);
           		expect(invoiceCarrier).toEqual(orderCarrier);
           	}); 
               invoiceSummary.invoiceShipmentInfo(2).then(function(value){
               	invoiceService=value;
           		console.log("service type on invoice screen"+invoiceService);
           		//expect(invoiceService).toEqual(orderService);
           	}); 
               invoiceSummary.invoiceShipmentInfo(4).then(function(value){
               	invoiceSiteName=value;
           		console.log("the site name on invoice screen"+invoiceSiteName);
           		expect(invoiceSiteName).toEqual(orderSiteName);
           	}); 
               salesOrderSummary.trackingAndInvoice(2).then(function(value){
               	parentOrder=value;
               	console.log("the Parent order data is  "+parentOrder);
           		expect(parentOrder).toContain(SONumber);
           		expect(parentOrder).toContain("SUBSCRIPTION");
               });
               salesOrderSummary.trackingAndInvoice(3).then(function(value){
                  	trackingnumber=value;
                  	console.log("the Tracking number  is  "+trackingnumber);
              		expect(trackingnumber).toEqual(orderTracking);
                  });
            browser.sleep(1500);
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
            browser.sleep(3000);
            callCenter.OrdersPage();
            callCenter.page("Invoices");
            salesOrderSummary.salesOrderSearch("Invoice Number", INVNumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');
            browser.sleep(1000);
        	});   
    
    });*/
});

var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var batchPickCreate = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.create.screen.js');
var batchPickEdit = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.edit.screen.js');
var batchPickSummary = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');

global.orderStatus = "";
global.SONumber = "";
global.SONumber1 = "";
global.SONumber2 = "";
global.BatchId = "";
global.FRNumber = "";
global.FRNUmber2 = "";
var SONumbers = [];
global.singleLineBB="";
global.singleLineAB="";
global.multiLineBB="";
global.multiLineAB="";
global.totalLineBB="";
global.totalLineAB="";
global.aftertotalline="";
var salesorders = [];
var salesorders1= [];
global.rejectqty1 = "";
global.rejectqty2 = "";
var Date="";
var ordernumbers =[]; 


//create a batch with single line and complete fulfillment.TC1
//create a batch with single FR multiple lines and complete fulfillment.TC2
//create a batch with single FR multiple lines multiple QTY and complete fulfillment.TC3


describe("Batch Pick: ", function() {
	  	var batchCreate = new batchPickCreate();
	    //var batchEdit = new batchPickEdit();
	    //var batchSummary = new batchPickSummary();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	  	var returnsCreate = new returnsCreateScreen();
		utils.Login(browser.params.login.user,browser.params.login.password);	
	
	 it("Reject Single line single QTY completely TC0009", function() {
		
	    	browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        commons.search();
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrderFromSalesOrder();
	        callCenter.attachCustomer();
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        salesOrderCreate.selectCustomer();
	        salesOrderCreate.useSelectedCustomer();
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });

	        browser.sleep(2000);
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1500);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });
	        
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            batchCreate.CreateNewBatch();
	            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
	            batchCreate.selectSite();
	            batchCreate.siteConfirm();
	            batchCreate.Linecount(2);//Single Line Only
	            batchCreate.fullfillmentType(2)
	            batchCreate.minFRRequest(1);
	            batchCreate.maxFRRequest(100);
	            batchCreate.requestDeliveryDate(browser.params.promiseddate);
	            batchCreate.packageType(browser.params.packageValue);
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
	            return BatchId != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
		        commons.searchWithCriteria('Batch Id','ends with', BatchId);
		        batchCreate.rejectLineSelect();
		        batchCreate.rejectshipmentdropdown();
		        batchCreate.rejectShipment();
		        salesOrderSummary.shipmentRejectPopup("Product Damaged", "this is a Test")
		        batchCreate.rejectCNF();
		        browser.sleep(2000);
	        });
	         browser.wait(function () {
		            return SONumber != '';
		        }).then(function () {
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(1000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO ALLOCATE');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("FAILED TO ALLOCATE");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(orderStatus).toEqual("REJECTED");
		            browser.sleep(2000);
	            });
	        });
	});
	   
	    it("Reject Single line  Partial QTY TC0010", function() {
    	
	    	browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
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
	        callCenter.editSKUQuantity("5");
	        callCenter.editLinePopUpSaveBtn();
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(1500);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });
	        browser.sleep(5000);
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });
	        
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            batchCreate.CreateNewBatch();
	            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
	            batchCreate.selectSite();
	            batchCreate.siteConfirm();
	            batchCreate.fullfillmentType(2);
	            batchCreate.Linecount(2);//multiple Line Only
	            batchCreate.minFRRequest(1);
	            batchCreate.maxFRRequest(100);
	            batchCreate.requestDeliveryDate(browser.params.promiseddate);
	            batchCreate.packageType(browser.params.packageValue);
	            batchCreate.createBatchConfirm();
	            browser.sleep(5000);
	            batchCreate.BatchNumber().then(function (batchnumber) {
	                batch = batchnumber;
	                BatchId = batchnumber.substring(7, 19)
	                console.log("the Batch ID is "+BatchId);
	            });	            
	            batchCreate.close();
	        	});
	        
	       
	        browser.wait(function () {
	            return BatchId != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
		        commons.searchWithCriteria('Batch Id','ends with', BatchId);
		        //batchCreate.rejectLineSelect();
		        batchCreate.selectlineclick();
		        browser.sleep(1000);
		        batchCreate.selectFromTheSearch(1);
		        browser.sleep(1000);
		        batchCreate.qtyInc(1,2);
		        batchCreate.rejectreason(1,"Product Damaged")
		        batchCreate.PickConfirm("Accept Order");
		        batchCreate.submitPack("Confirm");
		        batchCreate.submitPack("Pack & Ship");		        
		        batchCreate.selectFromTheSearch(2);
		        batchCreate.qtyInc(1,2);
		        batchCreate.submitPack("Include in Package");
		        batchCreate.submitPack("Add Package");
		        batchCreate.submitPack("Complete Fulfillment"); 
	        });
	         browser.wait(function () {
		            return SONumber != '';
		        }).then(function () {
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            });
	        });
	});
    
 it("Reject multiple line Single QTY Partially TC0011", function() {
	    	
	    	browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        callCenter.attachCustomer();
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        salesOrderCreate.selectCustomer();
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(1000)
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        commons.search();
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrderFromSalesOrder();
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU3);
	        callCenter.selectSKUFromSearch();
	        commons.search();
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrderFromSalesOrder();
	        browser.sleep(500);
	        callCenter.editLineGear("3");
	        browser.sleep(500);
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("5");
	        callCenter.editLinePopUpSaveBtn();
	        callCenter.editLineGear("4");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("5");
	        callCenter.editLinePopUpSaveBtn();
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(1000);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });

	        browser.sleep(2000);
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });
	        
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            batchCreate.CreateNewBatch();
	            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
	            batchCreate.selectSite();
	            batchCreate.siteConfirm();
	            batchCreate.Linecount(3);//multiple Line Only
	            batchCreate.fullfillmentType(2);
	            batchCreate.minFRRequest(1);
	            batchCreate.maxFRRequest(100);
	            batchCreate.requestDeliveryDate(browser.params.promiseddate);
	            batchCreate.packageType(browser.params.packageValue);
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
	            return BatchId != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
	        	browser.sleep(2000);
		        commons.searchWithCriteria('Batch Id','ends with', BatchId);
		        batchCreate.selectlineclick();
		        batchCreate.selectFromTheSearch(1);
		        browser.sleep(1000);
		        batchCreate.qtyInc(1,3);
		        browser.sleep(1000);
		        batchCreate.qtyInc(2,5);
		        browser.sleep(1000);
		        batchCreate.rejectreason(1,"Product Damaged");
		        batchCreate.PickConfirm("Accept Order");
		        batchCreate.submitPack("Confirm");
		        batchCreate.submitPack("Pack & Ship");		        
		        browser.sleep(2000);
		        batchCreate.selectFromTheSearch(1);
		        batchCreate.qtyInc(1,3);
		        batchCreate.qtyInc(2,5);
		        batchCreate.submitPack("Include in Package");
		        batchCreate.submitPack("Add Package");
		        batchCreate.submitPack("Complete Fulfillment");

	        });
	         browser.wait(function () {
		            return SONumber != '';
		        }).then(function () {
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(1000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	  
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
		            expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(orderStatus).toEqual("SHIPMENT CREATED");
		            browser.sleep(2000);
	            });
	        });
	});    
	    
 it("Reject multiple line multiple QTY Partially TC0012", function() {
 	
 	browser.get(callcenterorder);
     browser.driver.manage().window().maximize();
     callCenter.attachCustomer();
     callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
     salesOrderCreate.selectCustomer();
     salesOrderCreate.useSelectedCustomer();
     browser.sleep(1000)
     salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
     callCenter.selectSKUFromSearch();
     commons.search();
     callCenter.selectSKUFromResults();
     callCenter.addToOrderFromSalesOrder();
     salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU3);
     callCenter.selectSKUFromSearch();
     commons.search();
     callCenter.selectSKUFromResults();
     callCenter.addToOrderFromSalesOrder();
     browser.sleep(500);
     callCenter.editLineGear("3");
     callCenter.lineItemselectOptions("Edit Line");
     browser.sleep(1000);
     callCenter.editSKUQuantity("5");
     browser.sleep(2000);
     callCenter.editLinePopUpSaveBtn();
     callCenter.editLineGear("4");
     callCenter.lineItemselectOptions("Edit Line");
     browser.sleep(1000);
     callCenter.editSKUQuantity("5");
     browser.sleep(2000);
     callCenter.editLinePopUpSaveBtn();
     //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
     browser.sleep(1000);
     salesOrderCreate.saveOption("Save");
     salesOrderCreate.salesOrderNumber().then(function (value) {
         SONumber = value;
         console.log("sales order number"+SONumber);
     });

     browser.sleep(2000);
     
     //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
     browser.wait(function () {
         return SONumber != '';
     }).then(function () {
         browser.get(callCenterSalesOrdersListUrl);
         salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
         browser.sleep(2000);
         salesOrderSummary.salesOrderSelectGear("Release");
         salesOrderSummary.salesOrderStatus().then(function (status) {
             orderStatus = status;
             console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

         });
     });
     
     browser.wait(function () {
         return SONumber != '';
     }).then(function () {
         browser.get(batchPickUrl);
         batchCreate.CreateNewBatch();
         batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
         batchCreate.selectSite();
         batchCreate.siteConfirm();
         batchCreate.Linecount(3);//multiple Line Only
         batchCreate.fullfillmentType(2);
         batchCreate.minFRRequest(1);
         batchCreate.maxFRRequest(100);
         batchCreate.requestDeliveryDate(browser.params.promiseddate);
         batchCreate.packageType(browser.params.packageValue);
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
         return BatchId != '';
     }).then(function () {
     	
     	browser.get(storePortalV2Url);
     	browser.sleep(2000);
	        commons.searchWithCriteria('Batch Id','ends with', BatchId);
	        //batchCreate.rejectLineSelect();
	        batchCreate.selectlineclick();
	        batchCreate.selectFromTheSearch(1);
	        batchCreate.qtyInc(1,3);
	        batchCreate.rejectreason(1,"Product Damaged");
	        batchCreate.qtyInc(2,3);
	        batchCreate.rejectreason(2,"Product Damaged");
	        batchCreate.PickConfirm("Accept Order");
	        batchCreate.submitPack("Confirm");
	        batchCreate.submitPack("Pack & Ship");		        
	        browser.sleep(2000);
	        batchCreate.selectFromTheSearch(1);
	        batchCreate.qtyInc(1,3);
	        batchCreate.qtyInc(2,3);
	        batchCreate.submitPack("Include in Package");
	        batchCreate.submitPack("Add Package");
	        batchCreate.submitPack("Complete Fulfillment");

     });
      browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	  
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
	            expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("PARTIALLY SHIPPED");
	            browser.sleep(2000);
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	            	orderStatus = status;
	            	console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            	expect(orderStatus).toEqual("SHIPMENT CREATED");
	            	browser.sleep(2000);
	         });
	    });
 	});    	 	
 	it("Reject_Partial_QTY_BOPIS_TC0044", function() {
 	
 	 browser.get(callcenterorder);
     browser.driver.manage().window().maximize();
     salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
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
     callCenter.editSKUQuantity("5");
     browser.sleep(500);
     salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
     salesOrderCreate.availableStore(browser.params.packingStore); 
     callCenter.editLinePopUpSaveBtn();
     //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
     browser.sleep(1500);
     salesOrderCreate.saveOption("Save");
     salesOrderCreate.salesOrderNumber().then(function (value) {
         SONumber = value;
         console.log("sales order number"+SONumber);
     });
     browser.sleep(3000);
     
     //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
     browser.wait(function () {
         return SONumber != '';
     }).then(function () {
         browser.get(callCenterSalesOrdersListUrl);
         salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
         browser.sleep(2000);
         salesOrderSummary.salesOrderSelectGear("Release");
         salesOrderSummary.salesOrderStatus().then(function (status) {
             orderStatus = status;
             console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

         });
     });
     
     browser.wait(function () {
         return SONumber != '';
     }).then(function () {
         browser.get(batchPickUrl);
         batchCreate.CreateNewBatch();
         batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
         batchCreate.selectSite();
         batchCreate.siteConfirm();
         batchCreate.fullfillmentType(3);
         batchCreate.Linecount(2);//single Line Only
         batchCreate.minFRRequest(1);
         batchCreate.maxFRRequest(100);
         batchCreate.requestDeliveryDate(browser.params.promiseddate);
         batchCreate.packageType(browser.params.packageValue);
         batchCreate.createBatchConfirm();
         browser.sleep(5000);
         batchCreate.BatchNumber().then(function (batchnumber) {
             batch = batchnumber;
             BatchId = batchnumber.substring(7, 19)
             console.log("the Batch ID is "+BatchId);
         });	            
         batchCreate.close();
     	});
     
    
     browser.wait(function () {
         return BatchId != '';
     }).then(function () {
     	
     	browser.get(storePortalV2Url);
	        commons.searchWithCriteria('Batch Id','ends with', BatchId);
	        //batchCreate.rejectLineSelect();
	        batchCreate.selectlineclick();
	        browser.sleep(1000);
	        batchCreate.selectFromTheSearch(1);
	        browser.sleep(1000);
	        batchCreate.qtyInc(1,2);
	        batchCreate.rejectreason(1,"Product Damaged")
	        batchCreate.PickConfirm("Accept Order");
	        batchCreate.submitPack("Confirm");
	        batchCreate.submitPack("Pick & Pack");		        
	        batchCreate.selectFromTheSearch(2);
	        batchCreate.qtyInc(1,2);
	        batchCreate.submitPack("Include in Package");
	        browser.sleep(500);
	        batchCreate.PackingtypeSelect(browser.params.packageValue);
	        batchCreate.submitPack("Add Package");
	        browser.sleep(500);
	        batchCreate.submitPack("Complete Fulfillment");
	        browser.sleep(1500);
     });
      browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY AWAITING CUSTOMER PICKUP');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY AWAITING CUSTOMER PICKUP");
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	            orderStatus = status;
	            console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP");
         	});
     	});
	}); 	  	
		 	
});
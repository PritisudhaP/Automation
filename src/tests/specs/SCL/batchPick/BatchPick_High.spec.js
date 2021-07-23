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

	  	it("Ship_Single_line_Single_QTY TC0001", function() {
			
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        browser.sleep(1000);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        browser.sleep(1000);
	        commons.search();
	        browser.sleep(1000);
	        callCenter.selectSKUFromResults();
	        browser.sleep(1000);
	        callCenter.addToOrderFromSalesOrder();
	        browser.sleep(1000);
	        callCenter.attachCustomer();
	        browser.sleep(1000);
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        browser.sleep(1000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(1000);
	        salesOrderCreate.useSelectedCustomer();
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
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
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });
            browser.get(batchPickUrl);
            browser.sleep(2000);
            batchCreate.CreateNewBatch();
            browser.sleep(1000);
            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
            batchCreate.selectSite();
            batchCreate.siteConfirm();
            batchCreate.Linecount(2);//Single Line Only
            batchCreate.fullfillmentType(2)
            batchCreate.minFRRequest(1);
            batchCreate.maxFRRequest(100);
          //  batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
	       
       		browser.wait(function () {
            return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId.toString());
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.truckIcon(orderStatus);
	            });
	            
	            browser.sleep(3000);
	            batchCreate.yesButton();
	            browser.sleep(2000);
	    });
	         browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toEqual(1);
	            });
	            browser.sleep(2000);

	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
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
	            browser.get(batchPickUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Batch Id #", BatchId);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });
	        });
	});
	
	it("Ship_Multiple_line_TC0002", function() {
			
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        browser.sleep(1000);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        browser.sleep(1000);
	        commons.search();
	        browser.sleep(1000);
	        callCenter.selectSKUFromResults();
	        browser.sleep(1000);
	        callCenter.addToOrderFromSalesOrder();
			salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
	        callCenter.selectSKUFromSearch();
	        browser.sleep(1000);
	        commons.search();
	        browser.sleep(1000);
	        callCenter.selectSKUFromResults();
	        browser.sleep(1000);
	        callCenter.addToOrderFromSalesOrder();		
	        browser.sleep(1000);
	        callCenter.attachCustomer();
	        browser.sleep(1000);
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        browser.sleep(1000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(1000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(1000);
	        callCenter.editLineGear("4");
	        callCenter.lineItemselectOptions("Edit Line");
	        browser.sleep(1000);
	        callCenter.editSKUQuantity("2");
	        browser.sleep(2000);
	        callCenter.editLinePopUpSaveBtn();
	        
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
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
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });

            browser.get(batchPickUrl);
            browser.sleep(500);
            batchCreate.CreateNewBatch();
            browser.sleep(1000);
            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
            batchCreate.selectSite();
            batchCreate.siteConfirm();
            batchCreate.fullfillmentType(2)
            batchCreate.Linecount(3);//Multiple Lines Only
            batchCreate.minFRRequest(1);
            batchCreate.maxFRRequest(100);
           // batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
	        
	       		browser.wait(function () {
	            return BatchId != '';
	        }).then(function () {
	        	
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId.toString());
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.truckIcon(orderStatus);
	            });
	            browser.sleep(2000);
	            batchCreate.yesButton();
	            browser.sleep(2000);
	    });
	         browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	        	
	         	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toBeGreaterThan(1);
	            });
	            browser.sleep(2000);	       	
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
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
	            browser.get(batchPickUrl);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });
	        });
	});
	
	it("Ship_Single_And_Multiple_line_TC0003", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        browser.sleep(1000);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        commons.search();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        browser.sleep(1000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);
        callCenter.attachCustomer();
        browser.sleep(1000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(1000);
        salesOrderCreate.selectCustomer();
        browser.sleep(1000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        browser.sleep(1000);
        callCenter.editSKUQuantity("2");
        browser.sleep(2000);
        callCenter.editLinePopUpSaveBtn();
        
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(300);
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
        	SONumber1 = value;
        	console.log("sales order number1"+SONumber1);            
        });
        
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		    
		});	

        browser.sleep(2000);
        
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber1 != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(1000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });
        });
        
 //creating an order with 2 lines
        
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        browser.sleep(1000);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        commons.search();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();		
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(1000);
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("2");
        browser.sleep(2000);
        callCenter.editLinePopUpSaveBtn();
        
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(300);
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber2 = value
            console.log("sales order number "+SONumber2);
        });
        
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		    
		});	

        browser.sleep(2000);
        
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber2 != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(1000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });
        });
  
        browser.get(batchPickUrl);
        browser.sleep(500);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(2)
        batchCreate.Linecount(1);//Both Multiple and Single Line
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
        batchCreate.packageType(browser.params.packageValue);
        batchCreate.createBatchConfirm();
        batchCreate.BatchNumber().then(function (batchnumber) {
        batch = batchnumber;
        BatchId = batchnumber.substring(7, 19)
        console.log("the Batch ID is "+BatchId);
        });	            
        batchCreate.close();
    	browser.sleep(1000);
    	
   		browser.wait(function () {
        return BatchId != '';
        }).then(function () {
        	
            browser.get(batchPickUrl);
            browser.sleep(2000);
            salesOrderSummary.salesOrderSearch("Batch Id", BatchId.toString());
            batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.truckIcon(orderStatus);
            });
            browser.sleep(2000);
            batchCreate.yesButton();
            browser.sleep(2000);
        });
       		
     
         browser.wait(function () {
            return SONumber1!= '';
        }).then(function () {
        	
        	browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
            browser.sleep(1000);	           
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            });
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
 	       	browser.sleep(1000);	       
            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
            browser.sleep(2000);
            browser.get(fulfillmentRequestsUrl);
            console.log("the sale sorder is "+SONumber1);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
            browser.sleep(2000);
            batchCreate.shipmentstatus(4,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            browser.sleep(2000);
            });
           
        });
         
         browser.wait(function () {
             return SONumber2!= '';
         }).then(function () {

         	browser.get(callCenterSalesOrdersListUrl);
             salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
             browser.sleep(1000);	           
             salesOrderSummary.salesOrderStatus().then(function (status) {
                 orderStatus = status;
                 console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
 	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
             });
             salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
  	       	browser.sleep(1000);	       
             expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
             expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("CLOSED");
             browser.sleep(2000);
             browser.get(fulfillmentRequestsUrl);
             console.log("the sale sorder is "+SONumber2);
             salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
             browser.sleep(2000);
             batchCreate.shipmentstatus(4,1).then(function (status) {
                 orderStatus = status;
                 console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
 	            expect(orderStatus).toEqual("SHIPMENT CREATED");
 	            browser.sleep(2000);
             });             
             browser.get(batchPickUrl);
             console.log("the sale sorder is "+SONumber2);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
             browser.sleep(2000);
             batchCreate.shipmentstatus(5,1).then(function (status) {
                 orderStatus = status;
                 console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
 	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
 	            browser.sleep(2000);
             });             
         });       
	});
	  		   
	    it("BOPIS_Single_line_Single_QTY TC0004", function() {
		
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        browser.sleep(1000);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        browser.sleep(1000);
	        commons.search();
	        browser.sleep(1000);
	        callCenter.selectSKUFromResults();
	        browser.sleep(1000);
	        callCenter.addToOrderFromSalesOrder();
	        browser.sleep(1000);
	        callCenter.attachCustomer();
	        browser.sleep(1000);
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        browser.sleep(1000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(1000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(1500);
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        browser.sleep(500);
	        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
	        browser.sleep(100);
	        salesOrderCreate.availableStore(browser.params.packingStore);
	        browser.sleep(500);
	        callCenter.editLinePopUpSaveBtn(); 
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
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
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });
	        
	        
            browser.get(batchPickUrl);
            browser.sleep(2000);
            batchCreate.availableBatchDetails(2).then(function (available) {
            	singleLineBB = parseInt(available);
                console.log("single line before creating the batch is "+singleLineBB);
            });
            batchCreate.CreateNewBatch();
            browser.sleep(1000);
            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
            batchCreate.selectSite();
            batchCreate.siteConfirm();
            batchCreate.fullfillmentType(3)
            batchCreate.Linecount(2);//Single Line Only
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
	       
       		browser.wait(function () {
            return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
//getting the number of order in the batch created.	            
	            batchCreate.shipmentstatus(7,1).then(function (total) {
	                totalorders = parseInt(total);
	                console.log("the number of orders in the batch : "+totalorders);
	                aftertotalline = singleLineBB-totalorders;
	                console.log("the total signle line quantity after batch creation "+aftertotalline);
	            });
	            
	            
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.truckIcon(orderStatus);
	            });
	            
	            batchCreate.availableBatchDetails(2).then(function (available) {
	            	singleLineAB= parseInt(available);
	                console.log("single line after creating the batch is "+singleLineAB);
	                expect(singleLineAB).toEqual(aftertotalline);
	            });
	            
	            browser.sleep(3000);
	            batchCreate.yesButton();
	            browser.sleep(2000);
	    });
	         browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmenttype(19).then(function (total) {
	                items = total;
	                console.log("the fullfillment type in the batch is: "+items);
	                Promise.all([
	                	expect(items.toString()).not.toContain("SHIP TO CUSTOMER"),
	                	expect(items.toString()).not.toContain("STORE TRANSFER"),
	                	expect(items.toString()).toContain("PICKUPATSTORE")])
	            });
	            
	            batchCreate.shipmenttype(11).then(function (total) {
	                items = total;
	                console.log("the order numbers in the batch is: "+items);
		            expect(items.toString()).toContain(SONumber);
	            });
	            browser.sleep(2000);
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP");
	            browser.sleep(2000);
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP");
		            browser.sleep(2000);
	            });
	            browser.get(batchPickUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });//this is for shipment
	        });
	         
	         browser.wait(function () {
		            return BatchId != '';
		        }).then(function () {
		        	
		        	browser.get(storePortalV2Url);
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
		            browser.sleep(1500);
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(1000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
			            browser.sleep(2000);
		            });
		            browser.get(batchPickUrl);
		            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(5,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
			            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
			            browser.sleep(2000);
		            });
		            
		  });
	         
	});

	it("BOPIS_Multiple_line_TC0005", function() {
			
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        browser.sleep(1000);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
	        callCenter.selectSKUFromSearch();
	        commons.search();
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrderFromSalesOrder();
			salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
	        callCenter.selectSKUFromSearch();
	        commons.search();
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrderFromSalesOrder();		
	        browser.sleep(2000);
	        callCenter.attachCustomer();
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        salesOrderCreate.selectCustomer();
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(1000);
	        callCenter.editLineGear("3");
	        callCenter.lineItemselectOptions("Edit Line");
	        browser.sleep(500);
	        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
	        salesOrderCreate.availableStore(browser.params.packingStore);
	        callCenter.editLinePopUpSaveBtn(); 
	        callCenter.editLineGear("4");
	        callCenter.lineItemselectOptions("Edit Line");
	        callCenter.editSKUQuantity("2");
	        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
	        browser.sleep(100);
	        salesOrderCreate.availableStore(browser.params.packingStore);
	        callCenter.editLinePopUpSaveBtn();
	        
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
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
	        
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(1000);
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

	            });
	        });

            browser.get(batchPickUrl);
            browser.sleep(500);
            batchCreate.availableBatchDetails(3).then(function (available) {
            	multiLineBB = parseInt(available);
                console.log("single line before creating the batch is "+multiLineBB);
            });
            batchCreate.CreateNewBatch();
            browser.sleep(1000);
            batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
            batchCreate.selectSite();
            batchCreate.siteConfirm();
            batchCreate.fullfillmentType(3)
            batchCreate.Linecount(3);//Multiple Lines Only
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
	        
	       		browser.wait(function () {
	            return BatchId != '';
	        }).then(function () {
	        	
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
//getting the number of order in the batch created.	            
	            batchCreate.shipmentstatus(7,1).then(function (total) {
	                totalorders = parseInt(total);
	                console.log("the number of orders in the batch : "+totalorders);
	                aftertotalline = multiLineBB-totalorders;
	                console.log("the total signle line quantity after batch creation "+aftertotalline);
	            });
//refreshing the page
	            
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.truckIcon(orderStatus);
	            });
	           
	            batchCreate.availableBatchDetails(3).then(function (available) {
	            	multiLineAB = parseInt(available);
	                console.log("single line after creating the batch is "+multiLineAB);
	                expect(multiLineAB).toEqual(aftertotalline);
	            });
	            
	            browser.sleep(2000);
	            batchCreate.yesButton();
	            browser.sleep(2000);
	    });
	         browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	        	
	         	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmenttype(19).then(function (total) {
	                items = total;
	                console.log("the fullfillment type in the batch is: "+items);
	                Promise.all([
	                	expect(items.toString()).not.toContain("SHIP TO CUSTOMER"),
	                	expect(items.toString()).not.toContain("STORE TRANSFER"),
	                	expect(items.toString()).toContain("PICKUPATSTORE")])	           
	                	
	            });
	            
	            batchCreate.shipmenttype(11).then(function (total) {
	                items = total;
	                console.log("the order numbers in the batch is: "+items);
		            expect(items.toString()).toContain(SONumber);
	            });
	            
	            browser.sleep(2000);	       	
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP");
	            expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("AWAITING CUSTOMER PICKUP");
	            browser.sleep(2000);
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
		            expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP");
		            browser.sleep(2000);
	            });
	        });
	         
	         browser.wait(function () {
		            return BatchId != '';
		        }).then(function () {
		        	
		        	browser.get(storePortalV2Url);
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
		            browser.sleep(1500);
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(1000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
			            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
			            browser.sleep(2000);
		            });
		            browser.get(batchPickUrl);
		            console.log("the sale sorder is "+SONumber);
		            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(5,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
			            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
			            browser.sleep(2000);
		            });
		            
		  });
	});
	
	it("BOPIS_Single_And_Multiple_line_TC0006", function() {
		
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
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        salesOrderCreate.availableStore(browser.params.packingStore);
        callCenter.editLinePopUpSaveBtn(); 
        
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(1000);
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
        	SONumber1 = value;
        	console.log("sales order number1"+SONumber1);            
        });
        
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		    
		});		

        browser.sleep(2000);
        
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber1 != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(1000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });
        });
        
 //creating an order with 2 lines
        
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
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
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        salesOrderCreate.availableStore(browser.params.packingStore);
        callCenter.editLinePopUpSaveBtn(); 
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("2");
        browser.sleep(200);
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        salesOrderCreate.availableStore(browser.params.packingStore);
        callCenter.editLinePopUpSaveBtn();
        
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(1000);
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber2 = value
            console.log("sales order number "+SONumber2);
        });
        
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		    
		});	
        browser.sleep(2000);
        
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber2 != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
            browser.sleep(1000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(1000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            });
        });
  //Creating the batch      
        browser.get(batchPickUrl);
        browser.sleep(500);
        batchCreate.availableBatchDetails(1).then(function (available) {
        	totalLineBB = parseInt(available);
            console.log("Total line before creating the batch is "+totalLineBB);
        });
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(3)
        batchCreate.Linecount(1);//single and Multiple Lines Only
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
        
       		browser.wait(function () {
            return BatchId != '';
        }).then(function () {
        	
            browser.get(batchPickUrl);
            browser.sleep(2000);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
//getting the number of order in the batch created.	            
            batchCreate.shipmentstatus(7,1).then(function (total) {
                totalorders = parseInt(total);
                console.log("the number of orders in the batch : "+totalorders);
                aftertotalline = totalLineBB-totalorders;
                console.log("the total signle and multi line quantity after batch creation "+aftertotalline);
            });
//refreshing the page
            
            batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.truckIcon(orderStatus);
            });
           
            batchCreate.availableBatchDetails(1).then(function (available) {
            	totalLineAB = parseInt(available);
                console.log("single line after creating the batch is "+multiLineAB);
                expect(totalLineAB).toEqual(aftertotalline);
            });
            
            browser.sleep(2000);
            batchCreate.yesButton();
            browser.sleep(2000);
    });
         browser.wait(function () {
            return BatchId != '';
        }).then(function () {
        	
         	browser.get(storePortalV2Url);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
            batchCreate.shipmenttype(19).then(function (total) {
                items = total;
                console.log("the fullfillment type in the batch is: "+items);
                Promise.all([
                	expect(items.toString()).not.toContain("SHIP TO CUSTOMER"),
                	expect(items.toString()).not.toContain("STORE TRANSFER"),
                	expect(items.toString()).toContain("PICKUPATSTORE")])
            });
            
            batchCreate.shipmenttype(11).then(function (total) {
                items = total;
                console.log("the order numbers in the batch is: "+items);
                Promise.all([
                	expect(items.toString()).toContain(SONumber1),
                	expect(items.toString()).toContain(SONumber2)])
            });
        }); 

         browser.wait(function () {
	            return BatchId != '';
	        }).then(function () {
	        	
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
	            browser.sleep(1500);
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
		            browser.sleep(1500);
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(2000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
	            browser.sleep(2000);
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber1);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber1);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
		            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
		            browser.sleep(2000);
	            });
	            browser.get(batchPickUrl);
	            console.log("the sale sorder is "+SONumber1);
	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });
	            
	        });

          	browser.wait(function () {
	            return BatchId != '';
	        }).then(function () {
	        	
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
	            browser.sleep(1000);	           
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
	            });
	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	 	       	browser.sleep(1000);	       
	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
	            browser.sleep(2000);
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber2);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(4,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber2+" is: "+orderStatus);
		            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
		            browser.sleep(2000);
	            });	                
	        });
	});
	
	it("SHIP And BOPIS_Single_line_TC0007", function() {
	
		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
	        	
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        browser.sleep(1000);
			        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
			        callCenter.selectSKUFromSearch();
			        commons.search();			        
			        callCenter.selectSKUFromResults();
			        callCenter.addToOrderFromSalesOrder();		
			        browser.sleep(2000);
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(1000);
			        if(i==1){
			        	 callCenter.editLineGear("3");
			             callCenter.lineItemselectOptions("Edit Line");
			             browser.sleep(500);
			             salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
			             salesOrderCreate.availableStore(browser.params.packingStore);
			             callCenter.editLinePopUpSaveBtn(); 
				         console.log("BOPIS Order")
			        	
			        }
			        else
		        	{
			        	console.log("ship to customer order")
		        	}
			        
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        browser.sleep(1000);
			        salesOrderCreate.saveOption("Save");			
			        salesOrderCreate.salesOrderNumber().then(function (value) {
			            console.log("sales order number at the "+i+" position is" +salesorders.push(value));
			            console.log("array length" +salesorders.length);
	
			        });
			        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
						savedStatus = value;
					    console.log("the orderstatus is "+savedStatus);	
					    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
					    
					});
		    	}//for loop
		    	
		     })//first function block
	        
	        browser.wait(function () {
	            return salesorders!= '';
	        }).then(function () {
	        	for(i=0;i<salesorders.length;i++){
	   	            browser.get(callCenterSalesOrdersListUrl);	            
		        	console.log("sales order number of "+i+"  is" +salesorders[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
		            browser.sleep(3000);
		            salesOrderSummary.salesOrderSelectGear("Release");
		            browser.sleep(3000);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');	        
	        	}
	      });
		  
//Creating the batch      
	        browser.get(batchPickUrl);
	        browser.sleep(500);	    
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.fullfillmentType(1)
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
	    	browser.sleep(1000);
       		browser.wait(function () {
            return BatchId != '';
	        }).then(function () {
            browser.get(batchPickUrl);
            browser.sleep(2000);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
//refreshing the page
            batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.truckIcon(orderStatus);
            });	            
            browser.sleep(3000);
            batchCreate.yesButton();
            browser.sleep(2000);
	    });
   		
       	browser.wait(function () {
            return BatchId != '';
        }).then(function () {
        	
         	browser.get(storePortalV2Url);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
            batchCreate.shipmenttype(19).then(function (total) {
                items = total;
                console.log("the fullfillment type in the batch is: "+items);
                Promise.all([
                	expect(items.toString()).toContain("SHIP TO CUSTOMER"),
                	expect(items.toString()).not.toContain("STORE TRANSFER"),
                	expect(items.toString()).toContain("PICKUPATSTORE")])
            });
            
            batchCreate.shipmenttype(11).then(function (total) {
                items = total;
                console.log("the order numbers in the batch is: "+items);
                Promise.all([
                	expect(items.toString()).toContain(salesorders[0]),
                	expect(items.toString()).toContain(salesorders[1])])
                	});
        }); 
 	
   	 browser.wait(function () {
                 return salesorders!= '';
          }).then(function () {
            	 
            for(i=0;i<salesorders.length;i++)
         	{
             	if(i==1)
             	{
                	browser.get(callCenterSalesOrdersListUrl);
                    salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
                    browser.sleep(1000);	           
                    salesOrderSummary.salesOrderStatus().then(function (status) {
                        orderStatus = status;
                        console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
        	            expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
                    });
                    salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
         	       	browser.sleep(1000);	       
                    expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP");
                    browser.sleep(2000);
                    browser.get(fulfillmentRequestsUrl);
                    console.log("the sale sorder is "+salesorders[i]);
                    salesOrderSummary.salesOrderSearch("Original Order #",salesorders[i]);
                    browser.sleep(2000);
                    batchCreate.shipmentstatus(4,1).then(function (status) {
                        orderStatus = status;
                        console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
        	            expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP");
        	            browser.sleep(2000);
                    });
                    
                    browser.get(batchPickUrl);
                    console.log("the sale sorder is "+salesorders[i]);
                    salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
                    browser.sleep(2000);
                    batchCreate.shipmentstatus(5,1).then(function (status) {
                        orderStatus = status;
                        console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
        	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
        	            browser.sleep(2000);
                    });                      	

       	        	browser.get(storePortalV2Url);
       	            commons.searchWithCriteria('Order #', 'ends with', salesorders[i]);
       	            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
       	            browser.sleep(1500);
       	            browser.get(callCenterSalesOrdersListUrl);
       	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
       	            browser.sleep(1000);	           
       	            salesOrderSummary.salesOrderStatus().then(function (status) {
       	                orderStatus = status;
       	                console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
       		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
       	            });
       	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
       	 	       	browser.sleep(1000);	       
       	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
       	            browser.sleep(2000);
       	            browser.get(fulfillmentRequestsUrl);
       	            console.log("the sale sorder is "+salesorders[i]);
       	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
       	            browser.sleep(2000);
       	            batchCreate.shipmentstatus(4,1).then(function (status) {
       	                orderStatus = status;
       	                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
       		            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
       		            browser.sleep(2000);
       	            });   
             	}
             	else{           		
	               	browser.get(callCenterSalesOrdersListUrl);
	                salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
	                browser.sleep(1000);	           
	                salesOrderSummary.salesOrderStatus().then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
	     	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	                 });
	                 salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	      	       	 browser.sleep(1000);	       
	                 expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
	                 browser.sleep(2000);
	                 browser.get(fulfillmentRequestsUrl);
	                 console.log("the sale sorder is "+salesorders[i]);
	                 salesOrderSummary.salesOrderSearch("Original Order #", salesorders[i]);
	                 browser.sleep(2000);
	                 batchCreate.shipmentstatus(4,1).then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the order #"+salesorders[i]+" is: "+orderStatus);
	     	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	     	            browser.sleep(2000);
	                 });
	                 
	                 browser.get(batchPickUrl);
	 	             salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
	                 browser.sleep(2000);
	                 batchCreate.shipmentstatus(5,1).then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	     	             expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
	     	             browser.sleep(2000);
	                 });                      	
             	}
			}		    		             	
         });
	});		
	
	it("SHIP And BOPIS_Single and Multi_line_TC0008", function() {
		
		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
	        	
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        browser.sleep(1000);
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(1000);
			        salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU1);
			        callCenter.selectSKUFromSearch();
			        commons.search();			        
			        callCenter.selectSKUFromResults();
			        callCenter.addToOrderFromSalesOrder();		
			        browser.sleep(1000);
			        if(i==1){
			        	 salesOrderSummary.salesOrderSearch('SKU', browser.params.packingSKU2);
				         callCenter.selectSKUFromSearch();
				         commons.search();			        
				         callCenter.selectSKUFromResults();
				         callCenter.addToOrderFromSalesOrder();		
				         browser.sleep(1000);
			        	 callCenter.editLineGear("3");
			             callCenter.lineItemselectOptions("Edit Line");
			             browser.sleep(500);
			             salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
			             salesOrderCreate.availableStore(browser.params.packingStore);
			             callCenter.editLinePopUpSaveBtn(); 
			             browser.sleep(1000);
			        	 callCenter.editLineGear("4");
			             callCenter.lineItemselectOptions("Edit Line");
			             browser.sleep(500);
			             salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
			             salesOrderCreate.availableStore(browser.params.packingStore);
			             callCenter.editLinePopUpSaveBtn(); 
				         console.log("BOPIS Order");
				        
			        	
			        }
			        else
		        	{
			        	console.log("ship to customer order");
		        	}
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        browser.sleep(1000);
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {
			            console.log("sales order number at the "+i+" position is" +salesorders1.push(value));
			            console.log("array length" +salesorders1.length);

			        });
			        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
						savedStatus = value;
					    console.log("the orderstatus is "+savedStatus);	
					    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
					    browser.sleep(1000);
					    
					});
		    	}//for loop
		    	
		     })//first function block
	        
	        browser.wait(function () {
	            return salesorders1!= '';
	        }).then(function () {
	        	for(i=0;i<salesorders1.length;i++){
	   	            browser.get(callCenterSalesOrdersListUrl);	            
		        	console.log("sales order number of "+i+"  is" +salesorders1[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
		            browser.sleep(3000);
		            salesOrderSummary.salesOrderSelectGear("Release");
		            browser.sleep(3000);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');	        
	        	}
	      });
		  
//Creating the batch      
	        browser.get(batchPickUrl);
	        browser.sleep(500);	    
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.packingSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.fullfillmentType(1)
	        batchCreate.Linecount(1);//single Line Only
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
     		browser.wait(function () {
          return BatchId != '';
	        }).then(function () {
          browser.get(batchPickUrl);
          browser.sleep(2000);
          commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
//refreshing the page
          batchCreate.shipmentstatus(5,1).then(function (status) {
              orderStatus = status;
              console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.truckIcon(orderStatus);
          });	            
          browser.sleep(3000);
          batchCreate.yesButton();
          browser.sleep(2000);
	    });
 		
     	browser.wait(function () {
          return BatchId != '';
      }).then(function () {
      	
       	  browser.get(storePortalV2Url);
          commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
          batchCreate.shipmenttype(19).then(function (total) {
              items = total;
              console.log("the fullfillment type in the batch is: "+items);
              Promise.all([
              	expect(items.toString()).toContain("SHIP TO CUSTOMER"),
              	expect(items.toString()).not.toContain("STORE TRANSFER"),
              	expect(items.toString()).toContain("PICKUPATSTORE")])
          });
          
          batchCreate.shipmenttype(11).then(function (total) {
              items = total;
              console.log("the order numbers in the batch is: "+items);
              Promise.all([
              	expect(items.toString()).toContain(salesorders1[0]),
              	expect(items.toString()).toContain(salesorders1[1])])
              	});
      }); 
	
 	 browser.wait(function () {
               return salesorders1!= '';
        }).then(function () {
          	 
          for(i=0;i<salesorders1.length;i++)
       	{
           	if(i==1)
           	{
              	browser.get(callCenterSalesOrdersListUrl);
                  salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
                  browser.sleep(1000);	           
                  salesOrderSummary.salesOrderStatus().then(function (status) {
                      orderStatus = status;
                      console.log("the status of the order #"+salesorders1[i]+" is: "+orderStatus);
      	            expect(salesOrderSummary.salesOrderStatus()).toEqual('AWAITING CUSTOMER PICKUP');
                  });
                  salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
       	       	browser.sleep(1000);	       
                  expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("AWAITING CUSTOMER PICKUP");
                  expect(salesOrderSummary.OrderStatusDetails(3)).toEqual("AWAITING CUSTOMER PICKUP");
                  browser.sleep(2000);
                  browser.get(fulfillmentRequestsUrl);
                  console.log("the sale sorder is "+salesorders1[i]);
                  salesOrderSummary.salesOrderSearch("Original Order #",salesorders1[i]);
                  browser.sleep(2000);
                  batchCreate.shipmentstatus(4,1).then(function (status) {
                      orderStatus = status;
                      console.log("the status of the order #"+salesorders1[i]+" is: "+orderStatus);
      	            expect(orderStatus).toEqual("AWAITING CUSTOMER PICKUP");
      	            browser.sleep(2000);
                  });
     	        	browser.get(storePortalV2Url);
       	            commons.searchWithCriteria('Order #', 'ends with', salesorders1[i]);
     	            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
     	            browser.sleep(1500);
     	            browser.get(callCenterSalesOrdersListUrl);
     	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
     	            browser.sleep(1000);	           
     	            salesOrderSummary.salesOrderStatus().then(function (status) {
     	                orderStatus = status;
     	                console.log("the status of the order #"+salesorders1[i]+" is: "+orderStatus);
     		            expect(salesOrderSummary.salesOrderStatus()).toEqual('PICKEDUP BY CUSTOMER');
     	            });
     	            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
     	 	       	browser.sleep(1000);	       
     	            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
     	            browser.sleep(2000);
     	            browser.get(fulfillmentRequestsUrl);
     	            console.log("the sale sorder is "+salesorders1[i]);
     	            salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
     	            browser.sleep(2000);
     	            batchCreate.shipmentstatus(4,1).then(function (status) {
     	                orderStatus = status;
     	                console.log("the status of the order #"+SONumber1+" is: "+orderStatus);
     		            expect(orderStatus).toEqual("PICKEDUP BY CUSTOMER");
     		            browser.sleep(2000);
     	            });
     	            browser.get(batchPickUrl);
    	            salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
     	            browser.sleep(2000);
     	            batchCreate.shipmentstatus(5,1).then(function (status) {
     	                orderStatus = status;
     	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
     		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
     		            browser.sleep(2000);
     	            });
         	        
           	}
           	else{           		
	               	browser.get(callCenterSalesOrdersListUrl);
	                salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
	                browser.sleep(1000);	           
	                salesOrderSummary.salesOrderStatus().then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the order #"+salesorders1[i]+" is: "+orderStatus);
	     	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
	                 });
	                 salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
	      	       	 browser.sleep(1000);	       
	                 expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
	                 expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
	                 browser.sleep(2000);
	                 browser.get(fulfillmentRequestsUrl);
	                 console.log("the sale sorder is "+salesorders1[i]);
	                 salesOrderSummary.salesOrderSearch("Original Order #", salesorders1[i]);
	                 browser.sleep(2000);
	                 batchCreate.shipmentstatus(4,1).then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the order #"+salesorders1[i]+" is: "+orderStatus);
	     	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	     	            browser.sleep(2000);
	                 });
	                 
	                 browser.get(batchPickUrl);
	 	             salesOrderSummary.salesOrderSearch("Batch Id", BatchId);
	                 browser.sleep(2000);
	                 batchCreate.shipmentstatus(5,1).then(function (status) {
	                     orderStatus = status;
	                     console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	     	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
	     	            browser.sleep(2000);
	                 });                      	
           		}
			}		    		             	
       });
	});		
	
	 it("Reject Single line single QTY completely TC0009", function() {
		
			//utils.Login(browser.params.login.user,browser.params.login.password);
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
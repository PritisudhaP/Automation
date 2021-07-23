var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var batchPickCreate = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.create.screen.js');
var batchPickEdit = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.edit.screen.js');
var batchPickSummary = require(process.cwd() + '/src/tests/screens/batchPick/batchpick.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var salesOrderEditScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.edit.screen.js');

global.orderStatus = "";
global.SONumber = "";
global.BatchId = "";
global.FRNumber = "";
global.batchDate = "";
var ordernumbers = [];
var ordernumbers1 = [];
var ordernumbers2 = [];
var ordernumbers4 = [];
global.qty="";
global.orders="";

describe("Batch Pick Medium Priority: ", function() {
	  	var batchCreate = new batchPickCreate();
	    //var batchEdit = new batchPickEdit();
	    //var batchSummary = new batchPickSummary();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	  	var returnsCreate = new returnsCreateScreen();
	  	var salesOrderEdit = new salesOrderEditScreen(); 
		utils.Login(browser.params.login.user,browser.params.login.password);
		utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
	    console.log("Folder cleaned successfully");

		it("No_Batch_PickList_Category TC0045", function() {
	        browser.get(batchPickUrl);
	        browser.driver.manage().window().maximize();
	        browser.sleep(2000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	       // batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(3);
	        batchCreate.documents(2);
	        batchCreate.pickListType(1);
	        batchCreate.packageType(browser.params.packageValue);
	        batchCreate.createBatchConfirm();
	        browser.sleep(5000);
	        batchCreate.batchcreationError().then(function (message) {
	        	error = message;
	            console.log("the Message is "+error);
	            expect(error).toEqual("No pending fulfillment requests to batch for site: BatchPickSite")
	        });	            
	        batchCreate.close();	  
		});
		
		it("No_Batch_PickList_Item_TC0046", function() {
			
			browser.get(batchPickUrl);
	        browser.sleep(2000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	      //  batchCreate.requestDeliveryDate(browser.params.promiseddate);
	       // batchCreate.categoryDropdown(3);
	        batchCreate.documents(2);
	        batchCreate.pickListType(3);
	        batchCreate.packageType(browser.params.packageValue);
	        batchCreate.createBatchConfirm();
	        browser.sleep(5000);
	        batchCreate.batchcreationError().then(function (message) {
	        	error = message;
	            console.log("the Message is "+error);
	            expect(error).toEqual("No pending fulfillment requests to batch for site: BatchPickSite")
	        });	                 
	        batchCreate.close();	  
		});	
		it("No_Batch_PickList_Order_TC0047", function() {
			
	        browser.get(batchPickUrl);
	        browser.sleep(2000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	       // batchCreate.requestDeliveryDate(browser.params.promiseddate);
	      //  batchCreate.categoryDropdown(3);
	        batchCreate.documents(2);
	        batchCreate.pickListType(2);
	        batchCreate.packageType(browser.params.packageValue);
	        batchCreate.createBatchConfirm();
	        browser.sleep(5000);
	        batchCreate.batchcreationError().then(function (message) {
	        	error = message;
	            console.log("the Message is "+error);
	            expect(error).toEqual("No pending fulfillment requests to batch for site: BatchPickSite")
	        });	                     
	        batchCreate.close();	  
		});	
		
		it("Batch Pick Validations TC0048", function() {
			
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
	        console.log("Folder cleaned successfully");
	        browser.sleep(500);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
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
	        browser.sleep(1000);
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
	            browser.sleep(1500);
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
//searching with invalid site	        
	        batchCreate.batchpickSearch("Site Name", "test Site",2);
	        expect(batchCreate.SitePresenceCheck()).toBe(false);
	        batchCreate.clearSerach();
	        browser.sleep(500);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(3);
	        batchCreate.documents(2);
	        batchCreate.pickListType(1);
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
	            return SONumber != '';
	            }).then(function () {
	                browser.get(batchPickUrl);
	                browser.sleep(2000);
	                commons.searchWithCriteria('Batch Id', 'contains', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toEqual(1);
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Batch Id', 'starts with', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toEqual(1);
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toEqual(1);
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Batch Id', 'is', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toEqual(1);
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Batch Id', 'is not', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toBeGreaterThan(1);
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Batch Id', 'starts with', BatchId);
	                browser.sleep(500);
	                expect(batchCreate.searchResult().count()).toEqual(1);
			        returnsCreate.clearSearch();
//Site Validation
	                callCenter.itemsPerPage("50");
	                browser.sleep(1000);
	                commons.searchWithCriteria('Site', 'contains', browser.params.batchpickSite);	                
			        batchCreate.shipmenttype(11).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
						expect(items.toString()).toContain((browser.params.batchpickSite).toUpperCase());
						for(i=0;i<items.length;i++){
							
							expect(items[i].length).toEqual((browser.params.batchpickSite).length);							
							browser.sleep(100);
						}
			        });   
			       // returnsCreate.clearSearch();
			        //commons.searchWithCriteria('Site', 'is', browser.params.batchpickSite);	                
			        //batchCreate.shipmenttype(11).then(function (total) {
					 //   items = total;
					  //  console.log("the fullfillment type in the batch is: "+items);
					//	expect(items.toString()).toContain((browser.params.batchpickSite).toUpperCase());
					//	for(i=0;i<items.length;i++){
							
					//		expect(items[i].length).toEqual((browser.params.batchpickSite).length);							
					//		browser.sleep(100);
					//	}
			        //}); 
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Site', 'ends with', browser.params.batchpickSite);	                
			        batchCreate.shipmenttype(11).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
					    
						expect(items.toString()).toContain((browser.params.batchpickSite).toUpperCase());
						for(i=0;i<items.length;i++){
							
							expect(items[i].length).toEqual((browser.params.batchpickSite).length);							
							browser.sleep(100);
						}
			        }); 
			        
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Site', 'starts with', browser.params.batchpickSite);	                
			        batchCreate.shipmenttype(11).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
					    
						expect(items.toString()).toContain((browser.params.batchpickSite).toUpperCase());
						for(i=0;i<items.length;i++){
							
							expect(items[i].length).toEqual((browser.params.batchpickSite).length);							
							browser.sleep(100);
						}
			        }); 
			        
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Site', 'is not', browser.params.batchpickSite);	                
			        batchCreate.shipmenttype(11).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items); 
						expect(items.toString()).not.toContain((browser.params.batchpickSite).toUpperCase());
			        }); 
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('Site', 'not contains', browser.params.batchpickSite);	                
			        batchCreate.shipmenttype(11).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items); 
						expect(items.toString()).not.toContain((browser.params.batchpickSite).toUpperCase());
			        }); 
//status			        
			         returnsCreate.clearSearch();
			        //commons.searchWithCriteria('Status', 'is', 'Fulfillment Completed');	                
			        //batchCreate.shipmenttype(5).then(function (total) {
					  //  items = total;
					   // console.log("the fullfillment type in the batch is: "+items); 
						//expect(items.toString()).toContain(('FULFILLMENT COMPLETED'));
						//for(i=0;i<items.length;i++){	
						//	expect(items[i].length).toEqual(21);							
						//	browser.sleep(100);
						//}
			        //}); 
			        //returnsCreate.clearSearch();
			        //commons.searchWithCriteria('Status', 'is not', 'Fulfillment Completed');	                
			        //batchCreate.shipmenttype(5).then(function (total) {
					 //   items = total;
					  //  console.log("the fullfillment type in the batch is: "+items); 
					//	expect(items.toString()).not.toContain(("FULFILLMENT COMPLETED"));						
			        //}); 
			       // returnsCreate.clearSearch();
//User ID
			        
			        commons.searchWithCriteria('User Id', 'contains', browser.params.userID);	                
			        batchCreate.shipmenttype(12).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
						expect(items.toString()).toContain((browser.params.userID));
						for(i=0;i<items.length;i++){
							expect(items[i].length).toEqual((browser.params.userID).length);							
							browser.sleep(100);
						}
			        });   
			        browser.refresh();
			     //   commons.searchWithCriteria('User Id', 'is', browser.params.userID);	                
			   //     batchCreate.shipmenttype(12).then(function (total) {
				//	    items = total;
				//	    console.log("the fullfillment type in the batch is: "+items);
				//		expect(items.toString()).toContain((browser.params.userID));
				//		for(i=0;i<items.length;i++){
					//		expect(items[i]).toEqual((browser.params.userID));							
					//		browser.sleep(100);
					//	}
			      //  });   
			        //returnsCreate.clearSearch();
			        batchCreate.batchSearch('User Id', 'ends with', browser.params.userID,'Batch Id');	                
			        batchCreate.shipmenttype(12).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
						expect(items.toString()).toContain((browser.params.userID));
						for(i=0;i<items.length;i++){
							expect(items[i]).toEqual((browser.params.userID));	
							browser.sleep(100);
						}
			        });   
			        //returnsCreate.clearSearch();
			        browser.refresh();
			        batchCreate.batchSearch('User Id', 'starts with', browser.params.userID,'Batch Id');	                
			        batchCreate.shipmenttype(12).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items);
						expect(items.toString()).toContain((browser.params.userID));
						for(i=0;i<items.length;i++){
							expect(items[i]).toEqual((browser.params.userID));
							browser.sleep(100);
						}
			        });   
			        browser.refresh();
			        commons.searchWithCriteria('User Id', 'is not', browser.params.userID);	                
			        batchCreate.shipmenttype(12).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items); 
						expect(items.toString()).not.toContain((browser.params.batchpickSite));
			        }); 
			        returnsCreate.clearSearch();
			        commons.searchWithCriteria('User Id', 'not contains', browser.params.userID);	                
			        batchCreate.shipmenttype(12).then(function (total) {
					    items = total;
					    console.log("the fullfillment type in the batch is: "+items); 
						expect(items.toString()).not.toContain((browser.params.batchpickSite));
						
			        }); 
			        
	        });
		});
		
		it("Errored_Batch_PickList_Category TC0049", function() {
			
			browser.get(callcenterorder);
	        browser.driver.manage().window().maximize();
	        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
	        console.log("Folder cleaned successfully");
	        browser.sleep(500);
	        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
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
	        batchCreate.salesOrderCarrierUpdate("USPS","USPSFirstClass");
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(1000);
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
	            browser.sleep(1500);
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
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        //batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(2);
	        batchCreate.documents(2);
	        batchCreate.pickListType(1);
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
	            	browser.get(fulfillmentRequestsUrl);
		            commons.searchWithCriteria('Order #', 'ends with', SONumber);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber = FRrequest;
		                console.log("The first FR Number is: "+FRNumber);
			            browser.sleep(1000);
		            });		            		            
	            });
	    	browser.wait(function () {
	            return SONumber != '';
	            }).then(function () {
	                browser.get(batchPickUrl);
	                browser.sleep(2000);
	                batchCreate.shipmentstatus(5,1).then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	    	            browser.sleep(2000);
	    	            batchCreate.batchPickRefresh(orderStatus);
	                });
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		            batchCreate.shipmentstatus(10,1).then(function (status) {
    	                batchDate = status;
    	                console.log("The Batch "+BatchId+" created date is: "+batchDate);
    		            browser.sleep(2000);
    	            	});
		            batchCreate.errorLink(1);
		            browser.sleep(3000);
		            //salesOrderSummary.salesOrderSearch("Order Number", SONumber);
		            batchCreate.errorPopUpData().then(function (total) {
		                items = total;
		                date=batchDate.split("/");
		                day=date[1];
		                month=date[0];
		                rest=date[2];
		                yeardata=rest.split(" ");
		                year = yeardata[0];
		                Promise.all([
		                	expect(items.toString()).toContain(SONumber),
		                	expect(items.toString()).toContain(FRNumber),
		                	expect(items.toString()).toContain(day),
		                	expect(items.toString()).toContain(month),
		                	expect(items.toString()).toContain(year)])

		            });
		            batchCreate.erroredBatchSearch('Order Number', 'ends with', SONumber);
		            batchCreate.errorDataSearch().then(function (total) {
		                items = total;
		                expect(items.toString()).toContain(SONumber);
		            });
		            
		            callCenter.ViewNotesClose();
	            });
	    		browser.wait(function () {
	            return SONumber != '';
	        	}).then(function () {
	        	 browser.get(callCenterSalesOrdersListUrl);   
	             salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
				 callCenter.editLineGear(2);
			     callCenter.lineItemselectOptions("Cancel");
			     salesOrderSummary.CancellAllLine();
			     salesOrderSummary.CancelAllLineReason("NotNeeded");
			     salesOrderSummary.CNFButton();
			     browser.sleep(2000);
        
	        });
		});
					
	it("Errored_Batch_PickList_Item TC0050", function() {
			
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
        console.log("Folder cleaned successfully");
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
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
        batchCreate.salesOrderCarrierUpdate("USPS","USPSFirstClass");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(1000);
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
            browser.sleep(1500);
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
        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        //batchCreate.requestDeliveryDate(browser.params.promiseddate);
        //batchCreate.categoryDropdown(2);
        batchCreate.documents(2);
        batchCreate.pickListType(3);
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
            	browser.get(fulfillmentRequestsUrl);
	            commons.searchWithCriteria('Order #', 'ends with', SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
	            	FRNumber = FRrequest;
	                console.log("The first FR Number is: "+FRNumber);
		            browser.sleep(1000);
	            });		            		            
            });
    	browser.wait(function () {
            return SONumber != '';
            }).then(function () {
                browser.get(batchPickUrl);
                browser.sleep(2000);
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            browser.sleep(2000);
    	            batchCreate.batchPickRefresh(orderStatus);
                });
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(10,1).then(function (status) {
	                batchDate = status;
	                console.log("The Batch "+BatchId+" created date is: "+batchDate);
		            browser.sleep(2000);
	            	});
	            batchCreate.errorLink(1);
	            browser.sleep(3000);
	            //salesOrderSummary.salesOrderSearch("Order Number", SONumber);
	            batchCreate.errorPopUpData().then(function (total) {
	                items = total;
	                date=batchDate.split("/");
	                day=date[1];
	                month=date[0];
	                rest=date[2];
	                yeardata=rest.split(" ");
	                year = yeardata[0];
	                Promise.all([
	                	expect(items.toString()).toContain(SONumber),
	                	expect(items.toString()).toContain(FRNumber),
	                	expect(items.toString()).toContain(day),
	                	expect(items.toString()).toContain(month),
	                	expect(items.toString()).toContain(year)])
	            });
	            batchCreate.erroredBatchSearch('Order Number', 'ends with', SONumber);
	            batchCreate.errorDataSearch().then(function (total) {
	                items = total;
	                expect(items.toString()).toContain(SONumber);
	            });
	            
	            callCenter.ViewNotesClose();
            });
            
            browser.wait(function () {
	            return SONumber != '';
	        	}).then(function () {
	        	 browser.get(callCenterSalesOrdersListUrl);   
	             salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
				 callCenter.editLineGear(2);
			     callCenter.lineItemselectOptions("Cancel");
			     salesOrderSummary.CancellAllLine();
			     salesOrderSummary.CancelAllLineReason("NotNeeded");
			     salesOrderSummary.CNFButton();
			     browser.sleep(2000);
	     });
	});
	
	
	it("Errored_Batch_PickList_Order_TC0051", function() {
			
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
        console.log("Folder cleaned successfully");
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
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
        batchCreate.salesOrderCarrierUpdate("USPS","USPSFirstClass");
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
        browser.get(batchPickUrl);
        browser.sleep(2000);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        //batchCreate.requestDeliveryDate(browser.params.promiseddate);
       // batchCreate.categoryDropdown(2);
        batchCreate.documents(2);
        batchCreate.pickListType(2);
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
            	browser.get(fulfillmentRequestsUrl);
	            commons.searchWithCriteria('Order #', 'ends with', SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
	            	FRNumber = FRrequest;
	                console.log("The first FR Number is: "+FRNumber);
		            browser.sleep(1000);
	            });		            		            
            });
    	browser.wait(function () {
            return SONumber != '';
            }).then(function () {
                browser.get(batchPickUrl);
                browser.sleep(2000);
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            browser.sleep(2000);
    	            batchCreate.batchPickRefresh(orderStatus);
                });
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(10,1).then(function (status) {
	                batchDate = status;
	                console.log("The Batch "+BatchId+" created date is: "+batchDate);
		            browser.sleep(2000);
	            	});
	            batchCreate.errorLink(1);
	            browser.sleep(3000);
	            //salesOrderSummary.salesOrderSearch("Order Number", SONumber);
	            batchCreate.errorPopUpData().then(function (total) {
	                items = total;
	                date=batchDate.split("/");
	                day=date[1];
	                month=date[0];
	                rest=date[2];
	                yeardata=rest.split(" ");
	                year = yeardata[0];
	                Promise.all([
	                	expect(items.toString()).toContain(SONumber),
	                	expect(items.toString()).toContain(FRNumber),
	                	expect(items.toString()).toContain(day),
	                	expect(items.toString()).toContain(month),
	                	expect(items.toString()).toContain(year)])
	            });
	            batchCreate.erroredBatchSearch('Order Number', 'ends with', SONumber);
	            batchCreate.errorDataSearch().then(function (total) {
	                items = total;
	                expect(items.toString()).toContain(SONumber);
	            });
	            
	            callCenter.ViewNotesClose();
            });
            
            browser.wait(function () {
	            return SONumber != '';
	        	}).then(function () {
	        	 browser.get(callCenterSalesOrdersListUrl);   
	             salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
				 callCenter.editLineGear(2);
			     callCenter.lineItemselectOptions("Cancel");
			     salesOrderSummary.CancellAllLine();
			     salesOrderSummary.CancelAllLineReason("NotNeeded");
			     salesOrderSummary.CNFButton();
			     browser.sleep(2000);
			 });
	});
	
	it("Multiple_categories_services_PickList_BY_Category_ TC0052", function() {

		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(500);
			        if(i==1){
			        	salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
			            batchCreate.salesOrderCarrierUpdate(browser.params.carrier,browser.params.service);//selecting the service other than ground
		    		}
			        else{
				        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
		    		}
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {			            
			            console.log("sales order number at the "+i+" position is" +ordernumbers.push(value));
			            console.log("array length" +ordernumbers.length);
			        });
		        	browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		    	
		        	salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});	
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		        callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");
	        	}
	        });
	        browser.get(batchPickUrl);
	        browser.sleep(1000);
			browser.sleep(1000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(3);
	        browser.sleep(500);
	        batchCreate.categoryDropdown(2);
 			batchCreate.batchSerivces(16);
	        batchCreate.batchSerivces(20);
	        batchCreate.documents(2);
	        batchCreate.pickListType(1);
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
	            
	            	browser.get(fulfillmentRequestsUrl);
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers[0]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber);
			            browser.sleep(1000);
		            });		            
		            browser.refresh();
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers[1]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber2 = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber2);
			            browser.sleep(1000);
		            });
	            });
	   		browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.batchPickRefresh(orderStatus);
	            });
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.printPickList();     
	            browser.sleep(3000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("PICKLIST PRINTED");
                });
                browser.sleep(2000);
                batchCreate.selectFromTheSearch(2);
                batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
                batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
                browser.sleep(1000);      
                batchCreate.submitPack("Confirm");
                browser.sleep(2000);
					batchCreate.shipmentstatus(5,1).then(function (status) {
						orderStatus = status;
						console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
						browser.sleep(2000);
						batchCreate.batchPickRefresh(orderStatus);
						});
					});
					browser.wait(function () {
	                return BatchId != '';
	    	        }).then(function () {
	    	        browser.get(batchPickUrl);
	    	        batchCreate.shipmentstatus(5,1).then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	    	            browser.sleep(2000);
	    	            batchCreate.batchPickRefresh(orderStatus);
	                });
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		            batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
    	                orders = units;
    	                console.log("total orders in Batch "+orders);
    	            });
	    			batchCreate.shipmentstatus(9,1).then(function (units) { //SKU quantity check
	    	                qty = units;
	    	                console.log("total qty in Batch "+qty);
	    	        });	    	            
		            batchCreate.printIconClick(2);
		            batchCreate.printDocument("Packing Slips");
		            browser.sleep(3000);
		            batchCreate.printIconClick(2);
			        batchCreate.printDocument("Shipping Labels");
		            browser.sleep(3000);
					batchCreate.printIconClick(2);
					batchCreate.printDocument("Combined Slips & Labels");
					browser.sleep(1000);
					batchCreate.shipmentstatus(5,1).then(function (status) {
						orderStatus = status;
						console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
						expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
						browser.sleep(2000);
			       });	            
    	       });
					
					 //!* verifying the pick list document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		    	        	browser.sleep(3000);
		    	        	browser.waitForAngular();
		    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
		    	         	console.log("the file name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(details).toContain("Category Based Picklist");//picklist type checking
			    			expect(details).toContain(browser.params.storeNumber);//Store number checking
			    			expect(details).toContain(BatchId);//
			    			expect(details).toContain(browser.params.Category);//Category checking
			    			expect(details).toContain(browser.params.Category2);//product id checking
			    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
			    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
			    			expect(details).toContain("1of2");//page number
			    			//expect(line[10].substring(4)).toContain("1of");//page number
			    	        expect(details).toContain("2of2");			    	         							
			            });
		    	   	});
		 //!*End of Doc check*!//
//!* verifying the packing slip document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		    	        	browser.sleep(3000);
		    	        	browser.waitForAngular();
		    	        	var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
		    	         	console.log("the packing slip name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(line[0]).toContain(ordernumbers[0]);//packing slip number checking
			    			expect(line[1]).toContain(ordernumbers[0]);//order number checking
			    			expect(details).toContain(ordernumbers[1]);//order number checking
			    			expect(line[2]).toContain(BatchId);//batch id checking
			    			expect(details).toContain(BatchId);//batch id checking
			    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
			    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
			    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
	    	    			//expect(details).toContain("1 of "+orders);//page number checking End
	    	    			expect(details).toContain("1 of 1");//page number checking End
	    	    			expect(line[14].substring(21)).toEqual("1");//SKU quantity check
	    	    			
			            });
		    	    });
	 //!*End of Doc check*!//

	  //!* verifying the Shipping Label document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		    	        	browser.sleep(3000);
		    	        	browser.waitForAngular();
		    	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
		    	         	console.log("the file name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(details).toContain(browser.params.custDisplayName);//customer name checking
			    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
			    			expect(details).toContain(browser.params.custAddress1);
			    			expect(details).toContain(browser.params.custCity);
			    			expect(details).toContain(browser.params.custAddressState);					
			              });
		    	        });
		 //!*End of Doc check*!//
		            
			   browser.wait(function () {
	            return ordernumbers != '';
			   }).then(function () {
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toEqual(1);
	            });
	            browser.sleep(2000);
	           
	            for(i=0;i<ordernumbers.length;i++){
	            	browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", ordernumbers[i]);
		            browser.sleep(2000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers[i]+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
	                expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+ordernumbers[i]);
	                commons.searchWithCriteria("Original Order #", "ends with", ordernumbers[i]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers[i]+" is: "+orderStatus);
	    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
			            browser.sleep(2000);		            
		            });
	            }
	        });
	});

	it("Multiple_categories_services_PickList_BY_Item_ TC0053", function() {

		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(500);
			        if(i==1){
			        	salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
			            batchCreate.salesOrderCarrierUpdate(browser.params.carrier,browser.params.service);//selecting the service other than ground
		    		}
			        else{
				        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
		    		}
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {			            
			            console.log("sales order number at the "+i+" position is" +ordernumbers1.push(value));
			            console.log("array length" +ordernumbers1.length);
			        });
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		    	
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});	
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		        callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");
	        	}
	        });
	        browser.get(batchPickUrl);
	        browser.sleep(1000);
			browser.sleep(1000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        browser.sleep(500);
	        batchCreate.batchSerivces(16);
	        batchCreate.batchSerivces(20);
	        batchCreate.documents(2);
	        batchCreate.pickListType(3);
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
	            
	            	browser.get(fulfillmentRequestsUrl);
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers1[0]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber);
			            browser.sleep(1000);
		            });		            
		            browser.refresh();
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers1[1]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber2 = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber2);
			            browser.sleep(1000);
		            });
	            });
	   		browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.batchPickRefresh(orderStatus);
	            });
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.printPickList();     
	            browser.sleep(3000);		 
	            batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("PICKLIST PRINTED");
                });
                browser.sleep(2000);
                batchCreate.selectFromTheSearch(2);
                batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
                batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
                browser.sleep(1000);      
                batchCreate.submitPack("Confirm");
                browser.sleep(2000);
				batchCreate.shipmentstatus(5,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					browser.sleep(2000);
					batchCreate.batchPickRefresh(orderStatus);
					});
				});
				browser.wait(function () {
                return BatchId != '';
    	        }).then(function () {
    	        browser.get(batchPickUrl);
    	        batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            browser.sleep(2000);
    	            batchCreate.batchPickRefresh(orderStatus);
                	});
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
	                orders = units;
	                console.log("total orders in Batch "+orders);
	            });
    			batchCreate.shipmentstatus(9,1).then(function (units) { //SKU quantity check
    	                qty = units;
    	                console.log("total qty in Batch "+qty);
    	        });	    	    
	            batchCreate.printIconClick(2);
	            batchCreate.printDocument("Packing Slips");
	            browser.sleep(3000);
	            batchCreate.printIconClick(2);
		        batchCreate.printDocument("Shipping Labels");
	            browser.sleep(3000);
				batchCreate.printIconClick(2);
				batchCreate.printDocument("Combined Slips & Labels");
				browser.sleep(1000);
				batchCreate.shipmentstatus(5,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
					browser.sleep(2000);
			     });	            
		     });
			//!* verifying the pick list document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain("Item Based Picklist");//picklist type checking
	    			expect(details).toContain(browser.params.storeNumber);//Store number checking
	    			expect(details).toContain(BatchId);//
	    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
	    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
	    			expect(details).toContain("2of2");//page number
	    	        expect(details).toContain("1of2");			    	         							
	            });
    	   	});
 //!*End of Doc check*!//
//!* verifying the packing slip document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
    	         	console.log("the packing slip name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(line[0]).toContain(ordernumbers1[0]);//packing slip number checking
	    			expect(details).toContain(ordernumbers1[1]);//packing slip number checking
	    			expect(line[1]).toContain(ordernumbers1[0]);//order number checking
	    			expect(details).toContain(ordernumbers1[1]);//order number checking
	    			expect(line[2]).toContain(BatchId);//batch id checking
	    			expect(details).toContain(BatchId);//batch id checking
	    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
	    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
	    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
	    			//expect(line[15]).toEqual("1 of "+orders);//page number checking End
	    			expect(line[14].substring(21)).toEqual("1");//SKU quantity check

	    			        
	            });
    	    });
 //!*End of Doc check*!//
 //!* verifying the packing slip document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(browser.params.custDisplayName);//customer name checking
	    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
	    			expect(details).toContain(browser.params.custAddress1);
	    			expect(details).toContain(browser.params.custCity);
	    			expect(details).toContain(browser.params.custAddressState);					
	              });
    	        });
 //!*End of Doc check*!//
	         browser.wait(function () {
	            return ordernumbers1 != '';
	        }).then(function () {
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toEqual(1);
	            });
	            browser.sleep(2000);
	            for(i=0;i<ordernumbers1.length;i++){
	            	browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", ordernumbers1[i]);
		            browser.sleep(2000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers1[i]+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
	                expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+ordernumbers1[i]);
	                commons.searchWithCriteria("Original Order #", "ends with", ordernumbers1[i]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers1[i]+" is: "+orderStatus);
	    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
			            browser.sleep(2000);		            
		            });
	            }
	        });
	});

	it("Multiple categories_services_PickList_BY_Order_ TC0054", function() {

		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(500);
			        if(i==1){
			        	salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
						batchCreate.salesOrderCarrierUpdate(browser.params.carrier,browser.params.service);//selecting the service other than ground
		    		}
			        else{
				        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
		    		}
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {			            
			            console.log("sales order number at the "+i+" position is" +ordernumbers2.push(value));
			            console.log("array length" +ordernumbers2.length);
			        });
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		    	
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});	
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		        callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
		    	}
	        });
	        browser.get(batchPickUrl);
	        browser.sleep(1000);
			browser.sleep(1000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	       // batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        browser.sleep(500);
	        batchCreate.batchSerivces(16);
	        batchCreate.batchSerivces(20);
	        batchCreate.documents(2);
	        batchCreate.pickListType(2);
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
	            
	            	browser.get(fulfillmentRequestsUrl);
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers2[0]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber);
			            browser.sleep(1000);
		            });		            
		            browser.refresh();
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers2[1]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber2 = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber2);
			            browser.sleep(1000);
		            });
	            });
	   		browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.batchPickRefresh(orderStatus);
	            });
	           
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		            batchCreate.selectFromTheSearch(2);
		            batchCreate.printPickList();     
		            browser.sleep(3000);
		
		            batchCreate.shipmentstatus(5,1).then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	    	            expect(orderStatus).toEqual("PICKLIST PRINTED");
	                });
	                browser.sleep(2000);
	                batchCreate.selectFromTheSearch(2);
	                batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
	                batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
	                browser.sleep(1000);      
	                batchCreate.submitPack("Confirm");
	                browser.sleep(2000);
						batchCreate.shipmentstatus(5,1).then(function (status) {
							orderStatus = status;
							console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
							browser.sleep(2000);
							batchCreate.batchPickRefresh(orderStatus);
							});
						});
					browser.wait(function () {
	                return BatchId != '';
	    	        }).then(function () {
	    	        browser.get(batchPickUrl);
	    	        batchCreate.shipmentstatus(5,1).then(function (status) {
	                    orderStatus = status;
	                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	    	            browser.sleep(2000);
	    	            batchCreate.batchPickRefresh(orderStatus);
	    	        });
		            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
		        	batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
    	                orders = units;
    	                console.log("total orders in Batch "+orders);
    	            });
	    			batchCreate.shipmentstatus(9,1).then(function (units) { //SKU quantity check
	    	                qty = units;
	    	                console.log("total qty in Batch "+qty);
	    	        });	
		            batchCreate.printIconClick(2);
		            batchCreate.printDocument("Packing Slips");
		            browser.sleep(3000);
		            batchCreate.printIconClick(2);
			        batchCreate.printDocument("Shipping Labels");
					batchCreate.printIconClick(2);
					batchCreate.printDocument("Combined Slips & Labels");
					browser.sleep(1000);
					batchCreate.shipmentstatus(5,1).then(function (status) {
						orderStatus = status;
						console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
						expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
						browser.sleep(2000);
			       });	            
    	       });
				
					 //!* verifying the pick list document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		     	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
		    	         	console.log("the file name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(details).toContain("Order Based Picklist");//picklist type checking
			    			expect(details).toContain(browser.params.storeNumber);//Store number checking
			    			expect(details).toContain(BatchId);//
			    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
			    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
			    			expect(details).toContain("1of2");//page number
			    	        expect(details).toContain("2of2");			    	         							
			            });
		    	   	});
		 //!*End of Doc check*!//
		 
//!* verifying the packing slip document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		    	        	var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
		    	         	console.log("the packing slip name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(line[0]).toContain(ordernumbers2[0]);//packing slip number checking
			    			expect(line[1]).toContain(ordernumbers2[0]);//order number checking
			    			expect(details).toContain(ordernumbers2[1]);//order number checking
			    			expect(line[2]).toContain(BatchId);//batch id checking
			    			expect(details).toContain(BatchId);//batch id checking
			    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
			    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
			    			expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
	    	    			expect(line[15]).toContain("1 of "+orders);//page number checking End
	    	    			expect(line[14].substring(21)).toEqual("1");//SKU quantity check
			    		    	            
			            });
		    	    });
	 //!*End of Doc check*!//		
 //!* verifying the Label document content*!//           
		            browser.wait(function () {
		    	        return BatchId != '';
		    	        }).then(function () {
		    	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
		    	         	console.log("the file name is "+filename);
		    	         	var pdfpath= browser.params.labelPath+"//"+filename;
		    	        	utils.pdfRead(pdfpath).then(function (status) {            
			                details = status;
			                console.log("content is "+details);
			                var line = [];
			    			line=details.split("\n");
			    			expect(details).toContain(browser.params.custDisplayName);//customer name checking
			    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
			    			expect(details).toContain(browser.params.custAddress1);
			    			expect(details).toContain(browser.params.custCity);
			    			expect(details).toContain(browser.params.custAddressState);					
			              });
		    	        });
		 //!*End of Doc check*!//	 
					
				browser.wait(function () {
	            return ordernumbers2 != '';
				}).then(function () {
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toEqual(1);
	            });
	            browser.sleep(2000);
	            for(i=0;i<ordernumbers2.length;i++){
	            	browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", ordernumbers2[i]);
		            browser.sleep(2000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers2[i]+" is: "+orderStatus);
	    	            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
	                expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+ordernumbers2[i]);
	                commons.searchWithCriteria("Original Order #", "ends with", ordernumbers2[i]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+ordernumbers2[i]+" is: "+orderStatus);
	    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
			            browser.sleep(2000);		            
		            });
	            }
	        });
	});
	
	it("Errored_and_NonErrored_FR_PickList_category_TC0055", function() {

		  browser.wait(function () {
	            return browser.params.orders != '';
	        }).then(function () {
		    	for(i=0;i<browser.params.orders;i++)
		    	{
		    		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(500);
			        if(i==1){
			        	salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
			            batchCreate.salesOrderCarrierUpdate("USPS","USPSFirstClass");//selecting the carrrier other than Fedex
		    		}
			        else{
				        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
				        callCenter.selectSKUFromSearch();
				        commons.search();
				        callCenter.selectSKUFromResults();
				        callCenter.addToOrderFromSalesOrder();
				        browser.sleep(2000);
		    		}
			      //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {			            
			            console.log("sales order number at the "+i+" position is" +ordernumbers4.push(value));
			            console.log("array length" +ordernumbers4.length);
			        });
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		    	
		        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
					savedStatus = value;
				    console.log("the orderstatus is "+savedStatus);	
				    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
				});	
		        browser.sleep(2000);
		        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		        callCenter.editLineGear("1");
		        callCenter.lineItemselectOptions("Release");
		        salesOrderSummary.orderRelease("Release",2);     
		        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED");
	        	}
	        });
		  	utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
		  	console.log("Folder cleaned successfully");
	        browser.get(batchPickUrl);
	        browser.sleep(1000);
			browser.sleep(1000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.Linecount(2);//Single Line Only
	        batchCreate.fullfillmentType(2)
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(3);
	        browser.sleep(500);
	        batchCreate.categoryDropdown(2);
	        //batchCreate.batchSerivces(browser.params.carrierService);
	        batchCreate.documents(2);
	        batchCreate.pickListType(1);
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
	            
	            	browser.get(fulfillmentRequestsUrl);
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers4[0]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber);
			            browser.sleep(1000);
		            });		            
		            browser.refresh();
		            commons.searchWithCriteria('Order #', 'ends with', ordernumbers4[1]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
		            	FRNumber2 = FRrequest;
		                console.log("The FR Number for the Order #"+SONumber+" is: "+FRNumber2);
			            browser.sleep(1000);
		            });
	        });
	    	browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.batchPickRefresh(orderStatus);
	            });
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.printPickList();     
	            browser.sleep(3000);
	 
	            batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("PICKLIST PRINTED");
                });
                browser.sleep(2000);
                batchCreate.selectFromTheSearch(2);
                batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
                expect(batchCreate.redAlert()).toBe(true);//checking the error icon's presence
	            batchCreate.erroredQuantity().then(function (qty) {
	            	expect(qty).toContain("1"); //checking the total errored quantity 
				})
                batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
                browser.sleep(1000);      
                batchCreate.submitPack("Confirm");
                browser.sleep(2000);
				batchCreate.shipmentstatus(5,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					browser.sleep(2000);
					batchCreate.batchPickRefresh(orderStatus);
				});
			});
	    	
	    	//!* verifying the pick list document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain("Category Based Picklist");//picklist type checking
	    			expect(details).toContain(browser.params.storeNumber);//Store number checking
	    			expect(details).toContain(BatchId);//
	    			expect(details).toContain(browser.params.Category);//Category checking
	    			expect(details).toContain(browser.params.batcpickSKU3);//SKU checking
	    			expect(details).toContain("1of2");//page number
	            });
    	   	});
 //!*End of Doc check*!//
	    	
			browser.wait(function () {
            return BatchId != '';
	        }).then(function () {
	        	browser.get(batchPickUrl);
				batchCreate.shipmentstatus(5,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					expect(orderStatus).toEqual("READY TO PRINT PACKING DOCUMENTS");
					browser.sleep(2000);
		       });	   
				batchCreate.shipmentstatus(6,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					expect(orderStatus).toEqual("View Errors");
					browser.sleep(2000);
		       });	 
        });
			browser.wait(function () {
	            return ordernumbers4 != '';
	        }).then(function () {
	        	 browser.get(callCenterSalesOrdersListUrl);   
	             salesOrderSummary.salesOrderSearch("Original Order #", ordernumbers4[1]);
				 callCenter.editLineGear(2);
			     callCenter.lineItemselectOptions("Cancel");
			     salesOrderSummary.CancellAllLine();
			     salesOrderSummary.CancelAllLineReason("NotNeeded");
			     salesOrderSummary.CNFButton();
			     browser.sleep(2000);
        
	        });
	});
	
	it("Dirty_Node_For_Rejected_QTY_TC0058", function() {
		
		browser.get(callcenterorder);
		browser.driver.manage().window().maximize();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU7);
		callCenter.selectSKUFromSearch();
		commons.search();
		callCenter.selectSKUFromResults();
		callCenter.addToOrderFromSalesOrder();
		callCenter.attachCustomer();
		callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
		salesOrderCreate.selectCustomer();
		salesOrderCreate.useSelectedCustomer();
		//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
		browser.sleep(1000);
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
		//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
		callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        batchCreate.batchPick();//redirecting to batch pick page
		batchCreate.CreateNewBatch();
		browser.sleep(1000);
		batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
		batchCreate.selectSite();
		batchCreate.siteConfirm();
		batchCreate.Linecount(2);//Single Line Only
		batchCreate.fullfillmentType(2)
		batchCreate.minFRRequest(1);
		batchCreate.maxFRRequest(100);
		batchCreate.requestDeliveryDate(browser.params.promiseddate);
		batchCreate.categoryDropdown(3);
		batchCreate.documents(2);
		batchCreate.pickListType(1);
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
	        return SONumber != '';
		}).then(function () {
		    browser.get(batchPickUrl);
		    browser.sleep(2000);
		    batchCreate.shipmentstatus(5,1).then(function (status) {
		        orderStatus = status;
		        console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		        browser.sleep(2000);
		        batchCreate.batchPickRefresh(orderStatus);
		    });
		commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
        batchCreate.selectFromTheSearch(2);
        batchCreate.printPickList();     
        browser.sleep(3000);
		batchCreate.shipmentstatus(5,1).then(function (status) {
			    orderStatus = status;
			    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
			    expect(orderStatus).toEqual("PICKLIST PRINTED");
			    browser.sleep(2000);
		});
		batchCreate.selectFromTheSearch(2);
		batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
		batchCreate.batchPickRejectQty("ALL","No Stock",0);
		expect(batchCreate.rejectQTYCountLine(5)).toEqual(batchCreate.rejectQTYCountHeader(1));
		batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
		browser.sleep(1000);      
		batchCreate.submitPack("Confirm");
	    browser.sleep(1000);
		});
		 browser.wait(function () {
		    return SONumber != '';
		}).then(function () {
			
			browser.get(callcenterorder);
			browser.driver.manage().window().maximize();
			salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU7);
			callCenter.selectSKUFromSearch();
			commons.search();
			callCenter.selectSKUFromResults();
			callCenter.addToOrderFromSalesOrder();
			callCenter.attachCustomer();
			callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			salesOrderCreate.selectCustomer();
			salesOrderCreate.useSelectedCustomer();
			//!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			browser.sleep(1000);
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
			//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
			callCenter.editLineGear("1");
	        callCenter.lineItemselectOptions("Release");
	        salesOrderSummary.orderRelease("Release",2);
	        utils.errorAlert();
	        salesOrderSummary.orderRelease("Cancel",1)
	        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("FAILED TO ALLOCATE"); 
	        salesOrderSummary.salesOrderPane("Logs");
	        salesOrderSummary.logsLine(1);
	        salesOrderSummary.logsPaneData(5).then(function (data) {
	        	dirtynode=data;
	        	expect(dirtynode).toContain((browser.params.batchpickSite).toLowerCase());
	        	browser.sleep(2000);
			});
	        
	        
						
	    });
	});
	
	
/*	it("Order_with_other_than_default_shipping_Profile_TC0045", function() {
		
		browser.get(shippingProfile);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('Name', 'ends with', browser.params.defaultShippingProfile);
        batchCreate.selectFromTheSearch(2);            
        batchCreate.shippingProfileClick(browser.params.defaultShippingProfile);
        batchCreate.disableActiveButton();
        browser.sleep(2000);
        browser.get(shippingProfile);
        commons.searchWithCriteria('Name', 'ends with', browser.params.customShippingProfile);
        batchCreate.selectFromTheSearch(2);            
        batchCreate.shippingProfileClick(browser.params.customShippingProfile);
        batchCreate.enableActiveButton();   
        browser.sleep(2500);
        browser.get(callcenterorder);
        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
        console.log("Folder cleaned successfully");
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU3);
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
        browser.sleep(1000);
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
            browser.sleep(1500);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(1000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            });
        });	   
        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        browser.get(batchPickUrl);
        browser.sleep(2000);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(2)
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
        batchCreate.categoryDropdown(3);
        batchCreate.documents(2);
        batchCreate.pickListType(1);
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
            return SONumber != '';
            }).then(function () {
                browser.get(batchPickUrl);
                browser.sleep(2000);
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            browser.sleep(2000);
    	            batchCreate.batchPickRefresh(orderStatus);
                });
               
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.printPickList();     
	            browser.sleep(3000);
	 
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("PICKLIST PRINTED");
    	            browser.sleep(2000);
                });
				batchCreate.selectFromTheSearch(2);
                batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
                batchCreate.PickConfirm("Submit & Pack");//Submit & Pack button click
                browser.sleep(1000);      
                batchCreate.submitPack("Confirm");
                browser.sleep(3000);
                batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.batchPickRefresh(orderStatus);
                });
            });
    		browser.wait(function () {
            return BatchId != '';
	        }).then(function () {
    	        browser.get(batchPickUrl);
    	        batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
	            batchCreate.batchPickRefresh(orderStatus);
            });
		        
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	    		batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
	                orders = units;
	                console.log("total orders in Batch "+orders);
	            });
    			batchCreate.shipmentstatus(9,1).then(function (units) { //SKU quantity check
    	                qty = units;
    	                console.log("total qty in Batch "+qty);
    	        });
	            batchCreate.printIconClick(2);
	            batchCreate.printDocument("Packing Slips");
	            batchCreate.printIconClick(2);
		        batchCreate.printDocument("Shipping Labels");
	            browser.sleep(3000);
				batchCreate.printIconClick(2);
				batchCreate.printDocument("Combined Slips & Labels");
				browser.sleep(1000);
				batchCreate.shipmentstatus(5,1).then(function (status) {
					orderStatus = status;
					console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
					expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
					browser.sleep(2000);
		       });	            
	      });
    		
    		//!* verifying the pick list document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {  	        	
    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain("Category Based Picklist");//picklist type checking
					expect(details).toContain(browser.params.storeNumber);//Store number checking
					expect(line[4]).toEqual(BatchId);//
					expect(details).toContain(browser.params.Category);//product id checking
					expect(line[8]).toContain(browser.params.batcpickSKU3);//SKU checking
					expect(line[7]).toContain(browser.params.storeNumber);//qty and price need to split again for pick list reading.
					expect(line[11]).toContain("1");//page number
					expect(line[10].substring(4)).toContain(qty);//page number
	            });
    	   	});
 //!*End of Doc check*!//
 //!* verifying the packing slip document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(SONumber);//packing slip number checking
	    			expect(details).toContain(SONumber);//order number checking
	    			expect(line[2]).toContain(BatchId);//batch id checking
	    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
	    			expect(line[14]).toContain(browser.params.batcpickSKU3);//SKU checking	    			
	    			expect(line[15]).toEqual("1 of "+orders);//page number checking End
	    			expect(line[14].substring(21)).toEqual(qty);//SKU quantity check		    	
	            });
    	    });
//!*End of Doc check*!//

//!* verifying the Label document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
    	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
		         	console.log("the file name is "+filename);
		         	var pdfpath= browser.params.labelPath+"//"+filename;
		        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(browser.params.custDisplayName);//customer name checking
	    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
	    			expect(details).toContain(browser.params.custAddress1);
	    			expect(details).toContain(browser.params.custCity);
	    			expect(details).toContain(browser.params.custAddressState);					
              });
	        });
//!*End of Doc check*!//
    		
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
            //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
            console.log("Folder cleaned successfully");
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
            batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
	            browser.sleep(2000);
            });
            browser.get(shippingProfile);
            commons.searchWithCriteria('Name', 'ends with', browser.params.customShippingProfile);
            batchCreate.selectFromTheSearch(2);            
            batchCreate.shippingProfileClick(browser.params.customShippingProfile);  
            batchCreate.disableActiveButton();
            browser.sleep(2500);
            browser.get(shippingProfile);
            commons.searchWithCriteria('Name', 'ends with', browser.params.defaultShippingProfile);
            batchCreate.selectFromTheSearch(2);            
            batchCreate.shippingProfileClick(browser.params.defaultShippingProfile);
            batchCreate.enableActiveButton(); 
            browser.sleep(2000);
            
        });
	});*/
	
});

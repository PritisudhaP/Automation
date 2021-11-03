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
var salesorders = [];
global.rejectqty1 = "";
global.rejectqty2 = "";
var Date="";
var ordernumbers =[]; 

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
		utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf downlod folder
		console.log("Folder cleaned successfully");
	  /*	it("Ship_Multiple_line_Multiple_Catgory_PickList_Category TC0056", function() {
	  		var orders=[];
	  		browser.wait(function () {
		            return browser.params.orders != '';
		        }).then(function () {
			        for(i =0;i<3;i++){
			  		browser.get(callcenterorder);
			        browser.driver.manage().window().maximize();
			        callCenter.attachCustomer();
			        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
			        salesOrderCreate.selectCustomer();
			        salesOrderCreate.useSelectedCustomer();
			        browser.sleep(1000);
			        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU1);
			        callCenter.selectSKUFromSearch();
			        commons.search();
			        callCenter.selectSKUFromResults();
			        callCenter.addToOrderFromSalesOrder();
			        browser.sleep(1000);      
			        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU5);
			        callCenter.selectSKUFromSearch();
			        commons.search();
			        callCenter.selectSKUFromResults();
			        callCenter.addToOrderFromSalesOrder();
			        browser.sleep(1000);  
			        salesOrderSummary.salesOrderSearch('SKU', browser.params.batcpickSKU6);
			        callCenter.selectSKUFromSearch();
			        commons.search();
			        callCenter.selectSKUFromResults();
			        callCenter.addToOrderFromSalesOrder();
			        browser.sleep(1000); 
			        
			        callCenter.editLineGear("3");
				    callCenter.lineItemselectOptions("Edit Line");
				    browser.sleep(1000);
				    callCenter.editSKUQuantity("5");
				    browser.sleep(2000);
				    callCenter.editLinePopUpSaveBtn();
			        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
			        browser.sleep(1500);
			        salesOrderCreate.saveOption("Save");
			        salesOrderCreate.salesOrderNumber().then(function (value) {
			            console.log("sales order number at the "+i+" position is" +orders.push(value));
			            console.log("array length" +orders.length);
			        });
		    	}//for loop
	    	
		    });//first function block
	        browser.sleep(2000);
	        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	  		browser.wait(function () {
	            return orders!= '';
	        }).then(function () {
	        	for(i=0;i<orders.length;i++){
	   	            browser.get(callCenterSalesOrdersListUrl);	            
		        	console.log("sales order number of "+i+"  is" +orders[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", orders[i]);
		            browser.sleep(3000);
		            salesOrderSummary.salesOrderSelectGear("Release");
		            browser.sleep(3000);
		            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	        	}
	        });
	        browser.get(batchPickUrl);
	        browser.sleep(2000);
	        batchCreate.CreateNewBatch();
	        browser.sleep(1000);
	        batchCreate.batchpickSearch("Site Name", browser.params.batchpickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.fullfillmentType(2)//ship from store
	        batchCreate.Linecount(3);//Multiple Line Only
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	      //  batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.categoryDropdown(3);//toys
	        batchCreate.categoryDropdown(2);//shoes
	        batchCreate.categoryDropdown(4);//Car parts
	        batchCreate.documents(2);//pick list
	        batchCreate.pickListType(1);// by category
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
							expect(line[0]).toContain("Category Based Picklist");//picklist type checking
							expect(line[1]).toContain(browser.params.storeNumber);//Store number checking
							expect(line[4]).toEqual(BatchId);//
							expect(line[23]).toEqual(browser.params.UPCcode);
			    			expect(line[5]).toEqual(browser.params.Category3);
			    			expect(line[18]).toEqual(browser.params.Category2);
			    			expect(line[32]).toEqual(browser.params.Category);
							expect(details).toContain(browser.params.batcpickSKU5);//SKU checking
							expect(details).toContain(browser.params.batcpickSKU6);//SKU checking
							expect(details).toContain(browser.params.batcpickSKU1);//SKU checking
							expect(line[7]).toContain(browser.params.storeNumber);//qty and price need to split again for pick list reading.
			    			expect(details).toContain(browser.params.UPCcode);
							batchCreate.shipmentstatus(8,1).then(function (units) {
								items = units;
								console.log("number of items in the batch "+items);
								expect(line[11]).toEqual("Page1of"+items);//
							});
							batchCreate.shipmentstatus(8,1).then(function (units) {
								items = units;
								console.log("number of items in the batch "+items);
								expect(line[25]).toEqual("Page2of"+items);//
							});
							batchCreate.shipmentstatus(8,1).then(function (units) {
								items = units;
								console.log("number of items in the batch "+items);
								expect(line[38]).toEqual("Page3of"+items);//
							});

			            });
		    	   	});
		 //!*End of Doc check*!//
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
					browser.sleep(1000);
	                batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
		            batchCreate.batchPickRefresh(orderStatus);
	                });
	            });	    	
	    	browser.wait(function () {
	            return orders != '';
	        }).then(function () {	
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(18,1).then(function (total) {
	                items = parseInt(total);
	                console.log("the number of items in the batch is: "+items);
		            expect(items).toEqual(orders.length);
	            });
	            for(i=0;i<orders.length;i++){
		            browser.sleep(2000);
		            browser.get(callCenterSalesOrdersListUrl);
		            salesOrderSummary.salesOrderSearch("Original Order #", orders[i]);
		            browser.sleep(1000);	           
		            salesOrderSummary.salesOrderStatus().then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+orders[i]+" is: "+orderStatus);
			            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
		            });
		            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
		 	       	browser.sleep(1000);	       
		            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("CLOSED");
		            browser.sleep(2000);
		            browser.get(fulfillmentRequestsUrl);
		            console.log("the sale sorder is "+orders[i]);
		            salesOrderSummary.salesOrderSearch("Original Order #", orders[i]);
		            browser.sleep(2000);
		            batchCreate.shipmentstatus(4,1).then(function (status) {
		                orderStatus = status;
		                console.log("the status of the order #"+orders[i]+" is: "+orderStatus);
			            expect(orderStatus).toEqual("SHIPMENT CREATED");
			            browser.sleep(2000);
		            });	            
	            }
	        });
		});
		*/
		it("CombinedPackingSlipAndShippingLabel_DISABLED TC0057", function() {
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
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	        	browser.get(scriptUrl);
	            commons.searchWithCriteria('Name', 'ends with', browser.params.scriptName);
	            callCenter.editLineGear("2");
	    	    callCenter.lineItemselectOptions("Edit");
	    	    batchCreate.ScriptActiveButton();
	    	    browser.sleep(2000);
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
	            return SONumber != '';
	        }).then(function () {
	        	
	            browser.get(batchPickUrl);                      
	            console.log("Folder cleaned successfully");
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("SLIP LABEL GENERATION ERROR");
		            browser.sleep(2000);
	            });
	        });
	         
		        browser.wait(function () {
		            return SONumber != '';
		        }).then(function () {
		        	browser.get(scriptUrl);
		            commons.searchWithCriteria('Name', 'ends with', browser.params.scriptName);
		            callCenter.editLineGear("2");
		    	    callCenter.lineItemselectOptions("Edit");
		    	    batchCreate.ScriptActiveButton();
		    	    browser.sleep(2000);
		        });
		});
});
	  	
	  	
	  	
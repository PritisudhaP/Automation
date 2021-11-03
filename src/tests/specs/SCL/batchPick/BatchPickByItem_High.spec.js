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
global.orders = "";
global.qty = "";
global.items = "";
describe("Item_Based_Batch Pick: ", function() {
	var batchCreate = new batchPickCreate();
	//var batchEdit = new batchPickEdit();
	//var batchSummary = new batchPickSummary();
	var callCenter = new callCenterScreen();
	var commons = new common();
	var salesOrderCreate = new salesOrderCreateScreen();
	var salesOrderSummary = new salesOrderSummaryScreen();
	var returnsCreate = new returnsCreateScreen();
	utils.Login(browser.params.login.user,browser.params.login.password);
	/*
	it("Ship_Single_line_Single_QTY_PickList_By_ITEM_ TC0021", function() {

		browser.get(callcenterorder);
        utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
	    console.log("Folder cleared successfully");
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        browser.sleep(500);
        callCenter.addToOrderFromSalesOrder();
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(1500);
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
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);
        batchCreate.batchPick();//redirecting to batch pick page
        batchCreate.CreateNewBatch();
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
			expect(line[4]).toEqual(BatchId);//
			expect(line[5]).toContain(browser.params.itempickSKU1);//product id checking
			expect(line[8]).toContain(browser.params.itempickSKU1);//SKU checking
			expect(details).toContain("1of1");//page number
			expect(line[10].substring(4)).toContain(qty);//page number
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
    			expect(details).toContain(SONumber);//packing slip number checking
    			expect(details).toContain(SONumber);//order number checking
    			expect(line[2]).toContain(BatchId);//batch id checking
    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
    			expect(line[14]).toContain(browser.params.itempickSKU1);//SKU checking	    			
    			expect(details).toContain("1 of "+orders);//page number checking End
    			expect(line[14]).toContain(qty);//SKU quantity check
	        	});
	    });
//!*End of Doc check*!//
 //!* verifying the Shipping Label document content*!//           
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
    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
    			expect(details).toContain(browser.params.shippingAddress);
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
                 batchCreate.fulfillmentStatus(1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
    	            browser.sleep(2000);
                });
                browser.get(batchPickUrl);            
                commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
                browser.sleep(2000);         
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
    	            browser.sleep(2000);
                });
            });
  });
 
  it("Ship_Single_line_multiple_QTY_PickList_By_ITEM_ TC0022", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
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
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        browser.sleep(1000);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
            batchCreate.shipmentstatus(9,1).then(function (units) {
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
	                //console.log("content is "+details);
	                var line = [];
					line=details.split("\n");
	    			expect(details).toContain("Item Based Picklist");//picklist type checking
	    			expect(details).toContain(browser.params.storeNumber);//Store number checking
	    			expect(line[4]).toEqual(BatchId);//
	    			expect(line[5]).toContain(browser.params.itempickSKU1);//product id checking
	    			expect(line[8]).toContain(browser.params.itempickSKU1);//SKU checking
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
	         	console.log("the packing slip name is "+filename);
	         	var pdfpath= browser.params.labelPath+"//"+filename;
	        	utils.pdfRead(pdfpath).then(function (status) {            
                details = status;
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			expect(details).toContain(SONumber);//packing slip number checking
    			expect(details).toContain(SONumber);//order number checking
    			expect(line[2]).toContain(BatchId);//batch id checking
    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
    			expect(line[14]).toContain(browser.params.itempickSKU1);//SKU checking	    			
    			expect(line[15]).toEqual("1 of "+orders);//page number checking End
    			expect(line[14].substring(21)).toContain(qty);//SKU quantity check    			         
            });
	    });
//!*End of Doc check*!//
//!* verifying the Shipping Label document content*!//           
        browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
	         	console.log("the file name is "+filename);
	         	var pdfpath= browser.params.labelPath+"//"+filename;
	        	utils.pdfRead(pdfpath).then(function (status) {            
                details = status;
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
    			expect(details).toContain(browser.params.shippingAddress);
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
                 batchCreate.fulfillmentStatus(1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
    	            browser.sleep(2000);
                });
                browser.get(batchPickUrl);            
                commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
                browser.sleep(2000);         
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
    	            browser.sleep(2000);
                });
            });
  });  	  
   it("Ship_Multiple_line_multiple_QTY_PickList_By_ITEM_ TC0023", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(1000);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(1000);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("5");
        callCenter.editLinePopUpSaveBtn();
        browser.sleep(1000);
        callCenter.editLineGear("4");
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
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        browser.sleep(1000);
        batchCreate.CreateNewBatch();
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(3);//Multiple Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
		       	//console.log("content is "+details);
		       	var line = [];
				line=details.split("\n");
				expect(details).toContain("Item Based Picklist");//picklist type checking
				expect(details).toContain(browser.params.storeNumber);//Store number checking
				expect(line[4]).toEqual(BatchId);//
				expect(line[8]).toContain(browser.params.itempickSKU1);//SKU checking
				expect(details).toContain(browser.params.itempickSKU3);//SKU checking
				expect(line[11]).toContain("1");//page number
				expect(line[10].substring(4)).toContain("5");//qty checking
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
		    	//console.log("content is "+details);
		    	var line = [];
				line=details.split("\n");
				expect(details).toContain(SONumber);//packing slip number checking
				expect(details).toContain(SONumber);//order number checking
				expect(line[2]).toContain(BatchId);//batch id checking
				expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
				expect(line[14]).toContain(browser.params.itempickSKU3);//SKU checking	 
				expect(details).toContain(browser.params.itempickSKU1);//SKU checking	
				expect(details).toContain("1 of "+orders);//page number checking End
	   			expect(line[14].substring(21)).toContain("5");//SKU quantity check	            
		   });
		});
		//!*End of Doc check*!//
		//!* verifying the Shipping Label document content*!//           
		browser.wait(function () {
		   return BatchId != '';
		   }).then(function () {
		   		var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
		   		console.log("the file name is "+filename);
		   		var pdfpath= browser.params.labelPath+"//"+filename;
		   		utils.pdfRead(pdfpath).then(function (status) {            
		   		details = status;
		   		//console.log("content is "+details);
		   		var line = [];
				line=details.split("\n");
				//expect(details).toContain((browser.params.custLabelName));//customer name checking
				expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
				expect(details).toContain(browser.params.shippingAddress);
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
    	            expect(items).toEqual(2);
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
                 batchCreate.fulfillmentStatus(1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
    	            browser.sleep(2000);
                });
                browser.get(batchPickUrl);            
                commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
                browser.sleep(2000);          
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
    	            browser.sleep(2000);
                });
            });
  		});
   
		it("PickList_By_ITEM_Past_Promise_Date TC0024", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
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
        browser.sleep(500);
        callCenter.promisedDate(browser.params.pastPromisedate);
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
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.pastPromisedate);
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
	                //console.log("content is "+details);
	                var line = [];
					line=details.split("\n");
	    			expect(details).toContain("Item Based Picklist");//picklist type checking
	    			expect(details).toContain(browser.params.storeNumber);//Store number checking
	    			expect(line[4]).toEqual(BatchId);//
	    			expect(details).toContain(browser.params.itempickSKU3);//product id checking
	    			expect(line[8]).toContain(browser.params.itempickSKU3);//SKU checking
	    			expect(line[11]).toContain("Page1of1");//page number
	    			expect(line[10].substring(4)).toContain(qty);//page number
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(SONumber);//packing slip number checking
					expect(details).toContain(SONumber);//order number checking
					expect(line[2]).toContain(BatchId);//batch id checking
					expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
					expect(line[14]).toContain(browser.params.itempickSKU3);//SKU checking	    			
					expect(line[15]).toEqual("1 of "+orders);//page number checking End
	    			expect(line[14].substring(21)).toContain(qty);//SKU quantity check
	            });
		    });
	//!*End of Doc check*!//
//!* verifying the shipping Label document content*!//           
        browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {	        	
	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
	         	console.log("the file name is "+filename);
	         	var pdfpath= browser.params.labelPath+"//"+filename;
	        	utils.pdfRead(pdfpath).then(function (status) {            
                details = status;
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
    			expect(details).toContain(browser.params.shippingAddress);
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
                 batchCreate.fulfillmentStatus(1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
    	            browser.sleep(2000);
                });
                browser.get(batchPickUrl);            
                commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());	                    
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
    	            browser.sleep(2000);
                });
            });
		});
	   
		it("PickList_By_ITEM_CurrentDateAsPromise_Date TC0025", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        Date=utils.currentDate();
        console.log("the current date is " +Date);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
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
        browser.sleep(500);
        callCenter.promisedDate(Date);
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
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(Date);
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
            batchCreate.shipmentstatus(9,1).then(function (units) {
                qty = units;
                console.log("total qty in Batch "+qty);
            });
			batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
				orders = units;
				console.log("total orders in Batch "+orders);
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
    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                //console.log("content is "+details);
	                var line = [];
					line=details.split("\n");
	    			expect(details).toContain("Item Based Picklist");//picklist type checking
	    			expect(details).toContain(browser.params.storeNumber);//Store number checking
	    			expect(line[4]).toEqual(BatchId);//
	    			expect(details).toContain(browser.params.itempickSKU3);//product id checking
	    			expect(line[8]).toContain(browser.params.itempickSKU3);//SKU checking
	    			expect(line[11]).toContain("Page1of1");//page number
	    			expect(line[10].substring(4)).toContain(qty);//page number

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
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			expect(details).toContain(SONumber);//packing slip number checking
				expect(details).toContain(SONumber);//order number checking
				expect(line[2]).toContain(BatchId);//batch id checking
				expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
				expect(line[14]).toContain(browser.params.itempickSKU3);//SKU checking	   
    			expect(line[14].substring(21)).toContain(qty);//SKU quantity check
				expect(line[15]).toEqual("1 of "+orders);//page number checking End
            });
	    });
//!*End of Doc check*!//
//!* verifying the Shipping Label document content*!//           
        browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
	         	console.log("the file name is "+filename);
	         	var pdfpath= browser.params.labelPath+"//"+filename;
	        	utils.pdfRead(pdfpath).then(function (status) {            
                details = status;
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
    			expect(details).toContain(browser.params.shippingAddress);
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
                 batchCreate.fulfillmentStatus(1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the order #"+SONumber+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("SHIPMENT CREATED");
    	            browser.sleep(2000);
                });
                browser.get(batchPickUrl);            
                commons.searchWithCriteria('Batch Id', 'ends with', BatchId.toString());
                
                batchCreate.shipmentstatus(5,1).then(function (status) {
                    orderStatus = status;
                    console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
    	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
    	            browser.sleep(2000);
                });
            });
		});
		
		it("Ship_Single_line_Single_QTY_PickList_BY_Item_Reject TC0026", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
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
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
				batchCreate.shipmentstatus(9,1).then(function (units) {
	                qty = units;
	                console.log("total qty in Batch "+qty);
	            });
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.printPickList();     
	            browser.sleep(3000);
	            batchCreate.selectFromTheSearch(2);
	            batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click	            
	            batchCreate.batchPickRejectQty("ALL","Product Damaged",0);
	            expect(batchCreate.rejectQTYCountLine(5)).toEqual(batchCreate.rejectQTYCountHeader(1));
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
//!* verifying the pick list document content*!//           
    		browser.wait(function () {
	        return BatchId != '';
	        }).then(function () {
	        	browser.sleep(8000);
	        	browser.waitForAngular();
	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
	         	console.log("the file name is "+filename);
	         	var pdfpath= browser.params.labelPath+"//"+filename;
	        	utils.pdfRead(pdfpath).then(function (status) {            
                details = status;
                //console.log("content is "+details);
                var line = [];
				line=details.split("\n");
    			expect(details).toContain("Item Based Picklist");//picklist type checking
				expect(details).toContain(browser.params.storeNumber);//Store number checking
				expect(line[4]).toEqual(BatchId);//
				expect(details).toContain(browser.params.itempickSKU3);//product id checking
				expect(line[8]).toContain(browser.params.itempickSKU3);//SKU checking
				expect(line[7]).toContain(browser.params.storeNumber);//qty and price need to split again for pick list reading.
				expect(line[11]).toContain("1of1");//page number
    			expect(line[10].substring(4)).toContain(qty);//page number
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
 	 	  */
 	it("Ship_Single_line_Multiple_QTY_PickList_By_Item_Reject TC0027", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(500);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(500);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        browser.sleep(500);
        callCenter.editSKUQuantity("5");
        callCenter.editLinePopUpSaveBtn();
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
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        batchCreate.CreateNewBatch();
        browser.sleep(500);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.fullfillmentType(2)
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
				batchCreate.batchPickRejectQty("ALL","Product Damaged",2);
				expect(batchCreate.rejectQTYCountLine(5)).toEqual(batchCreate.rejectQTYCountHeader(1));
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
				batchCreate.refreshBatch();
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");			    			
					expect(details).toContain("Item Based Picklist");//picklist type checking
					expect(details).toContain(browser.params.storeNumber);//Store number checking
					expect(line[4]).toEqual(BatchId);//
					expect(details).toContain(browser.params.itempickSKU3);//product id checking
					expect(line[8]).toContain(browser.params.itempickSKU3);//SKU checking
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(SONumber);//packing slip number checking
					expect(details).toContain(SONumber);//order number checking
					expect(line[2]).toContain(BatchId);//batch id checking
					expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
					expect(line[14]).toContain(browser.params.itempickSKU3);//SKU checking	 
	    			expect(line[14].substring(21)).toContain("2");//SKU quantity check
	    			expect(line[15]).toEqual("1 of "+orders);//page number checking End

	            });
    	    });
//!*End of Doc check*!//	 
//!* verifying the Shipping Label document content*!//           
            browser.wait(function () {
    	        return BatchId != '';
    	        }).then(function () {
		        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
		         	console.log("the file name is "+filename);
		         	var pdfpath= browser.params.labelPath+"//"+filename;
		        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
	    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
	    			expect(details).toContain(browser.params.shippingAddress);
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
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            });
            salesOrderSummary.salesOrderSelectGear("View");//editing the Order        
 	       	browser.sleep(1000);	       
            expect(salesOrderSummary.OrderStatusDetails(2)).toEqual("PARTIALLY SHIPPED");
            browser.sleep(2000);
            browser.get(fulfillmentRequestsUrl);
            console.log("the sale sorder is "+SONumber);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
             batchCreate.fulfillmentStatus(1).then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            browser.sleep(2000);
            });	  
        });
	});	
	it("Ship_Multiple_line_Multiple_QTY_PickList_By_item_Reject TC0028", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        callCenter.attachCustomer();
        browser.sleep(1000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(1000);
        salesOrderCreate.selectCustomer();
        browser.sleep(1000);
        salesOrderCreate.useSelectedCustomer();
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU3);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(1000);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("5");
        callCenter.editLinePopUpSaveBtn();
        callCenter.editLineGear("4");
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
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        browser.sleep(1000);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(2);
        batchCreate.Linecount(3);//Multiple Line Only
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
				batchCreate.selectFromTheSearch(2);
				batchCreate.PickConfirm("Pick Confirm By Item");//pick confirm by item button click
				batchCreate.batchPickRejectQty("ALL","Product Damaged",2);
				browser.sleep(500);
				batchCreate.rejectQTYCountLine(5).then(function (total) {
					rejectqty1 = parseInt(total);
					console.log("the number of rejected items in line 1: "+rejectqty1);
				});
				batchCreate.rejectQTYCountLine(10).then(function (total) {
					rejectqty2 = parseInt(total);
					console.log("the number of rejected items in line 2: "+rejectqty2);
					totalrejected = rejectqty1+rejectqty2;
					expect(batchCreate.rejectQTYCountHeader(1)).toEqual(totalrejected.toString());	                
				});
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
					batchCreate.refreshBatch();
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
    	        	browser.sleep(8000);
    	        	browser.waitForAngular();
    	        	var filename=utils.getFileName(browser.params.labelPath,"pickList-",BatchId);//getting the file name
    	         	console.log("the file name is "+filename);
    	         	var pdfpath= browser.params.labelPath+"//"+filename;
    	        	utils.pdfRead(pdfpath).then(function (status) {            
	                details = status;
	                //console.log("content is "+details);
	                var line = [];
					line=details.split("\n");
	    			expect(details).toContain("Item Based Picklist");//picklist type checking
					expect(details).toContain(browser.params.storeNumber);//Store number checking
					expect(line[4]).toEqual(BatchId);//
					expect(details).toContain(browser.params.itempickSKU1);//SKU checking
					expect(details).toContain(browser.params.itempickSKU3);//SKU checking
					expect(line[11]).toContain("1of2");//page number
					expect(details).toContain("2of2");//page number
					expect(line[10].substring(4)).toContain("5");//qty checking		
				});
		   });
 //!*End of Doc check*!// 
	 
	 //!* verifying the packing slip document content*!//           
			browser.wait(function () {
				return BatchId != '';
				}).then(function () {
					browser.sleep(8000);
					browser.waitForAngular();
					var filename=utils.getFileName(browser.params.labelPath,"packslip-",BatchId);//getting the file name
					console.log("the file name is "+filename);
					var pdfpath= browser.params.labelPath+"//"+filename;
					utils.pdfRead(pdfpath).then(function (status) {            
					details = status;
					//console.log("content is "+details);
					var line = [];
					line=details.split("\n");
					expect(details).toContain(SONumber);//packing slip number checking
					expect(details).toContain(SONumber);//order number checking
					expect(line[2]).toContain(BatchId);//batch id checking
					expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
					expect(line[14]).toContain(browser.params.itempickSKU3);//SKU checking	 
					expect(details).toContain(browser.params.itempickSKU1);//SKU checking	    												
					expect(details).toContain("1 of "+orders);//page number checking End
					expect(line[14].substring(21)).toContain("2");//SKU quantity check
						
				});
			});
 //!*End of Doc check*!//
 //!* verifying the Shipping Label document content*!//           
			browser.wait(function () {
				return BatchId != '';
				}).then(function () {
					browser.sleep(8000);
					browser.waitForAngular();
				var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
				console.log("the file name is "+filename);
				var pdfpath= browser.params.labelPath+"//"+filename;
				utils.pdfRead(pdfpath).then(function (status) {            
				details = status;
				//console.log("content is "+details);
				var line = [];
				line=details.split("\n");
				//expect(details).toContain((browser.params.custLabelName));//customer name checking
				expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
					expect(details).toContain(browser.params.shippingAddress);
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
	            expect(items).toEqual(2);
            });
            browser.sleep(2000);
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
             batchCreate.fulfillmentStatus(1).then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            browser.sleep(2000);
            });
            
       });
	});					
/*
	it("BOPIS_Single_line_PickList_By_Item TC0029", function() {
	
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(1500);
        callCenter.editLineGear("3");
        callCenter.lineItemselectOptions("Edit Line");
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        salesOrderCreate.availableStore(browser.params.itempickStore);
        callCenter.editLinePopUpSaveBtn(); 
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
        browser.sleep(1500);
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
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page      
        batchCreate.availableBatchDetails(2).then(function (available) {
        	singleLineBB = parseInt(available);
            console.log("single line before creating the batch is "+singleLineBB);
        });
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(3)
        batchCreate.Linecount(2);//Single Line Only
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
        batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
            browser.get(batchPickUrl);
            browser.sleep(2000);
//getting the number of order in the batch created.	            
            batchCreate.shipmentstatus(7,1).then(function (total) {
                totalorders = parseInt(total);
                console.log("the number of orders in the batch : "+totalorders);
                aftertotalline = singleLineBB-totalorders;
                console.log("the total signle line quantity after batch creation "+aftertotalline);
            });	           
            batchCreate.availableBatchDetails(2).then(function (available) {
            	singleLineAB= parseInt(available);
                console.log("single line after creating the batch is "+singleLineAB);
                expect(singleLineAB).toEqual(aftertotalline);
            });
            batchCreate.shipmentstatus(5,1).then(function (status) {
                orderStatus = status;
                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            browser.sleep(2000);
				batchCreate.batchPickRefresh(orderStatus);
            });	            	           
            browser.sleep(1000);	            
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
            browser.sleep(2000);
            batchCreate.printIconClick(2);
	        batchCreate.printDocument("Shipping Labels");
            browser.sleep(2000);	        
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
            //console.log("content is "+details);
            var line = [];
			line=details.split("\n");
			expect(details).toContain("Item Based Picklist");//picklist type checking
			expect(details).toContain(browser.params.storeNumber);//Store number checking
			expect(line[4]).toEqual(BatchId);//
			expect(line[5]).toContain(browser.params.itempickSKU1);//product id checking
			expect(line[8]).toContain(browser.params.itempickSKU1);//SKU checking
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
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			expect(details).toContain(SONumber);//packing slip number checking
    			expect(details).toContain(SONumber);//order number checking
    			expect(line[2]).toContain(BatchId);//batch id checking
    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
    			expect(line[9]).toContain(browser.params.itempickSKU1);//SKU checking	
    			expect(details).not.toContain("Ship To");
	    		expect(line[10]).toEqual("1 of "+orders);//page number checking End
    			expect(line[9].substring(29)).toEqual(qty);//SKU quantity check
   	            });
       	    });
   //!*End of Doc check*!//
    //!* verifying the shipping Label document content*!//           
               browser.wait(function () {
       	        return BatchId != '';
       	        }).then(function () {
       	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
       	         	console.log("the file name is "+filename);
       	         	var pdfpath= browser.params.labelPath+"//"+filename;
       	        	utils.pdfRead(pdfpath).then(function (status) {            
   	                details = status;
   	                //console.log("content is "+details);
   	                var line = [];
   	    			line=details.split("\n");
   	    			expect(line[2]).toContain((browser.params.custDisplayName));//customer name checking
   	    			expect(line[3]).toContain(SONumber);
   	    			expect(details).not.toContain(browser.params.custZipcode5);//customer zip code checking
   	    			expect(details).not.toContain(browser.params.shippingAddress);
   	    			expect(details).not.toContain(browser.params.custCity);
   	    			expect(details).not.toContain(browser.params.custAddressState);					
   	              });
       	        });
    //!*End of Doc check*!//
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
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);		        
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
	        	
	        	browser.get(storePortalV2Url);
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);
	            batchCreate.orderPickUp(browser.params.custDisplayName,"Driving License","1236541","test");
	            browser.sleep(1500);
	            browser.get(callCenterSalesOrdersListUrl);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
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
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);		        
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });		            
	        });	         
	});

	it("BOPIS_Multiple_line_PickList_By_Item_TC0030", function() {
		
		browser.get(callcenterorder);
        browser.driver.manage().window().maximize();
        browser.sleep(1000);
        salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
		salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU2);
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
        salesOrderCreate.availableStore(browser.params.itempickStore);
        callCenter.editLinePopUpSaveBtn(); 
        callCenter.editLineGear("4");
        callCenter.lineItemselectOptions("Edit Line");
        callCenter.editSKUQuantity("2");
        salesOrderCreate.fullfillmentType(browser.params.fullFillmentType);
        browser.sleep(100);
        salesOrderCreate.availableStore(browser.params.itempickStore);
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
        //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
        //utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
        console.log("Folder cleaned successfully");
        batchCreate.batchPick();//redirecting to batch pick page
        browser.sleep(500);
        batchCreate.availableBatchDetails(3).then(function (available) {
        	multiLineBB = parseInt(available);
            console.log("Multi line before creating the batch is "+multiLineBB);
        });
		browser.sleep(1000);
        batchCreate.CreateNewBatch();
        browser.sleep(1000);
        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
        batchCreate.selectSite();
        batchCreate.siteConfirm();
        batchCreate.fullfillmentType(3)
        batchCreate.Linecount(3);//Multiple Lines Only
        batchCreate.minFRRequest(1);
        batchCreate.maxFRRequest(100);
         batchCreate.requestDeliveryDate(browser.params.promiseddate);
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
	            browser.get(batchPickUrl);
	            browser.sleep(2000);
//getting the number of order in the batch created.	            
	            batchCreate.shipmentstatus(7,1).then(function (total) {
	                totalorders = parseInt(total);
	                console.log("the number of orders in the batch : "+totalorders);
	                aftertotalline = multiLineBB-totalorders;
	                console.log("the total single line quantity after batch creation "+aftertotalline);
	            });	           
	            batchCreate.availableBatchDetails(3).then(function (available) {
	            	multiLineAB= parseInt(available);
	                console.log("Multi line after creating the batch is "+multiLineAB);
	                expect(multiLineAB).toEqual(aftertotalline);
	            });
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            browser.sleep(2000);
					batchCreate.batchPickRefresh(orderStatus);
	            });	            	           
	            browser.sleep(1000);	            
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
	            batchCreate.printIconClick(2);
	            batchCreate.printDocument("Packing Slips");
	            browser.sleep(3000);
 	            batchCreate.printIconClick(2);
 		        batchCreate.printDocument("Shipping Labels");
 	            browser.sleep(2000);
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
                //console.log("content is "+details);
                var line = [];
    			line=details.split("\n");
    			expect(details).toContain("Item Based Picklist");//picklist type checking
    			expect(details).toContain(browser.params.storeNumber);//Store number checking
    			expect(line[4]).toEqual(BatchId);//
    			expect(details).toContain(browser.params.itempickSKU2);//product id checking
    			expect(details).toContain(browser.params.itempickSKU1);//SKU checking
    			expect(line[11]).toContain("1of2");//page number
    			expect(details).toContain("2of2");//page number
    			expect(line[10].substring(4)).toContain("1");
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(SONumber);//packing slip number checking
	    			expect(details).toContain(SONumber);//order number checking
	    			expect(line[2]).toContain(BatchId);//batch id checking
	    			expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
	    			expect(details).toContain(browser.params.itempickSKU1);//SKU checking	
	    			expect(details).toContain(browser.params.itempickSKU2);//SKU checking	
	    			expect(details).not.toContain("Ship To");
	    			expect(line[11]).toEqual("1 of 1");//page number checking End
    	            expect(line[9].substring(21)).toContain("1");//SKU quantity check			    	           
		            });
	    	    });
 //!*End of Doc check*!//
 //!* verifying the Shipping Label document content*!//           
 	            browser.wait(function () {
 	    	        return BatchId != '';
 	    	        }).then(function () {
 	    	        	var filename=utils.getFileName(browser.params.labelPath,"label-",BatchId);//getting the file name
 	    	         	console.log("the file name is "+filename);
 	    	         	var pdfpath= browser.params.labelPath+"//"+filename;
 	    	        	utils.pdfRead(pdfpath).then(function (status) {            
 		                details = status;
 		                //console.log("content is "+details);
 		                var line = [];
 		    			line=details.split("\n");
 		    			expect(line[2]).toContain((browser.params.custDisplayName).toUpperCase());//customer name checking
 		    			expect(line[3]).toContain(SONumber);
 		    			expect(details).not.toContain(browser.params.custZipcode5);//customer zip code checking
 		    			expect(details).not.toContain(browser.params.shippingAddress);
 		    			expect(details).not.toContain(browser.params.custCity);
 		    			expect(details).not.toContain(browser.params.custAddressState);					
 		              });
 	    	        });
 	 //!*End of Doc check*!//
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
            
            browser.get(batchPickUrl);
            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);		        
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
	            commons.searchWithCriteria('Batch Id', 'ends with', BatchId);		        
	            batchCreate.shipmentstatus(5,1).then(function (status) {
	                orderStatus = status;
	                console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
		            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
		            browser.sleep(2000);
	            });
	            
	        });
	});

	it("Ship_Alone_FR_Item_Based TC0043", function() {
	
		var FRnumbers = [];
		browser.get(callcenterorder);
	    browser.driver.manage().window().maximize();
	    salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU4);
	    callCenter.selectSKUFromSearch();
	    commons.search();
	    callCenter.selectSKUFromResults();
	    callCenter.addToOrderFromSalesOrder();
	    salesOrderSummary.salesOrderSearch('SKU', browser.params.itempickSKU45);
	    callCenter.selectSKUFromSearch();
	    commons.search();
	    callCenter.selectSKUFromResults();
	    callCenter.addToOrderFromSalesOrder();
	    callCenter.attachCustomer();
	    callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	    salesOrderCreate.selectCustomer();
	    salesOrderCreate.useSelectedCustomer();
	    	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	    browser.sleep(1500);
	    salesOrderCreate.saveOption("Save");
	    salesOrderCreate.salesOrderNumber().then(function (value) {
	        SONumber = value;
	        console.log("sales order number"+SONumber);
	    });	    
	    //!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
	    callCenter.editLineGear("1");
        callCenter.lineItemselectOptions("Release");
        salesOrderSummary.orderRelease("Release",2);     
        expect(salesOrderSummary.OrderStatusDetails(1)).toEqual("RELEASED"); 
       
	    browser.wait(function () {
	        return SONumber != '';
	    }).then(function () {
	    	//utils.pdfFolderCleanUp(browser.params.labelPath);//cleaning up the pdf download folder
	        console.log("Folder cleaned successfully");
	        batchCreate.batchPick();//redirecting to batch pick page
	        batchCreate.CreateNewBatch();
	        batchCreate.batchpickSearch("Site Name", browser.params.ItemPickSite,2);
	        batchCreate.selectSite();
	        batchCreate.siteConfirm();
	        batchCreate.fullfillmentType(2);
	        batchCreate.Linecount(1);
	        batchCreate.minFRRequest(1);
	        batchCreate.maxFRRequest(100);
	        batchCreate.requestDeliveryDate(browser.params.promiseddate);
	        batchCreate.ShipAlone();
	        batchCreate.packageType(browser.params.packageValue);
	        batchCreate.documents(2);
	    	batchCreate.pickListType(3);
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
	        
	        	browser.get(fulfillmentRequestsUrl);
	            commons.searchWithCriteria('Order #', 'ends with', SONumber);
	            browser.sleep(2000);
	            batchCreate.shipmentstatus(8,1).then(function (FRrequest) {
	            	FRNumber = FRrequest;
	                console.log("The first FR Number is: "+FRNumber);
		            browser.sleep(1000);
	            });		            
	            batchCreate.shipmentstatus(8,2).then(function (FRrequest) {
	            	FRNumber2 = FRrequest;
	                console.log("The Second FR Number is: "+FRNumber2);
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
				browser.sleep(1000);
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
	            batchCreate.shipmentstatus(8,1).then(function (units) {
					items = units;
					console.log("number of items in the batch "+items);
				});
	            batchCreate.shipmentstatus(7,1).then(function (units) { //page number checking start
					orders = units;
					console.log("total orders in Batch "+orders);
				});
	            batchCreate.printIconClick(2);
	            batchCreate.printDocument("Packing Slips");		
	        	browser.sleep(5000);
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
					expect(details).toContain("Item Based Picklist");//picklist type checking
					expect(details).toContain(browser.params.storeNumber);//Store number checking
					expect(line[4]).toEqual(BatchId);//
					expect(line[5]).toContain(browser.params.itempickSKU4);//product id checking
					expect(line[18]).toContain(browser.params.itempickSKU45);//product id checking
					expect(line[8]).toContain(browser.params.itempickSKU4);//SKU checking
					expect(details).toContain(browser.params.itempickSKU45);//SKU checking
					expect(details).toContain(browser.params.storeNumber);//qty and price need to split again for pick list reading.
					expect(line[11]).toEqual("Page1of"+items);//
					expect(line[24]).toEqual("Page2of"+items);//
					expect(line[10].substring(4)).toContain("1");//line 1 qty checking
					expect(line[23].substring(4)).toContain("1");//line 2 qtychecking 
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
	                //console.log("content is "+details);
	                var line = [];
	    			line=details.split("\n");
	    			expect(details).toContain(SONumber);//packing slip number checking
					expect(details).toContain(SONumber);//order number checking
					expect(line[18]).toContain(SONumber);
					expect(line[19]).toContain(SONumber);
					expect(line[2]).toContain(BatchId);//batch id checking
					expect(line[20]).toContain(BatchId);//batch id checking
					expect(line[4]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
					expect(line[22]).toContain((browser.params.custDisplayName).toUpperCase());// checking the customer name
					expect(line[14]).toContain(browser.params.itempickSKU4);//SKU checking	 
					expect(details).toContain(browser.params.itempickSKU45);//SKU checking	    			
					expect(line[15]).toEqual("1 of "+orders);//page number checking End
					expect(line[33]).toEqual("1 of "+orders);//page number checking End
					expect(line[14].substring(23)).toContain("1");//SKU quantity check
					expect(line[32].substring(23)).toContain("1");//SKU quantity check
	            });
    	    });
//!*End of Doc check*!//
 //!* verifying the Shipping Label document content*!//           
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
	    			//expect(details).toContain((browser.params.custLabelName));//customer name checking
	    			expect(details).toContain(browser.params.custZipcode5);//customer zip code checking
	    			expect(details).toContain(browser.params.shippingAddress);
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
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber);
	        browser.sleep(2000);
	         batchCreate.fulfillmentStatus(1).then(function (status) {
	            orderStatus = status;
	            console.log("the shipment status of FR1 is: "+orderStatus);
	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            browser.sleep(2000);
	        });
	        browser.refresh();
	        salesOrderSummary.salesOrderSearch("Shipment Request #", FRNumber2);
	        browser.sleep(2000);
	         batchCreate.fulfillmentStatus(1).then(function (status) {
	            orderStatus = status;
	            console.log("the shipmnet status of FR2 is: "+orderStatus);
	            expect(orderStatus).toEqual("SHIPMENT CREATED");
	            browser.sleep(2000);
	        });
	        browser.get(batchPickUrl);            			
	        commons.searchWithCriteria('Batch Id', 'ends with', BatchId);           
	        batchCreate.shipmentstatus(5,1).then(function (status) {
	            orderStatus = status;
	            console.log("the status of the Batch #"+BatchId+" is: "+orderStatus);
	            expect(orderStatus).toEqual("FULFILLMENT COMPLETED");
	            browser.sleep(2000);
	        	});
	    	});
	 }); 	  */
});
	
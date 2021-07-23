var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var utils = require(process.cwd() + '/src/tests/screens/batchPick/Utilities.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.RMANumber = "";
global.orderStatus = "";
global.SONumber = "";
global.RMAStatus = "";
global.RMAInspectedStatus = "";
global.RMAchangededStatus = "";
global.Shipmentstatus = "";
global.InspectedQTY="";
global.paymentDispositionStatus = "";
global.retunInvoiceStatus = "";
global.orderReturnStatus = "";
global.orderReturnReleaseStatus = "";
global.notFoundStatus = "";
global.RMANumber1 = "";
global.RMANumber2 = "";
global.RMANumber3 = "";
global.RMANumber4 = "";


describe("Order returns : ", function() {
	  	var returnsCreate = new returnsCreateScreen();
	    var returnsEdit = new returnsEditScreen();
	    var returnsSummary = new returnsSummaryScreen();
	    var callCenter = new callCenterScreen();
	    var commons = new common();
	    var salesOrderCreate = new salesOrderCreateScreen();
	    var salesOrderSummary = new salesOrderSummaryScreen();
	    var commons = new common();
		utils.Login(browser.params.login.user,browser.params.login.password);

        it('Order returns full QTY - TC0004', function(){
        	browser.get(callcenterorder);
			browser.driver.manage().window().maximize();
	        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
	            callCenter.enterItemQty("1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	           // browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);  
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	        });
        	
        ///******orders Returns************///	
	        
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
            browser.sleep(2000);
            commons.searchWithCriteria("Order #","ends with",SONumber);
            returnsCreate.selectOrder();
            browser.sleep(4000);
            returnsCreate.selectAllLineitem();
            browser.sleep(4000);
            returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
            browser.sleep(3000);
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
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
               // returnsSummary.returnsSelectGear("Release");
                //returnsSummary.returnsSearchRemove("1");
                //console.log("the status of the RMA #"+ RMANumber+"is "+returnsSummary.returnsStatus());
               // expect(returnsSummary.returnsStatus()).toEqual('RELEASED');
                
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });
                
                browser.sleep(2000);
               // returnsEdit.selectRMALineCheckboxForReceive();
                //browser.sleep(2000);
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
            	
            }); 
             
      });
        
        it('Order returns Partial QTY - TC0005', function(){
        	browser.get(callcenterorder);
			browser.driver.manage().window().maximize();
	        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
	        callCenter.editSKUQuantity("4");
	        callCenter.editLinePopUpSaveBtn();
	        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************
	        browser.sleep(300);
	        salesOrderCreate.saveOption("Save");
	        salesOrderCreate.salesOrderNumber().then(function (value) {
	            SONumber = value;
	            console.log("sales order number"+SONumber);
	        });
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
	        //!*********fulfillment request**********!//
	        browser.wait(function () {
	            return SONumber != '';
	        }).then( function () {
		        callCenter.fullFillmentPage();
		        callCenter.page("Fulfillment Requests");
	            console.log("the sale sorder is "+SONumber)
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(3000);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(3000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            browser.sleep(2000);
	            callCenter.packageSelection(browser.params.packageValue);
	            browser.sleep(5000);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("4");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	                    	
	        })
        	
        ///******orders Returns************///	
	        
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
            browser.sleep(2000);
            commons.searchWithCriteria("Order #","ends with",SONumber);
            returnsCreate.selectOrder();
            browser.sleep(4000);
            returnsCreate.orderSelectFirstLine();
            browser.sleep(4000);
            returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
            browser.sleep(3000);
            returnsCreate.saveReturns();   
            browser.sleep(3000);
            returnsCreate.orderReturnQtyTextbox(2);
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
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
               // returnsSummary.returnsSelectGear("Release");
                //returnsSummary.returnsSearchRemove("1");
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });
                browser.sleep(2000);
               // returnsEdit.selectRMALineCheckboxForReceive();
                //browser.sleep(2000);
                returnsEdit.selectRMALineClickForReceive();
                browser.sleep(2000);
                callCenter.editLineGear("1")
                browser.sleep(1000);
                callCenter.lineItemselectOptions("Receive Inventory");
                browser.sleep(1000);
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
	      });
	            
     })    

      it('Order returns delete RMA - TC0006', function(){
        	browser.get(callCenterInventoryUrl);
	        browser.driver.manage().window().maximize();
	        browser.sleep(2000);
	        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
	        callCenter.selectSKUFromSearch();
	        browser.sleep(2000);
	        commons.search();
	        browser.sleep(2000);
	        callCenter.selectSKUFromResults();
	        callCenter.addToOrder();
	        browser.sleep(3000);
	        callCenter.attachCustomer();
	        browser.sleep(4000);
	        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
	        browser.sleep(3000);
	        salesOrderCreate.selectCustomer();
	        browser.sleep(2000);
	        salesOrderCreate.useSelectedCustomer();
	        browser.sleep(3000);	       
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
	            //commons.multiselect();
	            browser.sleep(3000);
	            salesOrderSummary.salesOrderSelectGear("Release");
	            browser.sleep(3000);
	            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
	            salesOrderSummary.salesOrderStatus().then(function (status) {
	                orderStatus = status;
	                console.log("the status of the order #"+SONumber+" is: "+orderStatus);

	            });

	            //!*********fulfillment request**********!//
	         
	            browser.get(fulfillmentRequestsUrl);
	            console.log("the sale sorder is "+SONumber)
	            browser.sleep(2000);
	            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
	            browser.sleep(3000);
	            callCenter.fulfillmentOrderSelectGear("Create Shipment");
	            browser.sleep(3000);
	            callCenter.shipAccountselect(browser.params.shipaccount);
	            browser.sleep(2000);
	            callCenter.packageSelection(browser.params.packageValue);
	            browser.sleep(5000);
	            callCenter.packageTrackingNumber(1236547890);
	            callCenter.enterItemQty("1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	            browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(5000);
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	                    	
	        });
	        
	        ///******orders Returns************///	
	        browser.wait(function () {
	            return SONumber != '';
	        }).then(function () {
	            browser.get(returnsUrl);
	            console.log("navigating to Returns  new screen"); 
	            commons.new(); 
	            browser.driver.sleep(2);
	            browser.waitForAngular();
	            returnsCreate.orderReturn(); 
	            commons.customerLookup();
	            commons.searchWithCriteria("Customer Contact First Name","contains","Alice");
	            returnsCreate.selectCustomer();
	            returnsCreate.useSelectedCustomer();
	            browser.sleep(2000);
	            commons.searchWithCriteria("Order #","ends with",SONumber);
	            returnsCreate.selectOrder();
	            browser.sleep(4000);
	            returnsCreate.selectAllLineitem();
	            browser.sleep(4000);
	            returnsCreate.returnLocationSelect("Joliet-DC");
	            browser.sleep(3000);
	            returnsCreate.saveReturns();             
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
	            returnsEdit.settingsIconClick();
	            browser.sleep(1000);      
	            returnsEdit.deleteButtonClick();
	            browser.sleep(3000);      
	            returnsEdit.confirmDeleteButtonClick();
	            browser.sleep(3000);
	            expect(browser.getCurrentUrl()).toEqual(returnsUrl);
	            
	        });
	     //*********checking whether the RMA is deleted or not********//
	        
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.noResultStatus().then(function (status) {
                	notFoundStatus = status;
	                console.log("the status of the RMA #"+ RMANumber+"is "+notFoundStatus);
		            expect(notFoundStatus).toEqual('No results found.');

	            });
            });    
      })
  it('Returnig same Order Mulitple time - TC0018', function(){
	    	  	browser.get(callcenterorder);
				browser.driver.manage().window().maximize();
		        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
	            callCenter.enterItemQty("1");
	            browser.sleep(3000);
	            callCenter.unselectPkg();
	           // browser.sleep(3000);
	            callCenter.addPackageToShipment();
	            browser.sleep(3000);
	            callCenter.finalizeShipment();
	            browser.sleep(4000); 
	            salesOrderSummary.viewShipmentVisibility();
	            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
	            browser.sleep(1500);
	            callCenter.shipmentChangeStatusConfimation();
	            browser.sleep(5000);	            
	            expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
	                    	
        	
        //!******orders Returns************!//	
	        
            browser.get(returnsUrl);
            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();
            returnsCreate.orderReturn(); 
            commons.customerLookup();
            commons.searchWithCriteria("Name","contains",browser.params.custFirstName);
            browser.sleep(1000);
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
            commons.searchWithCriteria("Order #","ends with",SONumber);
            returnsCreate.selectOrder();
            returnsCreate.selectAllLineitem();
            browser.sleep(3000);
            returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
            browser.sleep(2000);
            returnsCreate.saveReturns();             
            //returnsCreate.returnReason("1", "DAMAGED");
            returnsCreate.totalReturnsItem("DAMAGED");
            browser.sleep(1000);           
            returnsCreate.creditType("REFUND");            
            browser.sleep(1000);
            returnsEdit.saveReturns();
            browser.sleep(3000);
            returnsCreate.getRMANber().then(function(value) {
                RMANumber1 = value.substring(34,44);
                console.log("the RMA number is "+RMANumber1)
            });
            returnsEdit.saveAndReleaseReturns();
            browser.sleep(3000);          
            returnsCreate.RMAGenerate();
            browser.sleep(2000);
	    });

            browser.wait(function() {
                return RMANumber1 != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log("first RMA"+RMANumber1); 
                returnsSummary.returnsSearch("RMA Number", RMANumber1);
                browser.sleep(2000);
                returnsSummary.returnsStatus().then(function (status) {
                	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA1 #"+ RMANumber1+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });                
                browser.sleep(2000);
                
    //Initiating the multiple return for the same order
                browser.get(returnsUrl);
                console.log("navigating to Returns  new screen"); 
                commons.new(); 
                browser.driver.sleep(2);
                browser.waitForAngular();
                returnsCreate.orderReturn(); 
                commons.customerLookup();
                commons.searchWithCriteria("Name","contains",browser.params.custDisplayName);
                returnsCreate.selectCustomer();
                returnsCreate.useSelectedCustomer();
                browser.sleep(2000);
                commons.searchWithCriteria("Order #","ends with",SONumber);
                browser.sleep(2000);
                returnsSummary.noResultStatus().then(function (status) {
                	notFoundStatus = status;
	                console.log("the status of the RMA For the order  #"+ SONumber+"is "+notFoundStatus);
		            expect(notFoundStatus).toEqual('No results found.');
	            });
            });        
	});
      
 	it('Returnig same line item Mulitple time - TC0019', function(){
 		
 		browser.get(callCenterInventoryUrl);
      browser.driver.manage().window().maximize();
      browser.sleep(2000);
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
      callCenter.selectSKUFromSearch();
      browser.sleep(2000);
      commons.search();
      browser.sleep(2000);
      returnsCreate.clearSearch();
      commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
      browser.sleep(3000);
      callCenter.selectSKUFromSearch();
      browser.sleep(2000);
      commons.search();
      browser.sleep(2000);
      callCenter.selectSKUFromResults();
      callCenter.addToOrder();
      browser.sleep(3000);
      callCenter.attachCustomer();
      browser.sleep(2000);
      callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
      browser.sleep(4000);
      salesOrderCreate.selectCustomer();
      browser.sleep(2000);
      salesOrderCreate.useSelectedCustomer();
      
    //!***************<<<< Below line is to SAVE the sales order >>>>>>********************!//
      browser.sleep(2000);
      salesOrderCreate.saveOption("Save");
      salesOrderCreate.salesOrderNumber().then(function (value) {
          SONumber = value;
          console.log("sales order number"+SONumber);
      });

      browser.wait(function () {
          return SONumber!= '';
      }).then(function () {
          browser.get(callCenterSalesOrdersListUrl);
          salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
          //commons.multiselect();
          browser.sleep(3000);
          salesOrderSummary.salesOrderSelectGear("Release");
          browser.sleep(3000);
          expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
          salesOrderSummary.salesOrderStatus().then(function (status) {
              orderStatus = status;
              console.log("the status of the order #"+SONumber+" is: "+orderStatus);

          });
          
          //!*********fulfillment request**********!//
          browser.get(fulfillmentRequestsUrl);
          browser.sleep(2000);
          salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
          browser.sleep(3000);
          callCenter.fulfillmentOrderSelectGear("Create Shipment");
          browser.sleep(3000);
          callCenter.shipAccountselect(browser.params.shipaccount);
          browser.sleep(2000);
          callCenter.packageSelection(browser.params.packageValue);
          browser.sleep(3000);
          callCenter.packageTrackingNumber(1236547890);
          returnsCreate.multiplePackages("1","1");
          browser.sleep(3000);
          returnsCreate.multiplePackages("3","1");
          browser.sleep(3000);
          callCenter.unselectPkg();
          browser.sleep(3000);
          callCenter.addPackageToShipment();
          browser.sleep(3000);
          callCenter.finalizeShipment();
          browser.sleep(5000);
          salesOrderSummary.viewShipmentVisibility();
          callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
          browser.sleep(1500);
          callCenter.shipmentChangeStatusConfimation();
          browser.sleep(5000);
          expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
          
          //!******orders Returns************!//
	        
          browser.get(returnsUrl);
          console.log("navigating to Returns  new screen"); 
          commons.new(); 
          browser.driver.sleep(2);
          browser.waitForAngular();
          returnsCreate.orderReturn(); 
          commons.customerLookup();
          commons.searchWithCriteria("Name","contains",browser.params.custFirstName);
          browser.sleep(1000);
          returnsCreate.selectCustomer();
          returnsCreate.useSelectedCustomer();
          browser.sleep(2000);
          returnsSummary.returnsSearch("Order #", SONumber);
          browser.sleep(3000);
          returnsCreate.selectOrder();
          browser.sleep(4000);
          //returnsCreate.selectAllLineitem();
          returnsCreate.SelectSingleLine(1);
          browser.sleep(1000);
          returnsCreate.UseSelectedItemButtonClick();
          browser.sleep(2000);
          returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
          browser.sleep(3000);
          returnsCreate.saveReturns();             
          returnsCreate.totalReturnsItem("DAMAGED");
          browser.sleep(2000);           
          returnsCreate.creditType("REFUND");            
          browser.sleep(3000);
          returnsEdit.saveReturns();
          browser.sleep(3000);
          returnsCreate.getRMANber().then(function(value) {
          	RMANumber3 = value.substring(34,44);
              console.log("the RMA number is "+RMANumber3)
          });
          returnsEdit.saveAndReleaseReturns();
          browser.sleep(3000);          
          returnsCreate.RMAGenerate();
          browser.sleep(2000);
      });

          browser.wait(function() {
              return RMANumber3 != '';
          }).then(function() {
              browser.get(returnsUrl);
              console.log("first RMA"+RMANumber1); 
              returnsSummary.returnsSearch("RMA Number", RMANumber3);
              browser.sleep(2000);
             // returnsSummary.returnsSelectGear("Release");
              //returnsSummary.returnsSearchRemove("1");
              //console.log("the status of the RMA #"+ RMANumber+"is "+returnsSummary.returnsStatus());
             // expect(returnsSummary.returnsStatus()).toEqual('RELEASED');
              
              returnsSummary.returnsStatus().then(function (status) {
              	orderReturnReleaseStatus = status;
	                console.log("the status of the RMA1 #"+ RMANumber3+"is "+orderReturnReleaseStatus);
		            expect(orderReturnReleaseStatus).toEqual('RELEASED');

	            });                
              browser.sleep(2000);
//Initiating the multiple return for the same line item
              browser.get(returnsUrl);
              console.log("navigating to Returns  new screen"); 
              commons.new(); 
              browser.driver.sleep(2);
              browser.waitForAngular();
              returnsCreate.orderReturn(); 
              commons.customerLookup();
              commons.searchWithCriteria("Name","contains",browser.params.custDisplayName);
              returnsCreate.selectCustomer();
              returnsCreate.useSelectedCustomer();
              browser.sleep(2000);
	            returnsSummary.returnsSearch("Order #", SONumber);
	            browser.sleep(3000);
	            returnsCreate.selectOrder();
	            browser.sleep(2000);
	            //returnsCreate.SelectSingleLine(1);
	            expect(returnsCreate.returnedLine(1)).toBe(true);
      });            
	}); 
 	it('Validations - TC0020', function(){
		
		browser.get(callcenterorder);
		browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
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
        browser.sleep(3000);
        callCenter.packageTrackingNumber(1236547890);
        returnsCreate.multiplePackages("1","1");
        browser.sleep(3000);
        callCenter.unselectPkg();
        //browser.sleep(3000);
        callCenter.addPackageToShipment();
        browser.sleep(3000);
        callCenter.finalizeShipment();
        browser.sleep(5000);
        salesOrderSummary.viewShipmentVisibility();
        callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
        browser.sleep(1500);
        callCenter.shipmentChangeStatusConfimation();
        browser.sleep(3000);
        expect(callCenter.shipmentStatusLabel()).toEqual(browser.params.shipmentstatus);
        browser.sleep(3000);
		browser.get(returnsUrl);
        console.log("navigating to Returns  new screen"); 
        commons.new(); 
        browser.driver.sleep(2);
        browser.waitForAngular();
        returnsCreate.orderReturn(); 
        commons.customerLookup();
//customer Name search      
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'contains',browser.params.custDisplayName);
        browser.sleep(3000);
        expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
        browser.sleep(1000);
        expect(returnsCreate.filterCheck(1)).toContain(browser.params.custFirstName);
        browser.refresh();       
//customer search using Email address  
        commons.customerLookup();
        browser.sleep(2000);
        commons.searchWithCriteria('Customer Email Address', 'contains',browser.params.customerEmail);
        browser.sleep(3000);
        expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
        browser.sleep(1000);
        expect(returnsCreate.filterCheck(2)).toEqual(browser.params.customerEmail);
//end//            
        returnsCreate.selectCustomer();
        returnsCreate.useSelectedCustomer();
        browser.sleep(2000);  
//Order filter validation            
        commons.searchWithCriteria("Order #","contains",SONumber);
        browser.sleep(1000);
        expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
        browser.sleep(1000);
        expect(returnsCreate.resultCheck(2)).toEqual(SONumber);
        browser.sleep(2000);
        returnsCreate.selectOrder();
        browser.sleep(2000);           
//use selected button click without selecting the order         
        returnsCreate.UseSelectedItemButtonClick();
        //expect(returnsEdit.AlertPresence()).toBe(true); 
//selecting the items
        returnsCreate.selectOrder();
        browser.sleep(2000);
        returnsCreate.selectAllLineitem();
        browser.sleep(2000);
//return location validation
     //   expect(returnsCreate.returnLocationValidation("")).toBe(true); 
     //   browser.sleep(2500);
        returnsCreate.returnLocationSelect(browser.params.retruninglocation1);
        browser.sleep(1000);
        returnsCreate.saveReturns(); 
        browser.sleep(3000);
//credit type       
       // returnsCreate.creditType("");            
       // browser.sleep(2000);
        returnsCreate.orderReturnQtyTextbox(0);
        browser.sleep(2000);
        returnsCreate.totalReturnsItem("");           
        browser.sleep(1000);
        returnsCreate.saveReturns(); 
        browser.sleep(2000);
        expect(returnsCreate.reasonvalidation()).toBe(true); 
        browser.sleep(2000);
//saving the return
        returnsCreate.totalReturnsItem("DAMAGED");           
        browser.sleep(2000);
        returnsCreate.orderReturnQtyTextbox(1);
        browser.sleep(1000);
        returnsCreate.creditType("REFUND");            
        browser.sleep(2000);
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
            browser.sleep(3000);
//customer name check on the  order returns screen
            
            returnsSummary.returnsSearch("RMA Number", RMANumber);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.resultCheck(2)).toEqual(browser.params.custDisplayName);
            browser.refresh();       
//RMA Number display check 
            browser.sleep(3000);
            returnsSummary.returnsSearch("RMA Number", RMANumber);
            browser.sleep(3000);
            expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
            browser.sleep(1000);
            expect(returnsCreate.resultCheck(1)).toEqual(RMANumber);
          
            returnsSummary.returnsStatus().then(function (status) {
            	orderReturnReleaseStatus = status;
                console.log("the status of the RMA #"+ RMANumber+"is "+orderReturnReleaseStatus);
	            expect(orderReturnReleaseStatus).toEqual('RELEASED');

            });

        });  	
 	});   
/* 	
 	it('Blind Return-TC0021', function(){
		
		browser.get(returnsUrl);
        browser.driver.manage().window().maximize();
        console.log("navigating to Returns  new screen"); 
        commons.new(); 
        browser.driver.sleep(2);
        browser.waitForAngular();
        returnsCreate.BlindreturnClick();
        returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
        commons.customerLookup();
        commons.searchWithCriteria("Name","contains",browser.params.custFirstName);
        browser.sleep(1000);
        returnsCreate.selectCustomer();
        browser.sleep(1000);
        returnsCreate.useSelectedCustomer();
        browser.sleep(1000);
        returnsCreate.returnLocationSelect("Joliet-DC");
        returnsCreate.saveBlindReturns();             
        browser.sleep(1000);
        returnsCreate.productLookup();
        browser.sleep(2000);
        returnsCreate.productSearchScreen(browser.params.searchValueSKU1);
        browser.sleep(1000);
        returnsCreate.BlindReturnSelectProduct();
        browser.sleep(1000);
        returnsCreate.addSelectedProductsButton();
        browser.sleep(2000);
        returnsCreate.totalReturnsItem("DAMAGED");
        returnsCreate.creditType("REFUND");
        browser.sleep(3000);            
        returnsEdit.saveReturns();
        expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save button
        browser.sleep(3000);
        returnsCreate.getRMANber().then(function(value) {
            RMANumber = value.substring(34,44);
            console.log("the RMA number is "+RMANumber)
        });
        returnsEdit.saveAndReleaseReturns();
        expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save and release button
        browser.sleep(3000);        
        returnsCreate.saveandreleaseIcon();
        returnsCreate.RMAGenerate(); 
        browser.sleep(2000)
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
        });  
 	});
 	it('Blind Return Validation-TC0022', function(){
		
		browser.get(returnsUrl);
        browser.driver.manage().window().maximize();
        console.log("navigating to Returns  new screen"); 
        commons.new(); 
        browser.driver.sleep(2);
        browser.waitForAngular();
        returnsCreate.BlindreturnClick();
//no channel selected           
        returnsCreate.saveBlindReturns();                  
        expect(returnsCreate.reasonvalidation()).toBe(true); 
        browser.sleep(1000);
        returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
//customer Name search      
        commons.customerLookup();
        browser.sleep(3000);
        commons.searchWithCriteria('Name', 'contains',browser.params.custDisplayName);
        browser.sleep(3000);
        expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
        browser.sleep(1000);
        expect(returnsCreate.filterCheck(1)).toContain(browser.params.custFirstName);
        browser.refresh();     
        browser.sleep(3000);
//customer search using Email address 
        returnsCreate.ChannelSelectiondropdown(browser.params.channelName);
        commons.customerLookup();
        browser.sleep(2000);
        commons.searchWithCriteria('Customer Email Address', 'contains',browser.params.customerEmail);
        browser.sleep(3000);
        expect(returnsSummary.FRReturnsSearchFilter()).toBe(true); 
        browser.sleep(1000);
        expect(returnsCreate.filterCheck(2)).toEqual(browser.params.customerEmail);
//end//            
        returnsCreate.selectCustomer();
        returnsCreate.useSelectedCustomer();
        browser.sleep(2000);  
        
//Return location error message validation            
        
        returnsCreate.saveBlindReturns();                  
        expect(returnsCreate.reasonvalidation()).toBe(true); 
        browser.sleep(1000);
        returnsCreate.returnLocationSelect("Joliet-DC");
        browser.sleep(1000);
        returnsCreate.saveBlindReturns();  
//end                   
        returnsCreate.productLookup();
        browser.sleep(1000);
        returnsCreate.productSearchScreen(browser.params.searchValueSKU1);
        browser.sleep(1000);
        returnsCreate.BlindReturnSelectProduct();
        browser.sleep(1000);
        returnsCreate.addSelectedProductsButton();
//without refund method        
        browser.sleep(3000);
        returnsEdit.saveReturns();
        expect(returnsCreate.reasonvalidation()).toBe(true);            
//creating the RMA
        browser.refresh();
        browser.sleep(3000);
        returnsCreate.productLookup();
        returnsCreate.productSearchScreen(browser.params.searchValueSKU1);
        browser.sleep(1000);
        returnsCreate.BlindReturnSelectProduct();
        browser.sleep(1000);
        returnsCreate.addSelectedProductsButton();
        browser.sleep(2000);
        returnsCreate.totalReturnsItem("DAMAGED");
        returnsCreate.creditType("REFUND");
        returnsEdit.saveReturns();
        expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save button
        browser.sleep(3000);
        returnsCreate.getRMANber().then(function(value) {
            RMANumber = value.substring(34,44);
            console.log("the RMA number is "+RMANumber)
        });
        browser.sleep(3000);
        returnsEdit.saveAndReleaseReturns();
        expect(returnsEdit.AlertPresence()).toBe(false); //checking for any issues while clicking on the save and release button
        browser.sleep(3000);        
        returnsCreate.saveandreleaseIcon();
        returnsCreate.RMAGenerate(); 
        expect(returnsEdit.AlertPresence()).toBe(false);
        
//Save and release without selecting the line item.
        browser.sleep(2000);
        browser.refresh();
        returnsCreate.creditType("REFUND");
        returnsEdit.saveAndReleaseReturns();
        returnsCreate.RMAGenerate(); 
        expect(returnsCreate.noItemAlert()).toBe(true); 
	});
   */   
});


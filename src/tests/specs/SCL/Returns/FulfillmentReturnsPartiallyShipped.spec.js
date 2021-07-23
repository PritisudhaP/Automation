var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/src/tests/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.SONumber = "";
global.RMAStatus = "";
global.RMAchangededStatus = "";
global.RMANmber = "";

describe("Fulfillment return : ", function() {
  	var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();

    it('Partially Shipped- TC0009', function(){
    	
    	browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize(); browser.sleep(2000);
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
        //commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU2);
        salesOrderSummary.salesOrderSearch("SKU", browser.params.searchValueSKU2);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectItemFromSOScreen();
        callCenter.addToOrderFromSalesOrder();
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
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            returnsCreate.selectShipmentLine();
            callCenter.shipmentLineReject("2");
            callCenter.ShipmentReject(1,"Product Damaged","This is a test");
            callCenter.fulfillmentOrderShipmentStatusChanage("Create Shipment")
            browser.sleep(1000);
            callCenter.shipAccountselect(browser.params.shipaccount);
            callCenter.packageSelection(browser.params.packageValue);
            callCenter.packageTrackingNumber(1236547890);
            callCenter.enterItemQty("1");
            //callCenter.unselectPkg();
            callCenter.addPackageToShipment();
            callCenter.finalizeShipment();
            browser.sleep(5000);
            salesOrderSummary.viewShipmentVisibility();
            callCenter.fulfillmentOrderShipmentStatusChanage("Mark As Shipped");
            browser.sleep(1500);
            callCenter.shipmentChangeStatusConfimation();
            browser.sleep(5000);
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log("the status of the order #"+SONumber+" is: "+orderStatus);
            });                
        });
        
        //***Fulfillment returns****////
        browser.wait(function () {
            return SONumber != '';
        }).then( function () {        	
        browser.get(FRReturnsUrl);
        browser.sleep(3000);
        console.log("the sale sorder # in returns screen "+SONumber);
        commons.searchWithCriteria('Order #', 'ends with', SONumber);
        returnsCreate.orderSelectForReturnClick();
        commons.search();
        returnsCreate.orderSelectForReturnCheckBox();
        returnsCreate.OrderSelectionButtonCartIcon();
        returnsCreate.EditLine();
        returnsCreate.addFRDisposition();
        browser.sleep(2000);
        returnsCreate.linedispositionDetails(1, "DAMAGED", "this is a test");
        commons.save(); //saving the returning line
        browser.sleep(1000);	        
        returnsCreate.RMASubmit();
        browser.sleep(2000); 
        browser.get(callCenterReturnsUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
        returnsCreate.RMAStatus().then(function (status) {
            RMAStatus = status;
            console.log("the status of the RMA for the order #"+SONumber+" is: "+RMAStatus);
            expect(RMAStatus).toEqual("INSPECTED");

        }); 
	        browser.get(paymentDispositionUrl);
	        salesOrderSummary.salesOrderSearch("Salesorder #", SONumber);
	        returnsCreate.getRMANumberCallcenter().then(function(value) {
	        	RMANmber = value;
	            console.log("the RMA number is "+RMANmber)
	        });
	        	browser.sleep(1000);
        
       });
            browser.wait(function () {
                return SONumber != '';
            }).then( function () { 
        	browser.get(returnsUrl);
            salesOrderSummary.salesOrderSearch("RMA Number", RMANmber);
            returnsEdit.selectRMALineClickForReceive();
            callCenter.editLineGear("1")
            callCenter.lineItemselectOptions("Receive Inventory");
            returnsEdit.selectInvPool("San Diego - DC");
            returnsEdit.itemReceive();
            browser.sleep(2000);
            browser.get(callCenterReturnsUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            returnsCreate.RMAStatus().then(function (status) {
            	RMAchangededStatus = status;
                console.log("the status of the SO#"+ SONumber+" after changing the status is : "+RMAchangededStatus);
                expect(RMAchangededStatus).toEqual("RECEIVED");

            })
        	
        });	
    })
})
var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";
global.totalAvailableQTYCount = "";
global.discountTotalText = "";
global.discountAmtValue = "";
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();

    //Searching SKU from Call-center inventory lookup, applying filters in Inventory details popup and applying filters in reservation details.
    //Add SKU to the order from Call-center inventory lookup screen and release the order

  it('Call Center Inventory TC0001', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.plusIconClick();
        browser.sleep(1000);
      /*  callCenter.getChannelText().then(function (channel) {
        	channel1=channel;
            expect(channel1).toBe(browser.params.channelName1);
            console.log("the channel is "+channel1);
        })
*/
        callCenter.getAvailableQty().then(function (availableQty) {
            currentInventoryCount = availableQty;
            postInventoryCount = parseInt(currentInventoryCount) - 1;
            updatedInventoryCount = parseInt(currentInventoryCount) - 2;

            browser.sleep(2000);
        });

        callCenter.getReservedQty().then(function (resQty) {
            resInventoryCount = resQty;
            postResCount = parseInt(resInventoryCount);
            updatedResCount = parseInt(resInventoryCount) + 2;

            browser.sleep(2000);
        });
        callCenter.inventoryDetailsPopUp();
        browser.sleep(2000);
        callCenter.totalAvailableInventoryCount().then(function (totalAvailable) {
            totalAvailableQTYCount = totalAvailable;
            console.log(totalAvailableQTYCount);
        });
     
        browser.sleep(1000);
        callCenter.searchWithCriteria('Site # ', 'is', browser.params.siteNumber);
        browser.sleep(5000);
        // callCenter.cancelFilter();
        callCenter.filterText().then(function (sitetext) {
            browser.sleep(2000);
            console.log("message" + sitetext);
            browser.sleep(2000);
            callCenter.cancelFilter();
            browser.sleep(2000);
        })
        callCenter.searchWithCriteria('Within 50 miles of Zip Code ', 'is', browser.params.zipcode);
        callCenter.cancelFilter();
        callCenter.cancelInvDetailsPopUp();
        callCenter.reservationDetails();
        callCenter.searchWithCriteria('Reservation Status', 'is', browser.params.reservationStatus);
        callCenter.cancelFilter();
        callCenter.reservationDetailsPopupClose();
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        callCenter.attachCustomer();
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        commons.searchWithCriteria('Name', 'contains', browser.params.SkuName2);
        callCenter.selectSKUFromSearch();
        commons.search();
        callCenter.selectSKUFromResults();
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(3000);

        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});		
		browser.sleep(5000);

//!***************<<<< Below lines : to RELEASE the sales order >>>>>>********************
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            //commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(2000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            //!*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
            });


        })
    })


    //Search SKU from the Call-center SKU's and Add SKU to the sales order, edit channel and promised date
    //Create new customer and add to the sales order
    //Apply discount, edit the discount and delete discounts to the order
    it('Call center Flow TC0002', function () {
        browser.get(callCenterSkusUrl);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.callCenterSKUsGearIcon('Edit');
        callCenter.addToOrder();
        callCenter.salesChannel("1");
        callCenter.promisedDate(browser.params.promisedDate);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.createCustomer(browser.params.custDisplayName, browser.params.custFirstName, browser.params.custLastName,
        browser.params.custAddress1, browser.params.custCity, browser.params.custAddressState, browser.params.custZipcode5,browser.params.email);
        callCenter.customerAdvancedSettings("ACTIVE", "2");
        browser.sleep(7000);
        
        ///////Updated by Vishak /////
/*
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.custLastName);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
**/
        callCenter.editLineGear("3");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("25");
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        salesOrderSummary.OrderStatusDetails(1).then(function (value) {
			savedStatus = value;
		    console.log("the orderstatus is "+savedStatus);	
		    salesOrderSummary.SavedOrderStatusForPayment(savedStatus);
		});		
		browser.sleep(5000);

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

            //!*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);

            });
        })

        browser.get(customersUrl);
        browser.sleep(3000);
        callCenter.deleteCustomerSearch(browser.params.customerCriteria, browser.params.custLastName);
        browser.sleep(3000);
        callCenter.discountOptions("Delete");
        browser.sleep(2000);
        callCenter.delete();
        browser.sleep(3000);
        console.log("Customer deleted successfully");


    })
    
})




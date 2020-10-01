var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/screens/login/login.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');

global.orderStatus = "";
global.SONumber = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";
global.postInventoryCount = "";
global.resInventoryCount = "";
global.updatedResCount = "";
global.postResCount = "";

describe('Verify creating multipe packages for  a single shipment:TC0001 ', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var storePortals = new storePortal();
    var loginScreen = new loginPage();


    it('Verify creating multipe packages for  a single shipment- TC0001', function () {

        /* ************************************************************
                 Creates a sales order with a multiple lines say 2 lines and releases it.
           In vendor portal, create multiple packages and finalize the shipment.
           Verifies order/line item status.
          ************************************************************ */

        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);
        browser.driver.sleep(3000);
        console.log("Vendor Portal: Multiple package");

//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();


        storePortals.salesChannel("1");
        salesOrderCreate.attachCustomer();
        browser.sleep(2000);
        salesOrderCreate.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
        salesOrderCreate.searchInPopup();
        browser.sleep(3000);
        salesOrderCreate.selectSKU();
        browser.sleep(3000);
        salesOrderCreate.addProduct();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.searchValueSKU1);
        salesOrderCreate.searchInPopup();
        browser.sleep(3000);
        salesOrderCreate.selectSKU();
        browser.sleep(3000);
        salesOrderCreate.addProduct();

//***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);

//***************<<<< Below lines are for Inventory Check: Before Release >>>>>>********************

        browser.get(inventorySearchUrl);

        inventorySearch.enterSite(browser.params.siteName);
        inventorySearch.addSKU();
        //commons.searchWithCriteria("Name", "contains", "KALINNIKOVI/COMP SACRED CHORAL");
        commons.searchWithCriteria("SKU", "contains", browser.params.searchValueSKU1);
        browser.sleep(2000);
        inventorySearch.selectSKU();
        inventorySearch.addProduct();
        browser.sleep(2000);
        inventorySearch.searchInventory();
        browser.sleep(2000);

        storePortals.getAvailableQty().then(function (availableQty) {
            currentInventoryCount = availableQty;
            postInventoryCount = parseInt(currentInventoryCount) - 1;
            updatedInventoryCount = parseInt(currentInventoryCount) - 2;

            browser.sleep(2000);
        });

        storePortals.getReservedQty().then(function (resQty) {
            resInventoryCount = resQty;
            postResCount = parseInt(resInventoryCount);
            updatedResCount = parseInt(resInventoryCount) + 2;

            browser.sleep(2000);
        });


        browser.sleep(2000);

//***************<<<< Below lines : to RELEASE the sales order >>>>>>********************

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(2000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            //*******!!@@@@@@@@@@@@@@
            salesOrderSummary.salesOrderStatus().then(function (status) {
                orderStatus = status;
                console.log(orderStatus);
            });
//////////////!***************<<<< Below lines : Create Shipment >>>>>>********************
            browser.wait(function () {
                return SONumber != '';
            }).then(function () {
                browser.get(shipmentRequestsUrl);
                // console.log(SONumber);
                browser.sleep(2000);
                shipmentRequestsSummary.shipmentRequestSearch("Original Order #", SONumber);
                browser.sleep(2000);
                storePortals.clickGear();
                storePortals.FRSelectGear("Edit");
                browser.sleep(3000);
                storePortals.navigateToShipmentsPane();
                shipmentRequestsCreate.createShipment();
                browser.sleep(2000);
                shipmentRequestsCreate.packageSelection("Box");
                storePortals.enterItemQty(1,1);
                shipmentRequestsCreate.addPackageToShipment();
                //add other package
                //shipmentRequestsCreate.enterItemQty("1");
                storePortals.enterItemQty(2,1);
                shipmentRequestsCreate.addPackageToShipment();
                shipmentRequestsCreate.finalizeShipment();
                browser.sleep(5000);
                browser.get(shipmentRequestsUrl);
                shipmentRequestsSummary.shipmentRequestSearch("Original Order #", SONumber);
                commons.refresh();
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
                browser.sleep(3000);
                storePortals.clickGear();
                storePortals.FRSelectGear("Edit");
                storePortals.lineFRStatus(1).then(function (status) {
                    lineStatus1 = status;
                    console.log(lineStatus1);
                    expect(lineStatus1).toEqual('CLOSED');
                });
                storePortals.lineFRStatus(2).then(function (status) {
                    lineStatus2 = status;
                    console.log(lineStatus2);
                    expect(lineStatus2).toEqual('CLOSED');
                });


            })
        })
    })

})


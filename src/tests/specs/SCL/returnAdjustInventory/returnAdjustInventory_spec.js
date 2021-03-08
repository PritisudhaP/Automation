const { browser } = require("protractor");

/** Import for API */
const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

var salesOrderEditScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestcreatescreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var inventoryPoolsummaryScreen = require(process.cwd() + '/screens/inventoryPool/inventoryPool.summary.screen.js');
var routeSummaryScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var storePortalV2Screen = require(process.cwd() + '/screens/storePortalV2/storePortalBopis.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var routeSummaryScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');

var salesOrderCreate = new salesOrderCreateScreen();
var salesOrderSummary = new salesOrdersummaryscreen();
var commons = new common();
var storePortalV2 = new storePortalV2Screen();
var salesOrderEdit = new salesOrderEditScreen();
var routeSummary = new routeSummaryScreen();
var  shipmentRequestsSummary  = new shipmentRequestsSummaryScreen();
var shipmentRequestcreate = new shipmentRequestcreatescreen();
var inventoryPoolsummary = new inventoryPoolsummaryScreen();

//var data = require('../specs/SCL/API/testData_json/ReturnAdjustment.json');
var data = require(process.cwd() + '/src/tests/autoFiles/ReturnAdjustment.json')

/*OrderNbr*/
global.SONumber = "";


describe("Scenario 1: Invoiced Status Order - Return (OTHER)",function(){

    it('Scenario 01:Invoiced ORDER RETURN - OTHER', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.sleep(200);
        browser.get(shipmentsUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order Number",SONumber);
        });
        shipmentRequestsSummary.markasShippedvalidation("Mark As Shipped");
        browser.get(routeUrl);
        //routeSummary.filter("invoiceForShipments");
        routeSummary.filterDrop("Ref Name","starts with","invoiceForShipments");
        browser.sleep(2000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(2000);
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        salesOrderSummary.verifyorderStatus("INVOICED");
    })

    it("SC 01: RMA Creation for Invoiced order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("SC 01: Invoiced return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });
});
describe("Scenario 2:Invoiced status order - Return(DAMAGED)",function(){

    it('Scenario 02:Invoiced ORDER RETURN - DAMAGED', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.sleep(200);
        browser.get(shipmentsUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order Number",SONumber);
        });
        shipmentRequestsSummary.markasShippedvalidation("Mark As Shipped");
        browser.get(routeUrl);
        //routeSummary.filter("invoiceForShipments");
        routeSummary.filterDrop("Ref Name","starts with","invoiceForShipments");
        browser.sleep(2000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(2000);
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        salesOrderSummary.verifyorderStatus("INVOICED");
    })

    it("SC 02: RMA Creation for Invoiced order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("SC 02:Invoiced return order :DAMAGED", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });
});
describe("Scenario 3:Invoiced Status Order Return(DOES NOT FIT)",function(){

    it('Scenario 03:Invoiced ORDER RETURN - DOES NOT FIT', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.sleep(200);
        browser.get(shipmentsUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order Number",SONumber);
        });
        shipmentRequestsSummary.markasShippedvalidation("Mark As Shipped");
        browser.get(routeUrl);
        //routeSummary.filter("invoiceForShipments");
        routeSummary.filterDrop("Ref Name","starts with","invoiceForShipments");
        browser.sleep(2000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(2000);
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        salesOrderSummary.verifyorderStatus("INVOICED");
    })
    it("SC 03: RMA Creation for Invoiced order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("SC 03:Invoiced return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });

});


describe("Scenario 4: Partially Shipped status order - Return(Reason:OTHER)",function(){

    it('Scenario 4:Partially Shipped - OTHER', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        browser.sleep(2000);
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("PARTIALLY SHIPPED");
    })
   it("SC 4: RMA Creation for Partially Shipped order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Partially Shipped return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });

});

describe("Scenario 5: Partially Shipped status order - Return(Reason:DAMAGED)", function(){

    it('Scenario 5:Partially Shipped - DAMAGED', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        browser.sleep(2000);
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("PARTIALLY SHIPPED");
    })

    it("SC 5: RMA Creation for Partially Shipped order - Damaged", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("SC:5 Partially Shipped return order :DAMAGED", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });

});

describe("Scenario 6: Partially Shipped status order - RETURN(DOES NOT FIT)", function(){

    it('Scenario 6:Partially Shipped - OTHER', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        browser.sleep(2000);
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("PARTIALLY SHIPPED");
    })

    it("SC 6: RMA Creation for Partially Shipped order - Does not fit", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("SC:6 Partially Shipped return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });
});

describe("Scenario 7:Partially Picked up by customer - Return(OTHER)",function(){

    it('Scenario 07:PARTIALLY PICKEDUP BY CUSTOMER RETURN - OTHER', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderSummary.sogeardots2();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("sandiego-dc");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.addpkg();
        storePortalV2.boxPkg("TestBox1");
        storePortalV2.addpkg();
        storePortalV2.completeFulfill();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PARTIALLY PICKEDUP BY CUSTOMER");
    })

    it("SC 7: RMA Creation for PARTIALLY PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("PARTIALLY PICKEDUP BY CUSTOMER return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });

});

describe("Scenario 8: Partially picked up by customer - Return(DAMAGED)", function(){

    it('Scenario 8:PARTIALLY PICKEDUP BY CUSTOMER RETURN - DAMAGED', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderSummary.sogeardots2();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("sandiego-dc");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.addpkg();
        storePortalV2.boxPkg("TestBox1");
        storePortalV2.addpkg();
        storePortalV2.completeFulfill();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PARTIALLY PICKEDUP BY CUSTOMER");
    })

    it("SC 8: RMA Creation for PARTIALLY PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("PARTIALLY PICKEDUP BY CUSTOMER return order :DAMAGED", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });

});

describe("Scenario 9:Partially Picked up by customer - Return(DOES NOT FIT)",function(){

    it('Scenario 9:PARTIALLY PICKEDUP BY CUSTOMER RETURN - DOES NOT FIT', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.searchProductofcallcenter("BC_TESTQA001");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderSummary.sogeardots2();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("sandiego-dc");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.addpkg();
        storePortalV2.boxPkg("TestBox1");
        storePortalV2.addpkg();
        storePortalV2.completeFulfill();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.sortfilterCriteriaDropdown("Order #","contains",SONumber,"Shipment Request #");
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PARTIALLY PICKEDUP BY CUSTOMER");
    })

    it("SC 9: RMA Creation for PARTIALLY PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("PARTIALLY PICKEDUP BY CUSTOMER return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });

});

describe("Scenario 10: Shipped order - Return(OTHER)", function(){

    it('Scenario 10:Shipped Order - Return reason "OTHER"', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("SHIPPED");
    })
    it("SC 10 RMA Creation for Shipped order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Shipped return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });
});

describe("Scenario 11: Shipped order - Return(DAMAGED)", function() {

    it('Scenario 11:Shipped Order - Return reason "DAMAGED"', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("SHIPPED");
    })

    it("SC 11 RMA Creation for Shipped order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Shipped return order :DAMAGED", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });
});

describe("Scenario 12:Shipped Return order - Return(DOES NOT FIT)", function(){

    it('Scenario 12:Shipped Order - Return reason "Does Not Fit"', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("SHIPPED");
    })

    it("SC 12 RMA Creation for Shipped order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Shipped return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });

});

describe("Scenario 13: Picked up by customer", function(){

    it('Scenario 13: PICKEDUP BY CUSTOMER - Return (OTHER)', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.boxPkg("TestBox1");
        salesOrderSummary.addpkgncomplete();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PICKEDUP BY CUSTOMER");
    })

    it("SC 13 : RMA Creation for PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Picked up by customer return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    }); 

});

describe("Scenario 14: Picked up by customer - Return(DAMAGED)", function(){

    it('Scenario 14: PICKEDUP BY CUSTOMER - return (DAMAGED)', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.boxPkg("TestBox1");
        salesOrderSummary.addpkgncomplete();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PICKEDUP BY CUSTOMER");
    })

    it("SC 14 : RMA Creation for PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Picked up by customer return order :DAMAGED", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });

});

describe("Scenario 15:Picked up by customer - Return(DOES NOT FIT) ", function(){

    it('Scenario 15: PICKEDUP BY CUSTOMER - return (DOES NOT FIT)', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        browser.manage().window().setSize(900, 900);
        salesOrderSummary.soGeardots();
        salesOrderEdit.ClickonEditoption("Edit Line");
        salesOrderEdit.selectfromEditOption("Pick Up At Store");
        salesOrderEdit.selectfromEditOption("rmasite");
        salesOrderEdit.ClickonEditoption("Apply");
        salesOrderCreate.saveOption("Save");
        browser.driver.manage().window().setSize(1440,900);
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        storePortalV2.boxPkg("TestBox1");
        salesOrderSummary.addpkgncomplete();
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.multiSelect();
        storePortalV2.headerIcons("truck");
        storePortalV2.pickUpOrder();
        storePortalV2.pickedUpBy("QA");
        storePortalV2.verificationType("Driving License");
        storePortalV2.confirmBtn();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        storePortalV2.clickOnStatustext();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("PICKEDUP BY CUSTOMER");
    })

    it("SC 15 : RMA Creation for PICKEDUP BY CUSTOMER order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Picked up by customer return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });

});

describe("Scenario 16: Delivered status - Return (OTHER)", function(){

    it('Scenario 16:Delivered order return - OTHER', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.clickonProductStatus();
        salesOrderSummary.EditGear();
        salesOrderSummary.updateStatus();
        salesOrderSummary.delivered.click();
        salesOrderSummary.updateComments();
        salesOrderSummary.updateStatus();
        browser.sleep(200);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("DELIVERED");
    })

    it("SC 16: RMA Creation for DELIVERED order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Delivered return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });

});

describe("Scenario 17: Delivered order - Return(DAMAGED)", function(){

    it('Scenario 17:Delivered order return - DAMAGED', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.clickonProductStatus();
        salesOrderSummary.EditGear();
        salesOrderSummary.updateStatus();
        salesOrderSummary.delivered.click();
        salesOrderSummary.updateComments();
        salesOrderSummary.updateStatus();
        browser.sleep(200);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("DELIVERED");
    })

    it("SC 17: RMA Creation for DELIVERED order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Delivered return order :damaged", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DAMAGED");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DAMAGED");
                done();
            });
    });

});

describe("Scenario 18:Delivered status order - Return(DOES NOT FIT)", function(){

    it('Scenario 18:Delivered order return - DOES NOT FIT', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.clickonProductStatus();
        salesOrderSummary.EditGear();
        salesOrderSummary.updateStatus();
        salesOrderSummary.delivered.click();
        salesOrderSummary.updateComments();
        salesOrderSummary.updateStatus();
        browser.sleep(200);
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.verifyorderStatus("DELIVERED");
    })

    it("SC 18: RMA Creation for DELIVERED order", done => {
        data.Scenario.Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data.Scenario.Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Scenario.Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Delivered return order :DOES NOT FIT", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("DOES NOT FIT");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : DOES NOT FIT");
                done();
            });
    });

});
describe("Scenario 19: Return adjust inventory with out inventory pool reference name", function(){

    it('Scenario 19:Return adjust inventory with out inventory pool reference name', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("RMACUSTOMER")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("RMASKU02");
        salesOrderCreate.selectSKU();
        browser.sleep(200);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(storePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.searchOrderCriteria("Order #","contains",SONumber);
        });
        storePortalV2.clickOnTruck();
        storePortalV2.qtyPick();
        salesOrderSummary.addpkgncomplete();
        browser.get(callcentersalesorderUrl);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            salesOrderSummary.searchQueryCriteria("Order #",SONumber);
        });
        browser.sleep(200);
        salesOrderSummary.verifyorderStatus("SHIPPED");
    })
    it("SC 19 RMA Creation for Shipped order", done => {
        data["No Inventory pool"].Input.orders[0].lineItems[0].originalLine.orderNo = SONumber;
        console.log(JSON.stringify(data["No Inventory pool"].Input));       
        var options = {
            method: 'POST',
            url: data.URL.RMA,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["No Inventory pool"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                console.log("Rma response", response.body)
                var orderReturn = body.orders[0].orderNumber;
                returnOrderNbr = orderReturn;
                console.log("Shipped return order :OTHER", returnOrderNbr);
                browser.get(fulfillmentRmaReturnsURL);
                salesOrderCreate.orderSearch(returnOrderNbr);
                browser.sleep(2000);
                shipmentRequestcreate.clickOnRMA("OTHER");
                browser.get(inventoryPoolUrl);
                inventoryPoolsummary.searchPool("RMAPool");
                browser.sleep(2000);
                inventoryPoolsummary.clickOnPool();
                inventoryPoolsummary.searchSKU("RMASKU02");
                inventoryPoolsummary.clickonATS();
                inventoryPoolsummary.validateReturnLog("Adjustment due to return received for RMA with Number " + returnOrderNbr + " with disposition : OTHER");
                done();
            });
    });

});



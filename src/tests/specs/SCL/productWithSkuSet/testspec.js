
var common = require(process.cwd() + '/screens/commons.js');

var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var routesScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var productEditScreen = require(process.cwd() + '/screens/product/product.edit.screen.js');
var skuCreateScreen = require(process.cwd() + '/screens/sku/sku.create.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";
global.orginalATSValue = "";
global.ATSValueAfterAllocation = "";
global.ATSValueAfterUpdation = "";
global.originalResValue = "";
global.resValueAfterAllocation = "";
global.resValueAfterUpdation = "";

describe('Create a Sales Order and verify Allocated,BackOrder,Shipped,Cancelled quantity in various scenarios: ', function() {

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    it('Create a Sales Order and verify Allocated,BackOrder,Shipped,Cancelled quantity in various scenarios:TC007 ', function () {

        /* Create sales order via callcenter with single line having quantity as 3, generate shipment for 1 qty
        and verify the Quantity of allocated and shipped fields before and after shipment
         */

        //verify that inventory of sku is >3 before creating an order.

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 3)) {
                //Adding below line for ATS verification after updation, as if ATS >0 then 3 will be appended to atsValueOfSku
                currentSkuValue = parseInt(atsValueOfSku) + 3;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(3);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(currentSkuValue);
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //create sales order
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.valueOfSku1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        callCenter.clickSearch();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        //update the line quantity as 3
        callCenter.increaseLineQty("3");
        browser.sleep(3000);

        // save the sales Order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
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
            salesOrderSummary.salesOrderSelectGear("View");

            //verify the quantity count after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:3");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" + shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" + backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
                var CancelledQuantityValue = CancelledQuantity;
                expect(CancelledQuantityValue).toEqual("Cancelled:0");
                console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
            })

            //create shipment
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("1");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);

            //verify the sales order status after shipment
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");

        });

        //verify line quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;

            expect(bacKOrderQuantityValue).toEqual("BackOrdered:2");
            console.log("*********BackOrder quantity**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
        })


    })
    it('Create sales order with multiple lines,save,cancel line1,release and create shipment - TC006',function () {

        /* create SO with 2 lines then save the order.Now cancel line1 and release the order.
        verify the quantity count create shipment and reverify the quantity of line after shipment.
         */
        //verify the inventory availability of sku - 2 before creating the order.

        //verify the ATS value of sku2

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku2);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 0)) {
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    //expect(skuAtsValue).toEqual("5");
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });
        // create sales order with sku1 and sku2
        //create sales order


        //create sales order
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.valueOfSku1);
        callCenter.selectSKUFromSearch();
        browser.sleep(1000);
        callCenter.clickSearch();
        browser.sleep(1000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(1000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        //add line2
        commons.searchWithCriteria('SKU', 'contains', browser.params.valueOfSku2);
        browser.sleep(2000);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        callCenter.searchForSelectedSku();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(2000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //cancel first line
        salesOrderCreate.editLineGear("1");
        salesOrderCreate.lineItemselectOptions("Cancel Line");
        browser.sleep(1000);
        //salesOrderCreate.confirmCancellation();

        //verify line1 allocated,shipped,backorder,cancelled quantity after cancelling the line

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of line1**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shippingQuantity) {
            var shippingQuantityValue = shippingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of line1**********" + shippingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:1");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 allocated,shipped,backorder,cancelled quantity before releasing the order

        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of line2**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of line2**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line2**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" + CancelledQuantityValue);
        })

        //release the order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

        //verify line1 allocated quantity after releasing the order
        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity**********" +allocatedQuantity);
        })
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            //generate shipment
            browser.get(shipmentRequestsUrl);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(1000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            browser.sleep(3000);
            //shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            //shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            browser.sleep(3000);
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(2000);

            //verify the order status after shipment
            browser.wait(function () {
                return SONumber != '';
            }).then(function () {
                browser.get(callCenterSalesOrdersListUrl);
                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
                salesOrderSummary.salesOrderSelectGear("View");
                browser.sleep(1000);
            })


        });


        //verify line1 allocated,shipped,backorder,cancelled quantity after shipment of line2
        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of line1**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of line1**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:1");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 allocated,shipped,backorder,cancelled quantity after shipment

        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line2**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line2**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line2**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" + CancelledQuantityValue);
        })


    })



})






var common = require(process.cwd() + '/screens/commons.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');


global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";


describe('Create order via Callcenter and verify Allocated,BackOrder,Shipped,Cancelled quantity in various scenarios: ', function() {

    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();

    /* This spec includes sales order creation in different scenario's and verifies quantity
      TC001 - Creation of Sales order from callCenter with single line,shipment and verify quantity
      TC002- Creation of Sales order from callCenter with Multi line,shipment and verify quantity
      TC003-Creation of Sales order from callCenter with Multi line, partial shipment and verify quantity
      TC004-Creation of Sales order from callCenter with Multi line(one line with failed to allocate status),shipment and verify quantity
      TC005-Creation of Sales orderfrom callCenter  with Multi line(one line with failed to allocate status) then update inventory
            and release the order from callCenter again verify quantity,create shipment for 2 lines and verify quantity
      TC006-create of Sales order from callCenter  with multiline then cancel one line,release order,create shipment and verify quantity

     */

    it('create SalesOrder with single line,shipment and verify shipped and allocated quantity count - TC001', function () {

        /* Create sales order 'single line' from call center and release the order, generate shipment and verify the
        Quantity of allocated and shipped fields before and after shipment.
         */

        //setup the inventory pool(with ATS >= 5 for both SKU's so that they are available for ordercreation of TC001-TC005)

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 5)) {
                //Adding below line for ATS verification after updation, as if ATS >0 then 5 will be appended to atsValueOfSku
                currentSkuValue = parseInt(atsValueOfSku) + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(currentSkuValue);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        ////verify the inventory count of second sku

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku2);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 5)) {
                //Adding below line for ATS verification after updation, as if ATS >0 then 5 will be appended to atsValueOfSku
                currentSkuValue = parseInt(atsValueOfSku) + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(currentSkuValue);
                })
            }
            else {
                console.log("Sku ATS value is already greater than 0 no need to update it");
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
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" +shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" +backorderQuantity);
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
            browser.sleep(3000);
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
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");

        });

        //verify line quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
        })


    })


    it('create SalesOrder with multiple lines,create shipment and verify shipped and allocated count - TC002', function () {

        /*
           generate shipment for both lines and verify the Quantity
         of allocated and shipped lines, before and after shipment
        */

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

            //verify the quantity count of line 1 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" +shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" +backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
                var CancelledQuantityValue = CancelledQuantity;
                expect(CancelledQuantityValue).toEqual("Cancelled:0");
                console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
            })
            //verify the quantity of line2 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" +shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" +backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
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
            callCenter.enterItemQty2("1");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);

            //verify the sales order status after shipment
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");

        });
        //verify line1 quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line 1**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line 1**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of Line2**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of Line2**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line2**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" +CancelledQuantityValue);
        })

    })

    it('create SalesOrder from call center with multiple lines,create partial shipment and verify shipped and allocated count - TC003', function() {

        /* Create sales order  from call center with multiple line,generate partail shipment and verify the Quantity of allocated and shipped lines,
         before and after shipment
         */
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

            //verify the quantity count of line 1 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
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
            //verify the quantity of line2 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" + shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" + backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
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
            browser.sleep(1000);
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
        //verify line1 quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line 1**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line 1**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of Line2**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of Line2**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
            console.log("*********BackOrder quantity of line2**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" + CancelledQuantityValue);
        })

    })

    it('create SalesOrder with ML(line1-shipped,line2-failed to allocate),create shipment and verify Quantity -TC004', function() {
        /*  create sales order from call center with line1- released,line-2 failed to allocate, create shipment
         and verify the quantity of Allocated,backorder,shipped and Cancelled for both the lines.
        */
        // setup the inventory count of skuWith0ATS as "unavailable" so that line item can be updated with failed to allocate state.
        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.skuWith0ATS);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            if (atsValueOfSku != "") {
                newAtsValue = "-" + atsValueOfSku;
                console.log("new ATS value is" + newAtsValue);
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(newAtsValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js reference sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of original sku is updated to 0
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("0");
                })
            } else {
                console.log("ATS value is already 0 no need to update it");
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

        //add line2 with sku having inventory count as 0
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWith0ATS);
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
        //release the order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            salesOrderSummary.salesOrderSelectGear("View");

            //verify the quantity count of line 1 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
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
            //verify the quantity of line2 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:0");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" + shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
                console.log("*********BackOrder quantity**********" + backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
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
            browser.sleep(1000);
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
        //verify line1 quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line 1**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line 1**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of Line2**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of Line2**********" + shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
            console.log("*********BackOrder quantity of line2**********" + backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" + CancelledQuantityValue);
        })



    });

    it('create SO with ML(L2-failed to allocate),update inventory,re-release order,shipment and verify Quantity - TC005', function() {
        /*  1.create sales order with line1- released,line-2 failed to allocate,then update inventory for line2 sku,
         re-release the order and create shipment for both the lines.
        2.verify the quantity of Allocated,backorder,shipped and Cancelled for both the lines.
        */
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

        //add line2 with sku having inventory count as 0
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWith0ATS);
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
        //release the order
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            salesOrderSummary.salesOrderSelectGear("View");
            //verify the quantity count of line 1 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
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
            //verify the quantity of line2 after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:0");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" + shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
                console.log("*********BackOrder quantity**********" + backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
                var CancelledQuantityValue = CancelledQuantity;
                expect(CancelledQuantityValue).toEqual("Cancelled:0");
                console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
            })
        });
        //update the inventory quantity of "skuWith0ATS" and make it available for order placement

        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.skuWith0ATS);
        //update ATS of skuWith0ATS to 5, if Ats =0
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 0)) {
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("5");
                })
            } else {
                console.log("Sku ATS value is already greater than 0 no need to update it");
            }
        });

        //now release the order to verify that line2 is allocated with available sku
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

            //verify the quantity count of line 1 after re-releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
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

            //verify the quantity of line2 after re-releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity**********" + shipingQuantity);
            })
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
                console.log("*********BackOrder quantity**********" + backorderQuantity);
            })
            salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
                var CancelledQuantityValue = CancelledQuantity;
                expect(CancelledQuantityValue).toEqual("Cancelled:0");
                console.log("*********Cancelled quantity**********" + CancelledQuantityValue);
            })

            //create shipment for line1

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

            //generate shipment for line2

            browser.get(shipmentRequestsUrl);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(1000);
            commons.createSecondShipmentRequest();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
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
            //verify the sales order status after shipment
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(1000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");


        });

        //verify line1 quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line 1**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line 1**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line1**********" + CancelledQuantityValue);
        })

        //verify line2 quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of Line2**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of Line2**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line2**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" +CancelledQuantityValue);
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


})

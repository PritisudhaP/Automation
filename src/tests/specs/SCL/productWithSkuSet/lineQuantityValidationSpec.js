var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";


describe('Create a Sales Order and verify Allocated,BackOrder,Shipped,Cancelled quantity in various scenarios: ', function() {

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();

    /* This spec includes sales order creation in different scenario's and verifies quantity
      TC001 - Creation of Sales order with single line,shipment and verify quantity
      TC002- Creation of Sales order with Multi line,shipment and verify quantity
      TC003-Creation of Sales order with Multi line, partial shipment and verify quantity
      TC004-Creation of Sales order with Multi line(one line with failed to allocate status),shipment and verify quantity
      TC005-Creation of Sales order with Multi line(one line with failed to allocate status) then update inventory
            and release the order again verify quantity,create shipment for 2 lines and verify quantity
      TC006-create of Sales order with multiline then cancel one line,release order,create shipment and verify quantity

     */


    it('create SalesOrder,shipment and verify shipped and allocated quantity count - TC001', function() {

        /* Create sales order with single line, generate shipment and verify the Quantity of allocated and shipped fields
           before and after shipment
         */

        //setup the inventory pool(with ATS >= 5 for both SKU's so that they are available for ordercreation of TC001-TC005)

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = parseInt(atsValue);
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
                    expect(parseInt(skuAtsValue)).toEqual(parseInt(currentSkuValue));
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
            atsValueOfSku = parseInt(atsValue);
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
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //Add Sku
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify allocated line quantity after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })
            //create shipment
            browser.get(shipmentRequestsUrl);
            console.log("print the SO Number in Fulfilment screen" + SONumber);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(4000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(5000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })

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

    });

    it('create SalesOrder with multiple lines,create shipment and verify shipped and allocated count - TC002', function() {

        /* Create sales order with multiple line,generate shipment for both lines and verify the Quantity of allocated and shipped lines,
         before and after shipment
         */
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(4000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(5000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify line1 allocated quantity after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity of line1 **********" +allocatedQuantity);
            })

            //verify line2 allocated quantity after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity of line2**********" +allocatedQuantity);
            })

            //create shipment for both the lines
            browser.get(shipmentRequestsUrl);
            console.log(SONumber);
            console.log("print the SO Number in Fulfilment screen" + SONumber);
            browser.sleep(3000);
            //commons.clearSearch();
            browser.sleep(1000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(4000);
            commons.createShipment();
            browser.sleep(5000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            browser.sleep(3000);
            shipmentRequestsCreate.enterItemQty2("1");
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(2000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })
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

    });

    it('create SalesOrder with multiple lines,create partial shipment and verify shipped and allocated count - TC003', function() {

        /* Create sales order with multiple line,generate partial shipment and verify the Quantity of allocated and shipped lines,
         before and after shipment
         */
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify line1 allocated quantity after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })

            //verify line2 allocated quantity after releasing the order
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })

            //create shipment for both the lines
            browser.get(shipmentRequestsUrl);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(1000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            browser.sleep(3000);
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(2000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })

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
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of Line2**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of Line2**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
            console.log("*********BackOrder quantity of line2**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" +CancelledQuantityValue);
        })

    });

    it('create SalesOrder with ML(line1-shipped,line2-failed to allocate),create shipment and verify Quantity -TC004', function() {
        /*  create sales order with line1- released,line-2 failed to allocate, create shipment
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
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1 with sku which has inventory available.
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2 with sku does'nt have inventory available.
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.skuWith0ATS);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify line1 allocated quantity after releasing the order

            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })

            //verify line2 allocated quantity after releasing the order

            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:0");
                console.log("*********Allocated quantity**********" +allocatedQuantity);
            })

            //verify backorder quantity of line 2 after releasing the order
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
                console.log("*********Allocated quantity**********" +backorderQuantity);
            })
            //generate shipment
            browser.get(shipmentRequestsUrl);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(1000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            browser.sleep(3000);
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(2000);

            /* get shipment request number to confirm shipment creation
            shipmentRequestsCreate.getShipmentOrderNumber().then(function (shipmentOrder) {
                var shipmentOrderNumberValue = shipmentOrder;
                console.log("Shipment Created Number is" + shipmentOrderNumberValue);
            });

             */

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })

        //verify line1 allocated,shipped,backorder,cancelled quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line1**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line1**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity of line1**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(1).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line1**********" +CancelledQuantityValue);
        })

        //verify line2 allocated,shipped,backorder,cancelled quantity after shipping the order

        salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity of line2**********" +allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:0");
            console.log("*********Shipped quantity of line2**********" +shipingQuantity);
        })
        salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
            console.log("*********BackOrder quantity of line2**********" +backorderQuantity);
        })
        salesOrderCreate.getCancelledCountOfTheLine(2).then(function (CancelledQuantity) {
            var CancelledQuantityValue = CancelledQuantity;
            expect(CancelledQuantityValue).toEqual("Cancelled:0");
            console.log("*********Cancelled quantity of line2**********" +CancelledQuantityValue);
        })
    });

    it('create SO with ML(L2-failed to allocate),update inventory,re-release order,shipment and verify Quantity - TC005', function() {
        /*  1.create sales order with line1- released,line-2 failed to allocate,then update inventory for line2 sku,
         re-release the order and create shipment for both the lines.
        2.verify the quantity of Allocated,backorder,shipped and Cancelled for both the lines.
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
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1 with sku which has inventory available.
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2 with sku does'nt have inventory available.
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.skuWith0ATS);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);

        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify line1 allocated quantity after releasing the order

            salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })

            //verify line2 allocated quantity after releasing the order

            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:0");
                console.log("*********Allocated quantity**********" + allocatedQuantity);
            })

            //verify backorder quantity of line 2 after releasing the order
            salesOrderCreate.getBackOrderedCountOfTheLine(2).then(function (backorderQuantity) {
                var bacKOrderQuantityValue = backorderQuantity;
                expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
                console.log("*********Allocated quantity**********" + backorderQuantity);
            })

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

            //navigate to sales order and release the order again to verify the line2 allocation after inventory updation.
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");

            //now verify the line2 allocated,backorder,shipped and cancelled quantity
            salesOrderCreate.getAllocatedCountOfTheLine(2).then(function (allocatedQuantity) {
                var allocatedQuantityValue = allocatedQuantity;
                expect(allocatedQuantityValue).toEqual("Allocated:1");
                console.log("*********Allocated quantity of Line2**********" + allocatedQuantity);
            })
            salesOrderCreate.getShippedCountOfTheLine(2).then(function (shipingQuantity) {
                var shippingQuantityValue = shipingQuantity;
                expect(shippingQuantityValue).toEqual("Shipped:0");
                console.log("*********Shipped quantity of Line2**********" + shipingQuantity);
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

            //generate shipment for line 1
            browser.get(shipmentRequestsUrl);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(1000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
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
            browser.sleep(8000);
            browser.sleep(8000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })

        //verify line1 allocated,shipped,backorder,cancelled quantity after shipping the order
        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity of line1**********" + allocatedQuantity);
        })
        salesOrderCreate.getShippedCountOfTheLine(1).then(function (shipingQuantity) {
            var shippingQuantityValue = shipingQuantity;
            expect(shippingQuantityValue).toEqual("Shipped:1");
            console.log("*********Shipped quantity of line1**********" + shipingQuantity);
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

        //verify line2 allocated,shipped,backorder,cancelled quantity after shipping the order

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


    });

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
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //Add Sku 1
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);

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
        salesOrderCreate.releaseSalesOrder();
        browser.sleep(2000);
        salesOrderCreate.verifyOrderTypeHeader().then(function (text) {
            var status = text;
            expect(status).toEqual("RELEASED");
        });

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
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            browser.sleep(3000);
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(2000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
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

    it('create SalesOrder with QTY 3 and shipment for only 1 qty,verify shipped and allocated quantity count - TC007', function () {

        /*Create sales order with single line having quantity as 3, generate shipment for 1 qty
       and verify the Quantity of allocated and shipped fields before and after shipment */


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
                //verify that ATS value of sku is updated to 3
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(parseInt(currentSkuValue));
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //Add Sku
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.enterQuantity("3");
        browser.sleep(2000);

        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //save order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");


            //verify  line quantity after releasing the order
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
            browser.get(shipmentRequestsUrl);
            console.log("print the SO Number in Fulfilment screen" + SONumber);
            browser.sleep(3000);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            browser.sleep(4000);
            commons.createShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            shipmentRequestsCreate.selectShippingAccount(browser.params.shipmentAccountNumber);
            shipmentRequestsCreate.packageSelection(browser.params.shipmentPackageSelection);
            shipmentRequestsCreate.setItemTrackingNumber("1");
            shipmentRequestsCreate.enterItemQty("1");
            shipmentRequestsCreate.addPackageToShipment();
            browser.sleep(3000);
            shipmentRequestsCreate.finalizeShipment();
            browser.sleep(5000);

            //verify the order status after shipment
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY SHIPPED');
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(1000);
        })

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

    });


})

var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var routesScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var productEditScreen = require(process.cwd() + '/screens/product/product.edit.screen.js');
var skuCreateScreen = require(process.cwd() + '/screens/sku/sku.create.screen.js');

global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.CurrentATSValue = "";
global.originalATSValue = "";
global.ATSValueAfterAllocation = "";
global.ATSValueAfterUpdation = "";
global.orginalResValue = "";
global.resValueAfterAllocation = "";
global.resValueAfterUpdation = "";
global.remorsalSONumber = "";

describe('Create a Sales Order and verify Allocated,BackOrder,Shipped,Cancelled quantity in various scenarios: ', function() {

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var routeSummary = new routesScreen();
    var callCenter = new callCenterScreen();
    var productEdit = new productEditScreen();
    var skuCreate = new skuCreateScreen();



    /* This spec includes scenario's that are tested when the order is under RemorsePeriod.
      TC001 - create a sales order,allocate by running the route and wait for TC008 to release the order
      TC002 - Creation of Order, allocate by running the route,and then Cancel order before remorse period.
      TC003- Creation of Order, allocate by running the route,and then Cancel line before remorse period.
      TC004- create order, allocate and  release  before remorse period
      TC005- create SO with line qty-1 ATS-1,allocate, update the Qty=2 and verify the line status,cancel the order.
      TC006- create SO with 3 lines,allocate,update one line as fail to validate line,cancel it,re-allocate order
      TC007 - Release SO created in TC001 to verify that order is released sucessfully after remorsal period.

     */

    it("create SalesOrder,allocate and release the order after remorsal period(in TC007) - TC0001",function () {

        /*  create a sales order with channel as "remorseChannel" and save the order.
            run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status as Allocated
            order will be released in TC007(i.e after remorsal period)
         */
        //verify the inventory count of sku before creating the order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "")) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(5);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("remorseChannel");
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
            remorsalSONumber = value;
            console.log(remorsalSONumber);
        });
        browser.sleep(2000);
        browser.wait(function () {
            return remorsalSONumber != '';
        }).then(function () {
            console.log("order number is "+remorsalSONumber);
            salesOrderCreate.verifyOrderStatus().then(function (status) {
                var OrderStatus = status;
                expect(OrderStatus).toEqual("OPEN");
                console.log("*******Order Status is ***********" + OrderStatus);
            });
            //expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
        })

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            console.log("the original ATS value before allocation is " + OriginalATSValue);
            ATSValueAfterAllocation  = parseInt(OriginalATSValue) - 1;
            browser.sleep(2000);
        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            console.log("the original reserved value before allocation is " + orginalResValue);
            resValueAfterAllocation  = parseInt(orginalResValue) + 1;
            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated TC001 >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated TC001 >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return remorsalSONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", remorsalSONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED');
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //this order will be released in TC007 to verify that order is released sucessfully after remorsal period.

    })


    it('create SalesOrder,allocate by running route,Cancel order before remorse period - TC002', function () {

        /*  create a sales order with channel as "remorseChannel" and save the order.
            run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status as Allocated
            navigate to order screen and cancel the order and verify order and line quantity status
            also verify inventory count before and after cancellation of order.

         */

        //verify the inventory count of sku before creating the order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "")) {


                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(5);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("remorseChannel");
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
            console.log("order number is "+SONumber);
            salesOrderCreate.verifyOrderStatus().then(function (status) {
                var OrderStatus = status;
                expect(OrderStatus).toEqual("OPEN");
                console.log("*******Order Status is ***********" + OrderStatus);
            });
            //expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
        })

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            console.log(OriginalATSValue);
            ATSValueAfterAllocation  = parseInt(OriginalATSValue) - 1;
            browser.sleep(2000);
        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            console.log(orginalResValue);
            resValueAfterAllocation  = parseInt(orginalResValue)+1;
            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After AllocatedACTUAL  TC002 >>>>>>>>>>>> " + availableQty);
            console.log("*********** Available: After Allocated  TC002 >>>>>>>>>>>> " + ATSValueAfterAllocation);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED');
            console.log("Order status is" + salesOrderSummary.salesOrderStatus());
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //verify whether a reservation is created for the allocated quantity under reservation tab
        salesOrderCreate.numberOfReservationCreated().then(function (qty) {
            var salesOrderResQty = qty;
            expect(salesOrderResQty).toEqual("1");
        })
        //verify that shipment request is not created for the order.
        salesOrderCreate.numberOfShippingRequestsCreated().then(function (qty) {
            var shippingRequestCount = qty;
            expect(shippingRequestCount).toEqual("0");
        })

        //cancel the order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.cancelSalesOrder();
        browser.sleep(3000);


        //verify the sales order and line status after cancellation

        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("CANCELED");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

        //sales order line status
        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("CANCELLED");
            console.log("*******Line Status is ***********" + lineStatus);
        })

        //verify the inventory count after cancellation of sales order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(OriginalATSValue);
            console.log("*********** Available: After cancellation  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(orginalResValue);
            console.log("*********** Reserved: After cancellation  >>>>>>>>>>>> " + resQty);

        });

    });

    it('create SalesOrder,allocate by running route,Cancel Line before remorse period - TC003', function () {

        /*  create a sales order with channel as "remorseChannel" and save the order.
            run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status as Allocated
            navigate to order screen and cancel the line and verify order and line quantity status
            also verify inventory count before and after cancellation of order.

         */

        //verify the inventory count of sku before creating the order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "")) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(5);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("remorseChannel");
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
            console.log("order number is "+SONumber);
            salesOrderCreate.verifyOrderStatus().then(function (status) {
                var OrderStatus = status;
                expect(OrderStatus).toEqual("OPEN");
                console.log("*******Order Status is ***********" + OrderStatus);
            });

        })

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            console.log(OriginalATSValue);
            ATSValueAfterAllocation  = parseInt(OriginalATSValue)-1;
            browser.sleep(2000);
        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            console.log(orginalResValue);
            resValueAfterAllocation  = parseInt(orginalResValue)+1;
            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED');
            console.log("Order status is" + salesOrderSummary.salesOrderStatus());
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //verify whether a reservation is created for the allocated quantity under reservation tab
        salesOrderCreate.numberOfReservationCreated().then(function (qty) {
            var salesOrderResQty = qty;
            expect(salesOrderResQty).toEqual("1");
        })
        //verify that shipment request is not created for the order.
        salesOrderCreate.numberOfShippingRequestsCreated().then(function (qty) {
            var shippingRequestCount = qty;
            expect(shippingRequestCount).toEqual("0");
        })

        //cancel line
        salesOrderCreate.clickOnEditLineIcon(1);
        browser.sleep(1000);
        salesOrderCreate.lineItemselectOptions("Cancel Line");
        browser.sleep(3000);


        //verify the sales order and line status after cancellation

        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("CANCELED");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

        //sales order line status
        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("CANCELLED");
            console.log("*******Line Status is ***********" + lineStatus);
        })

        //verify the inventory count after cancellation of sales order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(OriginalATSValue);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(orginalResValue);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

    });


    it("create order, allocate and  release  before remorse period - TC0004", function () {
        /*  -create a sales order with channel as "remorseChannel" and save the order.
            -run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status as Allocated
            -navigate to order screen and release the order to verify the error message generated when
            order is released before remorse period.

        */

        //verify the inventory count of sku before creating the order
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "") || (atsValueOfSku <= 5)) {
                CurrentATSValue = parseInt(atsValueOfSku) + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(parseInt(CurrentATSValue));
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });
        //create sales order
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        commons.new();
        browser.driver.sleep(5000);
        browser.waitForAngular();
        salesOrderCreate.setSalesChannel("remorseChannel");
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
            console.log("order number is "+SONumber);
            salesOrderCreate.verifyOrderStatus().then(function (status) {
                var OrderStatus = status;
                expect(OrderStatus).toEqual("OPEN");
                console.log("*******Order Status is ***********" + OrderStatus);
            });

        })

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            console.log(OriginalATSValue);
            ATSValueAfterAllocation  = parseInt(OriginalATSValue)-1;
            browser.sleep(2000);
        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            console.log(orginalResValue);
            resValueAfterAllocation  = parseInt(orginalResValue)+1;
            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED');
            console.log("Order status is" + salesOrderSummary.salesOrderStatus());
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //release the order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.releaseOrder();
        browser.sleep(3000);
        //verify the error message
        salesOrderCreate.getErrorMessage().then(function (error) {
            var errorMessage = error;
            expect(errorMessage).toContain("No releasable line items found on Order");
            console.log("the error message is " + errorMessage);
        })


    })

    it("create SO with line qty-1 ATS-1,allocate, update the Qty=2 and verify the line status,cancel the order -TC005",function () {
        /* create sales order from call center with QTY=1 and ATS of Sku is also 1. allocate the order
           update the QTY =2 after allocation.refresh the order and check order allocation and

         */

        //update the inventory count of sku as 1
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if (atsValueOfSku == "") {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity("1");
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("1");
                })
            }
            //reduce the ATS to 1 if ATS>1
            else if (atsValueOfSku != 1) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                var  newAtsValue = parseInt(atsValueOfSku) -1;
                var updatedATSValue =  - parseInt(newAtsValue);
                inventoryLookup.enterAdjustmentQuantity(updatedATSValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 1
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("1");
                })
            }
            else {
                console.log("Sku value is already equal to 1 no need to update it");
            }
        });

        //create sales order with line qty =1
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.valueOfSku1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(3000);
        salesOrderCreate.setSalesChannel("remorseChannel");
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            console.log("order number is "+SONumber);
            salesOrderCreate.verifyOrderStatus().then(function (status) {
                var OrderStatus = status;
                expect(OrderStatus).toEqual("OPEN");
                console.log("*******Order Status is ***********" + OrderStatus);
            });
        })

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            ATSValueAfterAllocation  = parseInt(OriginalATSValue)-1;


            browser.sleep(2000);
        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            resValueAfterAllocation  = parseInt(orginalResValue)+1;

            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('ALLOCATED')
            /* salesOrderSummary.salesOrderStatus().then(function (status) {
                 var orderStatus = status;
                 expect(orderStatus).toEqual('ALLOCATED');
                 console.log("Order status is " + orderStatus);
             })*/
            callCenter.callCenterSalesOrderSelectGear("View");
            browser.sleep(2000);

        })

        //update the line quantity as 2
        callCenter.increaseLineQty("2");
        browser.sleep(1000);

        //verify the order and line status after Qty updation are updated as open

        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("OPEN");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

        //sales order line status
        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("OPEN");
            console.log("*******Line Status is ***********" + lineStatus);
        })

        //verify the line quantity values of the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:0");
            console.log("*********Allocated quantity**********" +allocatedQuantity);
        })

        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:0");
            console.log("*********BackOrder quantity**********" +backorderQuantity);
        })

        //verify the inventory count after the order status updation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(OriginalATSValue);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(orginalResValue);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });


        //re-run the "scheduleReleaseSalesOrders-allocateonly" route
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the sales order status
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderStatus().then(function (status) {
                var orderStatus = status;
                expect(orderStatus).toEqual('PARTIALLY ALLOCATED');
                console.log("Order status is " + orderStatus);
            })
            callCenter.callCenterSalesOrderSelectGear("View");
            //salesOrderSummary.salesOrderSelectGear("View");
        })
        /*salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("PARTIALLY ALLOCATED");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

         */

        //sales order line status
        salesOrderCreate.salesOrderLineStatus().then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("PARTIALLY ALLOCATED");
            console.log("*******Line Status is ***********" + lineStatus);
        })

        //verify the line quantity values of the order

        salesOrderCreate.getAllocatedCountOfTheLine(1).then(function (allocatedQuantity) {
            var allocatedQuantityValue = allocatedQuantity;
            expect(allocatedQuantityValue).toEqual("Allocated:1");
            console.log("*********Allocated quantity**********" +allocatedQuantity);
        })

        salesOrderCreate.getBackOrderedCountOfTheLine(1).then(function (backorderQuantity) {
            var bacKOrderQuantityValue = backorderQuantity;
            expect(bacKOrderQuantityValue).toEqual("BackOrdered:1");
            console.log("*********BackOrder quantity**********" +backorderQuantity);
        })

    })

    it("create SO with 3 lines,allocate,update one line as fail to validate line,cancel it,re-allocate order -TC006", function () {

        /* -Create SO with 3-lines,line1 has ATS, line2,line3 with 0 ATS,allocate order
           - remove catalog for line3,line3 and order status will be updated as FTA
           - cancel FTA line, re-allocate the order,verify order status
         */

        //setup the ATS values of 3 sku's before creating the order.
        //verify that ATS value of SKU1 should be >0.
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "")) {


                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(5);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //verify that SKU2 has 0 ATS
        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku2);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            if (atsValueOfSku != "") {
                newAtsValue = "-" + atsValueOfSku;
                console.log("new ATS value is" + newAtsValue);
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(newAtsValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of  sku 2 is updated to 0
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("0");
                })
            } else {
                console.log("ATS value is already 0 no need to update it");
            }
        });

        //verify that SKU3 has 0 ATS
        browser.get(inventoryLookUpUrl);
        browser.sleep(3000);
        inventoryLookup.getSkuInfo(browser.params.valueOfsku4);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            if (atsValueOfSku != "") {
                newAtsValue = "-" + atsValueOfSku;
                console.log("new ATS value is" + newAtsValue);
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(newAtsValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of  sku 3 is updated to 0
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
        salesOrderCreate.setSalesChannel("remorseChannel");
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

        //add line3
        commons.searchWithCriteria('SKU', 'contains', browser.params.valueOfsku4);
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
        browser.sleep(2000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //verify the inventory count before allocation

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            OriginalATSValue  = availableQty;
            ATSValueAfterAllocation  = parseInt(OriginalATSValue)-1;
            browser.sleep(2000);
        });
        inventoryLookup.getReservedQty().then(function (resQty) {
            orginalResValue  = resQty;
            resValueAfterAllocation  = parseInt(orginalResValue)+1;

            browser.sleep(2000);
        });

        //run the route "scheduleReleaseSalesOrders-allocateonly" to update the order status from open to allocated
        //navigate to routes screen
        browser.get(routeUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name","contains","scheduleReleaseSalesOrders-allocateonly");
        browser.sleep(1000);
        routeSummary.routeSelectButton("Start");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        routeSummary.routeSelectButton("Stop");
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);
        browser.sleep(5000);

        //verify the inventory count after allocation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        browser.sleep(2000);
        inventoryLookup.getAvailableQty().then(function (availableQty) {
            expect(availableQty).toEqual(ATSValueAfterAllocation);
            console.log("*********** Available: After Allocated  >>>>>>>>>>>> " + availableQty);

        });

        inventoryLookup.getReservedQty().then(function (resQty) {
            expect(resQty).toEqual(resValueAfterAllocation);
            console.log("*********** Reserved: After Allocated  >>>>>>>>>>>> " + resQty);

        });

        //verify the order status after running the route
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIALLY ALLOCATED');
            console.log("Order status is" + salesOrderSummary.salesOrderStatus());
            salesOrderSummary.salesOrderSelectGear("View");
        })
        //sales order line status

        //line1 status
        salesOrderCreate.getlineStatus(1).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("ALLOCATED");
            console.log("*******Line1 Status is ***********" + lineStatus);
        })

        //line2 status
        salesOrderCreate.getlineStatus(2).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("OPEN");
            console.log("*******Line2 Status is ***********" + lineStatus);
        })

        //line3 status
        salesOrderCreate.getlineStatus(3).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("OPEN");
            console.log("*******Line3 Status is ***********" + lineStatus);
        })

        //remove catalog from line3 sku item, to makeup the line status and order status as fail to allocate

        //removing catalog
        browser.get(skuUrl);
        browser.sleep(3000);
        productEdit.searchWithCriteria("Name", "contains", browser.params.valueOfsku4);
        browser.sleep(3000);
        productEdit.clickOnSelectGear();
        productEdit.clickOnEditButton();
        browser.sleep(1000);
        skuCreate.selectCatalog();
        browser.sleep(1000);
        skuCreate.clickOnDeleteCatalogButton();
        skuCreate.saveSku();
        browser.sleep(1000);

        //save the sales order to verify the order and line status after removing catalog from sku
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("View");
        })
        salesOrderCreate.saveOrder();

        //verify order status
        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("FAILED TO VALIDATE");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

        //verify line status
        //line1 status
        salesOrderCreate.getlineStatus(1).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("ALLOCATED");
            console.log("*******Line1 Status is ***********" + lineStatus);
        })

        //line2 status
        salesOrderCreate.getlineStatus(2).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("OPEN");
            console.log("*******Line2 Status is ***********" + lineStatus);
        })

        //line3 status
        salesOrderCreate.getlineStatus(3).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("FAILED TO VALIDATE");
            console.log("*******Line3 Status is ***********" + lineStatus);
        })

        //cancel the failed to validate line
        salesOrderCreate.clickOnEditLineIcon(3);
        browser.sleep(1000);
        salesOrderCreate.lineItemselectOptions("Cancel Line");
        browser.sleep(3000);

        //verify the line status
        salesOrderCreate.getlineStatus(3).then(function (status) {
            var lineStatus = status;
            expect(lineStatus).toEqual("CANCELLED");
            console.log("*******Line3 Status is ***********" + lineStatus);
        })

        //verify the order status
        salesOrderCreate.verifyOrderStatus().then(function (status) {
            var OrderStatus = status;
            expect(OrderStatus).toEqual("PARTIALLY ALLOCATED");
            console.log("*******Order Status is ***********" + OrderStatus);
        });

        //add catalog to the sku3 for further testing
        browser.get(skuUrl);
        browser.sleep(3000);
        productEdit.searchWithCriteria("Name", "contains", browser.params.valueOfsku4);
        browser.sleep(3000);
        productEdit.clickOnSelectGear();
        productEdit.clickOnEditButton();
        browser.sleep(1000);
        skuCreate.selectCatalog();
        skuCreate.attachCatalog();
        skuCreate.enterCatalogId(browser.params.catalog);
        skuCreate.enterCategoryName(browser.params.catalogCategoryName);
        skuCreate.savePopup();
        browser.sleep(2000);
        skuCreate.saveSku();
        browser.sleep(2000);

    })

    it("Release alloacted order after remorsal period TC007", function() {

        //get the "remorsalSONumber" from TC001 and release the order

        //verify the inventory count of the sku that is used in order creation of TC001

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "")) {
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("test");
                inventoryLookup.clickOnSaveButton();
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(5);
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        //navigate to SO screen
        browser.get(salesOrderUrl);
        console.log("navigating to sales order list screen");
        browser.wait(function () {
            return remorsalSONumber != '';
        }).then(function () {
            console.log("order number is " + remorsalSONumber);
            commons.searchWithCriteria("Order #", "contains", remorsalSONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');


        })
    })







})


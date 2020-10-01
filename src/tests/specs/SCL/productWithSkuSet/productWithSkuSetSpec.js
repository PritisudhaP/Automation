
var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');

global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.thirdLineStatus = "";


describe('Order creation Flow  with SKU KIT: ', function() {

    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();

    it('create SalesOrder with SKU Kit and verify shipping and lineitem Quantity - TC001', function(){

        /* setup a sku Kit product "SKUKITTC001" having Kit components as 'SKUKITPRODUCTTC001' and 'SKUKITPRODUCTTC002'
        and verify the inventory count of kit components before creating an order with kit sku "SKUKITTC001"
         */
        //verify the inventory count of first kit component
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
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
                    expect(skuAtsValue).toEqual("5");
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

        ////verify the inventory count of second kit component.

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
                    expect(skuAtsValue).toEqual("5");
                })
            }
            else {
                console.log("Sku ATS value is already greater than 0 no need to update it");
            }
        });
        //create sales order with kit's sku

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
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.newProductName);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function(value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        browser.wait(function() {
            return SONumber != '';
        }).then(function() {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #","contains",SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");

            //verify salesorder line quantity

            salesOrderSummary.getSalesOrderLineQty().then(function (quantity) {
                var lineQuantity = quantity.substring(0,1);
                console.log("***************Line quantity is" + lineQuantity);
                expect(lineQuantity).toEqual('1');
            });

            //verify shipment order line quantity

            salesOrderSummary.clickOnshippingRequestTab();
            salesOrderSummary.viewShippingRequest();
            salesOrderSummary.getShippingQuantityValue().then(function (value) {
                var shippingQuantityValue = value;
                console.log("***************Shipping quantity is" + shippingQuantityValue);
                expect(shippingQuantityValue).toEqual('1');
            })

        });



    });

    it('create order flow with multiple lines,by adding kits sku and sku components individually as line items - TC002', function() {

        //creating an order with 3 lines. line1 with kit's sku,line 2 and 3 with individual kit components


        //check the inventory count of  sku component 1  and update it to 5 if ats=0

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku =="") || (atsValueOfSku <= 0)) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("5");
                })
            }
            else {
                console.log("Sku value is already greater than 0 no need to update it");
            }

        });

        //check the inventory count of  sku component 2  and update it to 5 if ats=0

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
                    expect(skuAtsValue).toEqual("5");
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

        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.searchCustomer("Name", browser.params.customerSearchValue);
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        //salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1 with sku kit
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.newProductName);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2 with first sku component
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line3 with second sku component
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();
        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function(value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        browser.wait(function() {
            return SONumber != '';
        }).then(function() {
            browser.get(salesOrderUrl);
//                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            commons.searchWithCriteria("Order #","contains",SONumber);

            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
            salesOrderSummary.salesOrderSelectGear("View");

            //verify line1 Kit's sku status
            salesOrderCreate.getLineOneStatus().then(function (lineOneStatus) {
                firstLineStatus = lineOneStatus;
                expect(firstLineStatus).toEqual('RELEASED');
                console.log("First line status is" +firstLineStatus );
            })
            //verify line2 first sku kit component status
            salesOrderCreate.getSecondLineStatus().then(function (lineTwoStatus) {
                SecondLineStatus = lineTwoStatus;
                expect(SecondLineStatus).toEqual('RELEASED');
                console.log("Second line status is" +SecondLineStatus );
            })
            //verify line3 second sku kit component status
            salesOrderCreate.getThirdLineStatus().then(function (lineThreeStatus) {
                thirdLineStatus = lineThreeStatus;
                expect(thirdLineStatus).toEqual('RELEASED');
                console.log("Third line status is" +thirdLineStatus );
            })

            //verify salesorder line quantity for kit's sku

            salesOrderSummary.getSalesOrderLineQty().then(function (quantity) {
                var lineQuantity = quantity.substring(0,1);
                console.log("***************Line quantity is" + lineQuantity);
                expect(lineQuantity).toEqual('1');
            });

            //verify shipment order line quantity for kit's sku

            salesOrderSummary.clickOnshippingRequestTab();
            salesOrderSummary.viewShippingRequest();
            salesOrderSummary.getShippingQuantityValue().then(function (value) {
                var shippingQuantityValue = value;
                console.log("***************Shipping quantity is" + shippingQuantityValue);
                expect(shippingQuantityValue).toEqual('1');
            })

        });

    });


    it('createorder with ML,include kits sku and sku components as individual lineitems with inventory count of kit componnets as 1 - TC003', function() {

        //setup the inventory with both kit component sku's - sku1 and sku2 having available inventory count as 1
        /* create an order with Multiline, having kit's sku as line1,first kit sku component as line2 and  second kit sku
        component as line3, release the order and verify allocation.
         */

        //verify the sku kit component1 inventory count and update it to 1 if ATS!=1

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku1);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            //update the count to 1, if count =0
            if(atsValueOfSku == "")
            {
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(1);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 1
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("1");
                })
            }
            //reduce the ATS to 1 if ATS>1
            else if (atsValueOfSku != 1) {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                var newAtsValue = parseInt(atsValueOfSku) -1;
                var updatedATSValue = - parseInt(newAtsValue);
                inventoryLookup.enterAdjustmentQuantity(updatedATSValue);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 1
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(skuAtsValue).toEqual("1");
                })
            }
            else {
                console.log("Sku value is already 1 no need to update it");
            }


        });

        //check the ATS value of second sku component and update it to 1 if ats!=1

        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.valueOfSku2);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = atsValue;
            console.log(" ATS value is" + atsValueOfSku);
            if (atsValueOfSku == "") {

                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity("1");
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
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
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js sku kit");
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

        //add line 1 with sku kit
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.newProductName);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2 with first sku component
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line3 with second sku component
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.valueOfSku2);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();
        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function(value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        browser.wait(function() {
            return SONumber != '';
        }).then(function() {
            browser.get(salesOrderUrl);
            commons.searchWithCriteria("Order #", "contains", SONumber);
            commons.multiselect();
            browser.sleep(3000);
            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('PARTIAL RELEASE');
            salesOrderSummary.salesOrderSelectGear("View");
        })

        //verify first line status
        salesOrderCreate.getLineOneStatus().then(function(FirstLineStatus){
            var linestatus = FirstLineStatus;
            console.log("First line status is"+linestatus);
            if(( linestatus = 'RELEASED') || (linestatus = 'FAILED TO ALLOCATE'))
                var result = true;
            else
                var result = false;
            expect(result).toEqual(true);
        })
        //verify second line ststus
        var secondLineStatus =  salesOrderCreate.getSecondLineStatus().then(function(SecondLineStatus){
            var linestatus = SecondLineStatus;
            console.log("Second line status is"+linestatus);
            if(( linestatus = 'RELEASED') || (linestatus = 'FAILED TO ALLOCATE'))
                var result = true;
            else
                var result = false;
            expect(result).toEqual(true);
        })


        //verify line 3 status
        var thirdLineStatus =  salesOrderCreate.getThirdLineStatus().then(function(lineThreeStatus){
            var linestatus = lineThreeStatus;
            console.log("third line status is"+linestatus);
            if(( linestatus = 'RELEASED') || (linestatus = 'FAILED TO ALLOCATE'))
                var result = true;
            else
                var result = false;
            expect(result).toEqual(true);
        })

        //verify salesorder line quantity for kit's sku

        salesOrderSummary.getSalesOrderLineQty().then(function (quantity) {
            var lineQuantity = quantity.substring(0,1);
            console.log("***************Line quantity is" + lineQuantity);
            //expect(lineQuantity).toEqual('1');
        });



    });

})

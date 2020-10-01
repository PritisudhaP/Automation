var common = require(process.cwd() + '/screens/commons.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var inventoryLookupScreen = require(process.cwd() + '/screens/inventoryLookUp/inventoryLookUp.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var returnsVDPScreen = require(process.cwd() + '/screens/ReturnVDP/returnsVDPScreen.js');
var storePortal = require(process.cwd() + '/screens/storePortal/storePortal.screen.js');
global.shippingQuantityValue = "";
global.SONumber = "";
global.atsValueOfSku = "";
global.newAtsValue = "";
global.firstLineStatus = "";
global.SecondLineStatus = "";
global.currentSkuValue = "";
global.ReshipOrderNumber = "";


describe("ReShip order flow", function () {
    var commons = new common();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var inventoryLookup = new inventoryLookupScreen();
    var callCenter = new callCenterScreen();
    var returnsvdp = new returnsVDPScreen();
    var storePortals = new storePortal();

    it("Create a sales order with line qty =3, create reship order,save it -TC001", function () {
        /* create a sales order via call center with single line qty=3
           click on reship button,provide reason code and comments
           verify the reason code,comments, line qty,price values on reship order
           save the reship order and release it successfully and complete fulfilment.
         */

        /*
        //verify the sku has avialable ats value before order creation
        browser.get(inventoryLookUpUrl);
        browser.sleep(2000);
        inventoryLookup.getSkuInfo(browser.params.reshipSku);
        inventoryLookup.getAtsValue().then(function (atsValue) {
            atsValueOfSku = parseInt(atsValue);
            console.log(" ATS value is" + atsValueOfSku);
            if ((atsValueOfSku == "" || atsValueOfSku <= 3)) {
                var newskuvalue = atsValueOfSku + 5;
                inventoryLookup.clickOnEntryAdjustmentTab();
                browser.sleep(1000);
                inventoryLookup.enterAdjustmentQuantity(5);
                inventoryLookup.enterAdjustmentReason("To RS004-verifyParentChildLinkOnOriginalOrderspec.js");
                inventoryLookup.clickOnSaveButton();
                //verify that ATS value of sku is updated to 5
                inventoryLookup.getAtsValueFromSkuResult().then(function (atsValue) {
                    var skuAtsValue = atsValue;
                    expect(parseInt(skuAtsValue)).toEqual(newskuvalue);
                })
            } else {
                console.log("Sku value is already greater than 0 no need to update it");
            }
        });

         */

        //create a sales order with line qty =3.
        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.reshipSku);
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
        callCenter.increaseLineQty("1", "3");
        browser.sleep(3000);

        //save the order
        salesOrderCreate.saveOption("Save");
        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        //release order
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
            browser.sleep(4000);

            //complete fulfilment
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", SONumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("3");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);

            //navigate to salesorder screen
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
            browser.sleep(2000);
            salesOrderSummary.salesOrderSelectGear("View");
            browser.sleep(2000);
        });




    //create reship order
        salesOrderCreate.clickOnOrderSelectGearIcon();
        browser.sleep(1000);
        salesOrderCreate.clickOnReshipButton();
        browser.sleep(2000);
        salesOrderCreate.selectReasonCode();
        browser.sleep(2000);
        salesOrderCreate.enterReshipComments("test");
        browser.sleep(1000);
        salesOrderCreate.clickOnCreateReshipOrderButton();
        browser.sleep(5000);

        // verify the reship order status
        salesOrderCreate.getOrderStatusValue().then(function (status) {
            var reshipStatus = status;
            expect(reshipStatus).toEqual("RESHIP DRAFT");
            console.log("The reship order status before saving" + reshipStatus);
        });
        browser.sleep(1000);

        //verify the reship line quantity (it should be =2, as original order qty=3 as per fetchReshipSalesOrderDetailsType script)
        salesOrderCreate.getFirstLineQty().then(function (lineqty) {
            var lineOneQty = lineqty;
            expect(lineOneQty).toEqual("3x");
            console.log("The reship order line qty is " + lineOneQty);
        });
        browser.sleep(2000);

        //verify the reason code and  reship comments.
        salesOrderCreate.getReshipReason().then(function (reason) {
            var reshipReason = reason;
            expect(reshipReason).toEqual("delayed");
            console.log("The reship reason is " + reshipReason);
        });

        salesOrderCreate.getReshipCommentsOnOrder().then(function (comments) {
            var reshipComments = comments;
            expect(reshipComments).toEqual("test");
            console.log("The reship comments are " + reshipComments);
        });

        //verify the price on line item
        salesOrderCreate.getLinePriceAmount(1).then(function (price) {
            var linePrice = price;
            expect(linePrice).toEqual("$0.00");
            console.log("The reship order price is " + linePrice);
        });

        //verify the balance due amount of reship order
        salesOrderCreate.getBalanceDueAmount().then(function (price) {
            var balanceAmount = price;
            expect(balanceAmount).toEqual("$0.00");
            console.log("The reship due amount is " + balanceAmount);
        });

        //save the reship order
        salesOrderCreate.saveOption("Save");
        browser.sleep(5000);
        salesOrderCreate.salesOrderNumber().then(function (value) {
            ReshipOrderNumber = value;
            console.log("Reship ordernumber of RS001 is " + ReshipOrderNumber);
        });
        browser.sleep(2000);

        //verify that reship order status is updated to "open" from "reship draft" status.
        salesOrderCreate.getOrderStatusValue().then(function (status) {
            var reshipStatus = status;
            expect(reshipStatus).toEqual("OPEN");
            console.log("The reship order status after saving" + reshipStatus);
        });
        browser.sleep(1000);

        //release the reship order
        browser.wait(function () {
            return ReshipOrderNumber != '';
        }).then(function () {
            browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", ReshipOrderNumber);
            //commons.multiselect();
            browser.sleep(3000);

            salesOrderSummary.salesOrderSelectGear("Release");
            browser.sleep(3000);
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');


            //complete fulfilment
            browser.get(fulfillmentRequestsUrl);
            browser.sleep(2000);
            callCenter.OrderNumberSearch("Original Order #", ReshipOrderNumber);
            browser.sleep(3000);
            callCenter.fulfillmentOrderSelectGear("Create Shipment");
            browser.sleep(3000);
            shipmentRequestsCreate.clickOnShippingLabelGenerationCheckBox();
            browser.sleep(3000);
            callCenter.packageSelection(browser.params.shipmentPackageSelection);
            browser.sleep("500");
            callCenter.setItemTrackingNumber("1");
            browser.sleep(1000);
            callCenter.enterItemQty("3");
            browser.sleep(1000);
            callCenter.addPackageToShipment();
            browser.sleep(2000);
            callCenter.finalizeShipment();
            browser.sleep(3000);
        });

        //verify the reship order status after shipment

        browser.get(callCenterSalesOrdersListUrl);
        salesOrderSummary.salesOrderSearch("Original Order #", ReshipOrderNumber);
        browser.sleep(1000);
        expect(salesOrderSummary.salesOrderStatus()).toEqual('SHIPPED');


    //create returns of reship order
    //<<<<<<**** Navigate to Returns- vendor portal
    browser.wait(function () {
        return ReshipOrderNumber != '';
    }).then(function () {
        browser.get(vendorPortalReturnsUrl);
        browser.driver.sleep(2000);
        commons.searchWithCriteria("Order #", '', ReshipOrderNumber);
        browser.sleep(1000);
        returnsvdp.selectOrderFromSearch();
        browser.sleep(1000);
        commons.search();
        browser.sleep(1000);
        returnsvdp.selectOrderFromResults();
    });


    returnsvdp.inspectReturn();
    browser.sleep(1000);
    //***<<<<  Below method to check if submit button is disabled when disposition details are blank >>>>******
    returnsvdp.submitDispositionStatus().then(function (status) {
        console.log(status);
        browser.sleep(1000);
        expect(status).toBe(null);
    });
    browser.sleep(1000);
    //***<<<< Get return Qty and store it in a varibale >>>>******
    returnsvdp.getReturnQty().then(function (qty) {
        returnQTy = parseInt(qty);
        console.log("returnQTy>>>>", +returnQTy);
    })
    returnsvdp.enterDisposition(1);
    returnsvdp.validateMissingReason(1).then(function (errorMsg) {
        expect(errorMsg).toEqual("Reason cannot be Blank");
    });
    returnsvdp.deleteRow();
    returnsvdp.addDisposition(3, "DAMAGED", "this is testing");
    //Saves the return disposition
    returnsvdp.clickSave();
    //View the disposition
    returnsvdp.clickView(1);
    returnsvdp.submitReturns();
    browser.sleep(3000);
    //***<<<< Navigate to Return-Payment Disposition and verify RMA creation >>>>******
    browser.get(paymentDispositionUrl);
    storePortals.searchShipment("Saleorder #", '', ReshipOrderNumber);
    browser.sleep(1000);
    //***<<<< Validation to confirm RMA status :to be 'Inspected' >>>>>>>****
    returnsvdp.getRMAStatus().then(function (status) {
        expect(status).toBe('INSPECTED');
    })
    returnsvdp.clickRMA();
    browser.sleep(3000);

    returnsvdp.selectCreditType("REFUND");
    //*****<<<<< Click Submit  >>>>******
    returnsvdp.clickSubmit();
    browser.sleep(3000);
    //*****<<<<< VERIFY RMA status after submit  >>>>******

    storePortals.searchShipment("Saleorder #", '', ReshipOrderNumber);
    browser.sleep(1000);
    returnsvdp.getRMAStatus().then(function (status) {
        expect(status).toBe('PENDING PAYMENT');
    })


})
})


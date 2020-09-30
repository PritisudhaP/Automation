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
global.lineStatusesText = "";
global.reasonTextVal = "";
global.amountTextVal = "";
global.descTextVal = "";
global.errorMessage = "";
global.discountAmountAtLineItem1 = "";
global.discountAmountAtLineItem2 = "";
global.discountDetailsAmtLine1 = "";
global.discountDetailsAmtLine2 = "";
global.discountAmtBillDetails = "";
global.appeasementDetailsAmt = "";
global.appeasementAmtBillDetails = "";
global.orderlvlAppeasementval = "";
describe('Call Center Flow', function () {

    var callCenter = new callCenterScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();


    //Add SKU to the sales order from call center inventory lookup then save and release the order
    //Adding multiple SKU's to the order and applying discounts and appeasements
    //Applying discounts and appeasements to the order and creating shipment for the order
    //validating the discount amounts and appeasement amounts through expect conditions

    it('Call center Flow TC00010', function () {

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.searchValueSKU1);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        callCenter.addToOrder();
        browser.sleep(3000);
        callCenter.attachCustomer();
        browser.sleep(2000);
        callCenter.searchCustomer(browser.params.customerCriteria, browser.params.customerSearchValue);
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();
        browser.sleep(3000);
        callCenter.editLineGear("1");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("25.99");
        browser.sleep(2000);
        callCenter.incrementQty();
        browser.sleep(3000);
        callCenter.searchSKU(browser.params.skuCriteria, browser.params.searchValueSKU2);
        callCenter.selectSKUFromSearch();
        browser.sleep(2000);
        commons.search();
        browser.sleep(2000);
        callCenter.selectSKUFromResults();
        browser.sleep(2000);
        callCenter.addToOrderFromSalesOrder();
        browser.sleep(2000);
        callCenter.editLineGear("2");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Change Price");
        browser.sleep(2000);
        callCenter.changingUnitPrice("15.99");
        browser.sleep(3000);
        //!***************<<<< Below line is to SAVE the sales order >>>>>>********************

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });

        browser.sleep(2000);
        callCenter.editLineGear("1");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Discounts");
        browser.sleep(2000);
        callCenter.applyDiscount("Percentage", "6", "EmployeeDiscount", "desc1", "notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(4000);
        callCenter.editLineGear("3");
        browser.sleep(1000);
        callCenter.lineItemselectOptions("Discounts");
        browser.sleep(2000);
        callCenter.applyDiscount("Amount", "4", "EmployeeDiscount", "desc1", "notes1");
        browser.sleep(1000);
        callCenter.applyButton();
        browser.sleep(2000);
        callCenter.discountAmtAtLineItem("1").then(function (value) {
            discountText = value;
            res = discountText.substring(2, 6);
            discountAmountAtLineItem1 = parseFloat(res);
            console.log(discountAmountAtLineItem1);
            expect(discountAmountAtLineItem1).toBe(3.12);

            callCenter.discountAmtAtLineItem("2").then(function (value) {
                discountText = value;
                res = discountText.substring(2, 6);
                discountAmountAtLineItem2 = parseFloat(res);
                console.log(discountAmountAtLineItem2);

                callCenter.amountFromDetails("Discounts", "1").then(function (value) {
                    discountText = value;
                    res = discountText.substring(2, 6);
                    discountDetailsAmtLine1 = parseFloat(res);
                    console.log(discountDetailsAmtLine1);
                    expect(discountDetailsAmtLine1).toBe(3.12);

                    callCenter.amountFromDetails("Discounts", "2").then(function (value) {
                        discountText = value;
                        res = discountText.substring(2, 6);
                        discountDetailsAmtLine2 = parseInt(res);
                        console.log(discountDetailsAmtLine2);

                        callCenter.amtFromBilledDetails("Discount:").then(function (value) {
                            discountText = value;
                            res = discountText.substring(2, 6);
                            discountAmtBillDetails = parseFloat(res);
                            console.log(discountAmtBillDetails);

                            var discountTotalFromLineItems = discountAmountAtLineItem1 + discountAmountAtLineItem2;
                            var sumOfDiscountsFromLineItems = discountTotalFromLineItems.toFixed(2);
                            console.log(sumOfDiscountsFromLineItems);
                            expect(parseFloat(sumOfDiscountsFromLineItems)).toBe(discountAmtBillDetails);
                            browser.sleep(500);

                            var discountTotalFromDetails = discountDetailsAmtLine1 + discountDetailsAmtLine2;
                            var sumofDiscountsFromDetails = discountTotalFromDetails.toFixed(2);
                            console.log(sumofDiscountsFromDetails);
                            expect(parseFloat(sumofDiscountsFromDetails)).toBe(discountAmtBillDetails);
                        });
                    });
                });
            });
        });


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

            //!*********fulfillment request**********!//
             browser.get(fulfillmentRequestsUrl);
             browser.sleep(2000);
             callCenter.OrderNumberSearch("Original Order #", SONumber);
             browser.sleep(3000);
             callCenter.fulfillmentOrderSelectGear("Create Shipment");
             browser.sleep(3000);
             callCenter.packageSelection(browser.params.packageValue);
             browser.sleep("500");
             callCenter.enterItemQty("1");
             callCenter.unselectPkg();
             browser.sleep(1000);
             callCenter.addPackageToShipment();
             browser.sleep(2000);
             callCenter.finalizeShipment();
             browser.sleep(3000);
             callCenter.ViewNotesClose();
             browser.get(callCenterSalesOrdersListUrl);
             salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
             //commons.multiselect();
             browser.sleep(3000);
             callCenter.callCenterSalesOrderSelectGear("View");
             browser.sleep(5000);
             callCenter.editLineGear("3");
             browser.sleep(2000);
             callCenter.lineLevelAppeasement();
             browser.sleep(2000);
             callCenter.applyAppeasement("Percentage", "5", "EmployeeAppeasement", "desc1", "notes1");
             browser.sleep(1000);
             callCenter.applyButton();
             browser.sleep(3000);
            callCenter.amountFromDetails("Appeasements", "2").then(function (value) {
                appeasementText = value;
                res = appeasementText.substring(2, 6);
                appeasementDetailsAmt = parseFloat(res);

                callCenter.orderLevelAppeasement();
                browser.sleep(2000);
                callCenter.applyAppeasement("Amount", "6", "EmployeeAppeasement", "desc1", "notes1");
                browser.sleep(1000);
                callCenter.applyButton();
                browser.sleep(2000);
                callCenter.appeasementsHeader();
                browser.sleep(2000);
                callCenter.orderAppeasementTxt().then(function (orderTxt) {
                    orderlvlAppeasement = orderTxt;
                    console.log(orderlvlAppeasement);
                });
                callCenter.orderAppeasementValue().then(function (orderValue) {
                    appeasementText = orderValue;
                    res = appeasementText.substring(1, 6);
                    orderlvlAppeasementval = parseFloat(res);
                    console.log(orderlvlAppeasementval);

                    callCenter.amtFromBilledDetails("Appeasement:").then(function (orderValue) {
                        appeasementText = orderValue;
                        res = appeasementText.substring(2, 6);
                        appeasementAmtBillDetails = parseFloat(res);
                        console.log(appeasementAmtBillDetails);


                        appeasement = orderlvlAppeasementval + appeasementDetailsAmt;
                        console.log(appeasement);
                        expect(appeasementDetailsAmt).toBe(1.41);

                        var appeasementFromDetails = orderlvlAppeasementval + appeasementDetailsAmt;
                        var sumOfAppeasements = appeasementFromDetails.toFixed(2);
                        console.log(sumOfAppeasements);
                        expect(parseFloat(sumOfAppeasements)).toBe(appeasementAmtBillDetails);

                    });
                });
            })


        })

    })
    })






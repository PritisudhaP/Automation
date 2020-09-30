//********************************************************* Valid test case ****************************************************
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');
var storePortal = require(process.cwd() + '/src/tests/screens/storePortal/storePortal.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');
var purchaseOrderCreateScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.create.screen.js');
var purchaseOrderEditScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.edit.screen.js');
var purchaseOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/purchaseOrder/purchaseOrder.summary.screen.js');

global.SONumber = "";
global.SONumber2 = "";
global.currentInventoryCount = "";
global.updatedInventoryCount = "";


describe('Print Picklist multiple orders-TC0017 : ', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    var commons = new common();
    var inventorySearch = new inventorySearchScreen();

    var storePortals = new storePortal();
    var loginScreen = new loginPage();

    var purchaseOrderCreate = new purchaseOrderCreateScreen();
    var purchaseOrderEdit = new purchaseOrderEditScreen();
    var purchaseOrderSummary = new purchaseOrderSummaryScreen();


    it('Sales Order that  order that release. Print picklist- TC0017', function () {


        /* ************************************************************
        create 2 sales orders & release them.
        Sales order1: Qty needed =1; Sales order2: Qty needed =3
        Using 'mathcing any' criteria search 2 orders and select them.
        Now Print the pick list(order/Item) and parse the pdf into a text file.
        Compare the qty needed (in sales orders ) with the Qty needed in the text document.

                  ************************************************************ */

        browser.get(salesOrderUrl);
        browser.driver.manage().window().maximize();

        loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(3000);
        browser.driver.sleep(3000);
        console.log("navigating to sales order list screen");

//***************<<<< Below lines :To Create a NEW sales order >>>>>>********************

        commons.new();
        browser.driver.sleep(2000);
        browser.waitForAngular();


        //salesOrderCreate.setSalesChannel("FULFILLMENT");
        storePortals.salesChannel("Fulfillment");
        salesOrderCreate.attachCustomer();
        browser.sleep(2000);
        salesOrderCreate.searchCustomer("Name", "MUSICA");
        browser.sleep(3000);
        salesOrderCreate.selectCustomer();
        browser.sleep(2000);
        salesOrderCreate.useSelectedCustomer();

        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("7-0-8");
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        salesOrderCreate.saveOption("Save");

        salesOrderCreate.salesOrderNumber().then(function (value) {
            SONumber = value;
            console.log(SONumber);


            browser.sleep(2000);
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
            });
//***************<<<< Below lines : to create 2nd sales order >>>>>>********************

            commons.new();
            //browser.driver.sleep(2000);
            //browser.waitForAngular();

            salesOrderCreate.setSalesChannel("FULFILLMENT");
            salesOrderCreate.attachCustomer();
            browser.sleep(2000);
            salesOrderCreate.searchCustomer("Name", "MUSICA");
            browser.sleep(3000);
            salesOrderCreate.selectCustomer();
            browser.sleep(2000);
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("7-0-8");
            salesOrderCreate.searchInPopup();
            browser.sleep(3000);
            salesOrderCreate.selectSKU();
            storePortals.qtyUpdate(3);
            browser.sleep(3000);
            salesOrderCreate.addProduct();

            salesOrderCreate.saveOption("Save");

            salesOrderCreate.salesOrderNumber().then(function (value) {
                SONumber2 = value;
                console.log(SONumber2);


                browser.sleep(2000);

                browser.wait(function () {
                    return SONumber2 != '';
                }).then(function () {
                    browser.get(salesOrderUrl);
                    salesOrderSummary.salesOrderSearch("Original Order #", SONumber2);
                    commons.multiselect();
                    browser.sleep(3000);

                    salesOrderSummary.salesOrderSelectGear("Release");
                    browser.sleep(2000);
                    expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
                });

//**********<<< Navigate To StorePortal >>>  *******************************


                storePortals.navigateToStorePortal();
                browser.sleep(1000);
                storePortals.searchOrderCriteria('Order #', 'is', SONumber);

                browser.sleep(1000);
                element(by.buttonText("Save")).click();
                browser.sleep(500);
                storePortals.selectMatchingCriertia('Matching Any');
                browser.sleep(1000);

                storePortals.searchOrderCriteria('Order #','contains', SONumber2);
                browser.sleep(2000);
                storePortals.multipleOrderSelect();

                browser.sleep(2000);

                var sourcePDF = "./tempFiles/export.pdf";
                var destTxt = "./tempFiles/export.txt";

                var sourcePDF1 = "./Files1/export.pdf";

                var fssourcePDF = require('fs');
                var fsdestTxt = require('fs');

                if (fssourcePDF.existsSync(sourcePDF)) {
                    // Make sure the browser doesn't have to rename the download
                    fssourcePDF.unlinkSync(sourcePDF);
                }

                if (fsdestTxt.existsSync(destTxt)) {
                    // Make sure the browser doesn't have to rename the download
                    var tempFile10 = fsdestTxt.openSync(destTxt, 'r');
                    fsdestTxt.closeSync(tempFile10);
                    fsdestTxt.unlinkSync(destTxt);
                }
//*******************<<< print picklist and download the pick list in the pdf format >>>>>**********///////

                //storePortals.pickListByItemSavePDF();
                storePortals.pickListByOrderSavePDF();

                browser.driver.wait(function () {
                    return fssourcePDF.existsSync(sourcePDF);
                }, 30000).then(function () {
                    browser.sleep(2000);
                    /*******<<<<<< Parsing pdf: convert pdf to txt  >>>>>>>>>>>************///

                    commons.parsePdf(sourcePDF, destTxt);

                    browser.sleep(4000);
                    browser.driver.wait(function () {
                        return fsdestTxt.existsSync(destTxt);
                    }, 30000).then(function () {
                        // expect(fsdestTxt.readFileSync(destTxt, { encoding: 'utf8' })).toMatch('QtyNeeded1');
                        expect(fsdestTxt.readFileSync(destTxt, {encoding: 'utf8'})).toMatch('Qty Needed3');
                        expect(fsdestTxt.readFileSync(destTxt, {encoding: 'utf8'})).toMatch('Qty Needed1Page 2 of 2');


                    });
                })

            })


        })

    })
})




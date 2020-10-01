var productCreateScreen = require(process.cwd() + '/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/screens/product/product.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/screens/sku/sku.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var inventoryPoolSummaryScreen = require(process.cwd() + '/screens/inventoryPool/inventoryPool.summary.screen.js');
var inventoryPoolEditScreen = require(process.cwd() + '/screens/inventoryPool/inventoryPool.edit.screen.js');
var inventorySearchSummaryScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var callCenterScreen = require(process.cwd() + '/screens/callCenter/callCenter.Screen.js');
var productEditScreen = require(process.cwd() + '/screens/product/product.edit.screen.js');


describe('Order creation Flow  with SKU having variants: ', function() {
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuSummary = new skuSummaryScreen();
    var productEdit = new productEditScreen();
    var commons = new common();
    var inventoryPoolSummary = new inventoryPoolSummaryScreen();
    var inventoryPoolEdit = new inventoryPoolEditScreen();
    var inventorySearchSummary = new inventorySearchSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var callCenter = new callCenterScreen();




    it('salesOrderFlow ML with sku with variants as line items - TC0001', function () {


          /* create a sku for the existing product that has variants,
       Add another sku to the product with same variants and check error message
       Add another sku to the product with different variants,create inventory for both sku's
       create sales order with both the sku's and release the order */



        // create sku for the product with variants
        console.log("navigating to sku screen");
        browser.get(skuUrl);
        browser.sleep(5000);
        skuCreate.newSku();
        skuCreate.enterDisplayName(browser.params.skuWithVariant1);
        skuCreate.enterTitle(browser.params.skuWithVariant1);
        skuCreate.enterProduct(browser.params.productWithVariant);
        skuCreate.enterId(browser.params.skuWithVariant1);
        skuCreate.checkActiveProductCheckBox();
        skuCreate.enterUOM("inches");
        skuCreate.enterHeight("1.5");
        skuCreate.enterLength("2.5");
        skuCreate.enterWidth("3");

        //save sku with default variants and verify the error message
        skuCreate.saveSku();
        browser.sleep(5000);

        //add catalog to the sku
        browser.get(skuUrl);
        browser.sleep(3000);
        productEdit.searchWithCriteria("Name", "contains", browser.params.skuWithVariant1);
        browser.sleep(3000);
        productEdit.clickOnSelectGear();
        productEdit.clickOnEditButton();
        browser.sleep(1000);
        skuCreate.selectCatalog();
        skuCreate.attachCatalog();
        skuCreate.enterCatalogId(browser.params.catalog);
        skuCreate.enterCategoryName(browser.params.catalogCategoryName);
        skuCreate.savePopup();
        skuCreate.saveSku();
        browser.sleep(2000);


        //create another sku with same product with variants(but update the variant details)
        console.log("navigating to sku screen");
        browser.get(skuUrl);
        browser.sleep(5000);
        skuCreate.newSku();
        skuCreate.enterDisplayName(browser.params.skuWithVariant2);
        skuCreate.enterTitle(browser.params.skuWithVariant2);
        skuCreate.enterProduct(browser.params.productWithVariant);
        skuCreate.enterId(browser.params.skuWithVariant2);
        skuCreate.checkActiveProductCheckBox();
        skuCreate.enterUOM("inches");
        skuCreate.enterHeight("1.5");
        skuCreate.enterLength("2.5");
        skuCreate.enterWidth("3");

        //save sku with default variants and verify the error message
        skuCreate.saveSku();
        browser.sleep(5000);
        skuCreate.errorMsgForSkuWithSameVariant().then(function (error) {
            var errorMsg = error;
            var expectedErrorMsg = "Sku found with same variants :";
            expect(errorMsg).toContain(expectedErrorMsg);
        })

        //update the variants and save the sku
        skuCreate.editVariant();
        browser.sleep(3000);
        skuCreate.chooseAnotherVariantValue(browser.params.firstVariantValue2);
        browser.sleep(3000);
        skuCreate.saveSku();
        browser.sleep(3000);

        //add catalog to the sku
        skuCreate.selectCatalog();
        browser.sleep(3000);
        skuCreate.attachCatalog();
        skuCreate.enterCatalogId(browser.params.catalog);
        skuCreate.enterCategoryName(browser.params.catalogCategoryName);
        skuCreate.savePopup();
        skuCreate.saveSku();
        browser.sleep(2000);


        //add sku's to inventory pool with some positive inventory count

        browser.get(inventoryPoolUrl);
        browser.sleep(2000);
        commons.searchWithCriteria("Name", "contains", browser.params.inventoryPool);
        browser.sleep(2000);
        inventoryPoolSummary.inventoryPoolSelectGear("Edit");
        browser.sleep(2000);
        inventoryPoolEdit.clickOnAttachSkusButton();
        commons.searchWithCriteria("Sku", "contains", browser.params.skuWithVariant1);
        productEdit.chooseSkuFromResult();
        inventoryPoolEdit.enterAvailableQty("1");
        inventoryPoolEdit.addSKU();
        browser.sleep(1000);

        // Adding second Sku to inventory pool
        inventoryPoolEdit.clickOnAttachSkusButton();
        productEdit.clickOnClearSearch(browser.params.skuWithVariant1);
        commons.searchWithCriteria("Sku", "contains", browser.params.skuWithVariant2);
        productEdit.chooseSkuFromResult();
        inventoryPoolEdit.enterAvailableQty("10");
        inventoryPoolEdit.addSKU();
        browser.sleep(1000);

        //saving pool
        inventoryPoolEdit.saveInventoryPool();
        browser.sleep(1000);

        //create sales order by adding both the sku's and release the order

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
        salesOrderCreate.confirmCustomerAddress();
        browser.sleep(3000);

        //add line 1
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct(browser.params.skuWithVariant1);
        salesOrderCreate.searchInPopup();
        salesOrderCreate.selectSKU();
        salesOrderCreate.addProduct();

        //add line2
        salesOrderCreate.addItem();
        salesOrderSummary.clearSearchTab();
        browser.sleep(1000);
        salesOrderCreate.searchProduct(browser.params.skuWithVariant2);
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
        })

        //verify that both the lines are in allocated sucessfully
        //verify line1  status
        salesOrderCreate.getLineOneStatus().then(function (lineOneStatus) {
            var firstLineStatus = lineOneStatus;
            expect(firstLineStatus).toEqual('ALLOCATED');
            console.log("First line status is" + firstLineStatus);
        })
        //verify line2 status
        salesOrderCreate.getSecondLineStatus().then(function (lineTwoStatus) {
            var SecondLineStatus = lineTwoStatus;
            expect(SecondLineStatus).toEqual('ALLOCATED');
            console.log("Second line status is" + SecondLineStatus);
        });
    })




    it("CallCenter-Order flow with ML having sku with variants as line items - TC002", function () {


        //create sales order from call center portal

        browser.get(callCenterInventoryUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWithVariant1);
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
        commons.searchWithCriteria('SKU', 'contains', browser.params.skuWithVariant2);
        browser.sleep(5000);
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
        })
        //verify that both the lines are in allocated sucessfully
        //verify line1  status
        salesOrderCreate.getLineOneStatus().then(function (lineOneStatus) {
            var firstLineStatus = lineOneStatus;
            expect(firstLineStatus).toEqual('ALLOCATED');
            console.log("First line status is" + firstLineStatus);
        })
        //verify line2 status
        salesOrderCreate.getSecondLineStatus().then(function (lineTwoStatus) {
            var SecondLineStatus = lineTwoStatus;
            expect(SecondLineStatus).toEqual('ALLOCATED');
            console.log("Second line status is" + SecondLineStatus);
        });


    })

    it("Delete Sku's Created for the product - TC0003", function () {

        //navigate to sku's url and delete skuWithVariant1
        browser.get(skuUrl);
        browser.sleep(3000);
        productEdit.searchWithCriteria("Name", "contains", browser.params.skuWithVariant1);
        browser.sleep(3000);
        productEdit.clickOnSelectGear();
        browser.sleep(3000);
        productEdit.clickOnDeleteButton();
        browser.sleep(3000);

        //navigate to sku url and delete skuwithvariant2
        browser.get(skuUrl);
        browser.sleep(3000);
        productEdit.searchWithCriteria("Name", "contains", browser.params.skuWithVariant2);
        browser.sleep(3000);
        productEdit.clickOnSelectGear();
        browser.sleep(3000);
        productEdit.clickOnDeleteButton();
        browser.sleep(3000);

    })


})

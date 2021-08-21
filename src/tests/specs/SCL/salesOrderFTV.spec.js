var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderEditScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.edit.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');

var skuCreateScreen = require(process.cwd() + '/screens/sku/sku.create.screen.js');
var skuEditScreen = require(process.cwd() + '/screens/sku/sku.edit.screen.js');
var skuSummaryScreen = require(process.cwd() + '/screens/sku/sku.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.SONumber="";


describe('Sales Order FTV scenarios : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderEdit = new salesOrderEditScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuEdit = new skuEditScreen();
    var skuSummary = new skuSummaryScreen();
    var commons = new common();

        it('Sales order with SKU not in catalog and then correct the error - TC0001', function(){


            browser.get(salesOrderUrl);
            browser.sleep(5000);
            console.log("navigating to sales order list screen");
            commons.new();
            browser.driver.sleep(5000);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("B2C");
            salesOrderCreate.attachCustomer();

            salesOrderCreate.searchCustomer("Name", "TC0001");
	 //   commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();
            salesOrderCreate.confirmCustomerAddress();
            browser.sleep(3000);

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("BT7");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();


            salesOrderCreate.saveOption("Save as Draft");

            salesOrderCreate.salesOrderNumber().then(function(value) {
                SONumber = value;
                console.log(SONumber);
            });

            browser.sleep(2000);

            salesOrderCreate.saveOption("Save");
            browser.sleep(2000);

            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
                salesOrderSummary.salesOrderSelectGear("View");
                expect(salesOrderEdit.salesOrderLineStatus()).toEqual('OPEN');

                browser.get(skuUrl);
                browser.sleep(5000);
                commons.searchWithCriteria("SKU","contains","BT7");
                commons.multiselect();
                skuSummary.skuSelectGear("Edit");
                skuCreate.selectCatalog();
                skuEdit.deattachCatalog();
                skuCreate.saveSku();

                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                salesOrderSummary.salesOrderSelectGear("View");
                salesOrderEdit.saveSO();
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('FAILED TO VALIDATE');
                salesOrderSummary.salesOrderSelectGear("View");
                expect(salesOrderEdit.salesOrderLineStatus()).toEqual('FAILED TO VALIDATE');

                browser.get(skuUrl);
                browser.sleep(5000);
                commons.searchWithCriteria("SKU","contains","BT7");
                commons.multiselect();
                skuSummary.skuSelectGear("Edit");
                skuCreate.selectCatalog();
                skuEdit.attachCatalog();
                skuCreate.enterCatalogId(browser.params.catalog);
                skuCreate.enterCategoryName(browser.params.catalogCategoryName);
                skuCreate.enterBasePrice("39.99");
                skuCreate.enterMSRP("40.99");
                skuCreate.savePopup();

                skuCreate.saveSku();

                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                salesOrderSummary.salesOrderSelectGear("View");
                salesOrderEdit.saveSO();
                browser.get(salesOrderUrl);
                commons.searchWithCriteria("Order #","contains",SONumber);
                commons.multiselect();
                browser.sleep(3000);
                expect(salesOrderSummary.salesOrderStatus()).toEqual('OPEN');
                salesOrderSummary.salesOrderSelectGear("View");
                expect(salesOrderEdit.salesOrderLineStatus()).toEqual('OPEN');
                browser.sleep(3000);
            });

        });

})

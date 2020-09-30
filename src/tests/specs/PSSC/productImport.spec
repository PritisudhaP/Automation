
var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');

var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');


var productImportScreen = require(process.cwd() + '/src/tests/screens/product/product.import.screen.js');
var importResultsSummaryScreen = require(process.cwd() + '/src/tests/screens/importResults/importResults.summary.screen.js');

var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Product/SKU import: ', function(){
    var commons = new common();
    var productSummary = new productSummaryScreen();
    var productImport = new productImportScreen();
    var inventorySearch = new inventorySearchScreen();

    
    var importResultsSummary = new importResultsSummaryScreen();

    it('Import Product/SKU - TC0001', function(){

        browser.get(productUrl);

        console.log("navigating to product screen");
        commons.importUpload();
        commons.selecteFileForImport();

        var cwd = process.cwd();
        var fullPath = cwd + "/autoFiles/PSSC_ProductImport.csv";
        commons.clickSelectFile(fullPath);
  
        commons.uploadSelectedFile();

        browser.driver.sleep(5000);
        browser.get(importResultsUrl);

        browser.driver.sleep(5000);

        importResultsSummary.importResultsSearch("Name","Product Import");
        browser.driver.sleep(5000);
        importResultsSummary.importResultsSelectGear("Edit");

        browser.driver.sleep(5000);

        expect(commons.importResultsGetSuccessCount()).toEqual('2');
 
        productImport.productImportConfirm();
        productImport.productImportCreateSKU();
        productImport.productImportSelectCatalog("PSSC Catalog");
        productImport.productImportEnterCategory("General");
        productImport.productImportSelectInventoryPool();
        productImport.productImportEnterATS("12345");
        
        productImport.productImportConfirmDialog();
        browser.driver.sleep(5000);
        browser.refresh();
        expect(commons.importResultsGetSuccessCount()).toEqual('2');
        expect(commons.importResultsGetErrorCount()).toEqual('0');

        browser.get(inventorySearchUrl);
        inventorySearch.enterSite("Fitchburg-DC");
        inventorySearch.addSKU();
        inventorySearch.searchSKU("Name","BGBSarathShared01_BSOR");
        browser.sleep(2000);
        inventorySearch.selectSKU();
        inventorySearch.addProduct();
        browser.sleep(2000);
        inventorySearch.searchInventory();
        browser.sleep(2000);
        expect(inventorySearch.getAvailableQty()).toEqual("12345");

    });


})

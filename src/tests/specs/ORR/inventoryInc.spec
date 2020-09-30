var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Inventory Increment Import  : ', function(){
    var files = new filesScreen();
    var route = new routeScreen();
    var commons = new common();
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuSummary = new skuSummaryScreen();
    var inventorySearch = new inventorySearchScreen();
    
        it('Inventory Increment import  - TC0001', function(){

            browser.get(filesUrl);
            browser.sleep(5000);
            
            files.select("inbound");
            files.select("canonical");
            files.select("inventory");
            files.select("incremental");
            
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/ORR_InventoryDaily_Import.xml";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();
            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(5000);
            commons.searchWithCriteria("Name","contains","Inventory-inventorySyncProcessIncremental");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop"); 
            browser.sleep(5000);
            

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("Beldon-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU","is","TC0001");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('2000');
          //  expect(inventorySearch.getReservedQty()).toMatch("10");
            browser.sleep(2000);


            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("Beldon-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU","is","TC0002a");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('1800');
          //  expect(inventorySearch.getReservedQty()).toMatch("10");
            browser.sleep(2000);

            browser.get(inventorySearchUrl);

            inventorySearch.enterSite("Beldon-DC");
            inventorySearch.addSKU();
            commons.searchWithCriteria("SKU","is","TC0002b");
            browser.sleep(2000);
            inventorySearch.selectSKU();
            inventorySearch.addProduct();
            browser.sleep(2000);
            inventorySearch.searchInventory();
            browser.sleep(2000);
            expect(inventorySearch.getAvailableQty()).toEqual('2000');
           // expect(inventorySearch.getReservedQty()).toMatch("10");
            browser.sleep(2000);
  
        });


})

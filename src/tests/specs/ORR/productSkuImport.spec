var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');

var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');


var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Product/SKU Import  : ', function(){
    var files = new filesScreen();
    var route = new routeScreen();
    var commons = new common();
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuSummary = new skuSummaryScreen();

        it('Create product/sku through import  - TC0001', function(){

            browser.get(filesUrl);
            browser.sleep(5000);
            
            files.select("inbound");
            files.select("canonical");
            files.select("product");
            
            files.addFile();
            var cwd = process.cwd();
            var fullPath = cwd + "/autoFiles/ORR_SkuProduct_Import.xml";
            files.clickSelectFile(fullPath);
            files.uploadFile();
            browser.sleep(2000);
            files.close();
            browser.sleep(2000);

            browser.get(routeUrl);
            browser.sleep(5000);
            commons.searchWithCriteria("Name","contains","ProductSku-productSkuSync");
            browser.sleep(5000);
            route.routeSelectButton("Start");
            browser.sleep(5000);
            commons.refresh();
            route.routeSelectButton("Stop"); 
            browser.sleep(5000);
            
            browser.get(productUrl);
            browser.sleep(2000);
            commons.searchWithCriteria("SKU","is","TC0001");
            commons.multiselect();
            productSummary.productSelectGear("Edit");

            browser.get(productUrl);
            browser.sleep(2000);
            commons.searchWithCriteria("SKU","is","TC0002");
            commons.multiselect();
            productSummary.productSelectGear("Edit");

            browser.sleep(2000);
/*  
            browser.get(skuUrl);
            commons.multiselect();
            commons.searchWithCriteria("Sku","is","TC0001");
            browser.sleep(2000);
            skuSummary.skuSelectGear("Delete");
            browser.sleep(1000);

            browser.get(skuUrl);
            commons.multiselect();
            commons.searchWithCriteria("Sku","is","TC0002a");
            browser.sleep(2000);
            skuSummary.skuSelectGear("Delete");
            browser.sleep(1000);

            browser.get(skuUrl);
            commons.multiselect();
            commons.searchWithCriteria("Sku","is","TC0002b");
            browser.sleep(2000);
            skuSummary.skuSelectGear("Delete");
            browser.sleep(1000);
*/
        });


})

var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuCreateScreen = require(process.cwd() + '/src/tests/screens/sku/sku.create.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Product creation Flow  with SKUs: ', function(){
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var skuCreate = new skuCreateScreen();
    var skuSummary = new skuSummaryScreen();

    
    var commons = new common();
            
        it('Create a product and SKU successfully - TC0001', function(){
            browser.get(productUrl);

            console.log("navigating to product screen"); 
            browser.sleep(5000); 
            productCreate.newProduct();
            productCreate.enterDisplayName("sarathProductTC0001");
            productCreate.enterTitle("sarathProductTC0001");
            productCreate.enterIdType("SKU");
            productCreate.enterId("sarathProductTC0001");
            productCreate.selectOrg(browser.params.orgName);
            productCreate.enterUOM("inches");
            productCreate.enterHeight("1.5");
            productCreate.enterLength("2.5");
            productCreate.enterWidth("3");
            productCreate.uncheckAutocreateSku();
            productCreate.saveProduct();
/*
            productCreate.selectCatalog();
            productCreate.attachCatalog();
            productCreate.enterCatalogId(browser.params.catalog);
            productCreate.enterCategoryName(browser.params.catalogCategoryName);
            productCreate.enterBasePrice("39.99");
            productCreate.enterMSRP("40.99");           
            productCreate.savePopup();
            productCreate.saveProduct();
*/ 
           browser.sleep(2000);

            console.log("navigating to sku screen"); 
            browser.get(skuUrl);
            browser.sleep(5000); 
            skuCreate.newSku();
            skuCreate.enterDisplayName("sarathSKUTC0001");
            skuCreate.enterTitle("sarathSKUTC0001");
            skuCreate.enterProduct("sarathProductTC0001");
            skuCreate.enterId("sarathSKUTC0001");
            skuCreate.enterUOM("inches");
            skuCreate.enterHeight("1.5");
            skuCreate.enterLength("2.5");
            skuCreate.enterWidth("3");
            skuCreate.saveSku();
            skuCreate.selectCatalog();
            skuCreate.attachCatalog();
            skuCreate.enterCatalogId(browser.params.catalog);
            skuCreate.enterCategoryName(browser.params.catalogCategoryName);
            skuCreate.enterBasePrice("39.99");
            skuCreate.enterMSRP("40.99");           
            skuCreate.savePopup();
            skuCreate.saveSku();
            browser.sleep(2000);
 
            
        });

      
        it('Search and Delete product/sku successfully - TC0002', function(){
            browser.get(skuUrl);
            commons.multiselect();
            skuSummary.skuSearch("SKU","sarathSKUTC0001");
            browser.sleep(2000);
            skuSummary.skuSelectGear("Delete");
            browser.sleep(1000);
            
           /* browser.get(productUrl);
            commons.multiselect();
            productSummary.productSearch("SKU","sarathProductTC0001");
            browser.sleep(2000);
            productSummary.productSelectGear("Delete");
            */
        });      

})

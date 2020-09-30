var catalogCreateScreen = require(process.cwd() + '/src/tests/screens/catalog/catalog.create.screen.js');
var catalogSummaryScreen = require(process.cwd() + '/src/tests/screens/catalog/catalog.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Catalog creation Flow  : ', function(){
    var catalogCreate = new catalogCreateScreen();
    var catalogSummary = new catalogSummaryScreen();
    var commons = new common();

        it('Create a catalog successfully - TC0001', function(){
             
            browser.get(catalogUrl);

            console.log("navigating to catalog screen"); 
           
            catalogCreate.newCatalog();
            catalogCreate.enterCatalogName("SarathCatalogTC0001");
            catalogCreate.enterCategoryName("Accessories");
            catalogCreate.addCategory();
            catalogCreate.saveCatalog();
            browser.sleep(2000);
        });

      
        it('Search and Delete Catalog successfully - TC0002', function(){
            browser.get(catalogUrl);
            commons.multiselect();
            catalogSummary.catalogSearch("Name","SarathCatalogTC0001");
            browser.sleep(2000);
            catalogSummary.catalogSelectGear("Delete");
        });      

})

var fileScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Product upload Flow  : ', function(){
    var files = new fileScreen();
     var loginScreen = new loginPage();
     var route = new routeScreen();
         var productSummary = new productSummaryScreen();
         var skuSummary = new skuSummaryScreen();

     var commons = new common();

      it('Product upload to FP - TC0001', function(){


// Login to PDC user to upload product file
       browser.get(browser.baseUrl);
         loginScreen.setUsername(browser.params.login.userPDC);
         loginScreen.setPassword(browser.params.login.passwordPDC);
         loginScreen.login();
         browser.sleep(5000);
         browser.get(productfileuploadUrl);
         files.addFile();
         browser.sleep(4000);
         var cwd = process.cwd();
         var fullPath = cwd + "/autoFiles/FP_Product.json";
         files.clickSelectFile(fullPath);
         files.uploadFile();
         files.close();
         browser.sleep(2000);
         loginScreen.logout();
  // Login to Fleetpride user to run Route for product upload
         browser.get(browser.baseUrl);
                 loginScreen.setUsername(browser.params.login.userFPP);
                 loginScreen.setPassword(browser.params.login.passwordFPP);
                 loginScreen.login();
                  browser.sleep(5000);
                 browser.get(routeUrl);
                 browser.sleep(2000);
            commons.searchWithCriteria("Name","contains","ProductSku-productSkuSyncFP");
                    browser.sleep(2000);
                    route.routeSelectButton("Start");
                    browser.sleep(5000);
                    route.routeSelectButton("Stop");
                    browser.sleep(2000);

// Navigate to Product screen to check whether product uploaded successfully or not and assert based on domain
                browser.get(productUrl);
                commons.multiselect();
                productSummary.productSearch("SKU","PritiAutomation01");
                browser.sleep(2000);
                 productSummary.productSelectGear("Edit");
                 browser.sleep(5000);
                // commons.scrollpageDown();




                commons.expandIntegrationInfo();
                expect(commons.getTextOfDomain('com.fp')).toEqual('com.fp');
                expect(commons.getTextOfDomain('com.fleetpride')).toEqual('com.fleetpride');
                browser.sleep(2000);

// Navigate to SKU screen to check whether product uploaded successfully or not and assert based on domain

                 browser.get(skuUrl);
                 commons.multiselect();
                skuSummary.skuSearch("SKU","PritiAutomation01");
                 browser.sleep(2000);
                 skuSummary.skuSelectGear("Edit");
                 browser.sleep(5000);
                 commons.expandIntegrationInfo();
                expect(commons.getTextOfDomain('com.fp')).toEqual('com.fp');
                expect(commons.getTextOfDomain('com.fleetpride')).toEqual('com.fleetpride');
                browser.sleep(2000);






         });



         })

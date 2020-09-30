var fileScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var inventoryLookUp = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Product upload Flow  : ', function(){
    var files = new fileScreen();
     var loginScreen = new loginPage();
     var route = new routeScreen();

    var inventoryLookUpScreen = new inventoryLookUp();

     var commons = new common();

      it('Inventory upload to FP - TC0001', function(){

    // Login to PDC user to upload inventory file
           browser.get(browser.baseUrl);
              loginScreen.setUsername(browser.params.login.userPDC);
              loginScreen.setPassword(browser.params.login.passwordPDC);
              loginScreen.login();
              browser.sleep(5000);
              browser.get(inventoryfileuploadUrl);
              files.addFile();
              browser.sleep(4000);
              var cwd = process.cwd();
              var fullPath = cwd + "/autoFiles/FP_inventorysingle.json";
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
                 commons.searchWithCriteria("Name","contains","Inventory-syncInventoryPoolEntries");
                         browser.sleep(2000);
                         route.routeSelectButton("Start");
                         browser.sleep(5000);
                         route.routeSelectButton("Stop");
                         browser.sleep(2000);






     // Navigate to inventory look up screen to check inventory for the product.

            browser.get(inventorySearchUrl);
            inventoryLookUpScreen.addSKU();
          inventoryLookUpScreen.searchSKU('SKU','PritiAutomation01');
          inventoryLookUpScreen.selectSKU();
          inventoryLookUpScreen.addProduct();
          inventoryLookUpScreen.searchInventory();
          expect(inventoryLookUpScreen.ATScount()).toEqual('100');
                        loginScreen.logout();


          //Upload inventory file to check updated ATS for Product

          browser.get(browser.baseUrl);
                        loginScreen.setUsername(browser.params.login.userPDC);
                        loginScreen.setPassword(browser.params.login.passwordPDC);
                        loginScreen.login();
                        browser.sleep(5000);
                        browser.get(inventoryfileuploadUrl);
                        files.addFile();
                        browser.sleep(4000);
                        var cwd = process.cwd();
                        var fullPath = cwd + "/autoFiles/FP_inventorysingleupdate.json";
                        files.clickSelectFile(fullPath);
                        files.uploadFile();
                        files.close();
                        browser.sleep(2000);
                        loginScreen.logout();
                browser.get(browser.baseUrl);
                                      loginScreen.setUsername(browser.params.login.userFPP);
                                      loginScreen.setPassword(browser.params.login.passwordFPP);
                                      loginScreen.login();
                                       browser.sleep(5000);
                                      browser.get(routeUrl);
                                      browser.sleep(2000);
                                 commons.searchWithCriteria("Name","contains","Inventory-syncInventoryPoolEntries");
                                         browser.sleep(2000);
                                         route.routeSelectButton("Start");
                                         browser.sleep(5000);
                                         route.routeSelectButton("Stop");
                                         browser.sleep(2000);

                browser.get(inventorySearchUrl);
                            inventoryLookUpScreen.addSKU();
                          inventoryLookUpScreen.searchSKU('SKU','PritiAutomation01');
                          inventoryLookUpScreen.selectSKU();
                          inventoryLookUpScreen.addProduct();
                          inventoryLookUpScreen.searchInventory();
                          expect(inventoryLookUpScreen.ATScount()).toEqual('200');
      });




      })


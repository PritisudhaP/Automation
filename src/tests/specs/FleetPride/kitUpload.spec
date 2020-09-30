var fileScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var skuSummaryScreen = require(process.cwd() + '/src/tests/screens/sku/sku.summary.screen.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Product upload Flow  : ', function(){
    var files = new fileScreen();
     var loginScreen = new loginPage();
     var route = new routeScreen();
         var productSummary = new productSummaryScreen();
         var skuSummary = new skuSummaryScreen();
    var mailbox = new mailboxScreen();

     var commons = new common();

      it('kit upload to FP - TC0001', function(){

// Login to PDC user to upload kit file
     browser.get(browser.baseUrl);
         loginScreen.setUsername(browser.params.login.userPDC);
         loginScreen.setPassword(browser.params.login.passwordPDC);
         loginScreen.login();
         browser.sleep(5000);
         browser.get(productfileuploadUrl);
         files.addFile();
         browser.sleep(4000);
         var cwd = process.cwd();
         var fullPath = cwd + "/autoFiles/FP_multiProduct.json";
         files.clickSelectFile(fullPath);
         files.uploadFile();
         files.close();
         browser.sleep(2000);
         loginScreen.logout();
  // Login to Fleetpride user to run product upload
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




                //login script delete after done----

         /*      browser.get(browser.baseUrl);
                        loginScreen.setUsername(browser.params.login.userFPP);
                        loginScreen.setPassword(browser.params.login.passwordFPP);
                        loginScreen.login();
                         browser.sleep(5000);


  */


                    // Add kits file in mailbox
                    browser.get(mailboxUrl);
                      browser.sleep(5000);
                   element(by.xpath("//en-tabs[@panes='otherTabs']/en-tab[@pane='intermediateboxes']")).click();
                   browser.sleep(1000);
                     mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Bom_Kits-mapped");
                      browser.sleep(3000);

                      mailbox.selectMailbox("Bom_Kits-mapped");

                     browser.sleep(2000);

                      browser.getCurrentUrl().then(function (url) {
                                  var currentUrl = url;
                                  var newMsgUrl = url + "new-message";
                                  browser.get(newMsgUrl);

                              });

                          mailbox.enterTo(browser.params.login.userFPP);
                                      mailbox.enterFrom(browser.params.login.userFPP);
                                      mailbox.enterSubject("TC0001 Kit  upload");
                                      mailbox.addAttachment();
                                      var cwd = process.cwd();
                                      var fullPath = cwd + "/autoFiles/FP_SingleKit.json";

                                      mailbox.clickSelectFile(fullPath);
                                      mailbox.uploadFile();
                                      browser.sleep(2000);
                                      mailbox.close();
                                      browser.sleep(2000);



         // Run route for kits

         browser.get(routeUrl);
                           browser.sleep(2000);
                      commons.searchWithCriteria("Name","contains","Kits-syncKits");
                              browser.sleep(2000);
                              route.routeSelectButton("Start");
                              browser.sleep(5000);
                              route.routeSelectButton("Stop");
                              browser.sleep(2000);


          //Navigate to product screen to check whether the product is kit or not
           browser.get(productUrl);
                          commons.multiselect();
                          productSummary.productSearch("SKU","PritiAutomation02");
                          browser.sleep(6000);
                       //   productSummary.checkKit();
                       //  expect(productSummary.checkKit().getAttribute('icon')).toEqual('check1');
                       expect(productSummary.checkKit().getText()).toEqual('check1');


  });

  })

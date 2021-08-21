var mailboxScreen = require(process.cwd() + '/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/screens/routes/route.summary.screen.js');
var inventorySearchScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');

describe('Inventory Inc/Dec  Flow  : ', function(){
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var inventorySearch = new inventorySearchScreen();

    var commons = new common();


        it('Inventory Inc/Dec - TC0001', function(){


                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","InventoryUpdate-CSV");
                browser.sleep(2000);
                mailbox.selectMailbox("InventoryUpdate-CSV");
                mailbox.selectMailbox("InventoryUpdate-CSV");

                mailbox.refresh();

                browser.getCurrentUrl().then(function (url) {
                    var currentUrl = url;
                    var newMsgUrl = url + "new-message";
                    browser.get(newMsgUrl);
                });

                mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0001 Increment/Decr upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/autoFiles/SCLInventoryIncDec.csv";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(5000);
                mailbox.close();

                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","validateInventoryUpdate");
                commons.searchWithCriteria("Name","contains","validateInventoryUpdate");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","processInventoryUpdate");
                commons.searchWithCriteria("Name","contains","processInventoryUpdate");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);


                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("Joliet-DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","CB");
                commons.searchWithCriteria("SKU","contains","CB");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("-100");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('-40');
                browser.sleep(2000);

                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("Joliet-DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","sarathSCLProduct0001");
                commons.searchWithCriteria("SKU","contains","sarathSCLProduct0001");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("-100");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('60');
                browser.sleep(2000);


                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("Joliet-DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","sarathSCLProduct0002");
                commons.searchWithCriteria("SKU","contains","sarathSCLProduct0002");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("-100");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('-20');
                browser.sleep(2000);


                browser.get(inventorySearchUrl);

                inventorySearch.enterSite("Joliet-DC");
                inventorySearch.addSKU();
//                inventorySearch.searchSKU("Name","DAMAGED-FM");
                commons.searchWithCriteria("SKU","contains","DAMAGED-FM");
                browser.sleep(2000);
                inventorySearch.selectSKU();
                inventorySearch.addProduct();
                browser.sleep(2000);
                inventorySearch.enterQty("-100");
                inventorySearch.searchInventory();
                browser.sleep(2000);
                expect(inventorySearch.getAvailableQty()).toEqual('30');
                browser.sleep(2000);


        });
})

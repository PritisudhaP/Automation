var transferOrderCreateScreen = require(process.cwd() + '/src/tests/screens/transferOrder/transferOrder.create.screen.js');
var transferOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/transferOrder/transferOrder.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('transfer Order Flow  : ', function(){
    var transferOrderCreate = new transferOrderCreateScreen();
    var transferOrderSummary = new transferOrderSummaryScreen();
    var commons = new common();

        it('transfer order that release successfully - TC0001', function(){
             
            browser.get(transferOrderUrl);

            console.log("navigating to transfer order new screen"); 
            browser.sleep(2000);
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            transferOrderCreate.typeSelection(); 

            transferOrderCreate.fromSiteLookup();
            transferOrderCreate.enterSiteName("TOTAL");
            transferOrderCreate.search();
            transferOrderCreate.selectSite();
            transferOrderCreate.useSelectedSite();
            transferOrderCreate.fromPoolSelection("DC-TR - Retail_Ecommerce");

            transferOrderCreate.toSiteLookup();
            transferOrderCreate.enterSiteName("The Sherry Netherland Store");
            transferOrderCreate.search();
            transferOrderCreate.selectSite();
            transferOrderCreate.useSelectedSite();
            transferOrderCreate.toPoolSelection("781 Fifth Avenue-NY-NY");

            transferOrderCreate.saveDraftTO();
            transferOrderCreate.carrierSelection("DHL");
            transferOrderCreate.productLookup();

            transferOrderCreate.enterProductName("ZZSPA226NCHZ");
            transferOrderCreate.searchModalWindow();
            transferOrderCreate.selectProduct();
            transferOrderCreate.addProduct();

            transferOrderCreate.carrierSelection("FEDEX");
            transferOrderCreate.servicetypeSelection("FedEx2Day");


            transferOrderCreate.saveTO(); 

            transferOrderSummary.transferOrderSearch("Status", "DRAFT");
            browser.sleep(2000);
            transferOrderSummary.transferOrderSelectGear("Release");
            browser.sleep(4000);
            browser.get(transferOrderUrl);
            expect(transferOrderSummary.transferOrderStatus()).toEqual('RESERVED');
 
            browser.sleep(60000);
            browser.get(transferOrderUrl);
            browser.sleep(60000);
            transferOrderSummary.refreshScreen(); 
            expect(transferOrderSummary.transferOrderStatus()).toEqual('SHIPPED');

        });


        it('transfer order that partially releases  - TC0002', function(){

            browser.get(transferOrderUrl);

            console.log("navigating to transfer order new screen");
            browser.sleep(2000);
            commons.new();
            browser.driver.sleep(2);
            browser.waitForAngular();

            transferOrderCreate.typeSelection();
            transferOrderCreate.fromSiteLookup();
            transferOrderCreate.enterSiteName("TOTAL");
            transferOrderCreate.search();
            transferOrderCreate.selectSite();
            transferOrderCreate.useSelectedSite();
            transferOrderCreate.fromPoolSelection("DC-TR - Retail_Ecommerce");

            transferOrderCreate.toSiteLookup();
            transferOrderCreate.enterSiteName("The Sherry");
            transferOrderCreate.search();
            transferOrderCreate.selectSite();
            transferOrderCreate.useSelectedSite();
            transferOrderCreate.toPoolSelection("781 Fifth Avenue-NY-NY");

            transferOrderCreate.saveDraftTO();
            transferOrderCreate.carrierSelection("DHL");
            transferOrderCreate.productLookup();

            transferOrderCreate.enterProductName("ZZSPA226NCHZ");
            transferOrderCreate.searchModalWindow();
            transferOrderCreate.selectProduct();

            transferOrderCreate.enterProductName("ZZSPA256NCHZ");
            transferOrderCreate.searchModalWindow();
            transferOrderCreate.selectProduct();


            transferOrderCreate.addProduct();

            transferOrderCreate.carrierSelection("DHL");
            transferOrderCreate.servicetypeSelection("DHLExpress");

            transferOrderCreate.saveTO();

            transferOrderSummary.transferOrderSearch("Status", "DRAFT");
            browser.sleep(2000);
            transferOrderSummary.transferOrderSelectGear("Release");
            browser.sleep(4000);
            browser.get(transferOrderUrl);
            expect(transferOrderSummary.transferOrderStatus()).toEqual('PARTIALLY RELEASED');
        });
})

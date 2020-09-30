var catalogCreateScreen = require(process.cwd() + '/src/tests/screens/catalog/catalog.create.screen.js');
var catalogSummaryScreen = require(process.cwd() + '/src/tests/screens/catalog/catalog.summary.screen.js');
var productCreateScreen = require(process.cwd() + '/src/tests/screens/product/product.create.screen.js');
var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var inventoryPoolCreateScreen = require(process.cwd() + '/src/tests/screens/inventoryPool/inventoryPool.create.screen.js');
var inventoryPoolEditScreen = require(process.cwd() + '/src/tests/screens/inventoryPool/inventoryPool.edit.screen.js');
var inventoryPoolSummaryScreen = require(process.cwd() + '/src/tests/screens/inventoryPool/inventoryPool.summary.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var channelsCreateScreen = require(process.cwd() + '/src/tests/screens/channels/channels.create.screen.js');
var channelsSummaryScreen = require(process.cwd() + '/src/tests/screens/channels/channels.summary.screen.js');
var siteCreateScreen = require(process.cwd() + '/src/tests/screens/sites/sites.create.screen.js');
var siteSummaryScreen = require(process.cwd() + '/src/tests/screens/sites/sites.summary.screen.js');
var sitegroupEditScreen = require(process.cwd() + '/src/tests/screens/sitegroups/sitegroups.edit.screen.js');
var sitegroupSummaryScreen = require(process.cwd() + '/src/tests/screens/sitegroups/sitegroups.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="";

describe('E2E Flow  : ', function(){
    var catalogCreate = new catalogCreateScreen();
    var catalogSummary = new catalogSummaryScreen();
    var productCreate = new productCreateScreen();
    var productSummary = new productSummaryScreen();
    var inventoryPoolCreate = new inventoryPoolCreateScreen();
    var inventoryPoolEdit = new inventoryPoolEditScreen();
    var inventoryPoolSummary = new inventoryPoolSummaryScreen();
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var channelsCreate = new channelsCreateScreen();
    var channelsSummary = new channelsSummaryScreen();
    var siteCreate = new siteCreateScreen();
    var siteSummary = new siteSummaryScreen();
    var sitegroupEdit = new sitegroupEditScreen();
    var sitegroupSummary = new sitegroupSummaryScreen();
    var commons = new common();


    it('Create a  new Catalog, add a new Product to the catalog, add the product to inventory pool, create Sales Order for this new product - E2E0001', function(){
            
            browser.get(catalogUrl);
            catalogCreate.newCatalog();
            catalogCreate.enterCatalogName("SarathCatalogE2E0001");
            catalogCreate.enterCategoryName("Accessories");
            catalogCreate.addCategory();
            catalogCreate.saveCatalog();

            browser.get(productUrl);
            productCreate.newProduct();
//            productCreate.enterRefName("sarathProductE2E0009");
            productCreate.enterDisplayName("sarathProductE2E0009");
            productCreate.enterIdType("SKU");
            productCreate.enterId("sarathProductE2E0009");
            productCreate.enterUOM("inches");
            productCreate.enterHeight("1.5");
            productCreate.enterLength("2.5");
            productCreate.enterWidth("3");
            productCreate.saveProduct();
            productCreate.selectCatalog();
            productCreate.attachCatalog();
            productCreate.enterCatalogId("SarathCatalogE2E0001");
            productCreate.enterCategoryName("Accessories");
            productCreate.enterBasePrice("39.99");
            productCreate.enterMSRP("40.99");
            productCreate.savePopup();
            productCreate.saveProduct();

            browser.get(channelsUrl);
            channelsCreate.newChannel();
            channelsCreate.enterDisplayName("SarathChannelE2E0001");
            channelsCreate.enterOrg("GhurkaOrganization");
            channelsCreate.enterMaxSplit("-1");
            channelsCreate.enterCatalog("SarathCatalogE2E0001");
            channelsCreate.setPartialRelease("Y");
            channelsCreate.saveChannel();

            browser.get(siteUrl);
            siteCreate.newSite();
            siteCreate.enterDisplayName("SarathSiteE2E0001");
            siteCreate.enterAddress1("78 1st street");
            siteCreate.enterCity("Temple");
            siteCreate.enterState("FL");
            siteCreate.enterZipcode("33128");
            siteCreate.enterPhone("111-111-1111");
            siteCreate.enterMailboxName("sarathTemp");
            siteCreate.enterSiteType("Store");
            siteCreate.enterCatalog("SarathCatalogE2E0001");
            siteCreate.enterOrganization("GhurkaOrganization");
            siteCreate.saveSite();

            browser.sleep(4000);
            browser.get(sitegroupUrl);
            commons.multiselect();
            sitegroupSummary.sitegroupSearch("Name","Stores");
            browser.sleep(2000);
            sitegroupSummary.sitegroupSelectGear("Edit");
            
            sitegroupEdit.chooseSites();
            sitegroupEdit.searchSitesForSelection("SarathSiteE2E0001");
            commons.search();
            sitegroupEdit.selectSite();
            sitegroupEdit.saveSelectedSite();
            sitegroupEdit.saveSiteGroup();

            browser.get(inventoryPoolUrl);
            inventoryPoolCreate.newPool();
            inventoryPoolCreate.enterPoolName("SarathPoolE2E0001");
            inventoryPoolCreate.enterCatalog("SarathCatalogE2E0001");
            inventoryPoolCreate.chooseChannel();
            inventoryPoolCreate.searchChannels("SarathChannelE2E0001");
            inventoryPoolCreate.searchChannel();
            inventoryPoolCreate.selectChannel();
            inventoryPoolCreate.saveSelectedChannel();            
            //inventoryPoolCreate.enterChannel("SarathChannelE2E0001");
            inventoryPoolCreate.enterSiteId("SarathSiteE2E0001");
            inventoryPoolCreate.enterType("NEW");
            inventoryPoolEdit.saveInventoryPool();

            browser.sleep(5000);
            browser.get(inventoryPoolUrl);
            commons.multiselect();
            inventoryPoolSummary.inventoryPoolSearch("Name","SarathPoolE2E0001");
            browser.sleep(2000);
            inventoryPoolSummary.inventoryPoolSelectGear("Edit");
            //inventoryPoolCreate.enterChannel("SarathChannelE2E0001");
            inventoryPoolEdit.newProduct();
            inventoryPoolEdit.selectProduct("sarathProductE2E0009");
            inventoryPoolEdit.enterAvailableQty("100");
            inventoryPoolEdit.enterReservedQty("0");
            inventoryPoolEdit.enterUnAvailableQty("0");
            inventoryPoolEdit.enterThresholdQty("2");
            inventoryPoolEdit.saveProduct();
            //inventoryPoolEdit.setChannel("SarathChannelE2E0001");
            browser.sleep(10000);
            inventoryPoolEdit.saveInventoryPool();
            browser.sleep(4000);
            browser.get(salesOrderUrl);  
            commons.new();
            browser.driver.sleep(2);
            browser.waitForAngular();


            salesOrderCreate.setSalesChannel("SarathChannelE2E0001");

            commons.customerLookup();

            salesOrderCreate.searchCustomer("Email","sbnew2@test.com");
            //commons.search();
            browser.sleep(2000);
            salesOrderCreate.selectCustomer();
            salesOrderCreate.useSelectedCustomer();

            salesOrderCreate.setRefNumber("E2E0001");
            salesOrderCreate.setBillingCode("E2EBC0001");

            salesOrderCreate.selectShipIt();

            salesOrderCreate.addItem();
            salesOrderCreate.searchProduct("sarathProductE2E0009");
            salesOrderCreate.searchInPopup();
            salesOrderCreate.selectSKU();
            salesOrderCreate.addProduct();

            salesOrderCreate.setCarrier("FEDEX");
            salesOrderCreate.setService("FedEx2Day");

            commons.save();

            browser.sleep(5000);
            browser.get(salesOrderUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", "E2E0001");

            salesOrderSummary.salesOrderNumber().then(function(value) {
                SONumber = value;
            });


            salesOrderSummary.salesOrderSelectGear("Release");
            salesOrderSummary.salesOrderSearchRemove("1");
            expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');

            browser.sleep(60000);
          
            
            browser.wait(function() {
                return SONumber != '';
            }).then(function() {
                browser.get(shipmentRequestsUrl);
                browser.sleep(60000);
                console.log(SONumber);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                shipmentRequestsCreate.acknowledgeLineItem("1");
                shipmentRequestsCreate.confirmAcknowledgement();
                browser.sleep(5000);
                shipmentRequestsCreate.createShipment();
                shipmentRequestsCreate.packageSelection("S2");
                shipmentRequestsCreate.enterItemQty("1");
                shipmentRequestsCreate.addPackageToShipment();
                shipmentRequestsCreate.finalizeShipment();
                browser.sleep(5000);
                browser.get(shipmentRequestsUrl);
                shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
                expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('SHIPMENT CREATED');
             });

        });


        it(' Test - E2E0002', function(){

            browser.get(inventoryPoolUrl);
            commons.multiselect();
            inventoryPoolSummary.inventoryPoolSearch("Name","SarathPoolE2E0001");
            browser.sleep(2000);
            inventoryPoolSummary.inventoryPoolSelectGear("Delete");

            browser.get(siteUrl);
            commons.multiselect();
            siteSummary.siteSearch("Name","SarathSiteE2E0001");
            browser.sleep(2000);
            siteSummary.siteSelectGear("Delete");

            browser.get(channelsUrl);
            channelsSummary.channelsSearch("Name","SarathChannelE2E0001");
            browser.sleep(2000);
            channelsSummary.channelsSelectGear("Delete");


            browser.get(productUrl);
            commons.multiselect();
            productSummary.productSearch("SKU","sarathProductE2E0009");
            browser.sleep(2000);
            productSummary.productSelectGear("Delete");

            browser.get(catalogUrl);
            commons.multiselect();
            catalogSummary.catalogSearch("Name","SarathCatalogE2E0001");
            browser.sleep(2000);
            catalogSummary.catalogSelectGear("Delete"); 
            

        });

})

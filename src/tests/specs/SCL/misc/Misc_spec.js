const { browser } = require("protractor");

var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var scriptSummaryScreen = require(process.cwd() + '/screens/scripts/script.summary.screen.js');
var inventorySearchSummaryScreen = require(process.cwd() + '/screens/inventorySearch/inventorySearch.summary.screen.js');
var channelssummaryscreen = require(process.cwd() + '/screens/channels/channels.summary.screen.js');
var shipmentRequestcreatescreen = require(process.cwd() + '/screens/shipmentRequests/shipmentRequests.create.screen.js');
var productcreatescreen = require(process.cwd() + '/screens/product/product.create.screen.js');
var inventoryPoolsummaryScreen = require(process.cwd() + '/screens/inventoryPool/inventoryPool.summary.screen.js');
var inventoryPooleditscreen = require(process.cwd() + '/screens/inventoryPool/inventoryPool.edit.screen.js');
var customerscreatescreen = require(process.cwd() + '/screens/customers/customers.create.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
var loginPage = require(process.cwd() + '/screens/login/login.screen.js');

var moment = require('moment-timezone');
    var NowMoment = moment();
    //sku generation
 var SkuGen = "MISC" + NowMoment.format('DDHHmmss');

    // Customer generation 
    var CustomerGen ="MC"+NowMoment.format('DDHHmmss');
describe('MISC Scenarios', function () {
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrdersummaryscreen();
    var inventorySearchScreen = new inventorySearchSummaryScreen();
    var channelSummary = new channelssummaryscreen();
    var shipmentRequestcreate = new shipmentRequestcreatescreen();
    var productcreate = new productcreatescreen();
    var inventoryPoolsummary = new inventoryPoolsummaryScreen();
    var inventoryPooledit = new inventoryPooleditscreen();
    var customerscreate = new customerscreatescreen();
    var commons = new common();

    it('Misc_1:Validate Expiry data for the SkU', function () {
        browser.get(inventorySearchUrl);
        inventorySearchScreen.addSKU();
        inventorySearchScreen.searchtext("14Shelf");
        browser.sleep(2000);
        inventorySearchScreen.selectSKU();
        inventorySearchScreen.addProduct();
        inventorySearchScreen.searchInventory();
        inventorySearchScreen.clickOnSku();
        inventorySearchScreen.validateExpirydate("OCT 10, 2020");
    })

    it('Misc_2:Enable the Channel settings to limit sales order qty entry to ATS', function () {
        browser.get(channelsUrl);
        channelSummary.searchChannel("B2B");
        browser.sleep(2000);
        channelSummary.clickOnChannel("B2B");
        channelSummary.clickOnlimitOrderqty();
        browser.sleep(2000);
        channelSummary.save();
        browser.get(salesOrderNewUrl);
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        browser.sleep(2000);
        salesOrderCreate.verifyATScolumn();
        browser.sleep(1000);
        browser.get(channelsUrl);
        channelSummary.searchChannel("B2B");
        browser.sleep(2000);
        channelSummary.clickOnChannel("B2B");
        channelSummary.clickOnlimitOrderqty();
        browser.sleep(2000);
        channelSummary.save();
        browser.get(salesOrderNewUrl);
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        browser.sleep(2000);
        salesOrderCreate.verifyATScolumn();
    })

    it('Misc_3:Create a Sales order and release it successfully (Ship Full Order: False)', function () {
        browser.get(salesOrderNewUrl);
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("MISCPROD01");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
    })

    it('Misc_4:Create a Sales order which on release goes to FTA (Failed To Allocate))', function () {
        browser.get(salesOrderNewUrl);
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("SKUZERO1");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        salesOrderSummary.clickonCancelbtn();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("FAILED TO ALLOCATE");
    })

    it('Misc_5:Create a Sales order which on release goes to Partially released', function () {
        browser.get(salesOrderNewUrl);
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("SKUZERO1");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("MISCPROD01");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("PARTIALLY RELEASED");
    })

    it('Misc_6:Create a Sales order with “Ship Full Order? = True', function () {
        browser.get(salesOrderNewUrl);
        salesOrderCreate.setSalesChannel("B2C");
        salesOrderCreate.clickonShipfullOrder();
        salesOrderCreate.attachCustomer();
        salesOrderCreate.customerSearch("MISC 01");
        browser.sleep(2000);
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("SKUZERO1");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.addItem();
        salesOrderCreate.searchProduct("MISCPROD01");
        browser.sleep(1000);
        salesOrderCreate.ClickonSKUcheckbox();
        salesOrderCreate.addProduct();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        salesOrderSummary.clickonCancelbtn();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("FAILED TO ALLOCATE");
    })
    it('Misc_7:Create shipment for released orders through UI', function () {
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("MISCPROD01");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.clickOnShipmentTab();
        shipmentRequestcreate.clickonAccept();
        shipmentRequestcreate.confirmAcknowledgement();
        shipmentRequestcreate.createShipment();
        shipmentRequestcreate.doNotGenerateLabel("Check");
        shipmentRequestcreate.packageSelection("Default");
        shipmentRequestcreate.enterTrackingNbr("test10");
        shipmentRequestcreate.enterItemQty(1);
        shipmentRequestcreate.addPackageToShipment();
        shipmentRequestcreate.finalizeShipment();
        browser.sleep(2000);
        shipmentRequestcreate.clickOnOrder();
        salesOrderSummary.verifyorderStatus("SHIPPED");
    })

    it('Misc_9:Create new Product/SKU through UI. Update inventory for them. Use them in a new sales order', function () {
        browser.get(productUrl);
        productcreate.newProduct();
        productcreate.enterTitle(SkuGen);
        productcreate.enterDisplayName(SkuGen);
        productcreate.enterId(SkuGen);
        productcreate.enterIdType("SKU");
        productcreate.selectOrg("TheHonestKitchen-Organization-");
        productcreate.enterLength(10);
        productcreate.enterWidth(10);
        productcreate.enterHeight(10);
        productcreate.enterweight(100);
        productcreate.saveProduct();
        productcreate.clickonTab("Skus");
        productcreate.clickonproduct();
        productcreate.selectCatalog();
        productcreate.attachCatalog();
        productcreate.enterCatalogId("THKCatalog");
        productcreate.enterCategoryName("General");
        productcreate.savePopup();
        productcreate.saveProduct();
        browser.sleep(5000);
        browser.get(inventoryPoolUrl);
        inventoryPoolsummary.searchPool("Joliet-DC");
        browser.sleep(2000);
        inventoryPoolsummary.clickOnPool();
        inventoryPooledit.clickOnAttachsku();
        inventoryPooledit.filter(SkuGen);
        browser.sleep(2000);
        inventoryPooledit.selectProduct();
        inventoryPooledit.enterQty(10);
        inventoryPooledit.clickOnAddsku();
        inventoryPooledit.saveInventoryPool();
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("MISC 01")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter(SkuGen);
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
    })

    it('Misc_11:Create a new customer and use in a new sales order',function(){
        browser.get(callcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.clickonCreateCustomer();
        customerscreate.enterDisplayName(CustomerGen);
        customerscreate.enterCompanyName(CustomerGen);
        customerscreate.generateCustomerNumber();
        customerscreate.enterFirstName("Misc");
        customerscreate.enterLastName("Test");
        salesOrderCreate.clickonaddAddressplus();
        browser.sleep(2000);
        customerscreate.selectShippingAddress();
        customerscreate.selectBillingAddress();
        customerscreate.selectContactAddress();
        customerscreate.enterAddress1("test");
        customerscreate.enterCity("Atlanta");
        customerscreate.enterState("GA");
        customerscreate.enterZip5("30305");
        customerscreate.saveAddress();
        salesOrderCreate.clickonAdvancesettings();
        customerscreate.enterCustomerStatus("ACTIVE");
        customerscreate.enterPriority(1);
        salesOrderCreate.clickonCreatebtn();
        salesOrderCreate.searchProductofcallcenter("MISCPROD01");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");   
    })
})
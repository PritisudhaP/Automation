const { browser } = require("protractor");

var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrdersummaryscreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');
var storePortalV2Screen = require(process.cwd() + '/screens/storePortalV2/storePortalBopis.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
var loginPage = require(process.cwd() + '/screens/login/login.screen.js');

/*OrderNbr*/
global.SONumber = "";

describe('Package Recommendation scenarios', function () {

    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrdersummaryscreen();
    var commons = new common();
    var storePortalV2 = new storePortalV2Screen();
    var loginScreen = new loginPage();
    var CallcentersalesorderUrl = callcentersalesorderUrl.replace("project0", "project4");
    var StorePortalV2Url = storePortalV2Url.replace("project0", "project4");

    

    it('Scenario 01: Package recommendation based on dimensions (height)', function () {
        browser.get(CallcentersalesorderUrl);
        loginScreen.setUsername(browser.params.login.user);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM07");
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
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.qtyPick();
        storePortalV2.validatePackageRecommended("bigPack");  
    })

    it('Scenario 02: when none of the package recommendations meet the criteria', function () {
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM04");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.searchProductofcallcenter("2896DIM02");
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
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.pickAllQty();
        browser.sleep(2000);
        storePortalV2.validateWarningMsg();
        storePortalV2.validatePackageRecommended("RECTANGULAR");
    })

    it('Scenario 03:Multi SKU’s & qty with different dimensions', function () {
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM02");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.searchProductofcallcenter("2896DIM05");
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
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.pickAllQty();
        storePortalV2.validatePackageRecommended("BOPIS");
    })

    it('Scenario 04:Package recommendation based on Width', function () {
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM02");
        salesOrderCreate.selectSKU();
        browser.sleep(2000);
        salesOrderCreate.search();
        salesOrderCreate.selecttheProduct();
        salesOrderCreate.addTOorder();
        salesOrderCreate.increaseQty();
        salesOrderCreate.saveOption("Save");
        salesOrderSummary.EditGear();
        salesOrderSummary.printOrderNbr();
        salesOrderSummary.clickonRelease();
        browser.sleep(2000);
        salesOrderSummary.verifyorderStatus("RELEASED");
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.qtyPick();
        storePortalV2.validatePackageRecommended("5cm");
        storePortalV2.pickAgain();
        storePortalV2.validatePackageRecommended("TestBox2");
    })

    it('Scenario 05:Package recommendation based on weight', function () {
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM04");
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
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.qtyPick();
        storePortalV2.validatePackageRecommended("BOPIS");
    })

    it('Scenario 06:Recommend next bigger package considering all dimensions & volume', function () {
        browser.get(CallcentersalesorderUrl);
        commons.new();
        salesOrderCreate.callcenterAttachCustomer();
        salesOrderCreate.callcenterSearchCustomer("Wendy")
        salesOrderCreate.selectCustomer();
        salesOrderCreate.useSelectedCustomer();
        salesOrderCreate.searchProductofcallcenter("2896DIM06");
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
        salesOrderSummary.salesOrderNbr().then(function (value) {
            SONumber = value;
            console.log(SONumber);
        });
        browser.get(StorePortalV2Url);
        browser.wait(function () {
            return SONumber != '';
        }).then(function () {
            storePortalV2.OrderNumberSearch("Original Order #", SONumber);
        });
        storePortalV2.clickOnStatustext();
        storePortalV2.acceptOrderConfirm();
        storePortalV2.clickOnPacknShip();
        storePortalV2.qtyPick();
        storePortalV2.validatePackageRecommended("Pack2");
    })
})
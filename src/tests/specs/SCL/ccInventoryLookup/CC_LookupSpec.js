const { browser } = require("protractor")

var callCenterInventoryLookUpScreen = require(process.cwd() + '/screens/callCenter/callCenterInventoryLookup.screen.js');

var ccInventoryLookup = new callCenterInventoryLookUpScreen();


var data = require('../autoFiles/ccInventorydata.json');

describe("CC Inventory Lookup Screen", function () {


 
 it("SC 01:Validate radial buttons and B2B Customer search Drop down", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.validateLandingpage();
    })

 it("SC 02:Validate Header level pricing mapped with retail price of sku", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.searchSku(data.SKU[1]);
        ccInventoryLookup.validateHeaderPricing(data.SKU.RetailPrice,data.B2BCustomer)
    })

 it("SC 03:Validate Catalog price for customer level", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.searchSku(data.SKU[1]);
        ccInventoryLookup.customerLevelPricing(data.SKU.CatalogPrice,data.B2BCustomer)
    })

 it("SC 04:Validate Customer Catalog doesn't match with catalog price", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.searchSku(data.SKU[2]);
        ccInventoryLookup.customerLevelPricing(data.SKU["2RetailPrice"],data.B2BCustomer)
    })

 it("SC 05:Customer selection is empty", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.searchSku(data.SKU[1])
        ccInventoryLookup.clickonButton(data.Button[1]);
        ccInventoryLookup.clickonRadialButton(data.Button[4]);
        ccInventoryLookup.validateAlertMessage(data.AlertMessage);
    })

 it("SC 07:Validate Clear Search work for B2B Customer", function () {
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.searchSku(data.SKU[1]);
        ccInventoryLookup.applyFilters(data.Button[1], data.Button[2],data.B2BCustomer);
    })

 it("SC 08:Validate no popup is displayed",function(){
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.validateNoAlertMessage(data.B2BCustomer);
    })

  it("SC 09:Validate Clear Search work for B2B Customer without SKU selection", function(){
        browser.get(callCenterInventoryLookupURL);
        ccInventoryLookup.validateClearFilter(data.Button[2],data.B2BCustomer);
    })   

})
var taxAgencyCreateScreen = require(process.cwd() + '/screens/tax/taxAgency.create.screen.js');
var taxAgencySummaryScreen = require(process.cwd() + '/screens/tax/taxAgency.summary.screen.js');
var taxCodeCreateScreen = require(process.cwd() + '/screens/tax/taxCode.create.screen.js');
var taxCodeSummaryScreen = require(process.cwd() + '/screens/tax/taxCode.summary.screen.js');
var taxLocationCreateScreen = require(process.cwd() + '/screens/tax/taxLocation.create.screen.js');
var taxLocationSummaryScreen = require(process.cwd() + '/screens/tax/taxLocation.summary.screen.js');
var taxRateCreateScreen = require(process.cwd() + '/screens/tax/taxRate.create.screen.js');
var taxRateSummaryScreen = require(process.cwd() + '/screens/tax/taxRate.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');

describe('Tax settings - CRUD operations  : ', function(){
    var taxAgencyCreate = new taxAgencyCreateScreen();
    var taxAgencySummary = new taxAgencySummaryScreen();
    var taxCodeCreate = new taxCodeCreateScreen();
    var taxCodeSummary = new taxCodeSummaryScreen();
    var taxLocationCreate = new taxLocationCreateScreen();
    var taxLocationSummary = new taxLocationSummaryScreen();
    var taxRateCreate = new taxRateCreateScreen();
    var taxRateSummary = new taxRateSummaryScreen();
    var commons = new common();

    it('Create, Delete tax settings successfully - TC0001', function(){

        browser.get(taxAgencySettingsUrl);
        browser.sleep(2000);
        taxAgencyCreate.newAgency();
        taxAgencyCreate.enterName("TC0001_Agency");
        taxAgencyCreate.enterPhone("3125554321");
        taxAgencyCreate.enterEmail("sbabu@test.com");
        taxAgencyCreate.enterCountry("United States");
        taxAgencyCreate.enterAddress1("300 NW 26th Street");
        taxAgencyCreate.enterAddress2("#4");
        taxAgencyCreate.enterCity("Atlanta");
        taxAgencyCreate.enterState("GA");
        taxAgencyCreate.enterZip5("33127");
        taxAgencyCreate.saveAgency();
        browser.sleep(2000);

        browser.get(taxCodeSettingsUrl);
        browser.sleep(2000);
        taxCodeCreate.newCode();
        taxCodeCreate.enterName("TC0001_CLTH_GEN");
        taxCodeCreate.enterDesc("Testing code creation");
        taxCodeCreate.enterCode("TC0001_CLTH_GEN");
        taxCodeCreate.saveCode();
        browser.sleep(2000);

        browser.get(taxLocationSettingsUrl);
        browser.sleep(2000);
        taxLocationCreate.newLocation();
        taxLocationCreate.enterName("TC0001_Miami, FL");
        taxLocationCreate.enterDesc("(USA) - 33185 - 33193");
        taxLocationCreate.enterAreaType("STATE");
        browser.sleep(2000);
        taxLocationCreate.enterState("FL");
        taxLocationCreate.selectTaxCode("TC0001");
        commons.moveSelected();
        taxLocationCreate.saveLocation();
        browser.sleep(2000);

        browser.get(taxRateSettingsUrl);
        browser.sleep(2000);
        taxRateCreate.newRate();
        taxRateCreate.enterName("TC0001_FL_TaxRate");
        taxRateCreate.enterRate("0.075");
        taxRateCreate.enterArea("TC0001_Miami, FL");
        taxRateCreate.enterAgency("TC0001_Agency");
        taxRateCreate.enterCode("TC0001_CLTH_GEN");
        taxRateCreate.saveRate();
        browser.sleep(2000);

    	browser.get(taxRateSettingsUrl);
        browser.sleep(2000);
        taxRateSummary.rateSearch("Name", "TC0001_FL_TaxRate");
        browser.sleep(2000);
        taxRateSummary.rateSelectGear("Remove Tax Rate");


        browser.get(taxLocationSettingsUrl);
        browser.sleep(2000);
        taxLocationSummary.locationSearch("Location", "TC0001_Miami");
        browser.sleep(2000);
        taxLocationSummary.locationSelectGear("Remove Tax Location");


        browser.get(taxCodeSettingsUrl);
        browser.sleep(2000);
        taxCodeSummary.codeSearch("Name", "TC0001_CLTH_GEN");
        browser.sleep(2000);x
        taxCodeSummary.codeSelectGear("Remove Tax Code");

        browser.get(taxAgencySettingsUrl);
        browser.sleep(2000);
        taxAgencySummary.agencySearch("Name", "TC0001_Agency");
        browser.sleep(2000);
        taxAgencySummary.agencySelectGear("Remove Agency");

    });



})

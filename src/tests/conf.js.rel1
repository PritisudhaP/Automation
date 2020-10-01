var jasmineReporters = require('jasmine-reporters');
//var HTMLReport = require('protractor-html-reporter');

exports.config = {
   directConnect: true,
   framework: 'jasmine',


//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/RVDP00108_multipleCustomerSpec.js'],

//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/multiShipmentsSpec.js'],

// specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/RVDP00102_createVerifyRMASLSpec.js'],

 //specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/Generic/returnsVDP/RVDP00103_verifyTaxDiscountSpec.js'],
//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/RVDP00107_validationErrorRMASpec.js'],

//specs:['./specs/Generic/returnsVDP/RVDP00100_loginSpec.js'],
//,'./specs/Generic/returnsVDP/RVDP00104_createVerifyRMAMLSpec.js'],
 //specs:['./specs/returnsVDP/RVDP00100_loginSpec.js'],
// specs:['./specs/returnsVDP/*.js'],
 //,'./specs/returnsVDP 2/RVDP00104_createVerifyRMAMLSpec.js','./specs/returnsVDP 2/RVDP00107_validationErrorRMASpec.js','./specs/returnsVDP 2/RVDP00103_verifyTaxDiscountSpec.js','./specs/returnsVDP 2/RVDP00108_multipleCustomerSpec.js','./specs/returnsVDP 2/RVDP00102_createVerifyRMASLSpec.js'],
 //specs:['./specs/returnsVDP 2/RVDP00100_loginSpec.js','./specs/returnsVDP 2/RVDP00103_verifyTaxDiscountSpec.js'],

 //@@@
 //specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/storePortal/SP00101_accFullPickPartialMLSpec.js'],
 //specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/storePortal/SP00102_accFullPickPartialSLSpec.js'],
//specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/storePortal/SP00103_accPartialpickPartialMLSpec.js'],
//specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/storePortal/SP00104_accPartialPickPartialSLSpec.js'],
//specs:['./specs/StorePortal/SP00106_pickPartialMLSpec.js'],

//specs:['./specs/Stspecs:['./specs/storePortal/SP00113_vendorPortalSpec.js'],orePortal/SP00111_hideAcceptPartialSpec.js'],
//specs:['./specs/StorePortal/SP00109_acceptRejectEnabledSpec.js'],
//specs:['./specs/StorePortal/SP00110_printAllDocsEnabledSpec.js'],

//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/multiShipmentsSpec.js'],
//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/tttSpec.js'],

//specs:['./specs/returnsVDP/RVDP00100_loginSpec.js','./specs/returnsVDP/RVDP00104_createVerifyRMAMLSpec.js'],

//specs:['./specs/StorePortal/SP00108_removePkgSpec.js'],
//specs:['./specs/StorePortal/SP00112_storePortalUserFlowSpec.js'],
//specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/StorePortal/SP00104_accPartialPickPartialSLSpec.js'],
//specs:['./specs/storePortal/SP00113_vendorPortalSpec.js'],

//specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/storePortal/SP00102_accFullPickPartialSLSpec.js'],

//specs:['./specs/qatest/test19.js'],
//@@@@@@@@@@@@@
//specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/prad/pickupAtStoreE2E2Spec.js'],

//@@@@@@@@@@@@@
//specs/storePortal/SP00113_vendorPortalSpec.js','./specs/storePortal/SP00114_vendorPortalMultipleShipmentsSpec.js'],
    //baseUrl: 'https://release1-qa.enspirecommerce.com/oms/dist/#/',

specs:['./specs/StorePortal/SP00100_loginSpec.js','./specs/orderStatusCheck/orderStatusAccept.js'],

baseUrl: 'https://release0-qa.enspirecommerce.com/oms/dist/#/',
    getPageTimeout: 1280000,

    //--
    params: {
            login: {
             //loginUser: 'sbabu@pssc.com',
             loginUser: 'bchennoji@thk.com',
              password: 'Mypassword@123',
              storePortalSpecificUser:'storeportal@pssc.com',
              storePortalUser:'qauser@thk.com',
              storePortalPassword: 'mypassword',
            },

                     searchValueSKU1:'BC_TESTQA001',
                        //searchValueSKU1:'testSiteN1N2',
                   //searchValueSKU1:'7-0-8',
                   // searchValueSKU2:'0000000013',
                    //searchValueSKU3:'LAASX2',
                    //searchValueSKU4:'M-PT',
                    customerCriteria:'Name',
                    //customerSearchValue:'MUSICA',
                    customerSearchValue:'WENDY ZIESEMANN',
                    //customerSearchValue2:'professional',
                    channelName1:'B2B',
                    channelName2:'Full Service',
                    promisedDate:'05/31/2019',
                    siteName:'sandiego-dc',
                    siteNumber:'1',
                    zipcode:'92120',
                    reservationStatus:'UNCONSUMED',
                    custDisplayName:'CallCenterTestCust1',
                    custFirstName:'CallCenter',
                    custLastName:'TestCust1',
                    custAddress1:'24 Green St',
                    custCity:'San Jose',
                    custAddressState:'CA',
                    custZipcode5:'95129',
                    refNameCartId:'cartId',
                    cartIdValue:'C@rT123',
                    incorrectCartId:'Car/T1 23',
                    promoCodeValue:'TEST01',
                    textNote:'Testing Note',
                    noteType:'Informational',

                    catalog: 'PSSC Catalog',
                    orgName: 'PublishersStorageAndShipping-Organization-',
                    carrier: 'FEDEX',
                    serviceType: 'FedEx 2Day',
                    dataDomain: 'com.pssc'
        },

    onPrepare: function(){
        browser.driver.manage().window().setPosition(0,0);
        browser.driver.manage().window().setSize(1440,900);

        browser.driver.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/',
            filePrefix: 'xmlresults'
        }));

        global.blobstoreUrl = browser.baseUrl + 'settings/data-management/datastore/';
        global.mailboxUrl = browser.baseUrl + 'data-management/communications/mailboxes/';
        global.capabilitiesUrl = browser.baseUrl + 'settings/accounts/capabilities/';
        global.catalogUrl = browser.baseUrl + 'inventory/catalogs/';
        global.channelsUrl = browser.baseUrl + 'settings/company/channels/';
        global.contactsUrl = browser.baseUrl + 'settings/organizations/contacts/';
        global.orgUrl = browser.baseUrl + 'settings/organizations/organizations/';
        global.productUrl = browser.baseUrl + 'inventory/products/';
        global.inventoryPoolUrl = browser.baseUrl + 'inventory/pools/';
        global.siteUrl = browser.baseUrl + 'sites/';
        global.sitegroupUrl = browser.baseUrl + 'sites/groups/';
        global.shipmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
        global.shipmentsUrl = browser.baseUrl + 'fulfillment/shipments/';
        global.filesUrl = browser.baseUrl + 'data-management/communications/files/';
        global.functionaldomainsUrl = browser.baseUrl + 'settings/accounts/functional-domains/';
        global.importUrl = browser.baseUrl + 'settings/data-management/import/';
        global.purchaseOrderUrl = browser.baseUrl + 'orders/purchase/list';
        global.triggerUrl = browser.baseUrl + 'integration/triggers/';
        global.purgeUrl = browser.baseUrl + 'settings/data-management/purge/';
        global.salesOrderUrl = browser.baseUrl + 'orders/sales/list';
        global.salesOrderNewUrl = browser.baseUrl + 'orders/sales/new-1';
        global.sftpUrl = browser.baseUrl + 'settings/integration/sftp-users/';
        global.taskUrl = browser.baseUrl + 'tasks/tasks/';
        global.transferOrderUrl = browser.baseUrl + 'orders/transfers/';
        global.transferOrderNewUrl = browser.baseUrl + 'orders/transfers/new';
        global.usergroupUrl = browser.baseUrl + 'settings/accounts/user-groups/';
        global.userroleUrl = browser.baseUrl + 'settings/accounts/roles/';
        global.usersUrl = browser.baseUrl + 'settings/accounts/users/';
        global.domainPolicyUrl= browser.baseUrl + 'settings/accounts/domain-policies/';
        global.webhooksUrl = browser.baseUrl + 'integration/webhooks/';
        global.returnsUrl = browser.baseUrl + 'orders/returns/';
        global.communicationsUrl = browser.baseUrl + 'settings/integration/communication-configurations/';
        global.taxAgencySettingsUrl = browser.baseUrl + 'settings/tax/agencies/';
        global.taxRateSettingsUrl = browser.baseUrl + 'settings/tax/rates/';
        global.taxLocationSettingsUrl = browser.baseUrl + 'settings/tax/locations/';
        global.taxCodeSettingsUrl = browser.baseUrl + 'settings/tax/codes/';
        global.reportsUrl = browser.baseUrl + 'reports/reports/';
        global.invoiceUrl = browser.baseUrl + 'orders/invoices/';
        global.priceBookUrl = browser.baseUrl + 'inventory/price-books/';
        global.itemMasterUrl = browser.baseUrl + 'inventory/item-masters/';
        global.vendorManagementUrl = browser.baseUrl + 'trading-partners/vendors/';
        global.jobsDefinitionUrl = browser.baseUrl + 'integration/jobs/definitions/';
        global.jobsExecutionUrl = browser.baseUrl + 'integration/jobs/';
        global.customersUrl = browser.baseUrl + 'trading-partners/customers/';
//        global.customersUrl = browser.baseUrl + 'orders/customers/';
        global.inventorySearchUrl = browser.baseUrl + 'inventory/lookup/';
        global.routeUrl = browser.baseUrl + 'integration/routes/';
        global.importResultsUrl = browser.baseUrl + 'settings/data-management/import-results/';
        global.workOrderUrl = browser.baseUrl + 'orders/work/';
        global.expectedReceiptsUrl = browser.baseUrl + 'fulfillment/expected-receipts/';
        global.storeportalFulfilUrl = browser.baseUrl + 'fulfillment/store-portal/';
        global.callCenterInventoryUrl = browser.baseUrl + 'call-center/inventory/lookup/';
        global.vendorPortalReturnsUrl = browser.baseUrl + 'fulfillment/returns/';
        global.callCenterSalesOrdersListUrl = browser.baseUrl + 'call-center/sales/list';
        global.fulfillmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
        global.paymentDispositionUrl = browser.baseUrl + 'call-center/payment-disposition/index';

    },

    onComplete: function() {

     var browserName, browserVersion;
     var capsPromise = browser.getCapabilities();

     capsPromise.then(function (caps) {
        browserName = caps.get('browserName');
        browserVersion = caps.get('version');

        var HTMLReport = require('protractor-html-reporter');

        testConfig = {
            reportTitle: 'Test Execution Report',
            outputPath: './reports',
            screenshotPath: './reports/screenshots',
            testBrowser: browserName,
            browserVersion: browserVersion,
            modifiedSuiteName: false,
            screenshotsOnlyOnFailure: true
        };
        new HTMLReport().from('./reports/xmlresults.xml', testConfig);

      });
    },

    onCleanUp: function(exitCode){
      var exec = require('child_process').exec, child;
          child = exec('node somescript.js',function(error,stdout,stderr){
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
       });
    },

    //--suite=purge
    suites: {
        full: 'specs/*.js',
        screens:'screens/commons.js',
        purge:'specs/purge/*.js'
    },

    allScriptsTimeout: 100000,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            prefs: {
                'download': {
                    'prompt_for_download': false,
                     directory_upgrade: true,
                    'default_directory': __dirname + '/tempFiles/',
                },
            },
        },
    },



    jasmineNodeOpts: {
        defaultTimeoutInterval: 1280000,
        showColors: true
  }
}


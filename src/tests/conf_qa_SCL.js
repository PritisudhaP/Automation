var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {

   directConnect: true,
   framework: 'jasmine',

//specs:['./src/tests/specs/SCL/login.spec.js'],
//specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js','./specs/SCL/inventoryIncDc.spec.js','./specs/SCL/skuUpdate.spec.js','./specs/SCL/returns.spec.js','./specs/SCL/salesOrderReleaseEditWMS.spec.js','./specs/SCL/webserviceServer.spec.js','./specs/SCL/webserviceClient.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js','./specs/SCL/salesOrderFTV.spec.js','./specs/SCL/salesOrderATSCheck.spec.js','./specs/SCL/multiShippingAccount.spec.js','./specs/SCL/zipFileExtract.spec.js','./specs/SCL/teardown.spec.js'],

// specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js', './spec/Invoice/new.spec.js'],

 //spec:  ['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrderFTV.spec.js']
//specs:['./specs/SCL/login.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js'],
//specs:['./specs/SCL/database.spec.js'],

//specs:['./specs/SCL/login.spec.js','./specs/SCL/shipmentConfirmation.spec.js'],

//specs:['./specs/SCL/login.spec.js','./specs/SCL/controlCenter.spec.js'],

 // specs:['./specs/SCL/login.spec.js','./specs/SCL/presale.spec.js'],
// specs:['./specs/SCL/login.spec.js'],

 //specs:['./specs/SCL/login.spec.js','./specs/Store/SP00102*.js'],
   specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/getATP.js'],
 //  specs:['./specs/SCL/mixedOrder/loginPage_spec.js','./specs/SCL/mixedOrder/mo_spec.js'],

// specs:['./specs/SCL/login.spec.js','./specs/SCL/misc/Misc_spec.js'],
// specs:['./specs/SCL/login.spec.js','./specs/SCL/storePortalPackageRecommendation/PackageRecommendation_spec.js'],

// specs:['./specs/SCL/login.spec.js','./specs/SCL/transmissionTrace/TransmissionTrace_spec.js'],

       baseUrl: 'https://project0-qa.enspirecommerce.com/oms/dist/#/',
   //  baseUrl: 'https://release1-qa.enspirecommerce.com/oms/dist/#/',
    getPageTimeout: 1280000,

    //--
    params: {
        login: {
          user: 'admin@thk.com',
          password: 'mypassword',
        },

        catalog: 'THKCatalog',
        catalogCategoryName: 'General',
        orgName: 'TheHonestKitchen-Organization-',
        carrier: 'FEDEX',
        serviceType: 'FedEx 2Day',
        dataDomain: 'com.thk',
        customerNumber : '000000000166',
        client : 'SCL_',
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
                            textNote:'Testing Note'

    },

    onPrepare: function(){
        browser.driver.manage().window().setPosition(0,0);
        browser.driver.manage().window().setSize(1440,900);
//         browser.driver.manage().window().maximize();

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
        global.productUrl = browser.baseUrl + 'inventory/products/';
        global.inventoryPoolUrl = browser.baseUrl + 'inventory/pools/';
        global.siteUrl = browser.baseUrl + 'sites/';
        global.sitesUrl=browser.baseUrl+'sites/sites/';
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
        global.skuUrl = browser.baseUrl + 'inventory/skus/';
        global.webserviceServerUrl = browser.baseUrl + 'settings/integration/web-service-server-configurations/';
        global.webserviceClientUrl = browser.baseUrl + 'settings/integration/web-service-client-configurations/';
        global.controlCenterUrl = browser.baseUrl +'sites/control-center/';
        //presale related
        global.callcenterskuUrl= browser.baseUrl + 'call-center/inventory/skus/';
        global.callcentersalesorderUrl= browser.baseUrl +'call-center/sales/list';
        global.scriptUrl = browser.baseUrl+'integration/scripts/';

        // Added by Shyam 
        global.storePortalV2Url = browser.baseUrl +'fulfillment/bopus-store-portal/';
        global.exchangeDocumentURL = browser.baseUrl +'data-management/communications/document/';
        global.fulfillmentRmaReturnsURL = browser.baseUrl +'fulfillment/inspect-returns/index';
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

   /* suites:
       {
        // controlCenter:['./specs/SCL/login.spec.js','./specs/SCL/controlCenter.spec.js']
         presale:['./specs/SCL/login.spec.js','./specs/SCL/presale.spec.js']

       },  */

    //--suite=purge
    //modified by me priti
    suites: {
        full: 'specs/*.js',
        screens:'screens/commons.js',
        purge:'specs/purge/*.js'
    },

    allScriptsTimeout: 100000,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args:['--window-size=1920,1080'],
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

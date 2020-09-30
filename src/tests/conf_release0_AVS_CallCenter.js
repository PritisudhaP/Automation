var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {

   directConnect: true,
   framework: 'jasmine',
   //seleniumAddress: 'http://localhost:4444/wd/hub',

//AVS
 //specs:['./specs/SCL/login.spec.js', './specs/AVS/AVS.spec.js'],
// Call Center
  specs:['./specs/PSSC/login.spec.js','./specs/Generic/callCenter/*.js'],


      // specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js','./specs/SCL/inventoryIncDc.spec.js','./specs/SCL/skuUpdate.spec.js','./specs/SCL/returns.spec.js','./specs/SCL/salesOrderReleaseEditWMS.spec.js','./specs/SCL/webserviceServer.spec.js','./specs/SCL/webserviceClient.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js','./specs/SCL/salesOrderFTV.spec.js','./specs/SCL/salesOrderATSCheck.spec.js','./specs/SCL/multiShippingAccount.spec.js','./specs/SCL/teardown.spec.js'],

   //specs:['./specs/Generic/login/login.spec.js','./specs/Generic/*/*.js']
  //specs:['./specs/SCL/login.spec.js','./specs/Generic/*/*.js'],
  //specs:['./specs/Generic/login/login.spec.js','./specs/Generic/login/login.spec.js'],
  //specs:['./specs/SCL/login.spec.js','./specs/Generic/product/product.spec.js'],


  // specs:['./specs/SCL/login.spec.js','./specs/AVS/AVSShipToAddress.spec.js'],


 //  specs:['./specs/SCL/login.spec.js','./specs/Generic/callCenter/valDiscAndAppeaementForML.spec.js'],

  // specs:['./specs/Generic/login/*.js','./specs/Generic/inventoryPublish/inventoryPublish.spec.js'],
  //specs:['./specs/SCL/login.spec.js','./specs/Generic/login/*.js','./specs/Generic/task/*.js','./specs/Generic/webHooks/*.js'],
    //specs:['./specs/SCL/login.spec.js','./specs/Generic/inventoryPublish/inv.spec.js'],l
    // specs:['./specs/SCL/login.spec.js','./specs/Generic/inventoryPublish/testInv.spec.js'],
 // specs:['./specs/SCL/login.spec.js','./specs/SCL/login.spec.js'],

 //specs:['./specs/Generic/StorePortalNew/SP00100_loginSpec.js','./specs/Generic/StorePortalNew/MultipleLinesSpec.js'],
// specs:['./specs/Generic/StorePortalNew/SP00100_loginSpec.js','./specs/Generic/StorePortalNew/LinePIS25Spec.js'],


       baseUrl: 'https://project2-qa.enspirecommerce.com/dist/#/',
    getPageTimeout: 1280000,

    //--
    params: {
          login: {
                      //loginUser: 'sbabu@pssc.com',
                      loginUser: 'bchitikela@thk.com',
                      user: 'bchitikela@thk.com',
                      password: 'Mypassword@123',
                      storePortalSpecificUser:'storeportal@pssc.com',
                      storePortalUser:'qauser',
                      storePortalPassword: 'mypassword',
                    },

                      searchValueSKU1:'bharathQASKU1',
                           searchValueSKU2:'bharathQASKU2',
                           searchValueSKU3:'LAASX2',
                           searchValueSKU4:'M-PT',
                           customerCriteria:'Name',
                           customerSearchValue:'WENDY ZIESEMANN',
                           customerSearchValue2:'professional',
                           channelName1:'B2B',
                           fulfillmentType: 'Pick Up At Store',
                            availableStore1: 'batchsiteqa1 , Avl Qty : ',
                            packageValue:'tst',
                            skuCriteria:'Name',
                               refNameCartId:'cartId',
                                incorrectCartId:'Car/T1 2356',
                                promoCodeValue:'TEST01',
                               textNote:'Testing Note',
                                noteType:'Informational',
                                siteName:'bharathsite1',
                                 siteNumber:'123',
                                  zipcode:'60436',
                                reservationStatus:'UNCONSUMED',
                                cartIdValue:'c@RT06242020',
                                 promisedDate:'06/10/2020',
                                custDisplayName:'CallCenterRegCustomer1',
                                custFirstName:'CallCenter',
                                custLastName:'RegCustomer1',
                                custAddress1:'4271 Norwalk Dr APT X209',
                                custCity:'San Jose',
                                custAddressState:'CA',
                                custZipcode5:'95129',


        catalog: 'THKCatalog',
        catalogCategoryName: 'General',
        //orgName: 'TheHonestKitchen-Organization-',
        orgName: 'AutomationOrganization',
        carrier: 'FEDEX',
        serviceType: 'FedEx 2Day',
        dataDomain: 'com.thk',
        storeSiteName: 'AutomationSite1',
        vendorSiteName: 'AutomationSite2',
        customerSiteName: 'AutomationSite3',
        DCSiteName: 'AutomationSite4',
       // customerSearchValue:'TESTCUST3',
        addressVerificationProvider:'EXPERIAN',
        Country:'US - United States',
        correctAddressURL:'https://api.experianmarketingservices.com/capture/v1/verify-address',
        incorrectAddressURL:'https://api.experianmarketingservices.com/capture/v1/verify-address?wrong',
        custAVSDisplayName1:'AVSTestCustomer1',
        custAVSDisplayName2:'AVSTestCustomer2',
        custAVSDisplayName3:'AVSTestCustomer3',
        custAVSDisplayName4:'AVSTestCustomer4',
        custAVSDisplayName5:'AVSTestCustomer5',
        custAVSDisplayName6:'AVSTestCustomer6',
        custAVSDisplayName7:'AVSTestCustomer7',
        custLastName1:'TestCustomer1',
        custLastName2:'TestCustomer2',
        custLastName3:'TestCustomer3',
        custLastName4:'TestCustomer4',
        custLastName5:'TestCustomer5',
        custLastName6:'TestCustomer6',
        custLastName7:'TestCustomer7',
        custFirstName:'AVS',
        custAddress1:'Norwalk Dr APT X209',
        custAddress2:'4271 Norwalk Dr',
        custAddress3:'4271 APT X209',
        custAddress4:'4271 Norwalk Dr APT X209',
        custAddress5:'4271 Norwalk APT X209',
        custAddress6:'APT X209',
        custCity:'San Jose',
        custCity1:'San Josea',
        custAddressState:'CA',
        custZipcode5:'95129',

    },

    onPrepare: function(){
        browser.driver.manage().window().setPosition(0,0);
        browser.driver.manage().window().setSize(1600,1000);
//         browser.driver.manage().window().maximize();

        browser.driver.getCapabilities().then(function (cap) {
            browser.browserName = cap.get('browserName');
        });

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/',
            filePrefix: 'xmlresults'
        }));


       global.callCenterSalesOrderUrl = browser.baseUrl + 'call-center/sales/list';
       global.callCenterSkusUrl = browser.baseUrl + 'call-center/inventory/skus/';
               global.callCenterCartTakeoverUrl = browser.baseUrl + 'call-center/cart-takeover/lookup';
               global.callCenterInventoryUrl = browser.baseUrl + 'call-center/inventory/lookup/';
               global.callCenterSalesOrdersListUrl = browser.baseUrl + 'call-center/sales/list';
               global.fulfillmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
                global.paymentDispositionUrl = browser.baseUrl + 'call-center/payment-disposition/index';
               global.fulfillmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
               global.attributesUrl = browser.baseUrl + 'settings/management/attributes/';
               global.inventorypublishUrl= browser.baseUrl+ 'inventory/publish/#%2Finventory%2Fpublish%2F';
               global.blobstoreUrl = browser.baseUrl + 'settings/data-management/datastore/';
               global.mailboxUrl = browser.baseUrl + 'data-management/communications/mailboxes/';
               global.capabilitiesUrl = browser.baseUrl + 'settings/accounts/capabilities/';
               global.catalogUrl = browser.baseUrl + 'inventory/catalogs/';
               global.channelsUrl = browser.baseUrl + 'settings/company/channels/';
               global.contactsUrl = browser.baseUrl + 'settings/organizations/contacts/';
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
               global.skuUrl = browser.baseUrl + 'inventory/skus/';
               global.webserviceServerUrl = browser.baseUrl + 'settings/integration/web-service-server-configurations/';
               global.webserviceClientUrl = browser.baseUrl + 'settings/integration/web-service-client-configurations/';
               global.addressVerificationUrl = browser.baseUrl + 'settings/company/address-verifications/';
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
       /* 'chromeOptions': {
            args:['--window-size=1920,1080'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                     directory_upgrade: true,
                    'default_directory': __dirname + '/tempFiles/',
                },
            },
        },*/
    },



    jasmineNodeOpts: {
        defaultTimeoutInterval: 1280000,
        showColors: true
  }
}

var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {

   directConnect: true,
   framework: 'jasmine',

      //specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js','./specs/SCL/inventoryIncDc.spec.js','./specs/SCL/skuUpdate.spec.js','./specs/SCL/returns.spec.js','./specs/SCL/salesOrderReleaseEditWMS.spec.js','./specs/SCL/webserviceServer.spec.js','./specs/SCL/webserviceClient.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js','./specs/SCL/salesOrderFTV.spec.js','./specs/SCL/salesOrderATSCheck.spec.js','./specs/SCL/multiShippingAccount.spec.js','./specs/SCL/teardown.spec.js'],
//specs:['./specs/returnsVDP/RVDP00100_loginSpec.spec.js','./specs/returnsVDP/RVDP00102_createVerifyRMASLSpecs.spec.js'],
 specs:['./specs/SCL/login.spec.js','./specs/Generic/*/*.js'],
// specs:['./specs/SCL/login.spec.js','./specs/Generic/customers/customers.spec.js'],
 // specs:['./specs/SCL/login.spec.js','./specs/Generic/files/files.spec.js'],
//specs:['./specs/SCL/login.spec.js','./specs/Generic/AsnUpload/asnUpload.spec.js'],
//specs:['./specs/SCL/login.spec.js','./specs/Generic/blobstore/blobstore.spec.js'],
 //  specs:['./specs/SCL/login.spec.js','./specs/Generic/purge/*.js'],
     //specs:['./specs/SCL/login.spec.js','./specs/Generic/*/*.js'],
     //specs:['./specs/Generic/login/*.js','./specs/Generic/jobs/*.js','./specs/Generic/mailbox/*.js','./specs/Generic/purge/*.js'],
   //     specs:['./specs/SCL/login.spec.js','./specs/Generic/channels/*.js'],
      //specs:['./specs/SCL/login.spec.js','./specs/Generic/purge/purge.spec.js'],
  //specs:['./specs/SCL/login.spec.js','./specs/Generic/blobstore/blobstore.spec.js'],
  //specs:['./specs/Generic/login/login.spec.js','./specs/Generic/login/login.spec.js'],
//specs:['./specs/SCL/login.spec.js','./specs/Generic/product/product.spec.js'],
   //specs:['./specs/SCL/login.spec.js','./specs/Generic/inventoryPublish/inventoryPublish.spec.js'],
  //specs:['./specs/Generic/login/*.js','./specs/Generic/inventoryPublish/inventoryPublish.spec.js'],
  //specs:['./specs/SCL/login.spec.js','./specs/Generic/login/*.js','./specs/Generic/task/*.js','./specs/Generic/webHooks/*.js'],
    //specs:['./specs/SCL/login.spec.js','./specs/Generic/inventoryPublish/inv.spec.js'],l
    //specs:['./specs/SCL/login.spec.js','./specs/Generic/inventoryPublish/testInv.spec.js'],
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/login.s specs:['./specs/SCL/login.spec.js','./specs/Generic/*/*.js'],pec'],
       baseUrl: 'https://project4-qa.enspirecommerce.com/dist/#/',
    getPageTimeout: 1280000,




    //--
    params: {
        login: {
          user: 'admin@thk.com',
          password: 'mypassword'
        },

        catalog: 'THKCatalog',
        catalogCategoryName: 'General',
        //orgName: 'TheHonestKitchen-Organization-',
        orgName: 'AutomationOrganization',
        carrier: 'FEDEX',
        serviceType: 'FedEx 2Day',
        dataDomain: 'com.thk',
        siteName1: 'AutomationSite1',
        siteName2: 'AutomationSite2',
        siteName3: 'AutomationSite3',
        siteName4: 'AutomationSite4',
        DCSiteName: 'AutomationSite4',
        vendorSiteName: 'AutomationSite2',
        customerSiteName: 'AutomationSite3',
        customerNumber : '000000000166',
        client : 'SCL_'

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

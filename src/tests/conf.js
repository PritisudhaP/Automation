var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

process.env.PROJECT = process.env.PROJECT || 'generic';

/**
 * Prepares the environment for the execution of the test suite.
 * @return null
 */
function prepareEnvironment() {
  browser.driver.manage().window().setPosition(0, 0);
  browser.driver.manage().window().setSize(1440, 900);

  browser.driver.getCapabilities().then(function(cap) {
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
  global.domainPolicyUrl = browser.baseUrl + 'settings/accounts/domain-policies/';
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
  global.inventorySearchUrl = browser.baseUrl + 'inventory/lookup/';
  global.routeUrl = browser.baseUrl + 'integration/routes/';
  global.skuUrl = browser.baseUrl + 'inventory/skus/';
  global.attributesUrl = browser.baseUrl + 'settings/management/attributes/';

  global.customersUrl = browser.baseUrl + 'trading-partners/customers/';
  //global.customersUrl = browser.baseUrl + 'orders/customers/';


  global.webserviceServerUrl = browser.baseUrl + 'settings/integration/web-service-server-configurations/';
  global.webserviceClientUrl = browser.baseUrl + 'settings/integration/web-service-client-configurations/';

  global.importResultsUrl = browser.baseUrl + 'settings/data-management/import-results/';
  global.workOrderUrl = browser.baseUrl + 'orders/work/';
  global.expectedReceiptsUrl = browser.baseUrl + 'fulfillment/expected-receipts/';
  global.inventorypublishUrl = browser.baseUrl + 'inventory/publish/';

}

/**
 * Completes the tests cases.
 * @return null
 */
function completeTests() {

  var browserName, browserVersion;
  var capsPromise = browser.getCapabilities();

  capsPromise.then(function(caps) {
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
}

/**
 * Cleans up the environment after the tests run.
 * @return null
 */
function cleanupEnvironment(exitCode) {
  var exec = require('child_process').exec, child;
  child = exec('node somescript.js', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

/**
 * Returns jasmin/protractor test configurations.
 * Dynamic results based on environment variables.
 * @returns Object
 */
function getConfig() {

  var specs = [];
  result = {
    directConnect: true,
    framework: 'jasmine',
    baseUrl: process.env.BASE_URL || 'https://release-qa.enspirecommerce.com/oms/dist/#/',
    getPageTimeout: 1280000,
    params: {
      login: {
        user: process.env.OMS_USER || 'mingardia@mycompanyxyz.com',
        password: process.env.OMS_PASS || 'mypassword'
      }
    },
    suites: {
      // This doesn't seem to behave in some editors...
      full: 'specs/' + '*.js',
      screens:'screens/commons.js',
      purge:'specs/purge/' + '*.js'
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
  };

  switch( process.env.PROJECT.toLowerCase() ) {
    case 'b2bmb':
      with ( result ) {
        params.login.merchantUser = 'merchant@petsmart.com';
        params.dataDomain = 'com.petsmart';
      }
      specs.push('./specs/VDP/setup.spec');
      specs.push('./specs/VDP/salesOrderFlow.spec');
      specs.push('./specs/VDP/salesOrderEDIFlow.spec');
      specs.push('./specs/VDP/inventoryUpdate.spec');
      specs.push('./specs/VDP/leadTimeUpdate.spec');
    break;

    case 'sales':
      with ( result ) {
        params.catalog = 'Candy Retail';
        params.catalogCategoryName = 'Chocolate';
        params.orgName = 'CandyStore-Oganization-'
        params.carrier = 'FEDEX';
        params.serviceType = 'FedEx2Day';
        params.dataDomain = 'com.candystore';
      }
    break;

    case 'scl':
      with ( result ) {
        params.catalog = 'THKCatalog';
        params.catalogCategoryName = 'General';
        params.orgName = 'TheHonestKitchen-Organization-';
        params.carrier = 'FEDEX';
        params.serviceType = 'FedEx 2Day';
        params.dataDomain = 'com.thk';
      }
      specs.push('./specs/SCL/login.spec');
      specs.push('./specs/SCL/setup.spec');
      specs.push('./specs/SCL/salesOrder.spec');
      specs.push('./specs/SCL/salesOrderEdi.spec');
      specs.push('./specs/SCL/shipmentConfirmation.spec');
      specs.push('./specs/SCL/inventoryIncDc.spec');
      specs.push('./specs/SCL/skuUpdate.spec');
      specs.push('./specs/SCL/returns.spec');
      specs.push('./specs/SCL/salesOrderReleaseEditWMS.spec');
      specs.push('./specs/SCL/webserviceServer.spec');
      specs.push('./specs/SCL/webserviceClient.spec');
      specs.push('./specs/SCL/salesOrderStatusWMS.spec');
      specs.push('./specs/SCL/salesOrderAddressverification.spec');
      specs.push('./specs/SCL/salesOrderFTV.spec');
      specs.push('./specs/SCL/salesOrderATSCheck.spec');
      specs.push('./specs/SCL/multiShippingAccount.spec');
      specs.push('./specs/SCL/teardown.spec');
    break;

    case 'pssc':
      with ( result ) {
        params.catalog = 'PSSC Catalog';
        params.catalogCategoryName = 'General';
        params.orgName = 'PublishersStorageAndShipping-Organization-';
        params.carrier = 'FEDEX';
        params.serviceType = 'FedEx 2Day';
        params.dataDomain = 'com.pssc';
      }
      specs.push('./specs/PSSC/login.spec');
      specs.push('./specs/PSSC/setup.spec');
      specs.push('./specs/PSSC/importcustomer.spec');
      specs.push('./specs/PSSC/productImport.spec');
      specs.push('./specs/PSSC/customerLedger.spec');
      specs.push('./specs/PSSC/salesOrder.spec');
      specs.push('./specs/PSSC/shipmentConfirmation.spec');
      specs.push('./specs/PSSC/inventoryIncDec.spec');
      specs.push('./specs/PSSC/workOrder.spec');
      specs.push('./specs/PSSC/expectedReceipt.spec');
      specs.push('./specs/PSSC/salesOrderBulkRelease.spec');
      specs.push('./specs/PSSC/expectedReceiptBulkRelease.spec');
      specs.push('./specs/PSSC/salesOrderMultiTenancy.spec');
      specs.push('./specs/PSSC/teardown.spec');
    break;

    case 'orr':
      with ( result ) {
        params.catalog = 'OrrSafetyCatalog';
        params.catalogCategoryName = 'General';
        params.orgName = 'OrrSafety-Organization-'
        params.carrier = 'FEDEX';
        params.serviceType = 'FedExGround';
        params.dataDomain = 'com.orrsafety';
      }
      specs.push('./specs/ORR/login.spec');
      specs.push('./specs/ORR/customerImport.spec');
      specs.push('./specs/ORR/productSkuImport.spec');
      specs.push('./specs/ORR/inventoryImport.spec');
      specs.push('./specs/ORR/inventoryInc.spec');
    break;

    // Warning! Generic and the default case are one in the same!
    case 'generic':
    default:
      with ( result ) {
        params.catalog = 'PSSC Catalog';
        params.catalogCategoryName = 'General';
        params.orgName = 'PublishersStorageAndShipping-Organization-';
        params.carrier = 'FEDEX';
        params.serviceType = 'FedEx 2Day';
        params.dataDomain = 'com.pssc';
      }
      specs.push('./specs/Generic/login/login.spec.js');
      specs.push('./specs/Generic/*/*.js');
    break;
  }
  result['specs'] = specs;

  result.onPrepare = prepareEnvironment;
  result.onComplete = completeTests;
  result.onCleanUp = cleanupEnvironment;
  return result;
}

exports.config = getConfig();

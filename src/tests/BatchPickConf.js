var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');
var report = 'C:/Users/vvijayan/OMS_Automation/enVistaQA/reports/screenshots';
var fs = require('fs-extra');
//var HtmlScreenshotReporter = require('./node_modules/protractor-jasmine2-screenshot-reporter');

exports.config = {

   directConnect: false,
   seleniumAddress: 'http://localhost:4444/wd/hub',
   framework: 'jasmine',

  /********************Batch Pick***************************************/ 
   
 //specs:['./specs/SCL/batchPick/roughwork.spec.js'], 
  // specs:['./specs/SCL/batchPick/BatchPickByCategory_High.spec.js','./specs/SCL/batchPick/BatchPickByItem_High.spec.js',
//	  	  './specs/SCL/batchPick/BatchPickByOrder_High.spec.js','./specs/SCL/batchPick/BatchPick_high.spec.js'],
	  	//'./specs/SCL/batchPick/BatchPick_High_Reject.spec.js'],
   // specs:['./specs/SCL/batchPick/BatchPickByOrder_High.spec.js','./specs/SCL/batchPick/BatchPickByItem_High.spec.js'],
  // specs:['./specs/SCL/batchPick/BatchPickByOrder_High.spec.js'],
  // specs:['./specs/SCL/batchPick/BatchPickByItem_High.spec.js'],
  // specs:['./specs/SCL/batchPick/BatchPickByCategory_High.spec.js'],
   // specs:['./specs/SCL/batchPick/BatchPickByCategory_High.spec.js','./specs/SCL/batchPick/BatchPick_high.spec.js'],
   //specs:['./specs/SCL/batchPick/BatchPick_high.spec.js'],
   //specs:['./specs/SCL/batchPick/BatchPick_High_Reject.spec.js'],
//  specs:['./specs/SCL/batchPick/BatchPick_Medium.spec.js'],
  // specs:['./specs/SCL/batchPick/BatchPick_Low.spec.js'],
     specs:['./specs/SCL/batchPick/tokenGeneration.js','./specs/SCL/batchPick/batchCorrelationChecking.spec.js'],


  
   
   // baseUrl: 'https://project0-qa.enspirecommerce.com/oms/dist/#/',
  baseUrl: 'https://project4-qa.enspirecommerce.com/oms/dist/#/',
// baseUrl: 'https://project5-qa.enspirecommerce.com/oms/dist/#/',

    getPageTimeout: 1280000,

    //--
    params: {
        login: {
          user: 'admin@thk.com',
          password: 'mypassword',
        },       
        carrier: 'FEDEX',
        service: 'FedExStandardOvernight',
        serviceType: 'FedEx 2Day',
        customerNumber : '000000000166',
        customerSearchValue:'STEVE',
        channelName:'B2B',
        channelName1:'B2C',
        siteName:'sandiego-dc',
        zipcode:'92120',
        reservationStatus:'UNCONSUMED',
        custDisplayName:'Steve Smith',
        custFirstName:'Steve',
        custLastName:'Smith',
        custAddress1:'62 East St Louis Rd.',
        custCity:'San Jose',
        custAddressState:'CA',
        custZipcode5:'90005',     
        shipmentstatus: 'SHIPPED',
		packageValue:'8x6x8 Small Box',
		orders: 2,
		shipaccount: 'test',
		InvPool : 'Joliet-DC',
		//customerId : '0000000581',//for P0 Env
		customerId : '0000000657',//for P4 Env
		customerId2 : '0000000580',
		searchCustomer: 'STEVE SMITH',
		customerEmail : 'sm@test.com',
		Incqty : 5,
		Decqty : 3,
		fullFillmentType : 'Pick Up At Store',
		availableStore : 'sandiego-dc , Avl Qty :',
		paymentMethod : 'Credit Card',
		cardNumber : '5425230000004415',
		cvv : '123',
		expMonth : '05',
		expYear : '2025',
//Packing document SKU
		packingSKU1 :'packingSku1',
		packingSKUName1 :'packingSku1',
		packingSKU2 :'packingSku2',
		packingSKUName2 :'packingSku2',
		packingSKU3 :'packingSku3',
		packingSKUName3 :'packingSku3',
		packingSite:'packingSite',
		packingStore:'packingsite , Avl Qty :',
		
//Category based SKUs	
		batcpickSKU1 :'batchpdct2',
		batcpickSKUName1 :'batchpdct2',
		batcpickSKU2 :'batchpdct1',
		batcpickSKUName2 :'batchpdct1',
		batcpickSKU3 :'batchpdct3',
		batcpickSKUName3 :'batchpdct3',
		batcpickSKU4 :'batchpdct44',//ship alone SKU
		batcpickSKUName4 :'batchpdct44',//Ship alone SKU
		batcpickSKU45 :'batchpdct45',//ship alone SKU
		batcpickSKUName45 :'batchpdct45',//Ship alone SKU
		batcpickSKU5 :'batchpdct5',//Category is SHOES
		batcpickSKUName5 :'batchpdct5',//Category is SHOES
		batcpickSKU6 :'batchpdct6',
		batcpickSKUName6 :'batchpdct6',
		batcpickSKU7 :'batchpdct7',
		batcpickSKUName7 :'batchpdct7',
		batchpickSite:'BatchPickSite',
		batchpickStore:'batchpicksite , Avl Qty :',
//item based SKUs
		itempickSKU1 :'BatchpickItem1',
		itempickSKUName1 :'BatchpickItem1',
		itempickSKU2 :'BatchpickItem2',
		itempickSKUName2 :'BatchpickItem2',
		itempickSKU3 :'BatchpickItem3',
		itempickSKUName3 :'BatchpickItem3',
		itempickSKU4 :'BatchpickItem44',//ship alone SKU
		itempickSKUName4 :'BatchpickItem44',//Ship alone SKU
		itempickSKU45 :'BatchpickItem45',//ship alone SKU
		itempickSKUName45 :'BatchpickItem45',//Ship alone SKU
		itempickSKU5 :'BatchpickItem4',//Category is SHOES
		itempickSKUName5 :'BatchpickItem4',//Category is SHOES
		itempickSKU6 :'BatchpickItem5',
		itempickSKUName6 :'BatchpickItem5',
		ItemPickSite:'ItemPickSite',
		itempickStore:'itempicksite , Avl Qty :',
		
//order based SKUs
		orderpickSKU1 :'BatchpickOrder1',
		orderpickSKUName1 :'BatchpickOrder1',
		orderpickSKU2 :'BatchpickOrder2',
		orderpickSKUName2 :'BatchpickOrder2',
		orderpickSKU3 :'BatchpickOrder3',
		orderpickSKUName3 :'BatchpickOrder3',
		orderpickSKU4 :'BatchpickOrder44',//ship alone SKU
		orderpickSKUName4 :'BatchpickOrder44',//Ship alone SKU
		orderpickSKU45 :'BatchpickOrder45',//ship alone SKU
		orderpickSKUName45 :'BatchpickOrder45',//Ship alone SKU
		orderpickSKU5 :'BatchpickOrder4',//Category is SHOES
		orderpickSKUName5 :'BatchpickOrder4',//Category is SHOES
		orderpickSKU6 :'BatchpickOrder5',
		orderpickSKUName6 :'BatchpickOrder5',
		orderPickSite:'OrderPickSite',
		orderpickStore:'orderpicksite , Avl Qty :',
		
		labelPath : 'C:\\Users\\vvijayan\\Downloads\\test',	
		promiseddate:'07/31/2021',
		pastPromisedate: '05/30/2021',
		storeNumber : "1",
		Category : "TOYS",
		Category2 :"SHOES",
		Category3 :"CARPARTS",
		UPCcode : "1236547890",
		defaultShippingProfile : "defaultshippingprofile",
		customShippingProfile:"defaultshippingprofile12",
		userID : "Vishak Vijayan",
		scriptName:"combinedPackingSlipAndShippingLabel",
		listoforders:7,
		
		
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

        jasmine.getEnv().addReporter({
        	specDone: function (result) {
        	if (result.status == 'failed') {
        	browser.getCapabilities().then(function (caps) {
        	var browserName = caps.get('browserName');

        	browser.takeScreenshot().then(function (png) {
        	var stream = fs.createWriteStream( report + '/' + browserName + '-' + result.fullName + '.png');
        	stream.write(new Buffer(png, 'base64'));
        	stream.end();
        	});
        	});
        	}
        	}
        	});
        
        //added by vishak
        global.callCenterInventoryUrl = browser.baseUrl + 'call-center/inventory/lookup/';
        global.callCenterSkusUrl = browser.baseUrl + 'call-center/inventory/skus/'; 
        global.callCenterSalesOrdersListUrl = browser.baseUrl + 'call-center/sales/list';
        global.fulfillmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
        global.callCenterReturnsUrl = browser.baseUrl + 'call-center/returns/';
        global.RMAReturnsUrl = browser.baseUrl + 'fulfillment/inspect-returns/';
        global.paymentDispositionUrl = browser.baseUrl + 'call-center/payment-disposition/'; 
        global.FRReturnsUrl = browser.baseUrl + 'fulfillment/returns/'; 
        global.InventoryUrl = browser.baseUrl + 'inventory/lookup/';
        global.batchPickUrl = browser.baseUrl + 'fulfillment/batches/';
        global.callcenterorder = browser.baseUrl + 'call-center/sales/new-1';
        global.shippingProfile = browser.baseUrl +'settings/company/shipping-profiles/';
        global.correlations = browser.baseUrl + 'settings/data-management/correlations/';

        
//////////////////////////////////////////////////////////////////////////////////////////////////////////
        
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
        //global.shipmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
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
            screenshotPath: './screenshots',
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
    //modified by me priti
    suites: {
        full: 'specs/*.js',
        screens:'screens/commons.js',
        purge:'specs/purge/*.js'
    },

    allScriptsTimeout: 100000,

    capabilities: {
        'browserName': 'chrome',
  	  //	'shardTestFiles': true,
  	  //	'maxInstances': 1,
        'chromeOptions': {
            args:['--window-size=1920,1080'],
            prefs: {
                'download': {
                    'prompt_for_download': false,
                    // directory_upgrade: true,
//                    'default_directory': __dirname + '/tempFiles/',
                    'default_directory': 'C:\\Users\\vvijayan\\Downloads\\test\\',

                },
            },
        },
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 1280000,
        showColors: true
  }
}

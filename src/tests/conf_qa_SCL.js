var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');
//var report = 'C:/Users/vvijayan/OMS_Automation/enVistaQA/reports/screenshots';
var fs = require('fs-extra');
//var HtmlScreenshotReporter = require('./node_modules/protractor-jasmine2-screenshot-reporter');

exports.config = {

   directConnect: true,
   seleniumAddress: 'http://localhost:4444/wd/hub',
   framework: 'jasmine',
   

//specs:['./src/tests/specs/SCL/login.spec.js'],
//specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js','./specs/SCL/inventoryIncDc.spec.js','./specs/SCL/skuUpdate.spec.js','./specs/SCL/returns.spec.js','./specs/SCL/salesOrderReleaseEditWMS.spec.js','./specs/SCL/webserviceServer.spec.js','./specs/SCL/webserviceClient.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js','./specs/SCL/salesOrderFTV.spec.js','./specs/SCL/salesOrderATSCheck.spec.js','./specs/SCL/multiShippingAccount.spec.js','./specs/SCL/zipFileExtract.spec.js','./specs/SCL/teardown.spec.js'],

   //specs:['./specs/SCL/login.spec.js','./specs/SCL/teardown.spec.js'],
   
// specs:['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrder.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/salesOrderEdi.spec.js','./specs/SCL/shipmentConfirmation.spec.js', './spec/Invoice/new.spec.js'],

 //spec:  ['./specs/SCL/login.spec.js','./specs/SCL/setup.spec.js','./specs/SCL/salesOrderFTV.spec.js']
//specs:['./specs/SCL/login.spec.js','./specs/SCL/salesOrderStatusWMS.spec.js','./specs/SCL/salesOrderAddressverification.spec.js'],
//specs:['./specs/SCL/database.spec.js'],

//specs:['./specs/SCL/login.spec.js','./specs/SCL/controlCenter.spec.js'],

 // specs:['./specs/SCL/login.spec.js','./specs/SCL/presale.spec.js'],
 //   specs:['./specs/SCL/login.spec.js'],

 //specs:['./specs/SCL/login.spec.js','./specs/Store/SP00102*.js'],
  // specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/getATP.js'],
  // specs:['./specs/SCL/mixedOrder/loginPage_spec.js','./specs/SCL/mixedOrder/mo_spec.js'],

  // specs:['./specs/SCL/login.spec.js','./specs/Generic/callCenter/invLookUpndCreateCustomer.spec.js','./specs/Generic/callCenter/promoCode.spec.js'],
  // specs:['./specs/SCL/login.spec.js','./specs/Generic/callCenter/promoCode.spec.js'],


//////////////////// Added by Shyam////////////////
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/BucketMove.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/DateFieldValidation.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/FTVErrorReason_spec.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/InventoryAdjustments.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/ServiceListOrder_spec.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/ServiceOrderDtl_spec.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/InventoryAdjExceptionHandling_spec.js'],
 //  specs:['./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/MultiOrderCreationV3_spec.js'],
 //  specs:['./specs/SCL/login.spec.js','./specs/SCL/misc/Misc_spec.js'],
//   specs:['./specs/SCL/login.spec.js','./specs/SCL/storePortalPackageRecommendation/PackageRecommendation_spec.js'],
//   specs:['./specs/SCL/login.spec.js','./specs/SCL/transmissionTrace/TransmissionTrace_spec.js'],
//   specs:['./specs/SCL/login.spec.js','./specs/SCL/DeliveredStatus.spec.js'],
//   specs:['./specs/SCL/login.spec.js','./specs/SCL/ResolvingZipcodes_spec.js'],
//   specs:['./specs/SCL/login.spec.js','./specs/SCL/shipmentConfirmation.spec.js'],


 
 //added by vishak   
   
///////////////////Call Center returns///////////////
   //specs:['./specs/SCL/login.spec.js','./specs/SCL/Returns/callcenterReturn_FullQTY.spec.js',
	 //  './specs/SCL/Returns/callcenterReturn_PartialQTY.spec.js','./specs/SCL/Returns/callcenterReturn_Multiline_MultipleQty.spec.js',
   //'./specs/SCL/Returns/RMAReturnsValidation.spec.js'],   
	
///////////////////FR Returns///////////////
   
  // specs:['./specs/SCL/login.spec.js','./specs/SCL/Returns/FullfillmentReturns.spec.js','./specs/SCL/Returns/FFulfillmentReturns_partialQTY.spec.js',
	//	   './specs/SCL/Returns/FulfillmentReturnsPartiallyShipped.spec.js','./specs/SCL/Returns/FulfillmentReturnsValidation.spec.js',
	 //  './specs/SCL/Returns/FulfillmentReturnsMultipleOrders.spec.js','./specs/SCL/Returns/FullfillmentReturns_ MultiLineRMA.spec.js'],

  ////////////////Order Returns////////////// 
   
	//specs:['./specs/SCL/login.spec.js','./specs/SCL/Returns/ordersReturns.spec.js','./specs/SCL/Returns/ordersReturns_Partial.spec.js',
//	  './specs/SCL/Returns/orderReturnsRMADelete.spec.js','./specs/SCL/Returns/ordersReturnsMulitpleReturn.spec.js','./specs/SCL/Returns/ordersReturnsValidation.spec.js',
  // 	'./specs/SCL/Returns/OrderReturnsBlindReturn.spec.js','./specs/SCL/Returns/orderReturnsBlindReturnValidation.spec.js'],

  
   /***********************Order Line Cancel************************************/
  // specs:['./specs/SCL/login.spec.js','./specs/SCL/OrderLineCancel/OrderLineCancelIncDec.spec.js','./specs/SCL/OrderLineCancel/LineLevelVerifyQTY.spec.js','./specs/SCL/OrderLineCancel/HeaderLevelVerifyQTY.spec.js',
//	   './specs/SCL/OrderLineCancel/PartiallyReleasedOrderCancel.spec.js','./specs/SCL/OrderLineCancel/PartialCancelAndShip.spec.js','./specs/SCL/OrderLineCancel/OrderLineCancelTwoDigit.spec.js',
//	   './specs/SCL/OrderLineCancel/OrderLineCancelThreeDigit.spec.js','./specs/SCL/OrderLineCancel/OrderLineCancelFiveDigit.spec.js','./specs/SCL/OrderLineCancel/OrderLineCancelBOPIS.spec.js',
//	   './specs/SCL/OrderLineCancel/cancelValidation.spec.js'],

   //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/tokenGeneration.js','./specs/SCL/OrderLineCancel/APIOpenOrder.spec.js'],
   //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/tokenGeneration.js','./specs/SCL/OrderLineCancel/APIReleasedOrder.spec.js'],
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/tokenGeneration.js','./specs/SCL/OrderLineCancel/APIReleasedOrder.spec.js'],
   
   
  /********************Batch Pick***************************************/ 
   
   

   
   baseUrl: 'https://project0-qa.enspirecommerce.com/oms/dist/#/',
  //baseUrl: 'https://project4-qa.enspirecommerce.com/oms/dist/#/',
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
		searchValueSKU1:'testPriti',
        SkuName4:'VENACUSKU',
		searchValueSKU4:'VENACUSKU',
        SkuName3:'AcuTest1',
		searchValueSKU3:'AcuTest1',
		SkuName2:'AcuSKU2',
		searchValueSKU2:'0000000028',
		//searchValueSKU2:'testPriti2',
        searchValueSKU1:'AcuSKU11',
        SkuName1 :'AcuSKU11',
        //SkuName2 :'testPriti2',
     //  SkuName1 :'testPriti',
        //searchValueSKU3:'LAASX2',
        //searchValueSKU4:'M-PT',
        customerCriteria:'Name',
        //customerSearchValue:'MUSICA',
        //customerSearchValue:'WENDY ZIESEMANN',
        //customerSearchValue2:'professional',
        customerSearchValue:'STEVE',
        channelName:'B2B',
        channelName1:'B2C',
        channelName2:'Full Service',
        promisedDate:'05/31/2019',
        siteName:'sandiego-dc',
        siteNumber:'1',
        zipcode:'92120',
        reservationStatus:'UNCONSUMED',
        custDisplayName:'Steve Smith',
        custFirstName:'Steve',
        custLastName:'Smith',
        custAddress1:'24 Green St',
        custCity:'San Jose',
        custAddressState:'CA',
        custZipcode5:'95129',
        refNameCartId:'cartId',
        cartIdValue:'C@rT123',
        incorrectCartId:'Car/T1 23',
        promoCodeValue:'TEST01',
        textNote:'Testing Note',
        shipmentstatus: 'SHIPPED',
		packageValue:'8x6x8 Small Box',
		returninglocation:'San Diego - DC',
		DispositionNote : 'this is a payment disposition test note',
		refundMethod : 'REFUND',
		orders: 2,
		shipaccount: 'test',
		InvPool : 'Joliet-DC',
		customerId : '0000000581',
		customerId2 : '0000000580',
		searchCustomer: 'STEVE SMITH',
		advancesearchName: 'Sarath',
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
		batcpickSKU1 :'batchpdct2',
		batcpickSKUName1 :'batchpdct2',
		batcpickSKU2 :'batchpdct1',
		batcpickSKUName2 :'batchpdct1',
		batchpickSite:'BatchPickSite',
		batchpickStore:'batchpicksite , Avl Qty :',
		
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
		global.ediProfileURL = browser.baseUrl + 'settings/company/edi-configurations/';
		global.callCenterInventoryLookupURL = browser.baseUrl + 'call-center/inventory/lookup/';
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
            //outputPath: 'C:/Users/vvijayan/OMS_Automation/enVistaQA/reports',
            //screenshotPath: 'C:/Users/vvijayan/OMS_Automation/enVistaQA/reports/screenshots',
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

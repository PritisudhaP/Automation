var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {
   directConnect: false,
   seleniumAddress: 'http://localhost:4444/wd/hub',
   framework: 'jasmine',

//======================================================
   
  // specs:['./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/batchPick/roughwork.spec.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js'],    
   
//Ecomm txn for capture, refund with valid details for Credit card (CC)
/*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/CC/AurusCCOrderAPI.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
*/
//Ecomm txn for cancel with valid details for Credit card - worked fine
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/AurusAPI/CC/cancelOrder.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],
   
//CC Retail and refund 
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/CC/CCRetailOrder.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
 
//GooglePay
/*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GooglePay/GooglepayOrder.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
*/
/*//Ecomm txn for capture, refund with valid details for Applepay
specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Applepay/ApplepayOrderCreation.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],*/

//Retail order cancel flow  
// specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/CC/CCRetailOrder.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],

//Applepay capture and refund specs:
//specs:['./specs/SCL/login.spec','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Applepay/ApplepayOrderCreation.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],

//Applepay cancel order specs:
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Applepay/ApplepayOrderCreation.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],

//GooglePay capture and refund specs:
/*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GooglePay/GooglepayOrder.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
*/
//GooglePay cancel order specs:
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GooglePay/GooglepayOrder.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],
/*
//Paypal and refund specs:
specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js', './specs/SCL/API/AurusAPI/Paypal/PaypalOrder.js', './specs/SCL/API/AurusAPI/General/releaseOrderAPI.js', './specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js', './specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/CC/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
   
   
//specs:['./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],
//specs:['./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/General/returnOrder.js'],
//specs:['./specs/SCL/login.spec','./specs/SCL/API/AurusAPI/General/runJob.js'],

 //Retail txn without corp id and valid sid, mid,tid details
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Retail/RetailNegativeFlow1.js'],
   
//Retail txn without mid,tid and with valid corpid, store id
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Retail/RetailNegativeFlow2.js'],
   
//Retails txn with corp id, without sid,mid,tid details and checked it is taking the default values from merchant user or not
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Retail/RetailNegativeFlow3.js'],

//Ecomm txn for capture, refund with valid details for Alipay
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Alipay/AliPayOrderAPI.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],

//Multi-tender retail txn for Applepay, CC, capture, refund
   //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Multiple/CCAandApplyPayOrderAPI.js','./specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],

//Multi-tender retail txn for Applepay, CC, cancel
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/Multiple/CCAandApplyPayOrderAPI.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],

/*Full reversal  with don't void on cancellation flag set to true (GC)
   In PPR we have aurus-> giftcard -> edit -> 'Don't void on cancellation flag set to true'
 */  
//specs:['./specs/SCL/login.spec.js','./specs/SCL/API/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCard.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],


//Full refund with don't void on cancellation flag set to as false, offline mode (GC)
  // specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCard.js','./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],

 /*Full refund  with don't void on cancellation flag set to true (GC)
   In PPR we have aurus-> giftcard -> edit -> 'Don't void on cancellation flag set to true'
 */ 
 //specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCard.js', './specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js','./specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],
     
   /*Full reversal  with don't void on cancellation flag set to false and offline mode (GC)
   In PPR we have aurus-> giftcard -> edit -> 'Don't void on cancellation flag set to false'
 */  
/*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCard.js',
  
		'./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],
 */
   
/*Full refund  with don't void on cancellation flag set to true (GC+CC)
   In PPR we have aurus-> giftcard -> edit -> 'Don't void on cancellation flag set to true'
 */ 
 /*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCardWithCC.js', './specs/SCL/API/AurusAPI/General/releaseOrderAPI.js','./specs/SCL/API/AurusAPI/General/getFRDetailsAPI.js','./specs/SCL/API/AurusAPI/General/Shipmentcreation.js','./specs/SCL/API/AurusAPI/General/routes.js','./specs/SCL/API/AurusAPI/General/runJob.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js',
  './specs/SCL/API/AurusAPI/General/returnOrder.js','./specs/SCL/API/AurusAPI/General/rmaupdate.js','./specs/SCL/API/AurusAPI/General/returninvoiceCreation.js'],*/
 
   
 /*Full reversal  with don't void on cancellation flag set to false and offline mode (GC + CC)
   In PPR we have aurus-> giftcard -> edit -> 'Don't void on cancellation flag set to false'
 */  
/*specs:['./specs/SCL/login.spec.js','./specs/SCL/API/AurusAPI/tokenGeneration.js','./specs/SCL/API/AurusAPI/GiftCard/aurusGiftCardWithCC.js',
	'./specs/SCL/API/AurusAPI/CancelOrder/cancelOrder.js','./specs/SCL/API/AurusAPI/General/orderPaymentlog.js'],
 
  */ 
  baseUrl: 'https://project0-qa.enspirecommerce.com/oms/dist/#/',

    //getPageTimeout: 1280000,
    getPageTimeout: 5000000,

    //--
	  params: {

        login: {
                 /*
                 password: 'Mypassword@123',
                  user: 'admin@thk.com',
               	password: '95^zCXw7Z7Dwu=TM',
               */
        			 user: 'admin@thk.com',
        	       //  password: 'mypassword',
        	         password: '95^zCXw7Z7Dwu=TM',
        	
              
               },
               APIRequest:' https://project0-qa.enspirecommerce.com/api/v1/',
               SkuName2:'CivicSku2',
       		   searchValueSKU2:'CivicSku2',
               searchValueSKU1:'CivicSku1',
               SkuName1 :'CivicSku1',
               searchValueSKU3:'CivicSku3',
               SkuName3 :'CivicSku3',
               amt: '25.65',
               cardNum: '7777182664315546',
               trxnId1: '194212250140053209',
               trxnId2: '2020030961939536249',
               pin:'9013',
               searchValueSKU1:'testPriti1',
               searchValueSKU2:'testPriti1',
               trackingNumber:'246732',
               customerCriteria:'Name',
               customerSearchValue:'000000000166',
              //customerSearchValue2:'professional',
               channelName:'B2C',
               fulfillmentType: 'Pick Up At Store',
                availableStore1: 'batchsiteqa1 , Avl Qty : ',
                packageValue:'8x6x8 Small Box',
                paymentMethodValue1:'Credit Card',
                paymentMethodValue2:'Gift Card',
                cardNumber1:'5425230000004415',
                cvv:'123',
                cardHolderName:'Swetha QA Card',
                expMonth:'05',
                expYear:'2023',
                paymentAmt:'16',
                shipAccount:'247981470',
                batchSiteValue:'batchqastore1',
            //!use the below var with 1 if the request is for  GC+CC option. CC will be the one with 1!//  
                OOTNum1:'20000000000007080879',
                ticketNumber1:'221302040874241447',
                TransactionID1:'192213020408742496',
                Amount1 :'45.62',
                CardIdentifier1 :'2000000000000195',
                cardType :'MASTERCARD',
                routeName1:'invoiceForShipments',
                Amount: '15.20',
                OOTNum:'20000000000007076603',
                ticketNumber:'121301309940100224',
                TransactionID:'191213013099401019',
                CardIdentifier:'7777182664315546',
            	refundMethod : 'REFUND',
            	returnCapture: 'refundPaymentAtInvoiceTaskletPaypal',
            	orderDate :"2020-08-11T16:40:02.057-05:00",
            	type:"GIFT",//change it to cancel if doing cancel operation and it will skip the payment validation in payment log 

	  		},
	
	    	onPrepare: function(){
		        browser.driver.manage().window().setPosition(0,0);
		        browser.driver.manage().window().setSize(1600,1000);
		
		        browser.driver.getCapabilities().then(function (cap) {
		            browser.browserName = cap.get('browserName');
		        });
		
		        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
		            consolidateAll: true,
		            savePath: './reports/',
		            filePrefix: 'xmlresults'
		        }));
	
	         	global.callCenterNewSOUrl = browser.baseUrl + 'call-center/sales/new-1';
	         	global.fulfillmentRequestsUrl = browser.baseUrl + 'fulfillment/requests/';
	         	global.routeUrl = browser.baseUrl + 'integration/routes/';
	         	global.batchPickUrl = browser.baseUrl + 'fulfillment/batches/';
	         	global.mailboxUrl = browser.baseUrl + 'data-management/communications/mailboxes/';
	            global.routeUrl = browser.baseUrl + 'integration/routes/';
	            global.jobsUrl= browser.baseUrl + 'integration/jobs/definitions/';
	            global.callCenterSalesOrdersListUrl = browser.baseUrl + 'call-center/sales/list';
	            global.invoicesUrl = browser.baseUrl + 'orders/invoices/';
	            global.createReturnUrl = browser.baseUrl + 'call-center/returns/create-return';
	            global.RMAReturnsUrl = browser.baseUrl + 'fulfillment/inspect-returns/';
	            global.callCenterReturnsUrl = browser.baseUrl + 'call-center/returns/';
	            global.paymentDispositionUrl = browser.baseUrl + 'call-center/payment-disposition/'; 
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
            //outputPath: 'C:/Envista/GIT/Automation/reports',
            //screenshotPath: 'C:/Envista/GIT/Automation/reports/screenshots',
	    				testBrowser: browserName,
	    				browserVersion: browserVersion,
	    				modifiedSuiteName: false,
	    				screenshotsOnlyOnFailure: true
	    		};
	    		new HTMLReport().from('./reports/xmlresults.xml', testConfig);
	    		//new HTMLReport().from('C:/Envista/GIT/Automation/reports/xmlresults.xml', testConfig);

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
	    suites:{
	    	demopage: ['.\cancelorder\testFile.js'],
	    	full: 'specs/*.js',
	    	screens:'screens/commons.js',
	    	purge:'specs/purge/*.js'
	    },

	    allScriptsTimeout : 100000,

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


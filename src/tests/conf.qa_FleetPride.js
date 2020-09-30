var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');

exports.config = {

   directConnect: true,
   framework: 'jasmine',


  // specs:['./specs/FleetPride/customerUpload.spec.js','./specs/FleetPride/productskuUpload.spec.js','./specs/FleetPride/inventoryUpload.spec.js','./specs/FleetPride/kitUpload.spec.js'],
 // specs:['./specs/FleetPride/customerUpload.spec.js'],
  //specs:['./specs/FleetPride/productskuUpload.spec.js'],
  //  specs:['./specs/FleetPride/inventoryUpload.spec.js'],
       specs:['./specs/FleetPride/kitUpload.spec.js'],


   baseUrl: 'https://fleetpride165-qa.enspirecommerce.com/oms/dist/#/',
   getPageTimeout: 1280000,

   params: {
           login: {
             userFP: 'sbabu@fp.com',
             passwordFP: 'mypassword',
             userPDC: 'sbabu@pdc.com',
             passwordPDC: 'mypassword',
             userFPP: 'sbabu@fleetpride.com',
             passwordFPP: 'mypassword'
           }

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





        global.customerfileuploadurl= browser.baseUrl +'data-management/communications/files/01a4cf51-51d2-48fe-bbde-f7123a633fe9/';
        global.routeUrl = browser.baseUrl + 'integration/routes/';
        global.customerUrl= browser.baseUrl + 'trading-partners/customers/';
        global.productfileuploadUrl = browser.baseUrl + 'data-management/communications/files/9af6c6e5-1ca5-4fc3-bc31-0978805c6fb6/';
         global.productUrl = browser.baseUrl + 'inventory/products/';
        global.skuUrl = browser.baseUrl + 'inventory/skus/';
        global.inventoryfileuploadUrl = browser.baseUrl + 'data-management/communications/files/0716f5f9-a197-44bd-b0b8-d490d22d299d/';
        global.inventorySearchUrl = browser.baseUrl + 'inventory/lookup/';
        global.mailboxUrl = browser.baseUrl + 'data-management/communications/mailboxes/';


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

          /*  capabilities: {
             'browserName': 'safari'
            }, */



            jasmineNodeOpts: {
                defaultTimeoutInterval: 3280000,
                showColors: true
          }







}

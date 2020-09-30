var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsCreateScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.create.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.SONumber="000000005533";
global.value="";


describe('Shipment creation with sites having multiple shipping Fedex accounts  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var shipmentRequestsCreate = new shipmentRequestsCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
    var commons = new common();

        it('Shipment creation with sites having multiple shipping Fedex accounts - TC0001', function(){


         browser.get(shipmentRequestsUrl);
         browser.sleep(5000);


           browser.wait(function() {
                return SONumber != '';
            }).then(function() {

           /*  var result= element.all(by.xpath("//div[@class='en-collection-row']")).map(function (arr){
          var promises = [];
              for (var i = 0; i < arr.length; i++) {
                  promises.push(arr[i].getText());
              }

             });*/

             //var Q = require('q');

             element.all(by.xpath("//div[@class='en-collection-row']")).then(function (arr) {
                // var promises = [];
                 console.log("length is "+arr.length);

              /*   for (var i = 0; i < arr.length; i++) {
                     promises.push(arr[i].getText());
                 } */

                /* Q.all(promises).done(function (result) {
                     // print the results when the lookups and processing are done
                     console.log("length is "+result.length);
                 }); */
             });

            /* console.log("result is "+result);
                     value= result.count();
                     console.log("count is "+value); */

                           /*     shipmentRequestsSummary.shipmentRequestSearch("Order #",SONumber);
                                browser.sleep(3000);
                                shipmentRequestsSummary.shipmentRequestSelectGear("Edit");
                                browser.sleep(3000);
                                shipmentRequestsCreate.createShipment();
                                shipmentRequestsCreate.doNotGenerateLabel('Uncheck');
                                browser.sleep(3000); */



});



            });







})

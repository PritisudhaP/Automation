var salesOrderCreateScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.summary.screen.js');

var common = require(process.cwd() + '/screens/commons.js');
global.SONumber="";


describe('Validate Order Flow  : ', function(){
    var salesOrderCreate = new salesOrderCreateScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();
    var commons = new common();

        it('validate order with error message - TC0001', function(){

            browser.get(salesOrderUrl);
          commons.new();
          browser.driver.sleep(5000);
          browser.waitForAngular();
          salesOrderCreate.saveOption("Save as Draft");
         browser.sleep(3000);
         expect(salesOrderCreate.errorTabCount()).toEqual('1');
         salesOrderCreate.clickonValidateOrder();
         browser.sleep(2000);
         expect(salesOrderCreate.alertMessageValidateOrder()).toEqual('Validation complete. Please check Errors tab.');
          salesOrderCreate.salesOrderNumber().then(function(value) {
                          SONumber = value;
                          console.log(SONumber);
                      });


            browser.wait(function() {
                            return SONumber != '';
                        }).then(function() {
                            browser.get(salesOrderUrl);
                            commons.searchWithCriteria("Order #","contains",SONumber);

            browser.sleep(2000);
            expect(salesOrderSummary.status()).toEqual('FAILED TO VALIDATE');
            salesOrderSummary.multiAction('Validate Order(s)');
            expect(salesOrderSummary.alertMessageOnValidateOrder()).toEqual('Validation complete. One or more orders are still in FAILED TO VALIDATE status. Please check Errors tab for individual orders.');
           browser.sleep(2000);
          commons.multiselect();
         salesOrderSummary.salesOrderSelectGear("View");
          browser.sleep(2000);
         expect(salesOrderCreate.errorTabCount()).toEqual('1');
         salesOrderCreate.clickonValidateOrder();
         browser.sleep(2000);
         expect(salesOrderCreate.alertMessageValidateOrder()).toEqual('Validation complete. Please check Errors tab.');

                      });




    });




 })

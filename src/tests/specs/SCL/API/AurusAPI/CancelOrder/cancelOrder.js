var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');

var callCenterScreen = require(process.cwd() + '/src/tests/screens/callCenter/callCenter.Screen.js');


describe('Call Center Flow', function () {

  var callCenter = new callCenterScreen();
 
  var salesOrderSummary = new salesOrderSummaryScreen();

  it('Cancel Order', function () {

          browser.get(callCenterSalesOrdersListUrl);
            salesOrderSummary.salesOrderSearch("Original Order #", orderId);
            //commons.multiselect();
            browser.sleep(3000);
            callCenter.callCenterSalesOrderSelectGear("View");
            browser.element(by.xpath("//en-icon[@icon='more-vertical']")).click();
           browser.element(by.xpath("//button//span[contains(text(),'Cancel')]")).click();
           browser.sleep(3000);
           browser.element(by.model("isCancelAllLine")).click();
           browser.element(by.model("OrdercancelReason")).sendKeys("NotNeeded");
           browser.element(by.xpath("//button/span[contains(text(),'Confirm')]")).click();
           browser.sleep(3000);
           browser.element(by.xpath("(//small[@class='ng-binding'])[2]")).getText();

           
  });

});
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var jobScreen = require(process.cwd() + '/src/tests/screens/jobs/jobs.summary.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');


describe('jobs Spec : ', function(){

    var commons = new common();
    var job = new jobScreen();
    var salesOrderSummary = new salesOrderSummaryScreen();

    it("running a job", function(){

        browser.get(jobsUrl);
        commons.searchWithCriteria("Name","starts with","capturePaymentAtInvoiceTaskletJobPaypal");
        job.jobsStart();
        browser.sleep(30000);

    });

    it("Invoice search", function(){

         browser.get(invoicesUrl);
         commons.searchWithCriteria("Order Number","ends with",orderId);
         browser.sleep(1000);
         browser.refresh();
         commons.searchWithCriteria("Order Number","ends with",orderId);
        /* var invoiceStatus1= browser.element(by.xpath("//en-label/small[contains(text(),'PAID')]")).getText();
         console.log("invoice status is:"+invoiceStatus1)
         expect(invoiceStatus1).toEqual("PAID");*/ // wrong xpath
	     
         expect(salesOrderSummary.salesOrderStatus()).toEqual('PAID');

         

    });
    
/*
it("running a job", function(){

    browser.get(jobsUrl);
    browser.sleep(6000);
//  route.routeSearch("Name","routeToValidateShipmentConfirmation");
    commons.searchWithCriteria("Name","starts with","capturePaymentAtInvoiceTaskletJobPaypal");
    browser.sleep(2000);
    job.jobsStart();
    browser.sleep(30000);
    
    

});
*/
});
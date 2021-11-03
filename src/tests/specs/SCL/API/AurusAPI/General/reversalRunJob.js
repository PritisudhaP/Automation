var common = require(process.cwd() + '/src/tests/screens/commons.js');

var jobScreen = require(process.cwd() + '/src/tests/screens/jobs/jobs.summary.screen.js');


describe('jobs Spec : ', function(){

    var commons = new common();
    var job = new jobScreen();

    it("running a job", function(){

        browser.get(jobsUrl);
        browser.sleep(6000);
    //  route.routeSearch("Name","routeToValidateShipmentConfirmation");
        commons.searchWithCriteria("Name","starts with","retryPaymentReversalTaskletJob");
        browser.sleep(2000);
        job.jobsStart();
        browser.sleep(30000);
        
        console.log("retryPaymentReversalTaskletJob");

    });

   /* it("Invoice search", function(){

         browser.get(invoicesUrl);
         commons.searchWithCriteria("Order Number","starts with",orderId);
         var invoiceStatus1= browser.element(by.xpath("//en-label/small[contains(text(),'PAID')]")).getText();
         console.log("invoice status is:"+invoiceStatus1)
         expect(invoiceStatus1).toEqual("PAID");

    });*/
    
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
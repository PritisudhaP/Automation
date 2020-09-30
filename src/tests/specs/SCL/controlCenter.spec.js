var controlCenterListScreen = require(process.cwd() + '/src/tests/screens/controlcenter/controlcenterList.screen.js');
var controlCentereditScheduleScreen = require(process.cwd() + '/src/tests/screens/controlcenter/controlcentereditSchedule.screen.js');
var controlCenterviewitmesScreen = require(process.cwd() + '/src/tests/screens/controlcenter/controlcenterviewitems.screen.js');
var controlCenterDeactivateScreen=require(process.cwd() + '/src/tests/screens/controlcenter/controlcenterdeactivate.screen.js');
var salesOrderCreateScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.create.screen.js');
var salesOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/salesOrder/salesOrder.summary.screen.js');
var shipmentRequestsSummaryScreen = require(process.cwd() + '/src/tests/screens/shipmentRequests/shipmentRequests.summary.screen.js');
var siteSummaryScreen= require(process.cwd() + '/src/tests/screens/sites/sites.summary.screen.js');
var sitecreateScreen = require(process.cwd() + '/src/tests/screens/sites/sites.create.screen.js');
var inventorySearchScreen = require(process.cwd() + '/src/tests/screens/inventorySearch/inventorySearch.summary.screen.js');



var common = require(process.cwd() + '/src/tests/screens/commons.js');
var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var jobsSummaryScreen = require(process.cwd() + '/src/tests/screens/jobs/jobs.summary.screen.js');

global.fileContent="";
global.fileContentsOfEditSchedule="";
global.fileContentOfdeactivateSite="";
global.calendarheightofBusiness="";
global.calendarBusiness="";
global.SONumber="";


  describe('Control center  Flow: ', function(){

    var controlCenterList = new controlCenterListScreen();
    var controlCentereditSchedule = new controlCentereditScheduleScreen();
    var controlCenterviewitmes = new controlCenterviewitmesScreen();
    var controlCenterDeactivate = new controlCenterDeactivateScreen();
    var commons = new common();
    var salesOrderCreate = new salesOrderCreateScreen();
    var shipmentRequestsSummary = new shipmentRequestsSummaryScreen();
        var salesOrderSummary = new salesOrderSummaryScreen();
        var mailbox = new mailboxScreen();
    var jobsSummary = new jobsSummaryScreen();
    var siteCreate =new sitecreateScreen();
    var siteSummary = new siteSummaryScreen();
    var inventorySearch = new inventorySearchScreen();



   it('control center with item exclusion - TC0001', function(){

         browser.get(controlCenterUrl);
         browser.sleep(2000);

         //adding below line as in first page not getting the site due to new addition of sites
 element(by.xpath("(//en-icon[@icon='chevron-right'])[2]")).click();
          browser.sleep(2000);
          controlCenterList.clickOnSite();
          browser.sleep(2000);
          controlCenterList.clickOnviewItem();
          browser.sleep(2000);
          controlCenterviewitmes.SearchInTextBox('Priti0101');
          browser.sleep(2000);
          controlCenterviewitmes.clickOnCheckBox();
          controlCenterviewitmes.clickOnShipToCustomerToggle();
          controlCenterviewitmes.clickOnpickUpInStoreToggle();
          controlCenterviewitmes.clickOnApply();
          browser.sleep(2000);
          controlCenterviewitmes.clickOnConfirm();
          browser.sleep(3000);
                browser.get(mailboxUrl);
                browser.sleep(5000);
                mailbox.selectMailboxType("intermediateboxes");
                browser.sleep(2000);
                mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Site-Item-Exclusion");
                browser.sleep(2000);
                mailbox.selectMailbox("Site-Item-Exclusion");
                mailbox.selectMailbox("Site-Item-Exclusion");

                mailbox.refresh();
                 mailbox.msgSelectGear("Edit");
                 browser.sleep(3000);
          var elem = element(by.xpath('//en-icon[@icon="plus"]'));
            browser.actions().mouseMove(elem).perform();
            mailbox.fileView();
           browser.sleep(5000);

      mailbox.fullContentOfObject().then(function(content){
       fileContent=content ;

       console.log("fileContent is "+fileContent);
      });
           browser.wait(function(){
                 return fileContent!= '';
                }).then(function(){
              expect(fileContent).toMatch('("skuId":"Priti0101")');
                         expect(fileContent).toMatch('("pickUpAtStore":false)');
                       expect(fileContent).toMatch('("shipToCustomer":false)');
                });


  browser.get(jobsDefinitionUrl);
   browser.sleep(2000);
   jobsSummary.enterjobNameForSearch('SiteitemExclusion');
   browser.sleep(2000);
   jobsSummary.jobsStart();
   browser.sleep(6000);
   browser.get(jobsExecutionUrl);
   browser.sleep(3000);
   expect(jobsSummary.getNameOfJob()).toMatch('siteitemexclusion');
   expect(jobsSummary.getJobStatus()).toMatch('COMPLETED');
  // expect(jobsSummary.getNameOfJob()).toMatch('');


});




      it('control center with edit schedule - TC0002', function(){
       browser.get(controlCenterUrl);
        browser.sleep(2000);
        //adding below line as in first page not getting the site due to new addition of sites
         element(by.xpath("(//en-icon[@icon='chevron-right'])[2]")).click();
                  browser.sleep(2000);
        controlCenterList.clickOnSite();
        browser.sleep(2000);
        controlCenterList.clickOneditSchedule();
        browser.sleep(3000);
       controlCentereditSchedule.enterMaxOrder(3);
       controlCentereditSchedule.selectstartTime('12:00 am');
       controlCentereditSchedule.selectEndTime('8:00 am');
       controlCentereditSchedule.selcetDailyOption();
       controlCentereditSchedule.enterRecurringDaily(1);
       controlCentereditSchedule.clickOnAddSchedule();
       controlCentereditSchedule.clickOnApplyRule();
       browser.sleep(2000);
       controlCentereditSchedule.clickOnConfirm();
       browser.sleep(3000);


  browser.get(mailboxUrl);
                  browser.sleep(5000);
                  mailbox.selectMailboxType("intermediateboxes");
                  browser.sleep(2000);
                  mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Site-Calendar-Updates");
                  browser.sleep(2000);
                  mailbox.selectMailbox("Site-Calendar-Updates");
                  mailbox.selectMailbox("Site-Calendar-Updates");

                  mailbox.refresh();
                   mailbox.msgSelectGear("Edit");
                   browser.sleep(3000);
            var elem = element(by.xpath('//en-icon[@icon="plus"]'));
              browser.actions().mouseMove(elem).perform();
              mailbox.fileView();
             browser.sleep(5000);

        mailbox.fullContentOfObject().then(function(content){
         fileContentsOfEditSchedule=content ;

         console.log("fileContent is "+fileContentsOfEditSchedule);
        });
             browser.wait(function(){
                   return fileContentsOfEditSchedule!= '';
                  }).then(function(){
                expect(fileContentsOfEditSchedule).toMatch('("maxOrdersPerDay":3)');
                           expect(fileContentsOfEditSchedule).toMatch('("startTime":"00:00")');
                         expect(fileContentsOfEditSchedule).toMatch('("endTime":"08:00")');
                         expect(fileContentsOfEditSchedule).toMatch('("frequency":"Daily")');
                         expect(fileContentsOfEditSchedule).toMatch('Business');
                         expect(fileContentsOfEditSchedule).toMatch('ShipToCustomer');
                         expect(fileContentsOfEditSchedule).toMatch('PickupAtSite');
                  });
        browser.get(jobsDefinitionUrl);
          browser.sleep(2000);
          jobsSummary.enterjobNameForSearch('SiteCalendarUpdates');
          browser.sleep(2000);
          jobsSummary.jobsStart();
          browser.sleep(6000);
          browser.get(jobsExecutionUrl);
          browser.sleep(3000);
          expect(jobsSummary.getNameOfJob()).toMatch('sitecalendarupdates');
          expect(jobsSummary.getJobStatus()).toMatch('COMPLETED');




     browser.get(controlCenterUrl);
            browser.sleep(2000);
            //adding below line as in first page not getting the site due to new addition of sites
             element(by.xpath("(//en-icon[@icon='chevron-right'])[2]")).click();
                      browser.sleep(2000);

          controlCenterList.clickOnSite();

  controlCenterList.verifyHeightOfBusiness().then(function(content){
          calendarheightofBusiness=content ;

           console.log("height  is "+calendarheightofBusiness);
            expect(calendarheightofBusiness).toMatch('80');

          });
          controlCenterList.verifybusinessgraph().then(function(content){
                    calendarBusiness=content ;
                    console.log("value of class is  "+calendarBusiness);
                   expect(calendarBusiness).toMatch('business');
                    });




      });




       it('control center with deactivateSite - TC0003', function(){
       //sales order create

        browser.get(salesOrderUrl);

                   console.log("navigating to sales order list screen");
                   commons.new();
                   browser.driver.sleep(5000);
                   browser.waitForAngular();


                //   salesOrderCreate.setSalesChannel("B2B");
                   salesOrderCreate.attachCustomer();

                   salesOrderCreate.searchCustomer("Name", "Wendy");

                   browser.sleep(2000);
                   salesOrderCreate.selectCustomer();
                   salesOrderCreate.useSelectedCustomer();


                   browser.sleep(3000);
                   salesOrderCreate.addItem();
                   salesOrderCreate.searchProduct("ControlCenter001");
                   salesOrderCreate.searchInPopup();
                   salesOrderCreate.selectSKU();
                   salesOrderCreate.addProduct();

                   salesOrderCreate.addItem();
                   salesOrderCreate.searchProduct("ControlCenter002");
                   salesOrderCreate.searchInPopup();
                   salesOrderCreate.selectSKU();
                   salesOrderCreate.addProduct();



                   salesOrderCreate.saveOption("Save as Draft");

                   salesOrderCreate.salesOrderNumber().then(function(value) {
                       SONumber = value;
                       console.log(SONumber);
                   });

                   browser.sleep(2000)

                   salesOrderCreate.saveOption("Save");
                   browser.sleep(2000)
                   browser.wait(function() {
                       return SONumber != '';
                   }).then(function() {
                       browser.get(salesOrderUrl);
       //                salesOrderSummary.salesOrderSearch("Original Order #", SONumber);
                       commons.searchWithCriteria("Order #","contains",SONumber);

                       commons.multiselect();
                       browser.sleep(3000);

                       salesOrderSummary.salesOrderSelectGear("Release");
                       browser.sleep(3000);
                       expect(salesOrderSummary.salesOrderStatus()).toEqual('RELEASED');
                       });


       // sales order creation end

       browser.get(controlCenterUrl);
        browser.sleep(2000);
        //adding below line as in first page not getting the site due to new addition of sites
         element(by.xpath("(//en-icon[@icon='chevron-right'])[2]")).click();
                  browser.sleep(2000);
        controlCenterList.clickOnSite();
        browser.sleep(2000);
        controlCenterList.clickOnscheduleOneTimeClosure();
        browser.sleep(2000);
        expect(controlCenterDeactivate.pendingOrder()).toEqual('1');
        controlCenterDeactivate.clickDeactivateCheckBox();
        controlCenterDeactivate.clickOnRejectOrderCheckBox();
        controlCenterDeactivate.setReason('Maintenance');
        controlCenterDeactivate.enterNote('test');
        browser.sleep(5000);
        controlCenterDeactivate.clickOnNext();
        browser.sleep(5000);
        controlCenterDeactivate.clickOnNone();
        controlCenterDeactivate.clickOnNext();
        controlCenterDeactivate.clickOnConfirmAndSubmit();
        browser.sleep(2000);
        controlCenterDeactivate.clickOnConfirm();
        browser.sleep(2000);



        //mailbox
         browser.get(mailboxUrl);
                          browser.sleep(5000);
                          mailbox.selectMailboxType("intermediateboxes");
                          browser.sleep(2000);
                          mailbox.searchMailboxWithinType("pinnedIntermediateboxes","Site-Status-Update");
                          browser.sleep(6000);
                          mailbox.selectMailbox("Site-Status-Update");
                          mailbox.selectMailbox("Site-Status-Update");

                          mailbox.refresh();
                           mailbox.msgSelectGear("Edit");
                           browser.sleep(3000);
                    var elem = element(by.xpath('//en-icon[@icon="plus"]'));
                      browser.actions().mouseMove(elem).perform();
                      mailbox.fileView();
                     browser.sleep(5000);

                mailbox.fullContentOfObject().then(function(content){
                 fileContentOfdeactivateSite=content ;

                 console.log("fileContent is "+fileContentsOfEditSchedule);
                });
                     browser.wait(function(){
                           return fileContentOfdeactivateSite!= '';
                          }).then(function(){
                        expect(fileContentOfdeactivateSite).toMatch('("deactivationReason":"Maintenance")');
                                   expect(fileContentOfdeactivateSite).toMatch('("notes":"test")');
                                 expect(fileContentOfdeactivateSite).toMatch('("refName":"automationcontrolcenter")');
                                 expect(fileContentOfdeactivateSite).toMatch('("rejectOrder":true)');

                          });


               browser.get(jobsDefinitionUrl);
                  browser.sleep(2000);
                  jobsSummary.enterjobNameForSearch('siteDeactivation');
                  browser.sleep(2000);
                  jobsSummary.jobsStart();
                  browser.sleep(20000);
                  browser.get(jobsExecutionUrl);
                  browser.sleep(8000);
                  expect(jobsSummary.getNameOfJob()).toMatch('sitedeactivation');
                  expect(jobsSummary.getJobStatus()).toMatch('COMPLETED');



               browser.get(shipmentRequestsUrl);
               shipmentRequestsSummary.shipmentRequestSearch("Order #", SONumber);
               browser.sleep(5000);


              expect(shipmentRequestsSummary.shipmentRequestStatus()).toEqual('REJECTED');



              browser.get(controlCenterUrl);
                      browser.sleep(2000);
                      //adding below line as in first page not getting the site due to new addition of sites
                       element(by.xpath("(//en-icon[@icon='chevron-right'])[2]")).click();
                                browser.sleep(2000);
                       controlCenterList.clickOnSite();
                         browser.sleep(5000);

              expect(controlCenterList.getLabel()).toEqual('DISABLED');

              //Navigate to inventory lookup and check ATS and reserved qty
              browser.get(inventorySearchUrl);
                              inventorySearch.enterSite("AutomationControlCenter");
                              inventorySearch.addSKU();
                              commons.searchWithCriteria("SKU","contains","ControlCenter001");
                              browser.sleep(2000);
                              inventorySearch.selectSKU();
                              inventorySearch.addProduct();
                              browser.sleep(2000);
                              inventorySearch.enterQty("1");
                              inventorySearch.searchInventory();
                              browser.sleep(2000);
                              expect(inventorySearch.getAvailableQty()).toEqual('100');
                              expect(inventorySearch.getReservedQty()).toEqual('0');
             browser.get(inventorySearchUrl);
                                           inventorySearch.enterSite("AutomationControlCenter");
                                           inventorySearch.addSKU();
                                           commons.searchWithCriteria("SKU","contains","ControlCenter002");
                                           browser.sleep(2000);
                                           inventorySearch.selectSKU();
                                           inventorySearch.addProduct();
                                           browser.sleep(2000);
                                           inventorySearch.enterQty("1");
                                           inventorySearch.searchInventory();
                                           browser.sleep(2000);
                                           expect(inventorySearch.getAvailableQty()).toEqual('50');
                                           expect(inventorySearch.getReservedQty()).toEqual('0');



          //site page to enaable site
        browser.get(sitesUrl);
          browser.sleep(3000);

          siteSummary.siteSearch('name','AutomationControlCenter');
          browser.sleep(3000);
          siteSummary.siteSelectGear('Edit');
          browser.sleep(3000);
          siteCreate.clickOnEdit();
          siteCreate.clickOnActiveCheckBox();
          siteCreate.clickOnSave();
          browser.sleep(3000);






        });
})

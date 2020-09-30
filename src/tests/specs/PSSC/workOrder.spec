var workOrderCreateScreen = require(process.cwd() + '/src/tests/screens/workOrder/workOrder.create.screen.js');
var workOrderEditScreen = require(process.cwd() + '/src/tests/screens/workOrder/workOrder.edit.screen.js');
var workOrderSummaryScreen = require(process.cwd() + '/src/tests/screens/workOrder/workOrder.summary.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');

global.WONumber="";

describe('Work Order : ', function(){
    var commons = new common();
    var workOrderCreate = new workOrderCreateScreen();
    var workOrderEdit = new workOrderEditScreen();
    var workOrderSummary = new workOrderSummaryScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();
    
    var today = new Date();
    var dd = today.getDate().toString();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear().toString();

    it('Work order flow with Inventory based metering - TC0001', function(){

        browser.get(workOrderUrl);
        workOrderCreate.newworkOrder();
        workOrderCreate.enterTitle("TC0001");
        workOrderCreate.selectState("Open");
        workOrderCreate.selectCustomer("MUSICA");
        workOrderCreate.selectSite("Ypsilanti");
        workOrderCreate.saveworkOrder();
        
        workOrderCreate.getWorkOrderNumber().then(function(value) {
                WONumber = value;
                console.log(WONumber);
        });

        browser.wait(function() {
            return WONumber != '';
        }).then(function() {        
            browser.get(workOrderUrl);
            browser.sleep(1000); 
            workOrderSummary.workOrdersSearch("Work Order Number",WONumber);
            browser.sleep(1000);
            workOrderSummary.workOrderSelect();
            browser.sleep(1000); 
            workOrderEdit.createWorkOrderActivity("ADJUST INVENTORY UP","TC0001 ADJUST INVENTORY UP", "Pending","inventory_based","0-0-1");
            browser.sleep(3000); 
            workOrderEdit.selectWorkOrderOptions("Start");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Start");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Complete");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Approve");
            browser.sleep(1000);
            workOrderEdit.selectWorkOrderOptions("Complete");

            browser.get(workOrderUrl);
            browser.sleep(1000);
            workOrderSummary.workOrdersSearch("Work Order Number",WONumber);

            
            expect(workOrderSummary.workOrderStatus()).toEqual("CLOSED");

            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();

            customersSummary.customersSearch("First Name","MUSICA");
            browser.sleep(3000);

            customersSummary.customersSelectGear("Edit");

            customerEdit.selectActivityLedgerTab();
            var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
            browser.actions().mouseMove(elem).perform();

            browser.sleep(2000);
            customerEdit.selectActivityLedgerAdjustmentsTab();
            browser.sleep(2000);

            customerEdit.activityLedgerGetCharges("1").then(function(text) {
                expect(text.trim()).toEqual('$0.20');
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(dd);
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(yyyy);
            });
        });    
    });

    it('Work order flow with Time based metering - TC0002', function(){

        browser.get(workOrderUrl);
        workOrderCreate.newworkOrder();
        workOrderCreate.enterTitle("TC0002");
        workOrderCreate.selectState("Open");
        workOrderCreate.selectCustomer("MUSICA");
        workOrderCreate.selectSite("Ypsilanti");
        workOrderCreate.saveworkOrder();
        
        workOrderCreate.getWorkOrderNumber().then(function(value) {
                WONumber = value;
                console.log(WONumber);
        });

        browser.wait(function() {
            return WONumber != '';
        }).then(function() {        
            browser.get(workOrderUrl);
            browser.sleep(1000); 
            workOrderSummary.workOrdersSearch("Work Order Number",WONumber);
            browser.sleep(1000);
            workOrderSummary.workOrderSelect();
            browser.sleep(1000);  
            workOrderEdit.createWorkOrderActivity("ADDRESS CORRECT \ RE-BILL","TC0002 ADDRESS CORRECT \ RE-BILL", "Pending","timeentry_based","3");
            browser.sleep(3000); 
            workOrderEdit.selectWorkOrderOptions("Start");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Start");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Complete");
            browser.sleep(1000);
            workOrderEdit.selectActivityOptions("Approve");
            browser.sleep(1000);
            workOrderEdit.selectWorkOrderOptions("Complete");

            browser.get(workOrderUrl);
            browser.sleep(1000);
            workOrderSummary.workOrdersSearch("Work Order Number",WONumber);

            
            expect(workOrderSummary.workOrderStatus()).toEqual("CLOSED");

            browser.get(customersUrl);
            browser.sleep(2000);
            commons.multiselect();

            customersSummary.customersSearch("First Name","MUSICA");
            browser.sleep(3000);

            customersSummary.customersSelectGear("Edit");

            customerEdit.selectActivityLedgerTab();
            var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
            browser.actions().mouseMove(elem).perform();

            browser.sleep(2000);
            customerEdit.selectActivityLedgerAdjustmentsTab();
            browser.sleep(2000);

            customerEdit.activityLedgerGetCharges("1").then(function(text) {
                expect(text.trim()).toEqual('$0.30');
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(dd);
            });

            customerEdit.activityLedgerDate().then(function(value) {
               expect(value.trim()).toMatch(yyyy);
            });
        });    
    });


})

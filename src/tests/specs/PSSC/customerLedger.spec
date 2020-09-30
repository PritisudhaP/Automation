var customersCreateScreen = require(process.cwd() + '/src/tests/screens/customers/customers.create.screen.js');
var customersEditScreen = require(process.cwd() + '/src/tests/screens/customers/customers.edit.screen.js');
var customersSummaryScreen = require(process.cwd() + '/src/tests/screens/customers/customers.summary.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Ledger and Statement Flow  : ', function(){
    var customersCreate = new customersCreateScreen();
    var customersSummary = new customersSummaryScreen();
    var customerEdit = new customersEditScreen();

    var commons = new common();


    it('Ledger and Statement Flow - TC0001', function(){


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
    
        if(dd<10){
            dd='0'+dd;
        }
    
        if(mm<10){
           mm='0'+mm;
        }

        var formattedToday = mm+'/'+dd+'/'+yyyy;



        browser.get(customersUrl);
        browser.sleep(2000);
        commons.multiselect();

        customersSummary.customersSearch("First Name","TC0001");
        browser.sleep(3000);

        customersSummary.customersSelectGear("Edit");

        customerEdit.selectDepositLedgerTab();
        var elem = element(by.xpath('(//button//en-icon[@icon="chevron-left-double"])[1]'));
        browser.actions().mouseMove(elem).perform();
        browser.sleep(2000);
        customerEdit.selectDepositLedgerAdjustmentsTab();
        browser.sleep(2000);
        customerEdit.selectDepositLedgerOptions(); 
        browser.sleep(2000);
        customerEdit.selectAddAdjustments();
        browser.sleep(2000);
        customerEdit.enterAdjustmentType("Charge");
        customerEdit.enterAdjustmentAmount("10");
        //customerEdit.enterAdjustmentDate(formattedToday);
        customerEdit.enterAdjustmentDesc("test");
        customerEdit.createAdjustment();
        browser.sleep(2000);
        customerEdit.selectDepositLedgerOptions();
        browser.sleep(2000);
        customerEdit.createDepositStatement();
        browser.sleep(2000);
        customerEdit.generateStatement();
        browser.sleep(2000);
        customerEdit.selectDepositLedgerStatementsTab();
        customerEdit.depositLedgerRefresh();
        expect(customerEdit.depositStatementGetStatus()).toEqual('OPEN');
 
        });
})

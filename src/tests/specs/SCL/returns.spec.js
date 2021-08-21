var returnsCreateScreen = require(process.cwd() + '/screens/returns/returns.create.screen.js');
var returnsEditScreen= require(process.cwd() + '/screens/returns/returns.edit.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/screens/returns/returns.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');
global.RMANumber="";

describe('Returns Flow  : ', function(){
    var returnsCreate = new returnsCreateScreen();
    var returnsEdit = new returnsEditScreen();
    var returnsSummary = new returnsSummaryScreen();
    var commons = new common();

        it('Returns that release successfully - TC0001', function(){
             
            browser.get(returnsUrl);

            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            returnsCreate.orderReturn(); 
            commons.customerLookup();
           
            commons.searchWithCriteria("Name","contains","TC0001");
 
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
           
            returnsCreate.selectOrder();
            browser.sleep(2000);
            returnsCreate.selectFirstLineItem();
            browser.sleep(2000);
 
            returnsCreate.returnLocationSelect("Joliet-DC");
            returnsCreate.saveReturns();
             
            returnsCreate.returnReason("1", "DAMAGED");

            browser.sleep(2000);           
 
            returnsCreate.creditType("REFUND");
            returnsEdit.saveReturns();

            browser.sleep(3000);
          
            returnsCreate.getRMANumber().then(function(value) {
                RMANumber = value.substring(34,44);;
            });
            
            browser.wait(function() {
                return RMANumber != '';
            }).then(function() {
                browser.get(returnsUrl);
                console.log(RMANumber); 
                returnsSummary.returnsSearch("RMA Number", RMANumber);
                browser.sleep(2000);
                returnsSummary.returnsSelectGear("Release");
                //returnsSummary.returnsSearchRemove("1");
                expect(returnsSummary.returnsStatus()).toEqual('RELEASED');
            });    
             
        });
        
})


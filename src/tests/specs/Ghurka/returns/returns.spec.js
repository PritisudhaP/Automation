var returnsCreateScreen = require(process.cwd() + '/src/tests/screens/returns/returns.create.screen.js');
var returnsSummaryScreen = require(process.cwd() + '/src/tests/screens/returns/returns.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
global.RMANumber="";

describe('Returns Flow  : ', function(){
    var returnsCreate = new returnsCreateScreen();
    var returnsSummary = new returnsSummaryScreen();
    var commons = new common();

        it('Returns that release successfully - TC0001', function(){
             
            browser.get(returnsUrl);

            console.log("navigating to Returns  new screen"); 
            commons.new(); 
            browser.driver.sleep(2);
            browser.waitForAngular();

            returnsCreate.blindReturn(); 
            returnsCreate.channelSelect("Retail_Ecommerce");
            commons.customerLookup();
            
            returnsCreate.searchCustomer("Email","sbabu@3test.com");
            commons.search();
            returnsCreate.selectCustomer();
            returnsCreate.useSelectedCustomer();
            
            returnsCreate.returnLocationSelect("Total Reliance - DC");
            returnsCreate.saveReturns();
             
            returnsCreate.productLookup();
            returnsCreate.enterProductName("ZZGGA230BTTB");           
            returnsCreate.searchModalWindow();
            returnsCreate.selectProduct();
            returnsCreate.addProduct();
            returnsCreate.returnReason("1", "DAMAGED");

            browser.sleep(2000);           
 
            returnsCreate.productLookup();
            returnsCreate.enterProductName("ZZGGA230TNCZ");           
            returnsCreate.searchModalWindow();
            browser.sleep(2000);
            returnsCreate.selectProduct();
            returnsCreate.addProduct();
            returnsCreate.returnReason("2", "DOES NOT FIT");
            
            returnsCreate.creditType("REFUND");
            returnsCreate.saveReturns();

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


var functionaldomainsCreateScreen = require(process.cwd() + '/src/tests/screens/functionaldomains/functionaldomains.create.screen.js');
var functionaldomainsSummaryScreen = require(process.cwd() + '/src/tests/screens/functionaldomains/functionaldomains.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('Functional Domains creation Flow  : ', function(){
    var functionaldomainsCreate = new functionaldomainsCreateScreen();
    var functionaldomainsSummary = new functionaldomainsSummaryScreen();
    var commons = new common();

        it('Create a Functional Domain successfully - TC0001', function(){
             
            browser.get(functionaldomainsUrl);

            console.log("navigating to functional domains screen"); 
            browser.sleep(2000);         
            functionaldomainsCreate.newFunctionalDomain();
            functionaldomainsCreate.enterFDRefName("SarathFuncDomainTC0001");
            functionaldomainsCreate.enterFDDisplayName("SarathFuncDomainTC0001");
            functionaldomainsCreate.enterDataDomain(browser.params.dataDomain);
            functionaldomainsCreate.addFunctionalDomain();
            functionaldomainsCreate.enterActionName("TestAction");
            functionaldomainsCreate.saveAction();
            browser.sleep(1000);
            functionaldomainsCreate.addFunctionalDomain();
            functionaldomainsCreate.enterActionName("TestAction2");
            functionaldomainsCreate.saveAction();
            browser.sleep(1000);
            functionaldomainsCreate.createFunctionalDomain();
            browser.sleep(5000);
        });

      
        it('Search and Delete functional domains successfully - TC0002', function(){
           browser.get(functionaldomainsUrl);
           functionaldomainsSummary.functionaldomainsSearch("Name","SarathFuncDomainTC0001");
           browser.sleep(2000);
           functionaldomainsSummary.functionaldomainsSelectGear("Delete");
        });      

})

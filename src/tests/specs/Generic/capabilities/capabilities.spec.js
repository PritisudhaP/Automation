var capabilitiesCreateScreen = require(process.cwd() + '/screens/capabilities/capabilities.create.screen.js');
var capabilitiesSummaryScreen = require(process.cwd() + '/screens/capabilities/capabilities.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('capabilities creation Flow  : ', function(){
    var capabilitiesCreate = new capabilitiesCreateScreen();
    var capabilitiesSummary = new capabilitiesSummaryScreen();
    var commons = new common();

        it('Create a capability successfully - TC0001', function(){
             
            browser.get(capabilitiesUrl);
            console.log("navigating to capabilities screen"); 
           
            capabilitiesCreate.newCapability();
            capabilitiesCreate.enterCapabilityName("SarathCapabilityTC0001");
            capabilitiesCreate.addFunctionalDomain();
            capabilitiesCreate.selectFunctionalDomain("Account");
            capabilitiesCreate.selectAction("List");
            capabilitiesCreate.moveSelectedActions();
            capabilitiesCreate.saveAction();
            capabilitiesCreate.createCapability();
            browser.sleep(2000);
        });

      
        it('Search and Delete capabilities successfully - TC0002', function(){
            browser.get(capabilitiesUrl);
            browser.sleep(2000);
            capabilitiesSummary.capabilitiesSearch("Name", "SarathCapabilityTC0001");
            browser.sleep(2000);
            capabilitiesSummary.capabilitiesSelectGear("Delete");
        });      

})

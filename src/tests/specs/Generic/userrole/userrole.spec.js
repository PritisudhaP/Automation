var userroleCreateScreen = require(process.cwd() + '/screens/userrole/userrole.create.screen.js');
var userroleSummaryScreen = require(process.cwd() + '/screens/userrole/userrole.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('User Role creation Flow  : ', function(){
    var userroleCreate = new userroleCreateScreen();
    var userroleSummary = new userroleSummaryScreen();
    var commons = new common();

        it('Create a User Role successfully - TC0001', function(){
             
            browser.get(userroleUrl);

            console.log("navigating to user role screen"); 
            browser.sleep(2000);           
            userroleCreate.newUserRole();
            userroleCreate.enterRoleName("SarathUserRoleTC0001");
            userroleCreate.addCapability();
            userroleCreate.enterPermittedDomain(browser.params.dataDomain);
            userroleCreate.enterCapability("AccountAdmin");
            browser.sleep(3000);
            userroleCreate.createUserRole();
            browser.sleep(6000);
        });

      
        it('Search and Delete User role successfully - TC0002', function(){
           browser.get(userroleUrl);
           browser.sleep(2000);
           userroleSummary.userroleSearch("Name","SarathUserRoleTC0001");
           browser.sleep(2000);
           userroleSummary.userroleSelectGear("Delete");
        });      

})

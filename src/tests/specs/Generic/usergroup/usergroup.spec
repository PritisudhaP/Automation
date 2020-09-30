var usergroupCreateScreen = require(process.cwd() + '/src/tests/screens/usergroup/usergroup.create.screen.js');
var usergroupSummaryScreen = require(process.cwd() + '/src/tests/screens/usergroup/usergroup.summary.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');

describe('User Group creation Flow  : ', function(){
    var usergroupCreate = new usergroupCreateScreen();
    var usergroupSummary = new usergroupSummaryScreen();
    var commons = new common();

        it('Create a User Group successfully - TC0001', function(){
             
            browser.get(usergroupUrl);

            console.log("navigating to user group screen"); 
            browser.sleep(2000);           
            usergroupCreate.newusergroup();
            usergroupCreate.enterGroupName("SarathUserGroupTC0001");
            usergroupCreate.selectRole("admin");
            usergroupCreate.createUserGroup();
            browser.driver.sleep(20000);
        });

        it('Search and Delete User Group successfully - TC0002', function(){
            browser.get(usergroupUrl);
            browser.sleep(2000);
            usergroupSummary.usergroupSearch("Name","SarathUserGroupTC0001");
            browser.sleep(2000);
            usergroupSummary.usergroupSelectGear("Delete");
        });      

})

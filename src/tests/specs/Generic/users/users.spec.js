var usersCreateScreen = require(process.cwd() + '/screens/users/users.create.screen.js');
var usersSummaryScreen = require(process.cwd() + '/screens/users/users.summary.screen.js');
var common = require(process.cwd() + '/screens/commons.js');

describe('Users creation Flow  : ', function(){
    var usersCreate = new usersCreateScreen();
    var usersSummary = new usersSummaryScreen();
    var commons = new common();

        it('Create a User successfully - TC0001', function(){
             
            browser.get(usersUrl);

            console.log("navigating to users screen"); 
            browser.sleep(2000);           
            usersCreate.newuser();
            usersCreate.enterFirstName("SarathFNTC0001");
            usersCreate.enterLastName("SarathLNTC0001");
            usersCreate.enterEmail("sarathtc0001@test.com");
            usersCreate.enterPhone("111-222-3333");
            usersCreate.selectGroup("Admins");
            usersCreate.enterUserId("sarathtc0001");
            usersCreate.enterPassword("password123");
            usersCreate.enterConfirmPassword("password123");
            usersCreate.createUser();
            browser.driver.sleep(20000);
        });

        it('Search and Delete Users successfully - TC0002', function(){
            browser.get(usersUrl);
            browser.sleep(2000);
            usersSummary.usersSearch("UserId","sarathtc0001");
            browser.sleep(2000);
            usersSummary.usersSelectGear("Delete");
        }); 

})

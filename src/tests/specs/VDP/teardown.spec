var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var vendorManagementSummaryScreen = require(process.cwd() + '/src/tests/screens/vendorManagement/vendor.summary.screen.js');
var usersSummaryScreen = require(process.cwd() + '/src/tests/screens/users/users.summary.screen.js');
var usergroupSummaryScreen = require(process.cwd() + '/src/tests/screens/usergroup/usergroup.summary.screen.js');
var userroleSummaryScreen = require(process.cwd() + '/src/tests/screens/userrole/userrole.summary.screen.js');
var domainPolicySummaryScreen = require(process.cwd() + '/src/tests/screens/domainPolicy/domainPolicy.summary.screen.js');

var productSummaryScreen = require(process.cwd() + '/src/tests/screens/product/product.summary.screen.js');
var itemMasterSummaryScreen = require(process.cwd() + '/src/tests/screens/itemMaster/itemMaster.summary.screen.js');

var priceBookSummaryScreen = require(process.cwd() + '/src/tests/screens/pricebookManagement/pricebook.summary.screen.js');


var filesScreen = require(process.cwd() + '/src/tests/screens/files/files.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');



describe('Tear down flow : ', function(){
    var loginScreen = new loginPage();
    var vendorSummary = new vendorManagementSummaryScreen();
    var usersSummary = new usersSummaryScreen();
    var usergroupSummary = new usergroupSummaryScreen();
    var userroleSummary = new userroleSummaryScreen();
    var domainPolicySummary = new domainPolicySummaryScreen();
    var productSummary = new productSummaryScreen();
    var itemMasterSummary = new itemMasterSummaryScreen();
    var priceBookSummary = new priceBookSummaryScreen();
    var files = new filesScreen();
    var commons = new common();


        it(' Cleanup - TearDown0001', function(){


            browser.get(priceBookUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            priceBookSummary.priceBookSearch("Name","tc0001");
            browser.sleep(1000);
            priceBookSummary.priceBookSelectGear("Delete");

            browser.get(itemMasterUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            itemMasterSummary.itemMasterSearch("Name","tc0001");
            browser.sleep(1000);
            itemMasterSummary.itemMasterSelectGear("Delete");

            browser.get(vendorManagementUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            vendorSummary.vendorSearch("Name","tc0001");
            browser.sleep(1000);
            vendorSummary.vendorSelectGear("Delete");
          
            browser.get(filesUrl);
            browser.sleep(3000);
            files.select("vendors");
            browser.sleep(1000);
            files.filesSearch("Name","sarathtc0001catsllc-home");
            browser.sleep(1000);
            files.filesGearSelect("sarathtc0001catsllc-home","Delete");       
            browser.sleep(4000);
    
            browser.get(productUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            productSummary.productSearch("SKU","tc0001");
            browser.sleep(1000);
            productSummary.productSelectGear("Delete");
 
            browser.get(domainPolicyUrl);
            browser.sleep(3000);
            domainPolicySummary.domainPolicySearch("Name","tc0001");
            browser.sleep(1000);
            domainPolicySummary.domainPolicySelectGear("Delete");
                        
            browser.get(userroleUrl);
            browser.sleep(3000);
            userroleSummary.userroleSearch("Name","tc0001");
            browser.sleep(1000);
            userroleSummary.userroleSelectGear("Delete");
            
            browser.get(usergroupUrl);
            browser.sleep(3000);
            usergroupSummary.usergroupSearch("Name","tc0001");
            browser.sleep(1000);
            usergroupSummary.usergroupSelectGear("Delete");
            
            browser.get(usersUrl);
            browser.sleep(3000);
            usersSummary.usersSearch("Email","tc0001");
            browser.sleep(1000);
            usersSummary.usersSelectGear("Delete");          


            browser.get(priceBookUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            priceBookSummary.priceBookSearch("Name","tc0002");
            browser.sleep(1000);
            priceBookSummary.priceBookSelectGear("Delete");

            browser.get(itemMasterUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            itemMasterSummary.itemMasterSearch("Name","tc0002");
            browser.sleep(1000);
            itemMasterSummary.itemMasterSelectGear("Delete");

            browser.get(vendorManagementUrl);
            browser.sleep(3000);
            commons.multiselect();
            browser.sleep(1000);
            vendorSummary.vendorSearch("Name","tc0002");
            browser.sleep(1000);
            vendorSummary.vendorSelectGear("Delete");


            browser.get(filesUrl);
            browser.sleep(3000);
            files.select("vendors");
            files.filesSearch("Name","sarathtc0002catsllc-home");
            browser.sleep(1000);
            files.filesGearSelect("sarathtc0002catsllc-home","Delete");
            browser.sleep(4000);

            browser.get(domainPolicyUrl);
            browser.sleep(3000);
            domainPolicySummary.domainPolicySearch("Name","tc0002");
            browser.sleep(1000);
            domainPolicySummary.domainPolicySelectGear("Delete");

            browser.get(userroleUrl);
            browser.sleep(3000);
            userroleSummary.userroleSearch("Name","tc0002");
            browser.sleep(1000);
            userroleSummary.userroleSelectGear("Delete");

            browser.get(usergroupUrl);
            browser.sleep(3000);
            usergroupSummary.usergroupSearch("Name","tc0002");
            browser.sleep(1000);
            usergroupSummary.usergroupSelectGear("Delete");

            browser.get(usersUrl);
            browser.sleep(3000);
            usersSummary.usersSearch("Email","tc0002");
            browser.sleep(1000);
            usersSummary.usersSelectGear("Delete");

        });

        it('Logout - TearDown0002', function(){
            loginScreen.logout();
        });


})

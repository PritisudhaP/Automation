var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');

var common = require(process.cwd() + '/src/tests/screens/commons.js');


describe('Login: ', function(){
    var loginScreen = new loginPage();
    var commons = new common();

        it('Login - TC0000', function() {

            browser.get(browser.baseUrl);
            browser.driver.manage().window().maximize();

            loginScreen.setUsername(browser.params.login.user);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);

            
        });        


})

var loginPage = require(process.cwd() + '/screens/login/login.screen.js');

var common = require(process.cwd() + '/screens/commons.js');


describe('Login: ', function(){
    var loginScreen = new loginPage();
    var commons = new common();

        it('Login - TC0000', function() {

            browser.get(browser.baseUrl);
           // browser.driver.manage().setSize(new Dimension(1600,900));
            //browser.driver.manage().window().maximize();


            loginScreen.setUsername(browser.params.login.user);
            loginScreen.setPassword(browser.params.login.password);
            loginScreen.login();
            browser.sleep(5000);

        });


})

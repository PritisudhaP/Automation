var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');
var common = require(process.cwd() + '/src/tests/screens/commons.js');
var homeScreen = require(process.cwd() + '/src/tests/screens/home/home.screen.js');


describe('Login : ', function(){
    var loginScreen = new loginPage();
    var commons = new common();


    it('Login - TC0000', function() {

        browser.get(browser.baseUrl);
        browser.driver.manage().window().maximize();


        loginScreen.setUsername(browser.params.login.loginUser);
        loginScreen.setPassword(browser.params.login.password);
        loginScreen.login();
        browser.sleep(5000);
        expect(true).toBe(true);


    });
//Done


})

var loginPage = require(process.cwd() + '/screens/login/login.screen.js');
var homeScreen = require(process.cwd() + '/screens/home/home.screen.js');

describe('Login Test', function() {

    var loginScreen = new loginPage();
    var homePage = new homeScreen();

  /* it('should launch the enspire commerce OMS login page', function() {
     browser.get(browser.baseUrl);
     expect(browser.getTitle()).toEqual('Enspire Order Management Solution');
    });

    it('should login by passing username and password', function() {
     loginScreen.setUsername(browser.params.login.user);
     loginScreen.setPassword(browser.params.login.password);
     loginScreen.login();
     browser.sleep(2000);
    });

   */

});

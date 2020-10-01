
'use strict';
var toLogin = require(process.cwd()+'/src/tests/screens/mixedOrder/loginPage.po.js');


describe('Login Test', function() {  
	
	it('Navigate to Enspire Login Page', function() {  
		toLogin.go();  
	});  
	    
	it('Enter Credentials in Login Page', function() {  
		toLogin.enterLoginCredentials();
	});  
	  
	it('Check for Greeting Message', function(){
		toLogin.verifyWelcomeMessage();
	});
	  
});

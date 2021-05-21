
'use strict';
//const { browser } = require("protractor");
var toLogin = require(process.cwd()+'/screens/mixedOrder/loginPage.po.js');
//var salesOrderEditScreen = require(process.cwd() + '/screens/salesOrder/salesOrder.edit.screen.js');

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

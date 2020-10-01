
'use strict'; 
var dataFile = require(process.cwd()+'/src/tests/autoFiles/mixedOrderData.json');

module.exports = {  
    loginLocators: {  
		userName : element(by.id('userName')),
		userPassword : element(by.model('loginForm.password')),
		loginButton : element(by.className('button-primary en-button')),
		greeting : element(by.className('text-primary capitalized ng-binding')) 
    },  
      
    
    go: function() {	//Naviagte to Enspire URL
    	browser.get(dataFile.url);  
        browser.waitForAngular();  
    },  
      
    
    enterLoginCredentials: function() {	//Login to Enspire  
        
    	var loginLoc = this.loginLocators;  
         
        loginLoc.userName.sendKeys(dataFile.usrName);  
        loginLoc.userPassword.sendKeys(dataFile.password);  
        loginLoc.loginButton.click();
    },
    
    
    verifyWelcomeMessage: function(greetingsText){ 	//Compare the Greeting Message
    	var loginLoc = this.loginLocators;
    	expect(loginLoc.greeting.getText()).toEqual(dataFile.greetings);
    }
    
};


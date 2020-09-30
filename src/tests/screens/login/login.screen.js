module.exports =function(){
    
    this.username =  element(by.xpath('//input[@placeholder="Username"]'));
    this.password = element(by.xpath('(//input[@placeholder="Password"])[1]'));
    this.loginButton = element(by.buttonText('Login'));

    this.userMenuButton = element(by.xpath('(//div[contains(@class,"user-menu")])[1]'));
    this.logoutButton = element(by.xpath('//a[contains(text(),"Log out")]'));
    
    this.setUsername = function(username){
        this.username.clear();
        return this.username.sendKeys(username);
    }
    
    this.setPassword = function(password){
        this.password.clear();
        return this.password.sendKeys(password);
    }
    
    this.login=function(){
     this.loginButton.click();   
    }

   this.logout=function(){
       this.userMenuButton.click();
       this.logoutButton.click();
   }
    
}

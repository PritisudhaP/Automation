var using = require('jasmine-data-provider');

describe("test names", function(){

  //  using([{a: Hermoine Granger}], function (data) {
    it('test data provider', function () {
        browser.get("http://www.way2automation.com/angularjs-protractor/banking/#/login");
        element(by.xpath("//button[contains(text(),'Customer Login')]")).click();

        
       
        

    });
});

//});




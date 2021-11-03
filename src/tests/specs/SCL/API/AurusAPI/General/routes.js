const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

describe("routes running", function () {
   
    it("Start the routes", done =>{
        var options = {
         method: 'GET',
         url: browser.params.APIRequest+'/routing/routeDef/invoiceForShipments/start',
         
         headers: {
             'Content-Type': 'application/json',
             'Authorization': 'Bearer '+token
         },
         
         
         };
         options.json = true;
         request(options, function (error, response, body) {
            
             var errors = error;
             console.log('statusCode:', response && response.statusCode);
             
              console.log('body of route ', response.body);
              console.log('route is running');
              browser.sleep(15000);

             done();
             
         });

 });


 it("Start the routes", done =>{
    var options = {
     method: 'GET',
     url: browser.params.APIRequest+'/routing/routeDef/invoiceForShipments/stop',
     headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer '+token
     },
      
     };
     options.json = true;
     request(options, function (error, response, body) {
         var errors = error;
         console.log('statusCode:', response && response.statusCode);
         console.log('body of route ', response.body);
              console.log('route is Stopped');
         done();
        

     });

});

});








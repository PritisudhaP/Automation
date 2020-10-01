const apiResource = require("protractor-api-resource").ProtractorApiResource;
var restapitest = require(process.cwd() + '/specs/SCL/restapitest.js');
 
var request = require('request');
//var requestId=newGlobalVar;
 
describe("test", function () {
   // var restapitestid = new restapitest();
 
   
   
          it("create SO", done =>{
            console.log("start");
            console.log("response from first request is "+orderId);
           // var requestId= newGlobalVar
           
           var options = {
            method: 'POST',
            url: 'https://project0-qa.enspirecommerce.com/api/v1/order/detail',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer cc1210f0-6791-4a08-bc49-2bf837c68a4a'
            },
           // console.log("my variable:" + myVar);
             body: {
                "orderOrganization": "TheHonestKitchen-Organization-",
                "orderNumber": orderId,
                "orderTransactionType": "sales"
              }
            };
            options.json = true;
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
            //console.log('body:', body);//print only if needed, but stringify before u console it
            var orderDetailsJson = JSON.stringify(body);
           // console.log('<<<<<<<<<<<< Order Details Json@@@@@@@@:', orderDetailsJson);
            global.shipmentIdnumber=body.shipments[0].shipmentId;
            console.log("shipment id is "+shipmentIdnumber);
 
                
                
                //return errors;
                done();
    
            });
         
          
 
    });
            
        
 
});
const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');


describe("release the order", function () {




          it("release the order", done =>{
           var options = {
            method: 'POST',
            url: 'https://project0-qa.enspirecommerce.com/api/v1/salesOrder/releaseOrders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
             body: [
                newGlobalVar
              ]
            };
            options.json = true;
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                 console.log('body of release order ', body);
                done();

            });




    });







});








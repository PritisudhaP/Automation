const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');


describe("get the Fr details", function () {



          it("get the FR details", done =>{

           var options = {
            method: 'GET',
            url: 'https://project0-qa.enspirecommerce.com/api/v1/shipmentRequest/bySalesOrderId/newGlobalVar',
            headers: {
                'Content-Type': 'application/json',
               'Authorization': 'Bearer '+token
            },

            }
            options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
              console.log("id is from fr details "+body.items[0].id);
              console.log("shipment number is fom fr details "+body.items[0].header.shipmentRequestNumber);
              global.shipmentRequestNumber=body.items[0].header.shipmentRequestNumber;
                done();

            });



    });



});

const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
global.order="";


describe("release the order", function () {

          it("release the order", done =>{
           var options = {
            method: 'POST',
            url: browser.params.APIRequest+'/salesOrder/releaseOrders',
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
                //console.log('body of release order ', body);
                done();

            });
    })
          it("get the FR details", done =>{

              var options = {
               method: 'GET',
               url: browser.params.APIRequest+'/shipmentRequest/bySalesOrderId/'+newGlobalVar,
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
                 console.log("the request body is ", body);
                 console.log("shipment number is fom fr details "+body.items[0].header.shipmentRequestNumber);
                 global.shipmentRequestNumber=body.items[0].header.shipmentRequestNumber;
                // order = body.items[0].header.orderNumber;
                 console.log("The Order number is"+orderId);

                 done();

               });
       })
  });








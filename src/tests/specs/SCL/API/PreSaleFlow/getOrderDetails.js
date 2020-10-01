const apiResource = require("protractor-api-resource").ProtractorApiResource;


var request = require('request');


describe("test", function () {




          it("create SO", done =>{
            console.log("start");
            console.log("response from first request is "+ orderId);
           // var requestId= newGlobalVar

           var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/order/detail',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },

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
                //console.log("body of get order details",body);
                global.orderStatus=body.status;
                //global.data123=body.referenceData[0].data;
                console.log("order status is", orderStatus );
                //console.log("order status is", data123 );
                done();

            });



    });



});

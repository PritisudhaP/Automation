const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');


describe("order payment logs", function () {

          it("order payment logs", done =>{
           
           var options = {
            method: 'GET',
            url: browser.params.APIRequest+'/orderPayment/salesOrderId/'+newGlobalVar,
            headers: {
                'Authorization': 'Bearer '+token
            },
           
            };
            options.json = true;
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                var orderDetailsJson = JSON.stringify(body);
                console.log('body of order payment ', orderDetailsJson);
                response2= orderDetailsJson.split(",");
        		console.log("the length of body array is : ", response2.length);
        		
        		if(browser.params.type=="CANCEL"){
        			
        			expect(response2).toContain('"transactionType":"REVERSE"');
	        		expect(response2).toContain('"authorizedAmount":'+browser.params.Amount);
	        		expect(response2).toContain('"authorizedAmount":'+browser.params.Amount1);
        		}

        		else if(browser.params.type=="CREDITCARD"){
	        		expect(response2).toContain('"fullyCaptured":true');
	        		expect(response2).toContain('"authorized":true');
	        		expect(response2).toContain('"authorizedAmount":'+browser.params.Amount);
	        		expect(response2).toContain('"capturedAmount":'+browser.params.Amount);
        		}
        		else if(browser.params.type=="GIFT"){
	        		expect(response2).toContain('"fullyCaptured":true');
	        		expect(response2).toContain('"authorized":true');
	        	//	expect(response2).toContain('"authorizedAmount":'+parseInt(browser.params.Amount));
	        	//	expect(response2).toContain('"capturedAmount":'+parseInt(browser.params.Amount));
        		}
        		else{
        			
        			
        		}
        		
                done();

            });
    });
});








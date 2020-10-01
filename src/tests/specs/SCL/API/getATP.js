const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var dataFile = require(process.cwd() + '/src/tests/autoFiles/getATPGen.json');

describe( "Get ATP", function () {

	dataFile.forEach((item) => {  
		
		it("GetATP Calls", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/atp',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: JSON.stringify(item.body)
			};
			
//			options.json = true;
//			console.log("Token from token generation is "+options.headers.Authorization);
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log("Request getATP is : "+JSON.stringify(item.body));
				console.log('Response:', body);

				if(item.expectedCode)
				{
					expect(response.statusCode).toBe(item.expectedCode.responseStatusCode);
				}
				if(item.expectedData)
				{
					var expectedBody = JSON.stringify(item.expectedData);
					expectedBody = expectedBody.replace(/[\'{}]/g, '');
					expect(response.body).toContain(expectedBody);
				}
				
				done();
			});
		})	
	})
});
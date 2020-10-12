const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var dataFile = require(process.cwd() + '/src/tests/autoFiles/ordModification.json');

describe( "Get ATP", function () {

	global.order = "000000013462";
	
	dataFile.forEach((item) => {  
		
		it("GetATP Calls", done =>{
			
			var options = {
				method: 'PUT',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/order',
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


/*
Prerequisite:
1. Create a 2 line SO in Draft Status and replace the first 1-8 call with the SO number in ordModification.json file
2. Create a 3 line SO in Open Status and replace the first 9-16 call with the SO number in ordModification.json file
3. Create a 2 line SO in FTV Status (give SKU unit price with 4+ decimal values) and replace the first 17-24 call with the SO number in ordModification.json file
*/
const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

describe( "Token", function () {

	it("Token Generation", done =>
	{
		console.log("Creating token");
		var options = {
			method: 'POST',
			url: browser.params.APIRequest+'security/access/token?grant_type=client_credentials&scope=refreshToken',
			headers: {
				  'refreshToken':'application/x-www-form-urlencoded',
				//  'Authorization':'Basic YWRtaW5AdGhrLmNvbTpteXBhc3N3b3Jk',//p4
				  'Authorization':'Basic YWRtaW5AdGhrLmNvbTo5NV56Q1h3N1o3RHd1PVRN',//p0
				  'Content-Type':'application/x-www-form-urlencoded'
			},
		};
		options.json = true;
		request(options, function (error, response, body) {
			var errors = error;
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);
			global.token=body.access_token;
			console.log("token is "+token);
			done();
		});
	});
})

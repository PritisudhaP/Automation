const apiResource = require("protractor-api-resource").ProtractorApiResource;
var dataFile = require(process.cwd() + '/src/tests/autoFiles/ordModification.json');
var request = require('request');
var moment = require('moment');
var NowMoment = moment();
var ranNum = NowMoment.format('YYYY-MM-DDHHmmss');

var d = new Date();

function previousDate(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate()-1)
}

function nextDate(d){
    function pad(n){return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate()+1)
}

describe( "Inventory Adjust API", function () {
		
		it("TC - 01 ASN - Invalid inventoryPool", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc9999",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "OnOrderAdjustment",
							"sku": "5117_5Comp3",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+1,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Given inventoryPoolRefName joliet-dc9999 doesnt exist");
				done();
			});
		}),
		
		
		
		it("TC - 02 ASN - Invalid Expected Arrival Date - Past Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": previousDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+2,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than current date");
				done();
			});
		}),
		
		
		it("TC - 03 ASN - Invalid Expected Arrival Date - Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": "",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+3,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Arrival Date passed");
				done();
			});
		}),
		
		
		it("TC - 04 ASN - Invalid Expected Arrival Date - Blank", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": "    ",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+4,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Arrival Date passed");
				done();
			});
		}),
		
		
		it("TC - 05 ASN - Invalid Expected Ship Date - Past Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": previousDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+5,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than current date");
				done();
			});
		}),
	
		
		it("TC - 06 ASN - Invalid Expected Ship Date - Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": "",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+6,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Ship Date passed");
				done();
			});
		}),
		
		
		it("TC - 07 ASN - Invalid Expected Ship Date - Blank", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": "   ",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+7,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Ship Date passed");
				done();
			});
		}),
		
		
		
		it("TC - 09 ASN - Invalid action value", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment123",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+9,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("No enum constant com.eis.ssit.api.v1.model.ActionType");
				done();
			});
		}),
		
		
		
		it("TC - 10 ASN - Invalid SkuID", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027999",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+10,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Given SkuId 0000000027999 doesnt exist");
				done();
			});
		}),
		
		
		it("TC - 11 ASN - Without passing Description", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+11,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 12 ASN - Description as Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+12,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 13 ASN - Description as Empty", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "    ",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+13,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 14 ASN - Invalid Supply Type", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN123",
							"shipmentIdentifier": "ASN"+ranNum+14,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Supply Type is Invalid");
				done();
			});
		}),
		
		
		it("TC - 15 ASN - ShipmentIdentifier as Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "",
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("ShipmentIdentifier can not be null or empty");
				done();
			});
		}),
		
		
		
		it("TC - 16 ASN - ShipmentIdentifier as Empty", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "   ",
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("ShipmentIdentifier can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 17 ASN - Pass poNumber instead of shipmentIdentifier in the Request", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"poNumber": "ASN"+ranNum+17,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("ShipmentIdentifier can not be null or empty");
				done();
			});
		}),
		
		
		
		it("TC - 18 ASN - Expected Ship Date prior to Expected Arrival Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:30:00Z",
							"expectedShipDate": nextDate(d)+"T10:00:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "ASN",
							"shipmentIdentifier": "ASN"+ranNum+18,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than or equal to Expected Arrival Date");
				done();
			});
		}),
		
//		Purchase Order starts here
		
		it("TC - 27 PO - Invalid inventoryPool", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc9999",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "OnOrderAdjustment",
							"sku": "5117_5Comp3",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+27,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Given inventoryPoolRefName joliet-dc9999 doesnt exist");
				done();
			});
		}),
		
		
		
		it("TC - 28 PO - Invalid Expected Arrival Date - Past Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": previousDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+28,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than current date");
				done();
			});
		}),
		
		
		it("TC - 29 PO - Invalid Expected Arrival Date - Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": "",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+29,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Arrival Date passed");
				done();
			});
		}),
		
		
		it("TC - 30 PO - Invalid Expected Arrival Date - Blank", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": "    ",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+30,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Arrival Date passed");
				done();
			});
		}),
		
		
		it("TC - 31 PO - Invalid Expected Ship Date - Past Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": previousDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+31,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than current date");
				done();
			});
		}),
	
		
		it("TC - 32 PO - Invalid Expected Ship Date - Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": "",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+32,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Ship Date passed");
				done();
			});
		}),
		
		
		it("TC - 33 PO - Invalid Expected Ship Date - Blank", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": "   ",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+33,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Invalid Expected Ship Date passed");
				done();
			});
		}),
		
		
		
		it("TC - 35 PO - Invalid action value", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment123",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+35,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("No enum constant com.eis.ssit.api.v1.model.ActionType");
				done();
			});
		}),
		
		
		
		it("TC - 36 PO - Invalid SkuID", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027999",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+36,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Given SkuId 0000000027999 doesnt exist");
				done();
			});
		}),
		
		
		it("TC - 37 PO - Without passing Description", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+37,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 38 PO - Description as Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+38,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 39 PO - Description as Empty", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "    ",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+39,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Description can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 40 PO - Invalid Supply Type", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder123",
							"poNumber": "PO"+ranNum+40,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Supply Type is Invalid");
				done();
			});
		}),
		
		
		it("TC - 41 PO - poNumber as Null", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "",
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Purchase Order Number can not be null or empty");
				done();
			});
		}),
		
		
		
		it("TC - 42 PO - poNumber as Empty", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "   ",
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Purchase Order Number can not be null or empty");
				done();
			});
		}),
		
		
		it("TC - 43 PO - Pass shipmentIdentifier instead of poNumber in the Request", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:00:00Z",
							"expectedShipDate": nextDate(d)+"T10:30:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"shipmentIdentifier": "PO"+ranNum+43,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("Purchase Order Number can not be null or empty");
				done();
			});
		}),
		
		
		
		it("TC - 44 PO - Expected Ship Date prior to Expected Arrival Date", done =>{
			
			var options = {
				method: 'POST',
				url: 'https://project0-qa.enspirecommerce.com/api/v1/inventory/adjust',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+token
				},
				
				body: {  
					"adjustInventory": [
						{
							"inventoryPool": "joliet-dc",
							"expectedArrivalDate": nextDate(d)+"T10:30:00Z",
							"expectedShipDate": nextDate(d)+"T10:00:00Z",
							"qty": 15,
							"action": "Adjustment",
							"sku": "0000000027",
							"description": "test",
							"supplyType": "PurchaseOrder",
							"poNumber": "PO"+ranNum+44,
							"dataDomain": "com.thk"
						}
					]
				}
			};
			
			options.json = true;
			request(options, function (error, response, body) {
				var errors = error;
				console.log('Error:', + error);
				console.log('StatusCode:', response && response.statusCode);
				console.log('Response:', body);
				expect(response.statusCode).toBe(200);
         		expect(response.body.adjustInventory[0].errorMessage).toContain("should be greater than or equal to Expected Arrival Date");
				done();
			});
		})
});

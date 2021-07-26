const apiResource = require("protractor-api-resource").ProtractorApiResource;

var request = require('request');

//var data = require(process.cwd() + '/src/tests/autoFiles/ServiceOrderDtl.json');

var data = require(process.cwd() + '/autoFiles/ServiceOrderDtl.json');

describe("Service Order Detail", function () {
    
    it("Scenario 1: All values", done => {
        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 1"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var actualError = body.orderNumber;
                console.log("Scenario 1:", response.body)
                expect(actualError).toBe("Priti130");
                done();
            });
    });
    it("Scenario 2: Invalid transaction type", done => {

        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 2"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.message;
                console.log("Scenario 2:Invalid transaction type", response.body)
                expect(actualError).toBe("orderTransactionType is invalid");
                done();
            });


    });
    it("Scenario 3: Invalid order number", done => {

        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 3"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(404)
                var actualError = body.message;
                console.log("Scenario 3:Invalid order number", response.body)
                expect(actualError).toBe("sales order not found with passed on details");
                done();

            });


    });
    it("Scenario 4: Invalid organization", done => {

        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 4"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(404)
                var actualError = body.message;
                console.log("Scenario 4: Invalid organization", response.body)
                expect(actualError).toBe("sales order not found with passed on details");
                done();

            });


    });
    it("Scenario 5: Mandatory values - without 'orderTransactionType':SALES", done => {

        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 5"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.developerMessage;
                console.log("Scenario 5: Mandatory values - without 'orderTransactionType':SALES", response.body)
                expect(actualError).toBe("400 (Bad Request): orderTransactionType: may not be empty");
                done();

            });
    });
    it("Scenario 6: Without mandatory", done => {

        var options = {
            method: 'POST',
            url: data.URL.serviceOrderDtl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 6"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.developerMessage;
                console.log("Scenario 6: Without mandatory", response.body)
                expect(actualError).toBe("400 (Bad Request): orderOrganization: may not be empty");
                done();

            });
    });
})
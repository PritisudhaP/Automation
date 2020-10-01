const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

var data = require(process.cwd() + '/src/tests/autoFiles/DateFieldValidation.json');

describe("Date Validations", function () {

    it("Scenario 1:orderDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 01"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log("Scenario 1:", body)
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderDate: may not be empty")
            done();
        });
    })

    it("Scenario 2:orderDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 02"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderDate: may not be empty")
            done();
        });
    })
    it("Scenario 3:enspireCreateDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 03"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Creation Date passed - .")
            done();
        });
    })
    it("Scenario 4:enspireCreateDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 04"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Creation Date passed -  .")
            done();
        });
    })

    it("Scenario 5:expectedShipDate:empty(Order level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 05"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date passed - .")
            done();
        });
    })
    it("Scenario 6:expectedShipDate:empty(Order level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 06"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date passed -  .")
            done();
        });
    })

    it("Scenario 7:expectedDeliveryDate:empty(Order level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 07"].Input,
        };
        options.json = true;
        // // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed - .")
            done();
        });
    })
    it("Scenario 8:expectedDeliveryDate:empty(Order level)", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 08"].Input,
        };
        options.json = true;
        //// console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed -  .")
            done();
        });
    })
    it("Scenario 9:return order Date:empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 09"].Input,
        };
        options.json = true;
        // // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderDate: may not be empty")
            done();
        });
    })

    it("Scenario 10:return order Date:empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 10"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderDate: may not be empty")
            done();
        });

    })
    it("Scenario 11:return enspireCreateDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 11"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Creation Date passed - .")
            done();
        });
    })
    it("Scenario 12:return enspireCreateDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 12"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Creation Date passed -  .")
            done();
        });
    })
    it("Scenario 13:return expectedShipDate(Line Level) :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 13"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Return order expectedShipDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date(ReturnOrder Line no-1) passed - .")
            done();
        });
    })
    it("Scenario 14:return expectedShipDate(Line Level) :empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 14"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Return order expectedShipDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date(ReturnOrder Line no-1) passed -  .")
            done();
        });

    })
    it("Scenario 15:return expectedDeliveryDate(Line Level) :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 15"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Return order expectedDeliveryDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date(ReturnOrder Line no-1) passed - .")
            done();
        });

    })
    it("Scenario 16:return expectedDeliveryDate(Line Level) :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 16"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Return order expectedDeliveryDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date(ReturnOrder Line no-1) passed -  .")
            done();
        });
    })
    it("Scenario 17:return orderPayments transaction date :empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 17"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 17: Return order orderPayments transaction:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 18:return orderPayments transaction date :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 18"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 18: Return order orderPayments transaction:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 19:return orderPaymentstransaction transaction date :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 19"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 19: Return order orderPaymentTransactions transactionDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 20:return orderPaymentTransactions transaction date :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 20"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 20: Return order orderPaymentTransactions transactionDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionDate: may not be empty")
            done();
        });

    })
    it("Scenario 21:Return order transactionExpirationDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 21"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 21: Return order transactionExpirationDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionExpirationDate: may not be empty")
            done();
        });
    })
    it("Scenario 22:Return order transactionExpirationDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 22"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 22: Return order transactionExpirationDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionExpirationDate: may not be empty")
            done();
        });
    })
    it("Scenario 23:Return order expectedShipDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 23"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 23: Return order expectedShipDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date passed - .")
            done();
        });
    })
    it("Scenario 24:Return order expectedShipDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 24"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 24: Return order expectedShipDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date passed -  .")
            done();
        });
    })
    it("Scenario 25:Return order expectedDeliveryDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 25"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 25: Return order expectedDeliveryDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed - .")
            done();
        });
    })
    it("Scenario 26:Return order expectedDeliveryDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 26"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 26: Return order expectedDeliveryDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed -  .")
            done();
        });
    })
    it("Scenario 27:expectedShipDate:empty(Line level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 27"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date(Salesorder Line no-1) passed - .")
            done();
        });
    })

    it("Scenario 28:expectedShipDate:empty(Line level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 28"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date(Salesorder Line no-1) passed -  .")
            done();
        });
    })
    it("Scenario 29:expectedDeliveryDate:empty(Line level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 29"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date(Salesorder Line no-1) passed - .")
            done();
        });
    })
    it("Scenario 30:expectedDeliveryDate:empty(Line level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 30"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date(Salesorder Line no-1) passed -  .")
            done();
        });
    })
    it("Scenario 31:OrderPayment:transactionDate", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 31"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].transactionDate: may not be empty")
            done();
        });

    })
    it("Scenario 32:OrderPayment:transactionDate as empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 32"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 33:orderPaymentTransactions:transactionDate as empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 33"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 34:orderPaymentTransactions:transactionDate as empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 34"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionDate: may not be empty")
            done();
        });
    })
    it("Scenario 35:orderPaymentTransactions:transactionExpirationDate as empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 35"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionExpirationDate: may not be empty")
            done();
        });
    })
    it("Scenario 36:orderPaymentTransactions:transactionExpirationDate as empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.OrderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.DateField["Scenario 36"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionExpirationDate: may not be empty")
            done();
        });

    })
    it("Scenario 37:Inventory Date time:as empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 37"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            // expect(response.statusCode).toBe(400)
            expect(response.statusCode).toBe(200)
            var ActualError = body.adjustInventory[0].errorMessage;
            expect(ActualError).toBe("Invalid Inventory Date Time passed - .")
            done();
        });
    })
    it("Scenario 38:Inventory Date time:as empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 38"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            //expect(response.statusCode).toBe(400)
            expect(response.statusCode).toBe(200)
            var ActualError = body.adjustInventory[0].errorMessage;
            expect(ActualError).toBe("Invalid Inventory Date Time passed -  .")
            done();
        });
    })
    it("Scenario 39:Inventory Adjustment expectedArrivalDate = empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 39"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            //expect(response.statusCode).toBe(400)
            console.log('Scenario 39:', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Arrival Date passed - .")
            done();
        });
    });
    it("Scenario 40:Inventory Adjustment expectedArrivalDate = empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 40"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            // expect(response.statusCode).toBe(400)
            console.log('Scenario 40:', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Arrival Date passed -  .")
            done();
        });
    });

    it("Scenario 41:Inventory Adjustment expectedShipDate =empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 41"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            // expect(response.statusCode).toBe(400)
            expect(response.statusCode).toBe(200)
            console.log('Scenario 41:', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Ship Date passed - .")
            done();
        });
    });
    it("Scenario 42:Inventory Adjustment expectedShipDate =empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustmentErrors["Scenario 42"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            // expect(response.statusCode).toBe(400)
            console.log('Scenario:42', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Ship Date passed -  .")
            done();
        });
    });
}); 
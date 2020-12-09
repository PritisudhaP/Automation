var request = require('request');
// var data = require('../testData_json/MultiOrdersV3.json');
var data = require(process.cwd() + '/src/tests/autoFiles/MultiOrdersV3.json')
var moment = require('moment-timezone');
const { browser } = require('protractor');
var NowMoment = moment();
// OrderNbr generation
var SONumber = "STC" + NowMoment.format("mmss");
var PTANumber = "PTA" + NowMoment.format("mmss");
var MXDNumber = "MXD" + NowMoment.format("mmss");
var emptyVersion = "EV" + NowMoment.format("mmss");
var versionV1 = "V1" + NowMoment.format("mmss");
var versionV2 = "V2" + NowMoment.format("mmss");

describe("Handle create order API response for multiple orders in request", function () {

    it("Scenario 01: STC Multi Orders creation in single request", done => {
        data["Scenario 01"].Input.orders[0].orderNumber = SONumber + 01;
        data["Scenario 01"].Input.orders[1].orderNumber = SONumber + 02;
        data["Scenario 01"].Input.orders[2].orderNumber = SONumber + 03;
        data["Scenario 01"].Input.orders[3].orderNumber = SONumber + 04;
        data["Scenario 01"].Input.orders[4].orderNumber = SONumber + 05;
        data["Scenario 01"].Input.orders[5].orderNumber = SONumber + 06;
        data["Scenario 01"].Input.orders[6].orderNumber = SONumber + 07;
        data["Scenario 01"].Input.orders[7].orderNumber = SONumber + 08;
        data["Scenario 01"].Input.orders[8].orderNumber = SONumber + 09;
        data["Scenario 01"].Input.orders[9].orderNumber = SONumber + 10;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 01"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 01:STC Multi Orders creation in single request", response.body);
                expect(body.orders[0].orderNumber).toBe(SONumber + 01)
                expect(body.orders[0].status).toBe("OPEN")
                expect(body.orders[1].orderNumber).toBe(SONumber + 02)
                expect(body.orders[1].status).toBe("OPEN")
                expect(body.orders[2].orderNumber).toBe(SONumber + 03)
                expect(body.orders[2].status).toBe("OPEN")
                expect(body.orders[3].orderNumber).toBe(SONumber + 04)
                expect(body.orders[3].status).toBe("OPEN")
                expect(body.orders[4].orderNumber).toBe(SONumber + 05)
                expect(body.orders[4].status).toBe("OPEN")
                expect(body.orders[5].orderNumber).toBe(SONumber + 06)
                expect(body.orders[5].status).toBe("OPEN")
                expect(body.orders[6].orderNumber).toBe(SONumber + 07)
                expect(body.orders[6].status).toBe("OPEN")
                expect(body.orders[7].orderNumber).toBe(SONumber + 08)
                expect(body.orders[7].status).toBe("OPEN")
                expect(body.orders[8].orderNumber).toBe(SONumber + 09)
                expect(body.orders[8].status).toBe("OPEN")
                expect(body.orders[9].orderNumber).toBe(SONumber + 10)
                expect(body.orders[9].status).toBe("OPEN")
                done();
            });
    });

    it("Scenario 02: Pickup At store Multi Orders creation in single request", done => {
        data["Scenario 02"].Input.orders[0].orderNumber = PTANumber + 01;
        data["Scenario 02"].Input.orders[1].orderNumber = PTANumber + 02;
        data["Scenario 02"].Input.orders[2].orderNumber = PTANumber + 03;
        data["Scenario 02"].Input.orders[3].orderNumber = PTANumber + 04;
        data["Scenario 02"].Input.orders[4].orderNumber = PTANumber + 05;
        data["Scenario 02"].Input.orders[5].orderNumber = PTANumber + 06;
        data["Scenario 02"].Input.orders[6].orderNumber = PTANumber + 07;
        data["Scenario 02"].Input.orders[7].orderNumber = PTANumber + 08;
        data["Scenario 02"].Input.orders[8].orderNumber = PTANumber + 09;
        data["Scenario 02"].Input.orders[9].orderNumber = PTANumber + 10;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 02"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 02:Pickup At store Multi Orders creation in single request", response.body);
                expect(body.orders[0].orderNumber).toBe(PTANumber + 01)
                expect(body.orders[0].status).toBe("OPEN")
                expect(body.orders[1].orderNumber).toBe(PTANumber + 02)
                expect(body.orders[1].status).toBe("OPEN")
                expect(body.orders[2].orderNumber).toBe(PTANumber + 03)
                expect(body.orders[2].status).toBe("OPEN")
                expect(body.orders[3].orderNumber).toBe(PTANumber + 04)
                expect(body.orders[3].status).toBe("OPEN")
                expect(body.orders[4].orderNumber).toBe(PTANumber + 05)
                expect(body.orders[4].status).toBe("OPEN")
                expect(body.orders[5].orderNumber).toBe(PTANumber + 06)
                expect(body.orders[5].status).toBe("OPEN")
                expect(body.orders[6].orderNumber).toBe(PTANumber + 07)
                expect(body.orders[6].status).toBe("OPEN")
                expect(body.orders[7].orderNumber).toBe(PTANumber + 08)
                expect(body.orders[7].status).toBe("OPEN")
                expect(body.orders[8].orderNumber).toBe(PTANumber + 09)
                expect(body.orders[8].status).toBe("OPEN")
                expect(body.orders[9].orderNumber).toBe(PTANumber + 10)
                expect(body.orders[9].status).toBe("OPEN")
                done();
            })
    });

    it("Scenario 03:MultiOrders with success and failure in single response", done => {
        data["Scenario 03"].Input.orders[0].orderNumber = MXDNumber + 01;
        data["Scenario 03"].Input.orders[1].orderNumber = MXDNumber + 02;
        data["Scenario 03"].Input.orders[2].orderNumber = MXDNumber + 03;
        data["Scenario 03"].Input.orders[3].orderNumber = MXDNumber + 04;
        data["Scenario 03"].Input.orders[4].orderNumber = MXDNumber + 05;
        data["Scenario 03"].Input.orders[5].orderNumber = MXDNumber + 06;
        data["Scenario 03"].Input.orders[6].orderNumber = MXDNumber + 07;
        data["Scenario 03"].Input.orders[7].orderNumber = MXDNumber + 08;
        data["Scenario 03"].Input.orders[8].orderNumber = MXDNumber + 09;
        data["Scenario 03"].Input.orders[9].orderNumber = MXDNumber + 10;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 03"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 03:MultiOrders with success and failure in single response", response.body);
                expect(body.orders[0].orderNumber).toBe(MXDNumber + 01)
                expect(body.orders[0].status).toBe("OPEN")
                expect(body.orders[1].orderNumber).toBe(MXDNumber + 02)
                expect(body.orders[1].status).toBe("FAILED_TO_VALIDATE")
                expect(body.orders[1].orderErrorList[0].errorReason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Following Skus [test1711] not found in catalog thkcatalog-- Sales Order Number:" + MXDNumber + 02 + "'}")
                expect(body.orders[2].orderNumber).toBe(MXDNumber + 03)
                expect(body.orders[2].status).toBe("OPEN")
                expect(body.orders[3].orderNumber).toBe(MXDNumber + 04)
                expect(body.orders[3].status).toBe("OPEN")
                expect(body.orders[4].orderNumber).toBe(MXDNumber + 05)
                expect(body.orders[4].status).toBe("400")
                expect(body.orders[4].errorMessage).toBe("lineItems[0].lineNumber: must be greater than 0")
                expect(body.orders[5].orderNumber).toBe(MXDNumber + 06)
                expect(body.orders[5].status).toBe("OPEN")
                expect(body.orders[6].orderNumber).toBe(MXDNumber + 07)
                expect(body.orders[6].status).toBe("OPEN")
                expect(body.orders[7].orderNumber).toBe(MXDNumber + 08)
                expect(body.orders[7].status).toBe("OPEN")
                expect(body.orders[8].orderNumber).toBe(MXDNumber + 09)
                expect(body.orders[8].status).toBe("FAILED_TO_VALIDATE")
                expect(body.orders[8].orderErrorList[0].errorReason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Sales Order Number:" + MXDNumber + 09 + ", Pickup Window End time should be Future Time of Pickup Window Start Time'}")
                expect(body.orders[9].orderNumber).toBe(MXDNumber + 10)
                expect(body.orders[9].status).toBe("OPEN")
                done();
            })
    })

    it("Scenario 04:Validate Multi order creation with out version in the request ", done => {
        data["Scenario 04"].Input.orders[0].orderNumber = emptyVersion + 01;
        data["Scenario 04"].Input.orders[1].orderNumber = emptyVersion + 02;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 04"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(400)
               // console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 04:Validate Multi order creation with out version in the request", response.body);
                expect(body.message).toBe("Currently more than 1 order in request is not supported. Orders in request 2.")
                done();
            })
    });

    it("Scenario 05:Validate Multi order creation with version (v1) in the request", done => {
        data["Scenario 05"].Input.orders[0].orderNumber = versionV1 + 01;
        data["Scenario 05"].Input.orders[1].orderNumber = versionV1 + 02;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 05"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(400)
                console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 05:Validate Multi order creation with version (v1) in the request", response.body);
                expect(body.message).toBe("Currently more than 1 order in request is not supported. Orders in request 2.")
                done();
            })
    });
    it("Scenario 06:Validate Multi order creation with version (v2) in the request", done => {
        data["Scenario 06"].Input.orders[0].orderNumber = versionV2 + 01;
        data["Scenario 06"].Input.orders[1].orderNumber = versionV2 + 02;
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 06"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                // var errors = error;
                expect(response.statusCode).toBe(400)
                console.log('statusCode:', response && response.statusCode);
                console.log("Scenario 06:Validate Multi order creation with version (v2) in the request", response.body);
                expect(body.message).toBe("Currently more than 1 order in request is not supported. Orders in request 2.")
                done();
            })
    })
});

describe("Exception date field validation scenarios with version v3", function(){

    
    it("Scenario 07:orderDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 07"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log("Scenario 07:orderDate:empty", body)
            expect(response.statusCode).toBe(200)
            //expect(response.status).toBe(400)
            var ActualError = body.orders[0].errorMessage;
            var ActualError1 = body.orders[1].errorMessage;
            expect(ActualError).toBe("orderDate: may not be empty")
            expect(ActualError1).toBe("orderDate: may not be empty")
            done();
        });
    })

    it("Scenario 08:enspireCreateDate:empty ", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 08"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            //expect(response.status).toBe(400)
            console.log("Scenario 08:enspireCreateDate:empty", body)
            var ActualError = body.orders[0].errorMessage;
            var ActualError1 = body.orders[1].errorMessage;
            expect(ActualError).toBe("Invalid Creation Date passed - .")
            expect(ActualError1).toBe("Invalid Creation Date passed - .")
            done();
        });
    })

    it("Scenario 09:expectedShipDate:empty(Order level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 09"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 09:expectedShipDate:empty(Order level)',body);
            expect(body.orders[0].status).toBe("400")
          var ActualError = body.orders[0].errorMessage;
            var ActualError1 = body.orders[1].errorMessage;
           expect(ActualError).toBe("Invalid Expected Ship Date passed - .")
           expect(ActualError1).toBe("Invalid Expected Ship Date passed - .")
            done();
        });
    })

    it("Scenario 10:expectedDeliveryDate:empty(Order level)", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 10"].Input,
        };
        options.json = true;
        // // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 10:expectedDeliveryDate:empty(Order level):', body);
            expect(response.statusCode).toBe(200)
            //expect(response.status).toBe(400)
            var ActualError = body.orders[0].errorMessage;
            var ActualError1 = body.orders[0].errorMessage;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed - .")
            expect(ActualError1).toBe("Invalid Expected Delivery Date passed - .")
            done();
        });
    })

    it("Scenario 11:return order Date:empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 11"].Input,
        };
        options.json = true;
        // // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 11:return order Date:empty:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderDate: may not be empty")
            done();
        });
    })

    it("Scenario 12:return enspireCreateDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 12"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 12:return enspireCreateDate :empty:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Creation Date passed - .")
            done();
        });
    })

    it("Scenario 13:return expectedShipDate(Line Level) :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 13"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 13:Return order expectedShipDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date(ReturnOrder Line no-1) passed - .")
            done();
        });
    })

    it("Scenario 14:return expectedDeliveryDate(Line Level) :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 14"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 14:Return order expectedDeliveryDate Line level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date(ReturnOrder Line no-1) passed - .")
            done();
        });

    })

    it("Scenario 15:return orderPayments transaction date :empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 15"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 15: Return order orderPayments transaction:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].transactionDate: may not be empty")
            done();
        });
    })

    it("Scenario 16:return orderPaymentstransaction transaction date :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 16"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);
        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 16: Return order orderPaymentTransactions transactionDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionDate: may not be empty")
            done();
        });
    })

    it("Scenario 17:Return order transactionExpirationDate :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 17"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 17: Return order transactionExpirationDate:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.developerMessage;
            expect(ActualError).toBe("400 (Bad Request): orderPayments[0].orderPaymentTransactions[0].transactionExpirationDate: may not be empty")
            done();
        });
    })

    it("Scenario 18:Return order expectedShipDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 18"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 18: Return order expectedShipDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Ship Date passed - .")
            done();
        });
    })

    it("Scenario 19:Return order expectedDeliveryDate order level :empty", done => {

        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 19"].Input,
        };
        options.json = true;
        // console.log("token from token generation is " + options.headers.Authorization);

        request(options, function (error, response, body) {
            var errors = error;
            console.log('error:', + error);
            console.log('statusCode:', response && response.statusCode);
            console.log('Scenario 19: Return order expectedDeliveryDate order level:', body);
            expect(response.statusCode).toBe(400)
            var ActualError = body.message;
            expect(ActualError).toBe("Invalid Expected Delivery Date passed - .")
            done();
        });
    })
})


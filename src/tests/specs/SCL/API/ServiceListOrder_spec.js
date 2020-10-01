const apiResource = require("protractor-api-resource").ProtractorApiResource;

var request = require('request');

var data = require(process.cwd() + '/src/tests/autoFiles/ServiceListOrder.json');

describe("Service Order list", function () {
    
    it("Scenario 1: Get order list by passing all mandatory values", done => {
        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                var actualError = body.errorMessage;
                console.log("Scenario 1:", response.body)
                console.log("order nbr1:",body.orderList[0].orderNumber);
                console.log("order nbr2:",body.orderList[1].orderNumber);
                expect(body.orderList[0].orderNumber).toBe("OMS1741-01");
                expect(body.orderList[1].orderNumber).toBe("OMS1741-02");
                done();
            });
    });
    it("Scenario 2: Get order list by passing all values", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                expect(response.statusCode).toBe(200)
                console.log("Scenario 2:Get order list by passing all values", response.body)
                console.log("order nbr1:",body.orderList[0].orderNumber);
                console.log("order nbr2:",body.orderList[1].orderNumber);
                expect(body.orderList[0].orderNumber).toBe("test0065");
                expect(body.orderList[1].orderNumber).toBe("TestOMS913TC0001");
                done();
            });


    });
    it("Scenario 3: Get order list by passing different channels like B2B/B2C", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.errorMessage;
                console.log("Scenario 3: Get order list by passing different channels like B2B/B2C", response.body)
                console.log("order nbr1:",body.orderList[0].orderNumber);
                console.log("order nbr2:",body.orderList[1].orderNumber);
                expect(body.orderList[0].orderNumber).toBe("02-037-2019163700");
                expect(body.orderList[1].orderNumber).toBe("TestOMS95002");

                done();

            });


    });
    it("Scenario 4: Get order list by passing different transaction type like sales/return", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                expect(response.statusCode).toBe(200);
                console.log("Scenario 4: Get order list by passing different transaction type like sales/return", response.body)
                console.log("order nbr1:",body.orderList[0].orderNumber);
                expect(body.orderList[0].orderNumber).toBe("RMA0000752");
                done();
            });
    });
    it("Scenario 5: Get order list by passing from and to date", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                expect(response.statusCode).toBe(200)
                console.log("Scenario 5:Get order list by passing from and to date ", response.body)
                expect(body.orderList[2].orderNumber).toBe("OMS1741-03");
                expect(body.orderList[3].orderNumber).toBe("OMS1741-04");
                done();

            });
    });
    it("Scenario 6: Get order list by passing only from date", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
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
                expect(response.statusCode).toBe(200)
                console.log("Scenario 6: ", response.body)
                expect(body.orderList[0].orderNumber).toBe("m20052020TC01");
                expect(body.orderList[1].orderNumber).toBe("TestQAbc1");
                done();
            });
    });

    it("Scenario 7: Get order list by passing only to date", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 7"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                 expect(response.statusCode).toBe(200)
                console.log("Scenario 7:", response.body)
                expect(body.orderList[0].orderNumber).toBe("Test12012020TC005");
                expect(body.orderList[1].orderNumber).toBe("Test12012020TC006");
                done();
            });
    });
    it("Scenario 8: Verify error message sales order not found with passed on details by passing from date less than to date.", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 8"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(404)
                var actualError = body.message;
                console.log("Scenario 8:", response.body)
                expect(actualError).toBe("sales order not found with passed on details");
                done();
            });
    });
    it("Scenario 9:Pass different time zone", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 9"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.message;
                console.log("Scenario:09", response.body);
                expect(actualError).toBe("timezone that is already set is : +08:00 is different from current timezone:-08:00"); 
               done();
            })              
    });
    it("Scenario 10: Pass invalid date", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 10"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(500)
                var actualError = body.message;
                console.log("Scenario:10", response.body)
                expect(actualError).toBe("Text '04-12-2018T11:24:15+08:00' could not be parsed at index 0");
               done();
            })
    });

    it("Scenario 11: Verify response in desending order when displayOrder not passed ", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 11"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var actualError = body.message;
                console.log("Scenario:11 desending order", response.body);
                expect(body.orderList[8].orderDate).toBe("2020-03-07T03:23:49Z");
                expect(body.orderList[9].orderDate).toBe("2020-02-12T21:24:15Z");
                expect(body.orderList[10].orderDate).toBe("2019-10-20T21:24:15Z");
               done();
                })
    });

    it("Scenario 12:Verify response in asending order when displayOrder passed as asc", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 12"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var actualError = body.message;
                console.log("Scenario:12 displayOrder passed as asc", response.body); 
                console.log("order time:",body.orderList[3].orderDate);  
                console.log("order time:",body.orderList[4].orderDate); 
                expect(body.orderList[3].orderDate).toBe("2019-03-05T21:24:15Z");  
                expect(body.orderList[4].orderDate).toBe("2019-04-05T21:24:15Z");  
                done();

                });
    });

    it("Scenario 13: Verify error message orderOrganization must be non null without sending orderOrganization in the request", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 13"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.developerMessage;
                console.log("Scenario:13", response.body);  
                expect(actualError).toBe("400 (Bad Request): orderOrganization: may not be empty");
                done();           
            });
    });

    it("Scenario 14: Verify error message customerId must be non null without sending customerid in the request", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 14"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.developerMessage;
                console.log("Scenario:14", response.body)
               expect(actualError).toBe("400 (Bad Request): customerId: may not be empty");   
                done();            
            });    
    });

    it("Scenario 15: Verify error message orderTransactionType must be non null without sending orderTransactionType", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 15"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(400)
                var actualError = body.developerMessage;
                console.log("Scenario:15", response.body)
                expect(actualError).toBe("400 (Bad Request): orderTransactionType: may not be empty");  
                done();
            });
    });

    it("Scenario 16: Verify error message orderTransactionType is invalid by passing invalid orderTransaction type", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 16"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
               expect(response.statusCode).toBe(400)
                var actualError = body.errorMessage;
                console.log("Scenario:16", response.body)
              //  expect(actualError).toBe("orderTransactionType is invalid");
                done();
            });
    });

    it("Scenario 17: Verify error message rma order not found with passed on details when there is no record found with the input values for return order", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 17"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
               expect(response.statusCode).toBe(404)
                 var actualError = body.message;
                console.log("Scenario:17", response.body)
                 expect(actualError).toBe("rma order not found with passed on details");
                done();
            });
    });

    it("Scenario 18: Verify error message sales order not found with passed on details when passed values in request does not match with any data in system", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 18"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(404)
                 var actualError = body.message;
                console.log("Scenario:18", response.body)
                 expect(actualError).toBe("sales order not found with passed on details");
                done();
            });
    });

    it("Scenario 19: Verify erro message sales order not found with passed on details by passing invalid orderorganization/invalid channel/invalid ordertype/invalid status/invalid display order", done => {

        var options = {
            method: 'POST',
            url: data.URL.ServiceListOrder,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["Scenario 19"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(404)
                 var actualError = body.message;
                console.log("Scenario:19", response.body)
                 expect(actualError).toBe("sales order not found with passed on details");
                done();
            });
    });
})
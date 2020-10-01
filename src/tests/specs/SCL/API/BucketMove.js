const apiResource = require("protractor-api-resource").ProtractorApiResource;

var request = require('request');

var data = require(process.cwd() + '/src/tests/autoFiles/BucketMove.json')

describe("Bucket Move", function () {
    
    it("Scenario 1: BucketMove(From:null) Errors", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 1:", response.body)
                expect(actualError).toBe("fromBucket is not valid for bucket move");
                done();
            });
    });
    it("Scenario 2: BucketMove(To) Errors", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 2:BucketMove(To) Errors", response.body)
                expect(actualError).toBe("toBucket is not valid for bucket move");
                done();
            });


    });
    it("Scenario 3: Same fields (From & To)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 3: Same fields (From & To)", response.body)
                expect(actualError).toBe("fromBucket can not be same as toBucket");
                done();

            });


    });
    it("Scenario 4: Incorrect Label (From)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 4: Incorrect Label (From)", response.body)
                expect(actualError).toBe("fromBucket is not valid for bucket move");
                done();

            });


    });
    it("Scenario 5: Incorrect Label (To)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 5: Incorrect Label (To)", response.body)
                expect(actualError).toBe("toBucket is not valid for bucket move");
                done();

            });
    });
    it("Scenario 6: (fromBucket : “” or “ ” )", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 6: (fromBucket : “” or “ ” )", response.body)
                expect(actualError).toBe("fromBucket is not valid for bucket move");
                done();

            });
    });

    it("Scenario 7: (toBucket :null)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 7: (toBucket :null)", response.body)
                expect(actualError).toBe("toBucket is not valid for bucket move");
                done();

            });
    });
    it("Scenario 8: Invalid Action type", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario 8: Invalid Action type:", response.body)
                expect(actualError).toBe("java.lang.IllegalArgumentException: No enum constant com.eis.ssit.api.v1.model.ActionType.bucketMove");
                done();

            });
    });
    it("Scenario 9: BucketMove(From:availableQty to:unavailableQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.message;
                console.log("Scenario:09", response.body);
                console.log("availableQty", response.body.adjustInventory[0].availableQty);
                expect(response.body.adjustInventory[0].availableQty).toBe(13);

                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:09 ",response.body);
                        console.log("Actual availableQty:",body.items[0].availableQty);
                       console.log("Actual unavailableQty:",body.items[0].unavailableQty);
                        expect(body.items[0].availableQty).toBe(13);
                        expect(body.items[0].unavailableQty).toBe(2);
                        done();
                    });
            });                
    });
    it("Scenario 10: BucketMove(From:unavailableQty to:availableQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                //var actualError = body.message;
                console.log("Scenario:10", response.body)
                expect(response.body.adjustInventory[0].availableQty).toBe(15);

                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:10 ",response.body);
                        console.log("Actual availableQty:",body.items[0].availableQty);
                        console.log("Actual unavailableQty:",body.items[0].unavailableQty);
                        expect(body.items[0].availableQty).toBe(15);
                        expect(body.items[0].unavailableQty).toBe(0);
                        done();
                    });
            });
    });

    it("Scenario 11: BucketMove(From:availableQty to:holdQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                console.log("Scenario:11", response.body)
                expect(response.body.adjustInventory[0].availableQty).toBe(13);

                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:11 ",response.body);
                        console.log("Actual availableQty:",body.items[0].availableQty);
                        console.log("Actual holdQty:",body.items[0].holdQty);
                        expect(body.items[0].availableQty).toBe(13);
                        expect(body.items[0].holdQty).toBe(2);
                        done();
                    });               
            });
    });

    it("Scenario 12: BucketMove(From:holdQty to unavailableQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                console.log("Scenario:12", response.body);

                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:12 ",response.body);
                        console.log("Actual unavailableQty:",body.items[0].unavailableQty);
                        console.log("Actual holdQty:",body.items[0].holdQty);
                        expect(body.items[0].unavailableQty).toBe(2);
                        expect(body.items[0].holdQty).toBe(0);
                        done();
        
                    });               

            });
    });

    it("Scenario 13: BucketMove(From:unavailableQty to holdQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.message;
                console.log("Scenario:13", response.body);

                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:13 ",response.body);
                        console.log("Actual unavailableQty:",body.items[0].unavailableQty);
                        console.log("Actual holdQty:",body.items[0].holdQty);
                        expect(body.items[0].unavailableQty).toBe(0);
                        expect(body.items[0].holdQty).toBe(2);
                        done();
                    });               
            });
    });

    it("Scenario 14: BucketMove(From:holdQty to:availableQty", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.message;
                console.log("Scenario:14", response.body)
                expect(response.body.adjustInventory[0].availableQty).toBe(15);
                
                var options1 = {
                    method: 'GET',
                    url: data.URL.InventoryPoolEntry,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
        
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200);
                        console.log("Scenario:14 ",response.body);
                        console.log("Actual availableQty:",body.items[0].availableQty);
                        console.log("Actual holdQty:",body.items[0].holdQty);
                        expect(body.items[0].availableQty).toBe(15);
                        expect(body.items[0].holdQty).toBe(0);
                        done();
                    });               
            });    
    });

    it("Scenario 15: (fromBucket : “” or “ ” )", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario:15", response.body)
                expect(actualError).toBe("fromBucket is not valid for bucket move");
                done();
            });
    });

    it("Scenario 16: (toBucket : “” or “ ” )", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
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
                expect(response.statusCode).toBe(200)
                var actualError = body.adjustInventory[0].errorMessage;
                console.log("Scenario:16", response.body)
                expect(actualError).toBe("toBucket is not valid for bucket move");
                done();
            });
    });
})
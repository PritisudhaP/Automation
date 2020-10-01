const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

var data = require(process.cwd() + '/src/tests/autoFiles/InventoryAdjustments.json');

describe("Normal Adjustment Request", function () {

    it("Scenario 1: Validate error message by passing qty:null in normal shipment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 1"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 1"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 2: Validate error message by passing qty: in normal shipment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 2"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 2"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 3: Validate error message by passing qty: in normal shipment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 3"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 3"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 4: Validate error message by passing inventorypool as empty or null for normal adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 4"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 4"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();
        });
    });
    it("Scenario 5:Validate error message by passing site as empty or null for normal adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 5"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 5"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();

        });

    });
    it("Scenario 6:Validate error message by passing site (test) doesn't exist for normal adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 6"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 6"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given site - test does not exist, dataDomain - com.thk")
            done();
        });
    });
    it("Scenario 7:Validate error message by passing inventoryPool:test for normal adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 7"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given inventoryPoolRefName test doesnt exist")
            done();
        });
    });
    it("Scenario 8:Validate error message by passing action:empty or action:null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 8"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 8"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Action can not be null or empty")
            done();
        });
    });
    it("Scenario 9:Validate error message by passing action:test(action doesn't exist or Invalid type)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 9"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 9"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("java.lang.IllegalArgumentException: No enum constant com.eis.ssit.api.v1.model.ActionType.test")
            done();
        });
    });
    it("Scenario 10:Validate error message by passing empty or SKU:null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 10"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 10"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Sku can not be empty or null")
            done();
        });
    });
    it("Scenario 11:Validate error message by passing SKU:test(SKU doesn't exist or Invalid sku)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 11"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given SkuId test doesnt exist")
            done();
        });
    });
    it("Scenario 12:Validate error message by passing description:empty or null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 12"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 12"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Description can not be null or empty")
            done();
        });
    });
    it("Scenario 13:Validate error message by passing uom doesn’t match with Actual uom of SKU)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 13"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 13"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("UOM of input test does not match to the sku UOM EACH")
            done();
        });
    });
    it("Scenario 14:Validate error message by passing organization doesn't match with Actual organization of SKU)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.NormalAdjustment["Scenario 14"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('NormalAdjustment["Scenario 14"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Sku Organization and Adjust Inventory Organization doesn't match")
            done();
        });
    });
})

describe("Lot item Adjustment Request", function () {

    it("Scenario 1: Validate error message for lotIdentifier:empty or null in lot item inventory adjusment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 1"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 1"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("lotIdentifier can not be null or empty")
            done();
        });

    });
    it("Scenario 2:Validate error message for lotIdentifier: or test (doesn't exist) in lot item inventory adjusment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 2"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Error occurred while processing inventory adjustment")
            done();
        });
    });
    it("Scenario 3:Validate error message by passing expirationDate:empty or null in lot inventory adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 3"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 3"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Cannot update availableQty without updating availableQty for a lot")
            done();
        });

    });
    it("Scenario 4:Validate error message by passing expirationDate:Invalid date in lot inventory adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 4"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 4"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            // expect(actualError).toBe("Invalid format: "2020-10-20 " is malformed at " "")
            done();

        });

    });
    it("Scenario 5:Validate error message by passing qty:empty or null in lot inventory adjustment request", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 5"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 5"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 6:Validate error message by passing inventorypool as empty or null ", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 6"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 6"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();
        });
    });
    it("Scenario 7:Validate error message by passing site as empty or null ", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 7"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 7"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();
        });
    });
    it("Scenario 8:Validate error message by passing site (test) doesn't exist ", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 8"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 8"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given site - test does not exist, dataDomain - com.thk")
            done();
        });
    });
    it("Scenario 9:Validate error message by passing inventoryPool:test", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 9"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 9"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given inventoryPoolRefName test doesnt exist")
            done();
        });
    });
    it("Scenario 10:Validate error message by passing action:empty or action:null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 10"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 10"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Action can not be null or empty")
            done();
        });

    });
    it("Scenario 11:Validate error message by passing action:test(action doesn't exist or Invalid type)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 11"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 11"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("java.lang.IllegalArgumentException: No enum constant com.eis.ssit.api.v1.model.ActionType.test")
            done();
        });

    });
    it("Scenario 12:Validate error message by passing SKU:empty or SKU:null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 12"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 12"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Sku can not be empty or null")
            done();
        });

    });
    it("Scenario 13:Validate error message by passing SKU:test(SKU doesn't exist or Invalid sku))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 13"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 13"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given SkuId test doesnt exist")
            done();
        });
    });
    it("Scenario 14:Validate error message by passing description:empty or null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.LotAdjustment["Scenario 14"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('LotAdjustment["Scenario 14"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Description can not be null or empty")
            done();
        });
    });
})

describe("Future(Inbound) Adjustment Request", function () {

    it("Scenario 1: expectedArrivalDate = empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 1"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 1"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Arrival Date passed - .")
            done();
        });
    });
    it("Scenario 2: expectedArrivalDate = empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 2"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 2"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Arrival Date passed -  .")
            done();
        });

    });
    it("Scenario 3: expectedArrivalDate = empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 3"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('Future Scenario 3: expectedArrivalDate = empty or null', body);
            //var actualError = body.adjustInventory[0].errorMessage;
            //expect(actualError).toBe("Invalid Expected Arrival Date passed -  .")
            done();
        });

    });
    it("Scenario 4: expectedShipDate =empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 4"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 4"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Ship Date passed - .")
            done();
        });

    });
    it("Scenario 5: expectedShipDate =empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 5"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 5"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Invalid Expected Ship Date passed -  .")
            done();
        });

    });
    it("Scenario 6: expectedShipDate =empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 6"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('Future Scenario 6: expectedShipDate =empty or null', body);
            // var actualError = body.adjustInventory[0].errorMessage;
            //  expect(actualError).toBe("Invalid Expected Ship Date passed -  .")
            done();
        });
    });
    it("Scenario 7:Validate error message by passing qty:null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 7"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 7"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });

    });
    it("Scenario 8:Validate error message by passing qty:empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 8"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 8"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 9:Validate error message by passing qty:empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 9"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 9"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Qty can not be zero or empty or null")
            done();
        });
    });
    it("Scenario 10:Validate error message by passing inventorypool as empty", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 10"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 10"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();
        });
    });
    it("Scenario 11:Validate error message by passing site as empty or null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 11"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 11"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("InventoryPoolRefName or SiteRefName can not be null")
            done();
        });
    });
    it("Scenario 12:Validate error message by passing site (test) doesn't exist", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 12"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 12"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given site - test does not exist, dataDomain - com.thk")
            done();

        });

    });
    it("Scenario 13:Validate error message by passing inventoryPool:test", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 13"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 13"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given inventoryPoolRefName test doesnt exist")
            done();
        });

    });
    it("Scenario 14:Validate error message by passing action:empty or action:null", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 14"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 14"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Action can not be null or empty")
            done();
        });

    });
    it("Scenario 15:Validate error message by passing action:test(action doesn't exist or Invalid type)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 15"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 15"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("java.lang.IllegalArgumentException: No enum constant com.eis.ssit.api.v1.model.ActionType.test")
            done();
        });

    });
    it("Scenario 16:Validate error message by passing SKU:empty or SKU:null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 16"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 16"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Sku can not be empty or null")
            done();
        });
    });
    it("Scenario 17:Validate error message by passing SKU:test (SKU doesn't exist or Invalid sku))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 17"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 17"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Given SkuId test doesnt exist")
            done();
        });
    });
    it("Scenario 18:Validate error message by passing description:empty or null)", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.FutureAdjustment["Scenario 18"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('FutureAdjustment["Scenario 18"]', body);
            var actualError = body.adjustInventory[0].errorMessage;
            expect(actualError).toBe("Description can not be null or empty")
            done();
        });
    });
})
describe("Inventory Adjustment Functionality:", function () {

    it("Scenario 1:Inventory Adjustment: Increment(normal request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 1"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('InventoryAdjustment["Scenario 1"]', body);
            var actualavailableQty = body.adjustInventory[0].availableQty;
            expect(actualavailableQty).toBe(15)
            done();
        });

    });
    it("Scenario 2:Inventory Adjustment: decrement(normal request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 2"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('InventoryAdjustment["Scenario 2"]', body);
            var actualavailableQty = body.adjustInventory[0].availableQty;
            expect(actualavailableQty).toBe(10)
            done();
        });

    });
    it("Scenario 3:Inventory Adjustment: Increment(lot item request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 3"].Input, 
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('InventoryAdjustment["Scenario 3"]', body);
            var actualavailableQty = body.adjustInventory[0].availableQty;
            expect(actualavailableQty).toBe(20)
            done();
        });
    });
    it("Scenario 4:Inventory Adjustment: decrement(lot item request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 4"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {

            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('Scenario 4 lot adjusment decrement', body);
            var actualavailableQty = body.adjustInventory[0].availableQty;
            expect(actualavailableQty).toBe(10)
            done();

        });

    });
    it("Scenario 5:Inventory Adjustment: Increment(Future(Inbound) item request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 5"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('InventoryAdjustment["Scenario 5"]', body);
            var actualavailableQty = body.adjustInventory[0].futureQty;
            expect(actualavailableQty).toBe(20)
            done();
        });

    });
    it("Scenario 6:Inventory Adjustment: Decrement(Future(Inbound) item request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.InventoryAdjustment["Scenario 6"].Input,
        };
        options.json = true;
        request(options, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            expect(response.statusCode).toBe(200)
            console.log('InventoryAdjustment["Scenario 6"]', body);
            var actualavailableQty = body.adjustInventory[0].futureQty;
            expect(actualavailableQty).toBe(10)
            done();
        });
    });
})

describe("optional fields(location & preferences)", function () {

    it("Sc 1:location in request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Optional["Scenario 1"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
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
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200)
                        console.log("Location value: ", response.body.items[0].inventoryPoolEntry.warehouseLocations[0]);
                        expect(response.body.items[0].inventoryPoolEntry.warehouseLocations[0]).toBe("WarehouseTest");
                        done();
                    });
            });
    });
    it("Sc 2:Preferences in request))", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data.Optional["Scenario 2"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
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
                        console.log('statusCode:', response && response.statusCode);
                        expect(response.statusCode).toBe(200)
                        console.log("references Key: ", response.body.items[0].inventoryPoolEntry.referenceData[0].name);
                        expect(response.body.items[0].inventoryPoolEntry.referenceData[0].name).toBe("data");
                        console.log("references value: ", response.body.items[0].inventoryPoolEntry.referenceData[0].value);
                        expect(response.body.items[0].inventoryPoolEntry.referenceData[0].value).toBe("testdata");
                        done();
                    });
            });
    });

});



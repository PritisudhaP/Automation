
var request = require('request');
//var data = require('../testData_json/FTVErrorReason.json');
// var data = require(process.cwd() + '/src/tests/autoFiles/FTVErrorReason.json')
var data = require(process.cwd() + '/autoFiles/FTVErrorReason.json')
var moment = require('moment-timezone');
const { browser } = require('protractor');
var NowMoment = moment();
// OrderNbr generation
var SONumber = "OMS3328" + NowMoment.format("mmss");

describe('FTV Error reason in api response scenarios',function(){
 
    it("Scenario 01: pickupWindowEndTime < pickupWindowStartTime (Line 1 level)", done => {
        data["Scenario 01"].Input.orders[0].orderNumber = SONumber+01;
        //console.log(JSON.stringify(data["Scenario 01"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 01"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason1 = body.orders[0].orderErrorList[0].errorReason;
                var reason2 = body.orders[0].orderErrorList[1].errorReason;
                console.log("Scenario 1 pickupWindowEndTime < pickupWindowStartTime :", response.body);
                console.log("actual reason 1",reason1);
                console.log("actual reason 2",reason2);
                expect(reason1).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Sales Order line number :1, Pickup Window End time should be Future Time of Pickup Window Start Time'}");
                expect(reason2).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Sales Order Number:"+SONumber+01+", Pickup Window End time should be Future Time of Pickup Window Start Time'}")
                done();
            });
    });

    it("Scenario 02: pickupWindowEndTime < pickupWindowStartTime (order level)", done => {
        data["Scenario 02"].Input.orders[0].orderNumber = SONumber+02;
        //console.log(JSON.stringify(data["Scenario 02"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 02"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason = body.orders[0].orderErrorList[0].errorReason;
                console.log("Scenario 2 pickupWindowEndTime < pickupWindowStartTime :", response.body);
                console.log("actual reason",reason);
                expect(reason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Sales Order Number:"+SONumber+02+", Pickup Window End time should be Future Time of Pickup Window Start Time'}")
                done();
            });
    });

    it("Scenario 03: LinePrice < Line discount ", done => {
        data["Scenario 03"].Input.orders[0].orderNumber = SONumber+03;
        //console.log(JSON.stringify(data["Scenario 03"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 03"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason1 = body.orders[0].orderErrorList[0].errorReason;
                var reason2 = body.orders[0].orderErrorList[1].errorReason;
                console.log("Scenario 3: Line price < Line discount :", response.body);
                expect(reason1).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Line discounts cannot exceed total line price. For oms line number : 1'}")
                expect(reason2).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Order discounts cannot exceed total order price.'}")
                done();
            });
    });
    it("Scenario 04: LinePrices = Total discount ", done => {
        data["Scenario 04"].Input.orders[0].orderNumber = SONumber+04;
       // console.log(JSON.stringify(data["Scenario 04"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 04"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason = body.orders[0].orderErrorList[0].errorReason;
                console.log("Scenario 4: Line prices = Total Line discount :", response.body);
                console.log("actual reason",reason);
                expect(reason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Line discounts cannot exceed total line price. For oms line number : 1'}")
                done();
            });
    });
    it("Scenario 05: Invalid SKU ", done => {
        data["Scenario 05"].Input.orders[0].orderNumber = SONumber+05;
        // console.log(JSON.stringify(data["Scenario 05"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 05"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason = body.orders[0].orderErrorList[0].errorReason;
                console.log("Scenario 5: Invalid SKU :", response.body);
                console.log("actual reason",reason); 
                expect(reason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Following Skus [test1711] not found in catalog thkcatalog-- Sales Order Number:"+SONumber+05+"'}")
                done();
            });
    });
    it("Scenario 06: SKU doesn't exist in the system ", done => {
        data["Scenario 06"].Input.orders[0].orderNumber = SONumber+06;
       // console.log(JSON.stringify(data["Scenario 06"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 06"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason = body.orders[0].orderErrorList[0].errorReason;
                console.log("Scenario 6: SKU doesn't exist in the system :", response.body);
                console.log("actual reason",reason); 
                expect(reason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Following Skus [test_SKU] not found in catalog thkcatalog-- Sales Order Number:"+SONumber+06+"'}")
                done();
            });
    });
    it("Scenario 07: pickupWindowEndTime < pickupWindowStartTime (Multi lines level) ", done => {
        data["Scenario 07"].Input.orders[0].orderNumber = SONumber+07;
        // console.log(JSON.stringify(data["Scenario 07"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 07"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var reason = body.orders[0].orderErrorList[0].errorReason;
                console.log("Scenario 7: pickupWindowEndTime < pickupWindowStartTime (Multi lines level) :", response.body);
                console.log("actual reason",reason); 
                expect(reason).toBe("Static Constraints Violated:BaseModelConstraintViolation{path='', message='Sales Order line number :2, Pickup Window End time should be Future Time of Pickup Window Start Time'}")
                done();
            });
    });
    it("Scenario 08: Remove pickupWindow fields from request and it should create new order in open status ", done => {
        data["Scenario 08"].Input.orders[0].orderNumber = SONumber+08;
        //console.log(JSON.stringify(data["Scenario 08"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 08"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var orderStatus = body.orders[0].status;
                console.log("Scenario 8 :", response.body);
                expect(orderStatus).toBe("OPEN")
                done();
            });
    });
    it("Scenario 09: process with v1 (existing behavior) ", done => {
        data["Scenario 09"].Input.orders[0].orderNumber = SONumber+09;
        //console.log(JSON.stringify(data["Scenario 09"].Input));  
        var options = {
            method: 'POST',
            url: data.URL.orderCreation,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body:data["Scenario 09"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
               // var errors = error;
                 expect(response.statusCode).toBe(200)
                console.log('statusCode:', response && response.statusCode);
                var orderStatus = body.orders[0].status;
                console.log("Scenario 9: existing behavior", response.body);
                expect(orderStatus).toBe("FAILED_TO_VALIDATE")
                done();
            });
    });
})
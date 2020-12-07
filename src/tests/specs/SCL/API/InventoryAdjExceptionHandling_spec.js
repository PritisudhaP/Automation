const apiResource = require("protractor-api-resource").ProtractorApiResource;

var request = require('request');


//var data = require('../testData_json/InventoryAdjExceptionHandling.json')

var data = require(process.cwd() + '/src/tests/autoFiles/InventoryAdjExceptionHandling.json')

describe("Inventory Adjustment Exception Handling success & Failure Scenarios", function () {

    it("SC 01:All Success Increment", done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 01"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                // Sorting the response
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC01 Response:", responseSort);
                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(20);
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(20);
                var row4availableqty = responseSort[3].futureQty;
                expect(row4availableqty).toBe(20);
                done();
            });
    })
    it('SC 02:All Success Decrement', done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 02"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200);
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC02 Response:", responseSort);
                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(10);
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(10);
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(10);
                var row4availableqty = responseSort[3].futureQty;
                expect(row4availableqty).toBe(10);
                done();
            })
    })
    it('SC 03:All Failure', done => {
        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 03"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC03 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Qty can not be zero or empty or null");
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Given SkuId TestAUTOEXH02 doesnt exist");
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Given inventoryPoolRefName sandiego-d doesnt exist");
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("Description can not be null or empty");
                done();
            })
    })
});

describe("Combination of Success and Failure", function () {

    it("SC 04:Input has 4 records, and First record is invalid(1) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (2,3,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 04"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC04 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Given inventoryPoolRefName joliet doesnt exist");
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(20);
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);

                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 04"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });

    })
    it("SC 05:Input has 4 records, and Second record is invalid(2) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,3,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 05"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC05 Response:", responseSort);
                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(20);
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("InventoryPoolRefName or SiteRefName can not be null");
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(20);
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);

                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 05"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });

    })
    it("SC 06:Input has 4 records, and Third record is invalid(3) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,2,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 06"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC06 Response:", responseSort);
                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(20);
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("InventoryPoolRefName or SiteRefName can not be null");
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);

                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 06"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 07:Input has 4 records, and Fourth record is invalid(4) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,2,3)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 07"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                // console.log("", response.body);

                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });

                console.log("SC07 Response:", responseSort);

                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(20);
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(20);
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("Given site - testSite does not exist, dataDomain - com.thk");


                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: {
                        "adjustInventory": [
                            {
                                "inventoryPool": "joliet-dc",
                                "qty": -10,
                                "action": "Adjustment",
                                "sku": "3088SKU01",
                                "description": "test"
                            },
                            {
                                "inventoryPool": "joliet-dc",
                                "qty": -10,
                                "action": "Adjustment",
                                "sku": "3088SKU02",
                                "description": "test"
                            },
                            {
                                "inventoryPool": "sandiego-dc",
                                "qty": -10,
                                "action": "Adjustment",
                                "sku": "3088SKU03",
                                "description": "test"
                            },
                            {
                                "site": "testSite",
                                "qty": 10,
                                "action": "Adjustment",
                                "sku": "3088SKU04",
                                "description": "test"
                            }
                        ]
                    },
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();

                    });
            });

    })
    it("SC 08:Input has 4 records, First and Second records are invalid(1,2) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (3,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 08"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC08 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Qty can not be zero or empty or null");
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Sku can not be empty or null");
                var row3availableqty = responseSort[2].availableQty;
                expect(row3availableqty).toBe(20);
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);

                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 08"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 09:Input has 4 records, Third and Fourth records are invalid(3,4) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,2)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 09"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC09 Response:", responseSort);
                var row1availableqty = responseSort[0].availableQty;
                expect(row1availableqty).toBe(20);
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Description can not be null or empty");
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("Action can not be null or empty");

                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 09"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 10:Input has 4 records, First and Third records are invalid(1,3) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (2,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 10"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC10 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Sku Organization and Adjust Inventory Organization doesn't match");
                var row2availableqty = responseSort[1].availableQty;
                expect(row2availableqty).toBe(20);
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("UOM of input EA does not match to the sku UOM EACH");
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 10"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 11:Input has 4 records, Second and Fourth records are invalid(2,4) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,3)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 11"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC11 Response:", responseSort);
                var row1availableQty = responseSort[0].availableQty;
                expect(row1availableQty).toBe(20);
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Given SkuId Test3088SKU02 doesnt exist");
                var row3futureQty = responseSort[2].futureQty;
                expect(row3futureQty).toBe(20);
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("java.lang.IllegalArgumentException: No enum constant com.eis.ssit.api.v1.model.ActionType.testaction");
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 11"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 12:Input has 4 records, Second and Third records are invalid(2,3) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1,4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 12"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                // console.log("", response.body);

                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });

                console.log("SC12 Response:", responseSort);

                var row1availableQty = responseSort[0].availableQty;
                expect(row1availableQty).toBe(20);
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Sku can not be empty or null");
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Invalid Expected Arrival Date passed - 2020-09-19T14-:30:00.");
                var row4availableqty = responseSort[3].availableQty;
                expect(row4availableqty).toBe(20);
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 12"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 13:Input has 4 records, First and Fourth records are invalid(1,4) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (2,3)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 13"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC13 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Invalid Expected Ship Date passed - .");
                var row2availableQty = responseSort[1].availableQty;
                expect(row2availableQty).toBe(20);
                var row3availableQty = responseSort[2].availableQty;
                expect(row3availableQty).toBe(20);
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("Action can not be null or empty");
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 13"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();

                    });
            });
    })
    it("SC 14:Input has 4 records, Second,Third,Fourth records are invalid(2,3,4) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (1)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 14"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC14 Response:", responseSort);
                var row1availableQty = responseSort[0].availableQty;
                expect(row1availableQty).toBe(20);
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("fromBucket is not valid for bucket move");
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Sku can not be empty or null");
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("Description can not be null or empty");
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 14"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 15:Input has 4 records, Third,Fourth,First records are invalid(3,4,1) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (2)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 15"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC15 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Qty can not be zero or empty or null");
                var row2availableQty = responseSort[1].availableQty;
                expect(row2availableQty).toBe(20);
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Invalid Expected Ship Date passed - >2020-09-19T14:30:00.");
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("fromBucket can not be same as toBucket");
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 15"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 16:Input has 4 records, Fourth,First,Second records are invalid(4,1,2) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (3)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 16"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC16 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Description can not be null or empty");
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Qty can not be zero or empty or null");
                var row3futureQty = responseSort[2].futureQty;
                expect(row3futureQty).toBe(20);
                var row4error = responseSort[3].errorMessage;
                expect(row4error).toBe("toBucket is not valid for bucket move");
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 16"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
    it("SC 17:Input has 4 records, First,Second,Third records are invalid(1,2,3) and remaining records are valid then error thrown for invalid record & inventory adjustment done for valid records (4)", done => {

        var options = {
            method: 'POST',
            url: data.URL.InventoryAdjusment,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: data["SC 17"].Input,
        }
        options.json = true,
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
                expect(response.statusCode).toBe(200)
                var responseSort = body.adjustInventory.sort(function (a, b) {
                    return a.rowNo - b.rowNo;
                });
                console.log("SC17 Response:", responseSort);
                var row1error = responseSort[0].errorMessage;
                expect(row1error).toBe("Qty can not be zero or empty or null");
                var row2error = responseSort[1].errorMessage;
                expect(row2error).toBe("Action can not be null or empty");
                var row3error = responseSort[2].errorMessage;
                expect(row3error).toBe("Sku can not be empty or null");
                var row4availableQty = responseSort[3].availableQty;
                expect(row4availableQty).toBe(20);
                // reset qty
                var options1 = {
                    method: 'POST',
                    url: data.URL.InventoryAdjusment,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data["SC 17"].Reset,
                }
                options1.json = true,
                    request(options1, function (error, response, body) {
                        var errors = error;
                        expect(response.statusCode).toBe(200);
                        done();
                    });
            });
    })
});

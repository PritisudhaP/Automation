const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

var moment = require('moment');
var NowMoment = moment();
var startDate =NowMoment.toISOString();

var date = new Date();
var eDate = new Date();
var endDate = eDate.setDate(date.getDate()+3);
var value =NowMoment.format('YYMMDDHHmmss');
var presaleId = "abc2b0aa-5d71-46a3-a6a1-" + value;
var refkey = "085e4c219" + value + "2e481a4e475";

describe( "Make a sku available for presale", function () {


    it("SetUP presale for a sku", done =>{


        var presaleName = "prod200814164005" + "-2-2020-7-5-2020-7-2";
        var options = {
            method: 'POST',
            url: 'https://project4-qa.enspirecommerce.com/api/v1/skuPresale',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },


            body:  {
                "refName": presaleName,
                "refKey": refkey,
                "displayName": presaleName,
                "current": true,
                "keywords": [
                    presaleName
                ],
                "tags": [],
                "auditInfo": {
                    "creationTs": 1597212465483,
                    "createUser": "devi niveditha"
                },
                "uiactions": [],
                "forced": false,
                "objRef": true,
                "doNotAudit": false,
                "logicallyDeleted": false,
                "create": true,
                "dynAttributes": {},
                "internal": false,
                "referenceData": [],
                "trackHistory": {
                    "records": []
                },
                "id": presaleId,
                "skuId": "prod200814130746",
                "organizationRefKey": "aa8fb8424e25d25aae24c4728c12de8e",
                "presaleQty": 5,
                "startDate":startDate ,
                "endDate": endDate,
                "expectedShipDate": "2020-08-17T16:49:38.544Z",
                "dataDomains": [
                    "com.thk"
                ]
            }


        };
        options.json = true;


        request(options, function (error, response, body) {
            console.log('presaleName:', presaleName);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);


            done();

        });



    })



})


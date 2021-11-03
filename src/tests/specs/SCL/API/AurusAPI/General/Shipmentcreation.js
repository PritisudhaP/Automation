var mailboxScreen = require(process.cwd() + '/src/tests/screens/mailboxes/mailbox.screen.js');
var routeScreen = require(process.cwd() + '/src/tests/screens/routes/route.summary.screen.js');
var loginPage = require(process.cwd() + '/src/tests/screens/login/login.screen.js');


//var shipmentRequestNumber = 000000011610;


var common = require(process.cwd() + '/src/tests/screens/commons.js');
var request = require('request');


describe('Shipment confirmation  Flow  : ', function(){
   var loginScreen = new loginPage();
    var mailbox = new mailboxScreen();
    var route = new routeScreen();
    var commons = new common();

//it("shipment creation", function(){
//!Updated By vishak from here!// 
	
	/*
  browser.wait(function() {
                return shipmentRequestNumber != '';
            }).then(function() {

                var stringSearcher = require('string-search');
                var fs1 = require('fs');
                var filename1 = './src/tests/autoFiles/serviceshipconfirm.xml';

                var content="";
                fs1.readFile(filename1,"utf8", function read(err, data){
                    if (err) {
                        throw err;
                     }
                     content = data;
                });


                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<orderNumber>.*</orderNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSONumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<orderNumber>"+orderId+"</orderNumber>";
                        replace1({
                            regex: currentSONumber,
                            replacement: replaceString1,
                            paths: ['./src/tests/autoFiles/serviceshipconfirm.xml'],
                            recursive: true,
                            silent: true,

                        });
                    });
                });


                browser.wait(function() {
                    return content != '';
                }).then(function() {
                    stringSearcher.find(content,"<shipmentNumber>.*</shipmentNumber>").then(function(resultArr) {
                        var searchedLine = resultArr[0].text;
                        currentSRNumber = searchedLine.trim();
                        var replace1 = require("replace");
                        var replaceString1 = "<shipmentNumber>"+shipmentRequestNumber+"</shipmentNumber>";
                        replace1({
                            regex: currentSRNumber,
                            replacement: replaceString1,
                            paths: ['./src/tests/autoFiles/serviceshipconfirm.xml'],
                            recursive: true,
                            silent: true,
                        });
                    });
                });


    browser.get(mailboxUrl);
    browser.sleep(20000);
    mailbox.selectMailboxType("intermediateboxes");
    browser.sleep(5000);
    mailbox.searchMailboxWithinType("pinnedIntermediateboxes","ShipmentConfirmation-Canonical");
    browser.sleep(5000);
    mailbox.selectMailbox("ShipmentConfirmation-Canonical");
    mailbox.selectMailbox("ShipmentConfirmation-Canonical");

    mailbox.refresh();

    browser.getCurrentUrl().then(function (url) {
        var currentUrl = url;
        var newMsgUrl = url + "new-message";
        browser.get(newMsgUrl);
    });
    mailbox.enterTo(browser.params.login.user);
                mailbox.enterFrom(browser.params.login.user);
                mailbox.enterSubject("TC0001 Shipment confirmation upload");
                mailbox.addAttachment();
                var cwd = process.cwd();
                var fullPath = cwd + "/src/tests/autoFiles/serviceshipconfirm.xml";
                mailbox.clickSelectFile(fullPath);
                mailbox.uploadFile();
                browser.sleep(2000);
                mailbox.close();
                browser.sleep(2000);
                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToValidateShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToValidateShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);

                browser.get(routeUrl);
                browser.sleep(2000);
//                route.routeSearch("Name","routeToProcessShipmentConfirmation");
                commons.searchWithCriteria("Name","contains","routeToProcessShipmentConfirmation");
                browser.sleep(2000);
                route.routeSelectButton("Start");
                browser.sleep(5000);
                route.routeSelectButton("Stop");
                browser.sleep(2000);
            });
});


/*it("details api to get shipment number", done =>{
    console.log("start");
    console.log("response from first request is "+orderId);
   // var requestId= newGlobalVar

   var options = {
    method: 'POST',
    url: 'https://project0-qa.enspirecommerce.com/api/v1/order/detail',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer cc1210f0-6791-4a08-bc49-2bf837c68a4a'
    },
   // console.log("my variable:" + myVar);
     body: {
        "orderOrganization": "TheHonestKitchen-Organization-",
        "orderNumber": orderId,
        "orderTransactionType": "sales"
      }
    };
    options.json = true;
    request(options, function (error, response, body) {
        var errors = error;
        console.log('statusCode:', response && response.statusCode);
    //console.log('body:', body);//print only if needed, but stringify before u console it
    var orderDetailsJson = JSON.stringify(body);
   // console.log('<<<<<<<<<<<< Order Details Json@@@@@@@@:', orderDetailsJson);
    global.shipmentIdnumber=body.shipments[0].shipmentId;
    console.log("shipment id is "+shipmentIdnumber);



        //return errors;
        done();

    });



});
*/

/*
it("create invoice", function(){

    browser.get(routeUrl);
    browser.sleep(2000);
//  route.routeSearch("Name","routeToValidateShipmentConfirmation");
    commons.searchWithCriteria("Name","starts with","invoiceForShipments");
    browser.sleep(2000);
    route.routeSelectButton("Start");
    browser.sleep(5000);
    route.routeSelectButton("Stop");
    browser.sleep(6000);
    
    browser.get(routeUrl);
    browser.sleep(4000);
//  route.routeSearch("Name","routeToValidateShipmentConfirmation");
    commons.searchWithCriteria("Name","starts with","invoiceForShipments");
    browser.sleep(2000);
    route.routeSelectButton("Start");
    browser.sleep(5000);
    route.routeSelectButton("Stop");
    browser.sleep(2000);

});

*/
	//!Updated By Vishak !// 
		
	it("Shipment Creation", done =>{		
        var options = {
            method: 'POST',
            url: browser.params.APIRequest+'shipment/confirmShipment',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body:{
            	  "shipments": [
            		    {
            		      "shipmentNumber": "",
            		      "shipmentStatus": "SHIPPED",
            		      "shipmentDate": "2021-12-19T09:25:31-00:00",
            		      "finalShipment": true,
            		      "releaseReservation": false,
            		      "fulfillmentRequestId": "",
            		      "fulfillmentRequestNumber": shipmentRequestNumber,
            		      "orderId": "",
            		      "orderNumber": orderId,
            		      "orderOrganization": "TheHonestKitchen-Organization-",
            		      "fulfillmentType": "",
            		      "senderContactInfo": {
            		        "firstName": "WENDY",
            		        "lastName": "ZIESEMANN",
            		        "address": {
            		          "address1": "24 Green St",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "country": "US"
            		        },
            		        "primaryEmail": "wendyziesemann01749@thk.com",
            		        "primaryPhone": "(000) 000-0423"
            		      },
            		      "recipientContactInfo": {
            		        "firstName": "WENDY",
            		        "lastName": "ZIESEMANN",
            		        "address": {
            		          "address1": "24 Green St",
            		          "city": "Hudson",
            		          "state": "MA",
            		          "zip5": "01749",
            		          "country": "US"
            		        },
            		        "primaryEmail": "wendyziesemann01749@thk.com",
            		        "primaryPhone": "(000) 000-0423"
            		      },
            		      "shippingCarrier": "FEDEX",
            		      "carrierServiceType": "FedExGround",
            		      "packages": [
            		        {
            		          "id": "tst",
            		          "packageType": "tst",
            		          "packageDescription": "",
            		          "trackingNumber": " ",
            		          "hazardous": "false",
            		          "length": "1",
            		          "width": "2",
            		          "height": "3",
            		          "heightUom": "inches",
            		          "weight": "5.00",
            		          "tareWeight": "",
            		          "gerth": "0",
            		          "packageVolume": "0",
            		          "lineItems": [
            		            {
            					  "lineUID": "",
            		              "lineNumber": 1,
            		              "itemId": "testPriti1",
            		              "itemTitle": "testPriti1",
            		              "itemDescription": "testPriti1",
            		              "itemQty": 1,
            		              "itemUnitOfMeasure": "EA",
            		              "rejectedQty": 0,
            		              "rejectionReasonCode": "",
            		              "rejectionDescription": "",
            		              "referenceData": [
            		                {
            		                  "type": " ",
            		                  "name": " ",
            		                  "value": " "
            		                }
            		              ]
            		            }
            		          ]
            		        }
            		      ],
            		      "customerPickupDetails": {
            		        "pickedUpBy": "",
            		        "pickUpDate": "",
            		        "pickUpTime": "",
            		        "verificationProof": "",
            		        "verificationID": "",
            		        "notes": "TestNote"
            		      },
            		      "trackingDetails": {
            		        "identifierType": "1",
            		        "packageCount": "1"
            		      },
            		      "masterTrackingNumber": "782985990253",
            		      "totalShippingCharges": "0.0",
            		      "totalShippingCosts": "0.0",
            		      "totalAmountDue": "0.0",
            		      "chargeActualShippingCost": "true",
            		      "referenceData": [
            		        {
            		          "data": "CustomerID",
            		          "type": "String",
            		          "value": "000000000166"
            		        }
            		      ],
            		      "notes": [
            		        {
            		          "noteType": "ShipmentNote",
            		          "noteText": "Shipment Done Sucessfully !"
            		        }
            		      ],
            		      "dataDomains": [
            		        "com.thk"
            		      ]
            		    }
            		  ],
            		  "version": "1"
            		}
        };        
        options.json = true;
        request(options, function (error, response, body) {
    		var errors = error;
    		console.log('error:', + error);
    		console.log('statusCode:', response && response.statusCode);
    		console.log('body:', body);
    		expect(response.statusCode).toBe(200);		
	        done();
        });    
     });
	
});

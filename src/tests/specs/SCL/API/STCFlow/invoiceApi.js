const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');
var restdetailsapitest = require(process.cwd() + '/specs/SCL/getOrderDetails.js');
global.shipmentIdnumber="";
describe("test", function () {

    console.log("shipment id is in invoice spec is "+shipmentIdnumber);
    
           it("create invoice", done =>{
            
            var options = {
             method: 'POST',
             url: 'https://project0-qa.enspirecommerce.com/api/v1/invoice/buildInvoiceFromShipment?shipmentId='+shipmentIdnumber,
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': 'Bearer cc1210f0-6791-4a08-bc49-2bf837c68a4a'
             },
              
             };
             options.json = true;
             request(options, function (error, response, body) {
                 var errors = error;
                 console.log('statusCode:', response && response.statusCode);
            // console.log("invoice response is "+body);
            var url1='https://project0-qa.enspirecommerce.com/api/v1/invoice/buildInvoiceFromShipment?shipmentId=shipmentIdnumber';
            console.log("ürl is " + options.url);
            console.log("url1 is "+url1);
          done();
     
             });
          
           
  
     });
             
         
  
 });
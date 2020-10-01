const apiResource = require("protractor-api-resource").ProtractorApiResource;
var requestcreate = require(process.cwd() + '/specs/productWithSkuSet/apitest.spec.js');
var request = require('request');
describe( "test", function () {

    var requestcreate = new requestcreate();
    it("create SO", done =>{
        console.log("the execution of this spec was started.................");
        requestcreate.request().then(function (status) {
            var reshipStatus = status;
            console.log("The reship order status before saving" + status);
            done();

        });

    });

});

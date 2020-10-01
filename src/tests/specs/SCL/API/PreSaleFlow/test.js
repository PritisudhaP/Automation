var moment = require('moment');
var NowMoment = moment();
var value =NowMoment.toISOString();
var date = new Date();
var endDate = new Date();
var newvalue = endDate.setDate(date.getDate()+3);


//var output = value + 'Z';

describe( "test", function () {
    it("test",function(){
          console.log("the output value is "+value);
          console.log("the enddate value is "+endDate);
          console.log("the final value is "+finalvalue);

        });
})




describe('db connections  : ', function(){


        it(' TC0001', function(){





var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:2701/mydb";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("connected !");
  db.close();
});

})

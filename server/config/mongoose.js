var mongoose = require('mongoose');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var fs = require('fs');
var path = require('path');

// mongoose.connect('mongodb://heroku_jv9xgllr:347ci9oj5jp9mt45daps93fa7r@ds153501.mlab.com:53501/pinterestclonejulianauza');
// var models_path = path.join(__dirname, './../models');
// fs.readdirSync(models_path).forEach(function(file) {
//   if(file.indexOf('.js') >= 0) {
//     require(models_path + '/' + file);
//   }
// });

var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://<heroku_jv9xgllr>:<347ci9oj5jp9mt45daps93fa7r@ds111204>@ds153501.mlab.com:53501/pinterestclonejulianauza');
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
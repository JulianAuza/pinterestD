var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

mongoose.connect('mongodb://heroku_jv9xgllr:347ci9oj5jp9mt45daps93fa7r@ds111204.mlab.com:11204/heroku_jv9xgllr');
var models_path = path.join(__dirname, './../models');
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    require(models_path + '/' + file);
  }
});
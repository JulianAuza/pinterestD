var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
require('./server/config/mongoose.js');

var route_setter = require('./server/config/routes.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public/dist')));

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

route_setter(app);

var server = app.listen(8000, function () {
    console.log("listening on port 8000");
});
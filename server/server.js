var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config");

//setup port
var port = process.env.Port || 8080

//setup app
var app = express();

//connect to mongodb database
mongoose.connect("mongodb://localhost/");

//setup sever to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//import routes
var apiRouter = require("./Routes/api.js");

//use routes
app.use("/personal", apiRouter);

//listen to port
app.listen(port, function() {
    console.log("I'm listening at port " + port);
})
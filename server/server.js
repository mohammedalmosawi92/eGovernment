var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config");
var ejs = require("ejs");
var path = require("path");
var config = require("./config.js");

//setup port
var port = process.env.Port || 8080

//setup app
var app = express();

//connect to mongodb database
mongoose.connect("mongodb://localhost/" + config.database);

//setup server to handle json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//setyp server to handle html
app.use(express.static(path.join(__dirname + "\\..\\public\\")));
app.set("views", __dirname + "\\..\\public\\views");
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//import routes
var apiRouter = require("./Routes/api.js");
var authRouter = require("./Routes/auth.js");
var filesRouter = require("./Routes/files.js");

//use routes
app.use(authRouter);
app.use("/personal", apiRouter);
app.use(filesRouter);

//listen to port
app.listen(port, function() {
    console.log("I'm listening at port " + port);
})
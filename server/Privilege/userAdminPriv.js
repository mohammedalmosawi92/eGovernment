var express = require("express");
var jwt = require("jsonwebtoken");
var config = require("../config.js");

//setup router
var userAdminPriv = express();

userAdminPriv.use("/", function(req, res, next) {
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            res.status(500).send({message: "Invalid Token"})
        }else if(decoded._doc.privilege === "user" || decoded._doc.privilege === "admin") {
            next();
        }else {
            res.status(403).send({message: "You have to be a user"});
        }
    })
})

module.exports = userAdminPriv;
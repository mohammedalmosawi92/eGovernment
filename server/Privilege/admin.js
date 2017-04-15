var express = require("express");
var config = require("../config.js");
var jwt = require("jsonwebtoken");

//setup router
var adminPriv = express();

adminPriv.use("/", function(req, res, next) {
    var token = req.get("Authorization").split("Bearer ")[1];
    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            res.status(500).send({err: err});
        }else if(decoded._doc.privilege === "admin"){
            next();
        }else {
            res.status(200).send({message: "You dont have the permission to enter to this part of the site"})
        }
    })
})

module.exports = adminPriv;
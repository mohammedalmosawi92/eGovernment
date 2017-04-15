var express = require("express");
var mongoose = require("mongoose");
var Users = require("../Model/users.js");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var config = require("../config.js");

//setup router
var authRouter = express.Router();

authRouter.post("/signup", function(req, res) {
    Users.find({username: req.body.username}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else if(data.length > 0) {
            res.status(403).send({message: "This user already exists"});
        }else {
            if(req.body.password != undefined) {
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            }
            var newUser = new Users(req.body);
            newUser.save(function(err, user) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    console.log(user);
                    res.status(200).send({message: "You have signed up"});
                }
            })
        }
    })
})

authRouter.post("/signin", function(req, res) {
    Users.findOne({username: req.body.username}, function(err, user) {
        if(err) {
            res.status(500).send({err: err});
        }else if(user == undefined) {
            res.status(403).send({message: "No such username"});
        }else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err) {
                    res.status(500).send({err: err});
                }else if(result){
                    var token = jwt.sign(user, config.secret, {expiresIn: "2h"});
                    res.status(200).send({message: "You have signed in", privilege: user.privilege, token: token,id: user._id})
                }else {
                    res.status(403).send({message: "The password is wrong"});
                }
            })
        }
    })
})

module.exports = authRouter;
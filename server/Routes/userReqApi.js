var express = require("express");
var mongoose = require("mongoose");
var UserReq = require("../Model/userReq.js");

//setup router
var userReqRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

userReqRouter.use(userAdminPriv);

userReqRouter.post("/", function(req, res) {
    console.log(req.body);
    var newUserReq = new UserReq(req.body);
    newUserReq.save(function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            console.log("hello")
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only admin can do the below requests
userReqRouter.use(adminPriv);

//get all the Complain info
userReqRouter.get("/", function(req, res) {
    UserReq.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});


//get Complain info by id Number
userReqRouter.get("/:id", function(req, res) {
    UserReq.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//remove Complain info
userReqRouter.delete("/:id", function(req, res) {
    UserReq.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            data.remove(function(err, removedData) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "You have delete a Complain", data: removedData});
                }
            })
        }
    })
})

module.exports = userReqRouter;
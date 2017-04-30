var express = require("express");
var mongoose = require("mongoose");
var Complain = require("../Model/complains.js");

//setup router
var complainsRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

//only users can do the requests below
complainsRouter.use(userAdminPriv);

//add new Complain info
complainsRouter.post("/", function(req, res) {
    var newComplain = new Complain(req.body);
    newComplain.save(function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only admin can do the below requests
complainsRouter.use(adminPriv);

//get all the Complain info
complainsRouter.get("/", function(req, res) {
    Complain.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});


//get Complain info by id Number
complainsRouter.get("/:id", function(req, res) {
    Complain.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//remove Complain info
complainsRouter.delete("/:id", function(req, res) {
    Complain.findById(req.params.id, function(err, data) {
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

module.exports = complainsRouter;
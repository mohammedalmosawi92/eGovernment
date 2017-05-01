var express = require("express");
var mongoose = require("mongoose");
var Change = require("../Model/change.js");

//setup router
var changeRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

//only users can do the requests below
changeRouter.use(userAdminPriv);

//add new Complain info
changeRouter.post("/", function(req, res) {
    var newChange = new Change(req.body);
    newComplain.save(function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only admin can do the below requests
changeRouter.use(adminPriv);

//get all the Complain info
changeRouter.get("/", function(req, res) {
    Change.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});


//get Complain info by id Number
changeRouter.get("/:id", function(req, res) {
    Change.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//remove Complain info
changeRouter.delete("/:id", function(req, res) {
    Change.findById(req.params.id, function(err, data) {
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

module.exports = changeRouter;
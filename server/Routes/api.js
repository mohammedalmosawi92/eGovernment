var express = require("express");
var mongoose = require("mongoose");
var Personal = require("../Model/personalInfo.js");

//setup router
var apiRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

//get all the personal info
apiRouter.get("/", function(req, res) {
    Personal.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only users can do the requests below
apiRouter.use(userAdminPriv);

//get personal info by id
apiRouter.get("/:id", function(req, res) {
    Personal.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//add new personal info
apiRouter.post("/", function(req, res) {
    var newPersonal = new Personal(req.body);
    newPersonal.save(function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only admin can do the below requests
apiRouter.use(adminPriv);

//remove personal info
apiRouter.delete("/:id", function(req, res) {
    Personal.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            data.remove(function(err, removedData) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "You have delete a personal info", data: removedData});
                }
            })
        }
    })
})

//update personal info
apiRouter.put("/:id", function(req, res) {
    Personal.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            for(key in req.query) {
                data[key] = req.query[key];
            }
            data.save(function(err, updatedData) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "You have updated a personal info", data: updatedData});
                }
            })
        }
    })
})

module.exports = apiRouter;
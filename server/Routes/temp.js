var express = require("express");
var mongoose = require("mongoose");
var TempPersonal = require("../Model/tempPersonalInfo.js");

//setup router
var apiTempRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

//user and admin can do the part below
apiTempRouter.use(userAdminPriv);

//add new personal info
apiTempRouter.post("/", function (req, res) {
    var newTempPersonal = new TempPersonal(req.body);
    newTempPersonal.save(function (err, data) {
        if (err) {
            res.status(500).send({err: err});
        } else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//get personal info by id
apiTempRouter.get("/:userId", function (req, res) {
    TempPersonal.findOne({userId:req.params.userId}, function (err, data) {
        if (err) {
            res.status(500).send({err: err});
        } else {
            res.status(200).send({message: "success", data: data});
        }
    })
});


//only admin can do the below requests
apiTempRouter.use(adminPriv);

//get all the personal info
apiTempRouter.get("/", function (req, res) {
    TempPersonal.find({}, function (err, data) {
        if (err) {
            res.status(500).send({err: err});
        } else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//remove personal info
apiTempRouter.delete("/:id", function (req, res) {
    TempPersonal.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).send({err: err});
        } else {
            data.remove(function (err, removedData) {
                if (err) {
                    res.status(500).send({err: err});
                } else {
                    res.status(200).send({message: "You have delete a personal info", data: removedData});
                }
            })
        }
    })
})

//update personal info
apiTempRouter.put("/:id", function (req, res) {
    TempPersonal.findById(req.params.id, function (err, data) {
        if (err) {
            res.status(500).send({err: err});
        } else {
            for (key in req.query) {
                data[key] = req.query[key];
            }
            data.save(function (err, updatedData) {
                if (err) {res.status(500).send({err: err});
                } else {
                    res.status(200).send({message: "You have updated a personal info", data: updatedData});
                }
            })
        }
    })
})

module.exports = apiTempRouter;
var express = require("express");
var mongoose = require("mongoose");
var personal = require("../Model/personalInfo.js");

//setup router
var apiRouter = express.Router();

//get all the personal info
apiRouter.get("/", function(req, res) {
    personal.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
})

//get personal info by id
apiRouter.get("/:id", function(req, res) {
    personal.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
})

//add new personal info
apiRouter.post("/", function(req, res) {
    var newPersonal = new personal(req.body);
    newPersonal.save(function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
})

//remove personal info
apiRouter.delete("/:id", function(req, res) {
    personal.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            data.remove(function(err, removedData) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "success", data: removedData});
                }
            })
        }
    })
})

//update personal info
apiRouter.put("/:id", function(req, res) {
    personal.findById(req.params.id, function(err, data) {
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
                    res.status(200).send({message: "success", data: updatedData});
                }
            })
        }
    })
})

module.exports = apiRouter;
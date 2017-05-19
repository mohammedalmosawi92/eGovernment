var express = require("express");
var mongoose = require("mongoose");
var Users = require("../Model/users.js");

//setup router
var usersRouter = express.Router();

//import privileges
var adminPriv = require("../Privilege/admin.js");
var userAdminPriv = require("../Privilege/userAdminPriv.js");

//only registered users can do this part
usersRouter.use(userAdminPriv);

//update the status
usersRouter.put("/:id/:status", function(req, res) {
    Users.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(500).send({err: err})
        }else {
            user.status = req.params.status;
            user.save(function(err, data) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "you have updated the status"})
                }
            })
        }
    })
})

//add request type and the date of the request
usersRouter.post("/:id", function(req, res) {
    Users.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            var obj = {};
            for(key in req.body) {
                obj[key] = req.body[key];
            }
            data.requests.push(obj);
            data.save(function(err, result) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "success", data: data});
                }
            })
        }
    })
});

//get only one user using id
usersRouter.get("/:id", function(req, res) {
    Users.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//only admin can do the below requests
usersRouter.use(adminPriv);

//get all the users
usersRouter.get("/", function(req, res) {
    Users.find({}, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            res.status(200).send({message: "success", data: data});
        }
    })
});

//remove a specific user
usersRouter.delete("/:id", function(req, res) {
    Users.findById(req.params.id, function(err, data) {
        if(err) {
            res.status(500).send({err: err});
        }else {
            data.remove(function(err, removedData) {
                if(err) {
                    res.status(500).send({err: err});
                }else {
                    res.status(200).send({message: "You have deleted a user", data: removedData});
                }
            })
        }
    })
});

//update a specific user
usersRouter.put("/:id", function(req, res) {
    console.log(req.params.id)
    console.log(req.query)
    Users.findById(req.params.id, function(err, data) {
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
                    res.status(200).send({message: "You have updated a user info", data: updatedData});
                }
            })
        }
    })
});

module.exports = usersRouter;
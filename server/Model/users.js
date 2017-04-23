var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    privilege: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"]
    },
    idNumber: {
        type: Number,
        required: true,
        unique: true
    },
    requests : []
})

module.exports = mongoose.model("Users", usersSchema);
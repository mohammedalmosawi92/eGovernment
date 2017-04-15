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
    requests : []
})

module.exports = mongoose.model("Users", usersSchema);
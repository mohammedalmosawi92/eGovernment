var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ComplainsSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    complain: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Complains", ComplainsSchema);
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personalSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    IDNumber: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("PersonalInformation", personalSchema);
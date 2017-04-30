var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personalSchema = new Schema({
    firstName: {
        type: String,
    },
    userId: {
        type: String,
        unique: true
    },
    lastName: {
        type: String,
    },
    idNumber: {
        type: Number,
        unique: true
    },
    sex: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
    dob: {
        type: Date,
    },
    placeOfBirth: {
        type: String,
    },
    status: {
        type: String,
    },
    religion: {
        type: String,
    },
    RegistrationNum: {
        type: Number,
    },
    RegistrationPlace: {
        type: String,
    },
    address: {
        type: String,
    },
    cellPhone: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    personalImage: {
        type: String,
    },
    idImage: {
        type: String,
    }
})

module.exports = mongoose.model("PersonalInformation", personalSchema);
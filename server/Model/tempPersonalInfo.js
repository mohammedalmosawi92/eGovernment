var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tempPersonalSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    firstName: {
        type: String,
       
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

module.exports = mongoose.model("TempPersonalInformation", tempPersonalSchema);
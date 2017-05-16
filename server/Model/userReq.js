var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserReqSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    reqType: {
        type: String,
        required: true
    },
    datas: {
        type: [],
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("UserReq", UserReqSchema);
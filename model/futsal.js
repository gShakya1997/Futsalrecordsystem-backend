const mongoose = require("mongoose");

const futsalSchema = new mongoose.Schema({
    futsalName: {
        type: String,
        required: true,
        unique: true
    },
    futsalAddress:{
        type: String,
        required:true
    },
    futsalEmail:{
        type: String,
        required:true
    },
    futsalPhone:{
        type: String,
        required:true
    },
    futsalPassword:{
        type: String,
        required:true
    },
    futsalOpeningTime:{
        type:String,
        required:true
    },
    futsalClosingTime:{
        type: String,
        required: true
    },
    futsalPrice:{
        type:String,
        required: true
    },
    futsalImage:{
        type:String
    }
});

module.exports = mongoose.model("Futsal", futsalSchema);
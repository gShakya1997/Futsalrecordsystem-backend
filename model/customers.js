const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
    customerFullname: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhoneNo: {
        type: String,
        required: true
    },
    customerGender: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Futsal"
    }
});

module.exports = mongoose.model("Customers", customersSchema);
const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    entryFee: {
        type: String,
        required: true
    },
    eventDetail: {
        type: String,
        required: true
    },
    eventImage: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Futsal"
    }
});

module.exports = mongoose.model("Events", eventsSchema);
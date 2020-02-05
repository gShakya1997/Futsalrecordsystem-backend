const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    available1: {
        type: String
    },
    available2: {
        type: String
    },
    available3: {
        type: String
    },
    available4: {
        type: String
    },
    available5: {
        type: String
    },
    available6: {
        type: String
    },
    available7: {
        type: String
    },
    available8: {
        type: String
    },
    available9: {
        type: String
    },
    available10: {
        type: String
    },
    available11: {
        type: String
    },
    available12: {
        type: String
    },
    available13: {
        type: String
    },
    available14: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Futsal"
    }
});

module.exports = mongoose.model("Booking", bookingSchema);
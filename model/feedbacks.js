const mongoose = require("mongoose");

const feedbacksSchema = new mongoose.Schema({
    rating: {
        type: String
    },
    feedback: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Futsal"
    }
});

module.exports = mongoose.model("Feedbacks", feedbacksSchema);
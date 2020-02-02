const express = require("express");
const Feedback = require("../model/feedbacks");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let feedback = new Feedback(req.body);
        feedback.owner = req.futsal._id;
        console.log(feedback);
        feedback.save()
            .then((feedback) => {
                res.statusCode = 201;
                res.json(feedback);
            }).catch(next);
    });

module.exports = router;

const express = require("express");
const Event = require("../model/events");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let event = new Event(req.body);
        event.owner = req.futsal._id;
        event.save()
            .then((event) => {
                res.statusCode = 201;
                res.json(event);
            }).catch(next)
    });

module.exports = router;
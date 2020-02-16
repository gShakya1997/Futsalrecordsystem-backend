const express = require("express");
const Booking = require("../model/booking");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let booking = new Booking(req.body);
        booking.owner = req.futsal._id;
        booking.save()
            .then((booking) => {
                res.statusCode = 201;
                res.json(booking);
            }).catch(next)
    })
    .get((req, res, next) => {
        Booking.find({ owner: req.futsal._id })
            .then((booking) => {
                res.json(booking);
            })
            .catch((err) => {
                next(err);
            });
    });

router.route("/:id")
    .put((req, res, next) => {
        Booking.findOneAndUpdate({ owner: req.futsal._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Booking updated");
                res.json(reply);
            }).catch(next);
    });

module.exports = router;
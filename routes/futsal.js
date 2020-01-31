const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Futsal = require("../model/futsal");
const Customers = require("../model/customers");
const router = express.Router();
const auth = require("../auth");

//register
router.post("/register", (req, res, next) => {
    let hashPassword = req.body.futsalPassword;
    bcrypt.hash(hashPassword, 7, function (err, hash) {
        if (err) {
            let err = new Error("Could not hash");
            err.status = 500;
            return next(err);
        }
        Futsal.create({
            futsalName: req.body.futsalName,
            futsalAddress: req.body.futsalAddress,
            futsalEmail: req.body.futsalEmail,
            futsalPhone: req.body.futsalPhone,
            futsalPassword: hash,
            futsalOpeningTime: req.body.futsalOpeningTime,
            futsalClosingTime: req.body.futsalClosingTime,
            futsalPrice: req.body.futsalPrice,
            futsalImage: req.body.futsalImage
        })
            .then((futsal) => {
                let token = jwt.sign({ _id: futsal._id }, process.env.SECRET);
                res.json({
                    status: "Registered Successfully!",
                    token: token
                });
            })
            .catch(next);
    });
});

//login
router.post("/login", (req, res, next) => {
    // console.log(req.body);
    Futsal.findOne({
        futsalName: req.body.futsalName
    })
        .then((futsal) => {
            if (futsal == null) {
                let err = new Error("Futsal not found");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.futsalPassword, futsal.futsalPassword)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error("Password doesn't match. Try again!");
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: futsal._id,
                        }, process.env.SECRET);
                        res.json({
                            status: "Login successful",
                            token: token
                        });
                        console.log(token);
                    }).catch(next);
            }
        }).catch(next);
})

//get profile detail
router.get("/profile", auth.verifyUser, (req, res, next) => {
    // console.log(req.futsal);
    res.json({
        _id: req.futsal._id,
        futsalName: req.futsal.futsalName,
        futsalImage: req.futsal.futsalImage,
        futsalEmail: req.futsal.futsalEmail,
        futsalPhone: req.futsal.futsalPhone
    });
});

module.exports = router;
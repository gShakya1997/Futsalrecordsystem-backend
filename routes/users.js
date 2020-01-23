const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const router = express.Router();


//registration

router.post("/register", (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 7, (err, hash) => {
        console.log(err);
        if (err) {
            let err = new Error("Could not hash");
            err.status = 500;
            return next(err);
        }
        User.create({
            username: req.body.username,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            password: hash,
            gender: req.body.gender,
            image: req.body.image
        })
            .then((user) => {
                let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                res.json({
                    status: "Registered Succuessfully!",
                    token: token
                });
            })
            .catch(next);
    });
});

module.exports = router;
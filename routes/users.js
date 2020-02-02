const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const Futsal = require("../model/futsal");
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
                    status: "Registered Successfully!",
                    token: token
                });
            })
            .catch(next);
    });
});

//login
router.post("/login", (req, res, next) => {
    console.log(req.body);
    User.findOne({
        username: req.body.username
    })
        .then((user) => {
            if (user == null) {
                let err = new Error("User not found");
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error("Password doesn't match. Try again!");
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({
                            _id: user._id,
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

router.get("/futsalList", (req, res, next) => {
    Futsal.find()
        .then((futsal) => {
            console.log(futsal);
            res.json(futsal);
        })
        .catch((err)=>{
            next(err);
        });
});

module.exports = router;
const express = require("express");
const Customer = require("../model/customers");
const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        Customer.find({ owner: req.futsal._id })
            .then((customers) => {
                console.log(customers);
                res.json(customers);
            })
            .catch((err) => {
                next(err)
            });
    })
    .post((req, res, next) => {
        let customer = new Customer(req.body);
        customer.owner = req.futsal._id;
        console.log(customer);
        customer.save()
            .then((customer) => {
                res.statusCode = 201;
                res.json(customer);
            }).catch(next);
    });

router.route("/:customerFullname")
    .get((req, res, next) => {
        Customer.find({ owner: req.futsal.id, customerFullname: req.params.customerFullname })
            .then((customers) => {
                console.log(customers);
                res.json(customers);
            })
            .catch((err) => {
                next(err)
            });
    });

router.route("/:id")
    .put((req, res, next) => {
        console.log(req.body);
        Customer.findOneAndUpdate({ owner: req.futsal._id, _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                if (reply == null) throw new Error("Customer not found");
                res.json(reply);
            }).catch(next);
    })
    .delete((req, res, next) => {
        Customer.findOneAndDelete({ owner: req.futsal._id, _id: req.params.id })
            .then((customer) => {
                if (customer == null) throw new Error("Customer not found");
                res.json(customer);
            }).catch(next);
    });


module.exports = router;
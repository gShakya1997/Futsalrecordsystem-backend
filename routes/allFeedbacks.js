const express = require("express");
const Feedback = require("../model/feedbacks");
const router =express.Router();

router.route("/")
.get((req,res,next)=>{
	Feedback.find()
	.then((feedback)=>{
		console.log(feedback);
		res.json(feedback);
	})
	.catch((err)=>{
		console.log(err);
	});
});

module.exports = router;
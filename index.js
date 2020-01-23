const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/users");

const app = express();
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//routes
app.use("/users", userRouter);

//database config
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    console.log("Successfully connected to MongoDB server");
}, (err) => console.log(err));


app.listen(process.env.PORT,()=>{
    console.log(`App is running at localhost:${process.env.PORT}`);
});

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});
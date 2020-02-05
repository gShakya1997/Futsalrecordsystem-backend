const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/users");
const uploadRouter = require("./routes/upload");
const futsalRouter = require("./routes/futsal");
const customerRouter = require("./routes/customers");
const eventRouter = require("./routes/events");
const feedbackRouter = require("./routes/feedbacks");
const bookingRouter = require("./routes/booking");
const auth = require("./auth");

const app = express();
app.options("*", cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//routes
app.use("/users", userRouter);
app.use("/upload", uploadRouter);
app.use("/futsal", futsalRouter);
app.use(auth.verifyUser);
app.use("/customers", auth.verifyUser, customerRouter);
app.use("/events", auth.verifyUser, eventRouter);
app.use("/feedbacks", auth.verifyUser, feedbackRouter);
app.use("/booking", auth.verifyUser, bookingRouter);

//database config
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    console.log("Successfully connected to MongoDB server");
}, (err) => console.log(err));


app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});
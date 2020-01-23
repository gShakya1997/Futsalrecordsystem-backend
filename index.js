const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.options("*",cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
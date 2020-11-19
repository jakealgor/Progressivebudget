const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const timeout = require('connect-timeout')

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(timeout('5s'))
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
process.env.MONGODB_URI || "mongodb://localhost/budget", {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
});

app.use(require("./routes/api.js"));

app.listen(3000, () => {
console.log(`App running on port ${3000}!`);
});
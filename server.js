const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const timeout = require('connect-timeout')
const uri = "mongodb+srv://Jakealgor:<passwordGibson101>@cluster0.s3cqc.mongodb.net/<Progressive>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(timeout('5s'))
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
process.env.MONGODB_URI || "mongodb://localhost/Progressive", {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
});

app.use(require("./routes/api.js"));

app.listen(3000, () => {
console.log(`App running on port ${3000}!`);
});
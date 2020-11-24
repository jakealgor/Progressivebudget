var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var compression = require("compression");

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budgetracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
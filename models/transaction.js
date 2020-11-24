var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var transactionSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    value: {
      type: Number,
      required: "Enter an amount"
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
);

var Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;

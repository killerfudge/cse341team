const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  budget: {
    items: [
      {
        budgetItemId: {
          type: Schema.Types.ObjectId,
          ref: "BudgetItem",
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetItemSchema = new Schema({
  budgetItemName: {
    type: String,
    required: true
  },
  plannedCost: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  actualCost: {
    type: Number,
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
});


module.exports = mongoose.model('BudgetItem',budgetItemSchema);
const { default: mongoose } = require('mongoose');
const BudgetItem = require('../models/budget-item');

exports.getBudget = (req, res, next) => {

}

exports.addBudgetItem = (req, res, next) => {
    const budgetItemName = req.body.budgetItemName;
    const plannedCost = req.body.budgetItemName;
    const description = req.body.description;
    const date = Date.now();
    const userId = new ObjectId("62298c1f50fc66792895406e");

    const budgetItem = new BudgetItem({
        budgetItemName: budgetItemName,
          plannedCost: plannedCost,
          description: description,
          date: date,
          userId: userId
    });
}

exports.editBudgetItem = (req, res, next) => {

}
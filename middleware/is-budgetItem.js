const BudgetItem = require('../models/budget-item');

module.exports = (req, res, next) => {
    const budgetItemId = req.body.budgetItemId;
    if(!budgetItemId){
        const error = new Error('Please provide budgetItemId');
            error.statusCode = 404;
            throw error;
    }
    BudgetItem.findById(budgetItemId).then(budgetItem => {
        if (!budgetItem) {
            const error = new Error('Could not find budget item. Did you possibly delete that item?');
            error.statusCode = 404;
            throw error;
        }
    }).catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });
    next();
};
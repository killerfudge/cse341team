const BudgetItem = require('../models/budget-item');

exports.getBudget = (req, res, next) => {

}

exports.addBudgetItem = (req, res, next) => {

}

exports.editBudgetItem = (req, res, next) => {

};

exports.deleteBudgetItem = (req, res, next) => {
    const budgetItemId = req.params.budgetId;
    BudgetItem.findById(budgetItemId)
        .then(budgetItem => {
            if(!budgetItem){
                const error = new Error("Could not find the budget.");
                error.statusCode = 404;
                throw error;
            }
            // Once login function is ready, we can use this code

            // if(budgetItem.userId.toString() !== req.userId){
            //     const error = new Error("Not Authorized!");
            //     error.statusCode = 403;
            //     throw error;
            // }

            return BudgetItem.findByIdAndRemove(budgetItemId);
        })
        .then(result => {
            res.status(200).json({message: "Deleted Budget"});
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
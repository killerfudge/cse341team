const { default: mongoose } = require('mongoose');
const BudgetItem = require('../models/budget-item');
const User = require('../models/user');

exports.getBudget = (req, res, next) => {

}

exports.getOneBudgetItem = (req, res, next) =>{
    const budgetId = req.body._id;
    BudgetItem.findById(budgetId).then(budgetItem =>{
    res.json(budgetItem);
    })
}

//Adds acutual cost to a budget item with given budget Item id and acutal cost
exports.addActualCost = (req, res, next) => {
    const budgetItemId = req.body.budgetItemId;
    const actualCost = req.body.actualCost;
    BudgetItem.findOne({_id: budgetItemId}).then( budgetItem => {
        budgetItem.actualCost = actualCost;
        budgetItem.save();
    }).then(result =>{
        res.json({msg:"Actual cost added/updated"});
    })
}

//Adds the initial BudgetItem with name, planned cost, description, date and user email is used to associated with user who created it
exports.addBudgetItem = (req, res, next) => {
    const budgetItemName = req.body.budgetItemName;
    const plannedCost = req.body.plannedCost;
    const description = req.body.description;
    const email = req.body.email;
    const date = Date.now();

    const budgetItem = new BudgetItem({
        budgetItemName: budgetItemName,
        plannedCost: plannedCost,
        description: description,
        date: date,
    });
    User.findOne({email: email}).then(user =>{
        budgetItem.userId = user._id;
        budgetItem.save();
        user.budget.items.push({budgetItemId: budgetItem._id});
        user.save();
    }).then(result => {
        res.json({meg:"Yay Budget Item Added!"});
    }); 
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
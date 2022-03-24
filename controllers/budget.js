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
        date: date
    });
    User.findOne({email: email}).then(user =>{
        budgetItem.userId = user._id;
        budgetItem.save();
        user.budget.items.push({budgetItemId: budgetItem._id});
        user.save();
    }).then(result => {
        res.json({meg:"Yay Budget Item Added!", budgetId: budgetItem._id});
    }); 
}

exports.editBudgetItem = (req, res, next) => {

};

//Controller for deleting budgetItem from budget-item schema and budgetitemId from user.
//Json values will be email and budgetItemId
exports.deleteBudgetItem = (req, res, next) => {
    const email = req.body.email;
    const budgetId = req.body.budgetId;
    
    User.findOne({ email: email })
        .then(user =>{
            if(!user){
                const error = new Error("Could not find the User!!");
                error.statusCode = 404;
                throw error;
            }
            
            const ids = user.budget.items;
            let userBudgetId;
            ids.forEach(id =>{
                console.log("BudgetItem : "+typeof(id.budgetItemId) )
                const budgetString = id.budgetItemId.toString();
                if(!budgetString.localeCompare(budgetId)){
                    userBudgetId = id._id;
                }
            })
            user.budget.items.pull({_id:userBudgetId});
            return user.save();
        })
        .then(result => {
            return BudgetItem.findById(budgetId)
        })
        .then(budgetItem => {
            if(!budgetItem){
                const error = new Error("Could not find the budget.");
                error.statusCode = 404;
                throw error;
            }
            return BudgetItem.findByIdAndRemove(budgetId);
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
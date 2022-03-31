const { default: mongoose } = require('mongoose');
const { validationResult } = require('express-validator');
const BudgetItem = require('../models/budget-item');
const User = require('../models/user');

//Get users budget
exports.getBudget = (req, res, next) => {

    User.findById(req._userId)
    .populate('budget.items.budgetItemId')
    .then(user => {
        res.status(200).json(user.budget); 
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

//Get user's budget Item
exports.getOneBudgetItem = (req, res, next) =>{
    const budgetItemId = req.body.budgetItemId;
    BudgetItem.findById(budgetItemId).then(budgetItem =>{
    res.status(200).json(budgetItem);
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });
}

//Add's user's budget Item
//Adds the initial BudgetItem with name, planned cost, description, date and user email is used to associated with user who created it
exports.addBudgetItem = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const budgetItemName = req.body.budgetItemName;
    const plannedCost = req.body.plannedCost;
    const description = req.body.description;
    const date = Date.now();

    const budgetItem = new BudgetItem({
        budgetItemName: budgetItemName,
        plannedCost: plannedCost,
        description: description,
        date: date,
        userId: req._userId

    });
    budgetItem.save();
    User.findById(req._userId).then(user =>{
        user.budget.items.push({budgetItemId: budgetItem._id});
        user.save();
    }).then(result => {
        res.status(201).json({meg:"Yay Budget Item Added!", budgetId: budgetItem._id});
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
}

//Adds or updates Users budget Item actual cost
//Adds acutual cost to a budget item with given budget Item id and acutal cost
exports.addActualCost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const budgetItemId = req.body.budgetItemId;
    const actualCost = req.body.actualCost;
    BudgetItem.findById(budgetItemId).then( budgetItem => {
        budgetItem.actualCost = actualCost;
        budgetItem.save();
    })
    .then(result =>{
        res.status(200).json({msg:"Actual cost added/updated"});
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}

//Edits user's budget item name
exports.editBudgetItemName = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const budgetItemId = req.body.budgetItemId;
    const newBudgetItemName = req.body.budgetItemName;
    BudgetItem.findById(budgetItemId).then(budgetItem => {
        budgetItem.budgetItemName = newBudgetItemName;
        budgetItem.save();
    }).then(result => {res.status(200).json({msg:"Name Updated"})})
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};

//Edits user's budget item's planned cost
exports.editPlannedCost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const budgetItemId = req.body.budgetItemId;
    const newPlannedCost = req.body.plannedCost;
    BudgetItem.findById(budgetItemId).then(budgetItem => {
        budgetItem.plannedCost = newPlannedCost;
        budgetItem.save();
    }).then(result =>{res.status(200).json({msg:"Cost Updated"})})
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
     });
};

//Edits user's budget item's description
exports.editDescription = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
    const budgetItemId = req.body.budgetItemId;
    const newDescription = req.body.description;
    BudgetItem.findById(budgetItemId).then(budgetItem => {
        budgetItem.description = newDescription;
        budgetItem.save();
    }).then(result =>{res.status(200).json({msg:"Description Updated"})})
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    });
};


//Delete user's budget Item
//Controller for deleting budgetItem from budget-item schema and budgetitemId from user.
//Json values will be budgetItemId
exports.deleteBudgetItem = (req, res, next) => {
    const budgetItemId = req.body.budgetItemId;
    
    User.findById(req._userId)
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
                if(!budgetString.localeCompare(budgetItemId)){
                    userBudgetId = id._id;
                }
            })
            user.budget.items.pull({_id:userBudgetId});
            return user.save();
        })
        .then(result => {
            return BudgetItem.findById(budgetItemId)
        })
        .then(budgetItem => {
            if(!budgetItem){
                const error = new Error("Could not find budget item. Did you possibly delete that item?");
                error.statusCode = 404;
                throw error;
            }
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
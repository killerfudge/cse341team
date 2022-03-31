const express = require("express");

const{body} = require('express-validator')

const budgetController = require('../controllers/budget');
const isAuth = require("../middleware/is-auth");
const isBudgetItem = require("../middleware/is-budgetItem")
const router = express.Router();

router.get("/get-budget", isAuth, budgetController.getBudget);

router.get("/get-oneBudgetItem", 
    isAuth, 
    isBudgetItem,
    budgetController.getOneBudgetItem
);

router.post ('/add-item', 
    isAuth,
    [
    body('budgetItemName')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('must be at least 5 chars long no longer than 50 chars'),
    body('plannedCost')
    .trim()
    .isNumeric()
    .withMessage('must be a number'),
    body('description')
    .trim()
    .isLength({ min: 20, max: 250 })
    .withMessage('must be at least 20 chars long no longer than 250 chars')
    ],  
    budgetController.addBudgetItem
);

router.patch ('/add_edit-actualCost', 
    isAuth,
    isBudgetItem,
    [
    body('actualCost')
    .trim()
    .isNumeric()
    .withMessage('must be a number')
    ], 
    budgetController.addActualCost
);

router.patch("/edit-budgetItemName", 
    isAuth, 
    isBudgetItem, 
    [
    body('budgetItemName')
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('must be at least 5 chars long no longer than 50 chars')
    ], 
    budgetController.editBudgetItemName
);

router.patch("/edit-plannedCost",
    isAuth, 
    isBudgetItem, 
    [
    body('plannedCost')
    .trim()
    .isNumeric()
    .withMessage('must be a number')
    ],
  budgetController.editPlannedCost
);

router.patch("/edit-description",
    isAuth, 
    isBudgetItem, 
    [
    body('description')
    .trim()
    .isLength({ min: 20, max: 250 })
    .withMessage('must be at least 20 chars long no longer than 250 chars')
    ],
    budgetController.editDescription
);

router.delete("/delete-budgetItem", 
    isAuth, 
    budgetController.deleteBudgetItem
);

module.exports = router;

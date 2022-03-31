const express = require('express');

const{body} = require('express-validator')

const budgetController = require('../controllers/budget');
const router = express.Router();

router.get('/getBudget', budgetController.getBudget);

router.get('/getOneBudgetItem', budgetController.getOneBudgetItem);

router.post ('/add-item',[
    body('budgetItemName')
    .trim()
    .not()
    .isEmpty(),
    body('plannedCost')
    .trim()
    .not()
    .isEmpty(),
    body('description')      
    .trim()
    .not()
    .isEmpty()
], budgetController.addBudgetItem);

router.patch ('/add-actualCost',[
    body('budgetItemId')
    .trim()
    .not()
    .isEmpty(),
    body('actualCost')
    .trim()
    .not()
    .isEmpty()
], budgetController.addActualCost);

router.patch ('/edit-itemName', budgetController.editBudgetItemName);

router.patch ('/edit-itemPlannedCost', budgetController.editBudgetItemPlannedCost);

router.patch ('/edit-itemDescription', budgetController.editBudgetItemDescription);

router.delete('/delete-budget', budgetController.deleteBudgetItem);

module.exports = router; 
const express = require('express');

const budgetController = require('../controllers/budget');
const router = express.Router();

router.get('/getBudget', budgetController.getBudget);

router.get('/getOneBudgetItem', budgetController.getOneBudgetItem);

router.post ('/add-item', budgetController.addBudgetItem);

router.patch ('/add-actualCost', budgetController.addActualCost);

router.patch ('/edit-itemName', budgetController.editBudgetItemName);

router.patch ('/edit-itemPlannedCost', budgetController.editBudgetItemPlannedCost);

router.patch ('/edit-itemDescription', budgetController.editBudgetItemDescription);

router.delete('/delete-budget', budgetController.deleteBudgetItem);

module.exports = router; 
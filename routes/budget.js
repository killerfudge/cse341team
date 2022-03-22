const express = require('express');

const budgetController = require('../controllers/budget');
const router = express.Router();

router.get('/getBudget', budgetController.getBudget);

router.get('/getOneBudgetItem', budgetController.getOneBudgetItem);

router.post ('/add-item', budgetController.addBudgetItem);

router.patch ('/add-actualCost', budgetController.addActualCost);

router.patch ('/edit-item', budgetController.editBudgetItem);

router.delete('/budget/:budgetId', budgetController.deleteBudgetItem);

module.exports = router;
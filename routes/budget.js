const express = require("express");

const{body} = require('express-validator')

const budgetController = require('../controllers/budget');
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/getBudget", isAuth, budgetController.getBudget);

router.get("/getOneBudgetItem", isAuth, budgetController.getOneBudgetItem);

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
], isAuth, budgetController.addBudgetItem);

router.patch ('/add-actualCost',[
    body('budgetItemId')
    .trim()
    .not()
    .isEmpty(),
    body('actualCost')
    .trim()
    .not()
    .isEmpty()
], isAuth, budgetController.addActualCost);

router.patch("/edit-itemName", isAuth, budgetController.editBudgetItemName);

router.patch(
  "/edit-itemPlannedCost",
  isAuth,
  budgetController.editBudgetItemPlannedCost
);

router.patch(
  "/edit-itemDescription",
  isAuth,
  budgetController.editBudgetItemDescription
);

router.delete("/delete-budget", isAuth, budgetController.deleteBudgetItem);

module.exports = router;

const express = require("express");

const budgetController = require("../controllers/budget");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/getBudget", isAuth, budgetController.getBudget);

router.get("/getOneBudgetItem", isAuth, budgetController.getOneBudgetItem);

router.post("/add-item", isAuth, budgetController.addBudgetItem);

router.patch("/add-actualCost", isAuth, budgetController.addActualCost);

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

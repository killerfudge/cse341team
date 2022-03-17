const express = require("express");

const userController = require("../controllers/auth");
const router = express.Router();

router.post("/create-user", userController.postCreateUser);

router.post("/login", userController.postLogin);

router.delete("/delete-user", userController.deleteUser);

router.patch("/update-user", userController.updateUser);

module.exports = router;

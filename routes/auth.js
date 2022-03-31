const express = require("express");

const userController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/create-user", userController.postCreateUser);

//router.post("/login", userController.postLogin);

router.post("/login", userController.userLogin);

router.delete("/delete-user", isAuth, userController.deleteUser);

router.patch("/update-user", isAuth, userController.updateUser);

module.exports = router;

const express = require("express");

const{body} = require('express-validator')

const userController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/create-user",[
    body('email')
    .trim()
    .not()
    .isEmpty(),
    body('password')
    .trim()
    .not()
    .isEmpty()
], userController.postCreateUser);

//router.post("/login", userController.postLogin);

router.post("/login", userController.userLogin);

router.delete("/delete-user", isAuth, userController.deleteUser);

router.patch("/update-user", isAuth, userController.updateUser);

module.exports = router;

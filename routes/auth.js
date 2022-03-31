const express = require("express");

const{body} = require('express-validator')

const userController = require("../controllers/auth");
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

router.post("/login", userController.postLogin);

router.delete("/delete-user", userController.deleteUser);

router.patch("/update-user", userController.updateUser);

module.exports = router;

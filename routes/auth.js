const express = require("express");
const User = require("../models/user");

const{body} = require('express-validator')

const userController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.post("/create-user",
    [
    body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('please enter a valid email')
    .custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
    body('password')
    .trim()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('Must be 8 chars long, one uppercase, one lowercase, and one number')
    ], 
    userController.createUser
);

router.delete("/delete-user", 
    isAuth, 
    userController.deleteUser
);

router.patch("/update-userEmail", 
    isAuth,
    [
        body('newEmail')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('please enter a valid email')
        .custom(value => {
            return User.findOne({ email: value }).then(user => {
              if (user) {
                return Promise.reject('E-mail already in use');
              }
            });
          })
    ], 
    userController.updateUserEmail
);

router.patch("/update-userPassword", 
    isAuth,
    [
    body('newPassword')
    .trim()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('Must be 8 chars long, one uppercase, one lowercase, and one number')
    ], 
    userController.updateUserPassword
);

router.post("/login",
    [
    body('email')
        .trim()
        .normalizeEmail()
    ], 
    userController.loginUser
);

module.exports = router;

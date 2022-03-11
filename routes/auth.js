const express = require('express');

const userController = require('../controllers/user');
const router = express.Router();

router.get('/create-user', userController.postCreateUser);

router.get('/login', userController.postLogin);

module.exports = router;
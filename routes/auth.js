const express = require('express');

const userController = require('../controllers/auth');
const router = express.Router();

router.post('/create-user', userController.postCreateUser);

router.post('/login', userController.postLogin);

module.exports = router;
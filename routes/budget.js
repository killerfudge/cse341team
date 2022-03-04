const express = require('express');

const budgetController = require('../controllers/budget');
const router = express.Router();

router.get('/', budgetController.getIndex);

module.exports = router;
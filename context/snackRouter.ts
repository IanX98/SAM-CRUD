const express = require('express');

const router = express.Router();

const path = require('path');

const snackController = require('../controllers/snack.controller');

router.get('/add-snack', snackController.goToAddSnackPage);

router.post('/add-snack', snackController.addSnack);

router.get('/snacks', snackController.getSnacks);

module.exports = router

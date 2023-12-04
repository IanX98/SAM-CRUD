const express = require('express');

const router = express.Router();

const path = require('path');

const snackController = require('../controllers/snack.controller');

router.get('/', snackController.goToHomePage);

router.get('/add-ingredient', snackController.goToAddSnackPage);

router.post('/add-ingredient', snackController.addSnack);

module.exports = router

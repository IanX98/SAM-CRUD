const express = require('express');

const router = express.Router();

const path = require('path');

const snackController = require('../controllers/snack.controller');

router.get('/', snackController.goToHomePage);

router.get('/add-ingredient', snackController.goToAddIngredientPage);

router.post('/add-ingredient', snackController.addIngredient);

router.get('/ingredients', snackController.getIngredients);

module.exports = router

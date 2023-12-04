const express = require('express');

const router = express.Router();

const path = require('path');

const ingredientController = require('../controllers/ingredient.controller');

router.get('/', ingredientController.goToHomePage);

router.get('/add-ingredient', ingredientController.goToAddIngredientPage);

router.post('/add-ingredient', ingredientController.addIngredient);

router.get('/ingredients', ingredientController.getIngredients);

module.exports = router
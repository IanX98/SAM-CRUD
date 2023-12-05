const express = require('express');

const router = express.Router();

const path = require('path');

const ingredientController = require('../controllers/ingredient.controller');

router.get('/', ingredientController.goToHomePage);

router.get('/add-ingredient', ingredientController.goToAddIngredientPage);

router.post('/add-ingredient', ingredientController.addIngredient);

router.get('/ingredients', ingredientController.getIngredients);

router.get('/ingredient/:id', ingredientController.getSelectedIngredient);

router.post('/delete-ingredient/:id', ingredientController.deleteIngredient);

router.get('/edit-ingredient/:id', ingredientController.goToEditIngredientPage);

router.post('/edit-ingredient/:id', ingredientController.editIngredient);

router.post('/add-quantity/:id', ingredientController.addIngredientQuantity);

module.exports = router

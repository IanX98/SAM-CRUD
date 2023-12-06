const express = require('express');

const router = express.Router();

const path = require('path');

const orderController = require('../controllers/order.controller');

router.get('/make-order', orderController.goToMakeOrderPage);

router.post('/add-snack-order/:id', orderController.addSnackToOrder);

// router.get('/ingredients', ingredientController.getIngredients);

// router.get('/edit-ingredient/:id', ingredientController.goToEditIngredientPage);

// router.post('/edit-ingredient/:id', ingredientController.editIngredient);

module.exports = router

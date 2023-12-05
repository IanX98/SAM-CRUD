const express = require('express');

const router = express.Router();

const path = require('path');

const snackController = require('../controllers/snack.controller');

router.get('/add-snack', snackController.goToAddSnackPage);

router.post('/add-snack', snackController.addSnack);

router.get('/snacks', snackController.getSnacks);

router.get('/snack/:id', snackController.getSelectedSnack);

router.post('/delete-snack/:id', snackController.deleteSnack);

router.get('/edit-snack/:id', snackController.goToEditSnackPage);

router.post('/edit-snack/:id', snackController.editSnack);

router.get('/add-snack-ingredients/:id', snackController.goToAddSnackIngredients);

router.get('/add-snack-ingredients-quantity/:snackId/:ingredientId', snackController.goToAddSnackIngredientsQuantity);

router.post('/add-snack-ingredients-quantity/:snackId/:ingredientId', snackController.addSnackIngredients);

module.exports = router

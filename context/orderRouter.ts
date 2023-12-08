const express = require('express');

const router = express.Router();

const path = require('path');

const orderController = require('../controllers/order.controller');

router.get('/make-order', orderController.goToMakeOrderPage);

router.post('/add-snack-order/:id', orderController.addSnackToOrder);

router.get('/finish-order/', orderController.finishOrder);

module.exports = router

const express = require('express');

const router = express.Router();

const path = require('path');

const snackController = require('../controllers/snack.controller');

router.get('/', snackController.goToHomePage);

// router.get('/add-user', snackController.goToAddUserPage);

// router.post('/add-user', snackController.addUser);

module.exports = router

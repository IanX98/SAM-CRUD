const path = require('path');
const Ingredient = require('../models/ingredient');

exports.goToHomePage = (req: any, res: any, next: any) => {
    console.log('HOME PAGE');
    res.render('home');
};

exports.goToAddSnackPage = (req: any, res: any, next: any) => {
    console.log('ADD SNACK PAGE');
    res.render('add-ingredient');
};

exports.addSnack = (req: any, res: any, next: any) => {
    console.log('Add SNACK POST');
    console.log('BODY', req.body)
    const name = req.body.ingredient_name;
    const quantity = req.body.ingredient_quantity;
    
    Ingredient.create({
        name: name,
        quantity: quantity
    })
    .then((result: any) => {
        console.log(result)
        res.redirect('/');
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send(`Error while adding ingredient ${name}.`);
    })
};
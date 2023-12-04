const path = require('path');
const Ingredient = require('../models/ingredient');

exports.goToHomePage = (req: any, res: any, next: any) => {
    console.log('HOME PAGE');
    res.render('home');
};

exports.goToAddIngredientPage = (req: any, res: any, next: any) => {
    console.log('ADD INGREDIENT PAGE');
    res.render('add-ingredient');
};

exports.addIngredient = (req: any, res: any, next: any) => {
    console.log('Add INGREDIENT POST');
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

exports.getIngredients = async (req: any, res: any, next: any) => {
    console.log('GET INGREDIENTS');
    await Ingredient.findAll()
    .then((rows: any) => {
        res.render('ingredients', {
            ingredients: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send('Error while getting ingredients.');
    });
};
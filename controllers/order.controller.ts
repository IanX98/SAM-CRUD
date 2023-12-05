const path = require('path');
const Order = require('../models/order');

exports.goToMakeOrderPage = (req: any, res: any, next: any) => {
    console.log('MAKE ORDER PAGE');
    res.render('make-order');
};

exports.addIngredient = (req: any, res: any, next: any) => {
    console.log('Add INGREDIENT POST');
    console.log('BODY', req.body)
    const snackId = req.params.id;
    const name = req.body.ingredient_name;
    const quantity = req.body.ingredient_quantity;
    
    Order.create({
        name: name,
        quantity: quantity,
        snackId: snackId
    })
    .then((result: any) => {
        console.log(result)
        res.redirect('/ingredients');
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send(`Error while adding ingredient ${name}.`);
    })
};

exports.getIngredients = async (req: any, res: any, next: any) => {
    console.log('GET INGREDIENTS');
    await Order.findAll()
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


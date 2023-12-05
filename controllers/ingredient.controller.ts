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
    const snackId = req.params.id;
    const name = req.body.ingredient_name;
    const quantity = req.body.ingredient_quantity;
    
    Ingredient.create({
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

exports.getSelectedIngredient = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED INGREDIENT');
    const ingredientId = req.params.id;
    await Ingredient.findByPk(ingredientId)
    .then((rows: any) => {
        res.render('selectedIngredient', {
            selectedIngredient: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting ingredient ${ingredientId}.`);
    });
};

exports.deleteIngredient = async (req: any, res: any, next: any) => {
    console.log('DELETE INGREDIENT');
    const ingredientId = req.params.id;
    try {
        await Ingredient.destroy({
            where: {
                id: ingredientId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting ingredient ${ingredientId} in Controller.`);
    } finally {
        res.redirect('/ingredients');
    }
};

exports.goToEditIngredientPage = (req: any, res: any, next: any) => {
    console.log('Edit Ingredient GET');
    const ingredientId = req.params.id;
    res.render('edit-ingredient', {
        ingredientId: ingredientId
    });
};

exports.editIngredient = async (req: any, res: any, next: any) => {
    console.log('EDIT INGREDIENT');
    const ingredientId = req.params.id;
    console.log('REQ BODY', req.body)
    const updatedName = req.body.name;
    const updatedQuantity = req.body.quantity;

    try {
        await Ingredient.findByPk(ingredientId)
        .then((selectedIngredient: any) => {
            selectedIngredient.name = updatedName,
            selectedIngredient.quantity = updatedQuantity

            return selectedIngredient.save();
        })
        .then((result: any) => {
            console.log('UPDATED INGREDIENT');
            res.redirect(`/ingredient/${ingredientId}`);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing ingredient ${ingredientId} in Controller.`);
    }
};

exports.addIngredientQuantity = async (req: any, res: any, next: any) => {
    console.log('ADD INGREDIENT');
    const ingredientId = req.params.id;

    try {
        await Ingredient.findByPk(ingredientId)
        .then((selectedIngredient: any) => {
            selectedIngredient.quantity += 1

            return selectedIngredient.save();
        })
        .then((result: any) => {
            console.log('ADDED INGREDIENT QUANTITY');
            res.redirect(`/ingredient/${ingredientId}`);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while adding ingredient ${ingredientId} quantity in Controller.`);
    }
};
const path = require('path');
const Snack = require('../models/snack');
const Ingredient = require('../models/ingredient');

exports.goToAddSnackPage = (req: any, res: any, next: any) => {
    console.log('Add SNACK GET');
    res.render('add-snack');
};

exports.addSnack = (req: any, res: any, next: any) => {
    console.log('Add SNACK POST');
    const name = req.body.name;
    const price = req.body.price;

    Snack.create({
        name: name,
        price: price
    })
    .then((result: any) => {
        console.log(result)
        res.redirect('/snacks');
    })
    .catch((err: any) => {
        console.log(err);
        res.status(500).send(`Error while adding snack ${name}.`);
    })
};

exports.getSnacks = async (req: any, res: any, next: any) => {
    console.log('GET SNACKS');
    await Snack.findAll()
    .then((rows: any) => {
        res.render('snacks', {
            snacks: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send('Error while getting snacks.');
    });
};

exports.getSelectedSnack = async (req: any, res: any, next: any) => {
    console.log('GET SELECTED SNACK');
    const snackId = req.params.id;

    await Snack.findByPk(snackId)
    .then((rows: any) => {
        const snackIngredients = rows.dataValues.snackIngredients

        res.render('selectedSnack', {
            selectedSnack: rows,
            snackIngredients: snackIngredients
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting snack ${snackId}.`);
    });
};

exports.deleteSnack = async (req: any, res: any, next: any) => {
    console.log('DELETE SNACK');
    const snackId = req.params.id;
    try {
        await Snack.destroy({
            where: {
                id: snackId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while deleting snack ${snackId} in Controller.`);
    } finally {
        res.redirect('/snacks');
    }
};

exports.goToEditSnackPage = (req: any, res: any, next: any) => {
    console.log('Edit snack GET');
    const snackId = req.params.id;
    res.render('edit-snack', {
        snackId: snackId
    });
};

exports.editSnack = async (req: any, res: any, next: any) => {
    console.log('EDIT SNACK');
    const snackId = req.params.id;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;

    try {
        await Snack.findByPk(snackId)
        .then((selectedSnack: any) => {
            selectedSnack.name = updatedName,
            selectedSnack.price = updatedPrice

            return selectedSnack.save();
        })
        .then((result: any) => {
            console.log('UPDATED CLASS');
            res.redirect(`/snack/${snackId}`);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing snack ${snackId} in Controller.`);
    }
};

exports.goToAddSnackIngredients = async (req: any, res: any, next: any) => {
    console.log('Add SNACK INGREDIENTS PAGE GET');

    const snackId = req.params.id;
    await Ingredient.findAll()
    .then((rows: any) => {
        res.render('add-snack-ingredient', {
            snackId: snackId,
            ingredients: rows,
        });
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send('Error while getting ingredients.');
    });
};

exports.goToAddSnackIngredientsQuantity = async (req: any, res: any, next: any) => {
    console.log('Add SNACK INGREDIENTS QUANTITY PAGE GET');

    const snackId = req.params.snackId;
    const ingredientId = req.params.ingredientId;

    await Snack.findByPk(snackId)
    .then(async (rows: any) => {
        const selectedIngredient = await Ingredient.findByPk(ingredientId);

        res.render('add-snack-ingredients-quantity', {
            snackId: snackId,
            ingredientId: ingredientId,
            snack: rows,
            ingredient: selectedIngredient
        })
    })
    .catch((err: any) => {
        console.error(err);
        res.status(500).send(`Error while getting snack ${snackId}.`);
    });
};

exports.addSnackIngredients = async (req: any, res: any, next: any) => {
    console.log('Add SNACK INGREDIENT QUANTITY POST');
    const snackId = req.params.snackId;
    const ingredientId = req.params.ingredientId;

    const quantity = req.body.quantity;

    try {
        await Snack.findByPk(snackId)
        .then(async (selectedSnack: any) => {
            const selectedIngredient = await Ingredient.findByPk(ingredientId);
            const currentSnackIngredients = selectedSnack.dataValues.snackIngredients;

            const newIngredient = { name: `${selectedIngredient.dataValues.name}`, quantity: quantity };
            const updatedIngredients = [...currentSnackIngredients, newIngredient];

            selectedSnack.snackIngredients = updatedIngredients;

            return selectedSnack.save();
        })
        .then((result: any) => {
            console.log('UPDATED CLASS');
            res.redirect(`/snack/${snackId}`);
        })
    } catch (err) {
        console.error(err);
        res.status(500).send(`Error while editing snack ${snackId} in Controller.`);
    }
};

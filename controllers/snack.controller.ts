const path = require('path');
const Snack = require('../models/snack');

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
        res.render('selectedSnack', {
            selectedSnack: rows,
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
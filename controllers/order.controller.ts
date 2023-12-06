const path = require('path');
const Order = require('../models/order');
const Snack = require('../models/snack');

exports.goToMakeOrderPage = async (req: any, res: any, next: any) => {
    console.log('MAKE ORDER PAGE');

    const order = Order.findByPk(1)
    .then(async (orderCreated: any) => {
        if (!orderCreated) {
            console.log('ORDER CREATED')
            const order = Order.create({
            snacks: [],
            totalPrice: 0
            });
            return order
        }
        const order = orderCreated;

        console.log(order, 'ORDER')

        await Snack.findAll()
        .then((rows: any) => {
            res.render('make-order', {
                snacks: rows,
                order: order
            });
        })
        .catch((err: any) => {
            console.error(err);
            res.status(500).send('Error while getting snacks at order page.');
        });
    })
};

exports.addSnackToOrder = (req: any, res: any, next: any) => {
    console.log('Add SNACK TO ORDER POST');
    const snackId = req.params.id;
    const quantity = req.body.quantity;

    Order.findByPk(1)
    .then(async (orderCreated: any) => {
        if (orderCreated) {
            try {
                await Snack.findByPk(snackId)
                .then(async (selectedSnack: any) => {
                    const currentOrder = orderCreated.dataValues.snacks;
        
                    const updatedOrder = [...currentOrder, selectedSnack];
                    orderCreated.snacks = updatedOrder;

                    return orderCreated.save();
                })
                .then((result: any) => {
                    console.log('UPDATED ORDER');
                    res.redirect('/make-order');
                })
            } catch (err) {
                console.error(err);
                res.status(500).send(`Error while adding snack ${snackId} to order in Controller.`);
            }
        }
    });
};

// exports.addIngredient = (req: any, res: any, next: any) => {
//     console.log('Add INGREDIENT POST');
//     console.log('BODY', req.body)
//     const snackId = req.params.id;
//     const name = req.body.ingredient_name;
//     const quantity = req.body.ingredient_quantity;
    
//     Order.create({
//         name: name,
//         quantity: quantity,
//         snackId: snackId
//     })
//     .then((result: any) => {
//         console.log(result)
//         res.redirect('/ingredients');
//     })
//     .catch((err: any) => {
//         console.log(err);
//         res.status(500).send(`Error while adding ingredient ${name}.`);
//     })
// };

// exports.getIngredients = async (req: any, res: any, next: any) => {
//     console.log('GET INGREDIENTS');
//     await Order.findAll()
//     .then((rows: any) => {
//         res.render('ingredients', {
//             ingredients: rows,
//         });
//     })
//     .catch((err: any) => {
//         console.error(err);
//         res.status(500).send('Error while getting ingredients.');
//     });
// };

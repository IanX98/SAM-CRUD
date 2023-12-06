const path = require('path');
const Order = require('../models/order');
const Snack = require('../models/snack');

exports.goToMakeOrderPage = async (req: any, res: any, next: any) => {
    console.log('MAKE ORDER PAGE');

    Order.findByPk(1)
    .then(async (orderCreated: any) => {
        if (!orderCreated) {
            console.log('ORDER CREATED')
            const order = Order.create({
            snacks: [],
            totalPrice: 0
            });

            res.redirect('/make-order');
            return order
        }
        const order = orderCreated;


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

    Order.findByPk(1)
    .then(async (orderCreated: any) => {
        if (orderCreated) {
            try {
                await Snack.findByPk(snackId)
                .then(async (selectedSnack: any) => {
                    const currentOrder = orderCreated.dataValues.snacks;

                    let quantity = 1
                    orderCreated.snacks.forEach((snack: any) => {
                        if (snack.dataValues.id === selectedSnack.dataValues.id) {
                            quantity++;
                        }
                    });

                    const snack = { 
                        ...selectedSnack,
                        quantity: quantity
                        };
        
                    const updatedOrder = [...currentOrder, snack];
                    orderCreated.snacks = updatedOrder;

                    return orderCreated.save();
                })
                .then(async (result: any) => {
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

const path = require('path');
const Order = require('../models/order');
const Snack = require('../models/snack');
const Ingredient = require('../models/ingredient');

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

                    let snackAlreadyAdded = false;
                    let snackIndex = 0;
                    orderCreated.snacks.forEach(async (snack: any, index: number) => {
                        if (snack.dataValues.id === selectedSnack.dataValues.id) {
                            snackAlreadyAdded = true;
                            snackIndex = index;
                            // console.log('INDEX TEST', index)
                            // console.log('BEFORE QUANTITY', orderCreated.snacks[index].quantity)
                            // const addedQuantity = orderCreated.snacks[index].quantity + 1;
                            // console.log('ADDED QUANTITY', addedQuantity)

                            // orderCreated.snacks[index] = {
                            //     ...selectedSnack,
                            //     quantity: addedQuantity
                            // }
                        }
                    });

                    if (!snackAlreadyAdded) {
                        console.log('NOT ADDED')
                        const snack = {
                          ...selectedSnack,
                          quantity: 1
                        };
                    
                        const updatedOrder = [...currentOrder, snack];
                        orderCreated.snacks = updatedOrder;
                      }
        
                    let totalPrice = 0;
                    orderCreated.snacks.forEach((snack: any) => {
                        const { quantity, dataValues } = snack;
                        const { price } = dataValues;
                        totalPrice += quantity * price;
                    });

                    orderCreated.totalPrice = totalPrice;
                    
                    return await orderCreated.save();
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

exports.finishOrder = (req: any, res: any, next: any) => {
    console.log('FINISH ORDER');

    Order.findByPk(1)
    .then(async (orderCreated: any) => {
        if (orderCreated) {
            try {
               orderCreated.dataValues.snacks.forEach((snack: any) => {
                snack.dataValues.snackIngredients.forEach(async (ingredient: any) => {

                    let snackIngredient = ingredient;
                    await Ingredient.findAll()
                    .then((ingredients: any) => {
                        ingredients.forEach((ingredientStock: any) => {
                            if (snackIngredient.name === ingredientStock.name && ingredientStock.quantity >= snackIngredient.quantity) {
                                const newStock = ingredientStock.quantity - snackIngredient.quantity;
                                ingredientStock.quantity = newStock;

                                return ingredientStock.save()
                            }
                        });

                        orderCreated.snacks = [];
                        orderCreated.totalPrice = 0;
                        return orderCreated.save();
                    })
                    .catch((err: any) => {
                        console.error(err);
                        res.status(500).send('Error while getting ingredients.');
                    });
                    
                })
            });

            } catch (err) {
                console.error(err);
                res.status(500).send(`Error while finishing orderin Controller.`);
            } finally {
                res.redirect('/make-order');
            }
        }
    });
};

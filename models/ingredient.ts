const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const Ingredient = sequelize.define('ingredient', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    name: { 
        type: Sequelize.STRING,
        allowNUll: false
    },
    quantity: {
        type: Sequelize.INTEGER
    },
});

module.exports = Ingredient;

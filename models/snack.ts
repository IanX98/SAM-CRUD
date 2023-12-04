const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const Snack = sequelize.define('snack', {
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
    price: { 
        type: Sequelize.FLOAT,
        allowNUll: false
    }
});

module.exports = Snack;

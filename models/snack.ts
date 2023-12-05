import { DataTypes } from "sequelize";

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
    },
    snackIngredients: {
        type: Sequelize.ARRAY(DataTypes.JSONB),
        allowNUll: false,
        defaultValue: []
    }
});

module.exports = Snack;

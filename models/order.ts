import { DataTypes } from "sequelize";

const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    snacks: {
        type: Sequelize.ARRAY(DataTypes.JSONB),
        allowNUll: false,
        defaultValue: []
    },
    totalPrice: { 
        type: Sequelize.FLOAT,
        allowNUll: false
    }
});

module.exports = Order;

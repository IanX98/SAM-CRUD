const { Pool, Client } = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('encora_snacks', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;

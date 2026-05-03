const { Sequelize } = require('sequelize');
const config = require('../services/config');
const sequelize = new Sequelize(
    config.DB.NAME, 
    config.DB.USER, 
    config.DB.PASS, 
    {
        host: config.DB.HOST,
        port: config.DB.PORT,
        dialect: config.DB.DIALECT,
        logging: false
    }
);

module.exports = sequelize;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workout = require('./Workout');

const Exercise = sequelize.define('Exercise', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Exercise;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Workout = sequelize.define('Workout', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    visibility: {
        type: DataTypes.ENUM('public', 'private'),
        defaultValue: 'private'
    }
});

User.hasMany(Workout);
Workout.belongsTo(User);


module.exports = Workout;
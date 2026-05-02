const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Workout = require("./Workout");
const Exercise = require("./Exercise");

const WorkoutExercise = sequelize.define("WorkoutExercise", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Workout.belongsToMany(Exercise, { through: "WorkoutExercise" });
Exercise.belongsToMany(Workout, { through: "WorkoutExercise" });

module.exports = WorkoutExercise;

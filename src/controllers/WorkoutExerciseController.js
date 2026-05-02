const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const WorkoutExercise = require('../models/WorkoutExercise');

const workoutexercise_data = [
  {"WorkoutId": 1, "ExerciseId": 1}, {"WorkoutId": 1, "ExerciseId": 4}, {"WorkoutId": 1, "ExerciseId": 10},
  {"WorkoutId": 2, "ExerciseId": 16}, {"WorkoutId": 2, "ExerciseId": 29}, {"WorkoutId": 2, "ExerciseId": 6},
  {"WorkoutId": 3, "ExerciseId": 2}, {"WorkoutId": 3, "ExerciseId": 3}, {"WorkoutId": 3, "ExerciseId": 20},
  {"WorkoutId": 4, "ExerciseId": 26}, {"WorkoutId": 4, "ExerciseId": 1}, {"WorkoutId": 4, "ExerciseId": 5},
  {"WorkoutId": 5, "ExerciseId": 19}, {"WorkoutId": 5, "ExerciseId": 28}, {"WorkoutId": 5, "ExerciseId": 17},
  {"WorkoutId": 6, "ExerciseId": 4}, {"WorkoutId": 6, "ExerciseId": 5}, {"WorkoutId": 6, "ExerciseId": 21},
  {"WorkoutId": 7, "ExerciseId": 12}, {"WorkoutId": 7, "ExerciseId": 29}, {"WorkoutId": 7, "ExerciseId": 8},
  {"WorkoutId": 8, "ExerciseId": 4}, {"WorkoutId": 8, "ExerciseId": 5}, {"WorkoutId": 8, "ExerciseId": 10},
  {"WorkoutId": 9, "ExerciseId": 16}, {"WorkoutId": 9, "ExerciseId": 18}, {"WorkoutId": 9, "ExerciseId": 27},
  {"WorkoutId": 10, "ExerciseId": 1}, {"WorkoutId": 10, "ExerciseId": 2}, {"WorkoutId": 10, "ExerciseId": 3},
  {"WorkoutId": 11, "ExerciseId": 22}, {"WorkoutId": 11, "ExerciseId": 26}, {"WorkoutId": 11, "ExerciseId": 9},
  {"WorkoutId": 12, "ExerciseId": 19}, {"WorkoutId": 12, "ExerciseId": 17}, {"WorkoutId": 12, "ExerciseId": 12},
  {"WorkoutId": 13, "ExerciseId": 4}, {"WorkoutId": 13, "ExerciseId": 5}, {"WorkoutId": 13, "ExerciseId": 6},
  {"WorkoutId": 14, "ExerciseId": 30}, {"WorkoutId": 14, "ExerciseId": 8}, {"WorkoutId": 14, "ExerciseId": 13},
  {"WorkoutId": 15, "ExerciseId": 3}, {"WorkoutId": 15, "ExerciseId": 18}, {"WorkoutId": 15, "ExerciseId": 23},
  {"WorkoutId": 16, "ExerciseId": 16}, {"WorkoutId": 16, "ExerciseId": 28}, {"WorkoutId": 16, "ExerciseId": 19},
  {"WorkoutId": 17, "ExerciseId": 1}, {"WorkoutId": 17, "ExerciseId": 2}, {"WorkoutId": 17, "ExerciseId": 3},
  {"WorkoutId": 18, "ExerciseId": 21}, {"WorkoutId": 18, "ExerciseId": 26}, {"WorkoutId": 18, "ExerciseId": 22},
  {"WorkoutId": 19, "ExerciseId": 19}, {"WorkoutId": 19, "ExerciseId": 24}, {"WorkoutId": 19, "ExerciseId": 12},
  {"WorkoutId": 20, "ExerciseId": 4}, {"WorkoutId": 20, "ExerciseId": 5}, {"WorkoutId": 20, "ExerciseId": 11},
  {"WorkoutId": 21, "ExerciseId": 8}, {"WorkoutId": 21, "ExerciseId": 12}, {"WorkoutId": 22, "ExerciseId": 30}, 
  {"WorkoutId": 22, "ExerciseId": 18}, {"WorkoutId": 23, "ExerciseId": 16}, {"WorkoutId": 23, "ExerciseId": 27},
  {"WorkoutId": 24, "ExerciseId": 1}, {"WorkoutId": 24, "ExerciseId": 4}, {"WorkoutId": 25, "ExerciseId": 5}, 
  {"WorkoutId": 25, "ExerciseId": 9}, {"WorkoutId": 26, "ExerciseId": 19}, {"WorkoutId": 26, "ExerciseId": 17},
  {"WorkoutId": 27, "ExerciseId": 4}, {"WorkoutId": 27, "ExerciseId": 6}, {"WorkoutId": 28, "ExerciseId": 29}, 
  {"WorkoutId": 28, "ExerciseId": 30}, {"WorkoutId": 29, "ExerciseId": 3}, {"WorkoutId": 29, "ExerciseId": 18},
  {"WorkoutId": 30, "ExerciseId": 16}, {"WorkoutId": 30, "ExerciseId": 19}, {"WorkoutId": 31, "ExerciseId": 1}, 
  {"WorkoutId": 31, "ExerciseId": 2}, {"WorkoutId": 32, "ExerciseId": 21}, {"WorkoutId": 32, "ExerciseId": 26},
  {"WorkoutId": 33, "ExerciseId": 19}, {"WorkoutId": 33, "ExerciseId": 28}, {"WorkoutId": 34, "ExerciseId": 4}, 
  {"WorkoutId": 34, "ExerciseId": 5}, {"WorkoutId": 35, "ExerciseId": 29}, {"WorkoutId": 35, "ExerciseId": 30},
  {"WorkoutId": 36, "ExerciseId": 3}, {"WorkoutId": 36, "ExerciseId": 18}, {"WorkoutId": 37, "ExerciseId": 16},
  {"WorkoutId": 37, "ExerciseId": 19}, {"WorkoutId": 38, "ExerciseId": 1}, {"WorkoutId": 38, "ExerciseId": 4},
  {"WorkoutId": 39, "ExerciseId": 5}, {"WorkoutId": 39, "ExerciseId": 6}, {"WorkoutId": 40, "ExerciseId": 19},
  {"WorkoutId": 40, "ExerciseId": 12}, {"WorkoutId": 41, "ExerciseId": 2}, {"WorkoutId": 42, "ExerciseId": 15},
  {"WorkoutId": 43, "ExerciseId": 4}, {"WorkoutId": 44, "ExerciseId": 16}, {"WorkoutId": 45, "ExerciseId": 1},
  {"WorkoutId": 46, "ExerciseId": 5}, {"WorkoutId": 47, "ExerciseId": 19}, {"WorkoutId": 48, "ExerciseId": 4},
  {"WorkoutId": 49, "ExerciseId": 29}, {"WorkoutId": 50, "ExerciseId": 3}
]

sequelize.sync({ force: true }).then(() => {

    WorkoutExercise.bulkCreate(workoutexercise_data, { validate: true }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });

}).catch((error) => {
    console.error('Unable to create table : ', error);
});
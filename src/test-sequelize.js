const sequelize = require('./config/database');
const User = require('./models/User');
const Workout = require('./models/Workout');
const Exercise = require('./models/Exercise');
const WorkoutExercise = require('./models/WorkoutExercise');

sequelize.sync({ force: true }).then(async () => {
    console.log('Database synced!');

    //CREATE

    const newUser = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '0000'
    });
    console.log('User created:', newUser.toJSON());

    const newWorkout = await Workout.create({
        title: 'Leg day',
        description: '...',
        UserId: newUser.id
    });
    console.log('Workout created:', newWorkout.toJSON());
    
    const newExercise = await Exercise.create({
        title: 'Pushups',
        description: '...',
    });
    console.log('Exercise created:', newExercise.toJSON());

    const newWorkoutExercise = await WorkoutExercise.create({
        WorkoutId: newWorkout.id,
        ExerciseId: newExercise.id
    });
    console.log('Exercise created:', newExercise.toJSON());

    //READ

    const users = await User.findAll({include: Workout});
    console.log('All users with workouts:', JSON.stringify(users, null, 2));

    const workouts = await Workout.findAll({include: Exercise});
    console.log('All workouts with exercises:', JSON.stringify(workouts, null, 2));
    
    const exercises = await Exercise.findAll();
    console.log('All exercises:', exercises);

    //UPDATE

    const user = await User.findByPk(1);
    user.lastName = 'Smith';
    await user.save();
    console.log('User updated:', user.toJSON());
    
    const workout = await Workout.findByPk(1);
    workout.description = 'description';
    await workout.save();
    console.log('Workout updated:', workout.toJSON());
    
    const exercise = await Exercise.findByPk(1);
    exercise.description = 'Exercise description';
    await exercise.save();
    console.log('Exercise updated:', exercise.toJSON());

    //DELETE

    await exercise.destroy();
    console.log('Exercise deleted');
    
    await workout.destroy();
    console.log('Workout deleted');

    await user.destroy();
    console.log('User deleted');

}).catch(err => {
    console.error('Unable to sync database:', err);
});
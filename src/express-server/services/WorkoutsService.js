/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
const WorkoutExercise = require('../models/WorkoutExercise');
const User = require('../models/User');

const getAuthenticatedUser = async (req) => {
  let user = null;

  // OAuth2 (GitHub ou Google)
  if (req.user) {
    user = req.user;
  }

  // (API Key)
  if (!user) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey) {
      user = await User.findOne({ where: { apiKey: apiKey } });
    }
  }

  // PORTA 3: Basic Auth
  if (!user) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Basic ')) {
      //
    }
  }
  if (!user) {
    throw { status: 401, message: "Acesso negado. Autentica-te via OAuth, API Key ou Basic Auth." };
  }

  return user;
};

/**
* Apaga um plano de treino (Apenas o autor pode apagar)
*
* id Integer 
* no response value expected for this operation
* */
const workoutsIdDELETE = (req) => new Promise(async (resolve, reject) => {
    try {
      const user = await getAuthenticatedUser(req);
      const workout = await Workout.findByPk(req.params.id);

      if (!workout) return reject(Service.rejectResponse('Treino não encontrado', 404));
      
      if (workout.UserId !== user.id) {
        return reject(Service.rejectResponse('Não tens permissão para apagar este treino', 403));
      }

      await WorkoutExercise.destroy({ where: { WorkoutId: workout.id } });
      await workout.destroy();
      resolve(Service.successResponse({ message: "Treino apagado com sucesso" }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
});
/**
* Devolve os detalhes de um treino específico
*
* id Integer 
* returns Workout
* */
const workoutsIdGET = (req) => new Promise(async (resolve, reject) => {
    try {
      const workout = await Workout.findByPk(req.params.id,
        {
           include: [{ model: Exercise, through: { attributes: ['sets', 'reps'] } }]
        });
      
      if (!workout) {
        return reject(Service.rejectResponse('Treino não encontrado', 404));
      }
      if (workout.visibility === 'public') {
        return resolve(Service.successResponse(workout));
      }
      const user = await getAuthenticatedUser(req);

      if (workout.UserId !== user.id) {
        return reject(Service.rejectResponse('Acesso negado. Este treino é privado e não te pertence.', 403));
      }
      
      resolve(Service.successResponse(workout));

    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
});
/**
* Atualiza um plano de treino (Apenas o autor pode atualizar)
*
* id Integer 
* workoutRequest WorkoutRequest 
* no response value expected for this operation
* */
const workoutsIdPUT = (req) => new Promise(async (resolve, reject) => {
    try {
      const user = await getAuthenticatedUser(req);
      const workout = await Workout.findByPk(req.params.id);

      if (!workout) return reject(Service.rejectResponse('Treino não encontrado', 404));
      
      // REGRA DE NEGÓCIO: Só o dono do treino o pode editar!
      if (workout.UserId !== user.id) {
        return reject(Service.rejectResponse('Não tens permissão para editar este treino', 403));
      }
      const {title , description , visibility, exercises} = req.body;
      await workout.update({
            title: title || workout.title,
            description: description !== undefined ? description : workout.description,
            visibility: visibility || workout.visibility
      });

      if (exercises && exercises.length > 0) {
          await WorkoutExercise.destroy({ where: { WorkoutId: workout.id } });
          for (const ex of exercises) {
            const exercise = await Exercise.findByPk(ex.exerciseId);
            if (exercise) {
              await WorkoutExercise.create({
                  WorkoutId: workout.id,
                  ExerciseId: ex.exerciseId,
                  sets: ex.sets,
                  reps: ex.reps
              });
            }
          }
        }
        const result = await Workout.findByPk(workout.id, {
          include: [{ model: Exercise, through: { attributes: ['sets', 'reps'] } }]
        });
      resolve(Service.successResponse(result));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
});
/**
* Devolve todos os treinos do utilizador autenticado (Públicos e Privados)
*
* returns List
* */
const workoutsMeGET = (req) => new Promise(async (resolve, reject) => {
    try {
      const user = await getAuthenticatedUser(req);
      const workouts = await Workout.findAll({ where: { UserId: user.id }, 
        include: [{ model: Exercise, through: { attributes: ['sets', 'reps'] } }]
      });
      resolve(Service.successResponse(workouts));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
});
/**
* Cria um novo plano de treino para o utilizador autenticado
*
* workoutRequest WorkoutRequest 
* no response value expected for this operation
* */
const workoutsPOST = (req) => new Promise(async (resolve, reject) => {
    try {
      const user = await getAuthenticatedUser(req);
      
      // Junta os dados que vieram do Swagger com o ID do utilizador que está a criar
      const novoTreinoData = { ...req.body, UserId: user.id };
      const novoTreino = await Workout.create(novoTreinoData);
      
      resolve(Service.successResponse(novoTreino));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro ao criar treino', e.status || 500));
    }
});
/**
* Devolve todos os planos de treino PÚBLICOS da comunidade
*
* returns List
* */
const workoutsPublicGET = (req) => new Promise(async (resolve, reject) => {
    try {
      const workouts = await Workout.findAll({ where: { visibility: 'public' },
        include:[{model : Exercise, through: {attributes:['sets', 'reps']}}]
      });
      resolve(Service.successResponse(workouts));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', 500));
    }
});


module.exports = {
  workoutsIdDELETE,
  workoutsIdGET,
  workoutsIdPUT,
  workoutsMeGET,
  workoutsPOST,
  workoutsPublicGET,
};

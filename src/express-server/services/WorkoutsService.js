/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Apaga um plano de treino (Apenas o autor pode apagar)
*
* id Integer 
* no response value expected for this operation
* */
const workoutsIdDELETE = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Devolve os detalhes de um treino específico
*
* id Integer 
* returns Workout
* */
const workoutsIdGET = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Atualiza um plano de treino (Apenas o autor pode atualizar)
*
* id Integer 
* workoutRequest WorkoutRequest 
* no response value expected for this operation
* */
const workoutsIdPUT = ({ id, workoutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        workoutRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Devolve todos os treinos do utilizador autenticado (Públicos e Privados)
*
* returns List
* */
const workoutsMeGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Cria um novo plano de treino para o utilizador autenticado
*
* workoutRequest WorkoutRequest 
* no response value expected for this operation
* */
const workoutsPOST = ({ workoutRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        workoutRequest,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Devolve todos os planos de treino PÚBLICOS da comunidade
*
* returns List
* */
const workoutsPublicGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  workoutsIdDELETE,
  workoutsIdGET,
  workoutsIdPUT,
  workoutsMeGET,
  workoutsPOST,
  workoutsPublicGET,
};

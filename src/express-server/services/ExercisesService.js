/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Devolve a lista global de exercícios disponíveis
*
* returns List
* */
const exercisesGET = () => new Promise(
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
* Devolve os detalhes de um exercício específico
*
* id Integer 
* returns Exercise
* */
const exercisesIdGET = ({ id }) => new Promise(
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

module.exports = {
  exercisesGET,
  exercisesIdGET,
};

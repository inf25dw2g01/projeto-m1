/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Exercise = require('../models/Exercise');

/**
* Devolve a lista global de exercícios disponíveis
*
* returns List
* */
const exercisesGET = (req) => new Promise(
  async (resolve, reject) => {
    try {
      const exercises = await Exercise.findAll({
        attributes: ['id', 'title', 'description']
      });
      
      resolve(Service.successResponse(exercises));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno do servidor', 500));
    }
  },
);
/**
* Devolve os detalhes de um exercício específico
*
* id Integer 
* returns Exercise
* */
const exercisesIdGET = (req) => new Promise(
  async (resolve, reject) => {
    try {
      const id = req.params.id; 
      const exercise = await Exercise.findByPk(id, {
        attributes: ['id', 'title', 'description']
      });
      if (!exercise) {
        return reject(Service.rejectResponse('Exercício não encontrado', 404));
      }
      resolve(Service.successResponse(exercise));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno do servidor', 500));
    }
  },
);

module.exports = {
  exercisesGET,
  exercisesIdGET,
};

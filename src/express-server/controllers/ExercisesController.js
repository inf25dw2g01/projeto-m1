/**
 * The ExercisesController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const Service = require('../services/ExercisesService');

const exercisesGET = async (request, response) => {
  try {
    const data = await Service.exercisesGET(request);
    response.status(200).json(data.payload || data);
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const exercisesIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, () => Service.exercisesIdGET(request));
};

module.exports = {
  exercisesGET,
  exercisesIdGET,
};
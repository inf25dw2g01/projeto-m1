/**
 * The ExercisesController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const Service = require('../services/ExercisesService');
<<<<<<< HEAD
const { toXML } = require('jstoxml');

const exercisesGET = async (request, response) => {
  try {
    const data = await Service.exercisesGET();
    const responseData = data.payload || data;

    response.format({
      'application/json': () => {
        response.status(200).json(responseData);
      },

      'application/xml': () => {
        const plainData = JSON.parse(JSON.stringify(responseData));

        const xmlOptions = { header: true, indent: '  ' };
        const xmlData = toXML({ exercises: { exercise: plainData } }, xmlOptions);
        response.status(200).type('application/xml').send(xmlData);
      },

      'default': () => {
        response.status(406).send('Formato não suportado');
      }
    });

  } catch (error) {
    response.status(500).json({ error: error.message });
=======

const exercisesGET = async (request, response) => {
  try {
    const data = await Service.exercisesGET(request);
    response.status(200).json(data.payload || data);
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d
  }
};

const exercisesIdGET = async (request, response) => {
<<<<<<< HEAD
  await Controller.handleRequest(request, response, service => Service.exercisesIdGET(request));
=======
  await Controller.handleRequest(request, response, () => Service.exercisesIdGET(request));
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d
};

module.exports = {
  exercisesGET,
  exercisesIdGET,
};
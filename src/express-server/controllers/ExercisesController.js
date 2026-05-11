/**
 * The ExercisesController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const Service = require('../services/ExercisesService');
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
  }
};

const exercisesIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service => Service.exercisesIdGET(request));
};

module.exports = {
  exercisesGET,
  exercisesIdGET,
};
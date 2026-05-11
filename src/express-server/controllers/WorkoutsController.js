/**
 * The WorkoutsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const Service = require('../services/WorkoutsService');
const { toXML } = require('jstoxml');

const workoutsPublicGET = async (request, response) => {
  try {
    const data = await Service.workoutsPublicGET(request);
    const responseData = data.payload || data;
    response.format({
      'application/json': () => {
        response.status(200).json(responseData);
      },
      'application/xml': () => {
        const plainData = JSON.parse(JSON.stringify(responseData));
        const xmlData = toXML({ workouts: { workout: plainData } }, { header: true, indent: '  ' });
        response.status(200).type('application/xml').send(xmlData);
      },
      'default': () => response.status(406).send('Not Acceptable')
    });
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const workoutsMeGET = async (request, response) => {
  try {
    const data = await Service.workoutsMeGET(request);
    const responseData = data.payload || data;
    response.format({
      'application/json': () => {
        response.status(200).json(responseData);
      },
      'application/xml': () => {
        const plainData = JSON.parse(JSON.stringify(responseData));
        const xmlData = toXML({ workouts: { workout: plainData } }, { header: true, indent: '  ' });
        response.status(200).type('application/xml').send(xmlData);
      },
      'default': () => response.status(406).send('Not Acceptable')
    });
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const workoutsIdGET = async (request, response) => {
  try {
    const data = await Service.workoutsIdGET(request);
    const responseData = data.payload || data;
    response.format({
      'application/json': () => {
        response.status(200).json(responseData);
      },
      'application/xml': () => {
        const plainData = JSON.parse(JSON.stringify(responseData));
        const xmlData = toXML({ workout: plainData }, { header: true, indent: '  ' });
        response.status(200).type('application/xml').send(xmlData);
      },
      'default': () => response.status(406).send('Not Acceptable')
    });
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const workoutsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, () => Service.workoutsPOST(request));
};

const workoutsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, () => Service.workoutsIdDELETE(request));
};

const workoutsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, () => Service.workoutsIdPUT(request));
};

module.exports = {
  workoutsIdDELETE,
  workoutsIdGET,
  workoutsIdPUT,
  workoutsMeGET,
  workoutsPOST,
  workoutsPublicGET,
};
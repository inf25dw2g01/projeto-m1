/**
 * The WorkoutsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/WorkoutsService');

const workoutsPublicGET = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsPublicGET(request));
};

const workoutsMeGET = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsMeGET(request));
};

const workoutsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsPOST(request));
};

const workoutsIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsIdDELETE(request));
};

const workoutsIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsIdGET(request));
};

const workoutsIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.workoutsIdPUT(request));
};

module.exports = {
  workoutsIdDELETE,
  workoutsIdGET,
  workoutsIdPUT,
  workoutsMeGET,
  workoutsPOST,
  workoutsPublicGET,
};

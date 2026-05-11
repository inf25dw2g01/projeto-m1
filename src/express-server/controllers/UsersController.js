/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');
const { toXML } = require('jstoxml');

const usersMeGET = async (request, response) => {
  try {
    const data = await service.usersMeGET(request); 
    const responseData = data.payload || data;
    
    response.format({
      'application/json': () => {
        response.status(200).json(responseData);
      },
      'application/xml': () => {
        // LIMPEZA DOS DADOS DO SEQUELIZE
        const plainData = JSON.parse(JSON.stringify(responseData));
        
        const xmlData = toXML({ user: plainData }, { header: true, indent: '  ' });
        response.status(200).type('application/xml').send(xmlData);
      },
      'default': () => response.status(406).send('Not Acceptable')
    });
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const getGoogleMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated()) {
    return response.status(200).json(request.user);
  }
  response.status(401).json({ error: "Não autenticado via Google" });
};

const getGithubMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated()) {
    return response.status(200).json(request.user);
  }
  response.status(401).json({ error: "Não autenticado via GitHub" });
};

const getDiscordMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated()) {
    return response.status(200).json(request.user);
  }
  response.status(401).json({ error: "Não autenticado via Discord" });
};

const usersMeApiKeyPOST = async (request, response) => {
  await Controller.handleRequest(request, response, () => service.usersMeApiKeyPOST(request));
};

module.exports = {
  usersMeGET,
  getGoogleMe,
  getGithubMe,
  getDiscordMe,
  usersMeApiKeyPOST,
};
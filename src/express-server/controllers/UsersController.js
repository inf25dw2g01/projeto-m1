/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');

const usersMeGET = async (request, response) => {
  try {
    const data = await service.usersMeGET(request); 
    response.status(200).json(data.payload || data);
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const getGoogleMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated() && request.session.authMethod === 'google') {
    return response.status(200).json({ message: "Perfil Google", user: request.user });
  }
  response.status(403).json({ error: "Acesso negado. Apenas logins via Google permitidos aqui." });
};

const getGithubMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated() && request.session.authMethod === 'github') {
    return response.status(200).json({ message: "Perfil GitHub", user: request.user });
  }
  response.status(403).json({ error: "Acesso negado. Apenas logins via GitHub permitidos aqui." });
};

const getDiscordMe = async (request, response) => {
  if (request.isAuthenticated && request.isAuthenticated() && request.session.authMethod === 'discord') {
    return response.status(200).json({ message: "Perfil Discord", user: request.user });
  }
  response.status(403).json({ error: "Acesso negado. Apenas logins via Discord permitidos aqui." });
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
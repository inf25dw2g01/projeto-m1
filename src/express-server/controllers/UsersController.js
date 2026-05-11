/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');
<<<<<<< HEAD
const { toXML } = require('jstoxml');
=======
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d

const usersMeGET = async (request, response) => {
  try {
    const data = await service.usersMeGET(request); 
<<<<<<< HEAD
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
=======
    response.status(200).json(data.payload || data);
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d
  } catch (error) {
    response.status(error.code || 500).json({ error: error.message });
  }
};

const getGoogleMe = async (request, response) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 2e3b9f5ba9751d950368ed03b53f395e1fbc186d
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
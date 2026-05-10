/* eslint-disable no-unused-vars */
const Service = require("./Service");
const User = require("../models/User");
const crypto = require("crypto");
/**
* Devolve as informações do perfil do atleta autenticado
*
* returns User
* */
const getAuthenticatedUser = async (req) => {
  let user = null;

  // OAuth2 (GitHub ou Google)
  if (req.user) {
    user = req.user;
  }

  // (API Key)
  if (!user) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey) {
      user = await User.findOne({ where: { apiKey: apiKey } });
    }
  }

  // PORTA 3: Basic Auth
  if (!user) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Basic ')) {
      //
    }
  }
  if (!user) {
    throw { status: 401, message: "Acesso negado. Autentica-te via OAuth, API Key ou Basic Auth." };
  }

  return user;
};
const usersMeGET = (req) => new Promise(async (resolve, reject) => {
    try {
      const user = await getAuthenticatedUser(req);
      
      resolve(Service.successResponse(user));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
})


module.exports = {
  usersMeGET,
};
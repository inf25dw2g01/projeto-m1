/* eslint-disable no-unused-vars */
const Service = require("./Service");
const User = require("../models/User");
/**
* Devolve as informações do perfil do atleta autenticado
*
* returns User
* */
const getAuthenticatedUser = async (req) => {
  if (req.user) {
    user = req.user;
  }
  throw {status:401, Message: "Acesso negado. Autentica-te via OAuth, API Key ou Basic Auth."};
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
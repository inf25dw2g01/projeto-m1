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

const usersMeApiKeyPOST = (req) => new Promise(async (resolve, reject) => {
    try {
        if (!req.user) {
            return reject(Service.rejectResponse('Não autenticado', 401));
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return reject(Service.rejectResponse('Utilizador não encontrado', 404));
        }

        const newKey = crypto.randomBytes(32).toString('hex');
        user.apiKey = newKey;
        await user.save();

        resolve(Service.successResponse({ apiKey: newKey }));
    } catch (e) {
        reject(Service.rejectResponse(e.message || 'Erro interno', 500));
    }
});

module.exports = {
  usersMeGET,
  usersMeApiKeyPOST,
};
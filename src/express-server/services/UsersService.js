/* eslint-disable no-unused-vars */
const Service = require("./Service");
const User = require("../models/User");
/**
* Devolve as informações do perfil do atleta autenticado
*
* returns User
* */
const usersMeGET = (req) => new Promise(async (resolve, reject) => {
    try {
      if (!req.user){
        return reject(Service.rejectResponse('Não autenticado',401));
      }
      
      resolve(Service.successResponse({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
      }));
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Erro interno', e.status || 500));
    }
})

module.exports = {
  usersMeGET,
};
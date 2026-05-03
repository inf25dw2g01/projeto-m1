/* eslint-disable no-unused-vars */
const Service = require("./Service");
const User = require("../models/User");
/**
* Devolve as informações do perfil do atleta autenticado
*
* returns User
* */

const usersMeGET = (req) =>
  new Promise(async (resolve, reject) => {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        return reject(Service.rejectResponse("Não autenticado. Falta o header Authorization.", 401));
      }
      const user = await User.findOne({
        attributes: ["id", "firstName", "lastName", "email"], 
      });
      if (!user) {
        return reject(Service.rejectResponse("Nenhum utilizador na base de dados.", 404));
      }
      resolve(Service.successResponse(user));
    } catch (e) {
      reject(Service.rejectResponse(e.message || "Erro interno do servidor", 500));
    }
  });

module.exports = {
  usersMeGET,
};
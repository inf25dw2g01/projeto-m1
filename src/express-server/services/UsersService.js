/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Devolve as informações do perfil do atleta autenticado
*
* returns User
* */
const usersMeGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  usersMeGET,
};

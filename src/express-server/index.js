const path = require('path');
const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');
const sequelize = require('./config/database');

const launchServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Conexão com a base de dados estabelecida.');
    
    await sequelize.sync({ force: true }); 
    logger.info('Modelos sincronizados com a base de dados.');
    const openApiPath = path.join(__dirname, 'api', 'openapi.yaml');
    this.expressServer = new ExpressServer(config.URL_PORT || process.env.PORT || 8080, openApiPath);
    this.expressServer.launch();
    logger.info('Express server running');
    
  } catch (error) {
    logger.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

launchServer();
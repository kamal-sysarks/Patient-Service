const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./../config/logger').logger;
const api = require('../api/patient');

const start = (options) => {
    return new Promise((resolve, reject) => {
      if (!options.repo) {
        reject(new Error('The server must be started with a connected repository'))
      }
      if (!options.port) {
        reject(new Error('The server must be started with an available port'))
      }
  
      const app = express();
      app.use(cors());
      app.use(express.json());
      

      try {
        logger.stream = { 
          write: function(message, encoding){ 
            console.log(message);
            logger.info(message); 
          } 
        };
        app.use(morgan('dev',{ "stream": logger.stream }));  
      } catch (error) {
        console.log(error);
        logger.error(`Error: Connecting morgan with winston.`);
      }
    //   app.use(helmet())
      api(app, options.repo);
  
      const server = app.listen(options.port, () => resolve(server))
    })
  }
  
  module.exports = Object.assign({}, {start})

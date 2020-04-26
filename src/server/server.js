const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
require('winston-mongodb');
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
        const logger = new winston.createLogger({  
          transports: [
            new winston.transports.MongoDB({
              level: 'info',
              db: 'mongodb+srv://sysarks02:admin123@sysarks01-lyts7.mongodb.net/test?retryWrites=true&w=majority',
              options: {useUnifiedTopology: true},
              collection: 'patient_log',
              prettyPrint: true,
              format: winston.format.combine(
                winston.format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.json()
              ),
            })
          ]
        });
        logger.stream = { 
          write: function(message, encoding){ 
            console.log(message);
            logger.info(message); 
          } 
        };
        app.use(morgan('dev',{ "stream": logger.stream }));  
      } catch (error) {
        console.log(error);
      }
       
      
    //   app.use(helmet())
      app.use((err, req, res, next) => {
        reject(new Error('Something went wrong!, err:' + err))
        res.status(500).send('Something went wrong!')
      })

      api(app, options.repo);
  
      const server = app.listen(options.port, () => resolve(server))
    })
  }
  
  module.exports = Object.assign({}, {start})

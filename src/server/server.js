const express = require('express');
const logger = require('../db/logger').logger;
require('../db/mongoose');
const cors = require('cors');
const morgan = require('morgan');
const patientApi = require('../api/patient');  
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
app.use(patientApi)
   
module.exports = app;

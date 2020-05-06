const winston = require('winston');
require('winston-mongodb');

const options = {

  database: {
    db: process.env.DB,
    options: {useUnifiedTopology: true},
    level : 'info',
    collection: 'patient_log',
    prettyPrint: true,
    datePattern: 'YYYY-MM-DD',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.json()
    )
  }
};

module.exports.logger = new winston.createLogger({
  transports: [
    new winston.transports.MongoDB(options.database)
  ],
  exitOnError: false, // do not exit on handled exceptions
});
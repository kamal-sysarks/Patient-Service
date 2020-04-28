const mongoose = require('mongoose');
const logger = require('./logger').logger;

const connect = (options, mediator) => {
    console.log("Inside mongoose");
   
    try {
        mongoose.connect(options.db, options.dbOptions);
    
        const db = mongoose.connection;
        
        db.once("open", () => {
            console.log("> successfully opened the database");
            logger.info(`successfully opened the database`);
            mediator.emit('db.ready', db);
        });

        db.on('error', (error) => {
            throw new Error(error);
        });
        
    } catch (error) {
        logger.error(`Error:   ${error.message}`);
        console.log("Error: " + error);
    };
}

module.exports = Object.assign({}, {connect})
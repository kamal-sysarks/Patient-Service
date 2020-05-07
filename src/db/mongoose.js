// Connecting to MongoDB Database

const mongoose = require('mongoose');
const {dbSettings} = require('./config');
const logger = require('./logger').logger;

    
(async () => {
    try {
        await mongoose.connect(dbSettings.db, dbSettings.options);
        logger.info('Established Connection with MongoDB');
    } catch (err) {
        logger.error(`Error:   ${error.message}`);
        console.log('error: ' + err)
    }
})()


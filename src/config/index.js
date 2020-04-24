const {dbSettings, serverSettings} = require('./config')
const db = require('./mongoo');

module.exports = Object.assign({}, {dbSettings, serverSettings, db})


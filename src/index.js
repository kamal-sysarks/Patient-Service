'use strict'
const {EventEmitter} = require('events');
const server = require('./server/server');
const repository = require('./repository/repository');
const config = require('./config/');
const mediator = new EventEmitter();

console.log('--- Patient Service ---')
console.log('Connecting to Patient repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('db.ready', (conn) => {
  let rep
 // console.log(conn);
  repository.connect(conn)
    .then(repo => {
      console.log('Connected. Starting Server')
      rep = repo;
      return server.start({
        port: config.serverSettings.port,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () => {
        rep.disconnect()
      })
    })
})

mediator.on('db.error', (err) => {
  console.log("Error: " + err)
});

config.db.connect(config.dbSettings,mediator);



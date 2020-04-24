const express = require('express');
const cors = require('cors');
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
    //   app.use(morgan('dev'))
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

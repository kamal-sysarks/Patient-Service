const dbSettings = {
    db: process.env.DB,
    dbOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
    }
}

const serverSettings = {
    port: process.env.PORT || 3000
  }
  
module.exports = Object.assign({}, { dbSettings, serverSettings })
  
const dbSettings = {
    db: process.env.DB || 'flutter-poc',
    dboptions: {
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
  
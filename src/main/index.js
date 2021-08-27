require('dotenv/config')
const connection = require('../infra/orm/sequelize/sequelize')

connection.sync()
  .then(() => {
    const app = require('./config/app')
    app.listen(process.env.SERVER_PORT,
      () => console.log('🌎 Server Running 🛰️'))
  })
  .catch(console.error)

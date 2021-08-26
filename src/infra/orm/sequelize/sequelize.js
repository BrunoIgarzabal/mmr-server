const Sequelize = require('sequelize')
const { dbConfig } = require('../../config')

const { UnitOfMeasurement } = require('./models')

const connection = new Sequelize(dbConfig)

UnitOfMeasurement.init(connection)

module.exports = connection

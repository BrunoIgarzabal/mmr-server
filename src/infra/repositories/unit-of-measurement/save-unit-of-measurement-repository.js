const { UnitOfMeasurement } = require('../../orm/sequelize/models')

module.exports = class SaveUnitOfMeasurementRepository {
  async create ({ name, symbol }) {
    const unitOfMeasurement = await UnitOfMeasurement.create({ name, symbol })
    return unitOfMeasurement
  }
}

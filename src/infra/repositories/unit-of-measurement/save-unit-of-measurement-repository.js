const { MissingParamError } = require('../../../shared/errors')
const { UnitOfMeasurement } = require('../../orm/sequelize/models')

module.exports = class SaveUnitOfMeasurementRepository {
  async create ({ name, symbol } = {}) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!symbol) {
      throw new MissingParamError('symbol')
    }

    const unitOfMeasurement = await UnitOfMeasurement.create({ name, symbol })
    return unitOfMeasurement
  }
}

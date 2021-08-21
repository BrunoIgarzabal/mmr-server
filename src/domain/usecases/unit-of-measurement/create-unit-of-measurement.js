const { MissingParamError } = require('../../../shared/errors')
const { UnitOfMeasurement } = require('../../models')

module.exports = class CreateUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async create ({ name, symbol } = {}) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!symbol) {
      throw new MissingParamError('symbol')
    }

    const unitOfMeasurement = new UnitOfMeasurement({ name, symbol })
    await this.unitOfMeasurementRepository.save(unitOfMeasurement)
  }
}

const { MissingParamError, ServerError } = require('../../../shared/errors')
const { UnitOfMeasurement } = require('../../models')

module.exports = class CreateUnitOfMeasurementUseCase {
  constructor ({ createUnitOfMeasurementRepository } = {}) {
    this.createUnitOfMeasurementRepository = createUnitOfMeasurementRepository
  }

  async create ({ name, symbol } = {}) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!symbol) {
      throw new MissingParamError('symbol')
    }

    if (!this.createUnitOfMeasurementRepository) {
      throw new ServerError('No CreateUnitOfMeasurementRepository provided')
    }

    if (!this.createUnitOfMeasurementRepository.create) {
      throw new ServerError('No valid CreateUnitOfMeasurementRepository provided')
    }

    const unitOfMeasurement = new UnitOfMeasurement({ name, symbol })
    const response = await this.createUnitOfMeasurementRepository.create(unitOfMeasurement)

    return response
  }
}

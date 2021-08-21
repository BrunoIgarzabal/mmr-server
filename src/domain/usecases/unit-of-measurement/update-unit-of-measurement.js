const { MissingParamError } = require('../../../shared/errors')
const { UnitOfMeasurement } = require('../../models')

module.exports = class UpdateUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async update ({ id, name, symbol } = {}) {
    if (!id) {
      throw new MissingParamError('id')
    }

    if (!name) {
      throw new MissingParamError('name')
    }

    if (!symbol) {
      throw new MissingParamError('symbol')
    }

    const unitOfMeasurement = new UnitOfMeasurement({ id, name, symbol })
    await this.unitOfMeasurementRepository.update(unitOfMeasurement)
  }
}

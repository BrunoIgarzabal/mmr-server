const { MissingParamError, ObjectNotFoundError, ServerError } = require('../../../shared/errors')

module.exports = class GetByIdUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async get (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    if (!this.unitOfMeasurementRepository) {
      throw new ServerError('No UnitOfMeasurementRepository provided')
    }

    if (!this.unitOfMeasurementRepository.getById) {
      throw new ServerError('No valid UnitOfMeasurementRepository provided')
    }

    const unitOfMeasurement = await this.unitOfMeasurementRepository.getById(id)

    if (!unitOfMeasurement || !unitOfMeasurement.name || !unitOfMeasurement.symbol) {
      throw new ObjectNotFoundError(id)
    }

    return unitOfMeasurement
  }
}

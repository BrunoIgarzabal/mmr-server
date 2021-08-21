const { MissingParamError } = require('../../../shared/errors')

module.exports = class GetByIdUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async get (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    const unitOfMeasurement = await this.unitOfMeasurementRepository.getById(id)

    return unitOfMeasurement
  }
}

const { MissingParamError, ServerError } = require('../../../shared/errors')

module.exports = class DeleteUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async delete (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    if (!this.unitOfMeasurementRepository) {
      throw new ServerError('No UnitOfMeasurementRepository provided')
    }

    if (!this.unitOfMeasurementRepository.delete) {
      throw new ServerError('No valid UnitOfMeasurementRepository provided')
    }

    await this.unitOfMeasurementRepository.delete(id)
  }
}

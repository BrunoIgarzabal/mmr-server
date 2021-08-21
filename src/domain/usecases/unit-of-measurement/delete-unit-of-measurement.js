const { MissingParamError } = require('../../../shared/errors')

module.exports = class DeleteUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async delete (id) {
    if (!id) {
      throw new MissingParamError('id')
    }

    await this.unitOfMeasurementRepository.delete(id)
  }
}

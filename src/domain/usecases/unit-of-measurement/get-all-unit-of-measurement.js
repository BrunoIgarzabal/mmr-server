const { ServerError } = require('../../../shared/errors')

module.exports = class GetAllUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async getAll () {
    if (!this.unitOfMeasurementRepository) {
      throw new ServerError('No UnitOfMeasurementRepository provided')
    }

    if (!this.unitOfMeasurementRepository.getAll) {
      throw new ServerError('No valid UnitOfMeasurementRepository provided')
    }

    const list = await this.unitOfMeasurementRepository.getAll()
    return list
  }
}

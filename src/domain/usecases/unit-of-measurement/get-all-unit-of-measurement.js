module.exports = class GetAllUnitOfMeasurementUseCase {
  constructor ({ unitOfMeasurementRepository } = {}) {
    this.unitOfMeasurementRepository = unitOfMeasurementRepository
  }

  async getAll () {
    const list = await this.unitOfMeasurementRepository.getAll()
    return list
  }
}

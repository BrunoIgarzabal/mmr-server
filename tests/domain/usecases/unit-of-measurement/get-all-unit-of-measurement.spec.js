const { GetAllUnitOfMeasurementUseCase } = require('../../../../src/domain/usecases/unit-of-measurement')

const makeUnitOfMeasurementRepository = () => {
  class UnitOfMeasurementRepositorySpy {
    async getAll () {
      return []
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepository()
  const sut = new GetAllUnitOfMeasurementUseCase({
    unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
  })

  return { sut, unitOfMeasurementRepositorySpy }
}

describe('GetAllUnitOfMeasurementUseCase', () => {
  test('should return a list of unit of measurements', async () => {
    const { sut } = makeSut()

    const list = await sut.getAll()

    expect(Array.isArray(list)).toBe(true)
  })
})

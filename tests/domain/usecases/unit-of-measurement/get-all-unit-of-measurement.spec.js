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

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new GetAllUnitOfMeasurementUseCase(),
      new GetAllUnitOfMeasurementUseCase({ unitOfMeasurementRepository: null }),
      new GetAllUnitOfMeasurementUseCase({ unitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.getAll()
      await expect(promise).rejects.toThrow()
    }
  })
})

const { MissingParamError, ObjectNotFoundError } = require('../../../../src/shared/errors')
const { UnitOfMeasurement } = require('../../../../src/domain/models')

const { GetByIdUnitOfMeasurementUseCase } = require('../../../../src/domain/usecases/unit-of-measurement/')

const anyId = 1

const makeUnitOfMeasurementRepositoryWithError = () => {
  class UnitOfMeasurementRepositorySpy {
    async getById (id) {
      this.id = id
      return null
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeUnitOfMeasurementRepository = () => {
  class UnitOfMeasurementRepositorySpy {
    async getById (id) {
      this.id = id
      return new UnitOfMeasurement({ id, name: 'any_name', symbol: 'any_symbol' })
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepository()
  const sut = new GetByIdUnitOfMeasurementUseCase({
    unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
  })

  return { sut, unitOfMeasurementRepositorySpy }
}

describe('GetByIdUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.get()

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should return a UnitOfMeasurement if valid id is provided', async () => {
    const { sut } = makeSut()
    const anyId = 1

    const unitOfMeasurement = await sut.get(anyId)

    expect(unitOfMeasurement).not.toBeNull()
    expect(unitOfMeasurement.id).toBe(anyId)
    expect(unitOfMeasurement.name).toBe('any_name')
    expect(unitOfMeasurement.symbol).toBe('any_symbol')
  })

  test('should throws if invalid id is provided', async () => {
    const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepositoryWithError()
    const sut = new GetByIdUnitOfMeasurementUseCase({
      unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
    })

    const promise = sut.get(anyId)

    await expect(promise).rejects.toThrow(new ObjectNotFoundError(anyId))
  })

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new GetByIdUnitOfMeasurementUseCase(),
      new GetByIdUnitOfMeasurementUseCase({ unitOfMeasurementRepository: null }),
      new GetByIdUnitOfMeasurementUseCase({ unitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.get(anyId)
      await expect(promise).rejects.toThrow()
    }
  })
})

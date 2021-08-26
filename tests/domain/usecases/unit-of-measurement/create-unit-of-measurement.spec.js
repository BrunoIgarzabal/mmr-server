const { CreateUnitOfMeasurementUseCase } = require('../../../../src/domain/usecases/unit-of-measurement/')

const { MissingParamError } = require('../../../../src/shared/errors')

const makeCreateUnitOfMeasurementRepository = () => {
  class CreateUnitOfMeasurementRepositorySpy {
    async create ({ name, symbol } = {}) {
      this.name = name
      this.symbol = symbol

      return { name, symbol }
    }
  }
  return new CreateUnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const createUnitOfMeasurementRepositorySpy = makeCreateUnitOfMeasurementRepository()
  const sut = new CreateUnitOfMeasurementUseCase({
    createUnitOfMeasurementRepository: createUnitOfMeasurementRepositorySpy
  })

  return { sut, createUnitOfMeasurementRepositorySpy }
}

describe('CreateUnitOfMeasurementUseCase', () => {
  test('should throw if no name is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.create({ symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw if no symbol is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.create({ name: 'any_name' })

    await expect(promise).rejects.toThrow(new MissingParamError('symbol'))
  })

  test('should return UnitOfMeasurement when save', async () => {
    const { sut } = makeSut()
    const response = await sut.create({ name: 'any_name', symbol: 'any_symbol' })

    expect(response.name).toBe('any_name')
    expect(response.symbol).toBe('any_symbol')
  })

  test('should call UnitOfMeasurementRepository save with correct name and symbol', async () => {
    const { sut, createUnitOfMeasurementRepositorySpy } = makeSut()
    await sut.create({ name: 'any_name', symbol: 'any_symbol' })

    expect(createUnitOfMeasurementRepositorySpy.name).toBe('any_name')
    expect(createUnitOfMeasurementRepositorySpy.symbol).toBe('any_symbol')
  })

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new CreateUnitOfMeasurementUseCase(),
      new CreateUnitOfMeasurementUseCase({ createUnitOfMeasurementRepository: null }),
      new CreateUnitOfMeasurementUseCase({ createUnitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.create({ name: 'any_name', symbol: 'any_symbol' })
      await expect(promise).rejects.toThrow()
    }
  })
})

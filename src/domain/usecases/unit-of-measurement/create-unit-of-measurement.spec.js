const CreateUnitOfMeasurementUseCase = require('./create-unit-of-measurement')

const { MissingParamError } = require('../../../shared/errors')

const makeUnitOfMeasurementRepository = () => {
  class UnitOfMeasurementRepositorySpy {
    async save ({ name, symbol } = {}) {
      this.name = name
      this.symbol = symbol
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepository()
  const sut = new CreateUnitOfMeasurementUseCase({
    unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
  })

  return { sut, unitOfMeasurementRepositorySpy }
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

  test('should call UnitOfMeasurementRepository save with correct name and symbol', async () => {
    const { sut, unitOfMeasurementRepositorySpy } = makeSut()
    await sut.create({ name: 'any_name', symbol: 'any_symbol' })

    expect(unitOfMeasurementRepositorySpy.name).toBe('any_name')
    expect(unitOfMeasurementRepositorySpy.symbol).toBe('any_symbol')
  })

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new CreateUnitOfMeasurementUseCase(),
      new CreateUnitOfMeasurementUseCase({ unitOfMeasurementRepository: null }),
      new CreateUnitOfMeasurementUseCase({ unitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.create({ name: 'any_name', symbol: 'any_symbol' })
      await expect(promise).rejects.toThrow()
    }
  })
})

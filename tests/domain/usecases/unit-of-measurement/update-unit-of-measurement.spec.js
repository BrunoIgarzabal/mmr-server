const { MissingParamError } = require('../../../../src/shared/errors')
const { UpdateUnitOfMeasurementUseCase } = require('../../../../src/domain/usecases/unit-of-measurement/')

const anyId = 1

const makeUnitOfMeasurementRepository = () => {
  class UnitOfMeasurementRepositorySpy {
    async update ({ id, name, symbol } = {}) {
      this.id = id
      this.name = name
      this.symbol = symbol
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepository()
  const sut = new UpdateUnitOfMeasurementUseCase({
    unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
  })

  return { sut, unitOfMeasurementRepositorySpy }
}

describe('UpdateUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.update({ name: 'any_name', symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should throw if no name is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.update({ id: anyId, symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throw if no symbol is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.update({ id: anyId, name: 'any_name' })

    await expect(promise).rejects.toThrow(new MissingParamError('symbol'))
  })

  test('should call UnitOfMeasurementRepository update with correct id, name and symbol', async () => {
    const { sut, unitOfMeasurementRepositorySpy } = makeSut()
    await sut.update({ id: anyId, name: 'any_name', symbol: 'any_symbol' })

    expect(unitOfMeasurementRepositorySpy.id).toBe(anyId)
    expect(unitOfMeasurementRepositorySpy.name).toBe('any_name')
    expect(unitOfMeasurementRepositorySpy.symbol).toBe('any_symbol')
  })

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new UpdateUnitOfMeasurementUseCase(),
      new UpdateUnitOfMeasurementUseCase({ unitOfMeasurementRepository: null }),
      new UpdateUnitOfMeasurementUseCase({ unitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.update({ id: anyId, name: 'any_name', symbol: 'any_symbol' })
      await expect(promise).rejects.toThrow()
    }
  })
})

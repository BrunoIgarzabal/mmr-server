const { MissingParamError } = require('../../../shared/errors')
const { UnitOfMeasurement } = require('../../models')

const GetByIdUnitOfMeasurementUseCase = require('./get-by-id-unit-of-measurement')

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
})

const { MissingParamError } = require('../../../shared/errors')
const DeleteUnitOfMeasurementUseCase = require('./delete-unit-of-measurement')

const anyId = 1

const makeUnitOfMeasurementRepository = () => {
  class UnitOfMeasurementRepositorySpy {
    async delete (id) {
      this.id = id
    }
  }
  return new UnitOfMeasurementRepositorySpy()
}

const makeSut = () => {
  const unitOfMeasurementRepositorySpy = makeUnitOfMeasurementRepository()
  const sut = new DeleteUnitOfMeasurementUseCase({
    unitOfMeasurementRepository: unitOfMeasurementRepositorySpy
  })

  return { sut, unitOfMeasurementRepositorySpy }
}

describe('DeleteUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.delete()

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })

  test('should call UnitOfMeasurementRepository delete with correct id', async () => {
    const { sut, unitOfMeasurementRepositorySpy } = makeSut()
    await sut.delete(anyId)

    expect(unitOfMeasurementRepositorySpy.id).toBe(anyId)
  })
})

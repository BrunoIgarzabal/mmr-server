const { MissingParamError } = require('../../../../src/shared/errors')
const { DeleteUnitOfMeasurementUseCase } = require('../../../../src/domain/usecases/unit-of-measurement/')

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

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new DeleteUnitOfMeasurementUseCase(),
      new DeleteUnitOfMeasurementUseCase({ unitOfMeasurementRepository: null }),
      new DeleteUnitOfMeasurementUseCase({ unitOfMeasurementRepository: invalid })
    )

    for (const sut of suts) {
      const promise = sut.delete(anyId)
      await expect(promise).rejects.toThrow()
    }
  })
})

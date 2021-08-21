const { MissingParamError } = require('../../../shared/errors')
const DeleteUnitOfMeasurementUseCase = require('./delete-unit-of-measurement')

const makeSut = () => {
  const sut = new DeleteUnitOfMeasurementUseCase()

  return { sut }
}

describe('DeleteUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.delete()

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})

const { MissingParamError } = require('../../../shared/errors')
const GetByIdUnitOfMeasurementUseCase = require('./get-by-id-unit-of-measurement')

const makeSut = () => {
  const sut = new GetByIdUnitOfMeasurementUseCase()

  return { sut }
}

describe('GetByIdUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.get()

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})

const CreateUnitOfMeasurementUseCase = require('./create-unit-of-measurement')

const { MissingParamError } = require('../../../shared/errors')

const makeSut = () => {
  const sut = new CreateUnitOfMeasurementUseCase()

  return { sut }
}

describe('CreateUnitOfMeasurementUseCase', () => {
  test('should throw if no name is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.create({ symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('name'))
  })
})

const { MissingParamError } = require('../../../shared/errors')
const UpdateUnitOfMeasurementUseCase = require('./update-unit-of-measurement')

const makeSut = () => {
  const sut = new UpdateUnitOfMeasurementUseCase()

  return { sut }
}

describe('UpdateUnitOfMeasurementUseCase', () => {
  test('should throw if no id is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.update({ name: 'any_name', symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})

const { UnitOfMeasurementRouter } = require('../../../src/presentation/routers')
const { MissingParamError } = require('../../../src/shared/errors')

const makeSut = () => {
  const sut = new UnitOfMeasurementRouter()

  return { sut }
}

describe('UnitOfMeasurement Router', () => {
  test('should return 422 if no name is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        symbol: 'any_symbol'
      }
    }
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(422)
    expect(response.body.error).toBe(new MissingParamError('name').message)
  })

  test('should return 422 if no symbol is provided ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const response = await sut.route(httpRequest)
    expect(response.statusCode).toBe(422)
    expect(response.body.error).toBe(new MissingParamError('symbol').message)
  })
})

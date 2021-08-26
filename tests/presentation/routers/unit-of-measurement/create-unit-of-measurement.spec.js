const CreateUnitOfMeasurementRouter = require('../../../../src/presentation/routers/unit-of-measurement/create-unit-of-measurement')
const { MissingParamError, ServerError } = require('../../../../src/shared/errors')

const makeSut = () => {
  const sut = new CreateUnitOfMeasurementRouter()

  return { sut }
}

describe('CreateUnitOfMeasurement Router', () => {
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

  test('should return 500 if no httpRequest is provided ', async () => {
    const { sut } = makeSut()
    const response = await sut.route()
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(new ServerError().message)
  })

  test('should return 500 if httpRequest has no body ', async () => {
    const { sut } = makeSut()
    const response = await sut.route({})
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(new ServerError().message)
  })
})

const CreateUnitOfMeasurementRouter = require('../../../../src/presentation/routers/unit-of-measurement/create-unit-of-measurement')
const { MissingParamError, ServerError } = require('../../../../src/shared/errors')

const makeCreateUnitOfMeasurementUseCase = () => {
  class CreateUnitOfMeasurementUseCaseSpy {
    async create ({ name, symbol } = {}) {
      this.name = name
      this.symbol = symbol

      return { name, symbol, id: this.id }
    }
  }
  const repository = new CreateUnitOfMeasurementUseCaseSpy()
  repository.id = 1
  return repository
}

const makeSut = () => {
  const createUnitOfMeasurementUseCaseSpy = makeCreateUnitOfMeasurementUseCase()
  const sut = new CreateUnitOfMeasurementRouter({
    createUnitOfMeasurementUseCase: createUnitOfMeasurementUseCaseSpy
  })

  return { sut, createUnitOfMeasurementUseCaseSpy }
}

describe('CreateUnitOfMeasurement Router', () => {
  test('should return 422 if no name is provided', async () => {
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

  test('should return 422 if no symbol is provided', async () => {
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

  test('should return 500 if no httpRequest is provided', async () => {
    const { sut } = makeSut()
    const response = await sut.route()
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(new ServerError().message)
  })

  test('should return 500 if httpRequest has no body', async () => {
    const { sut } = makeSut()
    const response = await sut.route({})
    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(new ServerError().message)
  })

  test('should call CreateUnitOfMeasurementUseCase with correct params', async () => {
    const { sut, createUnitOfMeasurementUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        symbol: 'any_symbol'
      }
    }
    await sut.route(httpRequest)

    expect(createUnitOfMeasurementUseCaseSpy.name).toBe(httpRequest.body.name)
    expect(createUnitOfMeasurementUseCaseSpy.symbol).toBe(httpRequest.body.symbol)
  })

  test('should return 201 if valid model is provided', async () => {
    const { sut, createUnitOfMeasurementUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        symbol: 'any_symbol'
      }
    }
    const response = await sut.route(httpRequest)

    expect(response.statusCode).toBe(201)
    expect(response.body.id).toBe(createUnitOfMeasurementUseCaseSpy.id)
  })

  test('should throw if no dependencies are provided', async () => {
    const invalid = {}

    const suts = [].concat(
      new CreateUnitOfMeasurementRouter(),
      new CreateUnitOfMeasurementRouter({ createUnitOfMeasurementUseCase: null }),
      new CreateUnitOfMeasurementRouter({ createUnitOfMeasurementUseCase: invalid })
    )

    const httpRequest = {
      body: {
        name: 'any_name',
        symbol: 'any_symbol'
      }
    }

    for (const sut of suts) {
      const response = await sut.route(httpRequest)
      expect(response.statusCode).toBe(500)
      expect(response.body.error).toBe(new ServerError().message)
    }
  })
})

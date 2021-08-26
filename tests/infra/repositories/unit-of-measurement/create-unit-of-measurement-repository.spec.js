const connection = require('../../../../src/infra/orm/sequelize/sequelize')
const { CreateUnitOfMeasurementRepository } = require('../../../../src/infra/repositories/unit-of-measurement')
const { MissingParamError } = require('../../../../src/shared/errors')

const makeSut = () => {
  const sut = new CreateUnitOfMeasurementRepository()

  return { sut }
}

describe('CreateUnitOfMeasurementRepository', () => {
  beforeAll(async () => {
    await connection.sync({ force: true })
  })

  afterAll(async () => {
    await connection.close()
  })

  test('should create if model is valid', async () => {
    const { sut } = makeSut()
    const model = await sut.create({ name: 'any_name', symbol: 'any_symbol' })

    expect(model.name).toBe('any_name')
    expect(model.symbol).toBe('any_symbol')
  })

  test('should throws if no name is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.create({ symbol: 'any_symbol' })

    await expect(promise).rejects.toThrow(new MissingParamError('name'))
  })

  test('should throws if no symbol is provided', async () => {
    const { sut } = makeSut()
    const promise = sut.create({ name: 'any_name' })

    await expect(promise).rejects.toThrow(new MissingParamError('symbol'))
  })
})

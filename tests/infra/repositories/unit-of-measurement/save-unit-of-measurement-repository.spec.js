const connection = require('../../../../src/infra/orm/sequelize/sequelize')

const { SaveUnitOfMeasurementRepository } = require('../../../../src/infra/repositories/unit-of-measurement')

const makeSut = () => {
  const sut = new SaveUnitOfMeasurementRepository()

  return { sut }
}

describe('SaveUnitOfMeasurementRepository', () => {
  beforeAll(async () => {
    await connection.sync({ force: true })
  })

  test('should create user if model is valid', async () => {
    const { sut } = makeSut()
    const model = await sut.create({ name: 'any_name', symbol: 'any_symbol' })

    expect(model.name).toBe('any_name')
    expect(model.symbol).toBe('any_symbol')
  })
})

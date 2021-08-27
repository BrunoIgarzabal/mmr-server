const connection = require('../../../src/infra/orm/sequelize/sequelize')
const request = require('supertest')
const app = require('../../../src/main/config/app')

describe('UnitOfMeasurement Routes', () => {
  beforeAll(async () => {
    await connection.sync({ force: true })
  })

  afterAll(async () => {
    await connection.close()
  })

  test('should return 201 when valid model are provided', async () => {
    await request(app)
      .post('/api/unit-of-measurement')
      .send({
        name: 'any_name',
        symbol: 'any_password'
      })
      .expect(201)
  })
})

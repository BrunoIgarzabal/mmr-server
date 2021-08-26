const app = require('../../../src/main/config/app')

const request = require('supertest')

describe('JSON Parser Middleware', () => {
  test('should parse body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_json_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})

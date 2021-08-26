const app = require('../../../src/main/config/app')

const request = require('supertest')

describe('App Setup', () => {
  test('should disable x-powered-by', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const res = await request(app)
      .get('/')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })

  test('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send('')
    })
    const res = await request(app)
      .get('/')

    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})

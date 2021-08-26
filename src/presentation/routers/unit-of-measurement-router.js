const { MissingParamError } = require('../../shared/errors')
const { HttpResponse } = require('../helpers')

module.exports = class UnitOfMeasurementRouter {
  async route (httpRequest) {
    try {
      const { name, symbol } = httpRequest.body

      if (!name) {
        return HttpResponse.unprocessableEntity(new MissingParamError('name'))
      }

      if (!symbol) {
        return HttpResponse.unprocessableEntity(new MissingParamError('symbol'))
      }
    } catch (error) {
      return HttpResponse.serverError()
    }
  }
}

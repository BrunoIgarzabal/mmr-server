const { MissingParamError } = require('../../../shared/errors')
const { HttpResponse } = require('../../helpers')

module.exports = class CreateUnitOfMeasurementRouter {
  constructor ({ createUnitOfMeasurementUseCase } = {}) {
    this.createUnitOfMeasurementUseCase = createUnitOfMeasurementUseCase
  }

  async route (httpRequest) {
    try {
      const { name, symbol } = httpRequest.body

      if (!name) {
        return HttpResponse.unprocessableEntity(new MissingParamError('name'))
      }

      if (!symbol) {
        return HttpResponse.unprocessableEntity(new MissingParamError('symbol'))
      }

      const response = await this.createUnitOfMeasurementUseCase.create({ name, symbol })

      return HttpResponse.created({ id: response.id })
    } catch (error) {
      console.error(error)
      return HttpResponse.serverError()
    }
  }
}

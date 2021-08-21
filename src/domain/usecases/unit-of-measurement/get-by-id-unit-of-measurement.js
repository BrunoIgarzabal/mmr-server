const { MissingParamError } = require('../../../shared/errors')

module.exports = class GetByIdUnitOfMeasurementUseCase {
  async get (id) {
    if (!id) {
      throw new MissingParamError('id')
    }
  }
}

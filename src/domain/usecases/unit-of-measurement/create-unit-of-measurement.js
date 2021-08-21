const { MissingParamError } = require('../../../shared/errors')

module.exports = class CreateUnitOfMeasurementUseCase {
  async create ({ name, symbol } = {}) {
    if (!name) {
      throw new MissingParamError('name')
    }

    if (!symbol) {
      throw new MissingParamError('symbol')
    }
  }
}

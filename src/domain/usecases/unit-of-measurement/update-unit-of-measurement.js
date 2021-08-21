const { MissingParamError } = require('../../../shared/errors')

module.exports = class UpdateUnitOfMeasurementUseCase {
  async update ({ id, name, symbol } = {}) {
    if (!id) {
      throw new MissingParamError('id')
    }
  }
}

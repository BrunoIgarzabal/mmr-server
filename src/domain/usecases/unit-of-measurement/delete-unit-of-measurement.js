const { MissingParamError } = require('../../../shared/errors')

module.exports = class DeleteUnitOfMeasurementUseCase {
  async delete (id) {
    if (!id) {
      throw new MissingParamError('id')
    }
  }
}

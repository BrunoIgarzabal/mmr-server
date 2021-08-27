const { CreateUnitOfMeasurementRouter } = require('../../../presentation/routers/unit-of-measurement')
const { CreateUnitOfMeasurementUseCase } = require('../../../domain/usecases/unit-of-measurement')
const { CreateUnitOfMeasurementRepository } = require('../../../infra/repositories/unit-of-measurement')

module.exports = class CreateUnitOfMeasurementComposer {
  static compose () {
    const repository = new CreateUnitOfMeasurementRepository()
    const usecase = new CreateUnitOfMeasurementUseCase({ createUnitOfMeasurementRepository: repository })
    const router = new CreateUnitOfMeasurementRouter({
      createUnitOfMeasurementUseCase: usecase
    })

    return router
  }
}

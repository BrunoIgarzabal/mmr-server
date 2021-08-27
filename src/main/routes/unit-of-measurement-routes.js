const ExpressRouterAdapter = require('../adapters/express-router-adapter')

const { createUnitOfMeasurementRouter } = require('../composers/unit-of-measurement')

module.exports = router => {
  router.post('/unit-of-measurement', ExpressRouterAdapter.adapt(createUnitOfMeasurementRouter))
}

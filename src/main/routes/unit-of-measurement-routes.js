const { createUnitOfMeasurementRouter } = require('../composers/unit-of-measurement')

module.exports = router => {
  router.post('/unit-of-measurement', createUnitOfMeasurementRouter)
}

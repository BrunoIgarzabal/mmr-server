const { adapt } = require('../adapters/express-router-adapter')

const { CreateUnitOfMeasurementComposer } = require('../composers/unit-of-measurement')

module.exports = router => {
  router.post('/unit-of-measurement', adapt(CreateUnitOfMeasurementComposer.compose()))
}

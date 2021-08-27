module.exports = class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const response = await router.route(httpRequest)
      res.status(response.statusCode).json(response.body)
    }
  }
}

const { ServerError } = require('../../shared/errors')

module.exports = class HttpResponse {
  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static created (body) {
    return {
      statusCode: 201,
      body
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: {
        error: error.message
      }
    }
  }

  static unprocessableEntity (error) {
    return {
      statusCode: 422,
      body: {
        error: error.message
      }
    }
  }

  static serverError (error) {
    return {
      statusCode: 500,
      body: {
        error: new ServerError(error).message
      }
    }
  }
}

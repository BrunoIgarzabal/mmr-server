module.exports = class ObjectNotFoundError extends Error {
  constructor (paramName) {
    super(`Object Not Found: ${paramName}`)
    this.name = 'ObjectNotFoundError'
  }
}

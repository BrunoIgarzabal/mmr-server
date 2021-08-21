module.exports = class UnitOfMeasurement {
  constructor ({ id = null, name, symbol } = {}) {
    this.id = id
    this.name = name
    this.symbol = symbol
  }
}

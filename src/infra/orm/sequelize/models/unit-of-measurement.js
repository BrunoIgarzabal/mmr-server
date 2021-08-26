const { Model, DataTypes } = require('sequelize')

module.exports = class UnitOfMeasurement extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, { sequelize, modelName: 'tb_unit-of-measurements' })
  }
}

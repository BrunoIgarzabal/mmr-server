const { Model, DataTypes } = require('sequelize')

module.exports = class UnitOfMeasurement extends Model {
  static init (sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      symbol: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, { sequelize, modelName: 'tb_unit-of-measurements' })
  }
}

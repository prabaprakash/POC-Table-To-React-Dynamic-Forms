/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fun', {
    id: {
      type: DataTypes.STRING(10),
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'fun'
  });
};

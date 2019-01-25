/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('prasad', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(20),
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
    tableName: 'prasad'
  });
};

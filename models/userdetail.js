'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDetail.belongsToMany(models.Pokemon, {through: 'UserHasPokemon', foreignKey: 'UserId'})
    }
  }
  UserDetail.init({
    UserId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profileImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};
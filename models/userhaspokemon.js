'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHasPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHasPokemon.belongsTo(models.Pokemon)
      UserHasPokemon.belongsTo(models.UserDetail)
    }
  }
  UserHasPokemon.init({
    PokemonId: DataTypes.INTEGER,
    UserDetailId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHasPokemon',
  });
  return UserHasPokemon;
};
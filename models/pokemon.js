'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Pokemon.belongsToMany(models.UserDetail, {through: 'UserHasPokemon'})
      Pokemon.hasMany(models.UserHasPokemon, {foreignKey : 'PokemonId'})
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    skill: DataTypes.STRING,
    isSelected: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserHasPokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PokemonId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Pokemons",
          key: "id"
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserDetails",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserHasPokemons');
  }
};
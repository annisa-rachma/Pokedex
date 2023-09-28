'use strict';
const fs = require('fs')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const pokemon = JSON.parse(fs.readFileSync('./data/pokemons.json', 'utf-8')).map((element) => {
      delete element.id
      element.createdAt = element.updatedAt = new Date()
      return element
     })
     return queryInterface.bulkInsert("Pokemons", pokemon)
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete("Pokemons", null, {})

  }
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        password: 'senha111',
        email: 'jonh@gmail.com',
      },
      {
        name: 'John da Silva',
        password: 'senha333',
        email: 'silva@gmail.com',
      },
      {
        name: 'Renato',
        password: 'senha333',
        email: 'renato@gmail.com',
      },
      {
        name: 'Marcelino',
        password: 'senha333',
        email: 'marcelino@gmail.com',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('users', null, {});
  }
};
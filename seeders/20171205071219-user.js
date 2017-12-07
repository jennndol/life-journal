'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'johndoe',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'agus',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'mayang',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'username',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      username: 'lennon',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
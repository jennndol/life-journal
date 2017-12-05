'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Journals', [{
      title: 'Amazing Journey',
      content: 'Lorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. B',
      UserId: 1,
      happenedAt: new Date()
    },
    {
      title: 'Journey to Bali',
      content: 'Lorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. B',
      UserId: 2,
      happenedAt: new Date()
    },
    {
      title: 'Feel So Tired',
      content: 'Lorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. BLorem ipsum dolor sit amor. B',
      UserId: 1,
      happenedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
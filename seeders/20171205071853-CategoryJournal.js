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
    return queryInterface.bulkInsert('CategoryJournals', [{
        JournalId: 1,
        CategoryId: 1
      },
      {
        JournalId: 2,
        CategoryId: 1
      },
      {
        JournalId: 1,
        CategoryId: 2
      },
      {
        JournalId: 2,
        CategoryId: 2
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

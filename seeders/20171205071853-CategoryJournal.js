'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('CategoryJournals', [{
            JournalId: 1,
            CategoryId: 1,
            createdAt: new Date()
        }, {
            JournalId: 2,
            CategoryId: 1,
            createdAt: new Date()
        }, {
            JournalId: 1,
            CategoryId: 2,
            createdAt: new Date(),
        }, {
            JournalId: 2,
            CategoryId: 2,
            createdAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
          return queryInterface.bulkDelete('CategoryJournals', null, {});
    }
};
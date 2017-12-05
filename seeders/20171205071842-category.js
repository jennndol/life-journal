'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categories', [{
            name: 'Teknologi',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            name: 'Travelling',
            createdAt: new Date(),
            updatedAt: new Date(),
        }, {
            name: 'Belajar',
            createdAt: new Date(),
            updatedAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};
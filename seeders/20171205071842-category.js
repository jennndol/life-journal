'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categorys', [{
            name: 'Teknologi',
            createdAt: new Date(),
        }, {
            name: 'Travelling',
            createdAt: new Date(),
        }, {
            name: 'Belajar',
            createdAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categorys', null, {});
    }
};
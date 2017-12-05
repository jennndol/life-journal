'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Category', [{
            name: 'Teknologi',
        }, {
            name: 'Travelling',
        }, {
            name: 'Belajar',
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Category', null, {});
    }
};
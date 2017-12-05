'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Categorys', [{
            name: 'Teknologi',
        }, {
            name: 'Travelling',
        }, {
            name: 'Belajar',
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Categorys', null, {});
    }
};
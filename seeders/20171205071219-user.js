'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            username: 'johndoe',
            password: '123456',
        }, {
            username: 'agus',
            password: '123456',
        }, {
            username: 'mayang',
            password: '123456',
        }, {
            username: 'username',
            password: 'password',
        }, {
            username: 'lennon',
            password: '123456',
        }, ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
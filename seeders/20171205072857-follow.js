'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Follows', [{
            UserId: 1,
            FollowerId: 2,
            createdAt: new Date()
        }, {
            UserId: 2,
            FollowerId: 1,
            createdAt: new Date()
        }, {
            UserId: 3,
            FollowerId: 2,
            createdAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Follows', null, {});
    }
};
'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Follows', [{
            UserId: 1,
            FollowerId: 2
        }, {
            UserId: 2,
            FollowerId: 1
        }, {
            UserId: 3,
            FollowerId: 2
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Follows', null, {});
    }
};
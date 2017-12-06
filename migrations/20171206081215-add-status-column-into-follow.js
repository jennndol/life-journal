'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Follows', 'status', Sequelize.STRING);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Follows', 'status');
    }
};
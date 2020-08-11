'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION pgcrypto;');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('DROP EXTENSION pgcrypto;');
  }
};

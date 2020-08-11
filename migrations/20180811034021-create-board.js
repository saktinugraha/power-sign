'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('board', {
      board_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      board_name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      board_desc: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      running_text:{
        allowNull: true,
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('board');
  }
};

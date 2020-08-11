'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('data', {
      data_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',
          key: 'admin_id'
        }
      },
      board_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'board',
          key: 'board_id'
        }
      },
      no_container: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      product: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER(50)
      },
      remark: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      destination: {
        allowNull: true,
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('data');
  }
};

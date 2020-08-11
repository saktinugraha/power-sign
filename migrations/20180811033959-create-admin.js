'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('admin', {
      admin_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_name:{
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      username:{
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
      },
      password:{
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      role:{
        allowNull: false,
        type: Sequelize.SMALLINT
      },
      status_activation:{
        allowNull: false,
        type: Sequelize.SMALLINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admin');
  }
};

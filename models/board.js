'use strict';
module.exports = (sequelize, DataTypes) => {
  var board = sequelize.define('board', {
    board_name:DataTypes.STRING,
    board_desc:DataTypes.TEXT,
    running_text:DataTypes.TEXT
  }, {});
  board.associate = function(models) {
    // associations can be defined here
  };
  return board;
};

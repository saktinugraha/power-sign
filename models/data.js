'use strict';
module.exports = (sequelize, DataTypes) => {
  var data = sequelize.define('data', {
    admin_id:DataTypes.INTEGER,
    board_id:DataTypes.INTEGER,
    no_container:DataTypes.STRING,
    product:DataTypes.STRING,
    qty:DataTypes.INTEGER,
    remark:DataTypes.TEXT
  }, {});
  data.associate = function(models) {
    // associations can be defined here
  };
  return data;
};

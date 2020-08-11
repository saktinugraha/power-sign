'use strict';
module.exports = (sequelize, DataTypes) => {
  var admin = sequelize.define('admin', {
    admin_name:DataTypes.STRING,
    username:DataTypes.STRING,
    password:DataTypes.STRING,
    role:DataTypes.SMALLINT,
    status_activation:DataTypes.SMALLINT,
  }, {});
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};

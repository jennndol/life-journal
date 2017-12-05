'use strict';
module.exports = (sequelize, DataTypes) => {
  var Follow = sequelize.define('Follow', {
    UserId: DataTypes.INTEGER,
    FollowerId: DataTypes.INTEGER
  });
  return Follow;
};
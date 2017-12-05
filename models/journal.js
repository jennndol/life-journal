'use strict';
module.exports = (sequelize, DataTypes) => {
  var Journal = sequelize.define('Journal', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    happenedAt: DataTypes.DATE
  });
  
  Journal.associate = (models) =>{
    Journal.belongsTo(models.User);
    Journal.hasMany(models.Category);
  }

  return Journal;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Journal = sequelize.define('Journal', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    happenedAt: DataTypes.DATE
  });
  
  Journal.associate = (models) =>{
    Journal.belongsTo(models.User, onDelete='SET NULL');
    Journal.belongsToMany(models.Category, {through: 'CategoryJournal'}, onDelete='CASCADE');
  }

  return Journal;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Journal = sequelize.define('Journal', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    happenedAt: {
      type: DataTypes.DATE,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Make sure you insert date'
        },
        isDate:{
          args: true,
          msg: 'Make sure you strict to date format'
        },
      }
    }
  });

  Journal.associate = (models) => {
    Journal.belongsTo(models.User);
    Journal.belongsToMany(models.Category, { through: 'CategoryJournal' });
  }

  return Journal;
};